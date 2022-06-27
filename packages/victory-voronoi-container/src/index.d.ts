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
  withinBounds(props, point): any;
  getDatasets(props): any;
  findPoints(datasets, point): any;
  withinRadius(point, mousePosition, radius): any;
  getVoronoiPoints(props, mousePosition): any;
  getActiveMutations(props, point): any;
  getInactiveMutations(props, point): any;
  getParentMutation(activePoints, mousePosition, parentSVG, vIndex): any;
  onActivated(props, points): any;
  onDeactivated(props, points): any;
  onMouseLeave(evt, targetProps): any;
  onMouseMove(evt, targetProps): any;
};

export const voronoiContainerMixin: (base: Function) => Function;
