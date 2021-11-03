import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Bar from "./victory-primitives/bar";
import { VictoryBar } from "victory-bar/es";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryBar = wrapCoreComponent({
  Component: VictoryBar,
  defaultProps: Object.assign({}, VictoryBar.defaultProps, {
    dataComponent: <Bar />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width
  })
});

export default NativeVictoryBar;
