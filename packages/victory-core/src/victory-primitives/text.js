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
  desc: PropTypes.string,
  title: PropTypes.string
};

export default React.memo(Text, isEqual);
