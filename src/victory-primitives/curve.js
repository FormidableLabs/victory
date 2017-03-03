import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";
import Utils from "./utils";
import { assign, isEqual } from "lodash";
import * as d3Shape from "d3-shape";

export default class Curve extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    data: PropTypes.array,
    events: PropTypes.object,
    interpolation: PropTypes.string,
    role: PropTypes.string,
    scale: PropTypes.object,
    shapeRendering: PropTypes.string,
    style: PropTypes.object,
    groupComponent: PropTypes.element
  };

  static defaultProps = {
    groupComponent: <g/>
  };

  componentWillMount() {
    const {style, paths} = this.calculateAttributes(this.props);
    this.style = style;
    this.paths = paths;
  }

  shouldComponentUpdate(nextProps) {
    const {style, paths} = this.calculateAttributes(nextProps);
    if (!isEqual(paths, this.paths) || !isEqual(style, this.style)) {
      this.style = style;
      this.paths = paths;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const {style, data, active, scale, interpolation} = props;
    const dataSegments = this.getDataSegments(data);
    const xScale = scale.x;
    const yScale = scale.y;
    const lineFunction = d3Shape.line()
      .curve(d3Shape[this.toNewName(interpolation)])
      .x((d) => xScale(d._x1 !== undefined ? d._x1 : d._x))
      .y((d) => yScale(d._y1 !== undefined ? d._y1 : d._y));
    return {
      style: Helpers.evaluateStyle(
        assign({fill: "none", stroke: "black"}, style), data, active
      ),
      paths: dataSegments.map((d) => lineFunction(d))
    };
  }

  getDataSegments(data) {
    return Utils.splitArray(data, (datum) => {
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
  renderLine(path, style, events, index) { // eslint-disable-line max-params
    if (!path) {
      return null;
    }
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        key={index}
        className={className}
        style={style}
        shapeRendering={shapeRendering || "auto"}
        d={path}
        role={role || "presentation"}
        {...events}
        vectorEffect="non-scaling-stroke"
      />
    );
  }

  render() {
    const {groupComponent, events} = this.props;
    return this.paths.length > 1 ?
      React.cloneElement(
        groupComponent, {},
        this.paths.map((path, index) => this.renderLine(path, this.style, events, index))
      ) :
      this.renderLine(this.paths[0], this.style, events);
  }
}
