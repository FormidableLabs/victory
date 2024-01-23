import {
  DomainPropType,
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
  axisValue?: number | string | Date;
  circularAxisComponent?: React.ReactElement;
  circularGridComponent?: React.ReactElement;
  domain?: DomainPropType;
  endAngle?: number;
  events?: EventPropTypeInterface<
    VictoryPolarAxisTTargetType,
    string | number
  >[];
  gridComponent?: React.ReactElement;
  innerRadius?: number;
  labelOrientation?: LabelOrientationType;
  labelPlacement?: LabelOrientationType;
  startAngle?: number;
}
