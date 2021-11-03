import React from "react";
import PropTypes from "prop-types";
import { Path } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";

const VPath = (props) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <Path
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};

export default VPath;

VPath.propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  clipPath: PropTypes.string,
  d: PropTypes.string,
  desc: PropTypes.string,
  events: PropTypes.object,
  role: PropTypes.string,
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  transform: PropTypes.string
};
