/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.5, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Line, Rect } from "victory-core";
import { assign, defaults, isFunction } from "lodash";

const getCandleWidth = (candleWidth, props) => {
  const { style } = props;
  if (candleWidth) {
    return isFunction(candleWidth) ? Helpers.evaluateProp(candleWidth, props) : candleWidth;
  } else if (style.width) {
    return style.width;
  }
  return candleWidth;
};

const getCandleProps = (props, style) => {
  const { id, x, close, open, horizontal, candleWidth } = props;
  const candleLength = Math.abs(close - open);
  return {
    key: `${id}-candle`,
    style: Helpers.omit(style, ["width"]),
    x: horizontal ? Math.min(open, close) : x - candleWidth / 2,
    y: horizontal ? x - candleWidth / 2 : Math.min(open, close),
    width: horizontal ? candleLength : candleWidth,
    height: horizontal ? candleWidth : candleLength
  };
};

const getHighWickProps = (props, style) => {
  const { horizontal, high, open, close, x, id } = props;
  return {
    key: `${id}-highWick`,
    style: Helpers.omit(style, ["width"]),
    x1: horizontal ? high : x,
    x2: horizontal ? Math.max(open, close) : x,
    y1: horizontal ? x : high,
    y2: horizontal ? x : Math.min(open, close)
  };
};

const getLowWickProps = (props, style) => {
  const { horizontal, low, open, close, x, id } = props;
  return {
    key: `${id}-lowWick`,
    style: Helpers.omit(style, ["width"]),
    x1: horizontal ? Math.min(open, close) : x,
    x2: horizontal ? low : x,
    y1: horizontal ? x : Math.max(open, close),
    y2: horizontal ? x : low
  };
};

const evaluateProps = (props) => {
  // Potential evaluated props are 1) `style`, 2) `candleWidth`
  const style = Helpers.evaluateStyle(assign({ stroke: "black" }, props.style), props);
  const candleWidth = getCandleWidth(props.candleWidth, assign({}, props, { style }));
  return assign({}, props, { style, candleWidth });
};

const Candle = (props) => {
  props = evaluateProps(props);
  const {
    events,
    groupComponent,
    clipPath,
    rectComponent,
    lineComponent,
    role,
    shapeRendering,
    className,
    wickStrokeWidth,
    transform,
    style
  } = props;
  const wickStyle = defaults({ strokeWidth: wickStrokeWidth }, style);
  const sharedProps = {
    ...events,
    role,
    shapeRendering,
    className,
    transform,
    clipPath,
    desc: Helpers.evaluateProp(props.desc, props),
    tabIndex: Helpers.evaluateProp(props.tabIndex, props)
  };
  const candleProps = assign(getCandleProps(props, style), sharedProps);
  const highWickProps = assign(getHighWickProps(props, wickStyle), sharedProps);
  const lowWickProps = assign(getLowWickProps(props, wickStyle), sharedProps);

  return React.cloneElement(groupComponent, {}, [
    React.cloneElement(rectComponent, candleProps),
    React.cloneElement(lineComponent, highWickProps),
    React.cloneElement(lineComponent, lowWickProps)
  ]);
};

Candle.propTypes = {
  ...CommonProps.primitiveProps,
  candleRatio: PropTypes.number,
  candleWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  close: PropTypes.number,
  datum: PropTypes.object,
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

Candle.defaultProps = {
  groupComponent: <g />,
  lineComponent: <Line />,
  rectComponent: <Rect />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Candle;
