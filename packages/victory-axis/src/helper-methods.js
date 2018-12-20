import { assign, defaults, isFunction } from "lodash";
import { Helpers, Scale, Axis } from "victory-core";

const orientationSign = {
  top: -1,
  left: -1,
  right: 1,
  bottom: 1
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

// exposed for use by VictoryChart
const getScale = (props) => {
  const axis = Axis.getAxis(props);
  const scale = Scale.getBaseScale(props, axis);
  const domain = Axis.getDomain(props) || scale.domain();
  scale.range(Helpers.getRange(props, axis));
  scale.domain(domain);
  return scale;
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

const getStyles = (props, styleObject) => {
  const style = props.style || {};
  styleObject = styleObject || {};
  const parentStyleProps = { height: "100%", width: "100%" };
  return {
    parent: defaults(style.parent, styleObject.parent, parentStyleProps),
    axis: defaults({}, style.axis, styleObject.axis),
    axisLabel: defaults({}, style.axisLabel, styleObject.axisLabel),
    grid: defaults({}, style.grid, styleObject.grid),
    ticks: defaults({}, style.ticks, styleObject.ticks),
    tickLabels: defaults({}, style.tickLabels, styleObject.tickLabels)
  };
};

const getTickProps = (layout, style, datum) => {
  const { position, transform } = layout;
  return {
    x1: transform.x,
    y1: transform.y,
    x2: transform.x + position.x2,
    y2: transform.y + position.y2,
    style,
    datum
  };
};

// eslint-disable-next-line max-params
const getTickLabelProps = (layout, style, anchors, datum, text) => {
  const { position, transform } = layout;
  return {
    style,
    x: transform.x + position.x,
    y: transform.y + position.y,
    verticalAnchor: anchors.verticalAnchor,
    textAnchor: anchors.textAnchor,
    angle: style.angle,
    text,
    datum
  };
};

const getGridProps = (layout, style, datum) => {
  const { edge, transform } = layout;
  return {
    type: "grid",
    x1: transform.x,
    y1: transform.y,
    x2: edge.x + transform.x,
    y2: edge.y + transform.y,
    style,
    datum
  };
};

const getAxisProps = (modifiedProps, calculatedValues, globalTransform) => {
  const { style, padding, isVertical } = calculatedValues;
  const { width, height } = modifiedProps;
  return {
    type: "axis",
    style: style.axis,
    x1: isVertical ? globalTransform.x : padding.left + globalTransform.x,
    x2: isVertical ? globalTransform.x : width - padding.right + globalTransform.x,
    y1: isVertical ? padding.top + globalTransform.y : globalTransform.y,
    y2: isVertical ? height - padding.bottom + globalTransform.y : globalTransform.y
  };
};

const getEvaluatedStyles = (style, tick, index) => {
  return {
    tickStyle: evaluateStyle(style.ticks, tick, index),
    labelStyle: evaluateStyle(style.tickLabels, tick, index),
    gridStyle: evaluateStyle(style.grid, tick, index)
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

const getAxisLabelProps = (props, calculatedValues, globalTransform) => {
  const { style, orientation, padding, labelPadding, isVertical } = calculatedValues;
  const sign = orientationSign[orientation];
  const hPadding = padding.left + padding.right;
  const vPadding = padding.top + padding.bottom;
  const verticalAnchor = sign < 0 ? "end" : "start";
  const labelStyle = style.axisLabel;
  const angle = isVertical ? -90 : 0; // eslint-disable-line no-magic-numbers
  const x = isVertical
    ? globalTransform.x + sign * labelPadding
    : (props.width - hPadding) / 2 + padding.left + globalTransform.x;
  const y = isVertical
    ? (props.height - vPadding) / 2 + padding.top + globalTransform.y
    : sign * labelPadding + globalTransform.y;

  return {
    x,
    y,
    verticalAnchor: labelStyle.verticalAnchor || verticalAnchor,
    textAnchor: labelStyle.textAnchor || "middle",
    angle: labelStyle.angle === undefined ? angle : labelStyle.angle,
    style: labelStyle,
    text: props.label
  };
};

const getAnchors = (orientation, isVertical) => {
  const anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
  const anchor = anchorOrientation[orientation];
  return {
    textAnchor: isVertical ? anchor : "middle",
    verticalAnchor: isVertical ? "middle" : anchor
  };
};

const getLabelPadding = (props, style) => {
  const labelStyle = style.axisLabel || {};
  if (labelStyle.padding !== undefined && labelStyle.padding !== null) {
    return labelStyle.padding;
  }
  const isVertical = Axis.isVertical(props);
  // TODO: magic numbers
  /*eslint-disable no-magic-numbers*/
  const fontSize = labelStyle.fontSize || 14;
  return props.label ? fontSize * (isVertical ? 2.3 : 1.6) : 0;
  /*eslint-enable no-magic-numbers*/
};

const getOffset = (props, calculatedValues) => {
  const {
    style,
    padding,
    isVertical,
    orientation,
    labelPadding,
    stringTicks,
    ticks
  } = calculatedValues;
  const xPadding = orientation === "right" ? padding.right : padding.left;
  const yPadding = orientation === "top" ? padding.top : padding.bottom;
  const fontSize = style.axisLabel.fontSize || 14; // eslint-disable-line no-magic-numbers
  const offsetX = props.offsetX !== null && props.offsetX !== undefined ? props.offsetX : xPadding;
  const offsetY = props.offsetY !== null && props.offsetY !== undefined ? props.offsetY : yPadding;
  const tickSizes = ticks.map((data) => {
    const tick = stringTicks ? props.tickValues[data - 1] : data;
    const tickStyle = evaluateStyle(style.ticks, tick);
    return tickStyle.size || 0;
  });
  const totalPadding = fontSize + 2 * Math.max(...tickSizes) + labelPadding;
  const minimumPadding = 1.2 * fontSize; // eslint-disable-line no-magic-numbers
  const x = isVertical ? totalPadding : minimumPadding;
  const y = isVertical ? minimumPadding : totalPadding;
  return {
    x: offsetX !== null && offsetX !== undefined ? offsetX : x,
    y: offsetY !== null && offsetY !== undefined ? offsetY : y
  };
};

const getTransform = (props, calculatedValues, offset) => {
  const { orientation } = calculatedValues;
  return {
    top: { x: 0, y: offset.y },
    bottom: { x: 0, y: props.height - offset.y },
    left: { x: offset.x, y: 0 },
    right: { x: props.width - offset.x, y: 0 }
  }[orientation];
};

const getTickPosition = (style, orientation, isVertical) => {
  const { tickStyle, labelStyle } = style;
  const size = tickStyle.size || 0;
  const tickPadding = tickStyle.padding || 0;
  const labelPadding = labelStyle.padding || 0;
  const tickSpacing = size + tickPadding + labelPadding;
  const sign = orientationSign[orientation];
  return {
    x: isVertical ? sign * tickSpacing : 0,
    x2: isVertical ? sign * size : 0,
    y: isVertical ? 0 : sign * tickSpacing,
    y2: isVertical ? 0 : sign * size
  };
};

const getTickTransform = (tick, globalTransform, isVertical) => {
  return {
    x: isVertical ? globalTransform.x : tick + globalTransform.x,
    y: isVertical ? tick + globalTransform.y : globalTransform.y
  };
};

const getGridEdge = (props, calculatedValues) => {
  const { orientation, padding, isVertical } = calculatedValues;
  const sign = -orientationSign[orientation];
  const x = isVertical ? sign * (props.width - (padding.left + padding.right)) : 0;
  const y = isVertical ? 0 : sign * (props.height - (padding.top + padding.bottom));
  return { x, y };
};

const getGridOffset = (props, calculatedValues, offset) => {
  const { padding, orientation } = calculatedValues;
  const xPadding = orientation === "right" ? padding.right : padding.left;
  const yPadding = orientation === "top" ? padding.top : padding.bottom;
  return {
    x: props.crossAxis ? offset.x - xPadding : 0,
    y: props.crossAxis ? offset.y - yPadding : 0
  };
};

const getLayoutProps = (modifiedProps, calculatedValues) => {
  const offset = getOffset(modifiedProps, calculatedValues);
  return {
    globalTransform: getTransform(modifiedProps, calculatedValues, offset),
    gridOffset: getGridOffset(modifiedProps, calculatedValues, offset),
    gridEdge: getGridEdge(modifiedProps, calculatedValues)
  };
};

const getCalculatedValues = (props) => {
  const defaultStyles = getStyleObject(props);
  const style = getStyles(props, defaultStyles);
  const padding = Helpers.getPadding(props);
  const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
  const isVertical = Axis.isVertical(props);
  const labelPadding = getLabelPadding(props, style);
  const stringTicks = Axis.stringTicks(props) ? props.tickValues : undefined;
  const axis = Axis.getAxis(props);
  const scale = getScale(props);
  const domain = Axis.getDomain(props);
  const ticks = Axis.getTicks(props, scale, props.crossAxis);
  const tickFormat = Axis.getTickFormat(props, scale);
  const anchors = getAnchors(orientation, isVertical);

  return {
    axis,
    style,
    padding,
    orientation,
    isVertical,
    labelPadding,
    stringTicks,
    anchors,
    scale,
    ticks,
    tickFormat,
    domain
  };
};

const getBaseProps = (props, fallbackProps) => {
  const role = getRole(props);
  props = modifyProps(props, fallbackProps, role);
  const calculatedValues = getCalculatedValues(props);
  const {
    axis,
    style,
    orientation,
    isVertical,
    scale,
    ticks,
    tickFormat,
    anchors,
    domain,
    stringTicks,
    name
  } = calculatedValues;
  const otherAxis = axis === "x" ? "y" : "x";
  const { width, height, standalone, theme, polar, padding } = props;
  const { globalTransform, gridOffset, gridEdge } = getLayoutProps(props, calculatedValues);
  const sharedProps = { scale: { [axis]: scale }, polar };
  const axisProps = getAxisProps(props, calculatedValues, globalTransform);
  const axisLabelProps = getAxisLabelProps(props, calculatedValues, globalTransform);
  const initialChildProps = {
    parent: assign(
      { style: style.parent, ticks, standalone, theme, width, height, padding, domain, name },
      sharedProps
    )
  };
  const gridProps = {
    dimension: otherAxis,
    range: { [otherAxis]: Helpers.getRange(props, otherAxis) },
    scale:
      props.scale && props.scale[otherAxis] ? { [otherAxis]: props.scale[otherAxis] } : undefined
  };
  return ticks.reduce((childProps, tick, index) => {
    const originalTick = stringTicks ? stringTicks[index] : tick;
    const styles = getEvaluatedStyles(style, originalTick, index);
    const tickLayout = {
      position: getTickPosition(styles, orientation, isVertical),
      transform: getTickTransform(scale(tick), globalTransform, isVertical)
    };

    const gridLayout = {
      edge: gridEdge,
      transform: {
        x: isVertical ? -gridOffset.x + globalTransform.x : scale(tick) + globalTransform.x,
        y: isVertical ? scale(tick) + globalTransform.y : gridOffset.y + globalTransform.y
      }
    };
    childProps[index] = {
      axis: assign({ dimension: axis }, sharedProps, axisProps),
      axisLabel: assign({}, sharedProps, axisLabelProps),
      ticks: assign({}, sharedProps, getTickProps(tickLayout, styles.tickStyle, tick)),
      tickLabels: assign(
        {},
        sharedProps,
        getTickLabelProps(
          tickLayout,
          styles.labelStyle,
          anchors,
          tick,
          tickFormat(tick, index, ticks)
        )
      ),
      grid: assign({}, sharedProps, gridProps, getGridProps(gridLayout, styles.gridStyle, tick))
    };
    return childProps;
  }, initialChildProps);
};

export { getBaseProps, getScale, getStyles };
