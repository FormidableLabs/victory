import React from "react";
import Line from "./line";
import { G } from "react-native-svg";
import { Whisker, WhiskerProps } from "victory-core/es";

const NativeWhisker = (props: WhiskerProps) => (
  <Whisker lineComponent={<Line />} groupComponent={<G />} {...props} />
);

export default NativeWhisker;
