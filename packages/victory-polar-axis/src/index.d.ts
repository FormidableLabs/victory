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
import {
  DomainPropType,
  EventPropTypeInterface,
  LabelOrientationType,
  VictoryAxisCommonProps,
  VictoryCommonProps,
  VictorySingleLabelableProps
} from "victory-core";

export interface VictoryPolarAxisProps
  extends VictoryAxisCommonProps,
    VictoryCommonProps,
    VictorySingleLabelableProps {
  axisAngle?: number;
  axisValue?: number | string | Date;
  circularAxisComponent?: React.ReactElement;
  circularGridComponent?: React.ReactElement;
  domain?: DomainPropType;
  endAngle?: number;
  events?: EventPropTypeInterface<
    "axis" | "axisLabel" | "grid" | "ticks" | "tickLabels",
    string | number
  >[];
  gridComponent?: React.ReactElement;
  innerRadius?: number;
  labelOrientation?: LabelOrientationType;
  labelPlacement?: LabelOrientationType;
  origin?: { x: number; y: number };
  startAngle?: number;
}

export class VictoryPolarAxis extends React.Component<VictoryPolarAxisProps, any> {}
