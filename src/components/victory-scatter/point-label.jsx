import defaults from "lodash/object/defaults";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";

export default class PointLabel extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    events: PropTypes.object,
    labelComponent: React.PropTypes.element,
    style: PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  };

  renderLabel(props, style) {
    if (props.showLabels === false || !props.data.label) {
      return undefined;
    }
    const component = props.labelComponent;
    const componentStyle = component && component.props.style || {};
    const baseStyle = defaults({}, componentStyle, props.style);
    const labelStyle = Helpers.evaluateStyle(baseStyle, props.data);
    const labelText = component.props.text || props.data.label;
    const labelProps = {
      x: component && component.props.x || props.x,
      y: component && component.props.y || props.y - labelStyle.padding,
      dy: component && component.props.dy,
      data: props.data,
      text: labelText,
      textAnchor: component && component.props.textAnchor || labelStyle.textAnchor,
      verticalAnchor: component && component.props.verticalAnchor || "end",
      style: labelStyle,
      events: component && component.props.events || props.events
    };

    return component ?
      React.cloneElement(component, labelProps) :
      React.createElement(VictoryLabel, labelProps);
  }

  render() {
    return (
      <g>
        {this.renderLabel(this.props)}
      </g>
    );
  }
}
