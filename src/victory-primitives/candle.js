import React, { PropTypes } from "react";
import { assign } from "lodash";


export default class Candle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    x: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    y: PropTypes.number,
    events: PropTypes.object,
    candleHeight: PropTypes.number,
    shapeRendering: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object,
    datum: PropTypes.object,
    width: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    data: PropTypes.array,
    groupComponent: PropTypes.element,
    role: PropTypes.string
  }

  // Overridden in victory-core-native
  renderWick(wickProps) {
    return <line {...wickProps}/>;
  }

  // Overridden in victory-core-native
  renderCandle(candleProps) {
    return <rect {...candleProps}/>;
  }

  getCandleProps(props) {
    const { width, candleHeight, x, y, data, events, role, className} = props;
    const style = assign({stroke: "black"}, props.style);
    const padding = props.padding.left || props.padding;
    const candleWidth = style.width || 0.5 * (width - 2 * padding) / data.length;
    const candleX = x - candleWidth / 2;
    const shapeRendering = props.shapeRendering || "auto";
    return assign({
      x: candleX, y, style, role, width: candleWidth, height: candleHeight,
      shapeRendering, className
    }, events);
  }

  getWickProps(props) {
    const { x, y1, y2, events, className } = props;
    const style = assign({stroke: "black"}, props.style);
    const shapeRendering = props.shapeRendering || "auto";
    const role = props.role || "presentation";
    return assign({x1: x, x2: x, y1, y2, style, role, shapeRendering, className}, events);
  }

  render() {
    const candleProps = this.getCandleProps(this.props);
    const wickProps = this.getWickProps(this.props);
    return React.cloneElement(
      this.props.groupComponent, {}, this.renderWick(wickProps), this.renderCandle(candleProps)
    );
  }
}
