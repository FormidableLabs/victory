// Definitions by: Alexey Svetliakov <https://github.com/asvetliakov>
//                 snerks <https://github.com/snerks>
//                 Krzysztof Cebula <https://github.com/Havret>
//                 Vitaliy Polyanskiy <https://github.com/alreadyExisted>
//                 James Lismore <https://github.com/jlismore>
//                 Stack Builders <https://github.com/stackbuilders>
//                 Esteban Ibarra <https://github.com/ibarrae>
//                 Dominic Lee <https://github.com/dominictwlee>
//                 Dave Vedder <https://github.com/veddermatic>
//                 Alec Flett <https://github.com/alecf>

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
