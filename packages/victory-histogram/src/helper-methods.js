import { assign, isNil, uniq, flatten, last } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale, Collection } from "victory-core";
import { getBarPosition } from "victory-bar";
import isEqual from "react-fast-compare";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";

const cacheLastValue = (func) => {
  let called = false;
  let lastArgs;
  let lastReturnVal;

  return (...args) => {
    if (called && isEqual(lastArgs, args)) {
      return lastReturnVal;
    }

    const value = func(...args);

    called = true;
    lastReturnVal = value;
    lastArgs = args;

    return value;
  };
};

const dataOrBinsContainDates = ({ data, bins, accessor }) => {
  const dataIsDates = data.some((datum) => accessor(datum) instanceof Date);
  const binsHasDates = Array.isArray(bins) && bins.some((bin) => bin instanceof Date);

  return dataIsDates || binsHasDates;
};

const getBinningFunc = ({ data, bins }) => {
  const accessor = Helpers.createAccessor("_x");
  const bin = d3Array.bin().value(accessor);

  const containsDates = dataOrBinsContainDates({ data, bins, accessor });
  const containsStrings =  data.some(({ xName }) => !isNil(xName))


  const niceScale = (containsDates ? d3Scale.scaleTime() : d3Scale.scaleLinear())
    .domain(d3Array.extent(data, accessor))
    .nice();

  if (containsStrings) {
    const stringMapValues = uniq(data.map(d => d._x)).sort();
    const thresholds = flatten(stringMapValues.map(v => [v - 0.5, v + 0.5]));
    bin.domain([thresholds[0], last(thresholds)]);
    bin.thresholds(thresholds);
    return bin;
  }

  if (Array.isArray(bins)) {
    bin.domain([bins[0], bins[bins.length - 1]]);
    bin.thresholds(bins);
    return bin;
  }

  if (Number.isInteger(bins)) {
    bin.domain(niceScale.domain());
    bin.thresholds(bins);
    return bin;
  }

  if (containsDates) {
    bin.domain(niceScale.domain());
    bin.thresholds(niceScale.ticks());
    return bin;
  }

  bin.domain(niceScale.domain());

  return bin;
};

export const getFormattedData = cacheLastValue(({ data = [], bins }) => {
  if ((!data || !data.length) && !Array.isArray(bins)) {
    return [];
  }
  const makeBinFilter = () => {
    const accessor = Helpers.createAccessor("_x");
    const dataOrBinsContainsDates = dataOrBinsContainDates({ data, bins, accessor });
    return ({ x0, x1 }) => {
      if (dataOrBinsContainsDates) {
        return new Date(x0).getTime() !== new Date(x1).getTime();
      }
      return x0 !== x1;
    }
  }

  const binFunc = getBinningFunc({ data, bins });
  const rawBinnedData = binFunc(data);
  const binnedData = rawBinnedData.filter(makeBinFilter());
  const formattedData = binnedData.map((bin) => {
    const { x0, x1 } = bin;
    const firstBin = bin.length ? bin[0] : {};
    const xName = firstBin.xName;
    const _x = x0 instanceof Date ? new Date((x0.getTime() + x1.getTime()) / 2) : (x0 + x1) / 2;
    return {
      x0,
      x1,
      _x: xName ? firstBin._x : _x,
      _y: bin.length,
      xName,
      binnedData: [...bin]
    };
  });

  return formattedData;
});

const getData = (props) => {
  const { bins, x } = props;
  const data = Data.getData(props);
  const dataIsPreformatted = data.some(({ _y }) => !isNil(_y));
  return dataIsPreformatted ? data : getFormattedData({ data, x, bins });
};

const reduceData = (dataset, axis, type) => {
  const xDataTypes = { min: "x0", max: "x1" };
  const yDataTypes = { min: "_y0", max: "_y1" };
  const dataType = axis === "x" ? xDataTypes[type] : yDataTypes[type];
  const baseCondition = type === "min" ? Infinity : -Infinity;
  const result = dataset.reduce((memo, datum) => {
    const current = axis === "x" ? datum[dataType] : datum[dataType] || datum._y;
    return (memo < current && type === "min") || (memo > current && type === "max")
      ? memo
      : current;
  }, baseCondition);
  return result;
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
  const dataset = getData(props);

  const ensureZero = (domain) => {
    const maxDomainProp = Domain.getMaxFromProps(props, axis);
    const minDomainProp = Domain.getMinFromProps(props, axis);
    if (axis === "x") {
      return domain;
    }
    const y0Min = dataset.reduce((min, datum) => (datum._y0 < min ? datum._y0 : min), Infinity);
    const defaultMin = y0Min !== Infinity ? y0Min : 0;
    const max =
      maxDomainProp !== undefined ? maxDomainProp : Collection.getMaxValue(domain, defaultMin);
    const min =
      minDomainProp !== undefined ? minDomainProp : Collection.getMinValue(domain, defaultMin);

    return Domain.getDomainFromMinMax(min, max);
  };
  const formatDomain = (domain) => {
    return Domain.formatDomain(ensureZero(domain), props, axis);
  };

  const domain =
    Domain.getDomainFromProps(props, axis)
    || getDomainFromData(props, axis, dataset)
    || Scale.getBaseScale(props, axis).domain();
  return formatDomain(domain);
};

const getCalculatedValues = (props) => {
  const defaultStyles = Helpers.getDefaultStyles(props, "histogram");
  const style = Helpers.getStyles(props.style, defaultStyles);
  const data = getData(props);

  const range = props.range || {
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

  const origin = props.polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;

  return { style, data, scale, domain, origin };
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "histogram");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));

  const {
    binSpacing,
    cornerRadius,
    data,
    domain,
    events,
    height,
    horizontal,
    padding,
    scale,
    sharedEvents,
    standalone,
    style,
    theme,
    width,
    labels,
    name,
    getPath,
    polar,
    origin
  } = props;
  const initialChildProps = {
    parent: {
      horizontal,
      domain,
      scale,
      width,
      height,
      data,
      standalone,
      name,
      theme,
      padding,
      style: style.parent
    }
  };

  const getDistance = (datum) => {
    const current = scale.x(datum.x0);
    const next = scale.x(datum.x1);
    return Math.abs(next - current);
  };

  const getBarWidth = (datum) => {
    if (binSpacing) {
      return getDistance(datum) - binSpacing;
    }

    return getDistance(datum);
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;

    const { x, y, y0, x0 } = getBarPosition(props, datum);
    const barWidth = getBarWidth(datum);

    const dataProps = {
      alignment: "middle",
      barWidth,
      cornerRadius,
      data,
      datum,
      horizontal,
      index,
      scale,
      style: style.data,
      width,
      height,
      x,
      y,
      y0,
      x0,
      getPath,
      polar,
      origin,
    };

    childProps[eventKey] = {
      data: dataProps
    };

    const text = LabelHelpers.getText(props, datum, index);
    if ((text !== undefined && text !== null) || (labels && (events || sharedEvents))) {
      childProps[eventKey].labels = LabelHelpers.getProps(props, index);
    }

    return childProps;
  }, initialChildProps);
};

export { getData, getDomain, getBaseProps };
