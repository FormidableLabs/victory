import { Helpers } from "victory-core";
import * as d3Shape from "d3-shape";

import { Circle, Point } from "./geometry-helper-methods";

const getAngle = (props, index) => {
  const { data, scale } = props;
  const x = data[index]._x1 === undefined ? "_x" : "_x1";
  return scale.x(data[index][x]);
};

const getAngularWidth = (props, width) => {
  const { scale } = props;
  const range = scale.y.range();
  const r = Math.max(...range);
  const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
  return (width / (2 * Math.PI * r)) * angularRange;
};

const transformAngle = (angle) => {
  return -1 * angle + (Math.PI / 2);
};

const getPosition = (props, width) => {
  const { x, y, y0, horizontal } = props;
  const alignment = props.alignment || "middle";
  const size = alignment === "middle" ? width / 2 : width;
  const sign = horizontal ? -1 : 1;
  return {
    x0: alignment === "start" ? x : x - (sign * size),
    x1: alignment === "end" ? x : x + (sign * size),
    y0,
    y1: y
  };
};

const getStartAngle = (props, index) => {
  const { data, scale, alignment } = props;
  const currentAngle = getAngle(props, index);
  const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
  const previousAngle = index === 0 ?
    getAngle(props, data.length - 1) - (Math.PI * 2) :
    getAngle(props, index - 1);
  if (index === 0 && angularRange < (2 * Math.PI)) {
    return scale.x.range()[0];
  } else if (alignment === "start" || alignment === "end") {
    return alignment === "start" ? previousAngle : currentAngle;
  } else {
    return (currentAngle + previousAngle) / 2;
  }
};

const getEndAngle = (props, index) => {
  const { data, scale, alignment } = props;
  const currentAngle = getAngle(props, index);
  const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
  const lastAngle = scale.x.range()[1] === (2 * Math.PI) ?
    getAngle(props, 0) + (Math.PI * 2) : scale.x.range()[1];
  const nextAngle = index === data.length - 1 ?
    getAngle(props, 0) + (Math.PI * 2) : getAngle(props, index + 1);
  if (index === data.length - 1 && angularRange < (2 * Math.PI)) {
    return lastAngle;
  } else if (alignment === "start" || alignment === "end") {
    return alignment === "start" ? currentAngle : nextAngle;
  } else {
    return (currentAngle + nextAngle) / 2;
  }
};

const getVerticalBarPoints = (position, sign, cr) => {

  const { x0, x1, y0, y1 } = position;

  // eslint-disable-next-line max-statements, max-len
  const getHalfPoints = (side) => {
    const isLeft = side === "Left";
    const signLeft = isLeft ? 1 : -1;
    const x = isLeft ? x0 : x1;
    const points = [
      { x: x + signLeft * cr[`bottom${side}`], y: y0 },
      { x, y: y0 - sign * cr[`bottom${side}`] },
      { x, y: y1 + sign * cr[`top${side}`] },
      { x: x + signLeft * cr[`top${side}`], y: y1 }
    ];
    const hasIntersection = sign === 1 ?
      y0 - cr[`bottom${side}`] < y1 + cr[`top${side}`] :
      y0 + cr[`bottom${side}`] > y1 - cr[`top${side}`];

    if (hasIntersection) {
      const topCenter = new Point(
        x + signLeft * cr[`top${side}`],
        y1 + sign * cr[`top${side}`]
      );
      const topCircle = new Circle(topCenter, cr[`top${side}`]);
      const bottomCenter = new Point(
        x + signLeft * cr[`bottom${side}`],
        y0 - sign * cr[`bottom${side}`]
      );
      const bottomCircle = new Circle(bottomCenter, cr[`bottom${side}`]);
      const circleIntersection = topCircle.intersection(bottomCircle);
      const hasArcIntersection = circleIntersection.length > 0;
      if (hasArcIntersection) {
        const arcIntersection = circleIntersection[isLeft ? 0 : 1];
        points[1] = { x: arcIntersection.x, y: arcIntersection.y };
        points[2] = { x: arcIntersection.x, y: arcIntersection.y };
      } else {
        const hasBottomLineTopArcIntersection = cr[`top${side}`] > cr[`bottom${side}`];
        if (hasBottomLineTopArcIntersection) {
          const newX = topCircle.solveX(y0)[isLeft ? 0 : 1];
          ([0, 1, 2]).forEach((i) => { points[i] = { x: newX, y: y0 }; });
        } else {
          const newX = bottomCircle.solveX(y1)[isLeft ? 0 : 1];
          ([1, 2, 3]).forEach((i) => { points[i] = { x: newX, y: y1 }; });
        }
      }
    }
    return isLeft ? points : points.reverse();
  };

  return getHalfPoints("Left").concat(getHalfPoints("Right"));
};

// eslint-disable-next-line max-statements, max-len
export const getVerticalBarPath = (props, width, cornerRadius) => {

  const position = getPosition(props, width);
  const sign = position.y0 > position.y1 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";
  const points = getVerticalBarPoints(position, sign, cornerRadius);

  const topLeftPath = `${cornerRadius.topLeft} ${cornerRadius.topLeft} ${direction}`;
  const topRightPath = `${cornerRadius.topRight} ${cornerRadius.topRight} ${direction}`;
  const bottomLeftPath = `${cornerRadius.bottomLeft} ${cornerRadius.bottomLeft} ${direction}`;
  const bottomRightPath = `${cornerRadius.bottomRight} ${cornerRadius.bottomRight} ${direction}`;

  /* eslint-disable no-magic-numbers */
  const start = `M ${points[0].x}, ${points[0].y}`;
  const bottomLeftArc = `A ${bottomLeftPath}, ${points[1].x}, ${points[1].y}`;
  const leftLine = `L ${points[2].x}, ${points[2].y}`;
  const topLeftArc = `A ${topLeftPath}, ${points[3].x}, ${points[3].y}`;
  const topLine = `L ${points[4].x}, ${points[4].y}`;
  const topRightArc = `A ${topRightPath}, ${points[5].x}, ${points[5].y}`;
  const rightLine = `L ${points[6].x}, ${points[6].y}`;
  const bottomRightArc = `A ${bottomRightPath}, ${points[7].x}, ${points[7].y}`;
  const end = "z";
  /* eslint-enable no-magic-numbers */

  return [ start,
    bottomLeftArc,
    leftLine,
    topLeftArc,
    topLine,
    topRightArc,
    rightLine,
    bottomRightArc,
    end ].join("\n");

};

// eslint-disable-next-line max-statements, max-len
export const getHorizontalBarPath = (props, width, cornerRadius) => {
  // "bottom" means y0 (not "bottom of screen / viewbox")
  // "top" means y1, "left" means x1, "right" means x0

  // TODO: Incorporate corner radius left/right
  cornerRadius = {
    top: Math.max(cornerRadius.topLeft, cornerRadius.topRight),
    bottom: Math.max(cornerRadius.bottomLeft, cornerRadius.bottomRight)
  };

  const { x0, x1, y0, y1 } = getPosition(props, width);
  const sign = y1 > y0 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";

  const isSelfIntersecting = sign > 0 ?
    (y1 - cornerRadius.top) < (y0 + cornerRadius.bottom) :
    (y0 - cornerRadius.bottom) < (y1 + cornerRadius.top);

  const topArc = `${cornerRadius.top} ${cornerRadius.top} ${direction}`;
  const bottomArc = `${cornerRadius.bottom} ${cornerRadius.bottom} ${direction}`;

  let start = `M ${y0}, ${x1 + cornerRadius.bottom}`;
  let bottomLeftArc = `A ${bottomArc}, ${y0 + sign * cornerRadius.bottom}, ${x1}`;
  let leftLine = `L ${y1 - sign * cornerRadius.top}, ${x1}`;
  let topLeftArc = `A ${topArc}, ${y1}, ${x1 + cornerRadius.top}`;
  let topLine = `L ${y1}, ${x0 - cornerRadius.top}`;
  let topRightArc = `A ${topArc}, ${y1 - sign * cornerRadius.top}, ${x0}`;
  let rightLine = `L ${y0 + sign * cornerRadius.bottom}, ${x0}`;
  let bottomRightArc = `A ${bottomArc}, ${y0}, ${x0 - cornerRadius.bottom}`;
  const end = "z";

  if (isSelfIntersecting) {

    const bottomLeftCenter = new Point(y0 + sign * cornerRadius.bottom, x1 + cornerRadius.bottom);
    const bottomLeftCircle = new Circle(bottomLeftCenter, cornerRadius.bottom);
    const bottomRightCenter = new Point(y0 + sign * cornerRadius.bottom, x0 - cornerRadius.bottom);
    const bottomRightCircle = new Circle(bottomRightCenter, cornerRadius.bottom);
    const topLeftCenter = new Point(y1 - sign * cornerRadius.top, x1 + cornerRadius.top);
    const topLeftCircle = new Circle(topLeftCenter, cornerRadius.top);
    // eslint-disable-next-line max-len
    const topRightCenter = new Point(y1 - sign * cornerRadius.top, x0 - cornerRadius.top);
    const topRightCircle = new Circle(topRightCenter, cornerRadius.top);

    leftLine = null;
    rightLine = null;

    if (cornerRadius.top !== 0 && cornerRadius.bottom !== 0) {

      // find intersection of top left and bottom left arc
      const intrxnLeft = bottomLeftCircle
                          .intersection(topLeftCircle)
                          .sort((a, b) => a.y - b.y)[0];

      // find intersection of top right and bottom right arc
      const intrxnRight = bottomRightCircle
                          .intersection(topRightCircle)
                          .sort((a, b) => a.y - b.y)[1];

      bottomLeftArc = `A ${bottomArc}, ${intrxnLeft.x}, ${intrxnLeft.y}`;
      topRightArc = `A ${topArc}, ${intrxnRight.x}, ${intrxnRight.y}`;

    }

    if (cornerRadius.top !== 0 && cornerRadius.bottom === 0) {

      // find intersection of y0 and the top left/right arc
      const intrxnTopLeft = topLeftCircle
                              .solveY(y0)
                              .sort((a, b) => a - b)[0];
      const intrxnTopRight = topRightCircle
                              .solveY(y0)
                              .sort((a, b) => a - b)[1];

      start = `M ${y0}, ${intrxnTopLeft}`;
      bottomLeftArc = null;
      topRightArc = `A ${topArc}, ${y0}, ${intrxnTopRight}`;
      bottomRightArc = null;

    }

    if (cornerRadius.top === 0 && cornerRadius.bottom !== 0) {

      // find intersection of y1 and the bottom left/right arc
      const intrxnBottomLeft = bottomLeftCircle
                                  .solveY(y1)
                                  .sort((a, b) => a - b)[0];
      const intrxnBottomRight = bottomRightCircle
                                  .solveY(y1)
                                  .sort((a, b) => a - b)[1];

      bottomLeftArc = `A ${bottomArc}, ${y1}, ${intrxnBottomLeft}`;
      topLeftArc = null;
      topLine = `L ${y1} ${intrxnBottomRight}`;
      topRightArc = null;

    }
  }

  return [ start,
    bottomLeftArc,
    leftLine,
    topLeftArc,
    topLine,
    topRightArc,
    rightLine,
    bottomRightArc,
    end ].filter(Boolean).join("\n");

};

// eslint-disable-next-line max-statements, max-len
export const getVerticalPolarBarPath = (props, cornerRadius) => {

  // TODO: Incorporate corner radius left/right
  cornerRadius = {
    top: Math.max(cornerRadius.topLeft, cornerRadius.topRight),
    bottom: Math.max(cornerRadius.bottomLeft, cornerRadius.bottomRight)
  };
  const { datum, scale, index, alignment } = props;
  const style = Helpers.evaluateStyle(props.style, datum, props.active);
  const r1 = scale.y(datum._y0 || 0);
  const r2 = scale.y(datum._y1 !== undefined ? datum._y1 : datum._y);
  const currentAngle = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
  let start;
  let end;
  if (style.width) {
    const width = getAngularWidth(props, style.width);
    const size = alignment === "middle" ? width / 2 : width;
    start = alignment === "start" ? currentAngle : currentAngle - size;
    end = alignment === "end" ? currentAngle : currentAngle + size;
  } else {
    start = getStartAngle(props, index);
    end = getEndAngle(props, index);
  }

  const getPath = (edge) => {
    const pathFunction = d3Shape.arc()
    .innerRadius(r1)
    .outerRadius(r2)
    .startAngle(transformAngle(start))
    .endAngle(transformAngle(end))
    .cornerRadius(cornerRadius[edge]);
    const path = pathFunction();
    const moves = path.match(/[A-Z]/g);
    const middle = moves.indexOf("L");
    const coords = path.split(/[A-Z]/).slice(1);
    const subMoves = edge === "top" ? moves.slice(0, middle) : moves.slice(middle);
    const subCoords = edge === "top" ? coords.slice(0, middle) : coords.slice(middle);
    return subMoves.map((m, i) => ({ command: m, coords: subCoords[i].split(",") }));
  };

  const moves = getPath("top").concat(getPath("bottom"));
  return moves.reduce((memo, move) => {
    memo += `${move.command} ${move.coords.join()}`;
    return memo;
  }, "");
};
