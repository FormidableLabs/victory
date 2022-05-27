import * as React from "react";

export interface VictoryAccessibleGroupProps {
  desc?: string;
  "aria-describedby"?: string;
  "aria-label": string;
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  tabIndex?: number;
}

export default class VictoryAccessibleGroup extends React.Component<
  VictoryAccessibleGroupProps,
  any
> {}
