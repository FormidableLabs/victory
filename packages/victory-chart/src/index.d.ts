import * as React from "react";
import {
  CategoryPropType,
  EventPropTypeInterface,
  DomainPropType,
  DomainPaddingPropType,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryChartProps extends VictoryCommonProps {
  categories?: CategoryPropType;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  events?: EventPropTypeInterface<string, StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  style?: Pick<VictoryStyleInterface, "parent">;
}

export class VictoryChart extends React.Component<VictoryChartProps, any> {}
