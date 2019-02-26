import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Scale, Domain, Data } from "victory-core";

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

const getCalculatedValues = (props) => {
  const { theme, polar } = props;
  const defaultStyle =
    theme && theme.candlestick && theme.candlestick.style ? theme.candlestick.style : {};
  const style = Helpers.getStyles(props.style, defaultStyle);
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
  return { domain, data, scale, style, origin };
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

const getLabelProps = (dataProps, text, style) => {
  const { x, high, index, scale, datum, data, horizontal } = dataProps;
  const labelStyle = style.labels || {};
  const defaultAnchors = {
    vertical: horizontal ? "middle" : "end",
    text: horizontal ? "start" : "middle"
  };
  return {
    style: labelStyle,
    y: horizontal ? x : high - (labelStyle.padding || 0),
    x: horizontal ? high + (labelStyle.padding || 0) : x,
    text,
    index,
    scale,
    datum,
    data,
    textAnchor: labelStyle.textAnchor || defaultAnchors.text,
    verticalAnchor: labelStyle.verticalAnchor || defaultAnchors.vertical,
    angle: labelStyle.angle,
    horizontal
  };
};

const getBaseProps = (props, fallbackProps) => {
  // eslint-disable-line max-statements
  props = Helpers.modifyProps(props, fallbackProps, "candlestick");
  const calculatedValues = getCalculatedValues(props);
  const { data, style, scale, domain, origin } = calculatedValues;
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
      horizontal
    };

    childProps[eventKey] = {
      data: dataProps
    };
    const text = LabelHelpers.getText(props, datum, index);
    if ((text !== undefined && text !== null) || (labels && (events || sharedEvents))) {
      childProps[eventKey].labels = getLabelProps(dataProps, text, style);
    }

    return childProps;
  }, initialChildProps);
};

export { getBaseProps, getDomain, getData };
