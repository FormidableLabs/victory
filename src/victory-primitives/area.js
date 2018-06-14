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

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  render() {
    const {
      role, shapeRendering, className, polar, origin, data, active, pathComponent, events,
      groupComponent
    } = this.props;
    const style = Helpers.evaluateStyle(assign({ fill: "black" }, this.props.style), data, active);
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;

    const renderLine = style.stroke && style.stroke !== "none" && style.stroke !== "transparent";
    const areaFunction = this.getAreaFunction(this.props);
    const lineFunction = renderLine && this.getLineFunction(this.props);

    const areaStroke = style.stroke ? "none" : style.fill;

    const sharedProps = { className, role, shapeRendering, transform, events };
    const area = React.cloneElement(pathComponent, assign({
      key: "area", style: assign({}, style, { stroke: areaStroke }), d: areaFunction(data)
    }, sharedProps));

    const line = renderLine ? React.cloneElement(pathComponent, assign({
      key: "area-stroke", style: assign({}, style, { fill: "none" }), d: lineFunction(data)
    }, sharedProps)) : null;

    return renderLine ? React.cloneElement(groupComponent, {}, [area, line]) : area;
  }
}
