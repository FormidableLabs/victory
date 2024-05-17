import React from "react";

export interface ClipPathProps {
  children?: React.ReactNode[] | React.ReactNode;
  clipId?: number | string;
}

export const ClipPath = (props: ClipPathProps) => (
  <defs>
    {<clipPath id={props.clipId?.toString()}>{props.children}</clipPath>}
  </defs>
);
