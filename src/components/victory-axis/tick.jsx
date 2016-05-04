import React, { PropTypes } from "react";

export default class Tick extends React.Component {
  static propTypes = {
    x2: PropTypes.number,
    y2: PropTypes.number,
    tick: PropTypes.any,
    style: PropTypes.object,
    events: PropTypes.object
  };

  render() {
    const { x2, y2, style, events} = this.props;
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
