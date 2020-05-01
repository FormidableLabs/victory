import * as React from "react";
import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  StringOrNumberOrList,
  VictoryDatableProps,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryErrorBarTTargetType = "data" | "labels" | "parent";
export type ErrorType = StringOrNumberOrList | ((...args: any[]) => StringOrNumberOrList);

export interface VictoryErrorBarProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  borderWidth?: number;
  errorX?: ErrorType;
  errorY?: ErrorType;
  events?: EventPropTypeInterface<VictoryErrorBarTTargetType, StringOrNumberOrCallback>[];
  style?: VictoryStyleInterface;
}

export class VictoryErrorBar extends React.Component<VictoryErrorBarProps, any> {}
