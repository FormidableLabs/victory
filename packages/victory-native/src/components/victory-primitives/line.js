import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";

const VLine = (props) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <Line
      vectorEffect="non-scaling-stroke"
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};

export default VLine;

VLine.propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  clipPath: PropTypes.string,
  desc: PropTypes.string,
  events: PropTypes.object,
  role: PropTypes.string,
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  transform: PropTypes.string,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number,
};
