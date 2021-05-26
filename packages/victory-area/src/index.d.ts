import * as React from "react";
import {
  EventPropTypeInterface,
  InterpolationPropType,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryCommonPrimitiveProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryAreaTTargetType = "data" | "labels" | "parent";

export interface VictoryAreaProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  eventKey?: string[] | number[] | StringOrNumberOrCallback;
  events?: EventPropTypeInterface<VictoryAreaTTargetType, string | number>[];
  interpolation?: InterpolationPropType | Function;
  samples?: number;
  style?: VictoryStyleInterface;
}

/**
 * Draw area charts with React. VictoryArea is a composable component, so it doesn"t include axes.
 * Add VictoryArea as a child of VictoryChart for a complete chart.
 */
export class VictoryArea extends React.Component<VictoryAreaProps, any> {}

export interface AreaProps extends VictoryCommonPrimitiveProps {
  groupComponent?: React.ReactElement;
  interpolation?: string | Function;
  pathComponent?: React.ReactElement;
}

/**
 * The area primitive used by VictoryArea
 */
export class Area extends React.Component<AreaProps, any> {}
