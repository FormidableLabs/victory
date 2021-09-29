import React from "react";
import { Dimensions } from "react-native";
import { VictoryLine } from "victory-line/es";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import VictoryClipContainer from "./victory-clip-container";
import Curve from "./victory-primitives/curve";

export default class extends VictoryLine {
  static defaultProps = Object.assign({}, VictoryLine.defaultProps, {
    dataComponent: <Curve/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryClipContainer/>,
    width: Dimensions.get("window").width
  });
}
