import defaults from "lodash/object/defaults";
import assign from "lodash/object/assign";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";

export default class AxisLabel extends React.Component {
  static propTypes = {
    events: PropTypes.object,
    label: PropTypes.any,
    position: PropTypes.object,
    verticalAnchor: PropTypes.string,
    transform: PropTypes.string,
    style: PropTypes.object
  };

  renderLabelComponent(props) {
    const component = props.label;
    const style = defaults({}, component.props.style, props.style);
    const baseEvents = component && component.props.events ?
      defaults({}, component.props.events, props.events) : props.events;
    const events = Helpers.getPartialEvents(baseEvents, 0, props);
    const newProps = assign({}, events, {
      x: component.props.x || props.position.x,
      y: component.props.y || props.position.y,
      text: component.props.text,
      textAnchor: component.props.textAnchor || "middle",
      verticalAnchor: component.props.verticalAnchor || props.verticalAnchor,
      style
    });
    return React.cloneElement(component, newProps);
  }

  renderVictoryLabel(props) {
    const events = Helpers.getPartialEvents(this.props.events, 0, this.props);
    const text = typeof props.label === "string" ? props.label : null;
    return (
      <VictoryLabel
        x={props.position.x}
        y={props.position.y}
        textAnchor={"middle"}
        verticalAnchor={props.verticalAnchor}
        style={props.style}
        text={text}
        {...events}
      />
    );
  }

  renderLabel(props) {
    return props.label && props.label.props ?
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
