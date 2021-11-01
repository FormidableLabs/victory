import React from "react";
import Path from "./path";
import { Arc } from "victory-core/es";

const NativeArc = (props) => <Arc pathComponent={<Path />} {...props} />;

export default NativeArc;
