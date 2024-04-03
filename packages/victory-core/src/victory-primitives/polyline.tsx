import React from "react";
import { VictoryPrimitiveShapeProps } from "./types";

export const PolyLine = (props: VictoryPrimitiveShapeProps) => {
  return (
    // @ts-expect-error FIXME: "id cannot be a number"
    <polyline vectorEffect="non-scaling-stroke" {...props} />
  );
};
