import * as React from "react";
import { DomainTuple, VictoryContainerProps } from "victory-core";

export interface VictoryBrushContainerProps extends VictoryContainerProps {
  allowDrag?: boolean;
  allowDraw?: boolean;
  allowResize?: boolean;
  brushComponent?: React.ReactElement;
  brushDimension?: "x" | "y";
  brushDomain?: { x?: DomainTuple; y?: DomainTuple };
  brushStyle?: React.CSSProperties;
  defaultBrushArea?: "all" | "none" | "disable" | "move";
  disable?: boolean;
  handleComponent?: React.ReactElement;
  handleStyle?: React.CSSProperties;
  handleWidth?: number;
  onBrushCleared?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps
  ) => void;
  onBrushDomainChange?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps
  ) => void;
  onBrushDomainChangeEnd?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps
  ) => void;
}

export class VictoryBrushContainer extends React.Component<
  VictoryBrushContainerProps,
  any
> {}
