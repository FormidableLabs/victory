import React from "react";
import PropTypes from "prop-types";
import isEqual from "react-fast-compare";

const Circle = (props) => <circle vectorEffect="non-scaling-stroke" {...props} />;

Circle.propTypes = {
  className: PropTypes.string,
  clipPath: PropTypes.string,
  cx: PropTypes.number,
  cy: PropTypes.number,
  events: PropTypes.object,
  r: PropTypes.number,
  role: PropTypes.string,
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  transform: PropTypes.string
};

export default React.memo(Circle, isEqual);
