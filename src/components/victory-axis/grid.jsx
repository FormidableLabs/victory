import React, { PropTypes } from "react";

export default class GridLine extends React.Component {
  static propTypes = {
    tick: PropTypes.any,
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object
  };

  render() {
    const { events, x1, y1, x2, y2, style } = this.props;
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
