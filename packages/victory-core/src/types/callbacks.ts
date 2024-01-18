import { D3Scale, Datum, ID, ScalePropType } from "./prop-types";
import { BlockProps, OrientationTypes } from "../victory-theme/types";

/**
 * This is the first parameter of a callback when a callback is used to
 * resolve the value of a property instead of a concrete value.
 *
 * Note that additional properties here like `scale`, `x`, `y`, etc are resolved
 * values of properties from the VictoryXXXProps for each component.
 */
export interface CallbackArgs {
  active?: boolean;
  data?: Datum[];
  datum?: Datum;
  horizontal?: boolean;
  index?: ID;
  x?: number;
  y?: number;
  scale?:
    | ScalePropType
    | D3Scale
    | {
        x?: ScalePropType | D3Scale;
        y?: ScalePropType | D3Scale;
      };
  tick?: any;
  ticks?: any;
  text?: any;
}

export type VictoryStringOrNumberCallback = (
  args: CallbackArgs,
) => string | number;

export type VictoryStringCallback = (args: CallbackArgs) => string;
export type StringOrNumberOrCallback =
  | string
  | number
  | VictoryStringOrNumberCallback;
export type StringOrCallback = string | VictoryStringCallback;
export type SliceNumberOrCallback<
  T,
  P extends string | number | symbol = never,
> = number | ((props: Omit<T, P>) => number);
export type VictoryNumberCallback = (args: CallbackArgs) => number;
export type VictoryPaddingCallback = (
  args: CallbackArgs,
) => number | BlockProps;
export type VictoryOrientationCallback = (
  args: CallbackArgs,
) => OrientationTypes;
export type NumberOrCallback = number | VictoryNumberCallback;
export type PaddingOrCallback = number | BlockProps | VictoryPaddingCallback;
export type OrientationOrCallback =
  | OrientationTypes
  | VictoryOrientationCallback;
