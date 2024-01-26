import React from "react";
import { Path } from "./path";
import { Curve as CurveBase, CurveProps } from "victory-line/es";

export const Curve = (props: CurveProps) => (
  <CurveBase pathComponent={<Path />} {...props} />
);
