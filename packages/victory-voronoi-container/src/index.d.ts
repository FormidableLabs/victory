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
  voronoiBlacklist?: (string | RegExp)[];
  voronoiDimension?: "x" | "y";
  voronoiPadding?: PaddingProps;
}

export class VictoryVoronoiContainer extends React.Component<
  VictoryVoronoiContainerProps,
  any
> {}

export const VoronoiHelpers: {
  withinBounds(props: any, point: any): any;
  getDatasets(props: any): any;
  findPoints(datasets: any, point: any): any;
  withinRadius(point: any, mousePosition: any, radius: any): any;
  getVoronoiPoints(props: any, mousePosition: any): any;
  getActiveMutations(props: any, point: any): any;
  getInactiveMutations(props: any, point: any): any;
  getParentMutation(
    activePoints: any,
    mousePosition: any,
    parentSVG: any,
    vIndex: any,
  ): any;
  onActivated(props: any, points: any): any;
  onDeactivated(props: any, points: any): any;
  onMouseLeave(evt: any, targetProps: any): any;
  onMouseMove(evt: any, targetProps: any): any;
};

export const voronoiContainerMixin: (base: Function) => Function;
