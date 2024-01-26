import React from "react";
import { Path } from "./path";
import { Slice as SliceBase, SliceProps } from "victory-pie/es";

export const Slice = (props: SliceProps) => (
  <SliceBase pathComponent={<Path />} {...props} />
);
