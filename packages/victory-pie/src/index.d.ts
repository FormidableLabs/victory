import * as React from "react";
import {
  CategoryPropType,
  ColorScalePropType,
  DataGetterPropType,
  EventPropTypeInterface,
  StringOrCallback,
  NumberOrCallback,
  OriginType,
  SliceNumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
} from "victory-core";

export type VictorySliceLabelPositionType =
  | "startAngle"
  | "centroid"
  | "endAngle";
export type VictorySliceLabelPlacementType =
  | "vertical"
  | "parallel"
  | "perpendicular";
export type VictorySliceTTargetType = "data" | "labels" | "parent";

export interface SliceProps extends VictoryCommonProps {
  ariaLabel?: StringOrCallback;
  cornerRadius?: SliceNumberOrCallback<SliceProps, "cornerRadius">;
  datum?: any;
  innerRadius?: NumberOrCallback;
  padAngle?: SliceNumberOrCallback<SliceProps, "padAngle">;
  pathComponent?: React.ReactElement;
  pathFunction?: (props: SliceProps) => string;
  radius?: SliceNumberOrCallback<SliceProps, "radius">;
  slice?: {
    startAngle?: number;
    endAngle?: number;
    padAngle?: number;
    data?: any[];
  };
  sliceEndAngle?: SliceNumberOrCallback<SliceProps, "sliceEndAngle">;
  sliceStartAngle?: SliceNumberOrCallback<SliceProps, "sliceStartAngle">;
  style?: VictoryStyleInterface;
  tabIndex?: NumberOrCallback;
}

export class Slice extends React.Component<SliceProps, any> {}

export interface VictoryPieProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  categories?: CategoryPropType;
  colorScale?: ColorScalePropType;
  cornerRadius?: SliceNumberOrCallback<SliceProps, "cornerRadius">;
  data?: any[];
  dataComponent?: React.ReactElement;
  endAngle?: number;
  events?: EventPropTypeInterface<
    VictorySliceTTargetType,
    StringOrNumberOrCallback | string[] | number[]
  >[];
  eventKey?: StringOrNumberOrCallback;
  innerRadius?: NumberOrCallback;
  labelPlacement?:
    | VictorySliceLabelPlacementType
    | ((props: SliceProps) => VictorySliceLabelPlacementType);
  labelPosition?:
    | VictorySliceLabelPositionType
    | ((props: SliceProps) => VictorySliceLabelPositionType);
  labelRadius?: number | ((props: SliceProps) => number);
  origin?: OriginType;
  padAngle?: NumberOrCallback;
  radius?: NumberOrCallback;
  startAngle?: number;
  style?: VictoryStyleInterface;
  x?: DataGetterPropType;
  y?: DataGetterPropType;
}

export class VictoryPie extends React.Component<VictoryPieProps, any> {}
