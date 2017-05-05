/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { Collection, Helpers } from "../victory-util";
import { assign, isEqual } from "lodash";
import * as d3Shape from "d3-shape";
import CommonProps from "./common-props";

export default class Area extends React.Component {
  static propTypes = {
    ...CommonProps,
    groupComponent: PropTypes.element,
    interpolation: PropTypes.string,
    polar: PropTypes.bool
  };

  static defaultProps = {
    groupComponent: <g/>
  };

  componentWillMount() {
    const { style, areaPaths, linePaths } = this.calculateAttributes(this.props);
    this.style = style;
    this.areaPaths = areaPaths;
    this.linePaths = linePaths;
  }

  shouldComponentUpdate(nextProps) {
    const { style, areaPaths, linePaths } = this.calculateAttributes(nextProps);
    if (!isEqual(linePaths, this.linePaths) || !isEqual(style, this.style)) {
      this.style = style;
      this.areaPaths = areaPaths;
      this.linePaths = linePaths;
      return true;
    }
    return false;
  }

  getLineFunction(props) {
    const { polar, scale } = props;
    const interpolation = this.toNewName(props.interpolation);
    const getX = (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
    const getY = (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
    return polar ?
      d3Shape.radialLine()
        .curve(d3Shape[`${interpolation}Closed`])
        .angle((d) => -1 * getX(d) + Math.PI / 2)
        .radius((d) => getY(d)) :
      d3Shape.line()
        .curve(d3Shape[interpolation])
        .x((d) => getX(d))
        .y((d) => getY(d));
  }

  getAreaFunction(props) {
    const { polar, scale } = props;
    const interpolation = this.toNewName(props.interpolation);
    const getX = (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
    const getY = (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
    const getY0 = (d) => scale.y(d._y0);
    return polar ?
      d3Shape.radialArea()
        .curve(d3Shape[`${interpolation}Closed`])
        .angle((d) => -1 * getX(d) + Math.PI / 2)
        .outerRadius((d) => getY(d))
        .innerRadius((d) => getY0(d)) :
      d3Shape.area()
       .curve(d3Shape[interpolation])
       .x((d) => getX(d))
       .y1((d) => getY(d))
      . y0((d) => getY0(d));
  }

  calculateAttributes(props) {
    const { style, data, active } = props;
    const dataSegments = this.getDataSegments(data);
    const areaFunction = this.getAreaFunction(props);
    const lineFunction = this.getLineFunction(props);
    return {
      style: Helpers.evaluateStyle(assign({ fill: "black" }, style), data, active),
      areaPaths: dataSegments.map((segment) => areaFunction(segment)),
      linePaths: dataSegments.map((segment) => lineFunction(segment))
    };
  }

  getDataSegments(data) {
    return Collection.splitArray(data, (datum) => {
      const yDatum = datum.y1 !== undefined ? datum._y1 : datum._y;

      return yDatum === null || typeof yDatum === "undefined";
    }).filter((segment) => segment.length > 1);
  }

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  // Overridden in victory-core-native
  renderArea(paths, style, events) {
    const areaStroke = style.stroke ? "none" : style.fill;
    const areaStyle = assign({}, style, { stroke: areaStroke });
    const { role, shapeRendering, className } = this.props;
    return paths.map((path, index) => {
      return (
        <path
          key={`area-${index}`}
          style={areaStyle}
          shapeRendering={shapeRendering || "auto"}
          role={role || "presentation"}
          d={path}
          className={className}
          {...events}
        />
      );
    });
  }

  // Overridden in victory-core-native
  renderLine(paths, style, events) {
    if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
      return [];
    }
    const { role, shapeRendering, className } = this.props;
    const lineStyle = assign({}, style, { fill: "none" });
    return paths.map((path, index) => {
      return (
        <path
          key={`area-stroke-${index}`}
          style={lineStyle}
          shapeRendering={shapeRendering || "auto"}
          role={role || "presentation"}
          d={path}
          className={className}
          {...events}
        />
      );
    });
  }

  render() {
    const { events, groupComponent } = this.props;
    const areas = this.renderArea(this.areaPaths, this.style, events);
    const lines = this.renderLine(this.linePaths, this.style, events);
    const children = [...lines, ...areas];
    return children.length === 1 ? children[0] : React.cloneElement(groupComponent, {}, children);
  }
}
