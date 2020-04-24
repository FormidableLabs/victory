import * as React from "react";
import { VictoryCommonProps } from "victory-core";

export interface VictoryErrorBarProps extends VictoryCommonProps {
  borderWidth?: number;
  errorX?: number | number[];
  errorY?: number | number[];
}

export class VictoryErrorBar extends React.Component<VictoryErrorBarProps, any> {}
