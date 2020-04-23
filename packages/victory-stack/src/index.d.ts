import * as React from "react";
import {
  CategoryPropType,
  ColorScalePropType,
  DomainPaddingPropType,
  DomainPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryStackProps extends VictoryCommonProps, VictoryMultiLabelableProps {
  categories?: CategoryPropType;
  colorScale?: ColorScalePropType;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  events?: EventPropTypeInterface<"data" | "labels" | "parent", StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  style?: VictoryStyleInterface;
  xOffset?: number;
}

export class VictoryStack extends React.Component<VictoryStackProps, any> {}
