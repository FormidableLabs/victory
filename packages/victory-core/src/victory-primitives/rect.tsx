import React, { forwardRef } from "react";

import { evaluatePrimitiveProps } from "../victory-util/helpers";
import { VictoryPrimitiveShapeProps } from "./types";

export const Rect = forwardRef<SVGRectElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    const { desc, ...resolvedProps } = evaluatePrimitiveProps(props);

    const svgProps: React.SVGProps<SVGRectElement> = {
      vectorEffect: "non-scaling-stroke",
      ...resolvedProps,
    };

    return desc ? (
      <rect {...svgProps} ref={ref}>
        <desc>{desc}</desc>
      </rect>
    ) : (
      <rect {...svgProps} ref={ref} />
    );
  },
);
