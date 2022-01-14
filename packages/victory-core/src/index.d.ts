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
  | "cross"
  | "diamond"
  | "plus"
  | "minus"
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
  active?: boolean;
  data?: any;
  datum?: any;
  horizontal?: boolean;
  index: number | string;
  x?: number;
  y?: number;
  scale?: {
    x?: D3Scale;
    y?: D3Scale;
  };
  tick?: any;
  ticks?: any;
  text?: any;
}

export type OrientationTypes = "top" | "bottom" | "left" | "right";

export type VictoryStringOrNumberCallback = (
  args: CallbackArgs
) => string | number;
export type VictoryNumberCallback = (args: CallbackArgs) => number;
export type VictoryStringCallback = (args: CallbackArgs) => string;
export type VictoryPaddingCallback = (
  args: CallbackArgs
) => number | BlockProps;
export type VictoryOrientationCallback = (
  args: CallbackArgs
) => OrientationTypes;
export type StringOrNumberOrCallback =
  | string
  | number
  | VictoryStringOrNumberCallback;
export type NumberOrCallback = number | VictoryNumberCallback;
export type StringOrCallback = string | VictoryStringCallback;
export type PaddingOrCallback = number | BlockProps | VictoryPaddingCallback;
export type OrientationOrCallback =
  | OrientationTypes
  | VictoryOrientationCallback;

export type SliceNumberOrCallback<T, P = null> =
  | number
  | ((props: Omit<T, P>) => number);

export type StringOrNumberOrList = string | number | (string | number)[];

export type CoordinatesPropType = {
  x: number;
  y: number;
};

export type VictoryStyleObject = {
  [K in keyof React.CSSProperties]: StringOrNumberOrCallback;
};

export type LabelProps = React.CSSProperties & {
  angle?: number;
  verticalAnchor?: VerticalAnchorType;
};

export type VictoryLabelStyleObject = {
  [K in keyof LabelProps]: StringOrNumberOrCallback;
};

/**
 * Style interface used in components/themeing
 */
export interface VictoryStyleInterface {
  parent?: VictoryStyleObject;
  data?: VictoryStyleObject;
  labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  border?: VictoryStyleObject;
}

// #endregion

// #region Victory Animation

export interface VictoryAnimationProps {
  children?: (style: AnimationStyle) => React.ReactElement;
  duration?: number;
  easing?: AnimationEasing;
  delay?: number;
  onEnd?: () => void;
  data?: AnimationData;
}

export class VictoryAnimation extends React.Component<
  VictoryAnimationProps,
  any
> {}

// #endregion

// #region Victory Axis props

export type TickProps = React.CSSProperties & { size?: number };

export type VictoryTickStyleObject = {
  [K in keyof TickProps]: StringOrNumberOrCallback;
};

export interface VictoryAxisCommonProps {
  axisComponent?: React.ReactElement;
  axisLabelComponent?: React.ReactElement;
  axisValue?: number | string | object | Date;
  dependentAxis?: boolean;
  disableInlineStyles?: boolean;
  gridComponent?: React.ReactElement;
  invertAxis?: boolean;
  style?: {
    parent?: VictoryStyleObject;
    axis?: VictoryStyleObject;
    axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    grid?: VictoryStyleObject;
    ticks?: VictoryTickStyleObject;
    tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  };
  tickComponent?: React.ReactElement;
  tickCount?: number;
  tickLabelComponent?: React.ReactElement;
  tickFormat?:
    | any[]
    | { (tick: any, index: number, ticks: any[]): string | number };
  tickValues?: any[];
}

// #endregion

// #region Victory Label

export type TextAnchorType = "start" | "middle" | "end" | "inherit";
export type VerticalAnchorType = "start" | "middle" | "end";
export type OriginType = { x: number; y: number };
export type LabelOrientationType = "parallel" | "perpendicular" | "vertical";

export interface VictoryLabelProps {
  angle?: StringOrNumberOrCallback;
  ariaLabel?: StringOrCallback;
  backgroundComponent?: React.ReactElement;
  backgroundStyle?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  backgroundPadding?: PaddingProps | PaddingProps[];
  capHeight?: StringOrNumberOrCallback;
  children?: StringOrNumberOrCallback;
  className?: string;
  datum?: {};
  data?: any[];
  desc?: string;
  direction?: string;
  disableInlineStyles?: boolean;
  events?: React.DOMAttributes<any>;
  groupComponent?: React.ReactElement;
  id?: StringOrNumberOrCallback;
  inline?: boolean;
  labelPlacement?: LabelOrientationType;
  lineHeight?: StringOrNumberOrCallback | (string | number)[];
  origin?: OriginType;
  polar?: boolean;
  renderInPortal?: boolean;
  style?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  tabIndex?: NumberOrCallback;
  text?: string[] | StringOrNumberOrCallback;
  textAnchor?: TextAnchorType | { (): TextAnchorType };
  title?: string;
  transform?: string | {} | { (): string | {} };
  verticalAnchor?: VerticalAnchorType | { (): VerticalAnchorType };
  x?: number;
  y?: number;
  dx?: StringOrNumberOrCallback;
  dy?: StringOrNumberOrCallback;
}

export class VictoryLabel extends React.Component<VictoryLabelProps, any> {}

// #endregion

// #region Victory Container

export interface VictoryContainerProps {
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  containerId?: number | string;
  containerRef?: React.Ref<HTMLElement>;
  desc?: string;
  events?: React.DOMAttributes<any>;
  height?: number;
  name?: string;
  origin?: OriginType;
  ouiaId?: number | string;
  ouiaSafe?: boolean;
  ouiaType?: string;
  polar?: boolean;
  portalComponent?: React.ReactElement;
  portalZIndex?: number;
  preserveAspectRatio?: string;
  responsive?: boolean;
  role?: string;
  scale?: {
    x?: D3Scale;
    y?: D3Scale;
  };
  style?: React.CSSProperties;
  tabIndex?: number;
  theme?: VictoryThemeDefinition;
  title?: string;
  width?: number;
}

export class VictoryContainer extends React.Component<
  VictoryContainerProps,
  any
> {}

// #endregion

// #region Victory Clip Container

export interface VictoryClipContainerProps {
  "aria-label"?: string;
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
  origin?: OriginType;
  polar?: boolean;
  radius?: number;
  rectComponent?: React.ReactElement;
  translateX?: number;
  translateY?: number;
}

export class VictoryClipContainer extends React.Component<
  VictoryClipContainerProps,
  any
> {}

// #endregion

// #region Victory Accessibile Group

export interface VictoryAccessibleGroupProps {
  desc?: string;
  "aria-describedby"?: string;
  "aria-label": string;
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  tabIndex?: number;
}

export class VictoryAccessibleGroup extends React.Component<
  VictoryAccessibleGroupProps,
  any
> {}

// #endregion

// #region Victory Theme
// Note: Many SVG attributes are missed in CSSProperties interface
export interface VictoryThemeDefinition {
  area?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  axis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    offsetX?: number;
    offsetY?: number;
  } & VictoryCommonThemeProps;
  bar?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  boxplot?: {
    style?: {
      max?: VictoryStyleObject;
      maxLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      median?: VictoryStyleObject;
      medianLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      min?: VictoryStyleObject;
      minLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      q1?: VictoryStyleObject;
      q1Labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      q3?: VictoryStyleObject;
      q3Labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    boxWidth?: number;
  } & VictoryCommonThemeProps;
  candlestick?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    candleColors?: {
      positive?: string;
      negative?: string;
    };
  } & VictoryCommonThemeProps;
  chart?: VictoryCommonThemeProps;
  dependentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    offsetX?: number;
    offsetY?: number;
    orientation?: OrientationTypes;
  } & VictoryCommonThemeProps;
  errorbar?: {
    borderWidth?: number;
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  group?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  histogram?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  independentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    offsetX?: number;
    offsetY?: number;
    orientation?: OrientationTypes;
  } & VictoryCommonThemeProps;
  legend?: {
    gutter?: number | BlockProps;
    rowGutter?: number | BlockProps;
    orientation?: string;
    titleOrientation?: string;
    style?: {
      data?: VictoryStyleObject & {
        type?: string;
      };
      border?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      title?: VictoryLabelStyleObject;
    };
    itemsPerRow?: number;
    x?: number;
    y?: number;
    centerTitle?: boolean;
    borderPadding?: number | BlockProps;
  } & VictoryCommonThemeProps;
  line?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  pie?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  polarAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  polarDependentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  polarIndependentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  scatter?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  stack?: VictoryCommonThemeProps;
  tooltip?: {
    style?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    flyoutStyle?: VictoryStyleObject;
    cornerRadius?: NumberOrCallback;
    pointerLength?: NumberOrCallback;
    flyoutPadding?: PaddingOrCallback;
    flyoutWidth?: NumberOrCallback;
    flyoutHeight?: NumberOrCallback;
    orientation?: OrientationOrCallback;
    pointerOrientation?: OrientationOrCallback;
  };
  voronoi?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      flyout?: VictoryStyleObject;
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
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
  animationWhitelist?: string[];
}

export interface EventCallbackInterface<TTarget, TEventKey> {
  childName?: string | string[];
  target?: TTarget;
  eventKey?: TEventKey;
  mutation: (props: any) => any;
  callback?: (props: any) => any;
}

export interface EventPropTypeInterface<TTarget, TEventKey> {
  childName?: string | Array<StringOrNumberOrCallback>;
  target: TTarget;
  eventKey?: TEventKey;
  eventHandlers: {
    [key: string]:
      | {
          (
            event: React.SyntheticEvent<any>,
            props?: any
          ): EventCallbackInterface<TTarget, TEventKey>;
        }
      | {
          (
            event: React.SyntheticEvent<any>,
            props?: any
          ): EventCallbackInterface<TTarget, TEventKey>[];
        }
      | {
          (event: React.SyntheticEvent<any>, props?: any): void;
        };
  };
}

export type DomainTuple = [number, number] | [Date, Date];
export type DomainPropObjectType =
  | { x?: DomainTuple; y: DomainTuple }
  | { x: DomainTuple; y?: DomainTuple };
export type DomainPropType = DomainPropObjectType | DomainTuple;

export type PaddingType = number | [number, number];
export type DomainPaddingPropType =
  | PaddingType
  | {
      x?: PaddingType;
      y?: PaddingType;
    };

export type RangeTuple = [number, number];
export type RangePropType = RangeTuple | { x?: RangeTuple; y?: RangeTuple };

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
  | { (data: any): number | string | string[] }
  | Function;

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

export type SortOrderPropType = "ascending" | "descending";

export type SVGCoordinateType = { x: number; y: number };

export interface VictoryCommonThemeProps {
  animate?: boolean | AnimatePropTypeInterface;
  colorScale?: ColorScalePropType;
  containerComponent?: React.ReactElement;
  domainPadding?: DomainPaddingPropType;
  externalEventMutations?: EventCallbackInterface<
    string | string[],
    StringOrNumberOrList
  >[];
  groupComponent?: React.ReactElement;
  height?: number;
  horizontal?: boolean;
  maxDomain?: number | { x?: number; y?: number };
  minDomain?: number | { x?: number; y?: number };
  name?: string;
  origin?: OriginType;
  padding?: PaddingProps;
  polar?: boolean;
  range?: RangePropType;
  scale?:
    | ScalePropType
    | D3Scale
    | {
        x?: ScalePropType | D3Scale;
        y?: ScalePropType | D3Scale;
      };
  sharedEvents?: { events: any[]; getEventState: Function };
  singleQuadrantDomainPadding?: boolean | { x?: boolean; y?: boolean };
  standalone?: boolean;
  width?: number;
}

export interface VictoryCommonProps extends VictoryCommonThemeProps {
  theme?: VictoryThemeDefinition;
}

export interface VictoryCommonPrimitiveProps {
  active?: boolean;
  ariaLabel?: StringOrCallback;
  className?: string;
  clipPath?: string;
  data?: any;
  desc?: string | Function;
  disableInlineStyles?: boolean;
  events?: object;
  id?: number | string | Function;
  index?: number | string;
  origin?: OriginType;
  polar?: boolean;
  role?: string;
  scale?: any;
  shapeRendering?: string;
  style?: any;
  tabIndex?: NumberOrCallback;
  transform?: string;
}

export interface VictoryDatableProps {
  categories?: CategoryPropType;
  data?: any[];
  dataComponent?: React.ReactElement;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  samples?: number;
  sortKey?: DataGetterPropType;
  sortOrder?: SortOrderPropType;
  x?: DataGetterPropType;
  y?: DataGetterPropType;
  y0?: DataGetterPropType;
}

export interface VictoryLabelableProps {
  labelComponent?: React.ReactElement;
}

export interface VictoryMultiLabelableProps extends VictoryLabelableProps {
  labels?:
    | string[]
    | number[]
    | { (data: any): string | string[] | number | number[] | null };
}

export interface VictorySingleLabelableProps extends VictoryLabelableProps {
  label?: string | { (data: any): string | number | null };
}

export namespace Selection {
  export function getParentSVG(evt: React.SyntheticEvent): string;
  export function getSVGEventCoordinates(
    evt: React.SyntheticEvent,
    svg?: SVGElement
  ): SVGCoordinateType;
  export function getDomainCoordinates(
    props: any,
    domain?: DomainPropType
  ): DomainPropType;
  export function getDataCoordinates(
    props: any,
    scale: ScalePropType,
    x: number,
    y: number
  ): SVGCoordinateType;
  export function getBounds(props: any): SVGCoordinateType;
}

export interface TextSizeStyleInterface {
  angle?: number;
  characterConstant?: string;
  fontFamily?: string;
  fontSize?: number | string;
  letterSpacing?: string;
  lineHeight?: number;
}

export namespace TextSize {
  export function approximateTextSize(
    text: string,
    style?: TextSizeStyleInterface
  ): { width: number; height: number };
  export function convertLengthToPixels(
    length: string,
    fontSize: number
  ): number;
}

// #endregion

// #region Victory Portal

export interface PortalProps {
  className?: string;
  height: number;
  style?: React.CSSProperties;
  viewBox?: string;
  width: number;
}

export class Portal extends React.Component<PortalProps, any> {}

export interface VictoryPortalProps {
  children?: React.ReactElement;
  groupComponent?: React.ReactElement;
}

export class VictoryPortal extends React.Component<VictoryPortalProps, any> {}

// #endregion

// #region Victory Primitives
export interface ArcProps extends VictoryCommonPrimitiveProps {
  closedPath?: boolean;
  cx?: number;
  cy?: number;
  datum?: any;
  endAngle?: number;
  pathComponent?: React.ReactElement;
  r?: number;
  startAngle?: number;
}

export class Arc extends React.Component<ArcProps> {}

export interface BackgroundProps extends VictoryCommonPrimitiveProps {
  circleComponent?: React.ReactElement;
  height?: number;
  rectComponent?: React.ReactElement;
  rx?: number;
  ry?: number;
  width?: number;
  x?: number;
  y?: number;
}

export class Background extends React.Component<BackgroundProps> {}

export interface BorderProps extends VictoryCommonPrimitiveProps {
  width?: number;
  height?: number;
  rectComponent?: React.ReactElement;
  x?: number;
  y?: number;
}

export class Border extends React.Component<BorderProps> {}

export interface ClipPathProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode[] | React.ReactNode;
  clipId?: number | string;
}

export class ClipPath extends React.Component<ClipPathProps> {}

export interface LineSegmentProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  lineComponent?: React.ReactElement;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export class LineSegment extends React.Component<LineSegmentProps> {}

export interface PointProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  getPath?: (x: number, y: number, size: number) => string;
  pathComponent?: React.ReactElement;
  size?: number | Function;
  symbol?: ScatterSymbolType | Function;
  x?: number;
  y?: number;
}

export class Point extends React.Component<PointProps> {}

export interface TextProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  desc?: string;
  title?: string;
}

export class Text extends React.Component<TextProps> {}

export type WhiskerAxes = {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
};

export interface WhiskerProps extends VictoryCommonPrimitiveProps {
  groupComponent?: React.ReactElement;
  lineComponent?: React.ReactElement;
  majorWhisker?: WhiskerAxes;
  minorWhisker?: WhiskerAxes;
}

export class Whisker extends React.Component<WhiskerProps> {}

export interface VictoryPrimitiveShapeProps
  extends VictoryCommonPrimitiveProps {
  desc?: string;
  rx?: number;
  ry?: number;
}

export class Circle extends React.Component<VictoryPrimitiveShapeProps> {}

export class Line extends React.Component<VictoryPrimitiveShapeProps> {}

export class Path extends React.Component<VictoryPrimitiveShapeProps> {}

export class Rect extends React.Component<VictoryPrimitiveShapeProps> {}

export class TSpan extends React.Component<VictoryCommonPrimitiveProps> {}

// #endregion
