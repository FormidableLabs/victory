import React from "react";

export interface VictoryAccessibleGroupProps {
  desc?: string;
  "aria-describedby"?: string;
  "aria-label"?: string;
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  tabIndex?: number;
}

export const VictoryAccessibleGroup = ({
  desc,
  children,
  tabIndex,
  className = "VictoryAccessibleGroup",
  ...props
}: VictoryAccessibleGroupProps) => {
  const descId =
    desc && (props["aria-describedby"] || desc.split(" ").join("-"));

  return desc ? (
    <g
      aria-label={props["aria-label"]}
      aria-describedby={descId}
      className={className}
      tabIndex={tabIndex}
    >
      <desc id={descId}>{desc}</desc>
      {children}
    </g>
  ) : (
    <g
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      className={className}
      tabIndex={tabIndex}
    >
      {children}
    </g>
  );
};
