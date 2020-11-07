import * as React from "react";
import { VictoryContainerProps, CoordinatesPropType, CallbackArgs } from "victory-core";

export interface VictoryCursorContainerProps extends VictoryContainerProps {
  cursorComponent?: React.ReactElement;
  cursorDimension?: "x" | "y";
  cursorLabel?: (point: CoordinatesPropType, args: CallbackArgs) => any | void;
  cursorLabelComponent?: React.ReactElement;
  cursorLabelOffset?: number | CoordinatesPropType;
  defaultCursorValue?: number | CoordinatesPropType;
  disable?: boolean;
  onCursorChange?: (value: CoordinatesPropType, props: VictoryCursorContainerProps) => void;
}

export class VictoryCursorContainer extends React.Component<VictoryCursorContainerProps, any> {}
