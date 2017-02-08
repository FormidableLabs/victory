import { Selection } from "victory-core";
import { assign, throttle, isFunction, isEqual, reduce } from "lodash";


const Helpers = {
  withinBounds(point, bounds, padding) {
    const {x1, x2, y1, y2} = bounds;
    const {x, y} = point;
    padding = padding ? padding / 2 : 0;
    return x + padding >= Math.min(x1, x2) &&
      x - padding <= Math.max(x1, x2) &&
      y + padding >= Math.min(y1, y2) &&
      y - padding <= Math.max(y1, y2);
  },

  getDomainBox(props, fullDomain, selectedDomain) {
    const { dimension, scale, domain } = props;
    fullDomain = fullDomain || domain || this.getOriginalDomain(props);
    selectedDomain = selectedDomain || fullDomain;
    const fullCoordinates = Selection.getDomainCoordinates(scale, fullDomain);
    const selectedCoordinates = Selection.getDomainCoordinates(scale, selectedDomain);

    return {
      x1: dimension !== "y" ? Math.min(...selectedCoordinates.x) : Math.min(...fullCoordinates.x),
      x2: dimension !== "y" ? Math.max(...selectedCoordinates.x) : Math.max(...fullCoordinates.x),
      y1: dimension !== "x" ? Math.min(...selectedCoordinates.y) : Math.min(...fullCoordinates.y),
      y2: dimension !== "x" ? Math.max(...selectedCoordinates.y) : Math.max(...fullCoordinates.y)
    };
  },

  getHandles(props, domainBox) {
    const {x1, x2, y1, y2} = domainBox;
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const handleWidth = props.handleWidth / 2;
    return {
      left: {x1: minX - handleWidth, x2: minX + handleWidth, y1, y2},
      right: {x1: maxX - handleWidth, x2: maxX + handleWidth, y1, y2},
      top: {x1, x2, y1: minY + handleWidth, y2: minY - handleWidth},
      bottom: {x1, x2, y1: maxY + handleWidth, y2: maxY - handleWidth}
    };
  },

  getActiveHandles(point, props, domainBox) {
    const handles = this.getHandles(props, domainBox);
    const options = ["top", "bottom", "left", "right"];
    const activeHandles = reduce(options, (memo, opt) => {
      memo = this.withinBounds(point, handles[opt]) ? memo.concat(opt) : memo;
      return memo;
    }, []);
    return activeHandles.length && activeHandles;
  },

  getResizeMutation(box, handles) {
    const {x1, y1, x2, y2} = box;
    const mutations = {
      left: {x1: Math.max(x1, x2), x2: Math.min(x1, x2), y1, y2},
      right: {x1: Math.min(x1, x2), x2: Math.max(x1, x2), y1, y2},
      top: {y1: Math.max(y1, y2), y2: Math.min(y1, y2), x1, x2},
      bottom: {y1: Math.min(y1, y2), y2: Math.max(y1, y2), x1, x2}
    };
    return reduce(handles, (memo, current) => {
      return assign(memo, mutations[current]);
    }, {});
  },

  getMinimumDomain() {
    return {x: [0, 1 / Number.MAX_SAFE_INTEGER], y: [0, 1 / Number.MAX_SAFE_INTEGER]};
  },

  getSelectionMutation(point, box, dimension) {
    const {x, y} = point;
    const {x1, x2, y1, y2} = box;
    return {
      x1: dimension !== "y" ? x : x1,
      y1: dimension !== "x" ? y : y1,
      x2: dimension !== "y" ? x : x2,
      y2: dimension !== "x" ? y : y2
    };
  },

  panBox(props, point) {
    const {fullDomain, selectedDomain, dimension, startX, startY} = props;
    const {x1, x2, y1, y2} = props.x1 ?
      props : this.getDomainBox(props, fullDomain, selectedDomain);

    const {x, y} = point;
    const delta = {
      x: startX ? startX - x : 0,
      y: startY ? startY - y : 0
    };
    return {
      x1: dimension !== "y" ? Math.min(x1, x2) - delta.x : Math.min(x1, x2),
      x2: dimension !== "y" ? Math.max(x1, x2) - delta.x : Math.max(x1, x2),
      y1: dimension !== "x" ? Math.min(y1, y2) - delta.y : Math.min(y1, y2),
      y2: dimension !== "x" ? Math.max(y1, y2) - delta.y : Math.max(y1, y2)
    };
  },

  constrainBox(box, fullDomainBox) {
    const {x1, y1, x2, y2} = fullDomainBox;
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
      dimension, selectedDomain, domain, handleWidth, onDomainChange, cachedSelectedDomain
    } = targetProps;
    const fullDomainBox = targetProps.fullDomainBox ||
      this.getDomainBox(targetProps, domain);
    const currentDomain = isEqual(selectedDomain, cachedSelectedDomain) ?
      targetProps.currentDomain || selectedDomain || domain : selectedDomain || domain;
    const {x, y} = Selection.getSVGEventCoordinates(evt);
    // Ignore events that occur outside of the maximum domain region
    if (!this.withinBounds({x, y}, fullDomainBox, handleWidth)) {
      return {};
    }
    const domainBox = this.getDomainBox(targetProps, domain, currentDomain);
    const activeHandles = this.getActiveHandles({x, y}, targetProps, domainBox);
    // If the event occurs in any of the handle regions, start a resize
    if (activeHandles) {
      return [{
        target: "parent",
        mutation: () => {
          return {
            isSelecting: true, domainBox, fullDomainBox,
            cachedSelectedDomain: selectedDomain, currentDomain,
            ...this.getResizeMutation(domainBox, activeHandles)
          };
        }
      }];
    } else if (
        this.withinBounds({x, y}, domainBox) &&
        !isEqual(domain, currentDomain)
      ) {
      // if the event occurs within a selected region start a panning event, unless the whole
      // domain is selected
      return [{
        target: "parent",
        mutation: () => ({
          isPanning: true, startX: x, startY: y, domainBox, fullDomainBox, currentDomain,
          cachedSelectedDomain: selectedDomain
        })
      }];
    } else {
      // if the event occurs outside the region, or if the whole domain is selected,
      // start a new selection
      const minimumDomain = this.getMinimumDomain();
      if (isFunction(onDomainChange)) {
        onDomainChange(minimumDomain);
      }
      return [{
        target: "parent",
        mutation: () => {
          return {
            isSelecting: true, domainBox, fullDomainBox,
            cachedSelectedDomain: selectedDomain,
            currentDomain: this.getMinimumDomain(),
            ...this.getSelectionMutation({x, y}, domainBox, dimension)
          };
        }
      }];
    }
  },

  onMouseMove(evt, targetProps) { // eslint-disable-line max-statements
    // if a panning or selection has not been started, ignore the event
    if (!targetProps.isPanning && !targetProps.isSelecting) {
      return {};
    }
    const {
      dimension, scale, isPanning, isSelecting, fullDomainBox, onDomainChange
    } = targetProps;
    const {x, y} = Selection.getSVGEventCoordinates(evt);
      // Ignore events that occur outside of the maximum domain region
    if (!this.withinBounds({x, y}, fullDomainBox)) {
      return {};
    }
    if (isPanning) {
      const {startX, startY} = targetProps;
      const pannedBox = this.panBox(targetProps, {x, y});
      const constrainedBox = this.constrainBox(pannedBox, fullDomainBox);
      const currentDomain = Selection.getBounds({...constrainedBox, scale});
      if (isFunction(onDomainChange)) {
        onDomainChange(currentDomain);
      }
      return [{
        target: "parent",
        mutation: () => {
          return {
            currentDomain,
            startX: pannedBox.x2 >= fullDomainBox.x2 || pannedBox.x1 <= fullDomainBox.x1 ?
              startX : x,
            startY: pannedBox.y2 >= fullDomainBox.y2 || pannedBox.y1 <= fullDomainBox.y1 ?
              startY : y,
            ...constrainedBox
          };
        }
      }];
    } else if (isSelecting) {
      const x2 = dimension !== "y" ? x : targetProps.x2;
      const y2 = dimension !== "x" ? y : targetProps.y2;
      const currentDomain =
        Selection.getBounds({x2, y2, x1: targetProps.x1, y1: targetProps.y1, scale});
      if (isFunction(onDomainChange)) {
        onDomainChange(currentDomain);
      }
      return [{
        target: "parent",
        mutation: () => {
          return {
            x2, y2, currentDomain
          };
        }
      }];
    }
  },

  onMouseUp(evt, targetProps) {
    const {x1, y1, x2, y2, domain, onDomainChange} = targetProps;
    // if the mouse hasn't moved since a mouseDown event, select the whole domain region
    if (x1 === x2 || y1 === y2) {
      if (isFunction(onDomainChange)) {
        onDomainChange(domain);
      }
      return [{
        target: "parent",
        mutation: () => {
          return {
            isPanning: false, isSelecting: false, currentDomain: domain
          };
        }
      }];
    }
    return [{
      target: "parent",
      mutation: () => ({ isPanning: false, isSelecting: false })
    }];
  },

  onMouseLeave() {
    return [{
      target: "parent",
      mutation: () => ({ isPanning: false, isSelecting: false })
    }];
  }
};

export default {
  onMouseDown: Helpers.onMouseDown.bind(Helpers),
  onMouseUp: Helpers.onMouseUp.bind(Helpers),
  onMouseLeave: Helpers.onMouseLeave.bind(Helpers),
  onMouseMove: throttle(Helpers.onMouseMove.bind(Helpers), 16, {leading: true})
};
