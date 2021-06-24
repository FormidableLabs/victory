import React from "react";
import PropTypes from "prop-types";

const ClipPath = (props) => (
  <defs>
    <clipPath id={props.clipId}>{props.children}</clipPath>
  </defs>
);

ClipPath.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  clipId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default ClipPath;
