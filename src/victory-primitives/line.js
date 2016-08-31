import React, { PropTypes } from "react";
import { assign } from "lodash";

export default class Line extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    tick: PropTypes.any,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object
  };

  renderAxisLine(props, style, events) {
    return <line {...props} style={style} {...events} vectorEffect="non-scaling-stroke"/>;
  }

  render() {
    const { x1, x2, y1, y2, events} = this.props;
    const style = assign({stroke: "black"}, this.props.style);
    return this.renderAxisLine({x1, x2, y1, y2}, style, events);
  }
}
