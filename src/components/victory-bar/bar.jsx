import React, { PropTypes } from "react";
import { Helpers } from "victory-core";
import Events from "../../helpers/events";

export default class Bar extends React.Component {

  static propTypes = {
    index: PropTypes.object,
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
    const barWidth = style.width;
    const path = this.props.position.independent ?
      this.getBarPath(this.props.position, barWidth) : undefined;
    const index = [this.props.index.seriesIndex, this.props.index.barIndex];
    const events = Events.getPartialEvents(this.props.events, index, this.props);
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
