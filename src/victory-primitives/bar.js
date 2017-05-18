/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
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
    const { x, y, y0 } = props;
    return {
      y0: Math.round(y0),
      y1: Math.round(y),
      x0: Math.round(x - size),
      x1: Math.round(x + size)
    };
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

  transformAngle(angle) {
    return -1 * angle + (Math.PI / 2);
  }

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  getAngularWidth(datum, width) {
    const r = datum._y;
    const angle = (width / (2 * Math.PI * r)) * 360;
    return this.degreesToRadians(angle);
  }

  getStartAngle(props, index) {
    const { data, scale } = props;
    const current = data[index];
    const currentAngle = scale.x(current._x);
    const minAngle = this.getMinimumAngle(props);
    return currentAngle - (minAngle / 2);
  }

  getEndAngle(props, index) {
    const { data, scale } = props;
    const next = index === data.length - 1 ? data[0] : data[index + 1];
    const nextAngle = scale.x(next._x);
    const end = index === data.length - 1 ? nextAngle + (Math.PI * 2) : nextAngle;
    const minAngle = this.getMinimumAngle(props);
    return end - (minAngle / 2);
  }

  getMinimumAngle(props) {
    const { data, scale } = props;
    const lastAngle = scale.x(data[0]._x) + (Math.PI * 2);
    const differences = data.map((d, i) => {
      const nextAngle = i === data.length - 1 ? lastAngle : scale.x(data[i + 1]._x);
      const currentAngle = scale.x(d._x);
      return nextAngle - currentAngle;
    });
    return Math.min(...differences);
  }

  getVerticalPolarBarPath(props) {
    const { datum, scale, style, index } = props;
    const r1 = scale.y(datum._y0 || 0);
    const r2 = scale.y(datum._y1 !== undefined ? datum._y1 : datum._y);
    const currentAngle = scale.x(datum._x);
    let start;
    let end;
    if (style.width) {
      const width = this.getAngularWidth(datum, style.width);
      start = currentAngle - (width / 2);
      end = currentAngle + (width / 2);
    } else {
      start = this.getStartAngle(props, index);
      end = this.getEndAngle(props, index);
    }
    const path = d3Shape.arc()
      .innerRadius(r1)
      .outerRadius(r2)
      .startAngle(this.transformAngle(start))
      .endAngle(this.transformAngle(end));
    return path();
  }

  getHorizontalPolarBarPath(props) {
    // TODO
  }

  getBarPath(props, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(props, width) : this.getVerticalBarPath(props, width);
  }

  getPolarBarPath(props) {
    return this.props.horizontal ?
      this.getHorizontalPolarBarPath(props) : this.getVerticalPolarBarPath(props);
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
