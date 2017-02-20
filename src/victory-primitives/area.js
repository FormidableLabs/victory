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
    const {style, areaPaths, linePaths} = this.calculateAttributes(this.props);
    this.style = style;
    this.areaPaths = areaPaths;
    this.linePaths = linePaths;
  }

  shouldComponentUpdate(nextProps) {
    const {style, areaPaths, linePaths} = this.calculateAttributes(nextProps);
    if (!isEqual(linePaths, this.linePaths) || !isEqual(style, this.style)) {
      this.style = style;
      this.areaPaths = areaPaths;
      this.linePaths = linePaths;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const {style, data, active, scale} = props;
    const dataSegments = this.getDataSegments(data);
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
      areaPaths: dataSegments.map((segment) => areaFunction(segment)),
      linePaths: dataSegments.map((segment) => lineFunction(segment))
    };
  }

  getDataSegments(data) {
    let segmentStartIndex = 0;
    const segments = data.reduce((memo, datum, index) => {
      const yDatum = datum.y1 !== undefined ? datum._y1 : datum._y;
      if (yDatum === null || typeof yDatum === "undefined") {
        memo = memo.concat([data.slice(segmentStartIndex, index)]);
        segmentStartIndex = index + 1;
      } else if (index === data.length - 1) {
        memo = memo.concat([data.slice(segmentStartIndex, data.length)]);
      }
      return memo;
    }, []);

    return segments.filter((segment) => {
      return Array.isArray(segment) && segment.length > 0;
    });
  }

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  // Overridden in victory-core-native
  renderArea(paths, style, events) {
    const areaStroke = style.stroke ? "none" : style.fill;
    const areaStyle = assign({}, style, {stroke: areaStroke});
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
    const lineStyle = assign({}, style, {fill: "none"});
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
