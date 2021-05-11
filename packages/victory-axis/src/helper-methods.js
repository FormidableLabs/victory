import { assign, defaults } from "lodash";
import { Helpers, Scale, Axis, Domain } from "victory-core";

const orientationSign = {
  top: -1,
  left: -1,
  right: 1,
  bottom: 1
};

const getCurrentAxis = (props, axis) => {
  const { orientation, horizontal } = props;
  if (orientation) {
    const dimensions = { top: "x", bottom: "x", left: "y", right: "y" };
    return dimensions[orientation];
  }
  const otherAxis = axis === "x" ? "y" : "x";
  return horizontal ? otherAxis : axis;
};

const getScale = (props) => {
  const axis = Axis.getAxis(props);
  const currentAxis = getCurrentAxis(props, axis);
  const scale = Scale.getBaseScale(props, axis);
  const propsDomain = props.domain && props.domain[axis];
  const domain = propsDomain || Axis.getDomain(props) || scale.domain();
  scale.range(Helpers.getRange(props, currentAxis));
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
    style: style.axis,
    x1: isVertical ? globalTransform.x : padding.left + globalTransform.x,
    x2: isVertical ? globalTransform.x : width - padding.right + globalTransform.x,
    y1: isVertical ? padding.top + globalTransform.y : globalTransform.y,
    y2: isVertical ? height - padding.bottom + globalTransform.y : globalTransform.y
  };
};

const getEvaluatedStyles = (style, props) => {
  return {
    tickStyle: Helpers.evaluateStyle(style.ticks, props),
    labelStyle: Helpers.evaluateStyle(style.tickLabels, props),
    gridStyle: Helpers.evaluateStyle(style.grid, props)
  };
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

const getDefaultOrientations = (axis, originSign, horizontal) => {
  const sign = originSign || "positive";
  const orientations = {
    positive: { x: "bottom", y: "left" },
    negative: { x: "top", y: "right" }
  };
  const horizontalOrientations = {
    positive: { x: "left", y: "bottom" },
    negative: { x: "right", y: "top" }
  };
  return horizontal ? horizontalOrientations[sign][axis] : orientations[sign][axis];
};

// eslint-disable-next-line complexity
const getOffset = (props, calculatedValues) => {
  const { scale, origin, orientation, orientations, domain, padding } = calculatedValues;
  const { top, bottom, left, right } = padding;

  const calculatedOrientation = {
    x: orientation === "bottom" || orientation === "top" ? orientation : orientations.x,
    y: orientation === "left" || orientation === "right" ? orientation : orientations.y
  };
  //
  // make the axes line up, and cross when appropriate
  const orientationOffset = {
    x: calculatedOrientation.y === "left" ? left : right,
    y: calculatedOrientation.x === "bottom" ? bottom : top
  };
  const originOffset = {
    x: calculatedOrientation.y === "left" ? 0 : props.width,
    y: calculatedOrientation.x === "bottom" ? props.height : 0
  };
  const originPosition = {
    x: origin.x === domain.x[0] || origin.x === domain.x[1] ? 0 : scale.x(origin.x),
    y: origin.y === domain.y[0] || origin.y === domain.y[1] ? 0 : scale.y(origin.y)
  };

  const x = originPosition.x ? Math.abs(originOffset.x - originPosition.x) : orientationOffset.x;
  const y = originPosition.y ? Math.abs(originOffset.y - originPosition.y) : orientationOffset.y;
  const offsetX = props.offsetX !== null && props.offsetX !== undefined ? x - props.offsetX : x;
  const offsetY = props.offsetY !== null && props.offsetY !== undefined ? y - props.offsetY : y;

  return {
    x: offsetX,
    y: offsetY
  };
};

// eslint-disable-next-line complexity
const getHorizontalOffset = (props, calculatedValues) => {
  const { scale, origin, orientation, orientations, domain, padding } = calculatedValues;
  const { top, bottom, left, right } = padding;

  const calculatedOrientation = {
    y: orientation === "bottom" || orientation === "top" ? orientation : orientations.x,
    x: orientation === "left" || orientation === "right" ? orientation : orientations.y
  };

  // make the axes line up, and cross when appropriate
  const orientationOffset = {
    x: calculatedOrientation.y === "bottom" ? bottom : top,
    y: calculatedOrientation.x === "left" ? left : right
  };
  const originOffset = {
    y: calculatedOrientation.x === "left" ? 0 : props.width,
    x: calculatedOrientation.y === "bottom" ? props.height : 0
  };
  const originPosition = {
    x: origin.x === domain.x[0] || origin.x === domain.x[1] ? 0 : scale.x(origin.x),
    y: origin.y === domain.y[0] || origin.y === domain.y[1] ? 0 : scale.y(origin.y)
  };

  const y = originPosition.x ? Math.abs(originOffset.x - originPosition.x) : orientationOffset.x;
  const x = originPosition.y ? Math.abs(originOffset.y - originPosition.y) : orientationOffset.y;
  const offsetX = props.offsetX !== null && props.offsetX !== undefined ? x - props.offsetX : x;
  const offsetY = props.offsetY !== null && props.offsetY !== undefined ? y - props.offsetY : y;

  return {
    y: offsetX,
    x: offsetY
  };
};

const getTransform = (props, calculatedValues, offset) => {
  const { orientation, axis } = calculatedValues;
  const axisValue = Axis.getAxisValue(props, axis);
  return {
    top: {
      x: 0,
      y: axisValue !== undefined ? axisValue : offset.y
    },
    bottom: {
      x: 0,
      y: axisValue !== undefined ? axisValue : props.height - offset.y
    },
    left: {
      x: axisValue !== undefined ? axisValue : offset.x,
      y: 0
    },
    right: {
      x: axisValue !== undefined ? axisValue : props.width - offset.x,
      y: 0
    }
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
  const offset = modifiedProps.horizontal
    ? getHorizontalOffset(modifiedProps, calculatedValues)
    : getOffset(modifiedProps, calculatedValues);
  return {
    globalTransform: getTransform(modifiedProps, calculatedValues, offset),
    gridOffset: getGridOffset(modifiedProps, calculatedValues, offset),
    gridEdge: getGridEdge(modifiedProps, calculatedValues)
  };
};

// eslint-disable-next-line complexity
const getCalculatedValues = (props) => {
  const defaultStyles = getStyleObject(props);
  const style = getStyles(props, defaultStyles);
  const padding = Helpers.getPadding(props);
  const labelPadding = getLabelPadding(props, style);
  const stringTicks = Axis.stringTicks(props) ? props.tickValues : undefined;
  const axis = Axis.getAxis(props);
  const currentAxisDomain = Axis.getDomain(props);
  const currentAxisScale = getScale(props);
  const crossAxis = props.crossAxis === false || props.standalone === true ? false : true;
  const ticks = Axis.getTicks(props, currentAxisScale, crossAxis);
  const tickFormat = Axis.getTickFormat(props, currentAxisScale);
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const domain = {
    x: axis === "x" && currentAxisDomain ? currentAxisDomain : Domain.getDomain(props, "x"),
    y: axis === "y" && currentAxisDomain ? currentAxisDomain : Domain.getDomain(props, "y")
  };
  const scale = {
    x:
      axis === "x" && currentAxisScale
        ? currentAxisScale
        : Scale.getBaseScale(props, "x")
            .domain(domain.x)
            .range(props.horizontal ? range.y : range.x),
    y:
      axis === "y" && currentAxisScale
        ? currentAxisScale
        : Scale.getBaseScale(props, "y")
            .domain(domain.y)
            .range(props.horizontal ? range.x : range.y)
  };
  const origin = Axis.getOrigin(domain);
  const originSign = {
    x: Axis.getOriginSign(origin.x, domain.x),
    y: Axis.getOriginSign(origin.y, domain.y)
  };
  const orientations = {
    x: getDefaultOrientations("x", originSign.y, props.horizontal),
    y: getDefaultOrientations("y", originSign.x, props.horizontal)
  };
  const orientation = props.orientation || orientations[axis];
  const isVertical = Axis.isVertical(Object.assign({}, props, { orientation }));
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
    domain,
    origin,
    orientations
  };
};

const getBaseProps = (props, fallbackProps) => {
  props = Axis.modifyProps(props, fallbackProps);
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
  const { width, height, standalone, theme, polar, padding, horizontal } = props;
  const { globalTransform, gridOffset, gridEdge } = getLayoutProps(props, calculatedValues);
  const sharedProps = { scale: { [axis]: scale[axis] }, polar, horizontal, ticks, stringTicks };
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
  return ticks.reduce((childProps, tickValue, index) => {
    const tick = stringTicks ? stringTicks[index] : tickValue;
    const text = tickFormat(tickValue, index, ticks);
    const styles = getEvaluatedStyles(
      style,
      assign({}, sharedProps, { tick, tickValue, index, text })
    );
    const tickLayout = {
      position: getTickPosition(styles, orientation, isVertical),
      transform: getTickTransform(scale[axis](tickValue), globalTransform, isVertical)
    };

    const gridLayout = {
      edge: gridEdge,
      transform: {
        x: isVertical
          ? -gridOffset.x + globalTransform.x
          : scale[axis](tickValue) + globalTransform.x,
        y: isVertical
          ? scale[axis](tickValue) + globalTransform.y
          : gridOffset.y + globalTransform.y
      }
    };
    childProps[index] = {
      axis: assign({ dimension: axis }, sharedProps, axisProps),
      axisLabel: assign({}, sharedProps, axisLabelProps),
      ticks: assign({}, sharedProps, getTickProps(tickLayout, styles.tickStyle, tickValue)),
      tickLabels: assign(
        {},
        sharedProps,
        getTickLabelProps(tickLayout, styles.labelStyle, anchors, tickValue, text)
      ),
      grid: assign(
        {},
        sharedProps,
        gridProps,
        getGridProps(gridLayout, styles.gridStyle, tickValue)
      )
    };
    return childProps;
  }, initialChildProps);
};

export { getBaseProps, getStyles };
