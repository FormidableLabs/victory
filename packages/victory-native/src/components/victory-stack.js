import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryStack as VictoryStackCore } from "victory-stack/es";
import VictoryContainer from "./victory-container";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const VictoryStack = wrapCoreComponent({
  Component: VictoryStackCore,
  defaultProps: Object.assign({}, VictoryStackCore.defaultProps, {
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width
  }),
  name: "VictoryStack"
});

export default VictoryStack;
