import { Helpers, Selection, SVGCoordinateType } from "victory-core";
import { throttle } from "lodash";

const ON_MOUSE_MOVE_THROTTLE_MS = 16;

class CursorHelpersClass {
  getDimension(props) {
    const { horizontal, cursorDimension } = props;
    if (!horizontal || !cursorDimension) {
      return cursorDimension;
    }
    return cursorDimension === "x" ? "y" : "x";
  }

  withinBounds(point, bounds) {
    const { x1, x2, y1, y2 } = Helpers.mapValues(bounds, Number);
    const { x, y } = Helpers.mapValues(point, Number);
    return (
      x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2)
    );
  }

  private handleMouseMove = (evt, targetProps) => {
    const { onCursorChange, domain } = targetProps;
    const cursorDimension = this.getDimension(targetProps);
    const parentSVG = targetProps.parentSVG || Selection.getParentSVG(evt);
    const cursorSVGPosition = Selection.getSVGEventCoordinates(evt, parentSVG);
    let cursorValue: SVGCoordinateType | null = Selection.getDataCoordinates(
      targetProps,
      targetProps.scale,
      cursorSVGPosition.x,
      cursorSVGPosition.y,
    );

    const inBounds = this.withinBounds(cursorValue, {
      x1: domain.x[0],
      x2: domain.x[1],
      y1: domain.y[0],
      y2: domain.y[1],
    });

    if (!inBounds) {
      cursorValue = null;
    }

    if (Helpers.isFunction(onCursorChange)) {
      if (cursorValue) {
        const value = cursorDimension
          ? cursorValue[cursorDimension]
          : cursorValue;
        onCursorChange(value, targetProps);
      } else if (cursorValue !== targetProps.cursorValue) {
        onCursorChange(targetProps.defaultCursorValue || null, targetProps);
      }
    }

    return [
      {
        target: "parent",
        eventKey: "parent",
        mutation: () => ({ cursorValue, parentSVG }),
      },
    ];
  };

  onMouseMove = throttle(this.handleMouseMove, ON_MOUSE_MOVE_THROTTLE_MS, {
    leading: true,
    trailing: false,
  });

  onMouseLeave = this.handleMouseMove;

  onTouchEnd = (evt, targetProps) => {
    const { onCursorChange } = targetProps;

    if (Helpers.isFunction(targetProps.onCursorChange)) {
      onCursorChange(null, targetProps);
    }

    return [
      {
        target: "parent",
        eventKey: "parent",
        mutation: () => ({ cursorValue: null }),
      },
    ];
  };
}

export const CursorHelpers = new CursorHelpersClass();

/* {
  ...CursorHelpers,
  onMouseMove: throttle(
    CursorHelpers.onMouseMove.bind(CursorHelpers),
    ON_MOUSE_MOVE_THROTTLE_MS,
    {
      leading: true,
      trailing: false,
    },
  ),
  onMouseLeave: CursorHelpers.onMouseMove.bind(CursorHelpers),
  onTouchEnd: CursorHelpers.onTouchEnd.bind(CursorHelpers),
};


   */
