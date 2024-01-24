import React from "react";
import Path from "./path";
import { Curve, CurveProps } from "victory-line/es";

const NativeCurve = (props: CurveProps) => (
  <Curve pathComponent={<Path />} {...props} />
);

export default NativeCurve;
