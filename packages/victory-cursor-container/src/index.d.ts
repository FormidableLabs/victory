import * as React from "react";
import {
  VictoryContainerProps,
  CoordinatesPropType,
  CallbackArgs,
} from "victory-core";

export type CursorCoordinatesPropType = CoordinatesPropType | number;

export interface VictoryCursorContainerProps extends VictoryContainerProps {
  cursorComponent?: React.ReactElement;
  cursorDimension?: "x" | "y";
  cursorLabel?: (point: CoordinatesPropType, args: CallbackArgs) => any | void;
  cursorLabelComponent?: React.ReactElement;
  cursorLabelOffset?: CursorCoordinatesPropType;
  defaultCursorValue?: CursorCoordinatesPropType;
  disable?: boolean;
  onCursorChange?: (
    value: CursorCoordinatesPropType,
    props: VictoryCursorContainerProps,
  ) => void;
}

export class VictoryCursorContainer extends React.Component<
  VictoryCursorContainerProps,
  any
> {}

export const CursorHelpers: {
  getDimension(props): any;
  withinBounds(point, bounds): any;
  onMouseMove(evt, targetProps): any;
  onMouseLeave(evt, targetProps): any;
  onTouchEnd(evt, targetProps): any;
};

export const cursorContainerMixin: (base: Function) => Function;
