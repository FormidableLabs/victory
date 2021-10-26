import { assign } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { CommonProps, Helpers, Path } from "victory-core";
import { getStyle, getBarWidth, getCornerRadius } from "./bar-helper-methods";
import { getPolarBarPath, getBarPath } from "./path-helper-methods";

const evaluateProps = (props) => {
  /**
   * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `barWidth`
   * 3) `cornerRadius`
   *
   * Everything else does not have to be evaluated in a particular order:
   * `ariaLabel`
   * `desc`
   * `id`
   * `tabIndex`
   */
  const style = getStyle(props.style, props);
  const barWidth = getBarWidth(props.barWidth, assign({}, props, { style }));
  const cornerRadius = getCornerRadius(
    props.cornerRadius,
    assign({}, props, { style, barWidth })
  );

  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, {
    ariaLabel,
    style,
    barWidth,
    cornerRadius,
    desc,
    id,
    tabIndex
  });
};

const Bar = (props) => {
  props = evaluateProps(props);
  const { polar, origin, style, barWidth, cornerRadius } = props;

  const path = polar
    ? getPolarBarPath(props, cornerRadius)
    : getBarPath(props, barWidth, cornerRadius);
  const defaultTransform =
    polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
  return React.cloneElement(props.pathComponent, {
    ...props.events,
    "aria-label": props.ariaLabel,
    style,
    d: path,
    className: props.className,
    clipPath: props.clipPath,
    desc: props.desc,
    index: props.index,
    role: props.role,
    shapeRendering: props.shapeRendering,
    transform: props.transform || defaultTransform,
    tabIndex: props.tabIndex
  });
};

Bar.propTypes = {
  ...CommonProps.primitiveProps,
  alignment: PropTypes.oneOf(["start", "middle", "end"]),
  barRatio: PropTypes.number,
  barWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  cornerRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    PropTypes.shape({
      top: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      topLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      topRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottomLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottomRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
    })
  ]),
  datum: PropTypes.object,
  getPath: PropTypes.func,
  horizontal: PropTypes.bool,
  pathComponent: PropTypes.element,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  y0: PropTypes.number
};

Bar.defaultProps = {
  defaultBarWidth: 8,
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Bar;
