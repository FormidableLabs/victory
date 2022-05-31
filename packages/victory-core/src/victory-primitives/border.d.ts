import * as React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/types";

export interface BorderProps extends VictoryCommonPrimitiveProps {
  width?: number;
  height?: number;
  rectComponent?: React.ReactElement;
  x?: number;
  y?: number;
}

export class Border extends React.Component<BorderProps> {}
