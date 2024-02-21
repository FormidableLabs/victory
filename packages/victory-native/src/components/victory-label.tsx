import React from "react";
import {
  VictoryLabel as VictoryLabelBase,
  VictoryLabelProps,
} from "victory-core/es";
import { G } from "react-native-svg";
import { Text } from "./victory-primitives/text";
import { TSpan } from "./victory-primitives/tspan";
import { Rect } from "./victory-primitives/rect";

export const VictoryLabel = (props: VictoryLabelProps) => (
  <VictoryLabelBase
    textComponent={<Text />}
    tspanComponent={<TSpan />}
    backgroundComponent={<Rect />}
    groupComponent={<G />}
    {...props}
  />
);

VictoryLabel.role = VictoryLabelBase.role;
