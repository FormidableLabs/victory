import * as React from "react";
import {
  EventPropTypeInterface,
  NumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryBarTTargetType = "data" | "labels" | "parent";
export type VictoryBarAlignmentType = "start" | "middle" | "end";

export interface VictoryBarProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  alignment?: VictoryBarAlignmentType;
  barRatio?: number;
  barWidth?: NumberOrCallback;
  cornerRadius?:
    | NumberOrCallback
    | {
        top?: NumberOrCallback;
        topLeft?: NumberOrCallback;
        topRight?: NumberOrCallback;
        bottom?: NumberOrCallback;
        bottomLeft?: NumberOrCallback;
        bottomRight?: NumberOrCallback;
      };
  events?: EventPropTypeInterface<VictoryBarTTargetType, number | string | number[] | string[]>[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  polar?: boolean;
  style?: VictoryStyleInterface;
}

/**
 * Draw SVG bar charts with React. VictoryBar is a composable component, so it doesn"t include axes
 * Check out VictoryChart for complete bar charts and more.
 */
export class VictoryBar extends React.Component<VictoryBarProps, any> {}
