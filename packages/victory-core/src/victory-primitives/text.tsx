import React from "react";

import { evaluatePrimitiveProps } from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export interface TextProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  desc?: string;
  title?: string;
}

export const Text = (props: TextProps) => {
  const { children, desc, title, ...resolvedProps } = evaluatePrimitiveProps(props);

  const svgProps: React.SVGProps<SVGTextElement> = {
    vectorEffect: "non-scaling-stroke",
    ...resolvedProps,
  };

  return (
    <text {...svgProps}>
      {title && <title>{title}</title>}
      {desc && <desc>{desc}</desc>}
      {children}
    </text>
  );
};
