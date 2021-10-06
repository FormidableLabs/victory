import React from "react";
import Path from "./path";
import { Slice } from "victory-pie/es";

const NativeSlice = (props) => <Slice pathComponent={<Path />} {...props} />;

export default NativeSlice;
