import React, { forwardRef } from "react";

import { evaluatePrimitiveProps } from "../victory-util/helpers";
import { VictoryPrimitiveShapeProps } from "./types";

export const Circle = forwardRef<SVGCircleElement, VictoryPrimitiveShapeProps>(
  (userProps, ref) => {
    const { desc, ...props } = evaluatePrimitiveProps(userProps);

    const svgProps: React.SVGProps<SVGCircleElement> = {
      vectorEffect: "non-scaling-stroke",
      ...props,
    };

    return desc ? (
      <circle {...svgProps} ref={ref}>
        <desc>{desc}</desc>
      </circle>
    ) : (
      <circle {...svgProps} ref={ref} />
    );
  },
);
