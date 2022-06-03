import React from "react";
import { VictoryPrimitiveShapeProps } from "./types";

export const Circle = (props: VictoryPrimitiveShapeProps) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    // @ts-expect-error FIXME: "id cannot be a number"
    <circle vectorEffect="non-scaling-stroke" {...rest}>
      <desc>{desc}</desc>
    </circle>
  ) : (
    // @ts-expect-error FIXME: "id cannot be a number"
    <circle vectorEffect="non-scaling-stroke" {...rest} />
  );
};
