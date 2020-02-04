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
import { VictoryContainerProps } from "victory-core";

export interface VictoryVoronoiContainerProps extends VictoryContainerProps {
  activateData?: boolean;
  activateLabels?: boolean;
  disable?: boolean;
  labels?: (point: any, index: number, points: any[]) => string;
  labelComponent?: React.ReactElement;
  onActivated?: (points: any[], props: VictoryVoronoiContainerProps) => void;
  onDeactivated?: (points: any[], props: VictoryVoronoiContainerProps) => void;
  radius?: number;
  voronoiBlacklist?: string[];
  voronoiDimension?: "x" | "y";
  voronoiPadding?: number;
}

export class VictoryVoronoiContainer extends React.Component<VictoryVoronoiContainerProps, any> {}
