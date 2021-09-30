import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryErrorBar } from "victory-errorbar/es";
import VictoryContainer from "./victory-container";
import ErrorBar from "./victory-primitives/error-bar";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryErrorBar = wrapCoreComponent({
  Component: VictoryErrorBar,
  defaultProps: Object.assign({}, VictoryErrorBar.defaultProps, {
    dataComponent: <ErrorBar />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width
  })
});

export default NativeVictoryErrorBar;
