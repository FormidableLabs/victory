import React, { forwardRef } from "react";
import { evaluateProp } from "../victory-util/helpers";
import { getSvgProps } from "./svg-props";
import { VictoryPrimitiveShapeProps } from "./types";

export const Circle = forwardRef<SVGCircleElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    const { desc, id, tabIndex, ...rest } = props;

    const svgProps: React.SVGProps<SVGCircleElement> = {
      vectorEffect: "non-scaling-stroke",
      id: evaluateProp(id, props)?.toString(),
      tabIndex: evaluateProp(tabIndex, props),
      ...getSvgProps(rest),
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
