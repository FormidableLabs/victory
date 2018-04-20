import { assign, orderBy } from "lodash";
import { Helpers, LabelHelpers, Scale, Domain, Data } from "victory-core";

const sortData = (dataset, sortKey, sortOrder = "ascending") => {
  if (!sortKey) {
    return dataset;
  }

  if (sortKey === "x" || sortKey === "y") {
    sortKey = `_${sortKey}`;
  }

  const sortedData = orderBy(dataset, sortKey);

  if (sortOrder === "descending") {
    return sortedData.reverse();
  }

  return sortedData;
};

const getData = (props) => {
  if (!props.data || Data.getLength(props.data) < 1) {
    return [];
  }
  const stringMap = {
    x: Data.createStringMap(props, "x")
  };

  const accessor = {
    x: Helpers.createAccessor(props.x !== undefined ? props.x : "x"),
    open: Helpers.createAccessor(props.open !== undefined ? props.open : "open"),
    close: Helpers.createAccessor(props.close !== undefined ? props.close : "close"),
    high: Helpers.createAccessor(props.high !== undefined ? props.high : "high"),
    low: Helpers.createAccessor(props.low !== undefined ? props.low : "low")
  };

  const formattedData = props.data.reduce((dataArr, datum, index) => {
    datum = Data.parseDatum(datum);

    const evaluatedX = accessor.x(datum);
    const _x = evaluatedX !== undefined ? evaluatedX : index;
    const _open = accessor.open(datum);
    const _close = accessor.close(datum);
    const _high = accessor.high(datum);
    const _low = accessor.low(datum);
    const _y = [_open, _close, _high, _low];

    dataArr.push(
      assign(
        {},
        datum,
        { _x, _y, _open, _close, _high, _low },
        typeof _x === "string" ? { _x: stringMap.x[_x], x: _x } : {}
      )
    );

    return dataArr;
  }, []);

  return sortData(formattedData, props.sortKey, props.sortOrder);
};

const getDomain = (props, axis) => {
  let domain;
  if (props.domain && props.domain[axis]) {
    domain = props.domain[axis];
  } else if (props.domain && Array.isArray(props.domain)) {
    domain = props.domain;
  } else {
    const dataset = getData(props);
    const allData = dataset.reduce((memo, datum) => {
      return Array.isArray(datum[`_${axis}`]) ?
        memo.concat(...datum[`_${axis}`]) : memo.concat(datum[`_${axis}`]);
    },
      []);

    if (allData.length < 1) {
      return Scale.getBaseScale(props, axis).domain();
    }

    const min = Math.min(...allData);
    const max = Math.max(...allData);
    if (+min === +max) {
      return Domain.getSinglePointDomain(max);
    }
    domain = [min, max];
  }
  return Domain.cleanDomain(Domain.padDomain(domain, props, axis), props);
};

const getCalculatedValues = (props) => {
  const { theme, polar } = props;
  const defaultStyle = theme && theme.candlestick && theme.candlestick.style ?
    theme.candlestick.style : {};
  const style = Helpers.getStyles(props.style, defaultStyle);
  const data = Data.addEventKeys(props, getData(props));
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const domain = {
    x: getDomain(props, "x"),
    y: getDomain(props, "y")
  };
  const scale = {
    x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
    y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
  };
  const origin = polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
  return { domain, data, scale, style, origin };
};


const isTransparent = (attr) => {
  return attr === "none" || attr === "transparent";
};

const getDataStyles = (datum, style, props) => {
  style = style || {};
  const candleColor = datum.open > datum.close ?
    props.candleColors.negative : props.candleColors.positive;
  const fill = style.fill || candleColor;
  const strokeColor = style.stroke;
  const stroke = isTransparent(strokeColor) ? fill : strokeColor || "black";
  return assign({}, style, { stroke, fill });
};

const getLabelProps = (dataProps, text, style) => {
  const { x, high, index, scale, datum, data } = dataProps;
  const labelStyle = style.labels || {};
  return {
    style: labelStyle,
    y: high - (labelStyle.padding || 0),
    x,
    text,
    index,
    scale,
    datum,
    data,
    textAnchor: labelStyle.textAnchor,
    verticalAnchor: labelStyle.verticalAnchor || "end",
    angle: labelStyle.angle
  };
};

const getBaseProps = (props, fallbackProps) => { // eslint-disable-line max-statements
  props = Helpers.modifyProps(props, fallbackProps, "candlestick");
  const calculatedValues = getCalculatedValues(props);
  const { data, style, scale, domain, origin } = calculatedValues;
  const {
    groupComponent, width, height, padding, standalone,
    theme, polar, wickStrokeWidth, labels, events, sharedEvents
  } = props;
  const initialChildProps = { parent: {
    domain, scale, width, height, data, standalone, theme, polar, origin,
    style: style.parent, padding
  } };

  return data.reduce((childProps, datum, index) => {
    const eventKey = datum.eventKey || index;
    const x = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
    const high = scale.y(datum._high);
    const close = scale.y(datum._close);
    const open = scale.y(datum._open);
    const low = scale.y(datum._low);
    const candleHeight = Math.abs(scale.y(datum._open) - scale.y(datum._close));
    const dataStyle = getDataStyles(datum, style.data, props);
    const dataProps = {
      x, high, low, candleHeight, scale, data, datum, groupComponent, index,
      style: dataStyle, padding, width, polar, origin, wickStrokeWidth, open, close
    };

    childProps[eventKey] = {
      data: dataProps
    };
    const text = LabelHelpers.getText(props, datum, index);
    if (text !== undefined && text !== null || (labels && (events || sharedEvents))) {
      childProps[eventKey].labels = getLabelProps(dataProps, text, style);
    }

    return childProps;
  }, initialChildProps);
};

export { getBaseProps, getDomain, getData };
