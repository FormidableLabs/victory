import * as React from "react";
import { OriginType } from "../victory-label/victory-label";
import {
  NumberOrCallback,
  PaddingProps,
  VictoryThemeDefinition
} from "../victory-theme/victory-theme";
import {
  StringOrCallback,
  StringOrNumberOrCallback,
  Tuple,
  ValueOrAccessor,
  ValueOrAxes
} from "../types";
import {
  AnimationEasing,
  AnimationStyle
} from "../victory-animation/victory-animation";

export type DomainPaddingPropType = ValueOrAxes<PaddingType>;
export type DomainPropType = ValueOrAxes<DomainTuple>;
export type DomainTuple = Tuple<DomainValue>;
export type DomainValue = number | Date;
export type PaddingType = number | Tuple<number>;
export type RangePropType = ValueOrAxes<RangeTuple>;
export type RangeTuple = Tuple<number>;
export type StringOrNumberOrList = string | number | (string | number)[];

export interface Padding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

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

/**
 * D3 scale function shape. Don't want to introduce typing dependency to d3
 */
export interface D3Scale {
  (input: string | number): number;
  domain: () => Tuple<number>;
  range: () => Tuple<number>;
  copy: () => D3Scale;
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

export type DataGetterPropType = ValueOrAccessor<string | number | number[]>;

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
  maxDomain?: ValueOrAxes<number>;
  minDomain?: ValueOrAxes<number>;
  name?: string;
  origin?: OriginType;
  padding?: PaddingProps;
  polar?: boolean;
  range?: RangePropType;
  scale?: ValueOrAxes<ScalePropType | D3Scale>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  sharedEvents?: { events: any[]; getEventState: Function };
  singleQuadrantDomainPadding?: ValueOrAxes<boolean>;
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  desc?: string | Function;
  disableInlineStyles?: boolean;
  events?: object;
  // eslint-disable-next-line @typescript-eslint/ban-types
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

export interface TextSizeStyleInterface {
  angle?: number;
  characterConstant?: string;
  fontFamily?: string;
  fontSize?: number | string;
  letterSpacing?: string;
  lineHeight?: number;
}
