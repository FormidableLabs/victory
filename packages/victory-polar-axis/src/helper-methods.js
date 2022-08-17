import { assign, uniqBy, defaults } from "lodash";
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

const getEvaluatedStyles = (style, props) => {
  return {
    tickStyle: Helpers.evaluateStyle(style.ticks, props),
    labelStyle: Helpers.evaluateStyle(style.tickLabels, props),
    gridStyle: Helpers.evaluateStyle(style.grid, props),
  };
};

const getStyleObject = (props) => {
  const { theme = {}, dependentAxis } = props;
  const generalAxisStyle =
    (theme.polarAxis && theme.polarAxis.style) ||
    (theme.axis && theme.axis.style);
  const polarAxisType = dependentAxis
    ? "polarDependentAxis"
    : "polarIndependentAxis";
  const standardAxisType = dependentAxis ? "dependentAxis" : "independentAxis";
  const specificAxisStyle =
    (theme[polarAxisType] && theme[polarAxisType].style) ||
    (theme[standardAxisType] && theme[standardAxisType].style);

  const mergeStyles = () => {
    const styleNamespaces = [
      "axis",
      "axisLabel",
      "grid",
      "parent",
      "tickLabels",
      "ticks",
    ];
    return styleNamespaces.reduce((memo, curr) => {
      memo[curr] = defaults(
        {},
        specificAxisStyle[curr],
        generalAxisStyle[curr],
      );
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
export const getScale = (props) => {
  const axis = Axis.getAxis(props);
  const scale = Scale.getBaseScale(props, axis);
  const domain = Axis.getDomain(props, axis) || scale.domain();
  const range = getRange(props, axis);
  scale.range(range);
  scale.domain(domain);
  return scale;
};

export const getStyles = (props, styleObject) => {
  if (props.disableInlineStyles) {
    return {};
  }
  const style = props.style || {};
  styleObject = styleObject || {};
  const parentStyleProps = { height: "auto", width: "100%" };
  return {
    parent: defaults(parentStyleProps, style.parent, styleObject.parent),
    axis: defaults({}, style.axis, styleObject.axis),
    axisLabel: defaults({}, style.axisLabel, styleObject.axisLabel),
    grid: defaults({}, style.grid, styleObject.grid),
    ticks: defaults({}, style.ticks, styleObject.ticks),
    tickLabels: defaults({}, style.tickLabels, styleObject.tickLabels),
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

// eslint-disable-next-line max-params
const getTickProps = (props, calculatedValues, tickValue, index) => {
  const {
    axisType,
    radius,
    scale,
    style,
    stringTicks,
    ticks,
    tickFormat,
    origin,
  } = calculatedValues;
  const text = tickFormat(tickValue, index, ticks);
  const tick = stringTicks ? stringTicks[index] : tickValue;
  const { tickStyle } = getEvaluatedStyles(style, {
    tick,
    tickValue,
    index,
    ticks,
    stringTicks,
    radius,
    scale,
    axisType,
    text,
  });
  const axisAngle =
    axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  const tickPadding = tickStyle.padding || tickStyle.size || 0;
  const padAngle = Helpers.degreesToRadians(90 - axisAngle);
  const tickAngle =
    axisType === "angular"
      ? scale(tickValue)
      : Helpers.degreesToRadians(-1 * axisAngle);
  const tickRadius = axisType === "angular" ? radius : scale(tickValue);

  return axisType === "angular"
    ? {
        index,
        datum: tick,
        style: tickStyle,
        x1: getPosition(tickRadius, tickAngle, "x") + origin.x,
        y1: getPosition(tickRadius, tickAngle, "y") + origin.y,
        x2: getPosition(tickRadius + tickPadding, tickAngle, "x") + origin.x,
        y2: getPosition(tickRadius + tickPadding, tickAngle, "y") + origin.y,
      }
    : {
        index,
        datum: tick,
        style: tickStyle,
        x1:
          tickRadius * Math.cos(tickAngle) +
          Math.cos(padAngle) * tickPadding +
          origin.x,
        x2:
          tickRadius * Math.cos(tickAngle) -
          Math.cos(padAngle) * tickPadding +
          origin.x,
        y1:
          tickRadius * Math.sin(tickAngle) +
          Math.sin(padAngle) * tickPadding +
          origin.y,
        y2:
          tickRadius * Math.sin(tickAngle) -
          Math.sin(padAngle) * tickPadding +
          origin.y,
      };
};

// eslint-disable-next-line max-params
const getTickLabelProps = (props, calculatedValues, tickValue, index) => {
  const {
    axisType,
    radius,
    tickFormat,
    style,
    scale,
    ticks,
    stringTicks,
    origin,
  } = calculatedValues;
  const text = tickFormat(tickValue, index, ticks);
  const tick = stringTicks ? stringTicks[index] : tickValue;
  const { labelStyle } = getEvaluatedStyles(style, {
    text,
    tick,
    tickValue,
    index,
    ticks,
    stringTicks,
    radius,
    scale,
    axisType,
  });
  const { tickLabelComponent } = props;
  const labelPlacement =
    tickLabelComponent.props && tickLabelComponent.props.labelPlacement
      ? tickLabelComponent.props.labelPlacement
      : props.labelPlacement;
  const tickPadding = labelStyle.padding || 0;
  const angularPadding = 0; // TODO: do some geometry
  const axisAngle =
    axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  const labelAngle =
    axisType === "angular"
      ? Helpers.radiansToDegrees(scale(tickValue))
      : axisAngle + angularPadding;
  const textAngle =
    labelStyle.angle === undefined
      ? LabelHelpers.getPolarAngle(
          assign({}, props, { labelPlacement }),
          labelAngle,
        )
      : labelStyle.angle;
  const labelRadius =
    axisType === "angular" ? radius + tickPadding : scale(tickValue);
  const textAnchor =
    labelStyle.textAnchor ||
    LabelHelpers.getPolarTextAnchor(
      assign({}, props, { labelPlacement }),
      labelAngle,
    );
  return {
    index,
    datum: tick,
    style: labelStyle,
    angle: textAngle,
    textAnchor,
    text,
    x: labelRadius * Math.cos(Helpers.degreesToRadians(labelAngle)) + origin.x,
    y: -labelRadius * Math.sin(Helpers.degreesToRadians(labelAngle)) + origin.y,
  };
};

// eslint-disable-next-line max-params
const getGridProps = (props, calculatedValues, tickValue, index) => {
  const {
    axisType,
    radius,
    style,
    scale,
    stringTicks,
    ticks,
    tickFormat,
    origin,
  } = calculatedValues;
  const text = tickFormat(tickValue, index, ticks);
  const { startAngle, endAngle, innerRadius = 0 } = props;
  const tick = stringTicks ? stringTicks[index] : tickValue;
  const { gridStyle } = getEvaluatedStyles(style, {
    tick,
    tickValue,
    index,
    ticks,
    stringTicks,
    radius,
    scale,
    axisType,
    text,
  });
  const angle = scale(tickValue);
  return axisType === "angular"
    ? {
        index,
        datum: tick,
        style: gridStyle,
        x1: getPosition(radius, angle, "x") + origin.x,
        y1: getPosition(radius, angle, "y") + origin.y,
        x2: getPosition(innerRadius, angle, "x") + origin.x,
        y2: getPosition(innerRadius, angle, "y") + origin.y,
      }
    : {
        style: gridStyle,
        index,
        datum: tick,
        cx: origin.x,
        cy: origin.y,
        r: scale(tickValue),
        startAngle,
        endAngle,
      };
};

const getAxisLabelProps = (props, calculatedValues) => {
  const { axisType, radius, style, scale, origin } = calculatedValues;
  const { axisLabelComponent } = props;
  if (axisType !== "radial") {
    return {};
  }
  const labelPlacement =
    axisLabelComponent.props && axisLabelComponent.props.labelPlacement
      ? axisLabelComponent.props.labelPlacement
      : props.labelPlacement;
  const labelStyle = (style && style.axisLabel) || {};
  const axisAngle =
    axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  const textAngle =
    labelStyle.angle === undefined
      ? LabelHelpers.getPolarAngle(
          assign({}, props, { labelPlacement }),
          axisAngle,
        )
      : labelStyle.angle;
  const labelRadius = radius + (labelStyle.padding || 0);
  const textAnchor =
    labelStyle.textAnchor ||
    LabelHelpers.getPolarTextAnchor(
      assign({}, props, { labelPlacement }),
      axisAngle,
    );
  const verticalAnchor =
    labelStyle.verticalAnchor ||
    LabelHelpers.getPolarVerticalAnchor(
      assign({}, props, { labelPlacement }),
      axisAngle,
    );
  return {
    style: labelStyle,
    angle: textAngle,
    textAnchor,
    verticalAnchor,
    text: props.label,
    x:
      getPosition(labelRadius, Helpers.degreesToRadians(axisAngle), "x") +
      origin.x,
    y:
      getPosition(labelRadius, Helpers.degreesToRadians(axisAngle), "y") +
      origin.y,
  };
};

const getAxisProps = (modifiedProps, calculatedValues) => {
  const { style, axisType, radius, scale, origin } = calculatedValues;
  const { startAngle, endAngle, innerRadius = 0 } = modifiedProps;
  const axisAngle =
    axisType === "radial"
      ? Helpers.degreesToRadians(getAxisAngle(modifiedProps, scale))
      : undefined;
  return axisType === "radial"
    ? {
        style: style.axis,
        x1: getPosition(innerRadius, axisAngle, "x") + origin.x,
        x2: getPosition(radius, axisAngle, "x") + origin.x,
        y1: getPosition(innerRadius, axisAngle, "y") + origin.y,
        y2: getPosition(radius, axisAngle, "y") + origin.y,
      }
    : {
        style: style.axis,
        cx: origin.x,
        cy: origin.y,
        r: radius,
        startAngle,
        endAngle,
      };
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
  const ticks =
    axisType === "angular" ? filterTicks(initialTicks, scale) : initialTicks;
  const tickFormat = Axis.getTickFormat(props, scale);
  const radius = getRadius(props);
  const origin = Helpers.getPolarOrigin(props);
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
    radius,
    origin,
  };
};

export const getBaseProps = (props, fallbackProps) => {
  props = Axis.modifyProps(props, fallbackProps);
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
      name,
    },
  };

  return ticks.reduce((childProps, tick, index) => {
    childProps[index] = {
      axis: axisProps,
      axisLabel: axisLabelProps,
      ticks: getTickProps(props, calculatedValues, tick, index),
      tickLabels: getTickLabelProps(props, calculatedValues, tick, index),
      grid: getGridProps(props, calculatedValues, tick, index),
    };

    return childProps;
  }, initialChildProps);
};
