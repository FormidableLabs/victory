import { Scale } from "victory-util";

module.exports = {
  getScale(props, axisComponent, axis) {
    return Scale.getScaleFromProps(props, axis) ||
      axisComponent.type.getScale(axisComponent.props);
  }
};
