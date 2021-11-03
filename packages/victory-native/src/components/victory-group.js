import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryGroup } from "victory-group/es";
import VictoryContainer from "./victory-container";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryGroup = wrapCoreComponent({
  Component: VictoryGroup,
  defaultProps: Object.assign({}, VictoryGroup.defaultProps, {
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width
  })
});

export default NativeVictoryGroup;
