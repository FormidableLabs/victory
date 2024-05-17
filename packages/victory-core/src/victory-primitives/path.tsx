import React, { forwardRef } from "react";

import { evaluatePrimitiveProps } from "../victory-util/helpers";
import { VictoryPrimitiveShapeProps } from "./types";

export const Path = forwardRef<SVGPathElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    const { desc, ...resolvedProps } = evaluatePrimitiveProps(props);

    const svgProps: React.SVGProps<SVGPathElement> = {
      vectorEffect: "non-scaling-stroke",
      ...resolvedProps,
    };

    return desc ? (
      <path {...svgProps} ref={ref}>
        <desc>{desc}</desc>
      </path>
    ) : (
      <path {...svgProps} ref={ref} />
    );
  },
);
