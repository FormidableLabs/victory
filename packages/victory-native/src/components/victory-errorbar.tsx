import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import {
  VictoryErrorBar as VictoryErrorBarBase,
  VictoryErrorBarProps,
} from "victory-errorbar/es";
import { VictoryContainer } from "./victory-container";
import { ErrorBar } from "./victory-primitives/error-bar";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryErrorBar = wrapCoreComponent<VictoryErrorBarProps>({
  Component: VictoryErrorBarBase,
  defaultProps: {
    ...VictoryErrorBarBase.defaultProps,
    dataComponent: <ErrorBar />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
