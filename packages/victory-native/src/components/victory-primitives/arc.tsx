import React from "react";
import { Path } from "./path";
import { Arc as ArcBase, ArcProps } from "victory-core/es";

export const Arc = (props: ArcProps) => (
  <ArcBase pathComponent={<Path />} {...props} />
);
