import * as React from "react";
import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryStyleInterface
} from "victory-core";

type dataType = {
  x?: string | number;
  y?: string | number;
  errorX?: number | number[];
  errorY?: number | number[];
};

export interface VictoryErrorBarProps extends VictoryCommonProps {
  borderWidth?: number;
  data?: dataType | dataType[];
  errorX?: number | number[];
  errorY?: number | number[];
  events?: EventPropTypeInterface<"data" | "labels" | "parent", StringOrNumberOrCallback>[];
  style?: VictoryStyleInterface;
}

export class VictoryErrorBar extends React.Component<VictoryErrorBarProps, any> {}
