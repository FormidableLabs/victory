import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import {
  VictoryGroup as VictoryGroupBase,
  VictoryGroupProps,
} from "victory-group/es";
import { VictoryContainer } from "./victory-container";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryGroup = wrapCoreComponent<VictoryGroupProps>({
  Component: VictoryGroupBase,
  defaultProps: {
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
