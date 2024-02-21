import React, { forwardRef } from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryPrimitiveShapeProps } from "./types";

export const Path = forwardRef<SVGPathElement, VictoryPrimitiveShapeProps>(
  (props, ref) => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars --
     * origin conflicts with the SVG element's origin attribute
     */
    const { desc, id, tabIndex, origin, ...rest } = props;

    const svgProps: React.SVGProps<SVGPathElement> = {
      id: evaluateProp(id, props)?.toString(),
      tabIndex: evaluateProp(tabIndex, props),
      ...rest,
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
