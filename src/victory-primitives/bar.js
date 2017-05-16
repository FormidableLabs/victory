/*eslint no-magic-numbers: ["error", { "ignore": [2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";
import CommonProps from "./common-props";

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
    const { datum, active, x, y } = props;
    const stroke = props.style && props.style.fill || "black";
    const baseStyle = { fill: "black", stroke };
    const style = Helpers.evaluateStyle(assign(baseStyle, props.style), datum, active);
    const width = this.getBarWidth(props, style);
    const path = typeof x === "number" && typeof y === "number" ?
      this.getBarPath(props, width) : undefined;
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

  getBarPath(props, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(props, width) : this.getVerticalBarPath(props, width);
  }

  getBarWidth(props, style) {
    if (style.width) {
      return style.width;
    }

    const { width, data } = props;
    const padding = props.padding.left || props.padding;
    // eslint-disable-next-line no-magic-numbers
    const defaultWidth = data.length === 0 ? 8 : (width - 2 * padding) / data.length;
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
