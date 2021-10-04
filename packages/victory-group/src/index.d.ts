import * as React from "react";
import {
  CategoryPropType,
  ColorScalePropType,
  DomainPropType,
  DomainPaddingPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryGroupTTargetType = "data" | "labels" | "parent";

export interface VictoryGroupProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  categories?: CategoryPropType;
  children?: React.ReactNode;
  color?: string;
  colorScale?: ColorScalePropType;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  events?: EventPropTypeInterface<
    VictoryGroupTTargetType,
    StringOrNumberOrCallback
  >[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  offset?: number;
  style?: VictoryStyleInterface;
}

export class VictoryGroup extends React.Component<VictoryGroupProps, any> {}
