import * as React from "react";
import {
  DomainPropType,
  EventPropTypeInterface,
  VictoryAxisCommonProps,
  VictoryCommonProps
} from "victory-core";

export interface VictoryAxisProps extends VictoryAxisCommonProps, VictoryCommonProps {
  axisValue?: number | string | object;
  crossAxis?: boolean;
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
}

/**
 * VictoryAxis draws an SVG chart axis with React.
 * Styles and data can be customized by passing in your own values as properties to the component.
 * Data changes are animated with VictoryAnimation.
 */
export class VictoryAxis extends React.Component<VictoryAxisProps, any> {}
