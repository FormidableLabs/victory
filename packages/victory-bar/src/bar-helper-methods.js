import { assign, isNil, isPlainObject } from "lodash";
import { Helpers } from "victory-core";

export const getBarWidth = (barWidth, props) => {
  const { scale, data, defaultBarWidth, style } = props;
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
    barRatio * (data.length < 2 ? defaultBarWidth : extent / bars);
  return Math.max(1, defaultWidth);
};

const getCornerRadiusFromObject = (cornerRadius, props) => {
  const realCornerRadius = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };
  const updateCornerRadius = (corner, fallback) => {
    if (!isNil(cornerRadius[corner])) {
      realCornerRadius[corner] = Helpers.evaluateProp(
        cornerRadius[corner],
        props,
      );
    } else if (!isNil(cornerRadius[fallback])) {
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

export const getCornerRadius = (cornerRadius, props) => {
  const realCornerRadius = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };
  if (!cornerRadius) {
    return realCornerRadius;
  }
  if (isPlainObject(cornerRadius)) {
    return getCornerRadiusFromObject(cornerRadius, props);
  }
  realCornerRadius.topLeft = Helpers.evaluateProp(cornerRadius, props);
  realCornerRadius.topRight = Helpers.evaluateProp(cornerRadius, props);
  return realCornerRadius;
};

export const getStyle = (style = {}, props) => {
  if (props.disableInlineStyles) {
    return {};
  }
  const stroke = style.fill || "black";
  const baseStyle = { fill: "black", stroke };
  return Helpers.evaluateStyle(assign(baseStyle, style), props);
};
