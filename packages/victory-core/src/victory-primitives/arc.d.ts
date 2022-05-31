import * as React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/types";

export interface ArcProps extends VictoryCommonPrimitiveProps {
  closedPath?: boolean;
  cx?: number;
  cy?: number;
  datum?: any;
  endAngle?: number;
  pathComponent?: React.ReactElement;
  r?: number;
  startAngle?: number;
}

export default class Arc extends React.Component<ArcProps> {}
