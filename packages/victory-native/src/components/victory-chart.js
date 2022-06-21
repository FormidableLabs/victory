import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryChart } from "victory-chart/es";
import Background from "./victory-primitives/background";
import VictoryAxis from "./victory-axis";
import VictoryPolarAxis from "./victory-polar-axis";
import VictoryContainer from "./victory-container";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryChart = wrapCoreComponent({
  Component: VictoryChart,
  defaultProps: Object.assign({}, VictoryChart.defaultProps, {
    backgroundComponent: <Background />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    defaultAxes: {
      independent: <VictoryAxis />,
      dependent: <VictoryAxis dependentAxis />,
    },
    defaultPolarAxes: {
      independent: <VictoryPolarAxis />,
      dependent: <VictoryPolarAxis dependentAxis />,
    },
    prependDefaultAxes: true,
    width: Dimensions.get("window").width,
  }),
});

export default NativeVictoryChart;
