import defaults from "lodash/defaults";
import assign from "lodash/assign";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";

export default class PointLabel extends React.Component {
  static propTypes = {
    datum: PropTypes.object,
    index: React.PropTypes.number,
    events: PropTypes.object,
    labelComponent: React.PropTypes.element,
    style: PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  };

  renderLabel(props) {
    if (props.showLabels === false || !props.datum.label) {
      return undefined;
    }
    const component = props.labelComponent;
    const componentStyle = component && component.props.style || {};
    const baseStyle = defaults({}, componentStyle, props.style);
    const labelStyle = Helpers.evaluateStyle(baseStyle, props.datum);
    const labelText = component && component.props.text || props.datum.label;
    const baseEvents = component && component.props.events ?
      defaults({}, component.props.events, props.events) : props.events;
    const events = Helpers.getPartialEvents(baseEvents, props.index, props);
    const labelProps = assign({}, events, {
      x: component && component.props.x || props.x,
      y: component && component.props.y || props.y - labelStyle.padding,
      dy: component && component.props.dy,
      datum: props.datum,
      text: labelText,
      textAnchor: component && component.props.textAnchor || labelStyle.textAnchor,
      verticalAnchor: component && component.props.verticalAnchor || "end",
      style: labelStyle
    });

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
