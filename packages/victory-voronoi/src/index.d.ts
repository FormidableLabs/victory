import * as React from "react";
import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryCommonPrimitiveProps,
  VictoryDatableProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryVoronoiSortOrderType = "ascending" | "descending";

export interface VictoryVoronoiProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  events?: EventPropTypeInterface<
    string,
    string | number | (string | number)[]
  >[];
  type?: number;
  sortKey?: StringOrNumberOrCallback | string[];
  sortOrder?: VictoryVoronoiSortOrderType;
  size?: number | { (data: any): number };
  style?: VictoryStyleInterface;
}

export interface VoronoiProps extends VictoryCommonPrimitiveProps {
  circleComponent?: React.ReactElement;
  clipId?: number | string;
  clipPathComponent?: React.ReactElement;
  datum?: any;
  groupComponent?: React.ReactElement;
  pathComponent?: React.ReactElement;
  polygon?: [];
  size?: number;
  x?: number;
  y?: number;
}

export class VictoryVoronoi extends React.Component<VictoryVoronoiProps, any> {}

export class Voronoi extends React.Component<VoronoiProps, any> {}
