/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { Collection, Helpers } from "../victory-util";
import { assign, isEqual } from "lodash";
import * as d3Shape from "d3-shape";
import CommonProps from "./common-props";

export default class Curve extends React.Component {
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
    const { style, paths } = this.calculateAttributes(this.props);
    this.style = style;
    this.paths = paths;
  }

  shouldComponentUpdate(nextProps) {
    const { style, paths } = this.calculateAttributes(nextProps);
    if (!isEqual(paths, this.paths) || !isEqual(style, this.style)) {
      this.style = style;
      this.paths = paths;
      return true;
    }
    return false;
  }

  getLineFunction(props) {
    const { polar, scale, interpolation } = props;
    const getX = (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
    const getY = (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
    return polar ?
      d3Shape.radialLine()
        .curve(d3Shape[this.toNewName(interpolation)])
        .angle((d) => -1 * getX(d) + Math.PI / 2)
        .radius((d) => getY(d)) :
      d3Shape.line()
        .curve(d3Shape[this.toNewName(interpolation)])
        .x((d) => getX(d))
        .y((d) => getY(d));
  }

  calculateAttributes(props) {
    const { style, data, active } = props;
    const dataSegments = this.getDataSegments(data);
    const lineFunction = this.getLineFunction(props);
    return {
      style: Helpers.evaluateStyle(
        assign({ fill: "none", stroke: "black" }, style), data, active
      ),
      paths: dataSegments.map((d) => lineFunction(d))
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
  renderLine(paths, style, events) {
    const { role, shapeRendering, className } = this.props;
    return paths.map((path, index) => {
      return (
        <path
          key={`area-stroke-${index}`}
          style={style}
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
    const children = this.renderLine(this.paths, this.style, events);
    return children.length === 1 ? children[0] : React.cloneElement(groupComponent, {}, children);
  }
}
