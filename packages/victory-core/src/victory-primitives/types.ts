import type React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
import type { NonSvgProp } from "./svg-props";

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
 * `ref`, the props the primitives don't write to the element (`name`, ...),
 * and the props Victory types itself (`TOwnProps`), whose types win.
 */
export type VictoryPrimitiveSvgProps<
  TElement extends SVGElement,
  TOwnProps = object,
> = Omit<React.SVGProps<TElement>, keyof TOwnProps | NonSvgProp | "ref">;

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
