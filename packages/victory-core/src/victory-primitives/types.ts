import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

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

export interface VictoryPrimitiveShapeProps
  extends VictoryCommonPrimitiveProps {
  rx?: number;
  ry?: number;
}
