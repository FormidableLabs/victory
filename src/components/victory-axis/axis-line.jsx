import React, { PropTypes } from "react";
import { Helpers } from "victory-core";

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
    const events = Helpers.getPartialEvents(this.props.events, 0, this.props);
    return <line {...this.props} {...events}/>;
  }
}
