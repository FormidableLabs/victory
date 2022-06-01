/**
 * This is the first parameter of a callback when a callback is used to
 * resolve the value of a property instead of a concrete value.
 *
 * Note that additional properties here like `scale`, `x`, `y`, etc are resolved
 * values of properties from the VictoryXXXProps for each component.
 */
import type { D3Scale } from "./victory-util/types";

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
