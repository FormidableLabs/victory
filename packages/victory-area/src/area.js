/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import * as d3Shape from "d3-shape";
import { Helpers, CommonProps, Path } from "victory-core";

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

const getY0Accessor = (scale) => {
  return (d) => scale.y(d._y0);
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

const getLineFunction = (props) => {
  const { polar, scale, horizontal } = props;
  const interpolationFunction = typeof props.interpolation === "function" && props.interpolation;
  const interpolationName =
    typeof props.interpolation === "string" && toNewName(props.interpolation);
  return polar
    ? d3Shape
        .lineRadial()
        .defined(defined)
        .curve(interpolationFunction || d3Shape[`${interpolationName}Closed`])
        .angle(getAngleAccessor(scale))
        .radius(getYAccessor(scale))
    : d3Shape
        .line()
        .defined(defined)
        .curve(interpolationFunction || d3Shape[interpolationName])
        .x(horizontal ? getYAccessor(scale) : getXAccessor(scale))
        .y(horizontal ? getXAccessor(scale) : getYAccessor(scale));
};

const getCartesianArea = (props, interpolation) => {
  const { horizontal, scale } = props;
  const interpolationFunction = typeof interpolation === "function" && interpolation;
  const interpolationName = typeof interpolation === "string" && interpolation;
  return horizontal
    ? d3Shape
        .area()
        .defined(defined)
        .curve(interpolationFunction || d3Shape[interpolationName])
        .x0(getY0Accessor(scale))
        .x1(getYAccessor(scale))
        .y(getXAccessor(scale))
    : d3Shape
        .area()
        .defined(defined)
        .curve(interpolationFunction || d3Shape[interpolationName])
        .x(getXAccessor(scale))
        .y1(getYAccessor(scale))
        .y0(getY0Accessor(scale));
};

const getAreaFunction = (props) => {
  const { polar, scale } = props;
  const interpolationFunction = typeof props.interpolation === "function" && props.interpolation;
  const interpolationName =
    typeof props.interpolation === "string" && toNewName(props.interpolation);
  const interpolation = interpolationFunction || interpolationName;
  return polar
    ? d3Shape
        .radialArea()
        .defined(defined)
        .curve(interpolationFunction || d3Shape[`${interpolationName}Closed`])
        .angle(getAngleAccessor(scale))
        .outerRadius(getYAccessor(scale))
        .innerRadius(getY0Accessor(scale))
    : getCartesianArea(props, interpolation);
};

const Area = (props) => {
  const {
    role,
    shapeRendering,
    className,
    polar,
    origin,
    data,
    pathComponent,
    events,
    groupComponent,
    clipPath,
    id
  } = props;
  const style = Helpers.evaluateStyle(assign({ fill: "black" }, props.style), props);
  const defaultTransform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
  const transform = props.transform || defaultTransform;
  const renderLine = style.stroke && style.stroke !== "none" && style.stroke !== "transparent";
  const areaFunction = getAreaFunction(props);
  const lineFunction = renderLine && getLineFunction(props);

  const areaStroke = style.stroke ? "none" : style.fill;

  const sharedProps = { className, role, shapeRendering, transform, ...events, clipPath };
  const area = React.cloneElement(
    pathComponent,
    assign(
      {
        key: `${id}-area`,
        style: assign({}, style, { stroke: areaStroke }),
        d: areaFunction(data),
        desc: Helpers.evaluateProp(props.desc, props),
        tabIndex: Helpers.evaluateProp(props.tabIndex, props)
      },
      sharedProps
    )
  );

  const line = renderLine
    ? React.cloneElement(
        pathComponent,
        assign(
          {
            key: `${id}-area-stroke`,
            style: assign({}, style, { fill: "none" }),
            d: lineFunction(data)
          },
          sharedProps
        )
      )
    : null;

  return renderLine ? React.cloneElement(groupComponent, {}, [area, line]) : area;
};

Area.propTypes = {
  ...CommonProps.primitiveProps,
  groupComponent: PropTypes.element,
  interpolation: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  pathComponent: PropTypes.element
};

Area.defaultProps = {
  groupComponent: <g />,
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Area;
