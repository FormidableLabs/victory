import React, { PropTypes } from "react";

export default class GridLine extends React.Component {
  static role = "grid";

  static propTypes = {
    tick: PropTypes.any,
    x2: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object
  };

  render() {
    const { events, x2, y2, style } = this.props;
    return (
      <line
        {...events}
        x2={x2}
        y2={y2}
        style={style}
      />
    );
  }
}
