import Scale from "../../helpers/scale";

module.exports = {
  getScale(props, axisComponent, axis) {
    return Scale.getScaleFromProps(props, axis) ||
      axisComponent.type.getScale(axisComponent.props);
  }
};
