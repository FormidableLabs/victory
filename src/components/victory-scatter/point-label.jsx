import defaults from "lodash/object/defaults";
import assign from "lodash/object/assign";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";
import Events from "../../helpers/events";


export default class PointLabel extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    index: React.PropTypes.number,
    events: PropTypes.object,
    labelComponent: React.PropTypes.element,
    style: PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  };

  renderLabel(props) {
    if (props.showLabels === false || !props.data.label) {
      return undefined;
    }
    const component = props.labelComponent;
    const componentStyle = component && component.props.style || {};
    const baseStyle = defaults({}, componentStyle, props.style);
    const labelStyle = Helpers.evaluateStyle(baseStyle, props.data);
    const labelText = component.props.text || props.data.label;
    const baseEvents = component && component.props.events ?
      defaults({}, component.props.events, props.events) : props.events;
    const events = Events.getPartialEvents(baseEvents, props.index, props);
    const labelProps = assign({}, events, {
      x: component && component.props.x || props.x,
      y: component && component.props.y || props.y - labelStyle.padding,
      dy: component && component.props.dy,
      data: props.data,
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
