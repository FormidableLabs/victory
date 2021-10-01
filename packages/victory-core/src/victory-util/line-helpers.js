import * as d3Shape from "d3-shape";

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

const toNewName = (interpolation) => {
  // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
  return `curve${capitalize(interpolation)}`;
};

export const getLineFunction = (props) => {
  const { polar, scale, horizontal } = props;
  const defaultOpenCurve = polar ? false : true;
  const openCurve =
    props.openCurve === undefined ? defaultOpenCurve : props.openCurve;
  const interpolationFunction =
    typeof props.interpolation === "function" && props.interpolation;
  const interpolationName =
    typeof props.interpolation === "string" &&
    (!openCurve
      ? `${toNewName(props.interpolation)}Closed`
      : toNewName(props.interpolation));
  return polar
    ? d3Shape
        .lineRadial()
        .defined(defined)
        .curve(interpolationFunction || d3Shape[interpolationName])
        .angle(getAngleAccessor(scale))
        .radius(getYAccessor(scale))
    : d3Shape
        .line()
        .defined(defined)
        .curve(interpolationFunction || d3Shape[interpolationName])
        .x(horizontal ? getYAccessor(scale) : getXAccessor(scale))
        .y(horizontal ? getXAccessor(scale) : getYAccessor(scale));
};
