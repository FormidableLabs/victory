import React from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export const TSpan = (props: VictoryCommonPrimitiveProps) => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars --
   * origin conflicts with the SVG element's origin attribute
   */
  const { desc, id, tabIndex, origin, ...rest } = props;

  const svgProps: React.SVGProps<SVGTSpanElement> = {
    id: evaluateProp(id, props)?.toString(),
    tabIndex: evaluateProp(tabIndex, props),
    ...rest,
  };

  return <tspan {...svgProps} />;
};
