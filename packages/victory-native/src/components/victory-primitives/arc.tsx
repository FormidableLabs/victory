import React from "react";
import { Path } from "./path";
import { Arc as ArcBase, ArcProps } from "victory-core";

export const Arc = (props: ArcProps) => (
  <ArcBase pathComponent={<Path />} {...props} />
);
