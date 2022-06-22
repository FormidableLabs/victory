import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryPolarAxis } from "victory-polar-axis/es";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Arc from "./victory-primitives/arc";
import LineSegment from "./victory-primitives/line-segment";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryPolarAxis = wrapCoreComponent({
  Component: VictoryPolarAxis,
  defaultProps: Object.assign({}, VictoryPolarAxis.defaultProps, {
    axisComponent: <LineSegment />,
    axisLabelComponent: <VictoryLabel />,
    circularAxisComponent: <Arc type={"axis"} />,
    circularGridComponent: <Arc type={"grid"} />,
    tickLabelComponent: <VictoryLabel />,
    tickComponent: <LineSegment />,
    gridComponent: <LineSegment />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  }),
});

export default NativeVictoryPolarAxis;
