import React, { PropTypes } from "react";
import pathHelpers from "./path-helpers";


export default class Point extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    datum: PropTypes.object,
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
    scale: PropTypes.object,
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
    return pathFunctions[props.symbol].call(null, props.x, props.y, props.size);
  }

  renderPoint(path, style, events) {
    return <path d={path} style={style} shapeRendering="optimizeSpeed" {...events}/>;
  }

  render() {
    return this.renderPoint(this.getPath(this.props), this.props.style, this.props.events);
  }
}
