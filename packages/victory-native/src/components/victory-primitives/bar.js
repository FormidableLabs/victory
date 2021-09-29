import React from "react";
import Path from "./path";
import { Bar } from "victory-bar/es";

const NativeBar = (props) => <Bar pathComponent={<Path/>} {...props} />;

export default NativeBar;
