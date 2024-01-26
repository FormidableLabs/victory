import React from "react";
import { Path } from "./path";
import { G } from "react-native-svg";
import { Area as AreaBase, AreaProps } from "victory-area/es";

export const Area = (props: AreaProps) => (
  <AreaBase pathComponent={<Path />} groupComponent={<G />} {...props} />
);
