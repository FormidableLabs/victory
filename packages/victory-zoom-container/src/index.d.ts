import * as React from "react";
import { RangeTuple, VictoryContainerProps, CursorData } from "victory-core";

export interface VictoryZoomContainerProps extends VictoryContainerProps {
  allowPan?: boolean;
  allowZoom?: boolean;
  brushStyle?: React.CSSProperties;
  clipContainerComponent?: React.ReactElement;
  defaultBrushArea?: "all" | "none" | "disable";
  disable?: boolean;
  downsample?: number | boolean;
  minimumZoom?: CursorData;
  onZoomDomainChange?: (
    domain: { x?: RangeTuple; y?: RangeTuple },
    props: VictoryZoomContainerProps
  ) => void;
  zoomDimension?: "x" | "y";
  zoomDomain?: { x?: RangeTuple; y?: RangeTuple };
}

export class VictoryZoomContainer extends React.Component<VictoryZoomContainerProps, any> {}
