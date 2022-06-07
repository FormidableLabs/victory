/**
 * This is the first parameter of a callback when a callback is used to
 * resolve the value of a property instead of a concrete value.
 *
 * Note that additional properties here like `scale`, `x`, `y`, etc are resolved
 * values of properties from the VictoryXXXProps for each component.
 */
import type { D3Scale } from "./victory-util/types";

export type Axis = "x" | "y";
export type Datum = object;
export type ForAxes<T> = T | { x?: T; y?: T };
export type ID = number | string;
export type ValueOrAccessor<ValueType = unknown, PropsType = object> =
  | ValueType
  | ((props: PropsType) => ValueType);
export type Tuple<T> = [T, T];
export type ValueOrAxesObject<T> = T | ForAxes<T>;

export interface CallbackArgs {
  active?: boolean;
  data?: Datum[];
  datum?: Datum;
  horizontal?: boolean;
  index: ID;
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

export type VictoryStringOrNumberCallback = (
  args: CallbackArgs
) => string | number;

export type VictoryStringCallback = (args: CallbackArgs) => string;
export type StringOrNumberOrCallback =
  | string
  | number
  | VictoryStringOrNumberCallback;
export type StringOrCallback = string | VictoryStringCallback;

export type SliceNumberOrCallback<
  T,
  P extends string | number | symbol = never
> = number | ((props: Omit<T, P>) => number);

export type CoordinatesPropType = {
  x: number;
  y: number;
};
