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

  render() {
    const { x1, y1, x2, y2, style, events} = this.props;
    return (
      <line
        {...events}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={style}
      />
    );
  }
}
