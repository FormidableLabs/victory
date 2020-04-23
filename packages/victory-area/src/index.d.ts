import * as React from "react";
import {
  EventPropTypeInterface,
  InterpolationPropType,
  VictoryCommonProps,
  VictoryDatableProps,
  VictorySingleLabableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryAreaProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictorySingleLabableProps {
  events?: EventPropTypeInterface<"data" | "labels" | "parent", string | number>[];
  interpolation?: InterpolationPropType;
  labels?: string[] | number[] | Function;
  samples?: number;
  style?: VictoryStyleInterface;
}

/**
 * Draw area charts with React. VictoryArea is a composable component, so it doesn"t include axes.
 * Add VictoryArea as a child of VictoryChart for a complete chart.
 */
export class VictoryArea extends React.Component<VictoryAreaProps, any> {}
