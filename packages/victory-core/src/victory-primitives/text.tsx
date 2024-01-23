import React from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export interface TextProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  desc?: string;
  title?: string;
}

export const Text = (props: TextProps) => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars --
   * origin conflicts with the SVG element's origin attribute
   */
  const { children, desc, id, origin, tabIndex, title, ...rest } = props;

  const svgProps: React.SVGProps<SVGTextElement> = {
    id: evaluateProp(id, props)?.toString(),
    tabIndex: evaluateProp(tabIndex, props),
    ...rest,
  };

  return (
    <text {...svgProps}>
      {title && <title>{title}</title>}
      {desc && <desc>{desc}</desc>}
      {children}
    </text>
  );
};
