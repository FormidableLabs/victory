import * as d3Shape from "victory-vendor/d3-shape";
import { BarProps } from "./bar";

import { circle, point } from "./geometry-helper-methods";

const getPosition = (props, width) => {
  const { x, x0, y, y0, horizontal } = props;
  const alignment = props.alignment || "middle";
  const size = alignment === "middle" ? width / 2 : width;
  const sign = horizontal ? -1 : 1;
  if (horizontal) {
    return {
      x0,
      x1: x,
      y0: alignment === "start" ? y : y - sign * size,
      y1: alignment === "end" ? y : y + sign * size,
    };
  }

  return {
    x0: alignment === "start" ? x : x - sign * size,
    x1: alignment === "end" ? x : x + sign * size,
    y0,
    y1: y,
  };
};

const getAngle = (props, index: number) => {
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

const transformAngle = (angle: number) => {
  return -1 * angle + Math.PI / 2;
};

export const getCustomBarPath = (
  props: BarProps,
  width: number,
): string | undefined => {
  const { getPath } = props;
  if (typeof getPath === "function") {
    const propsWithCalculatedValues = {
      ...props,
      ...getPosition(props, width),
    };
    return getPath(propsWithCalculatedValues);
  }
};

const getStartAngle = (props, index: number) => {
  const { data, scale, alignment } = props;
  const currentAngle = getAngle(props, index);
  const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
  const previousAngle =
    index === 0
      ? getAngle(props, data.length - 1) - Math.PI * 2
      : getAngle(props, index - 1);
  if (index === 0 && angularRange < 2 * Math.PI) {
    return scale.x.range()[0];
  } else if (alignment === "start" || alignment === "end") {
    return alignment === "start" ? previousAngle : currentAngle;
  }
  return (currentAngle + previousAngle) / 2;
};

const getEndAngle = (props, index: number) => {
  const { data, scale, alignment } = props;
  const currentAngle = getAngle(props, index);
  const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
  const lastAngle =
    scale.x.range()[1] === 2 * Math.PI
      ? getAngle(props, 0) + Math.PI * 2
      : scale.x.range()[1];
  const nextAngle =
    index === data.length - 1
      ? getAngle(props, 0) + Math.PI * 2
      : getAngle(props, index + 1);
  if (index === data.length - 1 && angularRange < 2 * Math.PI) {
    return lastAngle;
  } else if (alignment === "start" || alignment === "end") {
    return alignment === "start" ? currentAngle : nextAngle;
  }
  return (currentAngle + nextAngle) / 2;
};

const mapPointsToPath = (coords, cornerRadius, direction) => {
  const topLeftPath = `${cornerRadius.topLeft} ${cornerRadius.topLeft} ${direction}`;
  const topRightPath = `${cornerRadius.topRight} ${cornerRadius.topRight} ${direction}`;
  const bottomLeftPath = `${cornerRadius.bottomLeft} ${cornerRadius.bottomLeft} ${direction}`;
  const bottomRightPath = `${cornerRadius.bottomRight} ${cornerRadius.bottomRight} ${direction}`;

  const commands = [
    "M",
    `A ${bottomLeftPath},`,
    "L",
    `A ${topLeftPath},`,
    "L",
    `A ${topRightPath},`,
    "L",
    `A ${bottomRightPath},`,
  ];
  const path = commands.reduce(
    (acc, command, i) => `${acc}${command} ${coords[i].x}, ${coords[i].y} \n`,
    "",
  );
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
    const hasIntersection =
      sign === 1
        ? y0 - cr[`bottom${side}`] < y1 + cr[`top${side}`]
        : y0 + cr[`bottom${side}`] > y1 - cr[`top${side}`];
    if (hasIntersection) {
      const topCenter = point(
        x + signL * cr[`top${side}`],
        y1 + sign * cr[`top${side}`],
      );
      const topCircle = circle(topCenter, cr[`top${side}`]);
      const bottomCenter = point(
        x + signL * cr[`bottom${side}`],
        y0 - sign * cr[`bottom${side}`],
      );
      const bottomCircle = circle(bottomCenter, cr[`bottom${side}`]);
      const circleIntersection = topCircle.intersection(bottomCircle);
      const hasArcIntersection = circleIntersection.length > 0;
      if (hasArcIntersection) {
        const arcIntersection = circleIntersection[isLeft ? 0 : 1];
        bottomMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
        topMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
      } else {
        const hasBottomLineTopArcIntersection =
          cr[`top${side}`] > cr[`bottom${side}`];
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
    const points = [bottomPoint, bottomMiddlePoint, topMiddlePoint, topPoint];
    return isLeft ? points : points.reverse();
  };

  return getHalfPoints("Left").concat(getHalfPoints("Right"));
};

const getHorizontalBarPoints = (position, sign, cr) => {
  const { y0, y1 } = position;
  const x0 = position.x0 < position.x1 ? position.x0 : position.x1;
  const x1 = position.x0 < position.x1 ? position.x1 : position.x0;

  // eslint-disable-next-line max-statements, max-len
  const getHalfPoints = (side) => {
    const isTop = side === "top";
    const signL = isTop ? -1 : 1;
    const y = isTop ? y1 : y0;
    let leftPoint = { x: x0, y: y - signL * cr[`${side}Left`] };
    let leftMiddlePoint = { x: x0 + cr[`${side}Left`], y };
    let rightMiddlePoint = { x: x1 - cr[`${side}Right`], y };
    let rightPoint = { x: x1, y: y - signL * cr[`${side}Right`] };
    const hasIntersection = leftMiddlePoint.x > rightMiddlePoint.x;
    if (hasIntersection) {
      const leftCenter = point(
        x0 + cr[`${side}Left`],
        y - signL * cr[`${side}Left`],
      );
      const leftCircle = circle(leftCenter, cr[`${side}Left`]);
      const rightCenter = point(
        x1 - cr[`${side}Right`],
        y - signL * cr[`${side}Right`],
      );
      const rightCircle = circle(rightCenter, cr[`${side}Right`]);
      const circleIntersection = leftCircle.intersection(rightCircle);
      const hasArcIntersection = circleIntersection.length > 0;
      if (hasArcIntersection) {
        const arcIntersection = circleIntersection[sign > 0 ? 1 : 0];
        leftMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
        rightMiddlePoint = { x: arcIntersection.x, y: arcIntersection.y };
      } else {
        const hasLeftLineRightArcIntersection =
          cr[`${side}Right`] > cr[`${side}Left`];
        if (hasLeftLineRightArcIntersection) {
          const newY = rightCircle.solveY(x0)[isTop ? 0 : 1];
          leftPoint = { x: x0, y: newY };
          leftMiddlePoint = { x: x0, y: newY };
          rightMiddlePoint = { x: x0, y: newY };
        } else {
          const newY = leftCircle.solveY(x1)[isTop ? 0 : 1];
          rightPoint = { x: x1, y: newY };
          rightMiddlePoint = { x: x1, y: newY };
          leftMiddlePoint = { x: x1, y: newY };
        }
      }
    }
    return [leftPoint, leftMiddlePoint, rightMiddlePoint, rightPoint];
  };
  const topPoints = getHalfPoints("top");
  const bottomPoints = getHalfPoints("bottom");
  return [
    bottomPoints[1],
    bottomPoints[0],
    ...topPoints,
    // eslint-disable-next-line no-magic-numbers
    bottomPoints[3],
    bottomPoints[2],
  ];
};

// eslint-disable-next-line max-params
export const getVerticalBarPath = (props, width, cornerRadius) => {
  const position = getPosition(props, width);

  const sign = position.y0 > position.y1 ? 1 : -1;
  const direction = sign > 0 ? "0 0 1" : "0 0 0";
  const points = getVerticalBarPoints(position, sign, cornerRadius);
  return mapPointsToPath(points, cornerRadius, direction);
};

// eslint-disable-next-line max-params
export const getHorizontalBarPath = (props, width, cornerRadius) => {
  const position = getPosition(props, width);

  const sign = position.x0 < position.x1 ? 1 : -1;
  const direction = "0 0 1";
  const cr = {
    topRight: sign > 0 ? cornerRadius.topLeft : cornerRadius.bottomLeft,
    bottomRight: sign > 0 ? cornerRadius.topRight : cornerRadius.bottomRight,
    bottomLeft: sign > 0 ? cornerRadius.bottomRight : cornerRadius.topRight,
    topLeft: sign > 0 ? cornerRadius.bottomLeft : cornerRadius.topLeft,
  };
  const points = getHorizontalBarPoints(position, sign, cr);
  return mapPointsToPath(points, cr, direction);
};

export const getVerticalPolarBarPath = (props: BarProps, cornerRadius) => {
  const { datum, scale, index, alignment, style } = props;
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
    start = getStartAngle(props, Number(index));
    end = getEndAngle(props, Number(index));
  }

  const getPath = (edge): string => {
    const pathFunction: any = d3Shape
      .arc()
      .innerRadius(r1)
      .outerRadius(r2)
      .startAngle(transformAngle(start))
      .endAngle(transformAngle(end))
      .cornerRadius(cornerRadius[edge]);

    return pathFunction();
  };

  const getPathData = (edge) => {
    const rightPath = getPath(`${edge}Right`);
    const rightMoves: string[] = rightPath.match(/[A-Z]/g) || [];
    const rightCoords = rightPath.split(/[A-Z]/).slice(1);
    const rightMiddle = rightMoves.indexOf("L");

    const leftPath = getPath(`${edge}Left`);
    const leftMoves: string[] = leftPath.match(/[A-Z]/g) || [];
    const leftCoords = leftPath.split(/[A-Z]/).slice(1);
    const leftMiddle = leftMoves.indexOf("L");

    return {
      rightMoves,
      rightCoords,
      rightMiddle,
      leftMoves,
      leftCoords,
      leftMiddle,
    };
  };

  // eslint-disable-next-line max-statements
  const getTopPath = () => {
    const { topRight, topLeft } = cornerRadius;
    const arcLength = r2 * Math.abs(end - start);
    const {
      rightMoves,
      rightCoords,
      rightMiddle,
      leftMoves,
      leftCoords,
      leftMiddle,
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
        const defaultOffset = isShort(rightMiddle)
          ? leftMiddle
          : leftMiddle - 2;
        leftOffset = isShort(leftMiddle) ? leftMiddle - 1 : defaultOffset;
      } else {
        const defaultOffset = isShort(leftMiddle) ? 1 : 2;
        leftOffset = isShort(rightMiddle) ? defaultOffset : leftMiddle - 2;
      }
      moves = [
        ...rightMoves.slice(0, rightOffset),
        ...leftMoves.slice(leftOffset),
      ];
      coords = [
        ...rightCoords.slice(0, rightOffset),
        ...leftCoords.slice(leftOffset),
      ];
    }

    const middle = moves.indexOf("L");
    const subMoves = moves.slice(0, middle);
    const subCoords = coords.slice(0, middle);
    return subMoves.map((m, i) => ({
      command: m,
      coords: subCoords[i].split(","),
    }));
  };

  // eslint-disable-next-line max-statements
  const getBottomPath = () => {
    const { bottomRight, bottomLeft } = cornerRadius;
    const arcLength = r1 * Math.abs(end - start);
    const {
      rightMoves,
      rightCoords,
      rightMiddle,
      leftMoves,
      leftCoords,
      leftMiddle,
    } = getPathData("bottom");
    let moves;
    let coords;
    if (
      bottomRight === bottomLeft ||
      arcLength < 2 * bottomRight + 2 * bottomLeft
    ) {
      moves = bottomRight > bottomLeft ? rightMoves : leftMoves;
      coords = bottomRight > bottomLeft ? rightCoords : leftCoords;
    } else {
      // eslint-disable-next-line no-magic-numbers
      const isShort = (m, middle) => m.length - middle < 4;
      const shortPath =
        bottomRight > bottomLeft
          ? isShort(rightMoves, rightMiddle)
          : isShort(leftMoves, leftMiddle);
      // eslint-disable-next-line no-magic-numbers
      const rightOffset = shortPath ? -1 : -3;

      moves = [
        ...leftMoves.slice(0, leftMiddle + 2),
        ...rightMoves.slice(rightOffset),
      ];
      coords = [
        ...leftCoords.slice(0, leftMiddle + 2),
        ...rightCoords.slice(rightOffset),
      ];
    }
    const middle = moves.indexOf("L");
    const subMoves = moves.slice(middle, -1);
    const subCoords = coords.slice(middle, -1);
    return subMoves.map((m, i) => ({
      command: m,
      coords: subCoords[i].split(","),
    }));
  };

  const topPath = getTopPath();
  const bottomPath = getBottomPath();
  const moves = [...topPath, ...bottomPath];
  const path = moves.reduce(
    (memo, move) => `${memo}${move.command} ${move.coords.join()}`,
    "",
  );
  return `${path} z`;
};

export const getBarPath = (props: BarProps, width: number, cornerRadius) => {
  if (props.getPath) {
    return getCustomBarPath(props, width);
  }

  return props.horizontal
    ? getHorizontalBarPath(props, width, cornerRadius)
    : getVerticalBarPath(props, width, cornerRadius);
};

export const getPolarBarPath = (props: BarProps, cornerRadius) => {
  // TODO Radial bars
  return getVerticalPolarBarPath(props, cornerRadius);
};
