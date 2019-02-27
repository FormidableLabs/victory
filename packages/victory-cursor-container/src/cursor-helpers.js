import { Selection } from "victory-core";
import { throttle, isFunction, mapValues } from "lodash";

const CursorHelpers = {
  getDimension(props) {
    const { horizontal, cursorDimension } = props;
    if (!horizontal || !cursorDimension) {
      return cursorDimension;
    }
    return cursorDimension === "x" ? "y" : "x";
  },

  withinBounds(point, bounds) {
    const { x1, x2, y1, y2 } = mapValues(bounds, Number);
    const { x, y } = mapValues(point, Number);
    return (
      x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2)
    );
  },

  onMouseMove(evt, targetProps) {
    const { onCursorChange, domain } = targetProps;
    const cursorDimension = this.getDimension(targetProps);
    const parentSVG = targetProps.parentSVG || Selection.getParentSVG(evt);
    const cursorSVGPosition = Selection.getSVGEventCoordinates(evt, parentSVG);
    let cursorValue = Selection.getDataCoordinates(
      targetProps,
      targetProps.scale,
      cursorSVGPosition.x,
      cursorSVGPosition.y
    );

    const inBounds = this.withinBounds(cursorValue, {
      x1: domain.x[0],
      x2: domain.x[1],
      y1: domain.y[0],
      y2: domain.y[1]
    });

    if (!inBounds) {
      cursorValue = null;
    }

    if (isFunction(onCursorChange)) {
      if (inBounds) {
        const value = cursorDimension ? cursorValue[cursorDimension] : cursorValue;
        onCursorChange(value, targetProps);
      } else if (cursorValue !== targetProps.cursorValue) {
        onCursorChange(targetProps.defaultCursorValue || null, targetProps);
      }
    }

    return [
      {
        target: "parent",
        eventKey: "parent",
        mutation: () => ({ cursorValue, parentSVG })
      }
    ];
  },

  onTouchEnd(evt, targetProps) {
    const { onCursorChange } = targetProps;

    if (isFunction(targetProps.onCursorChange)) {
      onCursorChange(null, targetProps);
    }

    return [
      {
        target: "parent",
        eventKey: "parent",
        mutation: () => ({ cursorValue: null })
      }
    ];
  }
};

export default {
  ...CursorHelpers,
  onMouseMove: throttle(
    CursorHelpers.onMouseMove.bind(CursorHelpers),
    32, // eslint-disable-line no-magic-numbers
    { leading: true, trailing: false }
  ),
  onTouchEnd: CursorHelpers.onTouchEnd.bind(CursorHelpers)
};
