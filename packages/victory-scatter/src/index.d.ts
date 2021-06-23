import * as React from "react";
import {
  EventPropTypeInterface,
  ScatterSymbolType,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryScatterTTargetType = "data" | "labels" | "parent";

export interface VictoryScatterProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  bubbleProperty?: string;
  events?: EventPropTypeInterface<
    VictoryScatterTTargetType,
    StringOrNumberOrCallback
  >[];
  eventKey?: StringOrNumberOrCallback;
  maxBubbleSize?: number;
  minBubbleSize?: number;
  size?: number | { (data: any): number };
  style?: VictoryStyleInterface;
  symbol?: ScatterSymbolType | { (data: any): ScatterSymbolType };
}

export class VictoryScatter extends React.Component<VictoryScatterProps, any> {}
