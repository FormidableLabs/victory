import { VictoryCommonPrimitiveProps } from "../victory-util/types";
import * as React from "react";

export interface BackgroundProps extends VictoryCommonPrimitiveProps {
  circleComponent?: React.ReactElement;
  height?: number;
  rectComponent?: React.ReactElement;
  rx?: number;
  ry?: number;
  width?: number;
  x?: number;
  y?: number;
}

export class Background extends React.Component<BackgroundProps> {}
