import * as React from "react";
import { StringOrNumberOrCallback } from "./callbacks";
import {
  AnimationEasing,
  AnimationStyle
} from "../victory-animation/victory-animation";

export type StringOrNumberOrList = string | number | (string | number)[];

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
  // eslint-disable-next-line @typescript-eslint/ban-types
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

export type CoordinatesPropType = {
  x: number;
  y: number;
};
