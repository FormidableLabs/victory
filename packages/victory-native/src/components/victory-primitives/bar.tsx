import React from "react";
import Path from "./path";
import { Bar, BarProps } from "victory-bar/es";

const NativeBar = (props: BarProps) => (
  <Bar pathComponent={<Path />} {...props} />
);

export default NativeBar;
