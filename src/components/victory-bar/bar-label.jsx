import defaults from "lodash/defaults";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";

export default class BarLabel extends React.Component {

  static propTypes = {
    events: PropTypes.object,
    position: PropTypes.object,
    horizontal: PropTypes.bool,
    style: PropTypes.object,
    datum: PropTypes.object,
    index: PropTypes.number,
    labelText: PropTypes.string,
    labelComponent: PropTypes.any
  };

  getLabelAnchors(props) {
    const sign = props.datum.y >= 0 ? 1 : -1;
    if (!props.horizontal) {
      return {
        vertical: sign >= 0 ? "end" : "start",
        text: "middle"
      };
    } else {
      return {
        vertical: "middle",
        text: sign >= 0 ? "start" : "end"
      };
    }
  }

  getlabelPadding(props, style) {
    return {
      x: props.horizontal ? style.padding : 0,
      y: props.horizontal ? 0 : style.padding
    };
  }

  renderLabelComponent(props, position, anchors) {
    const component = props.labelComponent;
    const baseStyle = defaults({}, component.props.style, props.style, {padding: 0});
    const style = Helpers.evaluateStyle(baseStyle, props.datum);
    const padding = this.getlabelPadding(props, style);
    const labelText = props.labelText || props.datum.label;
    const index = [props.index.seriesIndex, props.index.barIndex];
    const baseEvents = component && component.props.events ?
      defaults({}, component.props.events, props.events) : props.events;
    const events = Helpers.getPartialEvents(baseEvents, index, props);
    const newProps = {
      index: props.index,
      x: component.props.x || position.x + padding.x,
      y: component.props.y || position.y - padding.y,
      datum: props.datum, // Pass datum for custom label component to access
      text: labelText,
      textAnchor: component.props.textAnchor || anchors.text,
      verticalAnchor: component.props.verticalAnchor || anchors.vertical,
      style,
      events
    };
    return React.cloneElement(component, newProps);
  }

  renderVictoryLabel(props, position, anchors) {
    const baseStyle = defaults({}, props.style, {padding: 0});
    const style = Helpers.evaluateStyle(baseStyle, props.datum);
    const padding = this.getlabelPadding(props, style);
    const index = props.index;
    const events = Helpers.getPartialEvents(props.events, index, props);
    return (
      <VictoryLabel
        x={position.x + padding.x}
        y={position.y - padding.y}
        datum={props.datum}
        index={[props.index.seriesIndex, props.index.barIndex]}
        textAnchor={anchors.text}
        verticalAnchor={anchors.vertical}
        style={style}
        text={props.labelText}
        events={events}
      />
    );
  }

  renderLabel(props) {
    const anchors = this.getLabelAnchors(props);
    const position = {
      x: props.horizontal ? props.position.y1 : props.position.x,
      y: props.horizontal ? props.position.x : props.position.y1
    };
    return props.labelComponent ?
      this.renderLabelComponent(props, position, anchors) :
      this.renderVictoryLabel(props, position, anchors);
  }

  render() {
    return (
      <g>
        {this.renderLabel(this.props)}
      </g>
    );
  }
}
