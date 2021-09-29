import React from "react";
import Line from "./line";
import { G } from "react-native-svg";
import { ErrorBar } from "victory-errorbar/es";

const NativeErrorBar = (props) => (
  <ErrorBar lineComponent={<Line/>} groupComponent={<G/>} {...props} />
);

export default NativeErrorBar;
