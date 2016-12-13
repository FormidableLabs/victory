import React, { PropTypes } from "react";
import { assign } from "lodash";

export default class Bar extends React.Component {

  static propTypes = {
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

  getVerticalBarPath(props, width) {
    const {x, y0, y} = props;
    const size = width / 2;
    return `M ${x - size}, ${y0}
      L ${x - size}, ${y}
      L ${x + size}, ${y}
      L ${x + size}, ${y0}
      L ${x - size}, ${y0}
      z`;
  }

  getHorizontalBarPath(props, width) {
    const {x, y0, y} = props;
    const size = width / 2;
    return `M ${y0}, ${x - size}
      L ${y0}, ${x + size}
      L ${y}, ${x + size}
      L ${y}, ${x - size}
      L ${y0}, ${x - size}
      z`;
  }

  getBarPath(props, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(props, width) : this.getVerticalBarPath(props, width);
  }

  getBarWidth(props) {
    const {style, width, data} = props;
    const padding = props.padding.left || props.padding;
    const defaultWidth = data.length === 0 ? 8 : (width - 2 * padding) / data.length;
    return style && style.width ? style.width : defaultWidth;
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
    // TODO better bar width calculation
    const barWidth = this.getBarWidth(this.props);
    const path = typeof this.props.x === "number" ?
      this.getBarPath(this.props, barWidth) : undefined;
    const style = assign({fill: "black", stroke: "none"}, this.props.style);
    return this.renderBar(path, style, this.props.events);
  }
}
