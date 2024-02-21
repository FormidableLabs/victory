import React from "react";
import { Dimensions } from "react-native";
import {
  VictoryArea as VictoryAreaBase,
  VictoryAreaProps,
} from "victory-area/es";

import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { VictoryClipContainer } from "./victory-clip-container";
import { Area } from "./victory-primitives/area";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryArea = wrapCoreComponent<VictoryAreaProps>({
  Component: VictoryAreaBase,
  defaultProps: {
    ...VictoryAreaBase.defaultProps,
    dataComponent: <Area />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <VictoryClipContainer />,
    width: Dimensions.get("window").width,
  },
});
