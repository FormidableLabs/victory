import { Selection } from "victory-core";
import { throttle, isFunction } from "lodash";
import { attachId } from "../../helpers/event-handlers";
import BrushHelpers from "./brush-helpers";

const CursorHelpers = {
  onMouseMove(evt, targetProps) {
    const { onChange, dimension, domain } = targetProps;
    const cursorSVGPosition = Selection.getSVGEventCoordinates(evt);
    let cursorPosition = Selection.getDataCoordinates(
      targetProps.scale,
      cursorSVGPosition.x,
      cursorSVGPosition.y
    );

    const inBounds = BrushHelpers.withinBounds(cursorPosition, {
      x1: domain.x[0],
      x2: domain.x[1],
      y1: domain.y[0],
      y2: domain.y[1]
    });

    if (!inBounds) {
      cursorPosition = null;
    }

    if (isFunction(onChange)) {
      if (inBounds) {
        const value = dimension ? cursorPosition[dimension] : cursorPosition;
        onChange(value);
      } else if (cursorPosition !== targetProps.cursorPosition) {
        onChange(targetProps.defaultCursorValue || null);
      }
    }

    return [{
      target: "parent",
      eventKey: "parent",
      mutation: () => ({ cursorPosition })
    }];
  }
};

export default {
  onMouseMove: throttle(
    attachId(CursorHelpers.onMouseMove.bind(CursorHelpers)),
    32, // eslint-disable-line no-magic-numbers
    { leading: true, trailing: false })
};
