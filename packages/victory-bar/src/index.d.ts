import * as React from "react";
import {
  EventPropTypeInterface,
  NumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryBarProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {
  alignment?: "start" | "middle" | "end";
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
  events?: EventPropTypeInterface<"data" | "labels" | "parent", number | string>[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  style?: VictoryStyleInterface;
}

/**
 * Draw SVG bar charts with React. VictoryBar is a composable component, so it doesn"t include axes
 * Check out VictoryChart for complete bar charts and more.
 */
export class VictoryBar extends React.Component<VictoryBarProps, any> {}
