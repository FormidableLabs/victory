import { Helpers } from "victory-core";
import * as d3Shape from "d3-shape";

const distance = (p0, p1) => {
  return Math.sqrt((p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2);
};

const hasIntersection = (circle0, circle1) => {
  const P0 = circle0.center;
  const P1 = circle1.center;
  const r0 = circle0.radius;
  const r1 = circle1.radius;
  const d = distance(P0, P1);

  if (d > r0 + r1) {
    return false; // separate circles
  }
  if (d < Math.abs(r0 - r1)) {
    return false; // one circle contains another
  }
  return true;
};

const equalCircles = (circle0, circle1) => {
  const P0 = circle0.center;
  const P1 = circle1.center;
  const r0 = circle0.radius;
  const r1 = circle1.radius;
  return r0 === r1 && P0.x === P1.x && P0.y === P1.y;
};

// Source: http://paulbourke.net/geometry/circlesphere/
// "Intersection of two circles" by Paul Bourke
// Left-most point is returned as 0th element of array
// Right-most point is returned as 1st element of array
const intersection = (circle0, circle1) => { // eslint-disable-line max-statements
  const P0 = circle0.center;
  const P1 = circle1.center;
  const r0 = circle0.radius;
  const r1 = circle1.radius;
  const d = distance(P0, P1);
  if (!hasIntersection(circle0, circle1) || equalCircles(circle0, circle1)) {
    return [];
  }
  const a = (r0 ** 2 - r1 ** 2 + d ** 2) / (2 * d);
  const h = Math.sqrt(r0 ** 2 - a ** 2);
  const scalar = a / d || 1;
  const P2 = {
    x: P0.x + (P1.x - P0.x) * scalar,
    y: P0.y + (P1.y - P0.y) * scalar
  };
  const { x: x0, y: y0 } = P0;
  const { x: x1, y: y1 } = P1;
  const { x: x2, y: y2 } = P2;
  const P3s = [
    { x: x2 - h * (y1 - y0) / d, y: y2 + h * (x1 - x0) / d },
    { x: x2 + h * (y1 - y0) / d, y: y2 - h * (x1 - x0) / d }
  ];
  P3s.sort((Point1, Point2) => Point1.x - Point2.x);
  return P3s;
};

const solveX = (circle, y) => {
  const sqrt = Math.sqrt(circle.radius ** 2 - (y - circle.center.y) ** 2);
  return [ circle.center.x - sqrt, circle.center.x + sqrt ];
};

const solveY = (circle, x) => {
  const sqrt = Math.sqrt(circle.radius ** 2 - (x - circle.center.x) ** 2);
  return [ circle.center.y - sqrt, circle.center.y + sqrt ];
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

const getCustomBarPath = (props, width) => {
  const { getPath } = props;
  const propsWithCalculatedValues = { ...props, ...getPosition(props, width) };
  return getPath(propsWithCalculatedValues);
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

const mapPointsToPath = (coords, cornerRadius, direction) => {
  const topLeftPath = `${cornerRadius.topLeft} ${cornerRadius.topLeft} ${direction}`;
  const topRightPath = `${cornerRadius.topRight} ${cornerRadius.topRight} ${direction}`;
  const bottomLeftPath = `${cornerRadius.bottomLeft} ${cornerRadius.bottomLeft} ${direction}`;
  const bottomRightPath = `${cornerRadius.bottomRight} ${cornerRadius.bottomRight} ${direction}`;

  const commands = [
    "M", `A ${bottomLeftPath},`, "L", `A ${topLeftPath},`,
    "L", `A ${topRightPath},`, "L", `A ${bottomRightPath},`
  ];
  const path = commands.reduce((acc, command, i) => {
    acc += `${command} ${coords[i].x}, ${coords[i].y} \n`;
    return acc;
  }, "");
  return `${path} z`;
};

const getVerticalBarPoints = (position, sign, cr) => {

  const { x0, x1, y0, y1 } = position;

  // eslint-disable-next-line max-statements, max-len
  const getHalfPoints = (side) => {
    const isLeft = side === "Left";
    const signL = isLeft ? 1 : -1;
    const x = isLeft ? x0 : x1;
    let bottomPoint = { x: x + signL * cr[`bottom${side}`], y: y0 };
    let bottomMiddlePoint = { x, y: y0 - sign * cr[`bottom${side}`] };
    let topMiddlePoint = { x, y: y1 + sign * cr[`top${side}`] };
    let topPoint = { x: x + signL * cr[`top${side}`], y: y1 };
    const intersects = sign === 1 ?
      y0 - cr[`bottom${side}`] < y1 + cr[`top${side}`] :
      y0 + cr[`bottom${side}`] > y1 - cr[`top${side}`];

    if (intersects) {
      const topCenter = { x: x + signL * cr[`top${side}`], y: y1 + sign * cr[`top${side}`] };
      const topCircle = { center: topCenter, radius: cr[`top${side}`] };
      const bottomCenter = {
        x: x + signL * cr[`bottom${side}`],
        y: y0 - sign * cr[`bottom${side}`]
      };
      const bottomCircle = { center: bottomCenter, radius: cr[`bottom${side}`] };
      const circleIntersection = intersection(topCircle, bottomCircle);
      const hasArcIntersection = circleIntersection.length > 0;
      if (hasArcIntersection) {
        const arcIntersection = circleIntersection[isLeft ? 0 : 1];
        bottomMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
        topMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
      } else {
        const hasBottomLineTopArcIntersection = cr[`top${side}`] > cr[`bottom${side}`];
        if (hasBottomLineTopArcIntersection) {
          const newX = solveX(topCircle, y0)[isLeft ? 0 : 1];
          bottomPoint = { x: newX, y: y0 };
          bottomMiddlePoint = { x: newX, y: y0 };
          topMiddlePoint = { x: newX, y: y0 };
        } else {
          const newX = solveX(bottomCircle, y1)[isLeft ? 0 : 1];
          bottomMiddlePoint = { x: newX, y: y1 };
          topMiddlePoint = { x: newX, y: y1 };
          topPoint = { x: newX, y: y1 };
        }
      }
    }
    const points = [ bottomPoint, bottomMiddlePoint, topMiddlePoint, topPoint ];
    return isLeft ? points : points.reverse();
  };

  return getHalfPoints("Left").concat(getHalfPoints("Right"));
};

// eslint-disable-next-line max-statements, max-len
const getVerticalBarPath = (props, width, cornerRadius) => {

  const position = getPosition(props, width);
  const sign = position.y0 > position.y1 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";
  const points = getVerticalBarPoints(position, sign, cornerRadius);

  return mapPointsToPath(points, cornerRadius, direction);

};

const getHorizontalBarPoints = (position, sign, cr) => {

  const { x0, x1, y0, y1 } = position;

  // eslint-disable-next-line max-statements, max-len
  const getHalfPoints = (side) => {
    const isLeft = side === "Left";
    const signL = isLeft ? 1 : -1;
    const x = isLeft ? x1 : x0;
    let bottomPoint = { y: x + signL * cr[`bottom${side}`], x: y0 };
    let bottomMiddlePoint = { y: x, x: y0 + sign * cr[`bottom${side}`] };
    let topMiddlePoint = { y: x, x: y1 - sign * cr[`top${side}`] };
    let topPoint = { y: x + signL * cr[`top${side}`], x: y1 };
    const intersects = sign === 1 ?
      y0 + cr[`bottom${side}`] > y1 - cr[`top${side}`] :
      y0 - cr[`bottom${side}`] < y1 + cr[`top${side}`];
    if (intersects) {
      const topCenter = { x: y1 - sign * cr[`top${side}`], y: x + signL * cr[`top${side}`] };
      const topCircle = { center: topCenter, radius: cr[`top${side}`] };
      const bottomCenter = {
        x: y0 + sign * cr[`bottom${side}`],
        y: x + signL * cr[`bottom${side}`]
      };
      const bottomCircle = { center: bottomCenter, radius: cr[`bottom${side}`] };
      const circleIntersection = intersection(topCircle, bottomCircle);
      const hasArcIntersection = circleIntersection.length > 0;
      if (hasArcIntersection) {
        const arcIntersection = circleIntersection.sort((a, b) => a.y - b.y)[isLeft ? 0 : 1];
        bottomMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
        topMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
      } else {
        const hasBottomLineTopArcIntersection = cr[`top${side}`] > cr[`bottom${side}`];
        if (hasBottomLineTopArcIntersection) {
          const newX = solveY(topCircle, y0)[isLeft ? 1 : 0];
          bottomPoint = { y: newX, x: y0 };
          bottomMiddlePoint = { y: newX, x: y0 };
          topMiddlePoint = { y: newX, x: y0 };
        } else {
          const newX = solveY(bottomCircle, y1)[isLeft ? 1 : 0];
          bottomMiddlePoint = { y: newX, x: y1 };
          topMiddlePoint = { y: newX, x: y1 };
          topPoint = { y: newX, x: y1 };
        }
      }
    }
    const points = [ bottomPoint, bottomMiddlePoint, topMiddlePoint, topPoint ];
    return isLeft ? points : points.reverse();
  };

  return getHalfPoints("Left").concat(getHalfPoints("Right"));
};

// eslint-disable-next-line max-statements, max-len
const getHorizontalBarPath = (props, width, cornerRadius) => {

  const position = getPosition(props, width);
  const sign = position.y1 > position.y0 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";
  const points = getHorizontalBarPoints(position, sign, cornerRadius);

  return mapPointsToPath(points, cornerRadius, direction);

};

// eslint-disable-next-line max-statements, max-len
const getVerticalPolarBarPath = (props, cornerRadius) => {
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
    return pathFunction();
  };

  const getPathData = (edge) => {
    const rightPath = getPath(`${edge}Right`);
    const rightMoves = rightPath.match(/[A-Z]/g);
    const rightCoords = rightPath.split(/[A-Z]/).slice(1);
    const rightMiddle = rightMoves.indexOf("L");
    const leftPath = getPath(`${edge}Left`);
    const leftMoves = leftPath.match(/[A-Z]/g);
    const leftCoords = leftPath.split(/[A-Z]/).slice(1);
    const leftMiddle = leftMoves.indexOf("L");
    return { rightMoves, rightCoords, rightMiddle, leftMoves, leftCoords, leftMiddle };
  };

   // eslint-disable-next-line max-statements
  const getTopPath = () => {
    const { topRight, topLeft } = cornerRadius;
    const arcLength = r2 * Math.abs(end - start);
    const {
      rightMoves, rightCoords, rightMiddle, leftMoves, leftCoords, leftMiddle
    } = getPathData("top");
    let moves;
    let coords;
    if (topRight === topLeft || arcLength < 2 * topRight + 2 * topLeft) {
      moves = topRight > topLeft ? rightMoves : leftMoves;
      coords = topRight > topLeft ? rightCoords : leftCoords;
    } else {
      // eslint-disable-next-line no-magic-numbers
      const isShort = (middle) => middle < 3;
      const rightOffset = topLeft > topRight && isShort(rightMiddle) ? 1 : 2;
      let leftOffset;
      if (topRight > topLeft) {
        const defaultOffset = isShort(rightMiddle) ? leftMiddle : leftMiddle - 2;
        leftOffset = isShort(leftMiddle) ? leftMiddle - 1 : defaultOffset;
      } else {
        const defaultOffset = isShort(leftMiddle) ? 1 : 2;
        leftOffset = isShort(rightMiddle) ? defaultOffset : leftMiddle - 2;
      }
      moves = [...rightMoves.slice(0, rightOffset), ...leftMoves.slice(leftOffset)];
      coords = [...rightCoords.slice(0, rightOffset), ...leftCoords.slice(leftOffset)];
    }

    const middle = moves.indexOf("L");
    const subMoves = moves.slice(0, middle);
    const subCoords = coords.slice(0, middle);
    return subMoves.map((m, i) => ({ command: m, coords: subCoords[i].split(",") }));
  };

  // eslint-disable-next-line max-statements
  const getBottomPath = () => {
    const { bottomRight, bottomLeft } = cornerRadius;
    const arcLength = r1 * Math.abs(end - start);
    const {
      rightMoves, rightCoords, rightMiddle, leftMoves, leftCoords, leftMiddle
    } = getPathData("bottom");
    let moves;
    let coords;
    if (bottomRight === bottomLeft || arcLength < 2 * bottomRight + 2 * bottomLeft) {
      moves = bottomRight > bottomLeft ? rightMoves : leftMoves;
      coords = bottomRight > bottomLeft ? rightCoords : leftCoords;
    } else {
      // eslint-disable-next-line no-magic-numbers
      const isShort = (m, middle) => m.length - middle < 4;
      const shortPath = bottomRight > bottomLeft ?
        isShort(rightMoves, rightMiddle) : isShort(leftMoves, leftMiddle);
      // eslint-disable-next-line no-magic-numbers
      const rightOffset = shortPath ? -1 : -3;

      moves = [...leftMoves.slice(0, leftMiddle + 2), ...rightMoves.slice(rightOffset)];
      coords = [...leftCoords.slice(0, leftMiddle + 2), ...rightCoords.slice(rightOffset)];
    }
    const middle = moves.indexOf("L");
    const subMoves = moves.slice(middle, -1);
    const subCoords = coords.slice(middle, -1);
    return subMoves.map((m, i) => ({ command: m, coords: subCoords[i].split(",") }));
  };

  const topPath = getTopPath();
  const bottomPath = getBottomPath();
  const moves = [ ...topPath, ...bottomPath];
  const path = moves.reduce((memo, move) => {
    memo += `${move.command} ${move.coords.join()}`;
    return memo;
  }, "");
  return `${path} z`;
};

export default {
  getVerticalBarPath,
  getHorizontalBarPath,
  getVerticalPolarBarPath,
  getCustomBarPath
};
