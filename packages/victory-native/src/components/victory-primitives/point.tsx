import React from "react";
import { Path } from "./path";
import { Point as PointBase, PointProps } from "victory-core/es";

export const Point = (props: PointProps) => (
  <PointBase pathComponent={<Path />} {...props} />
);
