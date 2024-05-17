import React, { forwardRef } from "react";

import { evaluatePrimitiveProps } from "../victory-util/helpers";
import { VictoryPrimitiveShapeProps } from "./types";

export const Line = forwardRef<SVGLineElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    const { desc, ...resolvedProps } = evaluatePrimitiveProps(props);

    const svgProps: React.SVGProps<SVGLineElement> = {
      vectorEffect: "non-scaling-stroke",
      ...resolvedProps,
    };

    return desc ? (
      <line {...svgProps} ref={ref}>
        <desc>{desc}</desc>
      </line>
    ) : (
      <line {...svgProps} ref={ref} />
    );
  },
);
