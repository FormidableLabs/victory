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

/**
 * Single animation object to interpolate
 */
export type AnimationStyle = { [key: string]: string | number };

/**
 * Animation styles to interpolate
 */

export type AnimationData = AnimationStyle | AnimationStyle[];

export type AnimationEasing =
  | "back"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "bounce"
  | "bounceIn"
  | "bounceOut"
  | "bounceInOut"
  | "circle"
  | "circleIn"
  | "circleOut"
  | "circleInOut"
  | "linear"
  | "linearIn"
  | "linearOut"
  | "linearInOut"
  | "cubic"
  | "cubicIn"
  | "cubicOut"
  | "cubicInOut"
  | "elastic"
  | "elasticIn"
  | "elasticOut"
  | "elasticInOut"
  | "exp"
  | "expIn"
  | "expOut"
  | "expInOut"
  | "poly"
  | "polyIn"
  | "polyOut"
  | "polyInOut"
  | "quad"
  | "quadIn"
  | "quadOut"
  | "quadInOut"
  | "sin"
  | "sinIn"
  | "sinOut"
  | "sinInOut";

export type ScatterSymbolType =
  | "circle"
  | "diamond"
  | "plus"
  | "square"
  | "star"
  | "triangleDown"
  | "triangleUp";

/**
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type BlockProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type PaddingProps = number | BlockProps;

/**
 * This is the first parameter of a callback when a callback is used to
 * resolve the value of a property instead of a concrete value.
 *
 * Note that additional properties here like `scale`, `x`, `y`, etc are resolved
 * values of properties from the VictoryXXXProps for each component.
 */
export interface CallbackArgs {
  active: boolean;
  datum: any;
  horizontal: boolean;
  x: number;
  y: number;
  scale?: {
    x?: D3Scale;
    y?: D3Scale;
  };
}

export type VictoryStringOrNumberCallback = (args: CallbackArgs) => string | number;
export type VictoryNumberCallback = (args: CallbackArgs) => number;
export type StringOrNumberOrCallback = string | number | VictoryStringOrNumberCallback;
export type NumberOrCallback = number | VictoryNumberCallback;

export type SliceNumberOrCallback<T, P = null> = number | ((props: Omit<T, P>) => number);

export type VictoryStyleObject = { [K in keyof React.CSSProperties]: StringOrNumberOrCallback };

export type CursorData = {
  x: number;
  y: number;
};

export type OrientationTypes = "top" | "bottom" | "left" | "right";

/**
 * Style interface used in components/themeing
 */
export interface VictoryStyleInterface {
  parent?: VictoryStyleObject;
  data?: VictoryStyleObject;
  labels?: VictoryStyleObject;
  border?: VictoryStyleObject;
}

// #region Victory Animation

export interface VictoryAnimationProps {
  children?: (style: AnimationStyle) => React.ReactElement;
  duration?: number;
  easing?: AnimationEasing;
  delay?: number;
  onEnd?: () => void;
  data?: AnimationData;
}

export class VictoryAnimation extends React.Component<VictoryAnimationProps, any> {}

// #endregion

// #region Victory Label

export type TextAnchorType = "start" | "middle" | "end" | "inherit";
export type VerticalAnchorType = "start" | "middle" | "end";

export interface VictoryLabelProps {
  angle?: string | number;
  capHeight?: StringOrNumberOrCallback;
  className?: string;
  datum?: {};
  data?: any[];
  events?: React.DOMAttributes<any>;
  children?: StringOrNumberOrCallback;
  labelPlacement?: "parallel" | "perpendicular" | "vertical";
  lineHeight?: StringOrNumberOrCallback;
  origin?: { x: number; y: number };
  polar?: boolean;
  renderInPortal?: boolean;
  style?: React.CSSProperties | React.CSSProperties[];
  text?: string[] | StringOrNumberOrCallback;
  textAnchor?: TextAnchorType | { (): TextAnchorType };
  verticalAnchor?: VerticalAnchorType | { (): VerticalAnchorType };
  transform?: string | {} | { (): string | {} };
  x?: number;
  y?: number;
  dx?: StringOrNumberOrCallback;
  dy?: StringOrNumberOrCallback;
}

export class VictoryLabel extends React.Component<VictoryLabelProps, any> {}

// #endregion

// #region Victory Container

export interface VictoryContainerProps {
  responsive?: boolean;
  style?: React.CSSProperties;
  height?: number;
  width?: number;
  events?: React.DOMAttributes<any>;
  title?: string;
  desc?: string;
}

export class VictoryContainer extends React.Component<VictoryContainerProps, any> {}

// #endregion

// #region Victory Clip Container

export interface VictoryClipContainerProps {
  children?: React.ReactElement | React.ReactElement[];
  circleComponent?: React.ReactElement;
  className?: string;
  clipHeight?: number;
  clipId?: number | string;
  clipPadding?: BlockProps;
  clipPathComponent?: React.ReactElement;
  clipWidth?: number;
  events?: React.DOMAttributes<any>;
  groupComponent?: React.ReactElement;
  origin?: {
    x?: number;
    y?: number;
  };
  polar?: boolean;
  radius?: number;
  rectComponent?: React.ReactElement;
  translateX?: number;
  translateY?: number;
}

export class VictoryClipContainer extends React.Component<VictoryClipContainerProps, any> {}

// #endregion

// #region Victory Theme

export type ThemeBaseProps = {
  width?: number;
  height?: number;
  colorScale?: string[];
  padding?: number;
  offsetX?: number;
  offsetY?: number;
};

export type TickProps = React.CSSProperties & { size?: number };

// Note: Many SVG attributes are missed in CSSProperties interface
export interface VictoryThemeDefinition {
  area?: {
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  axis?: {
    style?: {
      axis?: React.CSSProperties;
      axisLabel?: React.CSSProperties;
      grid?: React.CSSProperties;
      ticks?: TickProps;
      tickLabels?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  bar?: {
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  boxplot?: {
    style?: {
      max?: React.CSSProperties;
      maxLabels?: React.CSSProperties;
      median?: React.CSSProperties;
      medianLabels?: React.CSSProperties;
      min?: React.CSSProperties;
      minLabels?: React.CSSProperties;
      q1?: React.CSSProperties;
      q1Labels?: React.CSSProperties;
      q3?: React.CSSProperties;
      q3Labels?: React.CSSProperties;
    };
    boxWidth?: number;
  } & ThemeBaseProps;
  candlestick?: {
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
    };
    candleColors?: {
      positive?: string;
      negative?: string;
    };
  } & ThemeBaseProps;
  chart?: ThemeBaseProps;
  dependentAxis?: {
    style?: {
      axis?: React.CSSProperties;
      axisLabel?: React.CSSProperties;
      grid?: React.CSSProperties;
      ticks?: TickProps;
      tickLabels?: React.CSSProperties;
    };
    orientation?: OrientationTypes;
  } & ThemeBaseProps;
  errorbar?: {
    borderWidth?: number;
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  group?: ThemeBaseProps;
  independentAxis?: {
    style?: {
      axis?: React.CSSProperties;
      axisLabel?: React.CSSProperties;
      grid?: React.CSSProperties;
      ticks?: TickProps;
      tickLabels?: React.CSSProperties;
    };
    orientation?: OrientationTypes;
  } & ThemeBaseProps;
  legend?: {
    gutter?: number;
    orientation?: "vertical" | "horizontal";
    titleOrientation?: OrientationTypes;
    style?: {
      data?: React.CSSProperties & {
        type?: ScatterSymbolType;
      };
      labels?: React.CSSProperties;
      title?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  line?: {
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  pie?: {
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  scatter?: {
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
    };
  } & ThemeBaseProps;
  stack?: ThemeBaseProps;
  tooltip?: {
    style?: React.CSSProperties;
    flyoutStyle?: React.CSSProperties;
    cornerRadius?: number;
    pointerLength?: number;
  };
  voronoi?: {
    style?: {
      data?: React.CSSProperties;
      labels?: React.CSSProperties;
      flyout?: React.CSSProperties;
    };
  } & ThemeBaseProps;
}

export interface VictoryThemeInterface {
  grayscale: VictoryThemeDefinition;
  material: VictoryThemeDefinition;
}

export const VictoryTheme: VictoryThemeInterface;

// #endregion

// #region Victory Util

export interface AnimatePropTypeInterface {
  duration?: number;
  onEnd?: () => void;
  onExit?: {
    duration?: number;
    before?: (datum: any) => AnimationStyle;
  };
  onEnter?: {
    duration?: number;
    before?: (datum: any) => AnimationStyle;
    after?: (datum: any) => AnimationStyle;
  };
  onLoad?: {
    duration?: number;
    before?: (datum: any) => AnimationStyle;
    after?: (datum: any) => AnimationStyle;
  };
  easing?: AnimationEasing;
}

export interface EventCallbackInterface<TTarget, TEventKey> {
  childName?: string;
  target?: TTarget;
  eventKey?: TEventKey;
  mutation: (props: any) => any;
}

export interface EventPropTypeInterface<TTarget, TEventKey> {
  childName?: string;
  target: TTarget;
  eventKey?: TEventKey;
  eventHandlers: {
    [key: string]:
      | {
          (event: React.SyntheticEvent<any>): EventCallbackInterface<TTarget, TEventKey>;
        }
      | {
          (event: React.SyntheticEvent<any>): EventCallbackInterface<TTarget, TEventKey>[];
        };
  };
}

export type DomainTuple = [number, number] | [Date, Date];
export type DomainPropType =
  | DomainTuple
  | { x?: DomainTuple; y: DomainTuple }
  | { x: DomainTuple; y?: DomainTuple };

export type DomainPaddingPropType =
  | number
  | {
      x?: number | [number, number];
      y?: number | [number, number];
    };

/**
 * D3 scale function shape. Don"t want to introduce typing dependency to d3
 */
export interface D3Scale {
  (input: string | number): number;
  domain: () => any;
  range: () => any;
  copy: () => any;
}

export type ScalePropType = "linear" | "time" | "log" | "sqrt";

export type CategoryPropType =
  | string[]
  | { x: string[] }
  | { y: string[] }
  | {
      x: string[];
      y: string[];
    };

export type DataGetterPropType =
  | number
  | string
  | string[]
  | { (data: any): number | string | string[] };

export type InterpolationPropType =
  | "basis"
  | "basisClosed"
  | "basisOpen"
  | "bundle"
  | "cardinal"
  | "cardinalClosed"
  | "cardinalOpen"
  | "catmullRom"
  | "catmullRomClosed"
  | "catmullRomOpen"
  | "linear"
  | "linearClosed"
  | "monotoneX"
  | "monotoneY"
  | "natural"
  | "radial"
  | "step"
  | "stepAfter"
  | "stepBefore";

export type ColorScalePropType =
  | "grayscale"
  | "qualitative"
  | "heatmap"
  | "warm"
  | "cool"
  | "red"
  | "green"
  | "blue"
  | string[];

export interface VictoryCommonProps {
  animate?: boolean | AnimatePropTypeInterface;
  name?: string;
  height?: number;
  horizontal?: boolean;
  maxDomain?: number | { x?: number; y?: number };
  minDomain?: number | { x?: number; y?: number };
  padding?: PaddingProps;
  scale?:
    | ScalePropType
    | D3Scale
    | {
        x?: ScalePropType | D3Scale;
        y?: ScalePropType | D3Scale;
      };
  singleQuadrantDomainPadding?: boolean | { x?: boolean; y?: boolean };
  standalone?: boolean;
  width?: number;
  containerComponent?: React.ReactElement;
  theme?: VictoryThemeDefinition;
  groupComponent?: React.ReactElement;
}

export interface VictoryCommonPrimitiveProps {
  active?: boolean;
  className?: string;
  clipPath?: string;
  data?: any;
  desc?: string | Function;
  events?: object;
  id?: number | string;
  index?: number | string;
  origin?: {
    x: number;
    y: number;
  };
  polar?: boolean;
  role?: string;
  scale?: any;
  shapeRendering?: string;
  style?: any;
  tabIndex?: number | Function;
  transform?: string;
}

export interface VictoryDatableProps {
  categories?: CategoryPropType;
  data?: any[];
  dataComponent?: React.ReactElement;
  domain?: DomainPropType;
  x?: DataGetterPropType;
  y?: DataGetterPropType;
  y0?: DataGetterPropType;
}

export interface VictoryLabableProps {
  labelComponent?: React.ReactElement;
}

export interface VictoryMultiLabeableProps extends VictoryLabableProps {
  labels?: string[] | { (data: any): string | null };
}

export interface VictorySingleLabableProps extends VictoryLabableProps {
  label?: string | { (data: any): string };
}

// #endregion

// #region Victory Portal

export interface VictoryPortalProps {
  children?: React.ReactElement;
  groupComponent?: React.ReactElement;
}

export class VictoryPortal extends React.Component<VictoryPortalProps, any> {}

// #endregion

// #region Victory Primitives

export interface VictoryPointProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  getPath?: Function;
  pathComponent?: React.ReactElement;
  size?: number | Function;
  symbol?:
    | "circle"
    | "diamond"
    | "plus"
    | "minus"
    | "square"
    | "star"
    | "triangleDown"
    | "triangleUp"
    | Function;
  x?: number;
  y?: number;
}

export class Point extends React.Component<VictoryPointProps> {}

export interface VictoryBorderProps extends VictoryCommonPrimitiveProps {
  width?: number;
  height?: number;
  rectComponent?: React.ReactElement;
  x?: number;
  y?: number;
}

export class Border extends React.Component<VictoryBorderProps> {}

// #endregion
