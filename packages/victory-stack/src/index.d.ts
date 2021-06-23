import * as React from "react";
import {
  CategoryPropType,
  ColorScalePropType,
  DomainPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryStackTTargetType = "data" | "labels" | "parent";

export interface VictoryStackProps
  extends VictoryCommonProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  bins?: number | number[] | Date[];
  categories?: CategoryPropType;
  children?: React.ReactNode | React.ReactNode[];
  colorScale?: ColorScalePropType;
  domain?: DomainPropType;
  events?: EventPropTypeInterface<
    VictoryStackTTargetType,
    StringOrNumberOrCallback
  >[];
  eventKey?: StringOrNumberOrCallback;
  fillInMissingData?: boolean;
  style?: VictoryStyleInterface;
  xOffset?: number;
}

export class VictoryStack extends React.Component<VictoryStackProps, any> {}
