import React from "react";
import Line from "./line";
import { G } from "react-native-svg";
import { ErrorBar, ErrorBarProps } from "victory-errorbar/es";

const NativeErrorBar = (props: ErrorBarProps) => (
  <ErrorBar lineComponent={<Line />} groupComponent={<G />} {...props} />
);

export default NativeErrorBar;
