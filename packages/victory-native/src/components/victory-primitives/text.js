import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";

const VText = (props) => {
  const {
    "aria-label": accessibilityLabel,
    children,
    desc,
    style,
    ...rest
  } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <Text
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    >
      {children}
    </Text>
  );
};

VText.propTypes = {
  "aria-label": PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  desc: PropTypes.string,
  direction: PropTypes.oneOf(["ltr", "rtl", "inherit"]),
  dx: PropTypes.number,
  dy: PropTypes.number,
  events: PropTypes.object,
  style: PropTypes.object,
  transform: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number
};

export default VText;
