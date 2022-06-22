import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Bar from "./victory-primitives/bar";
import { VictoryHistogram } from "victory-histogram/es";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryHistogram = wrapCoreComponent({
  Component: VictoryHistogram,
  defaultProps: Object.assign({}, VictoryHistogram.defaultProps, {
    dataComponent: <Bar />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  }),
});

export default NativeVictoryHistogram;
