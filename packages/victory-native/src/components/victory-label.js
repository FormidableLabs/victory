import React from "react";
import { VictoryLabel } from "victory-core/es";
import { G } from "react-native-svg";
import Text from "./victory-primitives/text";
import TSpan from "./victory-primitives/tspan";
import Rect from "./victory-primitives/rect";

const NativeVictoryLabel = (props) => (
  <VictoryLabel
    textComponent={<Text />}
    tspanComponent={<TSpan />}
    backgroundComponent={<Rect />}
    groupComponent={<G />}
    {...props}
  />
);

NativeVictoryLabel.role = VictoryLabel.role;

export default NativeVictoryLabel;
