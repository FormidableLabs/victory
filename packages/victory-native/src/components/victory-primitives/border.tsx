import React from "react";
import { Rect } from "./rect";
import { Border as BorderBase, BorderProps } from "victory-core/es";

export const Border = (props: BorderProps) => (
  <BorderBase rectComponent={<Rect />} {...props} />
);

export const Box = Border;
