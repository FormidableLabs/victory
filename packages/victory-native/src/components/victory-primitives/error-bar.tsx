import React from "react";
import { Line } from "./line";
import { G } from "react-native-svg";
import { ErrorBar as ErrorBarBase, ErrorBarProps } from "victory-errorbar/es";

export const ErrorBar = (props: ErrorBarProps) => (
  <ErrorBarBase lineComponent={<Line />} groupComponent={<G />} {...props} />
);
