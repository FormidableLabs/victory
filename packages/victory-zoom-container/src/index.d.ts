import * as React from "react";
import { DomainPropType, RangeTuple, VictoryContainerProps, CursorData } from "victory-core";

export interface VictoryZoomContainerProps extends VictoryContainerProps {
  allowPan?: boolean;
  allowZoom?: boolean;
  brushStyle?: React.CSSProperties;
  clipContainerComponent?: React.ReactElement;
  defaultBrushArea?: "all" | "none" | "disable";
  disable?: boolean;
  downsample?: number | boolean;
  minimumZoom?: CursorData;
  onZoomDomainChange?: (domain: DomainPropType, props: VictoryZoomContainerProps) => void;
  zoomDimension?: "x" | "y";
  zoomDomain?: DomainPropType;
}

export class VictoryZoomContainer extends React.Component<VictoryZoomContainerProps, any> {}
