import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryStack } from "victory-stack/es";
import VictoryContainer from "./victory-container";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryStack = wrapCoreComponent({
  Component: VictoryStack,
  defaultProps: Object.assign({}, VictoryStack.defaultProps, {
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  }),
});

export default NativeVictoryStack;
