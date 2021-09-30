import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryVoronoi } from "victory-voronoi/es";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Voronoi from "./victory-primitives/voronoi";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryVoronoi = wrapCoreComponent({
  Component: VictoryVoronoi,
  defaultProps: Object.assign({}, VictoryVoronoi.defaultProps, {
    dataComponent: <Voronoi />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width
  })
});

export default NativeVictoryVoronoi;
