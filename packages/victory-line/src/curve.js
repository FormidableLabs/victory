/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import { Helpers, CommonProps, Path, LineHelpers } from "victory-core";

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `ariaLabel`
   * `id`
   * `style`
   * `tabIndex`
   */
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const id = Helpers.evaluateProp(props.id, props);
  const style = Helpers.evaluateStyle(
    assign({ fill: "none", stroke: "black" }, props.style),
    props
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, { ariaLabel, id, style, tabIndex });
};

const Curve = (props) => {
  props = evaluateProps(props);
  const { polar, origin } = props;
  const lineFunction = LineHelpers.getLineFunction(props);
  const defaultTransform =
    polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;

  return React.cloneElement(props.pathComponent, {
    ...props.events,
    "aria-label": props.ariaLabel,
    d: lineFunction(props.data),
    style: props.style,
    transform: props.transform || defaultTransform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    clipPath: props.clipPath,
    tabIndex: props.tabIndex
  });
};

Curve.propTypes = {
  ...CommonProps.primitiveProps,
  interpolation: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  openCurve: PropTypes.bool,
  origin: PropTypes.object,
  pathComponent: PropTypes.element,
  polar: PropTypes.bool
};

Curve.defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Curve;
