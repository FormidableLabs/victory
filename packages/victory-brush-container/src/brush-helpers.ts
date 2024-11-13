import defaults from "lodash/defaults";
import throttle from "lodash/throttle";

import { Helpers as CoreHelpers, Selection } from "victory-core";
import isEqual from "react-fast-compare";

const Helpers = {
  getDimension(props) {
    const { horizontal, brushDimension } = props;
    if (!horizontal || !brushDimension) {
      return brushDimension;
    }
    return brushDimension === "x" ? "y" : "x";
  },

  withinBounds(point, bounds, padding?) {
    const { x1, x2, y1, y2 } = CoreHelpers.mapValues(bounds, Number);
    const { x, y } = CoreHelpers.mapValues(point, Number);
    const paddingValue = padding ? padding / 2 : 0;
    return (
      x + paddingValue >= Math.min(x1, x2) &&
      x - paddingValue <= Math.max(x1, x2) &&
      y + paddingValue >= Math.min(y1, y2) &&
      y - paddingValue <= Math.max(y1, y2)
    );
  },

  getDomainBox(props, fullDomain, selectedDomain?) {
    const brushDimension = this.getDimension(props);
    const fullDomainObject = defaults({}, fullDomain, props.domain);
    const selectedDomainObject = defaults({}, selectedDomain, fullDomainObject);
    const fullCoords = Selection.getDomainCoordinates(props, fullDomainObject);
    const selectedCoords = Selection.getDomainCoordinates(
      props,
      selectedDomainObject,
    );

    return {
      x1:
        brushDimension !== "y"
          ? Math.min(...selectedCoords.x)
          : Math.min(...fullCoords.x),
      x2:
        brushDimension !== "y"
          ? Math.max(...selectedCoords.x)
          : Math.max(...fullCoords.x),
      y1:
        brushDimension !== "x"
          ? Math.min(...selectedCoords.y)
          : Math.min(...fullCoords.y),
      y2:
        brushDimension !== "x"
          ? Math.max(...selectedCoords.y)
          : Math.max(...fullCoords.y),
    };
  },

  getHandles(props, domainBox) {
    const brushDimension = this.getDimension(props);
    const { x1, x2, y1, y2 } = domainBox;
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const handleWidth = props.handleWidth / 2;
    return {
      left: brushDimension !== "y" && {
        x1: minX - handleWidth,
        x2: minX + handleWidth,
        y1,
        y2,
      },
      right: brushDimension !== "y" && {
        x1: maxX - handleWidth,
        x2: maxX + handleWidth,
        y1,
        y2,
      },
      top: brushDimension !== "x" && {
        x1,
        x2,
        y1: minY - handleWidth,
        y2: minY + handleWidth,
      },
      bottom: brushDimension !== "x" && {
        x1,
        x2,
        y1: maxY - handleWidth,
        y2: maxY + handleWidth,
      },
    };
  },

  getActiveHandles(point, props, domainBox) {
    const handles = this.getHandles(props, domainBox);
    const activeHandles = ["top", "bottom", "left", "right"].reduce(
      (memo, opt) =>
        handles[opt] && this.withinBounds(point, handles[opt])
          ? memo.concat(opt)
          : memo,
      [] as string[],
    );
    return activeHandles.length && activeHandles;
  },

  getResizeMutation(box, handles) {
    const { x1, y1, x2, y2 } = box;
    const mutations = {
      left: { x1: Math.max(x1, x2), x2: Math.min(x1, x2), y1, y2 },
      right: { x1: Math.min(x1, x2), x2: Math.max(x1, x2), y1, y2 },
      top: { y1: Math.max(y1, y2), y2: Math.min(y1, y2), x1, x2 },
      bottom: { y1: Math.min(y1, y2), y2: Math.max(y1, y2), x1, x2 },
    };
    return handles.reduce((memo, current) => {
      return Object.assign(memo, mutations[current]);
    }, {});
  },

  getMinimumDomain() {
    return {
      x: [0, 1 / Number.MAX_SAFE_INTEGER],
      y: [0, 1 / Number.MAX_SAFE_INTEGER],
    };
  },

  getDefaultBrushArea(targetProps, cachedDomain, evt) {
    const { domain, fullDomain, scale, horizontal, allowResize } = targetProps;
    const defaultBrushArea =
      !allowResize && !targetProps.defaultBrushArea
        ? "move"
        : targetProps.defaultBrushArea;
    if (defaultBrushArea === "none") {
      return this.getMinimumDomain();
    } else if (defaultBrushArea === "disable") {
      return cachedDomain;
    } else if (defaultBrushArea === "move") {
      const brushBox = this.getDomainBox(targetProps, fullDomain, cachedDomain);
      const parentSVG = targetProps.parentSVG || Selection.getParentSVG(evt);
      const pannedBox = this.panBox(
        {
          ...targetProps,
          ...brushBox,
          brushDomain: cachedDomain,
          startX: (brushBox.x1 + brushBox.x2) / 2,
          startY: (brushBox.y1 + brushBox.y2) / 2,
        },
        Selection.getSVGEventCoordinates(evt, parentSVG),
      );
      const fullDomainBox =
        targetProps.fullDomainBox || this.getDomainBox(targetProps, fullDomain);
      const constrainedBox = this.constrainBox(pannedBox, fullDomainBox);
      return Selection.getBounds({ ...constrainedBox, scale, horizontal });
    }
    return domain;
  },

  getSelectionMutation(point, box, brushDimension) {
    const { x, y } = point;
    const { x1, x2, y1, y2 } = box;
    return {
      x1: brushDimension !== "y" ? x : x1,
      y1: brushDimension !== "x" ? y : y1,
      x2: brushDimension !== "y" ? x : x2,
      y2: brushDimension !== "x" ? y : y2,
    };
  },

  panBox(props, point) {
    const { domain, startX, startY } = props;
    const brushDimension = this.getDimension(props);
    const brushDomain = defaults({}, props.brushDomain, domain);
    const fullDomain = defaults({}, props.fullDomain, domain);
    const { x1, x2, y1, y2 } = props.x1
      ? props
      : this.getDomainBox(props, fullDomain, brushDomain);

    const { x, y } = point;
    const delta = {
      x: startX ? startX - x : 0,
      y: startY ? startY - y : 0,
    };
    return {
      x1:
        brushDimension !== "y" ? Math.min(x1, x2) - delta.x : Math.min(x1, x2),
      x2:
        brushDimension !== "y" ? Math.max(x1, x2) - delta.x : Math.max(x1, x2),
      y1:
        brushDimension !== "x" ? Math.min(y1, y2) - delta.y : Math.min(y1, y2),
      y2:
        brushDimension !== "x" ? Math.max(y1, y2) - delta.y : Math.max(y1, y2),
    };
  },

  constrainBox(box, fullDomainBox) {
    const { x1, y1, x2, y2 } = CoreHelpers.mapValues(fullDomainBox, Number);
    return {
      x1: box.x2 > x2 ? x2 - Math.abs(box.x2 - box.x1) : Math.max(box.x1, x1),
      y1: box.y2 > y2 ? y2 - Math.abs(box.y2 - box.y1) : Math.max(box.y1, y1),
      x2: box.x1 < x1 ? x1 + Math.abs(box.x2 - box.x1) : Math.min(box.x2, x2),
      y2: box.y1 < y1 ? y1 + Math.abs(box.y2 - box.y1) : Math.min(box.y2, y2),
    };
  },

  constrainPoint(point, fullDomainBox) {
    const { x1, y1, x2, y2 } = CoreHelpers.mapValues(fullDomainBox, Number);
    return {
      x: Math.min(Math.max(point.x, x1), x2),
      y: Math.min(Math.max(point.y, y1), y2),
    };
  },

  hasMoved(props) {
    const { x1, x2, y1, y2, mouseMoveThreshold } = props;
    const brushDimension = this.getDimension(props);
    const xMoved = Math.abs(x1 - x2) >= mouseMoveThreshold;
    const yMoved = Math.abs(y1 - y2) >= mouseMoveThreshold;
    switch (brushDimension) {
      case "x":
        return xMoved;
      case "y":
        return yMoved;
      default:
        return xMoved || yMoved;
    }
  },

  onMouseDown(evt, targetProps) {
    evt.preventDefault();
    const {
      handleWidth,
      cachedBrushDomain,
      domain,
      allowResize,
      allowDrag,
      allowDraw,
    } = targetProps;
    const brushDimension = this.getDimension(targetProps);
    const defaultBrushArea =
      !allowResize && !targetProps.defaultBrushArea
        ? "move"
        : targetProps.defaultBrushArea;
    // Don't trigger events for static brushes
    if (!allowResize && !allowDrag) {
      return {};
    }

    const fullDomainBox =
      targetProps.fullDomainBox || this.getDomainBox(targetProps, domain);
    const parentSVG = targetProps.parentSVG || Selection.getParentSVG(evt);
    const { x, y } = Selection.getSVGEventCoordinates(evt, parentSVG);
    // Ignore events that occur outside of the maximum domain region
    if (!this.withinBounds({ x, y }, fullDomainBox, handleWidth)) {
      return {};
    }

    const brushDomain = defaults({}, targetProps.brushDomain, domain);

    const currentDomain = isEqual(brushDomain, cachedBrushDomain)
      ? targetProps.currentDomain || brushDomain || domain
      : brushDomain || domain;

    const domainBox = this.getDomainBox(targetProps, domain, currentDomain);

    const activeHandles =
      allowResize && this.getActiveHandles({ x, y }, targetProps, domainBox);
    // If the event occurs in any of the handle regions, start a resize
    if (activeHandles) {
      return [
        {
          target: "parent",
          mutation: () => {
            return {
              isSelecting: true,
              domainBox,
              fullDomainBox,
              cachedBrushDomain: brushDomain,
              currentDomain,
              parentSVG,
              ...this.getResizeMutation(domainBox, activeHandles),
            };
          },
        },
      ];
    } else if (
      this.withinBounds({ x, y }, domainBox) &&
      !isEqual(domain, currentDomain)
    ) {
      // if the event occurs within a selected region start a panning event, unless the whole
      // domain is selected
      return [
        {
          target: "parent",
          mutation: () => ({
            isPanning: allowDrag,
            startX: x,
            startY: y,
            domainBox,
            fullDomainBox,
            currentDomain,
            cachedBrushDomain: brushDomain,
            parentSVG,
            ...domainBox, // set x1, x2, y1, y2
          }),
        },
      ];
    }
    // if the event occurs outside the region, or if the whole domain is selected,
    // start a new selection
    return allowDraw
      ? [
          {
            target: "parent",
            mutation: () => ({
              isSelecting: allowResize || defaultBrushArea === "move",
              domainBox,
              fullDomainBox,
              parentSVG,
              cachedBrushDomain: brushDomain,
              cachedCurrentDomain: currentDomain,
              currentDomain: this.getMinimumDomain(),
              ...this.getSelectionMutation({ x, y }, domainBox, brushDimension),
            }),
          },
        ]
      : {};
  },

  onGlobalMouseMove(evt, targetProps) {
    const {
      scale,
      isPanning,
      isSelecting,
      fullDomainBox,
      onBrushDomainChange,
      allowResize,
      allowDrag,
      horizontal,
      mouseMoveThreshold,
      parentSVG,
    } = targetProps;
    const brushDimension = this.getDimension(targetProps);
    const { x, y } = Selection.getSVGEventCoordinates(evt, parentSVG);
    if (
      (!allowResize && !allowDrag) ||
      (mouseMoveThreshold > 0 &&
        !this.hasMoved({ ...targetProps, x2: x, y2: y }))
    ) {
      return {};
    }
    if (allowDrag && isPanning) {
      const { startX, startY } = targetProps;
      const pannedBox = this.panBox(targetProps, { x, y });
      const constrainedBox = this.constrainBox(pannedBox, fullDomainBox);
      const currentDomain = Selection.getBounds({
        ...constrainedBox,
        scale,
        horizontal,
      });
      const mutatedProps = {
        currentDomain,
        parentSVG,
        startX:
          pannedBox.x2 >= fullDomainBox.x2 || pannedBox.x1 <= fullDomainBox.x1
            ? startX
            : x,
        startY:
          pannedBox.y2 >= fullDomainBox.y2 || pannedBox.y1 <= fullDomainBox.y1
            ? startY
            : y,
        ...constrainedBox,
      };

      if (CoreHelpers.isFunction(onBrushDomainChange)) {
        onBrushDomainChange(
          currentDomain,
          defaults({}, mutatedProps, targetProps),
        );
      }
      return [
        {
          target: "parent",
          mutation: () => mutatedProps,
        },
      ];
    } else if (allowResize && isSelecting) {
      const { x: x2, y: y2 } = this.constrainPoint(
        {
          x: brushDimension !== "y" ? x : targetProps.x2,
          y: brushDimension !== "x" ? y : targetProps.y2,
        },
        fullDomainBox,
      );
      const currentDomain = Selection.getBounds({
        x2,
        y2,
        x1: targetProps.x1,
        y1: targetProps.y1,
        scale,
        horizontal,
      });

      const mutatedProps = { x2, y2, currentDomain, parentSVG };
      if (CoreHelpers.isFunction(onBrushDomainChange)) {
        onBrushDomainChange(
          currentDomain,
          defaults({}, mutatedProps, targetProps),
        );
      }
      return [
        {
          target: "parent",
          mutation: () => mutatedProps,
        },
      ];
    }
    return {};
  },

  onGlobalMouseUp(evt, targetProps) {
    // if a panning or selection has not been started, ignore the event
    if (!targetProps.isPanning && !targetProps.isSelecting) {
      return {};
    }

    const {
      x1,
      y1,
      x2,
      y2,
      isPanning,
      isSelecting,
      onBrushDomainChange,
      onBrushDomainChangeEnd,
      onBrushCleared,
      currentDomain,
      allowResize,
      allowDrag,
    } = targetProps;
    const defaultBrushArea =
      !allowResize && !targetProps.defaultBrushArea
        ? "move"
        : targetProps.defaultBrushArea;
    const defaultBrushHasArea =
      defaultBrushArea !== undefined && defaultBrushArea !== "none";
    const mutatedProps: {
      isPanning: boolean;
      isSelecting: boolean;
      currentDomain?: any;
    } = { isPanning: false, isSelecting: false };

    // if the mouse hasn't moved since a mouseDown event, select the default brush area
    if ((allowResize || defaultBrushHasArea) && (x1 === x2 || y1 === y2)) {
      const cachedDomain = targetProps.cachedCurrentDomain || currentDomain;
      const defaultDomain = this.getDefaultBrushArea(
        targetProps,
        cachedDomain,
        evt,
      );
      mutatedProps.currentDomain = defaultDomain;
      if (CoreHelpers.isFunction(onBrushDomainChange)) {
        onBrushDomainChange(
          defaultDomain,
          defaults({}, mutatedProps, targetProps),
        );
      }
      if (CoreHelpers.isFunction(onBrushDomainChangeEnd)) {
        onBrushDomainChangeEnd(
          defaultDomain,
          defaults({}, mutatedProps, targetProps),
        );
      }
      if (CoreHelpers.isFunction(onBrushCleared)) {
        onBrushCleared(defaultDomain, defaults({}, mutatedProps, targetProps));
      }
    } else if ((allowDrag && isPanning) || (allowResize && isSelecting)) {
      if (CoreHelpers.isFunction(onBrushDomainChangeEnd)) {
        onBrushDomainChangeEnd(
          currentDomain,
          defaults({}, mutatedProps, targetProps),
        );
      }
    }

    return [
      {
        target: "parent",
        mutation: () => mutatedProps,
      },
    ];
  },
};

export const BrushHelpers = {
  ...Helpers,
  onMouseDown: Helpers.onMouseDown.bind(Helpers),
  onGlobalMouseUp: Helpers.onGlobalMouseUp.bind(Helpers),
  onGlobalMouseMove: throttle(
    Helpers.onGlobalMouseMove.bind(Helpers),
    16, // eslint-disable-line no-magic-numbers
    { leading: true, trailing: false },
  ),
};
