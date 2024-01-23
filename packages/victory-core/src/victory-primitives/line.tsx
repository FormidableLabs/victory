import React, { forwardRef } from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryPrimitiveShapeProps } from "./types";

export const Line = forwardRef<SVGLineElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars --
     * origin conflicts with the SVG element's origin attribute
     */
    const { desc, id, tabIndex, origin, ...rest } = props;

    const svgProps: React.SVGProps<SVGLineElement> = {
      vectorEffect: "non-scaling-stroke",
      id: evaluateProp(id, props)?.toString(),
      tabIndex: evaluateProp(tabIndex, props),
      ...rest,
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
