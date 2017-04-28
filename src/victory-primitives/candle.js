import React from "react";
import PropTypes from "prop-types";
import { Helpers, Collection } from "../victory-util";
import { assign } from "lodash";

export default class Candle extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
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

  static defaultProps = {
    groupComponent: <g/>
  };

  componentWillMount() {
    const {style, candleWidth } = this.calculateAttributes(this.props);
    this.style = style;
    this.candleWidth = candleWidth;
  }

  shouldComponentUpdate(nextProps) {
    const {x, y, y1, y2} = this.props;
    const {style, candleWidth} = this.calculateAttributes(nextProps);

    if (!Collection.allSetsEqual([
      [x, nextProps.x],
      [y, nextProps.y],
      [y1, nextProps.y1],
      [y2, nextProps.y2],
      [candleWidth, this.candleWidth],
      [style, this.style]
    ])) {
      this.style = style;
      this.candleWidth = candleWidth;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const {data, datum, active, width} = props;
    const style = Helpers.evaluateStyle(assign({stroke: "black"}, props.style), datum, active);
    const padding = props.padding.left || props.padding;
    const candleWidth = style.width || 0.5 * (width - 2 * padding) / data.length;
    return { style, candleWidth };
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
    const { candleHeight, x, y, events, role, className } = props;
    const shapeRendering = props.shapeRendering || "auto";
    const candleX = x - this.candleWidth / 2;
    return assign({
      x: candleX, y, style: this.style, role, width: this.candleWidth, height: candleHeight,
      shapeRendering, className
    }, events);
  }

  getWickProps(props) {
    const { x, y1, y2, events, className } = props;
    const shapeRendering = props.shapeRendering || "auto";
    const role = props.role || "presentation";
    return assign(
      {x1: x, x2: x, y1, y2, style: this.style, role, shapeRendering, className},
      events
    );
  }

  render() {
    const candleProps = this.getCandleProps(this.props);
    const wickProps = this.getWickProps(this.props);
    return React.cloneElement(
      this.props.groupComponent, {}, this.renderWick(wickProps), this.renderCandle(candleProps)
    );
  }
}
