import * as React from "react";
import {
  EventPropTypeInterface,
  OrientationTypes,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryCommonPrimitiveProps,
  VictoryDatableProps,
  VictoryStyleObject,
  VictoryLabelStyleObject,
  VictoryLabelableProps,
  VictoryMultiLabelableProps
} from "victory-core";

export interface VictoryCandlestickStyleInterface {
  close?: VictoryStyleObject;
  closeLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  data?: VictoryStyleObject;
  high?: VictoryStyleObject;
  highLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  low?: VictoryStyleObject;
  lowLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  open?: VictoryStyleObject;
  openLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  parent?: VictoryStyleObject;
}

export type VictoryCandlestickLabelsType =
  | (string | number)[]
  | boolean
  | ((datum: any) => number);

export interface VictoryCandlestickProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  candleColors?: {
    positive?: string;
    negative?: string;
  };
  candleRatio?: number;
  candleWidth?: number | Function;
  close?: StringOrNumberOrCallback | string[];
  closeLabelComponent?: React.ReactElement;
  closeLabels?: VictoryCandlestickLabelsType;
  eventKey?: StringOrNumberOrCallback | string[];
  events?: EventPropTypeInterface<
    | "data"
    | "labels"
    | "open"
    | "openLabels"
    | "close"
    | "closeLabels"
    | "low"
    | "lowLabels"
    | "high"
    | "highLabels",
    StringOrNumberOrCallback | string[]
  >[];
  high?: StringOrNumberOrCallback | string[];
  highLabelComponenet?: React.ReactElement;
  highLabels?: VictoryCandlestickLabelsType;
  labelOrientation?:
    | OrientationTypes
    | {
        open?: OrientationTypes;
        close?: OrientationTypes;
        low?: OrientationTypes;
        high?: OrientationTypes;
      };
  low?: StringOrNumberOrCallback | string[];
  lowLabelComponent?: React.ReactElement;
  lowLabels?: VictoryCandlestickLabelsType;
  open?: StringOrNumberOrCallback | string[];
  openLabelComponent?: React.ReactElement;
  openLabels?: VictoryCandlestickLabelsType;
  size?: number;
  style?: VictoryCandlestickStyleInterface;
  wickStrokeWidth?: number;
}

/**
 * VictoryCandlestick renders a dataset as a series of candlesticks.
 * VictoryCandlestick can be composed with VictoryChart to create candlestick charts.
 */

export class VictoryCandlestick extends React.Component<
  VictoryCandlestickProps,
  any
> {}

export interface CandleProps extends VictoryCommonPrimitiveProps {
  candleRatio?: number;
  candleWidth?: number | Function;
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

export class Candle extends React.Component<CandleProps, any> {}
