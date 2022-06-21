import React from "react";
import PropTypes from "prop-types";
import { Rect } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";

const VRect = (props) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <Rect
      vectorEffect="non-scaling-stroke"
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};

export default VRect;

VRect.propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  clipPath: PropTypes.string,
  desc: PropTypes.string,
  events: PropTypes.object,
  height: PropTypes.number,
  role: PropTypes.string,
  rx: PropTypes.number,
  ry: PropTypes.number,
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  transform: PropTypes.string,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};
