import { VictoryCommonPrimitiveProps } from "../victory-util/types";
import * as React from "react";

export interface LineSegmentProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  lineComponent?: React.ReactElement;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export default class LineSegment extends React.Component<LineSegmentProps> {}
