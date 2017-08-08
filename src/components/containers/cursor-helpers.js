import { Selection } from "victory-core";
import { throttle, isFunction } from "lodash";
import { attachId } from "../../helpers/event-handlers";
import BrushHelpers from "./brush-helpers";

const CursorHelpers = {
  onMouseMove(evt, targetProps) {
    const { onChange, dimension, domain } = targetProps;
    const cursorSVGPosition = Selection.getSVGEventCoordinates(evt);
    let cursorValue = Selection.getDataCoordinates(
      targetProps,
      targetProps.scale,
      cursorSVGPosition.x,
      cursorSVGPosition.y
    );

    const inBounds = BrushHelpers.withinBounds(cursorValue, {
      x1: domain.x[0],
      x2: domain.x[1],
      y1: domain.y[0],
      y2: domain.y[1]
    });

    if (!inBounds) {
      cursorValue = null;
    }

    if (isFunction(onChange)) {
      if (inBounds) {
        const value = dimension ? cursorValue[dimension] : cursorValue;
        onChange(value, targetProps);
      } else if (cursorValue !== targetProps.cursorValue) {
        onChange(targetProps.defaultCursorValue || null, targetProps);
      }
    }

    return [{
      target: "parent",
      eventKey: "parent",
      mutation: () => ({ cursorValue })
    }];
  }
};

export default {
  onMouseMove: throttle(
    attachId(CursorHelpers.onMouseMove.bind(CursorHelpers)),
    32, // eslint-disable-line no-magic-numbers
    { leading: true, trailing: false })
};
