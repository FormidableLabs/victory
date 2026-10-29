import React from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
import { getSvgProps } from "./svg-props";

export const TSpan = (props: VictoryCommonPrimitiveProps) => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars --
   * a <tspan> can't contain a <desc>
   */
  const { desc, id, tabIndex, ...rest } = props;

  const svgProps: React.SVGProps<SVGTSpanElement> = {
    id: evaluateProp(id, props)?.toString(),
    tabIndex: evaluateProp(tabIndex, props),
    ...getSvgProps(rest),
  };

  return <tspan {...svgProps} />;
};
