import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import {
  VictoryPolarAxis as VictoryPolarAxisBase,
  VictoryPolarAxisProps,
} from "victory-polar-axis/es";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { Arc } from "./victory-primitives/arc";
import { LineSegment } from "./victory-primitives/line-segment";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryPolarAxis = wrapCoreComponent<VictoryPolarAxisProps>({
  Component: VictoryPolarAxisBase,
  defaultProps: {
    ...VictoryPolarAxisBase.defaultProps,
    axisComponent: <LineSegment />,
    axisLabelComponent: <VictoryLabel />,
    circularAxisComponent: <Arc type="axis" />,
    circularGridComponent: <Arc type="grid" />,
    tickLabelComponent: <VictoryLabel />,
    tickComponent: <LineSegment />,
    gridComponent: <LineSegment />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
