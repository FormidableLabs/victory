import React, { PropTypes } from "react";

export default class Tick extends React.Component {
  static propTypes = {
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
    tick: PropTypes.any,
    style: PropTypes.object,
    events: PropTypes.object
  };

  renderTickLine(props, style, events) {
    return <line {...props} style={style} {...events} vectorEffect="non-scaling-stroke"/>;
  }

  render() {
    const { x1, x2, y1, y2, style, events} = this.props;
    return this.renderTickLine({x1, x2, y1, y2}, style, events);
  }
}
