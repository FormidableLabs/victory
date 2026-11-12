import type React from "react";
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

/**
 * The SVG attributes of a primitive's element (`x1`, `d`, `cx`, ...), less
 * `ref` and the props Victory types itself (`TOwnProps`), whose types win.
 */
export type VictoryPrimitiveSvgProps<
  TElement extends SVGElement,
  TOwnProps,
> = Omit<React.SVGProps<TElement>, keyof TOwnProps | "ref">;

interface VictoryPrimitiveShapeOwnProps extends VictoryCommonPrimitiveProps {
  desc?: string;
  rx?: number;
  ry?: number;
}

export interface VictoryPrimitiveShapeProps<
  TElement extends SVGElement = SVGElement,
>
  extends
    VictoryPrimitiveShapeOwnProps,
    VictoryPrimitiveSvgProps<TElement, VictoryPrimitiveShapeOwnProps> {}
