import React from "react";

import {
  EventPropTypeInterface,
  LabelOrientationType,
  VictoryAxisCommonProps,
  VictoryCommonProps,
  VictorySingleLabelableProps,
} from "victory-core";

export type VictoryPolarAxisTTargetType =
  | "axis"
  | "axisLabel"
  | "grid"
  | "ticks"
  | "tickLabels";

export interface VictoryPolarAxisProps
  extends VictoryAxisCommonProps,
    VictoryCommonProps,
    VictorySingleLabelableProps {
  axisAngle?: number;
  circularAxisComponent?: React.ReactElement;
  circularGridComponent?: React.ReactElement;
  endAngle?: number;
  events?: EventPropTypeInterface<
    VictoryPolarAxisTTargetType,
    string | number
  >[];
  innerRadius?: number;
  labelOrientation?: LabelOrientationType;
  labelPlacement?: LabelOrientationType;
  startAngle?: number;
}
