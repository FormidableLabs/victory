import React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/types";

// @ts-expect-error FIXME: "id cannot be a number"
export const TSpan = (props: VictoryCommonPrimitiveProps) => (
  <tspan {...props} />
);
