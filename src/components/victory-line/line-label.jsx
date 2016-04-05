import defaults from "lodash/defaults";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers} from "victory-core";

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
    const events = Helpers.getPartialEvents(baseEvents, 0, props);
    const newProps = {
      x: component.props.x || props.position.x + style.padding,
      y: component.props.y || props.position.y - style.padding,
      data: props.data,
      text: component.props.text,
      textAnchor: component.props.textAnchor || "start",
      verticalAnchor: component.props.verticalAnchor || "middle",
      style,
      events
    };
    return React.cloneElement(component, newProps);
  }

  renderVictoryLabel(props) {
    const style = Helpers.evaluateStyle(defaults({}, props.style), props.data, {padding: 0});
    const events = Helpers.getPartialEvents(this.props.events, 0, this.props);
    return (
      <VictoryLabel
        x={props.position.x + style.padding}
        y={props.position.y - style.padding}
        data={props.data}
        textAnchor={"start"}
        verticalAnchor={"middle"}
        style={style}
        text={props.label}
        events={events}
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
