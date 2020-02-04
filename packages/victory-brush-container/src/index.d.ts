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
import { DomainPropType, VictoryContainerProps } from "victory-core";

export interface VictoryBrushContainerProps extends VictoryContainerProps {
  allowDrag?: boolean;
  allowResize?: boolean;
  brushComponent?: React.ReactElement;
  brushDimension?: "x" | "y";
  brushDomain?: DomainPropType;
  brushStyle?: React.CSSProperties;
  defaultBrushArea?: "all" | "none" | "disable";
  disable?: boolean;
  handleComponent?: React.ReactElement;
  handleStyle?: React.CSSProperties;
  onBrushDomainChange?: (domain: DomainPropType, props: VictoryBrushContainerProps) => void;
}

export class VictoryBrushContainer extends React.Component<VictoryBrushContainerProps, any> {}
