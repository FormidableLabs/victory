/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { defined, getXAccessor, getYAccessor, getY0Accessor, getAngleAccessor } from "./helpers";
import { assign } from "lodash";
import * as d3Shape from "d3-shape";
import CommonProps from "./common-props";
import Path from "./path";

export default class Area extends React.Component {
  static propTypes = {
    ...CommonProps,
    groupComponent: PropTypes.element,
    interpolation: PropTypes.string,
    pathComponent: PropTypes.element
  };

  static defaultProps = {
    groupComponent: <g/>,
    pathComponent: <Path/>
  };

  getLineFunction(props) {
    const { polar, scale } = props;
    const interpolation = this.toNewName(props.interpolation);
    return polar ?
      d3Shape.lineRadial()
        .defined(defined)
        .curve(d3Shape[`${interpolation}Closed`])
        .angle(getAngleAccessor(scale))
        .radius(getY0Accessor(scale)) :
      d3Shape.line()
        .defined(defined)
        .curve(d3Shape[interpolation])
        .x(getXAccessor(scale))
        .y(getYAccessor(scale));
  }

  getAreaFunction(props) {
    const { polar, scale } = props;
    const interpolation = this.toNewName(props.interpolation);
    return polar ?
      d3Shape.radialArea()
        .defined(defined)
        .curve(d3Shape[`${interpolation}Closed`])
        .angle(getAngleAccessor(scale))
        .outerRadius(getYAccessor(scale))
        .innerRadius(getY0Accessor(scale)) :
      d3Shape.area()
        .defined(defined)
        .curve(d3Shape[interpolation])
        .x(getXAccessor(scale))
        .y1(getYAccessor(scale))
        .y0(getY0Accessor(scale));
  }

  calculateAttributes(props) {
    const { style, data, active } = props;
    const areaFunction = this.getAreaFunction(props);
    const lineFunction = this.getLineFunction(props);
    return {
      style: Helpers.evaluateStyle(assign({ fill: "black" }, style), data, active),
      areaPath: areaFunction(data),
      linePath: lineFunction(data)
    };
  }

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  renderArea(props, calculatedAttributes) {
    const { role, shapeRendering, className, polar, origin, pathComponent, events } = props;
    const { style, areaPath } = calculatedAttributes;
    const areaStroke = style.stroke ? "none" : style.fill;
    const areaStyle = assign({}, style, { stroke: areaStroke });
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    return React.cloneElement(pathComponent, {
      key: "area-stroke",
      style: areaStyle,
      shapeRendering: shapeRendering || "auto",
      role: role || "presentation",
      d: areaPath,
      transform,
      className,
      events
    });
  }

  renderLine(props, calculatedAttributes) {
    const { role, shapeRendering, className, polar, origin, pathComponent, events } = props;
    const { style, linePath } = calculatedAttributes;
    if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
      return null;
    }
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const lineStyle = assign({}, style, { fill: "none" });
    return React.cloneElement(pathComponent, {
      key: "area-stroke",
      style: lineStyle,
      shapeRendering: shapeRendering || "auto",
      role: role || "presentation",
      d: linePath,
      transform,
      className,
      events
    });
  }

  render() {
    const { groupComponent } = this.props;
    const calculatedAttributes = this.calculateAttributes(this.props);
    const area = this.renderArea(this.props, calculatedAttributes);
    const line = this.renderLine(this.props, calculatedAttributes);
    // const area = this.renderArea(this.areaPath, this.style, events);
    // const line = this.renderLine(this.linePath, this.style, events);

    if (!line) {
      return area;
    }
    const children = [area, line].map((el, i) =>
      React.cloneElement(el, { key: i })
    );
    return React.cloneElement(groupComponent, {}, children);
  }
}
