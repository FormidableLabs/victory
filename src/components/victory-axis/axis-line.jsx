import React, { PropTypes } from "react";

export default class AxisLine extends React.Component {
  static propTypes = {
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object
  };

  render() {
    const { x1, x2, y1, y2, style, events} = this.props;
    return (
      <line
        x1={x1} x2={x2} y1={y1} y2={y2} style={style}
        {...events}
      />
    );
  }
}
