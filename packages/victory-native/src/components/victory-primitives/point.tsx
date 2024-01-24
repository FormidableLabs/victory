import React from "react";
import Path from "./path";
import { Point, PointProps } from "victory-core/es";

const NativePoint = (props: PointProps) => (
  <Point pathComponent={<Path />} {...props} />
);

export default NativePoint;
