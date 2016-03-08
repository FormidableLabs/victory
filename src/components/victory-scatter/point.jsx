import React, { PropTypes } from "react";
import { Helpers } from "victory-core";
import pathHelpers from "./path-helpers";

export default class Point extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    events: PropTypes.object,
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"
      ]),
      PropTypes.func
    ]),
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    style: PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  getPath(state) {
    const pathFunctions = {
      circle: pathHelpers.circle,
      square: pathHelpers.square,
      diamond: pathHelpers.diamond,
      triangleDown: pathHelpers.triangleDown,
      triangleUp: pathHelpers.triangleUp,
      plus: pathHelpers.plus,
      star: pathHelpers.star
    };
    const symbol = Helpers.evaluateProp(state.symbol, state.data);
    return pathFunctions[symbol].call(null, state.x, state.y, state.size);
  }

  bindEvents(events) {
    return events ?
      Object.keys(events).reduce((prev, curr) => {
        prev[curr] = events[curr].bind(this);
        return prev;
      }, {}) : {};
  }

  render() {
    const events = this.bindEvents(this.state.events);
    return (
      <path
        {...events}
        style={this.state.style}
        d={this.getPath(this.state)}
        shapeRendering="optimizeSpeed"
      />
    );
  }
}
