/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { defined, getXAccessor, getYAccessor, getAngleAccessor } from "./helpers";
import { assign } from "lodash";
import * as d3Shape from "d3-shape";
import CommonProps from "./common-props";
import Path from "./path";


export default class Curve extends React.Component {
  static propTypes = {
    ...CommonProps,
    interpolation: PropTypes.string,
    openCurve: PropTypes.bool,
    origin: PropTypes.object,
    pathComponent: PropTypes.element,
    polar: PropTypes.bool
  };

  static defaultProps = {
    pathComponent: <Path/>
  };

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


  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  render() {
    const {
      data, active, events, role, shapeRendering, className, polar, origin, pathComponent
    } = this.props;
    const style = Helpers.evaluateStyle(
      assign({ fill: "none", stroke: "black" }, this.props.style), data, active
    );
    const lineFunction = this.getLineFunction(this.props);
    const path = lineFunction(data);
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    return React.cloneElement(pathComponent, {
      className, style, role, shapeRendering, transform, events, d: path
    });
  }
}
