/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2, 45, 90, 135, 180, 225, 270, 315, 360] }]*/
import { assign, defaults, isFunction, isPlainObject, isNil } from "lodash";
import * as d3Shape from "d3-shape";

import { Helpers, Data, Style } from "victory-core";

const checkForValidText = (text) => {
  if (text === undefined || text === null || isFunction(text)) {
    return text;
  } else {
    return `${text}`;
  }
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
      props.height - padding.top - padding.bottom
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
        : (padding.top - padding.bottom + height) / 2
  };
};

const getSlices = (props, data) => {
  const padAngle = isFunction(props.padAngle) ? 0 : props.padAngle;
  const layoutFunction = d3Shape
    .pie()
    .sort(null)
    .startAngle(Helpers.degreesToRadians(props.startAngle))
    .endAngle(Helpers.degreesToRadians(props.endAngle))
    .padAngle(Helpers.degreesToRadians(padAngle))
    .value((datum) => {
      return datum._y;
    });
  return layoutFunction(data);
};

const getCalculatedValues = (props) => {
  const { colorScale } = props;
  const styleObject = Helpers.getDefaultStyles(props, "pie");
  const style = Helpers.getStyles(props.style, styleObject, "auto", "100%");
  const colors = Array.isArray(colorScale)
    ? colorScale
    : Style.getColorScale(colorScale);
  const padding = Helpers.getPadding(props);
  const defaultRadius = getRadius(props, padding);
  const origin = getOrigin(props, padding);
  const data = Data.getData(props);
  const slices = getSlices(props, data);
  return assign({}, props, {
    style,
    colors,
    padding,
    defaultRadius,
    data,
    slices,
    origin
  });
};

const getSliceStyle = (index, calculatedValues) => {
  const { style, colors } = calculatedValues;
  const fill = getColor(style, colors, index);
  return assign({ fill }, style.data);
};

const getLabelText = (props, datum, index) => {
  let text;
  if (datum.label) {
    text = datum.label;
  } else if (Array.isArray(props.labels)) {
    text = props.labels[index];
  } else {
    text = isFunction(props.labels) ? props.labels : datum.xName || datum._x;
  }
  return checkForValidText(text);
};

const getLabelArc = (radius, labelRadius, style) => {
  const padding = (style && style.padding) || 0;
  const arcRadius = labelRadius || radius + padding;
  return d3Shape.arc().outerRadius(arcRadius).innerRadius(arcRadius);
};

const getLabelPosition = (arc, slice, position) => {
  const construct = {
    startAngle: position === "startAngle" ? slice.startAngle : slice.endAngle,
    endAngle: position === "endAngle" ? slice.endAngle : slice.startAngle
  };
  const clonedArc = assign({}, slice, construct);
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
  } else {
    return "left";
  }
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
      (slice.startAngle + slice.endAngle) / 2
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
    assign({ text }, dataProps)
  );
  const labelPosition =
    Helpers.evaluateProp(
      calculatedValues.labelPosition,
      assign({ text }, dataProps)
    ) || "centroid";
  const labelPlacement =
    Helpers.evaluateProp(
      calculatedValues.labelPlacement,
      assign({ text }, dataProps)
    ) || "vertical";
  const labelStyle = assign({ padding: 0 }, style.labels);
  const evaluatedStyle = Helpers.evaluateStyle(
    labelStyle,
    assign({ labelRadius, text }, dataProps)
  );
  const labelArc = getLabelArc(defaultRadius, labelRadius, evaluatedStyle);
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
    angle: labelAngle
  };

  if (!Helpers.isTooltip(labelComponent)) {
    return labelProps;
  }
  const tooltipTheme = (theme && theme.tooltip) || {};
  return defaults({}, labelProps, Helpers.omit(tooltipTheme, ["style"]));
};

export const getBaseProps = (props, fallbackProps) => {
  props = Helpers.modifyProps(props, fallbackProps, "pie");
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
    disableInlineStyles
  } = calculatedValues;
  const radius = props.radius || defaultRadius;
  const initialChildProps = {
    parent: { standalone, height, width, slices, name, style: style.parent }
  };

  return slices.reduce((childProps, slice, index) => {
    const datum = defaults({}, data[index], {
      startAngle: Helpers.radiansToDegrees(slice.startAngle),
      endAngle: Helpers.radiansToDegrees(slice.endAngle),
      padAngle: Helpers.radiansToDegrees(slice.padAngle)
    });
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;
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
      disableInlineStyles
    };
    childProps[eventKey] = {
      data: dataProps
    };
    const text = getLabelText(props, datum, index);
    if (
      (text !== undefined && text !== null) ||
      (labels && (events || sharedEvents))
    ) {
      const evaluatedText = Helpers.evaluateProp(text, dataProps);
      childProps[eventKey].labels = getLabelProps(
        evaluatedText,
        assign({}, props, dataProps),
        calculatedValues
      );
    }
    return childProps;
  }, initialChildProps);
};
