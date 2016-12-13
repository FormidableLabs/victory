import React, { PropTypes } from "react";
import pathHelpers from "./path-helpers";

export default class Point extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    datum: PropTypes.object,
    data: PropTypes.array,
    events: PropTypes.object,
    index: PropTypes.number,
    role: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    shapeRendering: React.PropTypes.string,
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"
      ]),
      PropTypes.func
    ]),
    scale: PropTypes.object,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
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

  // Overridden in victory-core-native
  renderPoint(path, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        {...events}
        d={path}
        className={className}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        style={style}
      />
    );
  }

  render() {
    return this.renderPoint(this.getPath(this.props), this.props.style, this.props.events);
  }
}
