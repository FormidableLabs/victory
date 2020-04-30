import * as React from "react";
import { DomainPropType, DomainTuple, RangeTuple, VictoryContainerProps } from "victory-core";

export interface VictoryBrushContainerProps extends VictoryContainerProps {
  allowDrag?: boolean;
  allowResize?: boolean;
  brushComponent?: React.ReactElement;
  brushDimension?: "x" | "y";
  brushDomain?: DomainPropType;
  brushStyle?: React.CSSProperties;
  defaultBrushArea?: "all" | "none" | "disable" | "move";
  disable?: boolean;
  handleComponent?: React.ReactElement;
  handleStyle?: React.CSSProperties;
  onBrushCleared?: (domain: DomainPropType, props?: VictoryBrushContainerProps) => void;
  onBrushDomainChange?: (domain: DomainPropType, props?: VictoryBrushContainerProps) => void;
  onBrushDomainChangeEnd?: (domain: DomainPropType, props?: VictoryBrushContainerProps) => void;
}

export class VictoryBrushContainer extends React.Component<VictoryBrushContainerProps, any> {}
