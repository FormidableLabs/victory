import React from "react";
import PropTypes from "prop-types";
import isEqual from "react-fast-compare";

const Text = (props) => {
  const { children, title, desc, ...rest } = props;
  return (
    <text {...rest}>
      {title && <title>{title}</title>}
      {desc && <desc>{desc}</desc>}
      {children}
    </text>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  desc: PropTypes.string,
  direction: PropTypes.oneOf(["ltr", "rtl", "inherit"]),
  dx: PropTypes.number,
  dy: PropTypes.number,
  style: PropTypes.object,
  title: PropTypes.string,
  transform: PropTypes.string,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default React.memo(Text, isEqual);
