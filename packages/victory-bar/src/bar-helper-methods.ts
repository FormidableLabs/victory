import { isPlainObject } from "lodash";
import { Helpers, VictoryStyleObject } from "victory-core";
import { BarProps } from "./bar";
import {
  VictoryBarCornerRadiusObject,
  VictoryBarCornerRadiusKey,
} from "./victory-bar";

const DEFAULT_BAR_WIDTH = 8;

export const getBarWidth = (
  barWidth: BarProps["barWidth"],
  props: BarProps,
) => {
  const { scale, data, style } = props;
  if (barWidth) {
    return Helpers.evaluateProp(barWidth, props);
  } else if (style.width) {
    return style.width;
  }
  const range = scale.x.range();
  const extent = Math.abs(range[1] - range[0]);
  const bars = data.length + 2;
  const barRatio = props.barRatio || 0.5;
  const defaultWidth =
    barRatio * (data.length < 2 ? DEFAULT_BAR_WIDTH : extent / bars);
  return Math.max(1, defaultWidth);
};

const getCornerRadiusFromObject = (
  cornerRadius: VictoryBarCornerRadiusObject,
  props: BarProps,
) => {
  const realCornerRadius: VictoryBarCornerRadiusObject = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };
  const updateCornerRadius = (
    corner: VictoryBarCornerRadiusKey,
    fallback: "top" | "bottom",
  ) => {
    if (!Helpers.isNil(cornerRadius[corner])) {
      realCornerRadius[corner] = Helpers.evaluateProp(
        cornerRadius[corner],
        props,
      );
    } else if (!Helpers.isNil(cornerRadius[fallback])) {
      realCornerRadius[corner] = Helpers.evaluateProp(
        cornerRadius[fallback],
        props,
      );
    }
  };
  updateCornerRadius("topLeft", "top");
  updateCornerRadius("topRight", "top");
  updateCornerRadius("bottomLeft", "bottom");
  updateCornerRadius("bottomRight", "bottom");
  return realCornerRadius;
};

function isCornerRadiusObject(
  cornerRadius: BarProps["cornerRadius"],
): cornerRadius is VictoryBarCornerRadiusObject {
  return isPlainObject(cornerRadius);
}

export const getCornerRadius = (
  cornerRadius: BarProps["cornerRadius"],
  props: BarProps,
) => {
  const realCornerRadius: VictoryBarCornerRadiusObject = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };
  if (!cornerRadius) {
    return realCornerRadius;
  }
  if (isCornerRadiusObject(cornerRadius)) {
    return getCornerRadiusFromObject(cornerRadius, props);
  }
  realCornerRadius.topLeft = Helpers.evaluateProp(cornerRadius, props);
  realCornerRadius.topRight = Helpers.evaluateProp(cornerRadius, props);
  return realCornerRadius;
};

export const getStyle = (style: VictoryStyleObject = {}, props: BarProps) => {
  if (props.disableInlineStyles) {
    return {};
  }
  const stroke = style.fill || "black";
  const baseStyle = { fill: "black", stroke };
  return Helpers.evaluateStyle(Object.assign(baseStyle, style), props);
};
