import { Helpers } from "victory-core";
import * as d3Shape from "d3-shape";

import { circle, point } from "./geometry-helper-methods";

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

export const getCustomBarPath = (props, width) => {
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
    const hasIntersection = sign === 1 ?
      y0 - cr[`bottom${side}`] < y1 + cr[`top${side}`] :
      y0 + cr[`bottom${side}`] > y1 - cr[`top${side}`];

    if (hasIntersection) {
      const topCenter = point(x + signL * cr[`top${side}`], y1 + sign * cr[`top${side}`]);
      const topCircle = circle(topCenter, cr[`top${side}`]);
      const bottomCenter = point(x + signL * cr[`bottom${side}`], y0 - sign * cr[`bottom${side}`]);
      const bottomCircle = circle(bottomCenter, cr[`bottom${side}`]);
      const circleIntersection = topCircle.intersection(bottomCircle);
      const hasArcIntersection = circleIntersection.length > 0;
      if (hasArcIntersection) {
        const arcIntersection = circleIntersection[isLeft ? 0 : 1];
        bottomMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
        topMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
      } else {
        const hasBottomLineTopArcIntersection = cr[`top${side}`] > cr[`bottom${side}`];
        if (hasBottomLineTopArcIntersection) {
          const newX = topCircle.solveX(y0)[isLeft ? 0 : 1];
          bottomPoint = { x: newX, y: y0 };
          bottomMiddlePoint = { x: newX, y: y0 };
          topMiddlePoint = { x: newX, y: y0 };
        } else {
          const newX = bottomCircle.solveX(y1)[isLeft ? 0 : 1];
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
export const getVerticalBarPath = (props, width, cornerRadius) => {

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
    const hasIntersection = sign === 1 ?
      y0 + cr[`bottom${side}`] > y1 - cr[`top${side}`] :
      y0 - cr[`bottom${side}`] < y1 + cr[`top${side}`];
    if (hasIntersection) {
      const topCenter = point(y1 - sign * cr[`top${side}`], x + signL * cr[`top${side}`]);
      const topCircle = circle(topCenter, cr[`top${side}`]);
      const bottomCenter = point(y0 + sign * cr[`bottom${side}`], x + signL * cr[`bottom${side}`]);
      const bottomCircle = circle(bottomCenter, cr[`bottom${side}`]);
      const circleIntersection = topCircle.intersection(bottomCircle);
      const hasArcIntersection = circleIntersection.length > 0;
      if (hasArcIntersection) {
        const arcIntersection = circleIntersection.sort((a, b) => a.y - b.y)[isLeft ? 0 : 1];
        bottomMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
        topMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
      } else {
        const hasBottomLineTopArcIntersection = cr[`top${side}`] > cr[`bottom${side}`];
        if (hasBottomLineTopArcIntersection) {
          const newX = topCircle.solveY(y0)[isLeft ? 1 : 0];
          bottomPoint = { y: newX, x: y0 };
          bottomMiddlePoint = { y: newX, x: y0 };
          topMiddlePoint = { y: newX, x: y0 };
        } else {
          const newX = bottomCircle.solveY(y1)[isLeft ? 1 : 0];
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
export const getHorizontalBarPath = (props, width, cornerRadius) => {

  const position = getPosition(props, width);
  const sign = position.y1 > position.y0 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";
  const points = getHorizontalBarPoints(position, sign, cornerRadius);

  return mapPointsToPath(points, cornerRadius, direction);

};

const getCustomVerticalPolarBarPath = (getPath, props) => {
  return getPath(props);
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
    const outerArcLength = r2 * Math.abs(end - start);
    const {
      rightMoves, rightCoords, rightMiddle, leftMoves, leftCoords, leftMiddle
    } = getPathData("top");
    let moves;
    let coords;
    if (topRight === topLeft || outerArcLength < topRight + topLeft) {
      moves = topRight > topLeft ? rightMoves : leftMoves;
      coords = topRight > topLeft ? rightCoords : leftCoords;
    } else if (topRight > topLeft) {
      // either "MAL" or "MAAAL" path segment for rightPath
      // eslint-disable-next-line no-magic-numbers
      const offset = rightMiddle < 3 ? leftMiddle : leftMiddle - 2;
      moves = [...rightMoves.slice(0, 2), ...leftMoves.slice(offset)];
      coords = [...rightCoords.slice(0, 2), ...leftCoords.slice(offset)];
     } else {
      // either "MAL" or "MAAAL" path segment for leftPath
      // eslint-disable-next-line no-magic-numbers
      const offset = leftMiddle < 3 ? rightMiddle : rightMiddle - 2;
      moves = [...leftMoves.slice(0, 2), ...rightMoves.slice(offset)];
      coords = [...leftCoords.slice(0, 2), ...rightCoords.slice(offset)];
    }
    const middle = moves.indexOf("L");
    const subMoves = moves.slice(0, middle);
    const subCoords = coords.slice(0, middle);
    return subMoves.map((m, i) => ({ command: m, coords: subCoords[i].split(",") }));
  };

  // eslint-disable-next-line max-statements
  const getBottomPath = () => {
    const { bottomRight, bottomLeft } = cornerRadius;
    const innerArcLength = r1 * Math.abs(end - start);
    const {
      rightMoves, rightCoords, rightMiddle, leftMoves, leftCoords, leftMiddle
    } = getPathData("bottom");
    let moves;
    let coords;
    if (bottomRight === bottomLeft || innerArcLength < bottomRight + bottomLeft) {
      moves = bottomRight > bottomLeft ? rightMoves : leftMoves;
      coords = bottomRight > bottomLeft ? rightCoords : leftCoords;
    } else if (bottomRight > bottomLeft) {
      let leftOffset;
      // eslint-disable-next-line no-magic-numbers
      if (rightMoves.length - rightMiddle < 4) { // either "LAZ" or "LAAAZ" path segment
        leftOffset = -1;
      } else {
        // eslint-disable-next-line no-magic-numbers
        leftOffset = leftMoves.length - leftMiddle > 3 ? -3 : -2;
      }
      moves = [...rightMoves.slice(0, rightMiddle + 2), ...leftMoves.slice(leftOffset)];
      coords = [...rightCoords.slice(0, rightMiddle + 2), ...leftCoords.slice(leftOffset)];
    } else {
      let rightOffset;
      // eslint-disable-next-line no-magic-numbers
      if (leftMoves.length - leftMiddle < 4) { // either "LAZ" or "LAAAZ" path segment
        rightOffset = -1;
      } else {
        // eslint-disable-next-line no-magic-numbers
        rightOffset = rightMoves.length - rightMiddle > 3 ? -3 : -2;
      }
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
