import defaults from "lodash/object/defaults";
import assign from "lodash/object/assign";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers} from "victory-core";
import Events from "../../helpers/events";

export default class LineLabel extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    events: PropTypes.object,
    label: PropTypes.any,
    position: PropTypes.object,
    style: PropTypes.object
  };

  renderLabelComponent(props) {
    const component = props.label;
    const baseStyle = defaults({}, component.props.style, props.style, {padding: 0});
    const style = Helpers.evaluateStyle(baseStyle, props.data);
    const baseEvents = component && component.props.events ?
      defaults({}, component.props.events, props.events) : props.events;
    const events = Events.getPartialEvents(baseEvents, 0, props.data);
    const newProps = assign({}, events, {
      index: 0, // line currently only supports a single label
      x: component.props.x || props.position.x + style.padding,
      y: component.props.y || props.position.y - style.padding,
      data: props.data,
      text: component.props.text || props.label,
      textAnchor: component.props.textAnchor || "start",
      verticalAnchor: component.props.verticalAnchor || "middle",
      style
    });
    return React.cloneElement(component, newProps);
  }

  renderVictoryLabel(props) {
    const style = Helpers.evaluateStyle(defaults({}, props.style), props.data, {padding: 0});
    const events = Events.getPartialEvents(this.props.events, 0, this.props.data);
    return (
      <VictoryLabel
        x={props.position.x + style.padding}
        y={props.position.y - style.padding}
        textAnchor={"start"}
        verticalAnchor={"middle"}
        style={style}
        text={props.label}
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
