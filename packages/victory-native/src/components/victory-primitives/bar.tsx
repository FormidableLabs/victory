import React from "react";
import { Path } from "./path";
import { Bar as BarBase, BarProps } from "victory-bar";

export const Bar = (props: BarProps) => (
  <BarBase pathComponent={<Path />} {...props} />
);
