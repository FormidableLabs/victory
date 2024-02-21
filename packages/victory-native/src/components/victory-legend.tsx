import React from "react";
import { G } from "react-native-svg";
import {
  VictoryLegend as VictoryLegendBase,
  VictoryLegendProps,
} from "victory-legend/es";
import { Dimensions } from "react-native";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { Point } from "./victory-primitives/point";
import { Border } from "./victory-primitives/border";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryLegend = wrapCoreComponent<VictoryLegendProps>({
  Component: VictoryLegendBase,
  defaultProps: {
    ...VictoryLegendBase.defaultProps,
    borderComponent: <Border />,
    containerComponent: <VictoryContainer />,
    dataComponent: <Point />,
    groupComponent: <G />,
    labelComponent: <VictoryLabel />,
    titleComponent: <VictoryLabel />,
    width: Dimensions.get("window").width,
  },
});
