import React from "react";
import { VictoryPrimitiveShapeProps } from "./types";

export const Line = (props: VictoryPrimitiveShapeProps) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    // @ts-expect-error FIXME: "id cannot be a number"
    <line vectorEffect="non-scaling-stroke" {...rest}>
      <desc>{desc}</desc>
    </line>
  ) : (
    // @ts-expect-error FIXME: "id cannot be a number"
    <line vectorEffect="non-scaling-stroke" {...rest} />
  );
};
