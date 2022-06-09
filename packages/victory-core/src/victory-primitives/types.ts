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
  desc?: string;
  rx?: number;
  ry?: number;
}
