import React, { PropTypes } from "react";

export default class AxisLine extends React.Component {
  static role = "line";

  static propTypes = {
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object
  };

  render() {
    return <line {...this.props}/>;
  }
}
