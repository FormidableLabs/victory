import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Path } from "victory-core";
import { defaults, isFunction, assign } from "lodash";
import * as d3Shape from "d3-shape";

const getPath = (props) => {
  const { slice, radius, innerRadius } = props;
  if (isFunction(props.pathFunction)) {
    return props.pathFunction(slice);
  }
  const cornerRadius = Helpers.evaluateProp(props.cornerRadius, props);
  const padAngle = Helpers.degreesToRadians(Helpers.evaluateProp(props.padAngle, props));
  const startAngle = Helpers.degreesToRadians(Helpers.evaluateProp(props.sliceStartAngle, props));
  const endAngle = Helpers.degreesToRadians(Helpers.evaluateProp(props.sliceEndAngle, props));
  const pathFunction = d3Shape
    .arc()
    .cornerRadius(cornerRadius)
    .outerRadius(radius)
    .innerRadius(innerRadius);
  return pathFunction(defaults({ startAngle, endAngle, padAngle }, slice));
};

const evaluateProps = (props) => {
  /* Potential evaluated props are
    1) style
    2) radius
    3) innerRadius
    4) everything else
  */
  const style = Helpers.evaluateStyle(props.style, props);
  const radius = Helpers.evaluateProp(props.radius, assign({}, props, { style }));
  const innerRadius = Helpers.evaluateProp(props.innerRadius, assign({}, props, { style, radius }));
  return assign({}, props, { style, radius, innerRadius });
};

const Slice = (props) => {
  props = evaluateProps(props);
  const defaultTransform = props.origin
    ? `translate(${props.origin.x}, ${props.origin.y})`
    : undefined;
  return React.cloneElement(props.pathComponent, {
    ...props.events,
    d: getPath(props),
    style: props.style,
    transform: props.transform || defaultTransform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    clipPath: props.clipPath
  });
};

Slice.propTypes = {
  ...CommonProps.primitiveProps,
  cornerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  datum: PropTypes.object,
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  pathComponent: PropTypes.element,
  pathFunction: PropTypes.func,
  radius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  slice: PropTypes.object,
  sliceEndAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sliceStartAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};

Slice.defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Slice;
