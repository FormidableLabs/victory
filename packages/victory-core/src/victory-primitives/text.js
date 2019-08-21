import React from "react";
import PropTypes from "prop-types";

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
  desc: PropTypes.string,
  title: PropTypes.string
};

export default Text;
