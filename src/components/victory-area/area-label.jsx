import defaults from "lodash/object/defaults";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";

export default class AreaLabel extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    labelComponent: PropTypes.any,
    labelText: PropTypes.string,
    position: PropTypes.object,
    style: PropTypes.object
  };

  renderLabelComponent(props) {
    const component = props.labelComponent;
    const baseStyle = defaults({padding: 0}, component.props.style, props.style);
    const style = Helpers.evaluateStyle(baseStyle, props.data);
    const children = component.props.children || props.labelText || "";
    const newProps = {
      x: component.props.x || props.position.x + style.padding,
      y: component.props.y || props.position.y - style.padding,
      textAnchor: component.props.textAnchor || "start",
      verticalAnchor: component.props.verticalAnchor || "middle",
      style
    };
    return React.cloneElement(component, newProps, children);
  }

  renderVictoryLabel(props) {
    const style = Helpers.evaluateStyle(defaults({padding: 0}, props.style), props.data);
    return (
      <VictoryLabel
        x={props.position.x + style.padding}
        y={props.position.y - style.padding}
        textAnchor={"start"}
        verticalAnchor={"middle"}
        style={style}
      >
        {props.labelText}
      </VictoryLabel>
    );
  }

  renderLabel(props) {
    return props.labelComponent ?
      this.renderLabelComponent(props) : this.renderVictoryLabel(props);
  }

  render() {
    return (
      <g>
        {this.renderLabel(this.props)}
      </g>
    );
  }
}
