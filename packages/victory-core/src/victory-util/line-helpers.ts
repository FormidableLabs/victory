import * as d3Shape from "victory-vendor/d3-shape";

const defined = (d) => {
  const y = d._y1 !== undefined ? d._y1 : d._y;
  return y !== null && y !== undefined && d._y0 !== null;
};

const getXAccessor = (scale) => {
  return (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
};

const getYAccessor = (scale) => {
  return (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
};

const getAngleAccessor = (scale) => {
  return (d) => {
    const x = scale.x(d._x1 !== undefined ? d._x1 : d._x);
    return -1 * x + Math.PI / 2;
  };
};

export type CurveName =
  | "basis"
  | "cardinal"
  | "bumpX"
  | "bumpY"
  | "bundle"
  | "catmullRom"
  | "linear"
  | "monotoneX"
  | "monotoneY"
  | "step"
  | "stepAfter"
  | "stepBefore"
  | "natural";

type ShapeMethod = keyof Pick<
  typeof d3Shape,
  | "curveBasis"
  | "curveCardinal"
  | "curveBumpX"
  | "curveBumpY"
  | "curveBundle"
  | "curveCatmullRom"
  | "curveLinear"
  | "curveMonotoneX"
  | "curveMonotoneY"
  | "curveStep"
  | "curveStepAfter"
  | "curveStepBefore"
  | "curveNatural"
>;
type ShapeMethodClosed = keyof Pick<
  typeof d3Shape,
  | "curveBasisClosed"
  | "curveCardinalClosed"
  | "curveLinearClosed"
  | "curveCatmullRomClosed"
>;

const toNewName = (interpolation: CurveName) => {
  // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
  return `curve${capitalize(interpolation)}` as ShapeMethod;
};
const toNewNameClosed = (interpolation: CurveName) => {
  return `${toNewName(interpolation)}Closed` as ShapeMethodClosed;
};

export const getInterpolationFunction = (props) => {
  const { interpolation } = props;

  if (typeof interpolation === "function") {
    return interpolation;
  }
  if (typeof interpolation === "string") {
    const { polar, openCurve = !polar } = props;
    const interpolationName = !openCurve
      ? toNewNameClosed(interpolation as CurveName)
      : toNewName(interpolation as CurveName);

    return d3Shape[interpolationName];
  }

  return d3Shape.curveLinear;
};

export const getLineFunction = (props) => {
  const { polar, scale, horizontal } = props;
  return polar
    ? d3Shape
        .lineRadial()
        .defined(defined)
        .curve(getInterpolationFunction(props))
        .angle(getAngleAccessor(scale))
        .radius(getYAccessor(scale))
    : d3Shape
        .line()
        .defined(defined)
        .curve(getInterpolationFunction(props))
        .x(horizontal ? getYAccessor(scale) : getXAccessor(scale))
        .y(horizontal ? getXAccessor(scale) : getYAccessor(scale));
};
