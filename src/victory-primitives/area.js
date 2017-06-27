/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";
import Helpers from "../victory-util/helpers";
import { defined, getXAccessor, getYAccessor, getY0Accessor, getAngleAccessor } from "./helpers";
import { assign } from "lodash";
import * as d3Shape from "d3-shape";
import CommonProps from "./common-props";

export default class Area extends React.Component {
  static propTypes = {
    ...CommonProps,
    groupComponent: PropTypes.element,
    interpolation: PropTypes.string
  };

  static defaultProps = {
    groupComponent: <g/>
  };

  componentWillMount() {
    const { style, areaPath, linePath } = this.calculateAttributes(this.props);
    this.style = style;
    this.areaPath = areaPath;
    this.linePath = linePath;
  }

  shouldComponentUpdate(nextProps) {
    const { style, areaPath, linePath } = this.calculateAttributes(nextProps);
    const { className, interpolation } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [interpolation, nextProps.interpolation],
      [linePath, this.linePath],
      [areaPath, this.areaPath],
      [style, this.style]
    ])) {
      this.style = style;
      this.areaPath = areaPath;
      this.linePath = linePath;
      return true;
    }
    return false;
  }

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

  // Overridden in victory-core-native
  renderArea(path, style, events) {
    const areaStroke = style.stroke ? "none" : style.fill;
    const areaStyle = assign({}, style, { stroke: areaStroke });
    const { role, shapeRendering, className, polar, origin } = this.props;
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    return (
      <path
        key={"area"}
        style={areaStyle}
        shapeRendering={shapeRendering || "auto"}
        role={role || "presentation"}
        d={path}
        transform={transform}
        className={className}
        {...events}
      />
    );
  }

  // Overridden in victory-core-native
  renderLine(path, style, events) {
    if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
      return null;
    }
    const { role, shapeRendering, className, polar, origin } = this.props;
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const lineStyle = assign({}, style, { fill: "none" });
    return (
      <path
        key={"area-stroke"}
        style={lineStyle}
        shapeRendering={shapeRendering || "auto"}
        role={role || "presentation"}
        d={path}
        transform={transform}
        className={className}
        {...events}
      />
    );
  }

  render() {
    const { events, groupComponent } = this.props;
    const area = this.renderArea(this.areaPath, this.style, events);
    const line = this.renderLine(this.linePath, this.style, events);

    if (!line) {
      return area;
    }
    const children = [area, line].map((el, i) =>
      React.cloneElement(el, { key: i })
    );
    return React.cloneElement(groupComponent, {}, children);
  }
}
