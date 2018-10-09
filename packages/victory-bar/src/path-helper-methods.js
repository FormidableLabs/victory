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

// eslint-disable-next-line max-statements, max-len
export const getVerticalBarPath = (props, width, cornerRadius) => {

  const { x0, x1, y0, y1 } = getPosition(props, width);
  const sign = y0 > y1 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";

  const isSelfIntersecting = sign === 1 ?
    (y0 - cornerRadius.bottom) < (y1 + cornerRadius.top) :
    (y1 - cornerRadius.bottom) < (y0 + cornerRadius.top);

  const topArc = `${cornerRadius.top} ${cornerRadius.top} ${direction}`;
  const bottomArc = `${cornerRadius.bottom} ${cornerRadius.bottom} ${direction}`;

  let start = `M ${x0 + cornerRadius.bottom}, ${y0}`;
  let bottomLeftArc = `A ${bottomArc}, ${x0}, ${y0 - sign * cornerRadius.bottom}`;
  let leftLine = `L ${x0}, ${y1 + sign * cornerRadius.top}`;
  let topLeftArc = `A ${topArc}, ${x0 + cornerRadius.top}, ${y1}`;
  let topLine = `L ${x1 - cornerRadius.top}, ${y1}`;
  let topRightArc = `A ${topArc}, ${x1}, ${y1 + sign * cornerRadius.top}`;
  let rightLine = `L ${x1}, ${y0 - sign * cornerRadius.bottom}`;
  let bottomRightArc = `A ${bottomArc}, ${x1 - cornerRadius.bottom}, ${y0}`;
  const end = "z";

  if (isSelfIntersecting) {

    const topLeftCenter = new Point(x0 + cornerRadius.top, y1 + sign * cornerRadius.top);
    const topLeftCircle = new Circle(topLeftCenter, cornerRadius.top);
    const bottomLeftCenter = new Point(x0 + cornerRadius.bottom, y0 - sign * cornerRadius.bottom);
    const bottomLeftCircle = new Circle(bottomLeftCenter, cornerRadius.bottom);
    const topRightCenter = new Point(x1 - cornerRadius.top, y1 + sign * cornerRadius.top);
    const topRightCircle = new Circle(topRightCenter, cornerRadius.top);
    // eslint-disable-next-line max-len
    const bottomRightCenter = new Point(x1 - cornerRadius.bottom, y0 - sign * cornerRadius.bottom);
    const bottomRightCircle = new Circle(bottomRightCenter, cornerRadius.bottom);

    leftLine = null;
    rightLine = null;

    if (cornerRadius.top !== 0 && cornerRadius.bottom !== 0) {

      // find intersection of top left and bottom left arc
      // circles intersect at two points, get the left-most point
      const intrxnLeft = topLeftCircle.intersection(bottomLeftCircle)[0];

      // find intersection of top right and bottom right arc
      // circles intersect at two points, get the right-most point
      const intrxnRight = topRightCircle.intersection(bottomRightCircle)[1];

      bottomLeftArc = `A ${bottomArc}, ${intrxnLeft.x}, ${intrxnLeft.y}`;
      topRightArc = `A ${topArc}, ${intrxnRight.x}, ${intrxnRight.y}`;
    }

    if (cornerRadius.top !== 0 && cornerRadius.bottom === 0) {

      // find intersection of y0 and the top left/right arc
      const intrxnLeftX = topLeftCircle.solveX(y0)[0];
      const intrxnRightX = topRightCircle.solveX(y0)[1];

      start = `M ${intrxnLeftX}, ${y0}`;
      bottomLeftArc = null;
      topRightArc = `A ${topArc}, ${intrxnRightX}, ${y0}`;
      bottomRightArc = null;

    }

    if (cornerRadius.top === 0 && cornerRadius.bottom !== 0) {

      // find intersection of y1 and the bottom left/right arc
      const intrxnLeftX = bottomLeftCircle.solveX(y1)[0];
      const intrxnRightX = bottomRightCircle.solveX(y1)[1];

      bottomLeftArc = `A ${bottomArc}, ${intrxnLeftX}, ${y1}`;
      topLeftArc = null;
      topLine = `L ${intrxnRightX}, ${y1}`;
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
    end ].filter((l) => l !== null).join("\n");

};

export const getHorizontalBarPath = (props, width, cornerRadius) => {
  const { x0, x1, y0, y1 } = getPosition(props, width);
  const sign = y1 > y0 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";
  const topArc = `${cornerRadius.top} ${cornerRadius.top} ${direction}`;
  const bottomArc = `${cornerRadius.bottom} ${cornerRadius.bottom} ${direction}`;

  const start = `M ${y0}, ${x1 + sign * cornerRadius.bottom}`;
  const topLeftArc = `A ${bottomArc}, ${y0 + cornerRadius.bottom}, ${x1}`;
  const topLine = `L ${y1 - sign * cornerRadius.top}, ${x1}`;
  const topRightArc = `A ${topArc}, ${y1}, ${x1 + cornerRadius.top}`;
  const rightLine = `L ${y1}, ${x0 - cornerRadius.top}`;
  const bottomRightArc = `A ${topArc}, ${y1 - sign * cornerRadius.top}, ${x0}`;
  const bottomLine = `L ${y0 + cornerRadius.bottom}, ${x0 }`;
  const bottomLeftArc = `A ${bottomArc}, ${y0}, ${x0 - sign * cornerRadius.bottom}`;
  const end = "z";

  return [ start,
    topLeftArc,
    topLine,
    topRightArc,
    rightLine,
    bottomRightArc,
    bottomLine,
    bottomLeftArc,
    end ].join("\n");

};

// eslint-disable-next-line max-statements, max-len
export const getVerticalPolarBarPath = (props, cornerRadius) => {
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
