import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import {
  VictoryScatter as VictoryScatterBase,
  VictoryScatterProps,
} from "victory-scatter/es";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { Point } from "./victory-primitives/point";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryScatter = wrapCoreComponent<VictoryScatterProps>({
  Component: VictoryScatterBase,
  defaultProps: {
    ...VictoryScatterBase.defaultProps,
    dataComponent: <Point />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
