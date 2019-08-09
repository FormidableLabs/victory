import React from "react";
import PropTypes from "prop-types";
import isEqual from "react-fast-compare";

const TSpan = (props) => {
  const { children, ...rest } = props;
  return <tspan {...rest}>{children}</tspan>;
};

TSpan.propTypes = {
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

export default React.memo(TSpan, isEqual);
