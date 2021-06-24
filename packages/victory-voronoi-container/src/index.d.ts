import * as React from "react";
import { PaddingProps, VictoryContainerProps } from "victory-core";

export interface VictoryVoronoiContainerProps extends VictoryContainerProps {
  activateData?: boolean;
  activateLabels?: boolean;
  disable?: boolean;
  labels?: (point: any, index: number, points: any[]) => string;
  labelComponent?: React.ReactElement;
  mouseFollowTooltips?: boolean;
  onActivated?: (points: any[], props: VictoryVoronoiContainerProps) => void;
  onDeactivated?: (points: any[], props: VictoryVoronoiContainerProps) => void;
  radius?: number;
  voronoiBlacklist?: string[];
  voronoiDimension?: "x" | "y";
  voronoiPadding?: PaddingProps;
}

export class VictoryVoronoiContainer extends React.Component<
  VictoryVoronoiContainerProps,
  any
> {}
