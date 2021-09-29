import React from "react";
import Path from "./path";
import { Point } from "victory-core/es";

const NativePoint = (props) => <Point pathComponent={<Path/>} {...props} />;

export default NativePoint;
