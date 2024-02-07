import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryPie as VictoryPieBase, VictoryPieProps } from "victory-pie/es";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { Slice } from "./victory-primitives/slice";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryPie = wrapCoreComponent<VictoryPieProps>({
  Component: VictoryPieBase,
  defaultProps: {
    ...VictoryPieBase.defaultProps,
    dataComponent: <Slice />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
  },
});
