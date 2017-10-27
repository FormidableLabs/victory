import { Selection } from "victory-core";
import { assign, throttle, isFunction, isEqual, defaults } from "lodash";
import { attachId } from "../../helpers/event-handlers";

const Helpers = {
  withinBounds(point, bounds, padding) {
    const { x1, x2, y1, y2 } = bounds;
    const { x, y } = point;
    padding = padding ? padding / 2 : 0;
    return x + padding >= Math.min(x1, x2) &&
      x - padding <= Math.max(x1, x2) &&
      y + padding >= Math.min(y1, y2) &&
      y - padding <= Math.max(y1, y2);
  },

  getDomainBox(props, fullDomain, selectedDomain) {
    const { brushDimension } = props;
    fullDomain = defaults({}, fullDomain, props.domain);
    selectedDomain = defaults({}, selectedDomain, fullDomain);
    const fullCoords = Selection.getDomainCoordinates(props, fullDomain);
    const selectedCoords = Selection.getDomainCoordinates(props, selectedDomain);

    return {
      x1: brushDimension !== "y" ? Math.min(...selectedCoords.x) : Math.min(...fullCoords.x),
      x2: brushDimension !== "y" ? Math.max(...selectedCoords.x) : Math.max(...fullCoords.x),
      y1: brushDimension !== "x" ? Math.min(...selectedCoords.y) : Math.min(...fullCoords.y),
      y2: brushDimension !== "x" ? Math.max(...selectedCoords.y) : Math.max(...fullCoords.y)
    };
  },

  getHandles(props, domainBox) {
    const { x1, x2, y1, y2 } = domainBox;
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const handleWidth = props.handleWidth / 2;
    return {
      left: { x1: minX - handleWidth, x2: minX + handleWidth, y1, y2 },
      right: { x1: maxX - handleWidth, x2: maxX + handleWidth, y1, y2 },
      top: { x1, x2, y1: minY + handleWidth, y2: minY - handleWidth },
      bottom: { x1, x2, y1: maxY + handleWidth, y2: maxY - handleWidth }
    };
  },

  getActiveHandles(point, props, domainBox) {
    const handles = this.getHandles(props, domainBox);
    const activeHandles = ["top", "bottom", "left", "right"].reduce((memo, opt) => {
      memo = this.withinBounds(point, handles[opt]) ? memo.concat(opt) : memo;
      return memo;
    }, []);
    return activeHandles.length && activeHandles;
  },

  getResizeMutation(box, handles) {
    const { x1, y1, x2, y2 } = box;
    const mutations = {
      left: { x1: Math.max(x1, x2), x2: Math.min(x1, x2), y1, y2 },
      right: { x1: Math.min(x1, x2), x2: Math.max(x1, x2), y1, y2 },
      top: { y1: Math.max(y1, y2), y2: Math.min(y1, y2), x1, x2 },
      bottom: { y1: Math.min(y1, y2), y2: Math.max(y1, y2), x1, x2 }
    };
    return handles.reduce((memo, current) => {
      return assign(memo, mutations[current]);
    }, {});
  },

  getMinimumDomain() {
    return { x: [0, 1 / Number.MAX_SAFE_INTEGER], y: [0, 1 / Number.MAX_SAFE_INTEGER] };
  },

  getSelectionMutation(point, box, brushDimension) {
    const { x, y } = point;
    const { x1, x2, y1, y2 } = box;
    return {
      x1: brushDimension !== "y" ? x : x1,
      y1: brushDimension !== "x" ? y : y1,
      x2: brushDimension !== "y" ? x : x2,
      y2: brushDimension !== "x" ? y : y2
    };
  },

  panBox(props, point) {
    const { brushDimension, domain, startX, startY } = props;
    const brushDomain = defaults({}, props.brushDomain, domain);
    const fullDomain = defaults({}, props.fullDomain, domain);
    const { x1, x2, y1, y2 } = props.x1 ?
      props : this.getDomainBox(props, fullDomain, brushDomain);

    const { x, y } = point;
    const delta = {
      x: startX ? startX - x : 0,
      y: startY ? startY - y : 0
    };
    return {
      x1: brushDimension !== "y" ? Math.min(x1, x2) - delta.x : Math.min(x1, x2),
      x2: brushDimension !== "y" ? Math.max(x1, x2) - delta.x : Math.max(x1, x2),
      y1: brushDimension !== "x" ? Math.min(y1, y2) - delta.y : Math.min(y1, y2),
      y2: brushDimension !== "x" ? Math.max(y1, y2) - delta.y : Math.max(y1, y2)
    };
  },

  constrainBox(box, fullDomainBox) {
    const { x1, y1, x2, y2 } = fullDomainBox;
    return {
      x1: box.x2 > x2 ? x2 - Math.abs(box.x2 - box.x1) : Math.max(box.x1, x1),
      y1: box.y2 > y2 ? y2 - Math.abs(box.y2 - box.y1) : Math.max(box.y1, y1),
      x2: box.x1 < x1 ? x1 + Math.abs(box.x2 - box.x1) : Math.min(box.x2, x2),
      y2: box.y1 < y1 ? y1 + Math.abs(box.y2 - box.y1) : Math.min(box.y2, y2)
    };
  },

  onMouseDown(evt, targetProps) { // eslint-disable-line max-statements
    evt.preventDefault();
    const {
      brushDimension, handleWidth, cachedBrushDomain, domain, allowResize, allowDrag
    } = targetProps;

    // Don't trigger events for static brushes
    if (!allowResize && !allowDrag) {
      return {};
    }

    const fullDomainBox = targetProps.fullDomainBox || this.getDomainBox(targetProps, domain);
    const { x, y } = Selection.getSVGEventCoordinates(evt);

    // Ignore events that occur outside of the maximum domain region
    if (!this.withinBounds({ x, y }, fullDomainBox, handleWidth)) {
      return {};
    }

    const brushDomain = defaults({}, targetProps.brushDomain, domain);

    const currentDomain = isEqual(brushDomain, cachedBrushDomain) ?
      targetProps.currentDomain || brushDomain || domain :
      brushDomain || domain;

    const domainBox = this.getDomainBox(targetProps, domain, currentDomain);

    const activeHandles = allowResize && this.getActiveHandles({ x, y }, targetProps, domainBox);
    // If the event occurs in any of the handle regions, start a resize
    if (activeHandles) {
      return [{
        target: "parent",
        mutation: () => {
          return {
            isSelecting: true, domainBox, fullDomainBox,
            cachedBrushDomain: brushDomain, currentDomain,
            ...this.getResizeMutation(domainBox, activeHandles)
          };
        }
      }];
    } else if (this.withinBounds({ x, y }, domainBox) && !isEqual(domain, currentDomain)) {
      // if the event occurs within a selected region start a panning event, unless the whole
      // domain is selected
      return [{
        target: "parent",
        mutation: () => ({
          isPanning: allowDrag, startX: x, startY: y, domainBox, fullDomainBox, currentDomain,
          cachedBrushDomain: brushDomain,
          ...domainBox // set x1, x2, y1, y2
        })
      }];
    } else {
      // if the event occurs outside the region, or if the whole domain is selected,
      // start a new selection
      return allowResize ? [{
        target: "parent",
        mutation: () => ({
          isSelecting: allowResize, domainBox, fullDomainBox,
          cachedBrushDomain: brushDomain,
          currentDomain: this.getMinimumDomain(),
          ...this.getSelectionMutation({ x, y }, domainBox, brushDimension)
        })
      }] : {};
    }
  },

  onMouseMove(evt, targetProps) { // eslint-disable-line max-statements, complexity
    // if a panning or selection has not been started, ignore the event
    if (!targetProps.isPanning && !targetProps.isSelecting) {
      return {};
    }
    const {
      brushDimension, scale, isPanning, isSelecting, fullDomainBox, onBrushDomainChange,
      allowResize, allowDrag
    } = targetProps;
    const { x, y } = Selection.getSVGEventCoordinates(evt);
      // Ignore events that occur outside of the maximum domain region
    if ((!allowResize && !allowDrag) || !this.withinBounds({ x, y }, fullDomainBox)) {
      return {};
    }
    if (allowDrag && isPanning) {
      const { startX, startY } = targetProps;
      const pannedBox = this.panBox(targetProps, { x, y });
      const constrainedBox = this.constrainBox(pannedBox, fullDomainBox);
      const currentDomain = Selection.getBounds({ ...constrainedBox, scale });
      const mutatedProps = {
        currentDomain,
        startX: pannedBox.x2 >= fullDomainBox.x2 || pannedBox.x1 <= fullDomainBox.x1 ?
          startX : x,
        startY: pannedBox.y2 >= fullDomainBox.y2 || pannedBox.y1 <= fullDomainBox.y1 ?
          startY : y,
        ...constrainedBox
      };

      if (isFunction(onBrushDomainChange)) {
        onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
      }
      return [{
        target: "parent",
        mutation: () => mutatedProps
      }];
    } else if (allowResize && isSelecting) {
      const x2 = brushDimension !== "y" ? x : targetProps.x2;
      const y2 = brushDimension !== "x" ? y : targetProps.y2;
      const currentDomain =
        Selection.getBounds({ x2, y2, x1: targetProps.x1, y1: targetProps.y1, scale });

      const mutatedProps = { x2, y2, currentDomain };
      if (isFunction(onBrushDomainChange)) {
        onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
      }
      return [{
        target: "parent",
        mutation: () => mutatedProps
      }];
    }
    return {};
  },

  onMouseUp(evt, targetProps) {
    const { x1, y1, x2, y2, onBrushDomainChange, domain, allowResize } = targetProps;
    // if the mouse hasn't moved since a mouseDown event, select the whole domain region
    if (allowResize && x1 === x2 || y1 === y2) {
      const mutatedProps = { isPanning: false, isSelecting: false, currentDomain: domain };
      if (isFunction(onBrushDomainChange)) {
        onBrushDomainChange(domain, defaults({}, mutatedProps, targetProps));
      }
      return [{
        target: "parent",
        mutation: () => mutatedProps
      }];
    }
    return [{
      target: "parent",
      mutation: () => ({ isPanning: false, isSelecting: false })
    }];
  },

  onMouseLeave(evt) {
    if (evt.target.nodeName === "svg") {
      return [{
        target: "parent",
        mutation: () => ({ isPanning: false, isSelecting: false })
      }];
    }
    return [];
  }
};

export default {
  ...Helpers,
  onMouseDown: Helpers.onMouseDown.bind(Helpers),
  onMouseUp: Helpers.onMouseUp.bind(Helpers),
  onMouseLeave: Helpers.onMouseLeave.bind(Helpers),
  onMouseMove: throttle(
    attachId(Helpers.onMouseMove.bind(Helpers)),
    16, // eslint-disable-line no-magic-numbers
    { leading: true, trailing: false }
  )
};
