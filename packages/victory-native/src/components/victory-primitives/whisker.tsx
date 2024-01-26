import React from "react";
import { Line } from "./line";
import { G } from "react-native-svg";
import { Whisker as WhiskerBase, WhiskerProps } from "victory-core/es";

export const Whisker = (props: WhiskerProps) => (
  <WhiskerBase lineComponent={<Line />} groupComponent={<G />} {...props} />
);
