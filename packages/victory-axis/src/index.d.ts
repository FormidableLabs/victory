import * as React from "react";
import {
  DomainPropType,
  EventPropTypeInterface,
  OrientationTypes,
  VictoryAxisCommonProps,
  VictoryCommonProps,
  VictorySingleLabelableProps
} from "victory-core";

export type VictoryAxisTTargetType =
  | "axis"
  | "axisLabel"
  | "grid"
  | "ticks"
  | "tickLabels"
  | "parent";

export interface VictoryAxisProps
  extends VictoryAxisCommonProps,
    VictoryCommonProps,
    VictorySingleLabelableProps {
  crossAxis?: boolean;
  domain?: DomainPropType;
  events?: EventPropTypeInterface<VictoryAxisTTargetType, number | string>[];
  fixLabelOverlap?: boolean;
  offsetX?: number;
  offsetY?: number;
  orientation?: OrientationTypes;
}

/**
 * VictoryAxis draws an SVG chart axis with React.
 * Styles and data can be customized by passing in your own values as properties to the component.
 * Data changes are animated with VictoryAnimation.
 */
export class VictoryAxis extends React.Component<VictoryAxisProps, any> {}
