import React from "react";
import PropTypes from "prop-types";
import isEqual from "react-fast-compare";

const Line = (props) => <line vectorEffect="non-scaling-stroke" {...props} />;

Line.propTypes = {
  className: PropTypes.string,
  clipPath: PropTypes.string,
  events: PropTypes.object,
  role: PropTypes.string,
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  transform: PropTypes.string,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number
};

export default React.memo(Line, isEqual);
