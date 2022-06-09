import * as React from "react";
import { Axis, Tuple, ValueOrAxes } from "../../types";
import { PaddingProps } from "../../victory-theme/victory-theme-definition";
import { getValueForAxis, isTuple } from "../type-helpers";
import { RangeTuple } from "../types";
import { usePadding } from "./use-padding";

interface RangeProps {
  range?: ValueOrAxes<RangeTuple>;
  padding?: PaddingProps;
  height?: number;
  width?: number;
}

// TODO: Should we store these defaults somewhere?
const DEFAULT_HEIGHT = 300;
const DEFAULT_WIDTH = 450;

// TODO: This does not include polar range
export function useRange(
  {
    range,
    height = DEFAULT_HEIGHT,
    width = DEFAULT_WIDTH,
    ...props
  }: RangeProps,
  axis: Axis
) {
  const rangeFromProps = getValueForAxis<RangeTuple>(range, axis);
  const padding = usePadding(props.padding);

  if (isTuple(rangeFromProps)) {
    return rangeFromProps;
  }

  const rangeForAxis = {
    x: [padding.left, width - padding.right],
    y: [height - padding.top, padding.bottom]
  };

  return rangeForAxis[axis];
}
