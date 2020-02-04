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
import { VictoryContainerProps, CursorData } from "victory-core";

export interface VictoryCursorContainerProps extends VictoryContainerProps {
  cursorComponent?: React.ReactElement;
  cursorDimension?: "x" | "y";
  cursorLabel?: (point: CursorData) => void;
  cursorLabelComponent?: React.ReactElement;
  cursorLabelOffset?: number | CursorData;
  defaultCursorValue?: number | CursorData;
  disable?: boolean;
  onCursorChange?: (value: CursorData, props: VictoryCursorContainerProps) => void;
}

export class VictoryCursorContainer extends React.Component<VictoryCursorContainerProps, any> {}
