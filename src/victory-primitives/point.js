import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";
import pathHelpers from "./path-helpers";

export default class Point extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
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
    const {datum, active, x, y} = props;
    const pathFunctions = {
      circle: pathHelpers.circle,
      square: pathHelpers.square,
      diamond: pathHelpers.diamond,
      triangleDown: pathHelpers.triangleDown,
      triangleUp: pathHelpers.triangleUp,
      plus: pathHelpers.plus,
      star: pathHelpers.star
    };
    const symbol = Helpers.evaluateProp(props.symbol, datum, active);
    const size = Helpers.evaluateProp(props.size, datum, active);
    return pathFunctions[symbol].call(null, x, y, size);
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
    const {style, datum, active, events} = this.props;
    const evaluatedStyle = Helpers.evaluateStyle(style, datum, active);
    return this.renderPoint(this.getPath(this.props), evaluatedStyle, events);
  }
}
