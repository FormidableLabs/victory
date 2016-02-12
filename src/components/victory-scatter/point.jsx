import merge from "lodash/object/merge";
import omit from "lodash/object/omit";
import pick from "lodash/object/pick";
import React, { PropTypes } from "react";
import Radium from "radium";
import {VictoryLabel} from "victory-label";
import { getPath } from "./helper-methods";
import { Helpers } from "victory-util";

@Radium
export default class Point extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      x: React.PropTypes.any,
      y: React.PropTypes.any
    }),
    labelComponent: React.PropTypes.element,
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"
      ]),
      PropTypes.func
    ]),
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    showLabels: React.PropTypes.bool,
    style: PropTypes.shape({
      data: React.PropTypes.object,
      labels: React.PropTypes.object
    }),
    x: React.PropTypes.number,
    y: React.PropTypes.number
  };

  static defaultProps = {
    showLabels: true
  }

  getStyle(props) {
    const stylesFromData = omit(props.data, [
      "x", "y", "z", "size", "symbol", "name", "label"
    ]);
    const baseDataStyle = merge({}, props.style.data, stylesFromData);
    const dataStyle = Helpers.evaluateStyle(baseDataStyle, props.data);
    // match certain label styles to data if styles are not given
    const matchedStyle = pick(dataStyle, ["opacity", "fill"]);
    const padding = props.style.labels.padding || props.size * 0.25;
    const baseLabelStyle = merge({padding}, matchedStyle, props.style.labels);
    const labelStyle = Helpers.evaluateStyle(baseLabelStyle, props.data);
    return {data: dataStyle, labels: labelStyle};
  }


  renderPoint(props, style) {
    return (
      <path
        style={style.data}
        d={getPath(props)}
        shapeRendering="optimizeSpeed"
      />
    );
  }

  renderLabel(props, style) {
    if (props.showLabels === false || !props.data.label) {
      return undefined;
    }
    const component = props.labelComponent;
    const componentStyle = component && component.props.style || {};
    const labelStyle = merge({}, style.labels, componentStyle);
    const children = component && component.props.children || props.data.label;
    const labelProps = {
      x: component && component.props.x || props.x,
      y: component && component.props.y || props.y - labelStyle.padding,
      dy: component && component.props.dy,
      data: props.data,
      textAnchor: component && component.props.textAnchor || labelStyle.textAnchor,
      verticalAnchor: component && component.props.verticalAnchor || "end",
      style: labelStyle
    };

    return component ?
      React.cloneElement(component, labelProps, children) :
      React.createElement(VictoryLabel, labelProps, children);
  }

  render() {
    const style = this.getStyle(this.props);
    return (
      <g>
        {this.renderPoint(this.props, style)}
        {this.renderLabel(this.props, style)}
      </g>
    );
  }
}
