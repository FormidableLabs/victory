import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import {
  VictoryAxis as VictoryAxisBase,
  VictoryAxisProps,
} from "victory-axis/es";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { LineSegment } from "./victory-primitives/line-segment";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryAxis = wrapCoreComponent<VictoryAxisProps>({
  Component: VictoryAxisBase,
  defaultProps: {
    ...VictoryAxisBase.defaultProps,
    axisComponent: <LineSegment />,
    axisLabelComponent: <VictoryLabel />,
    tickLabelComponent: <VictoryLabel />,
    tickComponent: <LineSegment />,
    gridComponent: <LineSegment />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
