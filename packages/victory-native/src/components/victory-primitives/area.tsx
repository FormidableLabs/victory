import React from "react";
import Path from "./path";
import { G } from "react-native-svg";
import { Area, AreaProps } from "victory-area/es";

const NativeArea = (props: AreaProps) => (
  <Area pathComponent={<Path />} groupComponent={<G />} {...props} />
);

export default NativeArea;
