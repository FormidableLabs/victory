import React, { PropTypes } from "react";
import { VictoryLabel, Helpers } from "victory-core";

export default class TickLabel extends React.Component {
  static role = "tick";

  static propTypes = {
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
    if (!this.props.label) {
      return undefined;
    }
    const componentProps = this.props.label.props ? this.props.label.props : {};
    const style = componentProps.style || this.props.style;
    const anchors = this.getAnchors(this.props);
    const newProps = {
      x: this.props.position.x,
      y: this.props.position.y,
      textAnchor: componentProps.textAnchor || anchors.textAnchor,
      verticalAnchor: componentProps.verticalAnchor || anchors.verticalAnchor,
      style: Helpers.evaluateStyle(style, this.props.tick),
      events: componentProps.events || this.props.events
    };
    return this.props.label.props ?
      React.cloneElement(this.props.label, newProps) :
      React.createElement(VictoryLabel, newProps, this.props.label);
  }
}
