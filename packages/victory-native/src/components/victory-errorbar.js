import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryErrorBar } from "victory-errorbar/es";
import VictoryContainer from "./victory-container";
import ErrorBar from "./victory-primitives/error-bar";

export default class extends VictoryErrorBar {
  static defaultProps = Object.assign({}, VictoryErrorBar.defaultProps, {
    dataComponent: <ErrorBar/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <G/>,
    width: Dimensions.get("window").width
  });
}
