import * as React from "react";
import { DomainTuple, VictoryContainerProps } from "victory-core";

export type ZoomDimensionType = "x" | "y";

export interface VictoryZoomContainerProps extends VictoryContainerProps {
  allowPan?: boolean;
  allowZoom?: boolean;
  clipContainerComponent?: React.ReactElement;
  disable?: boolean;
  downsample?: number | boolean;
  minimumZoom?: { x?: number; y?: number };
  onZoomDomainChange?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryZoomContainerProps
  ) => void;
  zoomDimension?: ZoomDimensionType;
  zoomDomain?: { x?: DomainTuple; y?: DomainTuple };
}

export class VictoryZoomContainer extends React.Component<
  VictoryZoomContainerProps,
  any
> {}
