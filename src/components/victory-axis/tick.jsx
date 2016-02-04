import React, { PropTypes } from "react";
import Radium from "radium";
import { VictoryLabel } from "victory-label";
import { Chart } from "victory-util";

@Radium
export default class Tick extends React.Component {
  static role = "tick";

  static propTypes = {
    position: PropTypes.number,
    tick: PropTypes.any,
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    style: PropTypes.object,
    label: PropTypes.any
  };

  getPosition(props, isVertical) {
    const orientationSign = { top: -1, left: -1, right: 1, bottom: 1 };
    const style = props.style.ticks;
    const tickSpacing = style.size + style.padding;
    const sign = orientationSign[props.orientation];
    return {
      x: isVertical ? sign * tickSpacing : 0,
      x2: isVertical ? sign * style.size : 0,
      y: isVertical ? 0 : sign * tickSpacing,
      y2: isVertical ? 0 : sign * style.size
    };
  }

  getAnchors(props, isVertical) {
    const anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
    const anchor = anchorOrientation[props.orientation];
    return {
      textAnchor: isVertical ? anchor : "middle",
      verticalAnchor: isVertical ? "middle" : anchor
    };
  }

  renderLabel(props, position, isVertical) {
    if (!props.label) {
      return undefined;
    }
    const componentProps = props.label.props ? props.label.props : {};
    const style = componentProps.style || props.style.tickLabels;
    const anchors = this.getAnchors(props, isVertical);
    const newProps = {
      x: position.x,
      y: position.y,
      textAnchor: componentProps.textAnchor || anchors.textAnchor,
      verticalAnchor: componentProps.verticalAnchor || anchors.verticalAnchor,
      style: Chart.evaluateStyle(style, props.tick)
    };
    return props.label.props ?
      React.cloneElement(props.label, newProps) :
      React.createElement(VictoryLabel, newProps, props.label);
  }

  renderTick(props, position) {
    return (
      <line
        x={position.x}
        x2={position.x2}
        y={position.y}
        y2={position.y2}
        style={Chart.evaluateStyle(props.style.ticks, props.ticks)}
      />
    );
  }

  render() {
    const isVertical = this.props.orientation === "left" || this.props.orientation === "right";
    const transform = isVertical ?
      `translate(0, ${this.props.position})` : `translate(${this.props.position}, 0)`;
    const position = this.getPosition(this.props, isVertical);
    return (
      <g transform={transform}>
        {this.renderTick(this.props, position)}
        {this.renderLabel(this.props, position, isVertical)}
      </g>
    );
  }
}
