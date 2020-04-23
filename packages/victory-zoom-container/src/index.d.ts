import * as React from "react";
import { DomainPropType, VictoryContainerProps, CursorData } from "victory-core";

export interface VictoryZoomContainerProps extends VictoryContainerProps {
  allowPan?: boolean;
  allowZoom?: boolean;
  clipContainerComponent?: React.ReactElement;
  zoomDimension?: "x" | "y";
  zoomDomain?: DomainPropType;
  brushStyle?: React.CSSProperties;
  defaultBrushArea?: "all" | "none" | "disable";
  disable?: boolean;
  downsample?: number | boolean;
  minimumZoom?: CursorData;
  onZoomDomainChange?: (domain: DomainPropType, props: VictoryZoomContainerProps) => void;
}

export class VictoryZoomContainer extends React.Component<VictoryZoomContainerProps, any> {}
