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
import { DomainPropType, VictoryStyleObject } from "victory-core";

export interface VictoryBrushLineProps {
  allowDrag?: boolean;
  allowResize?: boolean;
  brushAreaComponent?: React.ReactElement;
  brushAreaStyle?: VictoryStyleObject;
  brushAreaWidth?: number;
  brushComponent?: React.ReactElement;
  brushDomain?: [number, number];
  brushStyle?: VictoryStyleObject;
  brushWidth?: number;
  className?: string;
  dimension?: "x" | "y";
  disable?: boolean;
  groupComponent?: React.ReactElement;
  handleComponent?: React.ReactElement;
  handleStyle?: VictoryStyleObject;
  handleWidth?: number;
  id?: string | number;
  lineComponent?: React.ReactElement;
  name?: string;
  onBrushDomainChange?: (currentDomain: DomainPropType, props: VictoryBrushLineProps) => void;
  style?: VictoryStyleObject;
  type?: string;
  width?: number;
}

export class VictoryBrushLine extends React.Component<VictoryBrushLineProps, any> {}
