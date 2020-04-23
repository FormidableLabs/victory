// Definitions by: Alexey Svetliakov <https://github.com/asvetliakov>
//                 snerks <https://github.com/snerks>
//                 Krzysztof Cebula <https://github.com/Havret>
//                 Vitaliy Polyanskiy <https://github.com/alreadyExisted>
//                 James Lismore <https://github.com/jlismore>
//                 Stack Builders <https://github.com/stackbuilders>
//                 Esteban Ibarra <https://github.com/ibarrae>
//                 Dominic Lee <https://github.com/dominictwlee>
//                 Dave Vedder <https://github.com/veddermatic>
//                 Alec Flett <https://github.com/alecf>

import * as React from "react";
import {
  EventPropTypeInterface,
  OrientationTypes,
  OriginType,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryStyleObject,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryCandlestickStyleInterface extends VictoryStyleInterface {
  close?: VictoryStyleObject;
  closeLabels?: VictoryStyleObject;
  data?: VictoryStyleObject;
  high?: VictoryStyleObject;
  highLabels?: VictoryStyleObject;
  labels?: VictoryStyleObject;
  low?: VictoryStyleObject;
  lowLabels?: VictoryStyleObject;
  open?: VictoryStyleObject;
  openLabels?: VictoryStyleObject;
  parent?: VictoryStyleObject;
}

export type VictoryCandlestickLabelsType = (string | number)[] | boolean | ((datum: any) => number);

export interface VictoryCandlestickProps
  extends VictoryCommonProps,
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
  origin?: OriginType;
  polar?: boolean;
  size?: number;
  style?: VictoryCandlestickStyleInterface;
  wickStrokeWidth?: number;
}

/**
 * VictoryCandlestick renders a dataset as a series of candlesticks.
 * VictoryCandlestick can be composed with VictoryChart to create candlestick charts.
 */

export class VictoryCandlestick extends React.Component<VictoryCandlestickProps, any> {}
