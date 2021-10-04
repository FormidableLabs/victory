import React from "react";
import PropTypes from "prop-types";
import { TSpan } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";

const VTSpan = props => {
  const { style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return <TSpan {...rest} {...nativeStyle} />;
};

VTSpan.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  dx: PropTypes.number,
  dy: PropTypes.number,
  events: PropTypes.object,
  style: PropTypes.object,
  textAnchor: PropTypes.oneOf(["start", "middle", "end", "inherit"]),
  x: PropTypes.number,
  y: PropTypes.number
};

export default VTSpan;
