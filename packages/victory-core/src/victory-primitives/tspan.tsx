import React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export const TSpan = (props: VictoryCommonPrimitiveProps) => (
  // @ts-expect-error FIXME: "id cannot be a number"
  <tspan {...props} />
);
