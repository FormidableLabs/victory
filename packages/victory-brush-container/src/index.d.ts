import * as React from "react";
import { RangeTuple, VictoryContainerProps } from "victory-core";

export interface VictoryBrushContainerProps extends VictoryContainerProps {
  allowDrag?: boolean;
  allowResize?: boolean;
  brushComponent?: React.ReactElement;
  brushDimension?: "x" | "y";
  brushDomain?: { x?: RangeTuple; y?: RangeTuple };
  brushStyle?: React.CSSProperties;
  defaultBrushArea?: "all" | "none" | "disable" | "move";
  disable?: boolean;
  handleComponent?: React.ReactElement;
  handleStyle?: React.CSSProperties;
  onBrushCleared?: (
    domain: { x?: RangeTuple; y?: RangeTuple },
    props: VictoryBrushContainerProps
  ) => void;
  onBrushDomainChange?: (
    domain: { x?: RangeTuple; y?: RangeTuple },
    props: VictoryBrushContainerProps
  ) => void;
  onBrushDomainChangeEnd?: (
    domain: { x?: RangeTuple; y?: RangeTuple },
    props: VictoryBrushContainerProps
  ) => void;
}

export class VictoryBrushContainer extends React.Component<VictoryBrushContainerProps, any> {}
