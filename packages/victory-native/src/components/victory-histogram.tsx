import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { Bar } from "./victory-primitives/bar";
import {
  VictoryHistogram as VictoryHistogramBase,
  VictoryHistogramProps,
} from "victory-histogram/es";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryHistogram = wrapCoreComponent<VictoryHistogramProps>({
  Component: VictoryHistogramBase,
  defaultProps: {
    ...VictoryHistogramBase.defaultProps,
    dataComponent: <Bar />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
