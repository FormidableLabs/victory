import { AxisType, Padding, RangeTuple } from "../../../types/prop-types";
import { getPadding } from "../../../victory-util/helpers";
import { getValueForAxis, isTuple } from "../../../victory-util/type-helpers";
import { VictoryProviderProps } from "../types";

type RangeProps = Pick<
  VictoryProviderProps,
  "range" | "padding" | "height" | "width"
>;

// TODO: Should we store these defaults somewhere?
const DEFAULT_HEIGHT = 300;
const DEFAULT_WIDTH = 450;

// TODO: This does not include polar range
export function getRange(
  {
    range,
    height = DEFAULT_HEIGHT,
    width = DEFAULT_WIDTH,
    ...props
  }: RangeProps,
  axis: AxisType,
) {
  const rangeFromProps = getValueForAxis<RangeTuple>(range, axis);

  if (isTuple(rangeFromProps)) {
    return rangeFromProps;
  }

  // TODO: Convert this to TS
  const padding = getPadding({ padding: props.padding }) as Padding;
  const rangeForAxis = {
    x: [padding.left, width - padding.right],
    y: [height - padding.top, padding.bottom],
  };

  return rangeForAxis[axis];
}
