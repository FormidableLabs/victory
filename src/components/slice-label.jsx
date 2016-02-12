import React, { PropTypes } from "react";
import Radium from "radium";
import { Helpers } from "victory-util";
import merge from "lodash/object/merge";
import assign from "lodash/object/assign";
import {VictoryLabel} from "victory-label";

@Radium
export default class SliceLabel extends React.Component {
  static propTypes = {
    labelComponent: PropTypes.any,
    positionFunction: PropTypes.func,
    slice: PropTypes.object,
    style: PropTypes.object
  };

  renderLabelComponent(props, position, label) {
    const component = props.labelComponent;
    const style = Helpers.evaluateStyle(
      merge({padding: 0}, props.style, component.props.style),
      this.data
    );
    const children = component.props.children || label;
    const newProps = {
      x: component.props.x || position[0],
      y: component.props.y || position[1],
      data: props.slice.data, // Pass data for custom label component to access
      textAnchor: component.props.textAnchor || "start",
      verticalAnchor: component.props.verticalAnchor || "middle",
      style
    };
    return React.cloneElement(component, newProps, children);
  }

  renderVictoryLabel(props, position, label) {
    const style = Helpers.evaluateStyle(
      assign({padding: 0}, props.style),
      props.slice.data
    );
    return (
      <VictoryLabel
        x={position[0]}
        y={position[1]}
        data={props.slice.data}
        style={style}
      >
        {label}
      </VictoryLabel>
    );
  }

  renderLabel(props) {
    const position = props.positionFunction(props.slice);
    const data = props.slice.data;
    const dataLabel = data.xName ? `${data.xName}` : `${data.x}`;
    const label = data.label ?
    `${Helpers.evaluateProp(data.label, data)}` : dataLabel;
    return props.labelComponent ?
      this.renderLabelComponent(props, position, label) :
      this.renderVictoryLabel(props, position, label);
  }

  render() {
    return this.renderLabel(this.props);
  }
}
