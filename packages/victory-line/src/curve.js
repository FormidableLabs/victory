/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import * as d3Shape from "d3-shape";
import { Helpers, CommonProps, Path } from "victory-core";

const defined = (d) => {
  const y = d._y1 !== undefined ? d._y1 : d._y;
  return y !== null && y !== undefined && d._y0 !== null;
};

const getXAccessor = (scale) => {
  return (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
};

const getYAccessor = (scale) => {
  return (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
};

const getAngleAccessor = (scale) => {
  return (d) => {
    const x = scale.x(d._x1 !== undefined ? d._x1 : d._x);
    return -1 * x + Math.PI / 2;
  };
};

export default class Curve extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    interpolation: PropTypes.string,
    openCurve: PropTypes.bool,
    origin: PropTypes.object,
    pathComponent: PropTypes.element,
    polar: PropTypes.bool
  };

  static defaultProps = {
    pathComponent: <Path />
  };

  getLineFunction(props) {
    const { polar, scale, horizontal } = props;
    const defaultOpenCurve = polar ? false : true;
    const openCurve = props.openCurve === undefined ? defaultOpenCurve : props.openCurve;
    const interpolation = !openCurve
      ? `${this.toNewName(props.interpolation)}Closed`
      : this.toNewName(props.interpolation);
    return polar
      ? d3Shape
          .lineRadial()
          .defined(defined)
          .curve(d3Shape[interpolation])
          .angle(getAngleAccessor(scale))
          .radius(getYAccessor(scale))
      : d3Shape
          .line()
          .defined(defined)
          .curve(d3Shape[interpolation])
          .x(horizontal ? getYAccessor(scale) : getXAccessor(scale))
          .y(horizontal ? getXAccessor(scale) : getYAccessor(scale));
  }

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  render() {
    const {
      data,
      active,
      events,
      role,
      shapeRendering,
      className,
      polar,
      origin,
      pathComponent,
      clipPath
    } = this.props;
    const style = Helpers.evaluateStyle(
      assign({ fill: "none", stroke: "black" }, this.props.style),
      data,
      active
    );
    const lineFunction = this.getLineFunction(this.props);
    const path = lineFunction(data);
    const defaultTransform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const transform = this.props.transform || defaultTransform;
    return React.cloneElement(pathComponent, {
      className,
      style,
      role,
      shapeRendering,
      transform,
      events,
      d: path,
      clipPath
    });
  }
}
