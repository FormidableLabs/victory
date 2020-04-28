import * as React from "react";
import { VictoryContainerProps, CursorData } from "victory-core";

export interface VictoryCursorContainerProps extends VictoryContainerProps {
  cursorComponent?: React.ReactElement;
  cursorDimension?: "x" | "y";
  cursorLabel?: (point: CursorData) => any | void;
  cursorLabelComponent?: React.ReactElement;
  cursorLabelOffset?: number | CursorData;
  defaultCursorValue?: number | CursorData;
  disable?: boolean;
  onCursorChange?: (value: CursorData, props: VictoryCursorContainerProps) => void;
}

export class VictoryCursorContainer extends React.Component<VictoryCursorContainerProps, any> {}
