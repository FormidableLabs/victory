import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import {
  VictoryVoronoi as VictoryVoronoiBase,
  VictoryVoronoiProps,
} from "victory-voronoi/es";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { Voronoi } from "./victory-primitives/voronoi";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryVoronoi = wrapCoreComponent<VictoryVoronoiProps>({
  Component: VictoryVoronoiBase,
  defaultProps: {
    ...VictoryVoronoiBase.defaultProps,
    dataComponent: <Voronoi />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
