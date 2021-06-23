import * as React from "react";
import { DomainTuple, VictoryStyleObject } from "victory-core";

export interface VictoryBrushLineProps {
  allowDrag?: boolean;
  allowDraw?: boolean;
  allowResize?: boolean;
  brushAreaComponent?: React.ReactElement;
  brushAreaStyle?: VictoryStyleObject;
  brushAreaWidth?: number;
  brushComponent?: React.ReactElement;
  brushDomain?: DomainTuple;
  brushStyle?: VictoryStyleObject;
  brushWidth?: number;
  className?: string;
  dimension?: "x" | "y";
  disable?: boolean;
  groupComponent?: React.ReactElement;
  handleComponent?: React.ReactElement;
  handleStyle?: VictoryStyleObject;
  handleWidth?: number;
  id?: string | number;
  lineComponent?: React.ReactElement;
  name?: string;
  onBrushDomainChange?: (
    domain: DomainTuple,
    props?: VictoryBrushLineProps
  ) => void;
  style?: VictoryStyleObject;
  type?: string;
  width?: number;
}

export class VictoryBrushLine extends React.Component<
  VictoryBrushLineProps,
  any
> {}
