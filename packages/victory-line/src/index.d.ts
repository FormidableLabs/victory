import * as React from "react";
import {
  EventPropTypeInterface,
  InterpolationPropType,
  StringOrNumberOrCallback,
  StringOrCallback,
  NumberOrCallback,
  VictoryCommonProps,
  VictoryCommonPrimitiveProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryLineTTargetType = "data" | "labels" | "parent";

export interface VictoryLineProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  events?: EventPropTypeInterface<VictoryLineTTargetType, number | string>[];
  eventKey?: StringOrNumberOrCallback | string[];
  interpolation?: InterpolationPropType | Function;
  samples?: number;
  sortKey?: string | string[] | Function;
  style?: VictoryStyleInterface;
}

export interface CurveProps extends VictoryCommonPrimitiveProps {
  ariaLabel?: StringOrCallback;
  interpolation?: string | Function;
  openCurve?: boolean;
  pathComponent?: React.ReactElement;
  tabIndex?: NumberOrCallback;
}

export class Curve extends React.Component<CurveProps> {}

export class VictoryLine extends React.Component<VictoryLineProps, any> {}
