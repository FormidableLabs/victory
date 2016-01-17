import { Scale } from "victory-util";

module.exports = {
  getScale(props, axisComponent, axis) {
    const propsScale = Scale.getScaleFromProps(props, axis);
      // otherwise use whatever scale the axis uses, (default: d3.scale.linear)
    const axisScale = axisComponent.type.getScale(axisComponent.props);
    return propsScale || axisScale;
  }
};
