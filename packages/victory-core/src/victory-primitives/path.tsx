import React from "react";
import { VictoryPrimitiveShapeProps } from "./types";

export const Path = (props: VictoryPrimitiveShapeProps) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    // @ts-expect-error FIXME: "id cannot be a number"
    <path {...rest}>
      <desc>{desc}</desc>
    </path>
  ) : (
    // @ts-expect-error FIXME: "id cannot be a number"
    <path {...rest} />
  );
};
