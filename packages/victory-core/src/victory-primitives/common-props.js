import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";

export default {
  active: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  events: PropTypes.object,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  polar: PropTypes.bool,
  role: PropTypes.string,
  scale: PropTypes.oneOfType([
    CustomPropTypes.scale,
    PropTypes.shape({ x: CustomPropTypes.scale, y: CustomPropTypes.scale })
  ]),
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  transform: PropTypes.string
};
