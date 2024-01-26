import React from "react";
import { Path } from "./path";
import { Bar as BarBase, BarProps } from "victory-bar/es";

export const Bar = (props: BarProps) => (
  <BarBase pathComponent={<Path />} {...props} />
);
