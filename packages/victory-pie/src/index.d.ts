import * as React from "react";
import {
  ColorScalePropType,
  DataGetterPropType,
  EventPropTypeInterface,
  SliceNumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryMultiLabeableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictorySliceProps extends VictoryCommonProps {
  cornerRadius?: SliceNumberOrCallback<VictorySliceProps, "cornerRadius">;
  datum?: any;
  innerRadius?:
    | number
    | ((
        props: {
          active?: boolean;
          datum?: any;
        }
      ) => number);
  padAngle?: SliceNumberOrCallback<VictorySliceProps, "padAngle">;
  pathComponent?: React.ReactElement;
  pathFunction?: (props: VictorySliceProps) => string;
  radius?: SliceNumberOrCallback<VictorySliceProps, "radius">;
  slice: {
    startAngle?: number;
    endAngle?: number;
    padAngle?: number;
    data?: any[];
  };
  sliceEndAngle?: SliceNumberOrCallback<VictorySliceProps, "sliceEndAngle">;
  sliceStartAngle?: SliceNumberOrCallback<VictorySliceProps, "sliceStartAngle">;
}

export interface VictoryPieProps extends VictoryCommonProps, VictoryMultiLabeableProps {
  colorScale?: ColorScalePropType;
  data?: any[];
  dataComponent?: React.ReactElement;
  labelPosition?: "startAngle" | "centroid" | "endAngle" | ((props: VictorySliceProps) => string);
  labelRadius?: number | ((props: VictorySliceProps) => number);
  endAngle?: number;
  events?: EventPropTypeInterface<
    "data" | "labels" | "parent",
    StringOrNumberOrCallback | string[] | number[]
  >[];
  eventKey?: StringOrNumberOrCallback;
  radius?: number | ((props: VictorySliceProps) => number);
  innerRadius?: number | ((props: VictorySliceProps) => number);
  cornerRadius?: number;
  padAngle?: number;
  startAngle?: number;
  style?: VictoryStyleInterface;
  x?: DataGetterPropType;
  y?: DataGetterPropType;
}

export class VictoryPie extends React.Component<VictoryPieProps, any> {}
