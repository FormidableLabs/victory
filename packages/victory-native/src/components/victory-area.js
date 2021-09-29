import React from "react";
import { Dimensions } from "react-native";
import { VictoryArea } from "victory-area/es";

import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import VictoryClipContainer from "./victory-clip-container";
import Area from "./victory-primitives/area";

export default class extends VictoryArea {
  static defaultProps = Object.assign({}, VictoryArea.defaultProps, {
    dataComponent: <Area/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryClipContainer/>,
    width: Dimensions.get("window").width
  });
}
