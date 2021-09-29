import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryGroup as VictoryGroupCore } from "victory-group/es";
import VictoryContainer from "./victory-container";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const VictoryGroup = wrapCoreComponent({
  Component: VictoryGroupCore,
  defaultProps: Object.assign({}, VictoryGroupCore.defaultProps, {
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width
  }),
  name: "VictoryGroup"
});

export default VictoryGroup;
