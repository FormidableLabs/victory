import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";
import * as d3Shape from "d3-shape";

export default class Area extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    data: PropTypes.array,
    events: PropTypes.object,
    groupComponent: PropTypes.element,
    interpolation: PropTypes.string,
    shapeRendering: PropTypes.string,
    role: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object
  };

  componentWillMount() {
    const {style, areaPath, linePath} = this.calculateAttributes(this.props);
    this.style = style;
    this.areaPath = areaPath;
    this.linePath = linePath;
  }

  shouldComponentUpdate(nextProps) {
    const {style, areaPath, linePath} = this.calculateAttributes(nextProps);
    if (areaPath !== this.areaPath || !isEqual(style, this.style)) {
      this.style = style;
      this.areaPath = areaPath;
      this.linePath = linePath;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const {style, data, active, scale} = props;
    const xScale = scale.x;
    const yScale = scale.y;
    const interpolation = this.toNewName(props.interpolation);
    const areaFunction = d3Shape.area()
      .curve(d3Shape[interpolation])
      .x((d) => xScale(d._x1 !== undefined ? d._x1 : d._x))
      .y1((d) => yScale(d._y1 !== undefined ? d._y1 : d._y))
      .y0((d) => yScale(d._y0));
    const lineFunction = d3Shape.line()
      .curve(d3Shape[interpolation])
      .x((d) => xScale(d._x1 !== undefined ? d._x1 : d._x))
      .y((d) => yScale(d._y1));
    return {
      style: Helpers.evaluateStyle(assign({fill: "black"}, style), data, active),
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
    const areaStyle = assign({}, style, {stroke: areaStroke});
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        key="area"
        style={areaStyle}
        shapeRendering={shapeRendering || "auto"}
        role={role || "presentation"}
        d={path}
        className={className}
        {...events}
      />
    );
  }

  // Overridden in victory-core-native
  renderLine(path, style, events) {
    if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
      return undefined;
    }
    const { role, shapeRendering, className } = this.props;
    const lineStyle = assign({}, style, {fill: "none"});
    return (
      <path
        key="area-stroke"
        shapeRendering={shapeRendering || "auto"}
        style={lineStyle}
        role={role || "presentation"}
        d={path}
        className={className}
        {...events}
      />
    );
  }

  render() {
    const { events, groupComponent } = this.props;
    const area = this.renderArea(this.areaPath, this.style, events);
    const line = this.renderLine(this.linePath, this.style, events);
    return line ? React.cloneElement(groupComponent, {}, area, line) : area;
  }
}
