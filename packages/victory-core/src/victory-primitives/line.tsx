import React, { forwardRef } from "react";
import { evaluateProp } from "../victory-util/helpers";
import { getSvgProps } from "./svg-props";
import { VictoryPrimitiveShapeProps } from "./types";

export const Line = forwardRef<SVGLineElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    const { desc, id, tabIndex, ...rest } = props;

    const svgProps: React.SVGProps<SVGLineElement> = {
      vectorEffect: "non-scaling-stroke",
      id: evaluateProp(id, props)?.toString(),
      tabIndex: evaluateProp(tabIndex, props),
      ...getSvgProps(rest),
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
