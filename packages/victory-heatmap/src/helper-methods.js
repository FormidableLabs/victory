import { assign, isNil, flatten, maxBy, uniq, last } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale, Collection } from "victory-core";
// import { getBarPosition } from "victory-bar";
import isEqual from "react-fast-compare";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";

const getBarPosition = (props, datum) => {
  const getDefaultMin = (axis) => {
    const defaultZero =
      Scale.getType(props.scale[axis]) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;
    let defaultMin = defaultZero;
    const minY = Collection.getMinValue(props.domain[axis]);
    const maxY = Collection.getMaxValue(props.domain[axis]);

    if (minY < 0 && maxY <= 0) {
      defaultMin = maxY;
    } else if (minY >= 0 && maxY > 0) {
      defaultMin = minY;
    }

    return datum[`_${axis}`] instanceof Date ? new Date(defaultMin) : defaultMin;
  };
  const _y0 = datum._y0 !== undefined ? datum._y0 : getDefaultMin("y");
  const _x0 = datum._x0 !== undefined ? datum._x0 : getDefaultMin("x");
  return Helpers.scalePoint(props, assign({}, datum, { _y0, _x0 }));
};

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

const getBinningFunc = ({ data, bins, type = "x" }) => {
  const accessor = Helpers.createAccessor(`_${type}`);
  const bin = d3Array.bin().value(accessor);

  const containsDates = dataOrBinsContainDates({ data, bins, accessor});
  const containsStrings =  data.some((d) => !isNil(d[`${type}Name`]))


  const niceScale = (containsDates ? d3Scale.scaleTime() : d3Scale.scaleLinear())
    .domain(d3Array.extent(data, accessor))
    .nice();

  if (containsStrings) {
    const stringMapValues = uniq(data.map(d => d[`_${type}`])).sort();
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
  const makeBinFilter = (type) => {
    const accessor = Helpers.createAccessor(`_${type}`);
    const dataOrBinsContainsDates = dataOrBinsContainDates({ data, bins, accessor });
    return ({ x0, x1 }) => {
      if (dataOrBinsContainsDates) {
        return new Date(x0).getTime() !== new Date(x1).getTime();
      }
      return x0 !== x1;
    }
  }
  const binFunc = getBinningFunc({ data, bins, type: "x" });

  const rawBinnedData = binFunc(data);
  const binnedData = rawBinnedData.filter(makeBinFilter("x"));

  const yBinFunc = getBinningFunc({ data, bins, type: "y" });

  const formattedData = binnedData.map((bin) => {
    const { x0, x1 } = bin;
    const firstXBin = bin.length ? bin[0] : {};
    const xName = firstXBin.xName;
    const rawYBins = yBinFunc(bin);
    const yBins = rawYBins.filter(makeBinFilter("y"));
    const _x = x0 instanceof Date ? new Date((x0.getTime() + x1.getTime()) / 2) : (x0 + x1) / 2;

    return yBins.map(yBin => {
      const firstYBin = yBin.length ? yBin[0] : {};
      const yName = firstYBin.yName;
      const _y = yBin.x0 instanceof Date
        ? new Date((yBin.x0.getTime() + yBin.x1.getTime()) / 2)
        : (yBin.x0 + yBin.x1) / 2;

      return {
        x0,
        x1,
        _x: xName ? firstXBin._x : _x,
        _y0: yBin.x0,
        _y1: yBin.x1,
        _y: yName ? firstYBin._y : _y,
        points: yBin,
        binLength: yBin.length
      }
    })
  });

  return flatten(formattedData);
});

const getData = (props) => {
  const { bins } = props;
  const data = Data.getData(props);
  // const dataIsPreformatted = data.some(({ _z }) => !isNil(_z));
  const dataIsPreformatted = false;
  return dataIsPreformatted ? data : getFormattedData({ data, bins });
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

// const getDomain = (props, axis) => {
//   const data = getData(props);

//   if (!data.length) {
//     return [0, 1];
//   }

//   if (axis === "x") {
//     const firstBin = data[0];
//     const lastBin = data[data.length - 1];

//     return Domain.getDomainWithZero(
//       { ...props, data: [{ x: firstBin.x0 }, { x: lastBin.x1 }], x: "x" },
//       "x"
//     );
//   }

//   return props.data.length ? Domain.getDomainWithZero({ ...props, data }, "y") : [0, 1];
// };

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

  return { style, data, scale, domain };
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "heatmap");
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
    getPath
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

  const maxLength = maxBy(data, "binLength");

  const result = data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;

    const { x, y, y0, x0 } = getBarPosition(props, datum);
    const barWidth = getBarWidth(datum);
    const t = datum.binLength / maxLength.binLength;
    const fill = d3ScaleChromatic.interpolateRdYlBu(t);

    const dataProps = {
      alignment: "middle",
      barWidth,
      cornerRadius,
      data,
      datum,
      horizontal,
      index,
      scale,
      style: assign({}, style.data, { fill }),
      width,
      height,
      x,
      y,
      y0,
      x0,
      getPath
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
  // console.log("BASEPROPS", result);
  return result;
};

export { getData, getDomain, getBaseProps };
