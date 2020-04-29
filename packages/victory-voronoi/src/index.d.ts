import * as React from "react";
import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryVoronoiSortOrderType = "ascending" | "descending";

export interface VictoryVoronoiProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  events?: EventPropTypeInterface<string, string | number | (string | number)[]>[];
  type?: number;
  sortKey?: StringOrNumberOrCallback | string[];
  sortOrder?: VictoryVoronoiSortOrderType;
  size?: number | { (data: any): number };
  style?: VictoryStyleInterface;
}

export class VictoryVoronoi extends React.Component<VictoryVoronoiProps, any> {}
