import merge from "lodash/object/merge";
import React, { PropTypes } from "react";
import Radium from "radium";
import { VictoryLabel } from "victory-label";
import { Chart } from "victory-util";

@Radium
export default class BarLabel extends React.Component {

  static propTypes = {
    position: PropTypes.object,
    horizontal: PropTypes.bool,
    style: PropTypes.object,
    datum: PropTypes.object,
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
    const baseStyle = merge({padding: 0}, props.style, component.props.style);
    const style = Chart.evaluateStyle(baseStyle, props.datum);
    const padding = this.getlabelPadding(props, style);
    const children = component.props.children || props.labelText;
    const newProps = {
      x: component.props.x || position.x + padding.x,
      y: component.props.y || position.y - padding.y,
      data: props.datum, // Pass data for custom label component to access - todo: rename to datum
      textAnchor: component.props.textAnchor || anchors.text,
      verticalAnchor: component.props.verticalAnchor || anchors.vertical,
      style
    };
    return React.cloneElement(component, newProps, children);
  }

  renderVictoryLabel(props, position, anchors) {
    const baseStyle = merge({padding: 0}, props.style);
    const style = Chart.evaluateStyle(baseStyle, props.datum);
    const padding = this.getlabelPadding(props, style);
    return (
      <VictoryLabel
        x={position.x + padding.x}
        y={position.y - padding.y}
        data={props.datum} // todo: rename to datum
        textAnchor={anchors.text}
        verticalAnchor={anchors.vertical}
        style={style}
      >
        {props.labelText}
      </VictoryLabel>
    );
  }

  renderLabel(props) {
    const anchors = this.getLabelAnchors(props);
    const position = {
      x: props.horizontal ? props.position.dependent1 : props.position.independent,
      y: props.horizontal ? props.position.independent : props.position.dependent1
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
