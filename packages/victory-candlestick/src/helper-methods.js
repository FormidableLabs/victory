import { assign, defaults, isNil, isFunction } from "lodash";
import { Helpers, Scale, Domain, Data, LabelHelpers } from "victory-core";

const TYPES = ["close", "open", "high", "low"];

const getData = (props) => {
  const accessorTypes = ["x", "high", "low", "close", "open"];
  return Data.formatData(props.data, props, accessorTypes);
};

const reduceData = (dataset, axis, type) => {
  const yDataTypes = { min: "_low", max: "_high" };
  const dataType = axis === "x" ? "_x" : yDataTypes[type];
  const baseCondition = type === "min" ? Infinity : -Infinity;
  return dataset.reduce((memo, datum) => {
    const current = datum[dataType];
    return (memo < current && type === "min") || (memo > current && type === "max")
      ? memo
      : current;
  }, baseCondition);
};

const getDomainFromData = (props, axis) => {
  const minDomain = Domain.getMinFromProps(props, axis);
  const maxDomain = Domain.getMaxFromProps(props, axis);
  const dataset = getData(props);
  if (dataset.length < 1) {
    return minDomain !== undefined && maxDomain !== undefined
      ? Domain.getDomainFromMinMax(minDomain, maxDomain)
      : undefined;
  }
  const min = minDomain !== undefined ? minDomain : reduceData(dataset, axis, "min");
  const max = maxDomain !== undefined ? maxDomain : reduceData(dataset, axis, "max");
  return Domain.getDomainFromMinMax(min, max);
};

const getDomain = (props, axis) => {
  return Domain.createDomainFunction(getDomainFromData)(props, axis);
};

const getStyles = (style, defaultStyles) => {
  const width = "100%";
  const height = "100%";

  if (!style) {
    return defaults(
      {
        parent: {
          height,
          width
        }
      },
      defaultStyles
    );
  }

  const defaultParent = (defaultStyles && defaultStyles.parent) || {};
  const defaultLabels = (defaultStyles && defaultStyles.labels) || {};
  const defaultData = (defaultStyles && defaultStyles.data) || {};
  return {
    parent: defaults({}, style.parent, defaultParent, {
      width,
      height
    }),
    labels: defaults({}, style.labels, defaultLabels),
    data: defaults({}, style.data, defaultData),
    openLabels: defaults({}, style.openLabels, style.labels, defaultLabels),
    closeLabels: defaults({}, style.closeLabels, style.labels, defaultLabels),
    lowLabels: defaults({}, style.lowLabels, style.labels, defaultLabels),
    highLabels: defaults({}, style.highLabels, style.labels, defaultLabels)
  };
};

const getCalculatedValues = (props) => {
  const { theme, polar } = props;
  const defaultStyle =
    theme && theme.candlestick && theme.candlestick.style ? theme.candlestick.style : {};
  const style = getStyles(props.style, defaultStyle);
  const data = getData(props);
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const domain = {
    x: getDomain(props, "x"),
    y: getDomain(props, "y")
  };
  const scale = {
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(props.horizontal ? range.x : range.y)
  };
  const origin = polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
  const defaultOrientation = props.horizontal ? "top" : "right";
  const labelOrientation = props.labelOrientation || defaultOrientation;
  return { domain, data, scale, style, origin, labelOrientation };
};

const isTransparent = (attr) => {
  return attr === "none" || attr === "transparent";
};

const getDataStyles = (datum, style, props) => {
  style = style || {};
  const candleColor =
    datum.open > datum.close ? props.candleColors.negative : props.candleColors.positive;
  const fill = style.fill || candleColor;
  const strokeColor = style.stroke;
  const stroke = isTransparent(strokeColor) ? fill : strokeColor || "black";
  return assign({}, style, { stroke, fill });
};

const getText = (props, type) => {
  const { datum, index, labels } = props;
  const propName = `${type}Labels`;
  const labelProp = props[propName];
  if (!labelProp && !labels) {
    return null;
  } else if (labelProp === true || labels === true) {
    const dataName = `_${type}`;
    return `${datum[dataName]}`;
  }
  return Array.isArray(labelProp) ? labelProp[index] : labelProp;
};

const getCandleWidth = (props, style) => {
  const { data, candleWidth, scale, defaultCandleWidth } = props;
  if (candleWidth) {
    // TODO: choose level to evaluate props
    return isFunction(candleWidth) ? Helpers.evaluateProp(candleWidth, props) : candleWidth;
  } else if (style && style.width) {
    return style.width;
  }
  const range = scale.x.range();
  const extent = Math.abs(range[1] - range[0]);
  const candles = data.length + 2;
  const candleRatio = props.candleRatio || 0.5;
  const defaultWidth = candleRatio * (data.length < 2 ? defaultCandleWidth : extent / candles);
  return Math.max(1, defaultWidth);
};

const getOrientation = (labelOrientation, type) =>
  (typeof labelOrientation === "object" && labelOrientation[type]) || labelOrientation;

/* eslint-disable complexity*/
const calculatePlotValues = (props) => {
  const { positions, labelStyle, x, horizontal, computedType, candleWidth, orientation } = props;
  positions.labels = (positions.open + positions.close) / 2;

  const signX = orientation === "left" ? -1 : 1;
  const signY = orientation === "top" ? -1 : 1;

  if (horizontal) {
    const yValue =
      orientation === "top" || orientation === "bottom"
        ? x + signY * (candleWidth / 2) + signY * (labelStyle.padding || 0)
        : x;
    const xValue =
      orientation === "left" || orientation === "right"
        ? positions[computedType] + signX * (labelStyle.padding || 1)
        : positions[computedType];

    return { yValue, xValue };
  } else {
    const xValue =
      orientation === "top" || orientation === "bottom"
        ? x
        : x + signX * (candleWidth / 2) + signX * (labelStyle.padding || 0);

    const yValue =
      orientation === "left" || orientation === "right"
        ? positions[computedType]
        : positions[computedType] + signY * (labelStyle.padding || 1);

    return { yValue, xValue };
  }
};
/* eslint-enable complexity*/

/* eslint-disable max-params*/
const getLabelProps = (props, text, style, type) => {
  const {
    x,
    high,
    low,
    open,
    close,
    index,
    scale,
    datum,
    data,
    horizontal,
    candleWidth,
    labelOrientation
  } = props;

  const orientation = getOrientation(labelOrientation, type);
  const positions = { high, low, open, close };
  const namespace = type ? `${type}Labels` : "labels";
  const labelStyle = style[namespace] || style.labels;
  const defaultVerticalAnchors = { top: "end", bottom: "start", left: "middle", right: "middle" };
  const defaultTextAnchors = { left: "end", right: "start", top: "middle", bottom: "middle" };
  const computedType = type ? type : "labels";

  const plotProps = {
    positions,
    labelStyle,
    x,
    horizontal,
    computedType,
    candleWidth,
    orientation
  };
  const { yValue, xValue } = calculatePlotValues(plotProps);

  return {
    style: labelStyle,
    y: yValue,
    x: xValue,
    text,
    index,
    scale,
    datum,
    data,
    orientation,
    textAnchor: labelStyle.textAnchor || defaultTextAnchors[orientation],
    verticalAnchor: labelStyle.verticalAnchor || defaultVerticalAnchors[orientation],
    angle: labelStyle.angle,
    horizontal
  };
};
/* eslint-enable max-params*/

const getBaseProps = (props, fallbackProps) => {
  // eslint-disable-line max-statements
  props = Helpers.modifyProps(props, fallbackProps, "candlestick");
  const calculatedValues = getCalculatedValues(props);
  const { data, style, scale, domain, origin, labelOrientation } = calculatedValues;
  const {
    groupComponent,
    width,
    height,
    padding,
    standalone,
    name,
    candleWidth,
    candleRatio,
    theme,
    polar,
    wickStrokeWidth,
    labels,
    events,
    sharedEvents,
    horizontal
  } = props;
  const initialChildProps = {
    parent: {
      domain,
      scale,
      width,
      height,
      data,
      standalone,
      theme,
      polar,
      origin,
      name,
      style: style.parent,
      padding,
      horizontal
    }
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;
    const x = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
    const high = scale.y(datum._high);
    const close = scale.y(datum._close);
    const open = scale.y(datum._open);
    const low = scale.y(datum._low);
    const dataStyle = getDataStyles(datum, style.data, props);
    const dataProps = {
      x,
      high,
      low,
      candleWidth,
      candleRatio,
      scale,
      data,
      datum,
      groupComponent,
      index,
      style: dataStyle,
      width,
      polar,
      origin,
      wickStrokeWidth,
      open,
      close,
      horizontal,
      labelOrientation
    };
    dataProps.candleWidth = getCandleWidth(dataProps);
    const extendedProps = defaults(Object.assign({}, dataProps), props);

    childProps[eventKey] = {
      data: dataProps
    };

    if (labels) {
      const text = LabelHelpers.getText(props, datum, index);
      if ((text !== undefined && text !== null) || (labels && (events || sharedEvents))) {
        childProps[eventKey].labels = getLabelProps(extendedProps, text, style);
      }
    }

    TYPES.forEach((type) => {
      const labelText = getText(extendedProps, type);
      const labelProp = props.labels || props[`${type}Labels`];
      if (
        (labelText !== null && labelText !== undefined) ||
        (labelProp && (events || sharedEvents))
      ) {
        const target = `${type}Labels`;
        childProps[eventKey][target] = getLabelProps(extendedProps, labelText, style, type);
      }
    });

    return childProps;
  }, initialChildProps);
};

export { getBaseProps, getDomain, getData };
