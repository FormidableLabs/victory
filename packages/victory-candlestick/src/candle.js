/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.5, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Rect, Line } from "victory-core";
import { assign, defaults, isFunction } from "lodash";

export default class Candle extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    candleRatio: PropTypes.number,
    candleWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    close: PropTypes.number,
    datum: PropTypes.object,
    defaultCandleWidth: PropTypes.number,
    groupComponent: PropTypes.element,
    high: PropTypes.number,
    lineComponent: PropTypes.element,
    low: PropTypes.number,
    open: PropTypes.number,
    rectComponent: PropTypes.element,
    wickStrokeWidth: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number
  };

  static defaultProps = {
    defaultCandleWidth: 8,
    groupComponent: <g />,
    lineComponent: <Line />,
    rectComponent: <Rect />
  };

  getCandleWidth(props, style) {
    const { active, datum, data, candleWidth, scale, defaultCandleWidth } = props;
    if (candleWidth) {
      return isFunction(candleWidth)
        ? Helpers.evaluateProp(candleWidth, datum, active)
        : candleWidth;
    } else if (style.width) {
      return style.width;
    }
    const range = scale.x.range();
    const extent = Math.abs(range[1] - range[0]);
    const candles = data.length + 2;
    const candleRatio = props.candleRatio || 0.5;
    const defaultWidth = candleRatio * (data.length < 2 ? defaultCandleWidth : extent / candles);
    return Math.max(1, defaultWidth);
  }

  getCandleProps(props, style) {
    const { id, x, close, open, horizontal } = props;
    const candleWidth = this.getCandleWidth(props, style);
    const candleLength = Math.abs(close - open);
    return {
      key: `${id}-candle`,
      style: Helpers.omit(style, ["width"]),
      x: horizontal ? Math.min(open, close) : x - candleWidth / 2,
      y: horizontal ? x - candleWidth / 2 : Math.min(open, close),
      width: horizontal ? candleLength : candleWidth,
      height: horizontal ? candleWidth : candleLength
    };
  }

  getHighWickProps(props, style) {
    const { horizontal, high, open, close, x, id } = props;
    return {
      key: `${id}-highWick`,
      style: Helpers.omit(style, ["width"]),
      x1: horizontal ? high : x,
      x2: horizontal ? Math.max(open, close) : x,
      y1: horizontal ? x : high,
      y2: horizontal ? x : Math.min(open, close)
    };
  }

  getLowWickProps(props, style) {
    const { horizontal, low, open, close, x, id } = props;
    return {
      key: `${id}-lowWick`,
      style: Helpers.omit(style, ["width"]),
      x1: horizontal ? Math.min(open, close) : x,
      x2: horizontal ? low : x,
      y1: horizontal ? x : Math.max(open, close),
      y2: horizontal ? x : low
    };
  }

  render() {
    const {
      datum,
      active,
      events,
      groupComponent,
      clipPath,
      rectComponent,
      lineComponent,
      role,
      shapeRendering,
      className,
      wickStrokeWidth,
      transform
    } = this.props;
    const style = Helpers.evaluateStyle(
      assign({ stroke: "black" }, this.props.style),
      datum,
      active
    );
    const wickStyle = defaults({ strokeWidth: wickStrokeWidth }, style);
    const sharedProps = { role, shapeRendering, className, events, transform, clipPath };
    const candleProps = assign(this.getCandleProps(this.props, style), sharedProps);
    const highWickProps = assign(this.getHighWickProps(this.props, wickStyle), sharedProps);
    const lowWickProps = assign(this.getLowWickProps(this.props, wickStyle), sharedProps);

    return React.cloneElement(groupComponent, {}, [
      React.cloneElement(rectComponent, candleProps),
      React.cloneElement(lineComponent, highWickProps),
      React.cloneElement(lineComponent, lowWickProps)
    ]);
  }
}
