import React from "react";
import {
  Helpers,
  Line,
  NumberOrCallback,
  Rect,
  VictoryCommonPrimitiveProps,
  VictoryStyleObject,
} from "victory-core";
import { defaults } from "lodash";

export interface CandleProps extends VictoryCommonPrimitiveProps {
  candleRatio?: number;
  candleWidth?: NumberOrCallback;
  close?: number;
  datum?: any;
  groupComponent?: React.ReactElement;
  high?: number;
  lineComponent?: React.ReactElement;
  low?: number;
  open?: number;
  rectComponent?: React.ReactElement;
  wickStrokeWidth?: number;
  width?: number;
  x?: number;
}

const getCandleWidth = (
  candleWidth: CandleProps["candleWidth"],
  props: CandleProps,
) => {
  const { style } = props;
  if (candleWidth) {
    return Helpers.isFunction(candleWidth)
      ? Helpers.evaluateProp(candleWidth, props)
      : candleWidth;
  } else if (style.width) {
    return style.width;
  }
  return candleWidth;
};

const getCandleProps = (props, style: VictoryStyleObject) => {
  const { id, x, close, open, horizontal, candleWidth } = props;
  const candleLength = Math.abs(close - open);
  return {
    key: `${id}-candle`,
    style: Helpers.omit(style, ["width"]),
    x: horizontal ? Math.min(open, close) : x - candleWidth / 2,
    y: horizontal ? x - candleWidth / 2 : Math.min(open, close),
    width: horizontal ? candleLength : candleWidth,
    height: horizontal ? candleWidth : candleLength,
  };
};

const getHighWickProps = (props, style: VictoryStyleObject) => {
  const { horizontal, high, open, close, x, id } = props;
  return {
    key: `${id}-highWick`,
    style: Helpers.omit(style, ["width"]),
    x1: horizontal ? high : x,
    x2: horizontal ? Math.max(open, close) : x,
    y1: horizontal ? x : high,
    y2: horizontal ? x : Math.min(open, close),
  };
};

const getLowWickProps = (props, style: VictoryStyleObject) => {
  const { horizontal, low, open, close, x, id } = props;
  return {
    key: `${id}-lowWick`,
    style: Helpers.omit(style, ["width"]),
    x1: horizontal ? Math.min(open, close) : x,
    x2: horizontal ? low : x,
    y1: horizontal ? x : Math.max(open, close),
    y2: horizontal ? x : low,
  };
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `cornerRadius`
   *
   * Everything else does not have to be evaluated in a particular order:
   * `ariaLabel`
   * `desc`
   * `id`
   * `tabIndex`
   */
  const style = Helpers.evaluateStyle(
    Object.assign({ stroke: "black" }, props.style),
    props,
  );
  const candleWidth = getCandleWidth(
    props.candleWidth,
    Object.assign({}, props, { style }),
  );

  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, {
    ariaLabel,
    style,
    candleWidth,
    desc,
    id,
    tabIndex,
  });
};

const defaultProps: Partial<CandleProps> = {
  groupComponent: <g />,
  lineComponent: <Line />,
  rectComponent: <Rect />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Candle = (props: CandleProps) => {
  const modifiedProps = evaluateProps(defaults({}, props, defaultProps));
  const {
    ariaLabel,
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
    style,
    desc,
    tabIndex,
  } = modifiedProps;
  const wickStyle = defaults({ strokeWidth: wickStrokeWidth }, style);
  const sharedProps = {
    ...events,
    "aria-label": ariaLabel,
    role,
    shapeRendering,
    className,
    transform,
    clipPath,
    desc,
    tabIndex,
  };
  const candleProps = Object.assign(
    getCandleProps(modifiedProps, style),
    sharedProps,
  );
  const highWickProps = Object.assign(
    getHighWickProps(modifiedProps, wickStyle),
    sharedProps,
  );
  const lowWickProps = Object.assign(
    getLowWickProps(modifiedProps, wickStyle),
    sharedProps,
  );

  return React.cloneElement(groupComponent, {}, [
    React.cloneElement(rectComponent, candleProps),
    React.cloneElement(lineComponent, highWickProps),
    React.cloneElement(lineComponent, lowWickProps),
  ]);
};
