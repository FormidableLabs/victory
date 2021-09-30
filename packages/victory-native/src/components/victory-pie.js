import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryPie } from "victory-pie/es";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Slice from "./victory-primitives/slice";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryPie = wrapCoreComponent({
  Component: VictoryPie,
  defaultProps: Object.assign({}, VictoryPie.defaultProps, {
    dataComponent: <Slice />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width
  })
});

export default NativeVictoryPie;
