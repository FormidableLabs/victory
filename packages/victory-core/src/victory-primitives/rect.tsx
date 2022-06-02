import React from "react";
import { VictoryPrimitiveShapeProps } from "./types";

export const Rect = (props: VictoryPrimitiveShapeProps) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    // @ts-expect-error FIXME: "id cannot be a number"
    <rect vectorEffect="non-scaling-stroke" {...rest}>
      <desc>{desc}</desc>
    </rect>
  ) : (
    // @ts-expect-error FIXME: "id cannot be a number"
    <rect vectorEffect="non-scaling-stroke" {...rest} />
  );
};
