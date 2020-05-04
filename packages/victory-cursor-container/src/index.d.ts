import * as React from "react";
import { VictoryContainerProps, CoordinatesPropType } from "victory-core";

export interface VictoryCursorContainerProps extends VictoryContainerProps {
  cursorComponent?: React.ReactElement;
  cursorDimension?: "x" | "y";
  cursorLabel?: (point: CoordinatesPropType) => any | void;
  cursorLabelComponent?: React.ReactElement;
  cursorLabelOffset?: number | CoordinatesPropType;
  defaultCursorValue?: number | CoordinatesPropType;
  disable?: boolean;
  onCursorChange?: (value: CoordinatesPropType, props: VictoryCursorContainerProps) => void;
}

export class VictoryCursorContainer extends React.Component<VictoryCursorContainerProps, any> {}
