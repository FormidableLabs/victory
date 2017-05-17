/*eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";
import CommonProps from "./common-props";
import * as d3Shape from "d3-shape";

export default class Bar extends React.Component {

  static propTypes = {
    ...CommonProps,
    datum: PropTypes.object,
    horizontal: PropTypes.bool,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number
  };

  componentWillMount() {
    const { style, path } = this.calculateAttributes(this.props);
    this.style = style;
    this.path = path;
  }

  shouldComponentUpdate(nextProps) {
    const { style, path } = this.calculateAttributes(nextProps);
    if (path !== this.path || !isEqual(style, this.style)) {
      this.style = style;
      this.path = path;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { datum, active, polar } = props;
    const stroke = props.style && props.style.fill || "black";
    const baseStyle = { fill: "black", stroke };
    const style = Helpers.evaluateStyle(assign(baseStyle, props.style), datum, active);
    const width = this.getBarWidth(props, style);
    const path = polar ? this.getPolarBarPath(props, width) : this.getBarPath(props, width);
    return { style, path };
  }

  getPosition(props, width) {
    const size = width / 2;
    const { x, x0, y, y0, polar } = props;
    return {
      y0: Math.round(y0),
      y1: Math.round(y),
      x0: polar ? Math.round(x0) : Math.round(x - size),
      x1: polar ? Math.round(x) : Math.round(x + size)
    };
  }

  getPolarPosition(props) {
    const { datum } = props;
    const widthFunction = this.getPolarWidth(props);
    const width = widthFunction(datum);
    const size = 8;
    const { x, x0, y, y0, polar } = props;
    return {
      y0: Math.round(y0),
      y1: Math.round(y),
      x0: polar ? Math.round(x0) : Math.round(x - size),
      x1: polar ? Math.round(x) : Math.round(x + size)
    };
  }

  getDefaultAngularWidth(data, index) {
    const previous = index === 0 ? data[data.length - 1] : data[index - 1];
    const next = index === data.length - 1 ? data[0] : data[index + 1];
    const startAngle = (previous._x + 360) % 360;
    const endAngle = (next._x + 360) % 360;
    console.log(startAngle, endAngle)
    return () => {
      return endAngle - startAngle / 2;
    };
  }

  getPolarWidth(props) {
    const { data, index, style } = props;
    if (style.width) {
      return this.getAngularWidth(style.width);
    }
    return this.getDefaultAngularWidth(data, index);
  }

  getVerticalBarPath(props, width) {
    const { x0, x1, y0, y1 } = this.getPosition(props, width);
    return `M ${x0}, ${y0}
      L ${x0}, ${y1}
      L ${x1}, ${y1}
      L ${x1}, ${y0}
      L ${x0}, ${y0}
      z`;
  }

  getHorizontalBarPath(props, width) {
    const { x0, x1, y0, y1 } = this.getPosition(props, width);
    return `M ${y0}, ${x0}
      L ${y0}, ${x1}
      L ${y1}, ${x1}
      L ${y1}, ${x0}
      L ${y0}, ${x0}
      z`;
  }

  getAngle(datum, scale) {
    const x = datum._x;
    return -1 * scale.x(x) + Math.PI / 2;
  }


  getAngularWidth(datum, width) {
    const r = datum._y;
    return (width / (2 * Math.PI * r)) * 360;
  }

  getStartAngle(datum, props) {
    const { style, data, index, scale } = props;
    const currentAngle = this.getAngle(datum, scale);
    if (style.width) {
      const width = this.getAngularWidth(datum, style.width);
      return currentAngle - (width / 2);
    }
    const previous = index === 0 ? data[data.length - 1] : data[index - 1];
    const previousAngle = this.getAngle(previous, scale);
    const width = (currentAngle - previousAngle);
    return currentAngle - (width / 2);
  }

  getEndAngle(datum, props) {
    const { style, data, index, scale } = props;
    const currentAngle = this.getAngle(datum, scale);
    if (style.width) {
      const width = this.getAngularWidth(datum, style.width);
      return currentAngle + (width / 2);
    }
    const next = index === data.length - 1 ? data[0] : data[index + 1];
    const nextAngle = this.getAngle(next, scale);
    const width = (nextAngle - currentAngle);
    return currentAngle + (width / 2);
  }

  getVerticalPolarBarPath(props) {
    const { datum, scale } = props;
    const r1 = scale.y(datum._y0 || 0);
    const r2 = scale.y(datum._y1 !== undefined ? datum._y1 : datum._y);
    const currentAngle = scale.x(datum._x);
    const startAngle = this.getStartAngle(datum, props);
    const endAngle = this.getEndAngle(datum, props);
    console.log(datum.fill, startAngle, currentAngle, endAngle)
    const path = d3Shape.arc()
      .innerRadius(r1)
      .outerRadius(r2)
      .startAngle(startAngle)
      .endAngle(endAngle);
    return path();
  }

  getHorizontalPolarBarPath(props, width) {
    // const { x0, x1, y0, y1 } = this.getPosition(props, width);
    // return `M ${y0}, ${x0}
    //   L ${y0}, ${x1}
    //   L ${y1}, ${x1}
    //   L ${y1}, ${x0}
    //   L ${y0}, ${x0}
    //   z`;
  }

  getBarPath(props, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(props, width) : this.getVerticalBarPath(props, width);
  }

  getPolarBarPath(props, width) {
    return this.props.horizontal ?
      this.getHorizontalPolarBarPath(props, width) : this.getVerticalPolarBarPath(props, width);
  }

  getBarWidth(props, style) {
    if (style.width) {
      return style.width;
    }

    const { scale, data, horizontal } = props;
    const padding = style.padding || 0;
    // eslint-disable-next-line no-magic-numbers
    const range = horizontal ? scale.y.range() : scale.x.range();
    const extent = Math.abs(range[1] - range[0]);
    const totalPadding = padding * 2 * (data.length + 1);
    const defaultWidth = data.length > 2 ? 8 : (extent - totalPadding) / (data.length + 2);
    return defaultWidth;
  }

  // Overridden in victory-core-native
  renderBar(path, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        d={path}
        className={className}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
  }

  render() {
    return this.renderBar(this.path, this.style, this.props.events);
  }
}
