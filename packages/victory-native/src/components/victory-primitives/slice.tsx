import React from "react";
import Path from "./path";
import { Slice, SliceProps } from "victory-pie/es";

const NativeSlice = (props: SliceProps) => (
  <Slice pathComponent={<Path />} {...props} />
);

export default NativeSlice;
