import * as React from "react";
import {
  OrientationTypes,
  NumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryThemeDefinition,
  VictoryStyleObject,
  VictoryLabelStyleObject,
  PaddingOrCallback,
  EventPropTypeInterface,
} from "victory-core";

export interface VictoryTooltipProps extends VictoryLabelableProps {
  active?: boolean;
  activateData?: boolean;
  activePoints?: any[];
  angle?: string | number;
  center?: { x: number | undefined; y: number | undefined };
  centerOffset?: {
    x?: NumberOrCallback;
    y?: NumberOrCallback;
  };
  constrainToVisibleArea?: boolean;
  cornerRadius?: NumberOrCallback;
  datum?: {};
  data?: any[];
  dx?: NumberOrCallback;
  dy?: NumberOrCallback;
  groupComponent?: React.ReactElement;
  height?: number;
  horizontal?: boolean;
  events?: { [key: string]: (event: React.SyntheticEvent<any>) => void };
  flyoutHeight?: NumberOrCallback;
  flyoutWidth?: NumberOrCallback;
  flyoutStyle?: VictoryStyleObject;
  flyoutComponent?: React.ReactElement;
  flyoutPadding?: PaddingOrCallback;
  index?: number | string;
  orientation?: OrientationTypes | ((...args: any[]) => OrientationTypes);
  pointerLength?: NumberOrCallback;
  pointerOrientation?:
    | OrientationTypes
    | ((...args: any[]) => OrientationTypes);
  pointerWidth?: NumberOrCallback;
  renderInPortal?: boolean;
  style?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
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

export class VictoryTooltip extends React.Component<VictoryTooltipProps, any> {
  static defaultEvents: EventPropTypeInterface<
    string,
    StringOrNumberOrCallback
  >[];
}
