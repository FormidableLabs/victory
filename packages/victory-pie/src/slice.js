import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Path } from "victory-core";
import { defaults, isFunction, assign } from "lodash";
import * as d3Shape from "d3-shape";

const getPath = (props) => {
  const { slice, radius, innerRadius, cornerRadius } = props;
  if (isFunction(props.pathFunction)) {
    return props.pathFunction(slice);
  }
  const padAngle = Helpers.degreesToRadians(props.padAngle);
  const startAngle = Helpers.degreesToRadians(props.sliceStartAngle);
  const endAngle = Helpers.degreesToRadians(props.sliceEndAngle);
  const pathFunction = d3Shape
    .arc()
    .cornerRadius(cornerRadius)
    .outerRadius(radius)
    .innerRadius(innerRadius || 0);
  return pathFunction(defaults({ startAngle, endAngle, padAngle }, slice));
};

const evaluateProps = (props) => {
  /**
   * * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `radius`
   * 3) `innerRadius`
   *
   * Everything else does not have to be evaluated in a particular order:
   * `ariaLabel`
   * `id`
   * `cornerRadius`
   * `padAngle`
   * `sliceStartAngle`
   * `sliceEndAngle`
   * `tabIndex`
   */
  const style = Helpers.evaluateStyle(props.style, props);
  const radius = Helpers.evaluateProp(
    props.radius,
    assign({}, props, { style })
  );
  const innerRadius = Helpers.evaluateProp(
    props.innerRadius,
    assign({}, props, { style, radius })
  );

  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const id = Helpers.evaluateProp(props.id, props);
  const cornerRadius = Helpers.evaluateProp(props.cornerRadius, props);
  const padAngle = Helpers.evaluateProp(props.padAngle, props);
  const sliceStartAngle = Helpers.evaluateProp(props.sliceStartAngle, props);
  const sliceEndAngle = Helpers.evaluateProp(props.sliceEndAngle, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, {
    ariaLabel,
    style,
    radius,
    innerRadius,
    id,
    cornerRadius,
    padAngle,
    sliceStartAngle,
    sliceEndAngle,
    tabIndex
  });
};

const Slice = (props) => {
  props = evaluateProps(props);
  const defaultTransform = props.origin
    ? `translate(${props.origin.x}, ${props.origin.y})`
    : undefined;

  return React.cloneElement(props.pathComponent, {
    ...props.events,
    "aria-label": props.ariaLabel,
    d: getPath(props),
    style: props.style,
    transform: props.transform || defaultTransform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    clipPath: props.clipPath,
    tabIndex: props.tabIndex
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
