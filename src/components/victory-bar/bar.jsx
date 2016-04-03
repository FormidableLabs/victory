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
    const {independent, dependent0, dependent1} = position;
    const size = width / 2;
    return `M ${independent - size}, ${dependent0}
      L ${independent - size}, ${dependent1}
      L ${independent + size}, ${dependent1}
      L ${independent + size}, ${dependent0}
      L ${independent - size}, ${dependent0}`;
  }

  getHorizontalBarPath(position, width) {
    const {independent, dependent0, dependent1} = position;
    const size = width / 2;
    return `M ${dependent0}, ${independent - size}
      L ${dependent0}, ${independent + size}
      L ${dependent1}, ${independent + size}
      L ${dependent1}, ${independent - size}
      L ${dependent0}, ${independent - size}`;
  }

  getBarPath(position, width) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(position, width) : this.getVerticalBarPath(position, width);
  }

  render() {
    const style = Helpers.evaluateStyle(this.props.style, this.props.datum);
    // TODO better bar width calculation
    const barWidth = style.width || 8;
    const path = this.props.position.independent ?
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
