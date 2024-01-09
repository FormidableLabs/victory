import React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export interface ClipPathProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode[] | React.ReactNode;
  clipId?: number | string;
}

export const ClipPath = (props: ClipPathProps) => (
  <defs>
    {<clipPath id={props.clipId?.toString()}>{props.children}</clipPath>}
  </defs>
);
