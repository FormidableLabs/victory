import React from "react";
import {
  VictoryVoronoiContainer,
  VictoryVoronoiContainerProps,
} from "victory-voronoi-container";

export const voronoiContainerMixin: (base: any) => VictoryVoronoiContainer;

export interface VictoryVoronoiContainerNativeProps
  extends VictoryVoronoiContainerProps {
  disableContainerEvents?: boolean;
  onTouchEnd?: Function;
  onTouchStart?: Function;
}

export default class extends React.Component<
  VictoryVoronoiContainerNativeProps,
  any
> {}
