import _ from "lodash";
import React, { PropTypes } from "react";
import Radium from "radium";
import {VictoryLabel} from "victory-label";


@Radium
export default class SliceLabel extends React.Component {
  static propTypes = {
    labelComponent: PropTypes.any,
    positionFunction: PropTypes.func,
    slice: PropTypes.object,
    style: PropTypes.object
  };

  getCalculatedValues(props) {
    const position = props.positionFunction.call(this, props.slice);
    this.x = position[0];
    this.y = position[1];
    this.data = props.slice.data;
    this.label = this.data.label ? `${this.evaluateProp(this.data.label)}` : `${this.data.x}`;
  }

  evaluateStyle(style) {
    return _.transform(style, (result, value, key) => {
      result[key] = this.evaluateProp(value);
    });
  }

  evaluateProp(prop) {
    return _.isFunction(prop) ? prop.call(this, this.data) : prop;
  }

  renderLabelComponent(props) {
    const component = props.labelComponent;
    const style = this.evaluateStyle(_.merge({padding: 0}, props.style, component.props.style));
    const children = component.props.children || this.label;
    const newProps = {
      x: component.props.x || this.x,
      y: component.props.y || this.y,
      data: this.data, // Pass data for custom label component to access
      textAnchor: component.props.textAnchor || "start",
      verticalAnchor: component.props.verticalAnchor || "middle",
      style
    };
    return React.cloneElement(component, newProps, children);
  }

  renderVictoryLabel(props) {
    const style = this.evaluateStyle(_.merge({padding: 0}, props.style));
    return (
      <VictoryLabel
        x={this.x}
        y={this.y}
        data={this.data}
        style={style}
      >
        {this.label}
      </VictoryLabel>
    );
  }

  renderLabel(props) {
    return props.labelComponent ?
      this.renderLabelComponent(props) : this.renderVictoryLabel(props);
  }

  render() {
    this.getCalculatedValues(this.props);
    return this.renderLabel(this.props);
  }
}
