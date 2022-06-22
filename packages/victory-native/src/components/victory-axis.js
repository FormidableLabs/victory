import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryAxis } from "victory-axis/es";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import LineSegment from "./victory-primitives/line-segment";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryAxis = wrapCoreComponent({
  Component: VictoryAxis,
  defaultProps: Object.assign({}, VictoryAxis.defaultProps, {
    axisComponent: <LineSegment />,
    axisLabelComponent: <VictoryLabel />,
    tickLabelComponent: <VictoryLabel />,
    tickComponent: <LineSegment />,
    gridComponent: <LineSegment />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  }),
});

export default NativeVictoryAxis;
