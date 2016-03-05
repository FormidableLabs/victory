import defaults from "lodash/object/defaults";
import React, { PropTypes } from "react";
import { VictoryLabel } from "victory-core";

export default class PointLabel extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    events: PropTypes.object,
    labelComponent: React.PropTypes.element,
    style: PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  };

  renderLabel(props) {
    const component = props.labelComponent;
    const componentStyle = component && component.props.style || {};
    const labelStyle = defaults({}, componentStyle, props.style);
    const children = component && component.props.children || props.data.label;
    const labelProps = {
      x: component && component.props.x || props.x,
      y: component && component.props.y || props.y - labelStyle.padding,
      dy: component && component.props.dy,
      data: props.data,
      textAnchor: component && component.props.textAnchor || labelStyle.textAnchor,
      verticalAnchor: component && component.props.verticalAnchor || "end",
      style: labelStyle,
      events: component && component.props.events || props.events
    };

    return component ?
      React.cloneElement(component, labelProps, children) :
      React.createElement(VictoryLabel, labelProps, children);
  }

  render() {
    return (
      <g>
        {this.renderLabel(this.props)}
      </g>
    );
  }
}
