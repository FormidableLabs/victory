/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { defined, getXAccessor, getYAccessor, getAngleAccessor } from "./helpers";
import Collection from "../victory-util/collection";
import { assign } from "lodash";
import * as d3Shape from "d3-shape";
import CommonProps from "./common-props";

export default class Curve extends React.Component {
  static propTypes = {
    ...CommonProps,
    interpolation: PropTypes.string,
    openCurve: PropTypes.bool,
    origin: PropTypes.object,
    polar: PropTypes.bool
  };

  componentWillMount() {
    const { style, path } = this.calculateAttributes(this.props);
    this.style = style;
    this.path = path;
  }

  shouldComponentUpdate(nextProps) {
    const { style, path } = this.calculateAttributes(nextProps);
    const { className, interpolation } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [interpolation, nextProps.interpolation],
      [path, this.path],
      [style, this.style]
    ])) {
      this.style = style;
      this.path = path;
      return true;
    }
    return false;
  }

  getLineFunction(props) {
    const { polar, scale, openCurve } = props;
    const interpolation = polar && !openCurve ?
      `${this.toNewName(props.interpolation)}Closed` : this.toNewName(props.interpolation);
    return polar ?
      d3Shape.lineRadial()
        .defined(defined)
        .curve(d3Shape[interpolation])
        .angle(getAngleAccessor(scale))
        .radius(getYAccessor(scale)) :
      d3Shape.line()
        .defined(defined)
        .curve(d3Shape[interpolation])
        .x(getXAccessor(scale))
        .y(getYAccessor(scale));
  }

  calculateAttributes(props) {
    const { style, data, active } = props;
    const lineFunction = this.getLineFunction(props);
    return {
      style: Helpers.evaluateStyle(
        assign({ fill: "none", stroke: "black" }, style), data, active
      ),
      path: lineFunction(data)
    };
  }

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  // Overridden in victory-core-native
  renderLine(path, style, events) {
    const { role, shapeRendering, className, polar, origin } = this.props;
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    return (
      <path
        style={style}
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
    const { events } = this.props;
    return this.renderLine(this.path, this.style, events);
  }
}
