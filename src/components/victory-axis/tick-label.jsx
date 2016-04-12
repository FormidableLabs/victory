import defaults from "lodash/defaults";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";

export default class TickLabel extends React.Component {

  static propTypes = {
    index: PropTypes.number,
    position: PropTypes.object,
    tick: PropTypes.any,
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    isVertical: PropTypes.bool,
    style: PropTypes.object,
    events: PropTypes.object,
    label: PropTypes.any
  };

  getAnchors(props) {
    const anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
    const anchor = anchorOrientation[props.orientation];
    return {
      textAnchor: props.isVertical ? anchor : "middle",
      verticalAnchor: props.isVertical ? "middle" : anchor
    };
  }

  render() {
    const { props } = this;
    if (!props.label) {
      return undefined;
    }
    const componentProps = props.label.props || {};
    const style = componentProps.style || props.style;
    const anchors = this.getAnchors(props);
    const baseEvents = componentProps.events ?
      defaults({}, componentProps.events, props.events) : props.events;
    const events = Helpers.getPartialEvents(baseEvents, props.index, props);
    const newProps = {
      x: props.position.x,
      y: props.position.y,
      textAnchor: componentProps.textAnchor || anchors.textAnchor,
      verticalAnchor: componentProps.verticalAnchor || anchors.verticalAnchor,
      style: Helpers.evaluateStyle(style, props.tick),
      events
    };
    return props.label.props ?
      React.cloneElement(props.label, newProps) :
      React.createElement(VictoryLabel, newProps, props.label);
  }
}
