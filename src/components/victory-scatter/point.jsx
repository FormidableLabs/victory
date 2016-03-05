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

  getPath(props) {
    const pathFunctions = {
      circle: pathHelpers.circle,
      square: pathHelpers.square,
      diamond: pathHelpers.diamond,
      triangleDown: pathHelpers.triangleDown,
      triangleUp: pathHelpers.triangleUp,
      plus: pathHelpers.plus,
      star: pathHelpers.star
    };
    const symbol = Helpers.evaluateProp(props.symbol, props.data);
    return pathFunctions[symbol].call(null, props.x, props.y, props.size);
  }

  render() {
    return (
      <path
        {...this.props.events.data}
        style={this.props.style}
        d={this.getPath(this.props)}
        shapeRendering="optimizeSpeed"
      />
    );
  }
}
