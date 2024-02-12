import { defaults, isPlainObject } from "lodash";
import {
  Helpers,
  Scale,
  Domain,
  Data,
  LabelHelpers,
  Collection,
  VictoryStyleObject,
} from "victory-core";

const TYPES = ["close", "open", "high", "low"];

const DEFAULT_CANDLE_WIDTH = 8;

export const getData = (props) => {
  const accessorTypes = ["x", "high", "low", "close", "open"];
  return Data.formatData(props.data, props, accessorTypes);
};

const reduceData = (dataset, axis, type) => {
  const yDataTypes = { min: "_low", max: "_high" };
  const dataType = axis === "x" ? "_x" : yDataTypes[type];
  const baseCondition = type === "min" ? Infinity : -Infinity;
  return dataset.reduce((memo, datum) => {
    const current = datum[dataType];
    return (memo < current && type === "min") ||
      (memo > current && type === "max")
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
  const min =
    minDomain !== undefined ? minDomain : reduceData(dataset, axis, "min");
  const max =
    maxDomain !== undefined ? maxDomain : reduceData(dataset, axis, "max");
  return Domain.getDomainFromMinMax(min, max);
};

export const getDomain = (props, axis) => {
  return Domain.createDomainFunction(getDomainFromData)(props, axis);
};

const getLabelStyle = (props, styleObject, namespace) => {
  const component = props[`${namespace}LabelComponent`];
  const baseStyle = styleObject[`${namespace}Labels`] || styleObject.labels;
  if (!Helpers.isTooltip(component)) {
    return baseStyle;
  }
  const tooltipTheme = (props.theme && props.theme.tooltip) || {};
  return defaults({}, tooltipTheme.style, baseStyle);
};

const getStyles = (
  props,
  style,
  defaultStyles: {
    parent?: any;
    labels?: any;
    data?: any;
  } = {},
) => {
  if (props.disableInlineStyles) {
    return {};
  }
  const width = "100%";
  const height = "100%";

  if (!style) {
    return defaults(
      {
        parent: {
          height,
          width,
        },
      },
      defaultStyles,
    );
  }

  const defaultParent = defaultStyles.parent || {};
  const defaultLabels = defaultStyles.labels || {};
  const defaultData = defaultStyles.data || {};
  const labelStyle = defaults({}, style.labels, defaultLabels);
  return {
    parent: defaults({}, style.parent, defaultParent, {
      width,
      height,
    }),
    labels: labelStyle,
    data: defaults({}, style.data, defaultData),
    openLabels: defaults(
      {},
      style.openLabels,
      getLabelStyle(props, defaultStyles, "open"),
      labelStyle,
    ),
    closeLabels: defaults(
      {},
      style.closeLabels,
      getLabelStyle(props, defaultStyles, "close"),
      labelStyle,
    ),
    lowLabels: defaults(
      {},
      style.lowLabels,
      getLabelStyle(props, defaultStyles, "low"),
      labelStyle,
    ),
    highLabels: defaults(
      {},
      style.highLabels,
      getLabelStyle(props, defaultStyles, "high"),
      labelStyle,
    ),
  };
};

// This method will edit or remove candlestick data points that fall outside of the desired domain
// eslint-disable-next-line complexity
const formatDataFromDomain = (datum, domain) => {
  const minDomainX = Collection.getMinValue(domain.x);
  const maxDomainX = Collection.getMaxValue(domain.x);
  const minDomainY = Collection.getMinValue(domain.y);
  const maxDomainY = Collection.getMaxValue(domain.y);
  let { _x, _low, _open, _close, _high } = datum;

  // if _x falls outside of min or max
  if (_x < minDomainX || _x > maxDomainX) _x = null;

  // if all values fall outside of domain, null the data point
  if (
    _low < minDomainY &&
    _open < minDomainY &&
    _close < minDomainY &&
    _high < minDomainY
  )
    _low = _open = _close = _high = null;
  if (
    _low > maxDomainY &&
    _open > maxDomainY &&
    _close > maxDomainY &&
    _high > maxDomainY
  )
    _low = _open = _close = _high = null;

  return Object.assign({}, datum, { _x, _low, _open, _close, _high });
};

const getCalculatedValues = (props) => {
  const { polar } = props;
  const defaultStyle = Helpers.getDefaultStyles(props, "candlestick");
  const style = getStyles(props, props.style, defaultStyle);
  const data = getData(props);
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y"),
  };
  const domain = {
    x: getDomain(props, "x"),
    y: getDomain(props, "y"),
  };
  const scale = {
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(props.horizontal ? range.x : range.y),
  };
  const origin = polar
    ? props.origin || Helpers.getPolarOrigin(props)
    : undefined;
  const defaultOrientation = props.horizontal ? "top" : "right";
  const labelOrientation = props.labelOrientation || defaultOrientation;
  return { domain, data, scale, style, origin, labelOrientation };
};

const isTransparent = (attr) => {
  return attr === "none" || attr === "transparent";
};

const getDataStyles = (
  datum,
  style: { fill?: string; stroke?: string } = {},
  props,
) => {
  if (props.disableInlineStyles) {
    return {};
  }
  const candleColor =
    datum._open > datum._close
      ? props.candleColors.negative
      : props.candleColors.positive;
  const fill = style.fill || candleColor;
  const strokeColor = style.stroke;
  const stroke = isTransparent(strokeColor) ? fill : strokeColor || "black";
  return Object.assign({}, style, { stroke, fill });
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

const getCandleWidth = (props, style?: VictoryStyleObject) => {
  const { data, candleWidth, scale } = props;
  if (candleWidth) {
    return Helpers.isFunction(candleWidth)
      ? Helpers.evaluateProp(candleWidth, props)
      : candleWidth;
  } else if (style && style.width) {
    return style.width;
  }
  const range = scale.x.range();
  const extent = Math.abs(range[1] - range[0]);
  const candles = data.length + 2;
  const candleRatio = props.candleRatio || 0.5;
  const defaultWidth =
    candleRatio * (data.length < 2 ? DEFAULT_CANDLE_WIDTH : extent / candles);
  return Math.max(1, defaultWidth);
};

const getOrientation = (labelOrientation, type = "labels") => {
  return isPlainObject(labelOrientation)
    ? labelOrientation[type]
    : labelOrientation;
};

/* eslint-disable complexity*/
const calculatePlotValues = (props) => {
  const {
    positions,
    labelStyle,
    x,
    horizontal,
    computedType,
    candleWidth,
    orientation,
  } = props;
  positions.labels = (positions.open + positions.close) / 2;

  const signX = orientation === "left" ? -1 : 1;
  const signY = orientation === "top" ? -1 : 1;

  if (horizontal) {
    const yValue = x;
    const xValue = positions[computedType];

    const dy =
      orientation === "top" || orientation === "bottom"
        ? signY * (candleWidth / 2) + signY * (labelStyle.padding || 0)
        : 0;

    const dx =
      orientation === "top" || orientation === "bottom"
        ? 0
        : signX * (labelStyle.padding || 1);

    return { yValue, xValue, dx, dy };
  }
  const xValue = x;
  const yValue = positions[computedType];

  const dy =
    orientation === "top" || orientation === "bottom"
      ? signY * (labelStyle.padding || 1)
      : 0;

  const dx =
    orientation === "top" || orientation === "bottom"
      ? 0
      : signX * (candleWidth / 2) + signX * (labelStyle.padding || 0);

  return { yValue, xValue, dx, dy };
};
/* eslint-enable complexity*/

/* eslint-disable max-params*/
const getLabelProps = (props, text, style, type?: string) => {
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
    labelOrientation,
    theme,
  } = props;

  const component = props[`${type}LabelComponent`] || props.labelComponent;
  const defaultOrientation = horizontal ? "top" : "right";
  const orientation =
    (component.props && component.props.orientation) ||
    getOrientation(labelOrientation, type) ||
    defaultOrientation;
  const positions = { high, low, open, close };
  const namespace = type ? `${type}Labels` : "labels";
  const labelStyle = style[namespace] || style.labels;
  const defaultVerticalAnchors = {
    top: "end",
    bottom: "start",
    left: "middle",
    right: "middle",
  };
  const defaultTextAnchors = {
    left: "end",
    right: "start",
    top: "middle",
    bottom: "middle",
  };
  const computedType = type ? type : "labels";

  const plotProps = {
    positions,
    labelStyle,
    x,
    horizontal,
    computedType,
    candleWidth,
    orientation,
  };
  const { yValue, xValue, dx, dy } = calculatePlotValues(plotProps);

  const labelProps = {
    style: labelStyle,
    y: yValue,
    x: xValue,
    dx,
    dy,
    text,
    index,
    scale,
    datum,
    data,
    orientation,
    textAnchor: labelStyle.textAnchor || defaultTextAnchors[orientation],
    verticalAnchor:
      labelStyle.verticalAnchor || defaultVerticalAnchors[orientation],
    angle: labelStyle.angle,
    horizontal,
  };

  if (!Helpers.isTooltip(component)) {
    return labelProps;
  }
  const tooltipTheme = (theme && theme.tooltip) || {};
  return defaults({}, labelProps, Helpers.omit(tooltipTheme, ["style"]));
};
/* eslint-enable max-params*/

export const getBaseProps = (initialProps, fallbackProps) => {
  // eslint-disable-line max-statements
  const props = Helpers.modifyProps(initialProps, fallbackProps, "candlestick");
  const calculatedValues = getCalculatedValues(props);
  const { data, style, scale, domain, origin, labelOrientation } =
    calculatedValues;
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
    horizontal,
    disableInlineStyles,
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
      horizontal,
    },
  };

  // eslint-disable-next-line complexity
  return data.reduce((childProps, datum, index) => {
    const eventKey = !Helpers.isNil(datum.eventKey) ? datum.eventKey : index;
    const x = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
    const formattedDatum = formatDataFromDomain(datum, domain);
    const { _low, _open, _close, _high } = formattedDatum;
    const high = scale.y(_high);
    const close = scale.y(_close);
    const open = scale.y(_open);
    const low = scale.y(_low);

    const dataStyle = getDataStyles(formattedDatum, style.data, props);
    const dataProps = {
      x,
      high,
      low,
      candleWidth,
      candleRatio,
      scale,
      data,
      datum: formattedDatum,
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
      labelOrientation,
      disableInlineStyles,
    };
    dataProps.candleWidth = getCandleWidth(dataProps);
    const extendedProps = defaults(Object.assign({}, dataProps), props);

    childProps[eventKey] = {
      data: dataProps,
    };

    if (labels) {
      const text = LabelHelpers.getText(props, formattedDatum, index);
      if (
        (text !== undefined && text !== null) ||
        (labels && (events || sharedEvents))
      ) {
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
        childProps[eventKey][target] = getLabelProps(
          extendedProps,
          labelText,
          style,
          type,
        );
      }
    });

    return childProps;
  }, initialChildProps);
};
