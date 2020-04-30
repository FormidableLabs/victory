import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "../../victory-core/src";
import { getBarPosition } from "../../victory-bar/src/helper-methods";
import isEqual from "react-fast-compare";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const addYears = (date, years) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

const getNextDate = (date, strategy) => {
  if (strategy === "day") {
    return addDays(date, 1);
  } else if (strategy === "month") {
    return addMonths(date, 1);
  }

  return addYears(date, 1);
};

const resetDate = (date, strategy) => {
  const newDate = new Date(date);
  if (strategy === "day") {
    newDate.setHours(0, 0, 0, 0);
  } else if (strategy === "month") {
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(1);
  } else {
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(1);
    newDate.setMonth(0);
  }

  return newDate;
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

const getBinningFunc = ({ data, x, bins }) => {
  const xAccessor = Helpers.createAccessor(x || "x");
  const dataIsDates = data.some((datum) => xAccessor(datum) instanceof Date);
  const bin = d3Array.bin().value(xAccessor);
  const niceScale = d3Scale
    .scaleLinear()
    .domain(d3Array.extent(data, xAccessor))
    .nice();

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

  if (dataIsDates) {
    const sortedData = data.sort((a, b) => xAccessor(a) - xAccessor(b));

    const earliestDate = xAccessor(sortedData[0]);
    const latestDate = xAccessor(sortedData[data.length - 1]);

    // 'day', 'month', 'year'
    const binningStrategy = bins ? bins : "day";
    const dateBins = (() => {
      let currentDateBins = [resetDate(earliestDate, binningStrategy)];

      while (currentDateBins[currentDateBins.length - 1] < latestDate) {
        const lastDate = currentDateBins[currentDateBins.length - 1];
        const nextDate = getNextDate(lastDate, binningStrategy);

        currentDateBins = [...currentDateBins, nextDate];
      }

      return currentDateBins;
    })();

    bin.thresholds(dateBins);

    return bin;
  }

  bin.domain(niceScale.domain());

  return bin;
};

const getFormattedData = cacheLastValue(({ data, x, bins }) => {
  const binFunc = getBinningFunc({ data, x, bins });

  const binnedData = binFunc(data).filter(({ x0, x1 }) => x0 !== x1);
  const formattedData = binnedData.map((bin) => ({
    x: bin.x0,
    end: bin.x1,
    range: `${new Date(bin.x0)} - ${new Date(bin.x1)}`,
    y: bin.length,
    binnedDatums: [...bin]
  }));

  return formattedData;
});

const getData = (props) => {
  const { bins, data, x } = props;

  if (!data || !data.length) {
    return [];
  }

  const formattedData = getFormattedData({ data, x, bins });
  return Data.getData({ ...props, data: formattedData });
};

const getDomain = (props, axis) => {
  const data = getData(props);

  if (!data.length) {
    return [0, 0];
  }

  if (axis === "x") {
    const firstBin = data[0];
    const lastBin = data[data.length - 1];

    return [firstBin.x, lastBin.end];
  }

  return Domain.getDomainWithZero({ ...props, data }, "y");
};

const getCalculatedValues = (props) => {
  const { theme } = props;
  const defaultStyles =
    theme && theme.histogram && theme.histogram.style ? theme.histogram.style : {};
  const style = Helpers.getStyles(props.style, defaultStyles);
  const data = getData(props);

  const range = props.range || {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };

  const domain = props.domain || {
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
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "histogram");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));

  const {
    barSpacing,
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
    const current = scale.x(datum.x);
    const next = scale.x(datum.end);

    return Math.abs(next - current);
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;

    const { x, y, y0, x0 } = getBarPosition(props, datum);

    const barWidth = (() => {
      if (barSpacing) {
        return getDistance(datum) - barSpacing;
      }

      return getDistance(datum);
    })();

    const barOffset = (() => {
      if (barSpacing) {
        const distance = barSpacing / 2;
        return [distance, 0];
      }

      return [0, 0];
    })();

    const dataProps = {
      alignment: "start",
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
      barOffset,
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
};

export { getData, getDomain, getBaseProps };
