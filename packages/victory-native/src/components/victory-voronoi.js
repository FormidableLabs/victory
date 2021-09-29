import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryVoronoi } from "victory-voronoi/es";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Voronoi from "./victory-primitives/voronoi";

export default class extends VictoryVoronoi {
  static defaultProps = Object.assign({}, VictoryVoronoi.defaultProps, {
    dataComponent: <Voronoi/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <G/>,
    width: Dimensions.get("window").width
  });
}
