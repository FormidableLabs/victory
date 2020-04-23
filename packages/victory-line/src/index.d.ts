import * as React from "react";
import {
  EventPropTypeInterface,
  InterpolationPropType,
  VictoryCommonProps,
  VictoryCommonPrimitiveProps,
  VictoryDatableProps,
  VictorySingleLabableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryLineProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictorySingleLabableProps {
  events?: EventPropTypeInterface<"data" | "labels" | "parent", number | string>[];
  interpolation?: InterpolationPropType;
  samples?: number;
  labels?: string[] | number[] | Function;
  sortKey?: string | string[] | Function;
  style?: VictoryStyleInterface;
}

export interface VictoryCurveProps extends VictoryCommonPrimitiveProps {
  interpolation?: string | Function;
  openCurve?: boolean;
  pathComponent?: React.ReactElement;
}

export class Curve extends React.Component<VictoryCurveProps> {}

export class VictoryLine extends React.Component<VictoryLineProps, any> {}
