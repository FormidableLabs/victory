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

export interface VictoryGroupProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  categories?: CategoryPropType;
  color?: string;
  colorScale?: ColorScalePropType;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  events?: EventPropTypeInterface<"data" | "labels" | "parent", StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  offset?: number;
  style?: VictoryStyleInterface;
}

export class VictoryGroup extends React.Component<VictoryGroupProps, any> {}
