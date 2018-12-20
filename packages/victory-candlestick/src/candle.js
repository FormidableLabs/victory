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

  render() {
    const {
      x,
      high,
      low,
      open,
      close,
      datum,
      active,
      events,
      groupComponent,
      clipPath,
      id,
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
    const candleWidth = this.getCandleWidth(this.props, style);
    const candleHeight = Math.abs(close - open);
    const candleX = x - candleWidth / 2;
    const sharedProps = { role, shapeRendering, className, events, transform, clipPath };

    const candleProps = assign(
      {
        key: `${id}-candle`,
        style,
        x: candleX,
        y: Math.min(open, close),
        width: candleWidth,
        height: candleHeight
      },
      sharedProps
    );

    const highWickProps = assign(
      {
        key: `${id}-highWick`,
        style: wickStyle,
        x1: x,
        x2: x,
        y1: high,
        y2: Math.min(open, close)
      },
      sharedProps
    );

    const lowWickProps = assign(
      {
        key: `${id}-lowWick`,
        style: wickStyle,
        x1: x,
        x2: x,
        y1: Math.max(open, close),
        y2: low
      },
      sharedProps
    );

    return React.cloneElement(groupComponent, {}, [
      React.cloneElement(rectComponent, candleProps),
      React.cloneElement(lineComponent, highWickProps),
      React.cloneElement(lineComponent, lowWickProps)
    ]);
  }
}
