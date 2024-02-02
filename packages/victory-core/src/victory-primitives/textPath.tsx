import React from "react";
import { evaluateProp } from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";


export interface TextPathProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  href?: string;
  startOffset?: string | number;
}

export const TextPath = (props: TextPathProps) => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars --
   * origin conflicts with the SVG element's origin attribute
   */
  const { href, startOffset, children, id, tabIndex, origin, ...rest } = props;

  const svgProps: React.SVGProps<SVGTextPathElement> = {
    href: evaluateProp(href, props),
    startOffset: evaluateProp(startOffset,props)
    ...rest,
  };

  return <textPath {...svgProps}>
    {children}
  </textPath>;
};
