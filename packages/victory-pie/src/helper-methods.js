/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2, 45, 135, 180, 225, 315] }]*/
import { assign, defaults, isFunction, isPlainObject, isNil } from "lodash";
import * as d3Shape from "d3-shape";

import { Helpers, Data, Style } from "victory-core";

const checkForValidText = (text) => {
  if (text === undefined || text === null) {
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
    x: origin.x !== undefined ? origin.x : (padding.left - padding.right + width) / 2,
    y: origin.y !== undefined ? origin.y : (padding.top - padding.bottom + height) / 2
  };
};

const getSlices = (props, data) => {
  const layoutFunction = d3Shape
    .pie()
    .sort(null)
    .startAngle(Helpers.degreesToRadians(props.startAngle))
    .endAngle(Helpers.degreesToRadians(props.endAngle))
    .padAngle(Helpers.degreesToRadians(props.padAngle))
    .value((datum) => {
      return datum._y;
    });
  return layoutFunction(data);
};

const getCalculatedValues = (props) => {
  const { theme, colorScale } = props;
  const styleObject = theme && theme.pie && theme.pie.style ? theme.pie.style : {};
  const style = Helpers.getStyles(props.style, styleObject, "auto", "100%");
  const colors = Array.isArray(colorScale) ? colorScale : Style.getColorScale(colorScale);
  const padding = Helpers.getPadding(props);
  const defaultRadius = getRadius(props, padding);
  const origin = getOrigin(props, padding);
  const data = Data.getData(props);
  const slices = getSlices(props, data);
  return { style, colors, padding, defaultRadius, data, slices, origin };
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
    text = isFunction(props.labels) ? props.labels(datum) : datum.xName || datum._x;
  }
  return checkForValidText(text);
};

const getLabelArc = (radius, labelRadius, style) => {
  const padding = (style && style.padding) || 0;
  const arcRadius = labelRadius || radius + padding;
  return d3Shape
    .arc()
    .outerRadius(arcRadius)
    .innerRadius(arcRadius);
};

const getLabelPosition = (arc, slice, position) => {
  const construct = {
    startAngle: position === "startAngle" ? slice.endAngle : slice.startAngle,
    endAngle: position === "endAngle" ? slice.startAngle : slice.endAngle
  };
  const clonedArc = assign({}, slice, construct);
  return arc.centroid(clonedArc);
};

const getLabelOrientation = (slice) => {
  const radiansToDegrees = (radians) => {
    return radians * (180 / Math.PI);
  };
  const start = radiansToDegrees(slice.startAngle);
  const end = radiansToDegrees(slice.endAngle);
  const degree = start + (end - start) / 2;
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

const getLabelProps = (props, dataProps, calculatedValues) => {
  const { index, datum, data, slice } = dataProps;
  const { style, defaultRadius, origin } = calculatedValues;
  const labelStyle = Helpers.evaluateStyle(
    assign({ padding: 0 }, style.labels),
    datum,
    props.active
  );
  const labelRadius = Helpers.evaluateProp(props.labelRadius, datum);
  const labelArc = getLabelArc(defaultRadius, labelRadius, labelStyle);
  const position = getLabelPosition(labelArc, slice, props.labelPosition);
  const orientation = getLabelOrientation(slice);
  return {
    index,
    datum,
    data,
    slice,
    orientation,
    style: labelStyle,
    x: Math.round(position[0]) + origin.x,
    y: Math.round(position[1]) + origin.y,
    text: getLabelText(props, datum, index),
    textAnchor: labelStyle.textAnchor || getTextAnchor(orientation),
    verticalAnchor: labelStyle.verticalAnchor || getVerticalAnchor(orientation),
    angle: labelStyle.angle
  };
};

export const getBaseProps = (props, fallbackProps) => {
  props = Helpers.modifyProps(props, fallbackProps, "pie");
  const calculatedValues = getCalculatedValues(props);
  const { slices, style, data, origin, defaultRadius } = calculatedValues;
  const {
    labels,
    events,
    sharedEvents,
    height,
    width,
    standalone,
    name,
    innerRadius,
    cornerRadius,
    padAngle
  } = props;
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
      style: getSliceStyle(index, calculatedValues)
    };
    childProps[eventKey] = {
      data: dataProps
    };
    const text = getLabelText(props, datum, index);
    if ((text !== undefined && text !== null) || (labels && (events || sharedEvents))) {
      childProps[eventKey].labels = getLabelProps(props, dataProps, calculatedValues);
    }
    return childProps;
  }, initialChildProps);
};
