import React, { PropTypes } from "react";

export default class Bar extends React.Component {

  static propTypes = {
    datum: PropTypes.object,
    events: PropTypes.object,
    horizontal: PropTypes.bool,
    index: PropTypes.number,
    role: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    y0: React.PropTypes.number,
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
      L ${x - size}, ${y0}`;
  }

  getHorizontalBarPath(props, width) {
    const {x, y0, y} = props;
    const size = width / 2;
    return `M ${y0}, ${x - size}
      L ${y0}, ${x + size}
      L ${y}, ${x + size}
      L ${y}, ${x - size}
      L ${y0}, ${x - size}`;
  }

  getBarPath(props, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(props, width) : this.getVerticalBarPath(props, width);
  }

  renderBar(path, style, events) {
    const { role } = this.props;
    return (
      <path d={path} style={style} role={role} shapeRendering="optimizeSpeed" {...events}/>
    );
  }

  render() {
    // TODO better bar width calculation
    const { data, events, style, width} = this.props;
    const padding = this.props.padding.left || this.props.padding;
    const barWidth = style && style.width ||
    0.3 * (width - 2 * padding) / data.length;
    const path = typeof this.props.x === "number" ?
      this.getBarPath(this.props, barWidth) : undefined;
    return this.renderBar(path, style, events);
  }
}
