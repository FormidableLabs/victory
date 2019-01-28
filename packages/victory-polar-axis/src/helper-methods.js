import { assign, uniqBy, defaults, isFunction } from "lodash";
import { Helpers, LabelHelpers, Scale, Axis } from "victory-core";

const getPosition = (r, angle, axis) => {
  return axis === "x" ? r * Math.cos(angle) : -r * Math.sin(angle);
};

const getAxisType = (props) => {
  const typicalType = props.dependentAxis ? "radial" : "angular";
  const invertedType = typicalType === "angular" ? "radial" : "angular";
  return props.horizontal ? invertedType : typicalType;
};

const filterTicks = (ticks, scale) => {
  const compareTicks = (t) => scale(t) % (2 * Math.PI);
  return uniqBy(ticks, compareTicks);
};

const evaluateProp = (prop, data, index) => {
  return isFunction(prop) ? prop(data, index) : prop;
};

const evaluateStyle = (style, data, index) => {
  if (!style || !Object.keys(style).some((value) => isFunction(style[value]))) {
    return style;
  }
  return Object.keys(style).reduce((prev, curr) => {
    prev[curr] = evaluateProp(style[curr], data, index);
    return prev;
  }, {});
};

const getEvaluatedStyles = (style, tick, index) => {
  return {
    tickStyle: evaluateStyle(style.ticks, tick, index),
    labelStyle: evaluateStyle(style.tickLabels, tick, index),
    gridStyle: evaluateStyle(style.grid, tick, index)
  };
};

const getStyleObject = (props) => {
  const { theme, dependentAxis } = props;
  const generalAxisStyle = theme && theme.axis && theme.axis.style;
  const axisType = dependentAxis ? "dependentAxis" : "independentAxis";
  const specificAxisStyle = theme && theme[axisType] && theme[axisType].style;

  const mergeStyles = () => {
    const styleNamespaces = ["axis", "axisLabel", "grid", "parent", "tickLabels", "ticks"];
    return styleNamespaces.reduce((memo, curr) => {
      memo[curr] = defaults({}, specificAxisStyle[curr], generalAxisStyle[curr]);
      return memo;
    }, {});
  };

  return generalAxisStyle && specificAxisStyle
    ? mergeStyles()
    : specificAxisStyle || generalAxisStyle;
};

const getRadius = (props) => {
  const { left, right, top, bottom } = Helpers.getPadding(props);
  const { width, height } = props;
  return Math.min(width - left - right, height - top - bottom) / 2;
};

const getRange = (props, axis) => {
  // Return the range from props if one is given.
  if (props.range && props.range[axis]) {
    return props.range[axis];
  } else if (props.range && Array.isArray(props.range)) {
    return props.range;
  }
  const axisType = getAxisType(props);
  if (axisType === "angular") {
    const startAngle = Helpers.degreesToRadians(props.startAngle);
    const endAngle = Helpers.degreesToRadians(props.endAngle);
    return [startAngle, endAngle];
  }
  const radius = getRadius(props);
  return [props.innerRadius || 0, radius];
};

// exposed for use by VictoryChart (necessary?)
const getScale = (props) => {
  const axis = Axis.getAxis(props);
  const scale = Scale.getBaseScale(props, axis);
  const domain = Axis.getDomain(props, axis) || scale.domain();
  const range = getRange(props, axis);
  scale.range(range);
  scale.domain(domain);
  return scale;
};

const getStyles = (props, styleObject) => {
  const style = props.style || {};
  styleObject = styleObject || {};
  const parentStyleProps = { height: "auto", width: "100%" };
  return {
    parent: defaults(parentStyleProps, style.parent, styleObject.parent),
    axis: defaults({}, style.axis, styleObject.axis),
    axisLabel: defaults({}, style.axisLabel, styleObject.axisLabel),
    grid: defaults({}, style.grid, styleObject.grid),
    ticks: defaults({}, style.ticks, styleObject.ticks),
    tickLabels: defaults({}, style.tickLabels, styleObject.tickLabels)
  };
};

const getAxisAngle = (props) => {
  const { axisAngle, startAngle, dependentAxis } = props;
  const axis = Axis.getAxis(props);
  const axisValue = Axis.getAxisValue(props, axis);
  if (axisValue === undefined || !dependentAxis) {
    return axisAngle === undefined ? startAngle : axisAngle;
  }
  return Helpers.radiansToDegrees(axisValue);
};

//eslint-disable-next-line max-params
const getTickProps = (props, calculatedValues, tick, index) => {
  const { axisType, radius, scale, style, stringTicks } = calculatedValues;
  const originalTick = stringTicks ? stringTicks[index] : tick;
  const { tickStyle } = getEvaluatedStyles(style, originalTick, index);
  const tickPadding = tickStyle.padding || 0;
  const angularPadding = tickPadding; // TODO: do some geometry
  const axisAngle = axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  return axisType === "angular"
    ? {
        index,
        datum: tick,
        style: tickStyle,
        x1: radius * Math.cos(scale(tick)),
        y1: -radius * Math.sin(scale(tick)),
        x2: (radius + tickPadding) * Math.cos(scale(tick)),
        y2: -(radius + tickPadding) * Math.sin(scale(tick))
      }
    : {
        style,
        index,
        datum: tick,
        x1: (scale(tick) / 2) * Math.cos(axisAngle - angularPadding),
        x2: (scale(tick) / 2) * Math.cos(axisAngle + angularPadding),
        y1: -(scale(tick) / 2) * Math.sin(axisAngle - angularPadding),
        y2: -(scale(tick) / 2) * Math.sin(axisAngle + angularPadding)
      };
};

//eslint-disable-next-line max-params
const getTickLabelProps = (props, calculatedValues, tick, index) => {
  const { axisType, radius, tickFormat, style, scale, ticks, stringTicks } = calculatedValues;
  const originalTick = stringTicks ? stringTicks[index] : tick;
  const { labelStyle } = getEvaluatedStyles(style, originalTick, index);
  const { tickLabelComponent } = props;
  const labelPlacement =
    tickLabelComponent.props && tickLabelComponent.props.labelPlacement
      ? tickLabelComponent.props.labelPlacement
      : props.labelPlacement;
  const tickPadding = labelStyle.padding || 0;
  const angularPadding = 0; // TODO: do some geometry
  const axisAngle = axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  const labelAngle =
    axisType === "angular" ? Helpers.radiansToDegrees(scale(tick)) : axisAngle + angularPadding;
  const textAngle =
    labelStyle.angle === undefined
      ? LabelHelpers.getPolarAngle(assign({}, props, { labelPlacement }), labelAngle)
      : labelStyle.angle;
  const labelRadius = axisType === "angular" ? radius + tickPadding : scale(tick);
  const textAnchor =
    labelStyle.textAnchor ||
    LabelHelpers.getPolarTextAnchor(assign({}, props, { labelPlacement }), labelAngle);
  return {
    index,
    datum: tick,
    style: labelStyle,
    angle: textAngle,
    textAnchor,
    text: tickFormat(tick, index, ticks),
    x: labelRadius * Math.cos(Helpers.degreesToRadians(labelAngle)),
    y: -labelRadius * Math.sin(Helpers.degreesToRadians(labelAngle))
  };
};

//eslint-disable-next-line max-params
const getGridProps = (props, calculatedValues, tick, index) => {
  const { axisType, radius, style, scale, stringTicks } = calculatedValues;
  const { startAngle, endAngle, innerRadius = 0 } = props;
  const originalTick = stringTicks ? stringTicks[index] : tick;
  const { gridStyle } = getEvaluatedStyles(style, originalTick, index);
  const angle = scale(tick);
  return axisType === "angular"
    ? {
        index,
        datum: tick,
        style: gridStyle,
        x1: getPosition(radius, angle, "x"),
        y1: getPosition(radius, angle, "y"),
        x2: getPosition(innerRadius, angle, "x"),
        y2: getPosition(innerRadius, angle, "y")
      }
    : {
        style: gridStyle,
        index,
        datum: tick,
        cx: 0,
        cy: 0,
        r: scale(tick),
        startAngle,
        endAngle
      };
};

const getAxisLabelProps = (props, calculatedValues) => {
  const { axisType, radius, style, scale } = calculatedValues;
  const { axisLabelComponent } = props;
  if (axisType !== "radial") {
    return {};
  }
  const labelPlacement =
    axisLabelComponent.props && axisLabelComponent.props.labelPlacement
      ? axisLabelComponent.props.labelPlacement
      : props.labelPlacement;
  const labelStyle = (style && style.axisLabel) || {};
  const axisAngle = axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  const textAngle =
    labelStyle.angle === undefined
      ? LabelHelpers.getPolarAngle(assign({}, props, { labelPlacement }), axisAngle)
      : labelStyle.angle;
  const labelRadius = radius + (labelStyle.padding || 0);
  const textAnchor =
    labelStyle.textAnchor ||
    LabelHelpers.getTextPolarAnchor(assign({}, props, { labelPlacement }), axisAngle);
  const verticalAnchor =
    labelStyle.verticalAnchor ||
    LabelHelpers.getPolarVerticalAnchor(assign({}, props, { labelPlacement }), axisAngle);
  return {
    style: labelStyle,
    angle: textAngle,
    textAnchor,
    verticalAnchor,
    text: props.label,
    x: getPosition(labelRadius, Helpers.degreesToRadians(axisAngle), "x"),
    y: getPosition(labelRadius, Helpers.degreesToRadians(axisAngle), "y")
  };
};

const getAxisProps = (modifiedProps, calculatedValues) => {
  const { style, axisType, radius, scale } = calculatedValues;
  const { startAngle, endAngle, innerRadius = 0 } = modifiedProps;
  const axisAngle =
    axisType === "radial"
      ? Helpers.degreesToRadians(getAxisAngle(modifiedProps, scale))
      : undefined;
  return axisType === "radial"
    ? {
        style: style.axis,
        x1: getPosition(innerRadius, axisAngle, "x"),
        x2: getPosition(radius, axisAngle, "x"),
        y1: getPosition(innerRadius, axisAngle, "y"),
        y2: getPosition(radius, axisAngle, "y")
      }
    : {
        style: style.axis,
        cx: 0,
        cy: 0,
        r: radius,
        startAngle,
        endAngle
      };
};

const getRole = (props) => {
  if (props.dependentAxis) {
    return props.theme && props.theme.dependentAxis ? "dependentAxis" : "axis";
  }

  return props.theme && props.theme.independentAxis ? "independentAxis" : "axis";
};

const getShallowMergedThemeProps = (props, role) => {
  const axisTheme = props.theme.axis || {};
  return defaults({}, props.theme[role], axisTheme);
};

const modifyProps = (props, fallbackProps, role) => {
  if (role !== "axis") {
    props.theme[role] = getShallowMergedThemeProps(props, role);
  }
  return Helpers.modifyProps(props, fallbackProps, role);
};

const getCalculatedValues = (props) => {
  props = assign({ polar: true }, props);
  const defaultStyles = getStyleObject(props);
  const style = getStyles(props, defaultStyles);
  const padding = Helpers.getPadding(props);
  const axis = Axis.getAxis(props);
  const axisType = getAxisType(props);
  const stringTicks = Axis.stringTicks(props) ? props.tickValues : undefined;
  const domain = Axis.getDomain(props, axis);
  const range = getRange(props, axis);
  const scale = getScale(props);
  const initialTicks = Axis.getTicks(props, scale);
  const ticks = axisType === "angular" ? filterTicks(initialTicks, scale) : initialTicks;
  const tickFormat = Axis.getTickFormat(props, scale);
  const radius = getRadius(props);
  return {
    axis,
    style,
    padding,
    stringTicks,
    axisType,
    scale,
    ticks,
    tickFormat,
    domain,
    range,
    radius
  };
};

const getBaseProps = (props, fallbackProps) => {
  const role = getRole(props);
  props = modifyProps(props, fallbackProps, role);
  const calculatedValues = getCalculatedValues(props);
  const { style, scale, ticks, domain } = calculatedValues;
  const { width, height, standalone, theme, name } = props;
  const axisProps = getAxisProps(props, calculatedValues);
  const axisLabelProps = getAxisLabelProps(props, calculatedValues);
  const initialChildProps = {
    parent: {
      style: style.parent,
      ticks,
      scale,
      width,
      height,
      domain,
      standalone,
      theme,
      name
    }
  };

  return ticks.reduce((childProps, tick, index) => {
    childProps[index] = {
      axis: axisProps,
      axisLabel: axisLabelProps,
      ticks: getTickProps(props, calculatedValues, tick, index),
      tickLabels: getTickLabelProps(props, calculatedValues, tick, index),
      grid: getGridProps(props, calculatedValues, tick, index)
    };

    return childProps;
  }, initialChildProps);
};

export { getScale, getStyles, getBaseProps };
