/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Path } from "victory-core";
import { isPlainObject, assign } from "lodash";

const getVerticalPath = (props) => {
  const { pointerWidth, cornerRadius, orientation, width, height, center } =
    props;
  const sign = orientation === "bottom" ? 1 : -1;
  const x = props.x + (props.dx || 0);
  const y = props.y + (props.dy || 0);
  const centerX = isPlainObject(center) && center.x;
  const centerY = isPlainObject(center) && center.y;
  const pointerEdge = centerY + sign * (height / 2);
  const oppositeEdge = centerY - sign * (height / 2);
  const rightEdge = centerX + width / 2;
  const leftEdge = centerX - width / 2;
  const pointerLength = sign * (y - pointerEdge) < 0 ? 0 : props.pointerLength;
  const direction = orientation === "bottom" ? "0 0 0" : "0 0 1";
  const arc = `${cornerRadius} ${cornerRadius} ${direction}`;
  return `M ${centerX - pointerWidth / 2}, ${pointerEdge}
    L ${pointerLength ? x : centerX + pointerWidth / 2}, ${
    pointerLength ? y : pointerEdge
  }
    L ${centerX + pointerWidth / 2}, ${pointerEdge}
    L ${rightEdge - cornerRadius}, ${pointerEdge}
    A ${arc} ${rightEdge}, ${pointerEdge - sign * cornerRadius}
    L ${rightEdge}, ${oppositeEdge + sign * cornerRadius}
    A ${arc} ${rightEdge - cornerRadius}, ${oppositeEdge}
    L ${leftEdge + cornerRadius}, ${oppositeEdge}
    A ${arc} ${leftEdge}, ${oppositeEdge + sign * cornerRadius}
    L ${leftEdge}, ${pointerEdge - sign * cornerRadius}
    A ${arc} ${leftEdge + cornerRadius}, ${pointerEdge}
    z`;
};

const getHorizontalPath = (props) => {
  const { pointerWidth, cornerRadius, orientation, width, height, center } =
    props;
  const sign = orientation === "left" ? 1 : -1;
  const x = props.x + (props.dx || 0);
  const y = props.y + (props.dy || 0);
  const centerX = isPlainObject(center) && center.x;
  const centerY = isPlainObject(center) && center.y;
  const pointerEdge = centerX - sign * (width / 2);
  const oppositeEdge = centerX + sign * (width / 2);
  const bottomEdge = centerY + height / 2;
  const topEdge = centerY - height / 2;
  const pointerLength = sign * (x - pointerEdge) > 0 ? 0 : props.pointerLength;
  const direction = orientation === "left" ? "0 0 0" : "0 0 1";
  const arc = `${cornerRadius} ${cornerRadius} ${direction}`;
  return `M ${pointerEdge}, ${centerY - pointerWidth / 2}
    L ${pointerLength ? x : pointerEdge}, ${
    pointerLength ? y : centerY + pointerWidth / 2
  }
    L ${pointerEdge}, ${centerY + pointerWidth / 2}
    L ${pointerEdge}, ${bottomEdge - cornerRadius}
    A ${arc} ${pointerEdge + sign * cornerRadius}, ${bottomEdge}
    L ${oppositeEdge - sign * cornerRadius}, ${bottomEdge}
    A ${arc} ${oppositeEdge}, ${bottomEdge - cornerRadius}
    L ${oppositeEdge}, ${topEdge + cornerRadius}
    A ${arc} ${oppositeEdge - sign * cornerRadius}, ${topEdge}
    L ${pointerEdge + sign * cornerRadius}, ${topEdge}
    A ${arc} ${pointerEdge}, ${topEdge + cornerRadius}
    z`;
};

const getFlyoutPath = (props) => {
  const orientation = props.orientation || "top";
  return orientation === "left" || orientation === "right"
    ? getHorizontalPath(props)
    : getVerticalPath(props);
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `id`
   * `style`
   */
  const id = Helpers.evaluateProp(props.id, props);
  const style = Helpers.evaluateStyle(props.style, props);

  return assign({}, props, { id, style });
};

const Flyout = (props) => {
  props = evaluateProps(props);

  return React.cloneElement(props.pathComponent, {
    ...props.events,
    style: props.style,
    d: getFlyoutPath(props),
    className: props.className,
    shapeRendering: props.shapeRendering,
    role: props.role,
    transform: props.transform,
    clipPath: props.clipPath
  });
};

Flyout.propTypes = {
  ...CommonProps.primitiveProps,
  center: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  cornerRadius: PropTypes.number,
  datum: PropTypes.object,
  dx: PropTypes.number,
  dy: PropTypes.number,
  height: PropTypes.number,
  orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  pathComponent: PropTypes.element,
  pointerLength: PropTypes.number,
  pointerWidth: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

Flyout.defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Flyout;
