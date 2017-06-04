import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import Collection from "../victory-util/collection";
import pathHelpers from "./path-helpers";
import CommonProps from "./common-props";

export default class Point extends React.Component {
  static propTypes = {
    ...CommonProps,
    datum: PropTypes.object,
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"
      ]),
      PropTypes.func
    ]),
    x: PropTypes.number,
    y: PropTypes.number
  };

  componentWillMount() {
    const { style, path } = this.calculateAttributes(this.props);
    this.style = style;
    this.path = path;
  }

  shouldComponentUpdate(nextProps) {
    const { style, path } = this.calculateAttributes(nextProps);
    const { className, datum, x, y, size, symbol } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [x, nextProps.x],
      [y, nextProps.y],
      [size, nextProps.size],
      [symbol, nextProps.symbol],
      [path, this.path],
      [style, this.style],
      [datum, nextProps.datum]
    ])) {
      this.style = style;
      this.path = path;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { style, datum, active } = props;
    return {
      style: Helpers.evaluateStyle(style, datum, active),
      path: this.getPath(props)
    };
  }

  getPath(props) {
    const { datum, active, x, y } = props;
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
    return this.renderPoint(this.path, this.style, this.props.events);
  }
}
