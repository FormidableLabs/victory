import React from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
import { getSvgProps } from "./svg-props";

export interface TextProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  desc?: string;
  title?: string;
}

export const Text = (props: TextProps) => {
  const { children, desc, id, tabIndex, title, ...rest } = props;

  const svgProps: React.SVGProps<SVGTextElement> = {
    id: evaluateProp(id, props)?.toString(),
    tabIndex: evaluateProp(tabIndex, props),
    ...getSvgProps(rest),
  };

  return (
    <text {...svgProps}>
      {title && <title>{title}</title>}
      {desc && <desc>{desc}</desc>}
      {children}
    </text>
  );
};
