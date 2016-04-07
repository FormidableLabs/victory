import React, { PropTypes } from "react";
import { Helpers } from "victory-core";

export default class Bar extends React.Component {

  static propTypes = {
    index: PropTypes.number,
    events: PropTypes.object,
    position: PropTypes.object,
    horizontal: PropTypes.bool,
    style: PropTypes.object,
    datum: PropTypes.object
  };

  getVerticalBarPath(position, width) {
    const {x, y0, y1} = position;
    const size = width / 2;
    return `M ${x - size}, ${y0}
      L ${x - size}, ${y1}
      L ${x + size}, ${y1}
      L ${x + size}, ${y0}
      L ${x - size}, ${y0}`;
  }

  getHorizontalBarPath(position, width) {
    const {x, y0, y1} = position;
    const size = width / 2;
    return `M ${y0}, ${x - size}
      L ${y0}, ${x + size}
      L ${y1}, ${x + size}
      L ${y1}, ${x - size}
      L ${y0}, ${x - size}`;
  }

  getBarPath(position, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(position, width) : this.getVerticalBarPath(position, width);
  }

  render() {
    const style = Helpers.evaluateStyle(this.props.style, this.props.datum);
    // TODO better bar width calculation
    const barWidth = style.width || 8;
    const path = typeof this.props.position.x === "number" ?
      this.getBarPath(this.props.position, barWidth) : undefined;
    const events = Helpers.getPartialEvents(this.props.events, this.props.index, this.props);
    return (
      <path
        {...events}
        d={path}
        style={style}
        shapeRendering="optimizeSpeed"
      />
    );
  }
}
