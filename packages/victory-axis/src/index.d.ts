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
import { DomainPropType, EventPropTypeInterface, VictoryCommonProps } from "victory-core";

export type TickLabelProps = React.CSSProperties & {
  angle?: number;
  verticalAnchor?: "start" | "middle" | "end";
};

export interface VictoryAxisProps extends VictoryCommonProps {
  axisComponent?: React.ReactElement;
  axisLabelComponent?: React.ReactElement;
  axisValue?: number | string | object;
  crossAxis?: boolean;
  dependentAxis?: boolean;
  domain?: DomainPropType;
  events?: EventPropTypeInterface<
    "axis" | "axisLabel" | "grid" | "ticks" | "tickLabels" | "parent",
    number | string
  >[];
  fixLabelOverlap?: boolean;
  gridComponent?: React.ReactElement;
  invertAxis?: boolean;
  label?: any;
  offsetX?: number;
  offsetY?: number;
  orientation?: "top" | "bottom" | "left" | "right";
  style?: {
    parent?: React.CSSProperties;
    axis?: React.CSSProperties;
    axisLabel?: React.CSSProperties;
    grid?: {
      [K in keyof React.CSSProperties]: string | number | ((tick?: any) => string | number)
    };
    ticks?: {
      [K in keyof React.CSSProperties]: string | number | ((tick?: any) => string | number)
    };
    tickLabels?: {
      [K in keyof TickLabelProps]: string | number | ((tick?: any) => string | number)
    };
  };
  tickComponent?: React.ReactElement;
  tickCount?: number;
  tickLabelComponent?: React.ReactElement;
  tickFormat?: any[] | { (tick: any, index: number, ticks: any[]): string | number };
  tickValues?: any[];
}

/**
 * VictoryAxis draws an SVG chart axis with React.
 * Styles and data can be customized by passing in your own values as properties to the component.
 * Data changes are animated with VictoryAnimation.
 */
export class VictoryAxis extends React.Component<VictoryAxisProps, any> {}
