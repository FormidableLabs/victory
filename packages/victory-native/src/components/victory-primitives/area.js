import React from "react";
import Path from "./path";
import { G } from "react-native-svg";
import { Area } from "victory-area/es";

const NativeArea = (props) => (
  <Area pathComponent={<Path />} groupComponent={<G />} {...props} />
);

export default NativeArea;
