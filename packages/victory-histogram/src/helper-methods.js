import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "../../victory-core/src";
import { getBarPosition } from "../../victory-bar/src/helper-methods";
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

const isDataDates = (data, x) => {
  const xAccessor = Helpers.createAccessor(x || "x");
  const dataIsDates = data.some((datum) => xAccessor(datum) instanceof Date);

  return dataIsDates;
};

const getBinningFunc = ({ data, x, bins, dataIsDates }) => {
  const xAccessor = Helpers.createAccessor(x || "x");
  const bin = d3Array.bin().value(xAccessor);
  const niceScale = (dataIsDates ? d3Scale.scaleLinear() : d3Scale.scaleTime())
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
    bin.domain(niceScale.domain());
    bin.thresholds(niceScale.ticks());

    return bin;
  }

  bin.domain(niceScale.domain());

  return bin;
};

const getFormattedData = cacheLastValue(({ data = [], x, bins }) => {
  if ((!data || !data.length) && !Array.isArray(bins)) {
    return [];
  }

  const dataIsDates = isDataDates(data, x);
  const binFunc = getBinningFunc({ data, x, bins, dataIsDates });
  const binnedData = binFunc(data).filter(({ x0, x1 }) => x0 !== x1);

  const formattedData = binnedData.map((bin) => ({
    x: dataIsDates ? new Date(bin.x0) : bin.x0,
    end: dataIsDates ? new Date(bin.x1) : bin.x1,
    y: bin.length,
    binnedDatums: [...bin]
  }));

  return formattedData;
});

const getData = (props) => {
  const { bins, data, x } = props;
  const dataIsPreformatted = data.some(({ _y }) => !isNil(_y));

  const formattedData = dataIsPreformatted ? data : getFormattedData({ data, x, bins });

  return Data.getData({ ...props, data: formattedData, x: "x" });
};

const getDomain = (props, axis) => {
  const data = getData(props);

  if (!data.length) {
    return [0, 1];
  }

  if (axis === "x") {
    const firstBin = data[0];
    const lastBin = data[data.length - 1];

    return [firstBin.x, lastBin.end];
  }

  return props.data.length ? Domain.getDomainWithZero({ ...props, data }, "y") : [0, 1];
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

  const getBarWidth = (datum) => {
    if (barSpacing) {
      return getDistance(datum) - barSpacing;
    }

    return getDistance(datum);
  };

  const barOffset = (() => {
    if (barSpacing) {
      const distance = barSpacing / 2;
      return [distance, 0];
    }

    return [0, 0];
  })();

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;

    const { x, y, y0, x0 } = getBarPosition(props, datum);
    const barWidth = getBarWidth(datum);

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
      childProps[eventKey].labels = LabelHelpers.getProps(props, index, [
        barWidth / 2 + barOffset[0],
        0
      ]);
    }

    return childProps;
  }, initialChildProps);
};

export { getData, getDomain, getBaseProps };
