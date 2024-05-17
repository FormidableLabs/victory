import React from "react";

import { evaluatePrimitiveProps } from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export const TSpan = (props: VictoryCommonPrimitiveProps) => {
  const resolvedProps = evaluatePrimitiveProps(props);

  const svgProps: React.SVGProps<SVGTextElement> = {
    vectorEffect: "non-scaling-stroke",
    ...resolvedProps,
  };

  return <tspan {...svgProps} />;
};
