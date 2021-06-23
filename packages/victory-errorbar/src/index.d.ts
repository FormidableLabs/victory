import * as React from "react";
import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  StringOrNumberOrList,
  VictoryDatableProps,
  VictoryCommonProps,
  VictoryCommonPrimitiveProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryErrorBarTTargetType = "data" | "labels" | "parent";
export type ErrorType =
  | StringOrNumberOrList
  | ((...args: any[]) => StringOrNumberOrList);

export interface VictoryErrorBarProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  borderWidth?: number;
  errorX?: ErrorType;
  errorY?: ErrorType;
  events?: EventPropTypeInterface<
    VictoryErrorBarTTargetType,
    StringOrNumberOrCallback
  >[];
  style?: VictoryStyleInterface;
}

export class VictoryErrorBar extends React.Component<
  VictoryErrorBarProps,
  any
> {}

export interface ErrorBarProps extends VictoryCommonPrimitiveProps {
  borderWidth?: number;
  datum?: any;
  errorX?: number | any[] | boolean;
  errorY?: number | any[] | boolean;
  groupComponent?: React.ReactElement;
  lineComponent?: React.ReactElement;
  x?: number;
  y?: number;
}

export class ErrorBar extends React.Component<ErrorBarProps, any> {}
