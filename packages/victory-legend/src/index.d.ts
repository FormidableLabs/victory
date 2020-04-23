import * as React from "react";
import {
  BlockProps,
  ColorScalePropType,
  EventPropTypeInterface,
  OrientationTypes,
  PaddingProps,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictorySingleLabableProps,
  VictoryStyleInterface,
  VictoryStyleObject
} from "victory-core";

export interface VictoryLegendProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictorySingleLabableProps {
  borderComponent?: React.ReactElement;
  borderPadding?: PaddingProps;
  centerTitle?: boolean;
  colorScale?: ColorScalePropType;
  data?: Array<{
    name?: string;
    symbol?: {
      fill?: string;
      type?: string;
    };
  }>;
  dataComponent?: React.ReactElement;
  eventKey?: StringOrNumberOrCallback | string[];
  events?: EventPropTypeInterface<"data" | "labels" | "parent", StringOrNumberOrCallback>[];
  gutter?: number | { left: number; right: number };
  itemsPerRow?: number;
  labelComponent?: React.ReactElement;
  orientation?: "horizontal" | "vertical";
  rowGutter?: number | Omit<BlockProps, "left" | "right">;
  style?: VictoryStyleInterface & { title?: VictoryStyleObject };
  symbolSpacer?: number;
  title?: string | string[];
  titleComponent?: React.ReactElement;
  titleOrientation?: OrientationTypes;
  x?: number;
  y?: number;
}

export class VictoryLegend extends React.Component<VictoryLegendProps, any> {}
