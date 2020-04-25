import * as React from "react";
import { RangeTuple, VictoryContainerProps, CoordinatesPropType } from "victory-core";

export interface VictoryZoomContainerProps extends VictoryContainerProps {
  allowPan?: boolean;
  allowZoom?: boolean;
  clipContainerComponent?: React.ReactElement;
  disable?: boolean;
  downsample?: number | boolean;
  minimumZoom?: CoordinatesPropType;
  onZoomDomainChange?: (
    domain: { x?: RangeTuple | [Date, Date]; y?: RangeTuple | [Date, Date] },
    props: VictoryZoomContainerProps
  ) => void;
  zoomDimension?: "x" | "y";
  zoomDomain?: { x?: RangeTuple | [Date, Date]; y?: RangeTuple | [Date, Date] };
}

export class VictoryZoomContainer extends React.Component<VictoryZoomContainerProps, any> {}
