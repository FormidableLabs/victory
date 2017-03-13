import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";

export default class Bar extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    datum: PropTypes.object,
    events: PropTypes.object,
    horizontal: PropTypes.bool,
    index: PropTypes.number,
    role: PropTypes.string,
    scale: PropTypes.object,
    shapeRendering: PropTypes.string,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    data: PropTypes.array
  };

  componentWillMount() {
    const {style, path} = this.calculateAttributes(this.props);
    this.style = style;
    this.path = path;
  }

  shouldComponentUpdate(nextProps) {
    const {style, path} = this.calculateAttributes(nextProps);
    if (path !== this.path || !isEqual(style, this.style)) {
      this.style = style;
      this.path = path;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const {datum, active, x, y} = props;
    const style = Helpers.evaluateStyle(assign({fill: "black"}, props.style), datum, active);
    const width = this.getBarWidth(props, style);
    const path = typeof x === "number" && typeof y === "number" ?
      this.getBarPath(props, width) : undefined;
    return { style, path };
  }

  getVerticalBarPath(props, width) {
    const size = width / 2;
    const y0 = Math.round(props.y0);
    const y1 = Math.round(props.y);
    const x0 = Math.round(props.x - size);
    const x1 = Math.round(props.x + size);
    return `M ${x0}, ${y0}
      L ${x0}, ${y1}
      L ${x1}, ${y1}
      L ${x1}, ${y0}
      L ${x0}, ${y0}
      z`;
  }

  getHorizontalBarPath(props, width) {
    const size = width / 2;
    const y0 = Math.round(props.y0);
    const y1 = Math.round(props.y);
    const x0 = Math.round(props.x - size);
    const x1 = Math.round(props.x + size);
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

    const {width, data} = props;
    const padding = props.padding.left || props.padding;
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
