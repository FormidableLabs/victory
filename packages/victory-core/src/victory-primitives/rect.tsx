import React, { forwardRef } from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryPrimitiveShapeProps } from "./types";

export const Rect = forwardRef<SVGRectElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars --
     * origin conflicts with the SVG element's origin attribute
     */
    const { desc, id, tabIndex, origin, ...rest } = props;

    const svgProps: React.SVGProps<SVGRectElement> = {
      vectorEffect: "non-scaling-stroke",
      id: evaluateProp(id, props)?.toString(),
      tabIndex: evaluateProp(tabIndex, props),
      ...rest,
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
