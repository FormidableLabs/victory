import * as React from "react";
import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryDatableProps,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

type dataType = {
  x?: string | number;
  y?: string | number;
  errorX?: number | number[];
  errorY?: number | number[];
};

export interface VictoryErrorBarProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  borderWidth?: number;
  errorX?: number | number[];
  errorY?: number | number[];
  events?: EventPropTypeInterface<"data" | "labels" | "parent", StringOrNumberOrCallback>[];
  style?: VictoryStyleInterface;
}

export class VictoryErrorBar extends React.Component<VictoryErrorBarProps, any> {}
