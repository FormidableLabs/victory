import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryScatter } from "victory-scatter/es";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Point from "./victory-primitives/point";

export default class extends VictoryScatter {
  static defaultProps = Object.assign({}, VictoryScatter.defaultProps, {
    dataComponent: <Point/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <G/>,
    width: Dimensions.get("window").width
  });
}
