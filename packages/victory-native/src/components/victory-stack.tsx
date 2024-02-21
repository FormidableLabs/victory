import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import {
  VictoryStack as VictoryStackBase,
  VictoryStackProps,
} from "victory-stack/es";
import { VictoryContainer } from "./victory-container";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryStack = wrapCoreComponent<VictoryStackProps>({
  Component: VictoryStackBase,
  defaultProps: {
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
