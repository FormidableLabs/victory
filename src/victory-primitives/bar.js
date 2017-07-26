import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import Collection from "../victory-util/collection";
import { assign } from "lodash";
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
    const { className, datum, horizontal, x, y, y0 } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [x, nextProps.x],
      [y, nextProps.y],
      [y0, nextProps.y0],
      [horizontal, nextProps.horizontal],
      [path, this.path],
      [style, this.style],
      [datum, nextProps.datum]
    ])) {
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

  getAngularWidth(props, width) {
    const { scale } = props;
    const range = scale.y.range();
    const r = Math.max(...range);
    const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
    return (width / (2 * Math.PI * r)) * angularRange;
  }

  getAngle(props, index) {
    const { data, scale } = props;
    const x = data[index]._x1 === undefined ? "_x" : "_x1";
    return scale.x(data[index][x]);
  }

  getStartAngle(props, index) {
    const { data, scale } = props;
    const currentAngle = this.getAngle(props, index);
    const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
    const previousAngle = index === 0 ?
      this.getAngle(props, data.length - 1) - (Math.PI * 2) :
      this.getAngle(props, index - 1);
    return index === 0 && angularRange < (2 * Math.PI) ?
      scale.x.range()[0] : (currentAngle + previousAngle) / 2;
  }

  getEndAngle(props, index) {
    const { data, scale } = props;
    const currentAngle = this.getAngle(props, index);
    const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
    const lastAngle = scale.x.range()[1] === (2 * Math.PI) ?
      this.getAngle(props, 0) + (Math.PI * 2) : scale.x.range()[1];
    const nextAngle = index === data.length - 1 ?
      this.getAngle(props, 0) + (Math.PI * 2) : this.getAngle(props, index + 1);
    return index === data.length - 1 && angularRange < (2 * Math.PI) ?
      lastAngle : (currentAngle + nextAngle) / 2;
  }

  getVerticalPolarBarPath(props) {
    const { datum, scale, style, index } = props;
    const r1 = scale.y(datum._y0 || 0);
    const r2 = scale.y(datum._y1 !== undefined ? datum._y1 : datum._y);
    const currentAngle = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
    let start;
    let end;
    if (style.width) {
      const width = this.getAngularWidth(props, style.width);
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

  getBarPath(props, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(props, width) : this.getVerticalBarPath(props, width);
  }

  getPolarBarPath(props) {
    // TODO Radial bars
    return this.getVerticalPolarBarPath(props);
  }

  getBarWidth(props, style) {
    if (style.width) {
      return style.width;
    }
    const { scale, data } = props;
    const range = scale.x.range();
    const extent = Math.abs(range[1] - range[0]);
    const bars = data.length + 2;
    const barRatio = 0.5;
    // eslint-disable-next-line no-magic-numbers
    const defaultWidth = data.length < 2 ? 8 : (barRatio * extent / bars);
    return Math.max(1, Math.round(defaultWidth));
  }

  // Overridden in victory-core-native
  renderBar(path, style, events) {
    const { role, shapeRendering, className, origin, polar } = this.props;
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    return (
      <path
        d={path}
        transform={transform}
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
