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
    props: VictoryBrushContainerProps,
  ) => void;
  onBrushDomainChange?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
  onBrushDomainChangeEnd?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
}

export class VictoryBrushContainer extends React.Component<
  VictoryBrushContainerProps,
  any
> {}

export const BrushHelpers: {
  getDimension(props): any;
  withinBounds(point, bounds, padding): any;
  getDomainBox(props, fullDomain, selectedDomain): any;
  getHandles(props, domainBox): any;
  getActiveHandles(point, props, domainBox): any;
  getResizeMutation(box, handles): any;
  getMinimumDomain(): any;
  getDefaultBrushArea(targetProps, cachedDomain, evt): any;
  getSelectionMutation(point, box, brushDimension): any;
  panBox(props, point): any;
  constrainBox(box, fullDomainBox): any;
  constrainPoint(point, fullDomainBox): any;
  hasMoved(props): any;
  onMouseDown(evt, targetProps): any;
  onGlobalMouseMove(evt, targetProps): any;
  onGlobalMouseUp(evt, targetProps): any;
};

export function brushContainerMixin<T>(Component: T): Component;
