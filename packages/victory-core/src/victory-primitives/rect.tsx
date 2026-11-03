import React, { forwardRef } from "react";
import { evaluateProp } from "../victory-util/helpers";
import { getSvgProps } from "./svg-props";
import { VictoryPrimitiveShapeProps } from "./types";

export const Rect = forwardRef<SVGRectElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    const { desc, id, tabIndex, ...rest } = props;

    const svgProps: React.SVGProps<SVGRectElement> = {
      vectorEffect: "non-scaling-stroke",
      id: evaluateProp(id, props)?.toString(),
      tabIndex: evaluateProp(tabIndex, props),
      ...getSvgProps(rest),
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
