import React, { forwardRef } from "react";
import { evaluateProp } from "../victory-util/helpers";
import { getSvgProps } from "./svg-props";
import { VictoryPrimitiveShapeProps } from "./types";

export const Path = forwardRef<SVGPathElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    const { desc, id, tabIndex, ...rest } = props;

    const svgProps: React.SVGProps<SVGPathElement> = {
      id: evaluateProp(id, props)?.toString(),
      tabIndex: evaluateProp(tabIndex, props),
      ...getSvgProps(rest),
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
