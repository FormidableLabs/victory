/* eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2, 45, 90, 135, 180, 225, 270, 315, 360] }]*/
import { defaults, isPlainObject } from "lodash";
import * as d3Shape from "victory-vendor/d3-shape";

import { Helpers, Data, Style } from "victory-core";

const checkForValidText = (text) => {
  if (text === undefined || text === null || Helpers.isFunction(text)) {
    return text;
  }
  return `${text}`;
};

const getColor = (style, colors, index) => {
  if (style && style.data && style.data.fill) {
    return style.data.fill;
  }
  return colors && colors[index % colors.length];
};

const getRadius = (props, padding) => {
  if (typeof props.radius === "number") {
    return props.radius;
  }
  return (
    Math.min(
      props.width - padding.left - padding.right,
      props.height - padding.top - padding.bottom,
    ) / 2
  );
};

const getOrigin = (props, padding) => {
  const { width, height } = props;
  const origin = isPlainObject(props.origin) ? props.origin : {};
  return {
    x:
      origin.x !== undefined
        ? origin.x
        : (padding.left - padding.right + width) / 2,
    y:
      origin.y !== undefined
        ? origin.y
        : (padding.top - padding.bottom + height) / 2,
  };
};

const getSlices = (props, data) => {
  const padAngle = Helpers.isFunction(props.padAngle) ? 0 : props.padAngle;
  const layoutFunction = d3Shape
    .pie()
    .sort(null)
    .startAngle(Helpers.degreesToRadians(props.startAngle))
    .endAngle(Helpers.degreesToRadians(props.endAngle))
    .padAngle(Helpers.degreesToRadians(padAngle))
    .value((datum: any) => {
      return datum._y;
    });
  return layoutFunction(data);
};

const getCalculatedValues = (props) => {
  const { colorScale } = props;
  const styleObject = Helpers.getDefaultStyles(props, "pie");
  const style = Helpers.getStyles(props.style, styleObject);
  const colors = Array.isArray(colorScale)
    ? colorScale
    : Style.getColorScale(colorScale);
  const padding = Helpers.getPadding(props);
  const defaultRadius = getRadius(props, padding);
  const origin = getOrigin(props, padding);
  const data = Data.getData(props);
  const slices = getSlices(props, data);
  return Object.assign({}, props, {
    style,
    colors,
    padding,
    defaultRadius,
    data,
    slices,
    origin,
  });
};

const getSliceStyle = (index, calculatedValues) => {
  const { style, colors } = calculatedValues;
  const fill = getColor(style, colors, index);
  return Object.assign({ fill }, style.data);
};

const getLabelText = (props, datum, index) => {
  let text;
  if (datum.label) {
    text = datum.label;
  } else if (Array.isArray(props.labels)) {
    text = props.labels[index];
  } else {
    text = Helpers.isFunction(props.labels)
      ? props.labels
      : datum.xName || datum._x;
  }
  return checkForValidText(text);
};

const getLabelArc = (labelRadius) => {
  return d3Shape.arc().outerRadius(labelRadius).innerRadius(labelRadius);
};

const getCalculatedLabelRadius = (radius, labelRadius, style) => {
  const padding = (style && style.padding) || 0;
  return labelRadius || radius + padding;
};

const getLabelPosition = (arc, slice, position) => {
  const construct = {
    startAngle: position === "startAngle" ? slice.startAngle : slice.endAngle,
    endAngle: position === "endAngle" ? slice.endAngle : slice.startAngle,
  };
  const clonedArc = Object.assign({}, slice, construct);
  return arc.centroid(clonedArc);
};

const getLabelOrientation = (degree, labelPlacement) => {
  if (labelPlacement === "perpendicular") {
    return degree > 90 && degree < 270 ? "bottom" : "top";
  } else if (labelPlacement === "parallel") {
    return degree >= 0 && degree <= 180 ? "right" : "left";
  }
  if (degree < 45 || degree > 315) {
    return "top";
  } else if (degree >= 45 && degree < 135) {
    return "right";
  } else if (degree >= 135 && degree < 225) {
    return "bottom";
  }
  return "left";
};

const getTextAnchor = (orientation) => {
  if (orientation === "top" || orientation === "bottom") {
    return "middle";
  }
  return orientation === "right" ? "start" : "end";
};

const getVerticalAnchor = (orientation) => {
  if (orientation === "left" || orientation === "right") {
    return "middle";
  }
  return orientation === "bottom" ? "start" : "end";
};

const getBaseLabelAngle = (slice, labelPosition, labelStyle) => {
  let baseAngle = 0;
  if (labelPosition.angle !== undefined) {
    baseAngle = labelStyle.angle;
  } else if (labelPosition === "centroid") {
    baseAngle = Helpers.radiansToDegrees(
      (slice.startAngle + slice.endAngle) / 2,
    );
  } else {
    baseAngle =
      labelPosition === "startAngle"
        ? Helpers.radiansToDegrees(slice.startAngle)
        : Helpers.radiansToDegrees(slice.endAngle);
  }
  const positiveAngle = baseAngle < 0 ? 360 - baseAngle : baseAngle;
  return positiveAngle % 360;
};

const getLabelAngle = (baseAngle, labelPlacement) => {
  if (labelPlacement === "vertical") {
    return 0;
  }
  if (labelPlacement === "parallel") {
    return baseAngle > 180 && baseAngle < 360 ? baseAngle + 90 : baseAngle - 90;
  }
  return baseAngle > 90 && baseAngle < 270 ? baseAngle - 180 : baseAngle;
};

const getLabelProps = (text, dataProps, calculatedValues) => {
  const { index, datum, data, slice, labelComponent, theme } = dataProps;
  const { style, defaultRadius, origin, width, height } = calculatedValues;
  const labelRadius = Helpers.evaluateProp(
    calculatedValues.labelRadius,
    Object.assign({ text }, dataProps),
  );
  const labelPosition =
    Helpers.evaluateProp(
      calculatedValues.labelPosition,
      Object.assign({ text }, dataProps),
    ) || "centroid";
  const labelPlacement =
    Helpers.evaluateProp(
      calculatedValues.labelPlacement,
      Object.assign({ text }, dataProps),
    ) || "vertical";
  const labelStyle = Object.assign({ padding: 0 }, style.labels);
  const evaluatedStyle = Helpers.evaluateStyle(
    labelStyle,
    Object.assign({ labelRadius, text }, dataProps),
  );
  const calculatedLabelRadius = getCalculatedLabelRadius(
    defaultRadius,
    labelRadius,
    evaluatedStyle,
  );
  const labelArc = getLabelArc(calculatedLabelRadius);
  const position = getLabelPosition(labelArc, slice, labelPosition);
  const baseAngle = getBaseLabelAngle(slice, labelPosition, labelStyle);
  const labelAngle = getLabelAngle(baseAngle, labelPlacement);
  const orientation = getLabelOrientation(baseAngle, labelPlacement);
  const textAnchor = labelStyle.textAnchor || getTextAnchor(orientation);
  const verticalAnchor =
    labelStyle.verticalAnchor || getVerticalAnchor(orientation);

  const labelProps = {
    width,
    height,
    index,
    datum,
    data,
    slice,
    orientation,
    text,
    style: labelStyle,
    x: Math.round(position[0]) + origin.x,
    y: Math.round(position[1]) + origin.y,
    textAnchor,
    verticalAnchor,
    angle: labelAngle,
    calculatedLabelRadius,
  };

  if (!Helpers.isTooltip(labelComponent)) {
    return labelProps;
  }
  const tooltipTheme = (theme && theme.tooltip) || {};
  return defaults({}, labelProps, Helpers.omit(tooltipTheme, ["style"]));
};

export const getXOffsetMultiplayerByAngle = (angle) =>
  Math.cos(angle - Helpers.degreesToRadians(90));
export const getYOffsetMultiplayerByAngle = (angle) =>
  Math.sin(angle - Helpers.degreesToRadians(90));
export const getXOffset = (offset, angle) =>
  offset * getXOffsetMultiplayerByAngle(angle);
export const getYOffset = (offset, angle) =>
  offset * getYOffsetMultiplayerByAngle(angle);
export const getAverage = (array) =>
  array.reduce((acc, cur) => acc + cur, 0) / array.length;

export const getLabelIndicatorPropsForLineSegment = (
  props,
  calculatedValues,
  labelProps,
) => {
  const {
    innerRadius,
    radius,
    slice: { startAngle, endAngle },
    labelIndicatorInnerOffset,
    labelIndicatorOuterOffset,
    index,
  } = props;

  const { height, width } = calculatedValues;
  const { calculatedLabelRadius } = labelProps;
  // calculation
  const middleRadius = getAverage([innerRadius, radius]);
  const midAngle = getAverage([endAngle, startAngle]);
  const centerX = width / 2;
  const centerY = height / 2;
  const innerOffset = middleRadius + labelIndicatorInnerOffset;
  const outerOffset = calculatedLabelRadius - labelIndicatorOuterOffset;

  const x1 = centerX + getXOffset(innerOffset, midAngle);
  const y1 = centerY + getYOffset(innerOffset, midAngle);

  const x2 = centerX + getXOffset(outerOffset, midAngle);
  const y2 = centerY + getYOffset(outerOffset, midAngle);

  const labelIndicatorProps = {
    x1,
    y1,
    x2,
    y2,
    index,
  };
  return defaults({}, labelIndicatorProps);
};

export const getBaseProps = (initialProps, fallbackProps) => {
  const props = Helpers.modifyProps(initialProps, fallbackProps, "pie");
  const calculatedValues = getCalculatedValues(props);
  const {
    slices,
    style,
    data,
    origin,
    defaultRadius,
    labels,
    events,
    sharedEvents,
    height,
    width,
    standalone,
    name,
    innerRadius,
    cornerRadius,
    padAngle,
    disableInlineStyles,
    labelIndicator,
  } = calculatedValues;
  const radius = props.radius || defaultRadius;
  const initialChildProps = {
    parent: { standalone, height, width, slices, name, style: style.parent },
  };

  return slices.reduce((childProps, slice, index) => {
    const datum = defaults({}, data[index], {
      startAngle: Helpers.radiansToDegrees(slice.startAngle),
      endAngle: Helpers.radiansToDegrees(slice.endAngle),
      padAngle: Helpers.radiansToDegrees(slice.padAngle),
    });
    const eventKey = !Helpers.isNil(datum.eventKey) ? datum.eventKey : index;
    const dataProps = {
      index,
      slice,
      datum,
      data,
      origin,
      innerRadius,
      radius,
      cornerRadius,
      padAngle,
      style: disableInlineStyles ? {} : getSliceStyle(index, calculatedValues),
      disableInlineStyles,
    };
    childProps[eventKey] = {
      data: dataProps,
    };
    const text = getLabelText(props, datum, index);
    if (
      (text !== undefined && text !== null) ||
      (labels && (events || sharedEvents))
    ) {
      const evaluatedText = Helpers.evaluateProp(text, dataProps);
      childProps[eventKey].labels = getLabelProps(
        evaluatedText,
        Object.assign({}, props, dataProps),
        calculatedValues,
      );
      if (labelIndicator) {
        const labelProps = childProps[eventKey].labels;
        if (labelProps.calculatedLabelRadius > radius) {
          childProps[eventKey].labelIndicators =
            getLabelIndicatorPropsForLineSegment(
              Object.assign({}, props, dataProps),
              calculatedValues,
              labelProps,
            );
        }
      }
    }
    return childProps;
  }, initialChildProps);
};
