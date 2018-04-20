import { orderBy, defaults, assign, uniq, groupBy, keys, isEmpty } from "lodash";
import { Helpers, Scale, Domain, Data, Collection } from "victory-core";
import { min as d3Min, max as d3Max, quantile as d3Quantile } from "d3-array";

const TYPES = ["max", "min", "median", "q1", "q3"];

const checkProcessedData = (props, data) => {
  /* check if the data is pre-processed. start by checking that it has
  all required quartile attributes. */
  const hasQuartileAttributes = data.every((datum) => {
    return TYPES.every((val) => typeof datum[`_${val}`] === "number");
  });

  if (hasQuartileAttributes) {
    // check that the indepedent variable is distinct
    const values = data.map(({ _x, _y }) => props.horizontal ? _y : _x);
    if (!uniq(values).length === values.length) {
      throw new Error(`
        data prop may only take an array of objects with a unique
        independent variable. Make sure your x or y values are distinct.
      `);
    }
    return true;
  }
  return false;
};

const getSummaryStatistics = (data, horizontal) => {
  const dependentVars = data.map((datum) => horizontal ? datum._x : datum._y);
  const quartiles = {
    _q1: d3Quantile(dependentVars, 0.25), // eslint-disable-line no-magic-numbers
    _q3: d3Quantile(dependentVars, 0.75), // eslint-disable-line no-magic-numbers
    _min: d3Min(dependentVars),
    _median: d3Quantile(dependentVars, 0.5),
    _max: d3Max(dependentVars)
  };

  return horizontal ?
    assign({}, quartiles, { _y: data[0]._y }) :
    assign({}, quartiles, { _x: data[0]._x });
};

const isHorizontal = (props, data) => {
  const arrayX = data.every((datum) => Array.isArray(datum._x));

  return arrayX || props.horizontal;
};

const processData = (props, data) => {
  /* check if the data is coming in a pre-processed form,
  i.e. { x || y, min, max, q1, q3, median }. if not, process it. */
  const isProcessed = checkProcessedData(props, data);
  if (!isProcessed) {
    // check if the data is coming with x or y values as an array
    const arrayX = data.every((datum) => Array.isArray(datum._x));
    const arrayY = data.every((datum) => Array.isArray(datum._y));
    const horizontal = arrayX || props.horizontal;
    const sortKey = horizontal ? "_x" : "_y";
    const groupKey = horizontal ? "_y" : "_x";
    if (arrayX && arrayY) {
      throw new Error(`
        data may not be given with array values for both x and y
      `);
    } else if (arrayX || arrayY) {
      /* generate summary statistics for each datum. to do this, flatten
      the depedentVarArray and process each datum separately */
      return data.map((datum) => {
        const dataArray = datum[sortKey].map((d) => assign({}, datum, { [sortKey]: d }));
        const sortedData = orderBy(dataArray, sortKey);
        return getSummaryStatistics(sortedData, horizontal);
      });
    } else {
      /* Group data by independent variable and generate summary statistics for each group */
      const groupedData = groupBy(data, groupKey);
      return keys(groupedData).map((key) => {
        const datum = groupedData[key];
        const sortedData = orderBy(datum, sortKey);
        return getSummaryStatistics(sortedData, horizontal);
      });
    }
  } else {
    return data;
  }
};

const getData = (props) => {
  if (!props.data || Data.getLength(props.data) < 1) {
    return [];
  } else if (props.data.every((d) => isEmpty(d))) {
    return [];
  }
  const createAccessor = (name) => {
    return Helpers.createAccessor(props[name] !== undefined ? props[name] : name);
  };

  const stringMap = {
    x: Data.createStringMap(props, "x"),
    y: Data.createStringMap(props, "y")
  };
  const accessorTypes = TYPES.concat("x", "y");
  const accessor = accessorTypes.reduce((memo, type) => {
    memo[type] = createAccessor(type);
    return memo;
  }, {});

  const formattedData = props.data.map((datum) => {
    datum = Data.parseDatum(datum);

    const processedValues = accessorTypes.reduce((memo, type) => {
      const processedValue = accessor[type](datum);
      if (processedValue !== undefined) {
        memo[`_${type}`] = processedValue;
      }
      return memo;
    }, {});

    const { _x, _y } = processedValues;

    const formattedDatum = assign(
      {},
      datum,
      processedValues,
      typeof _x === "string" ? { _x: stringMap.x[_x], x: _x } : {},
      typeof _y === "string" ? { _y: stringMap.y[_y], y: _y } : {}
    );
    return isEmpty(formattedDatum) ? undefined : formattedDatum;
  }).filter(Boolean);
  const result = formattedData.length ?
    Data.addEventKeys(props, processData(props, formattedData)) : [];
  return result;
};

const reduceDataset = (props, dataset, axis) => {
  const allData = dataset.reduce((memo, datum) => {
    return memo.concat(datum[`_${axis}`]);
  }, []);

  if (allData.length < 1) {
    return Scale.getBaseScale(props, axis).domain();
  }
  const minData = Collection.getMinValue(allData);
  const maxData = Collection.getMaxValue(allData);
  if (+minData === +maxData) {
    return Domain.getSinglePointDomain(maxData);
  }
  return [minData, maxData];
};

const getDomainFromMinMax = (dataset) => {
  const allMin = dataset.reduce((memo, datum) => memo.concat(datum._min), []);
  const allMax = dataset.reduce((memo, datum) => memo.concat(datum._max), []);

  const minData = Math.min(...allMin);
  const maxData = Math.max(...allMax);
  if (+minData === +maxData) {
    return Domain.getSinglePointDomain(maxData);
  }

  return [minData, maxData];
};

const getDomain = (props, axis) => {
  let domain;
  if (props.domain && props.domain[axis]) {
    domain = props.domain[axis];
  } else if (props.domain && Array.isArray(props.domain)) {
    domain = props.domain;
  } else {
    const dataset = getData(props);

    if (props.horizontal) {
      // find the domain of all y values, use the min and max for x
      domain = axis === "x" ? getDomainFromMinMax(dataset) : reduceDataset(props, dataset, axis);
    } else {
      // find the domain of all x values, use the min and max for y
      domain = axis === "x" ? reduceDataset(props, dataset, axis) : getDomainFromMinMax(dataset);
    }
  }
  return Domain.cleanDomain(Domain.padDomain(domain, props, axis), props);
};

const getStyles = (props, styleObject) => {
  const style = props.style || {};
  styleObject = styleObject || {};
  const parentStyles = { height: "100%", width: "100%" };
  const labelStyles = defaults({}, style.labels, styleObject.labels);
  const boxStyles = defaults({}, style.boxes, styleObject.boxes);
  const whiskerStyles = defaults({}, style.whiskers, styleObject.whiskers);
  return {
    boxes: boxStyles,
    labels: labelStyles,
    parent: defaults({}, style.parent, styleObject.parent, parentStyles),
    max: defaults({}, style.max, styleObject.max, whiskerStyles),
    maxLabels: defaults({}, style.maxLabels, styleObject.maxlabels, labelStyles),
    median: defaults({}, style.median, styleObject.median, whiskerStyles),
    medianLabels: defaults({}, style.medianLabels, styleObject.medianlabels, labelStyles),
    min: defaults({}, style.min, styleObject.min, whiskerStyles),
    minLabels: defaults({}, style.minLabels, styleObject.minlabels, labelStyles),
    q1: defaults({}, style.q1, styleObject.q1, boxStyles),
    q1Labels: defaults({}, style.q1Labels, styleObject.q1labels, labelStyles),
    q3: defaults({}, style.q3, styleObject.q3, boxStyles),
    q3Labels: defaults({}, style.q3Labels, styleObject.q3labels, labelStyles),
    whiskers: whiskerStyles
  };
};

const getCalculatedValues = (props) => {
  const { theme } = props;
  const data = getData(props);
  const horizontal = isHorizontal(props, data);
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
  const defaultStyles = theme && theme.boxplot && theme.boxplot.style ? theme.boxplot.style : {};
  const style = getStyles(props, defaultStyles);
  const defaultLabelOrientation = horizontal ? "top" : "right";
  const labelOrientation = props.labelOrientation || defaultLabelOrientation;
  const boxWidth = props.boxWidth || 1;
  return { data, horizontal, domain, scale, style, labelOrientation, boxWidth };
};

// eslint-disable-next-line complexity
const getWhiskerProps = (props, type) => {
  const { horizontal, style, boxWidth, whiskerWidth, datum, scale, index } = props;
  const { min, max, q1, q3, x, y } = props.positions;
  const boxValue = type === "min" ? q1 : q3;
  const whiskerValue = type === "min" ? min : max;
  const width = typeof whiskerWidth === "number" ? whiskerWidth : boxWidth;
  return {
    datum, index, scale,
    majorWhisker: {
      x1: horizontal ? boxValue : x,
      y1: horizontal ? y : boxValue,
      x2: horizontal ? whiskerValue : x,
      y2: horizontal ? y : whiskerValue
    },
    minorWhisker: {
      x1: horizontal ? whiskerValue : x - width / 2,
      y1: horizontal ? y - width / 2 : whiskerValue,
      x2: horizontal ? whiskerValue : x + width / 2,
      y2: horizontal ? y + width / 2 : whiskerValue
    },
    style: style[type] || style.whisker
  };
};

const getBoxProps = (props, type) => {
  const { horizontal, boxWidth, style, scale, datum, index } = props;
  const { median, q1, q3, x, y } = props.positions;
  const defaultX = type === "q1" ? q1 : median;
  const defaultY = type === "q1" ? median : q3;
  const defaultWidth = type === "q1" ? median - q1 : q3 - median;
  const defaultHeight = type === "q1" ? q1 - median : median - q3;
  return {
    datum, scale, index,
    x: horizontal ? defaultX : x - boxWidth / 2,
    y: horizontal ? y - boxWidth / 2 : defaultY,
    width: horizontal ? defaultWidth : boxWidth,
    height: horizontal ? boxWidth : defaultHeight,
    style: style[type] || style.boxes
  };
};

const getMedianProps = (props) => {
  const { boxWidth, horizontal, style, datum, scale, index } = props;
  const { median, x, y } = props.positions;
  return {
    datum, scale, index,
    x1: horizontal ? median : x - boxWidth / 2,
    y1: horizontal ? y - boxWidth / 2 : median,
    x2: horizontal ? median : x + boxWidth / 2,
    y2: horizontal ? y + boxWidth / 2 : median,
    style: style.median
  };
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

const getLabelProps = (props, text, type) => {
  const { datum, positions, index, boxWidth, horizontal, labelOrientation, style } = props;
  const namespace = `${type}Labels`;
  const labelStyle = style[namespace] || style.labels;
  const defaultVerticalAnchor = horizontal ? "end" : "middle";
  const defaultTextAnchor = horizontal ? "middle" : "start";
  const whiskerWidth = typeof props.whiskerWidth === "number" ? props.whiskerWidth : boxWidth;
  const width = type === "min" || type === "max" ? whiskerWidth : boxWidth;

  const getDefaultPosition = (coord) => {
    const sign = {
      x: labelOrientation === "left" ? -1 : 1, y: labelOrientation === "top" ? -1 : 1
    };
    return positions[coord] + (sign[coord] * width / 2) + (sign[coord] * (labelStyle.padding || 0));
  };

  return {
    text, datum, index,
    style: labelStyle,
    y: horizontal ? getDefaultPosition("y") : positions[type],
    x: horizontal ? positions[type] : getDefaultPosition("x"),
    textAnchor: labelStyle.textAnchor || defaultTextAnchor,
    verticalAnchor: labelStyle.verticalAnchor || defaultVerticalAnchor,
    angle: labelStyle.angle
  };
};

const getDataProps = (props, type) => {
  if (type === "median") {
    return getMedianProps(props);
  } else if (type === "min" || type === "max") {
    return getWhiskerProps(props, type);
  }
  return getBoxProps(props, type);
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "boxplot");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    groupComponent, width, height, padding, standalone, theme, events, sharedEvents,
    scale, horizontal, data, style, domain
  } = props;
  const initialChildProps = {
    parent: {
      domain, scale, width, height, data, standalone,
      theme, style: style.parent || {}, padding, groupComponent
    }
  };
  const boxScale = horizontal ? scale.x : scale.y;

  return data.reduce((acc, datum, index) => {
    const eventKey = datum.eventKey !== undefined ? datum.eventKey : index;
    const positions = {
      x: scale.x(datum._x),
      y: scale.y(datum._y),
      min: boxScale(datum._min),
      max: boxScale(datum._max),
      median: boxScale(datum._median),
      q1: boxScale(datum._q1),
      q3: boxScale(datum._q3)
    };
    const dataProps = assign({ index, datum, positions }, props);
    const dataObj = TYPES.reduce((memo, type) => {
      memo[type] = getDataProps(dataProps, type);
      return memo;
    }, {});

    acc[eventKey] = dataObj;

    TYPES.forEach((type) => {
      const labelText = getText(dataProps, type);
      const labelProp = props.labels || props[`${type}Labels`];
      if (
        labelText !== null && labelText !== undefined || (labelProp && (events || sharedEvents))
      ) {
        const target = `${type}Labels`;
        acc[eventKey][target] = getLabelProps(dataProps, labelText, type);
      }
    });

    return acc;
  }, initialChildProps);
};

export { getDomain, getData, getBaseProps };
