import { VictoryCommonPrimitiveProps } from "../victory-util/types";
import * as React from "react";

export type WhiskerAxes = {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
};

export interface WhiskerProps extends VictoryCommonPrimitiveProps {
  groupComponent?: React.ReactElement;
  lineComponent?: React.ReactElement;
  majorWhisker?: WhiskerAxes;
  minorWhisker?: WhiskerAxes;
}

export default class Whisker extends React.Component<WhiskerProps> {}
