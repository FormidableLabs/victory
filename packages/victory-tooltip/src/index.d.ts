import * as React from "react";
import {
  OrientationTypes,
  NumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryNumberCallback,
  VictoryThemeDefinition,
  VictoryStyleObject
} from "victory-core";

export interface VictoryTooltipProps {
  active?: boolean;
  activateData?: boolean;
  angle?: string | number;
  centerOffset?: {
    x?: number | Function;
    y?: number | Function;
  };
  constrainToVisibleArea?: boolean;
  cornerRadius?: NumberOrCallback;
  datum?: {};
  data?: any[];
  dx?: StringOrNumberOrCallback;
  dy?: StringOrNumberOrCallback;
  events?: {};
  flyoutHeight?: NumberOrCallback;
  flyoutWidth?: NumberOrCallback;
  flyoutStyle?: VictoryStyleObject;
  flyoutComponent?: React.ReactElement;
  groupComponent?: React.ReactElement;
  height?: number;
  horizontal?: boolean;
  index?: number | string;
  labelComponent?: React.ReactElement;
  orientation?: OrientationTypes | VictoryNumberCallback;
  pointerLength?: NumberOrCallback;
  pointerWidth?: NumberOrCallback;
  renderInPortal?: boolean;
  style?: React.CSSProperties;
  text?: StringOrNumberOrCallback | string[] | number[];
  theme?: VictoryThemeDefinition;
  width?: number;
  x?: number;
  y?: number;
}

export interface FlyoutProps extends VictoryCommonProps {
  active?: boolean;
  center?: {
    x?: number;
    y?: number;
  };
  className?: string;
  cornerRadius?: number;
  data?: any[];
  datum?: object;
  dx?: number;
  dy?: number;
  events?: object;
  height?: number;
  id?: string | number;
  index?: number;
  orientation?: OrientationTypes;
  pathComponent?: React.ReactElement;
  pointerLength?: number;
  pointerWidth?: number;
  role?: string;
  shapeRendering?: string;
  style?: VictoryStyleObject;
  transform?: string;
  width?: number;
  x?: number;
  y?: number;
}

export class Flyout extends React.Component<FlyoutProps, any> {}
export class VictoryTooltip extends React.Component<VictoryTooltipProps, any> {}
