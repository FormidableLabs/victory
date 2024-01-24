import React from "react";
import Path from "./path";
import { Arc, ArcProps } from "victory-core/es";

const NativeArc = (props: ArcProps) => (
  <Arc pathComponent={<Path />} {...props} />
);

export default NativeArc;
