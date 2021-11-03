import React from "react";
import Path from "./path";
import { Curve } from "victory-line/es";

const NativeCurve = (props) => <Curve pathComponent={<Path />} {...props} />;

export default NativeCurve;
