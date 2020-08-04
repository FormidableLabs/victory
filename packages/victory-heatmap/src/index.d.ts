import * as React from "react";
import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryHeatmapTargetType = "data" | "labels" | "parent";

export interface VictoryHeatmapProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  events?: EventPropTypeInterface<
    VictoryHeatmapTargetType,
    number | string | number[] | string[]
  >[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  style?: VictoryStyleInterface;
}

/**
 * Draw SVG histogram charts with React. VictoryHistogram is a composable component, so it doesn't include axes
 * Check out VictoryChart for complete histogram charts and more.
 */
export class VictoryHeatmap extends React.Component<VictoryHeatmapProps, any> {}
