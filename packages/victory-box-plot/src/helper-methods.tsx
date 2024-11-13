import defaults from "lodash/defaults";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";

import { Helpers, Scale, Domain, Data, Collection } from "victory-core";
import {
  min as d3Min,
  max as d3Max,
  quantile as d3Quantile,
} from "victory-vendor/d3-array";
import { VictoryBoxPlotProps } from "./victory-box-plot";

const TYPES = ["max", "min", "median", "q1", "q3"];

const checkProcessedData = (data) => {
  /* check if the data is pre-processed. start by checking that it has
  all required quartile attributes. */
  const hasQuartileAttributes = data.every((datum) => {
    return TYPES.every((val) => typeof datum[`_${val}`] !== "undefined");
  });

  if (hasQuartileAttributes) {
    // check that the independent variable is distinct
    const values = data.map((d) => d._x);
    if (!uniq(values).length === values.length) {
      throw new Error(`
        data prop may only take an array of objects with a unique
        independent variable. Make sure your x values are distinct.
      `);
    }
    return true;
  }
  return false;
};

const nanToNull = (val) => (Number.isNaN(val) ? null : val);

const getSummaryStatistics = (data) => {
  const dependentVars = data.map((datum) => datum._y);
  const quartiles = {
    _q1: nanToNull(d3Quantile(dependentVars, 0.25)), // eslint-disable-line no-magic-numbers
    _q3: nanToNull(d3Quantile(dependentVars, 0.75)), // eslint-disable-line no-magic-numbers
    _min: nanToNull(d3Min(dependentVars)),
    _median: nanToNull(d3Quantile(dependentVars, 0.5)),
    _max: nanToNull(d3Max(dependentVars)),
  };

  return Object.assign({}, data[0], quartiles, { _y: data[0]._y });
};

const processData = (data) => {
  /* check if the data is coming in a pre-processed form,
  i.e. { x || y, min, max, q1, q3, median }. if not, process it. */
  const isProcessed = checkProcessedData(data);
  if (!isProcessed) {
    // check if the data is coming with x or y values as an array
    const arrayX = data.every((datum) => Array.isArray(datum._x));
    const arrayY = data.every((datum) => Array.isArray(datum._y));
    const sortKey = "_y";
    const groupKey = "_x";
    if (arrayX) {
      throw new Error(`
        data should not be given as in array for x
      `);
    } else if (arrayY) {
      /* generate summary statistics for each datum. to do this, flatten
      the depedentVarArray and process each datum separately */
      return data.map((datum) => {
        const dataArray = datum[sortKey].map((d) =>
          Object.assign({}, datum, { [sortKey]: d }),
        );
        const sortedData = orderBy(dataArray, sortKey);
        return getSummaryStatistics(sortedData);
      });
    } else {
      /* Group data by independent variable and generate summary statistics for each group */
      const groupedData = groupBy(data, groupKey);
      return Object.keys(groupedData).map((key) => {
        const datum = groupedData[key];
        const sortedData = orderBy(datum, sortKey);
        return getSummaryStatistics(sortedData);
      });
    }
  } else {
    return data;
  }
};

export const getData = (props) => {
  const accessorTypes = TYPES.concat("x", "y");
  const formattedData = Data.formatData(props.data, props, accessorTypes);
  return formattedData.length ? processData(formattedData) : [];
};

const reduceDataset = (dataset, props, axis) => {
  const minDomain = Domain.getMinFromProps(props, axis);
  const maxDomain = Domain.getMaxFromProps(props, axis);

  const minData =
    minDomain !== undefined
      ? minDomain
      : dataset.reduce((memo, datum) => {
          return memo < datum[`_${axis}`] ? memo : datum[`_${axis}`];
        }, Infinity);
  const maxData =
    maxDomain !== undefined
      ? maxDomain
      : dataset.reduce((memo, datum) => {
          return memo > datum[`_${axis}`] ? memo : datum[`_${axis}`];
        }, -Infinity);
  return Domain.getDomainFromMinMax(minData, maxData);
};

const getDomainFromMinMaxValues = (dataset, props, axis) => {
  const minDomain = Domain.getMinFromProps(props, axis);
  const maxDomain = Domain.getMaxFromProps(props, axis);
  const minData =
    minDomain !== undefined
      ? minDomain
      : dataset.reduce((memo, datum) => {
          return memo < datum._min ? memo : datum._min;
        }, Infinity);
  const maxData =
    maxDomain !== undefined
      ? maxDomain
      : dataset.reduce((memo, datum) => {
          return memo > datum._max ? memo : datum._max;
        }, -Infinity);
  return Domain.getDomainFromMinMax(minData, maxData);
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
  return axis === "y"
    ? getDomainFromMinMaxValues(dataset, props, axis)
    : reduceDataset(dataset, props, axis);
};

export const getDomain = (props, axis) => {
  return Domain.createDomainFunction(getDomainFromData)(props, axis);
};

const getLabelStyle = (props, styleObject, namespace?) => {
  const component = props[`${namespace}LabelComponent`] || props.labelComponent;
  const baseStyle = styleObject[`${namespace}Labels`] || styleObject.labels;
  if (!Helpers.isTooltip(component)) {
    return baseStyle;
  }
  const tooltipTheme = (props.theme && props.theme.tooltip) || {};
  return defaults({}, tooltipTheme.style, baseStyle);
};

const getStyles = (props, styleObject: VictoryBoxPlotProps["style"] = {}) => {
  if (props.disableInlineStyles) {
    return {};
  }
  const style = props.style || {};
  const parentStyles = { height: "100%", width: "100%" };
  const labelStyles = defaults(
    {},
    style.labels,
    getLabelStyle(props, styleObject),
  );
  const boxStyles = defaults({}, style.boxes, styleObject.boxes);
  const whiskerStyles = defaults({}, style.whiskers, styleObject.whiskers);
  return {
    boxes: boxStyles,
    labels: labelStyles,
    parent: defaults({}, style.parent, styleObject.parent, parentStyles),
    max: defaults({}, style.max, styleObject.max, whiskerStyles),
    maxLabels: defaults(
      {},
      style.maxLabels,
      getLabelStyle(props, styleObject, "max"),
      labelStyles,
    ),
    median: defaults({}, style.median, styleObject.median, whiskerStyles),
    medianLabels: defaults(
      {},
      style.medianLabels,
      getLabelStyle(props, styleObject, "median"),
      labelStyles,
    ),
    min: defaults({}, style.min, styleObject.min, whiskerStyles),
    minLabels: defaults(
      {},
      style.minLabels,
      getLabelStyle(props, styleObject, "min"),
      labelStyles,
    ),
    q1: defaults({}, style.q1, styleObject.q1, boxStyles),
    q1Labels: defaults(
      {},
      style.q1Labels,
      getLabelStyle(props, styleObject, "q1"),
      labelStyles,
    ),
    q3: defaults({}, style.q3, styleObject.q3, boxStyles),
    q3Labels: defaults(
      {},
      style.q3Labels,
      getLabelStyle(props, styleObject, "q3"),
      labelStyles,
    ),
    whiskers: whiskerStyles,
  };
};

const getCalculatedValues = (props) => {
  const { theme, horizontal } = props;
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
  const defaultStyles =
    theme && theme.boxplot && theme.boxplot.style ? theme.boxplot.style : {};
  const style = getStyles(props, defaultStyles);
  const defaultOrientation = props.horizontal ? "top" : "right";
  const labelOrientation = props.labelOrientation || defaultOrientation;
  const boxWidth = props.boxWidth || 1;
  return { data, horizontal, domain, scale, style, labelOrientation, boxWidth };
};

const getWhiskerProps = (props, type) => {
  const {
    horizontal,
    style,
    boxWidth,
    whiskerWidth,
    datum,
    scale,
    index,
    disableInlineStyles,
  } = props;
  const { min, max, q1, q3, x, y } = props.positions;
  const boxValue = type === "min" ? q1 : q3;
  const whiskerValue = type === "min" ? min : max;
  const width = typeof whiskerWidth === "number" ? whiskerWidth : boxWidth;
  return {
    datum,
    index,
    scale,
    majorWhisker: {
      x1: horizontal ? boxValue : x,
      y1: horizontal ? y : boxValue,
      x2: horizontal ? whiskerValue : x,
      y2: horizontal ? y : whiskerValue,
    },
    minorWhisker: {
      x1: horizontal ? whiskerValue : x - width / 2,
      y1: horizontal ? y - width / 2 : whiskerValue,
      x2: horizontal ? whiskerValue : x + width / 2,
      y2: horizontal ? y + width / 2 : whiskerValue,
    },
    style: disableInlineStyles ? {} : style[type] || style.whisker,
    disableInlineStyles,
  };
};

const getBoxProps = (props, type) => {
  const {
    horizontal,
    boxWidth,
    style,
    scale,
    datum,
    index,
    disableInlineStyles,
  } = props;
  const { median, q1, q3, x, y } = props.positions;
  const defaultX = type === "q1" ? q1 : median;
  const defaultY = type === "q1" ? median : q3;
  const defaultWidth = type === "q1" ? median - q1 : q3 - median;
  const defaultHeight = type === "q1" ? q1 - median : median - q3;
  return {
    datum,
    scale,
    index,
    x: horizontal ? defaultX : x - boxWidth / 2,
    y: horizontal ? y - boxWidth / 2 : defaultY,
    width: horizontal ? defaultWidth : boxWidth,
    height: horizontal ? boxWidth : defaultHeight,
    style: disableInlineStyles ? {} : style[type] || style.boxes,
    disableInlineStyles,
  };
};

const getMedianProps = (props) => {
  const {
    boxWidth,
    horizontal,
    style,
    datum,
    scale,
    index,
    disableInlineStyles,
  } = props;
  const { median, x, y } = props.positions;
  return {
    datum,
    scale,
    index,
    x1: horizontal ? median : x - boxWidth / 2,
    y1: horizontal ? y - boxWidth / 2 : median,
    x2: horizontal ? median : x + boxWidth / 2,
    y2: horizontal ? y + boxWidth / 2 : median,
    style: disableInlineStyles ? {} : style.median,
    disableInlineStyles,
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

const getOrientation = (labelOrientation, type) =>
  (typeof labelOrientation === "object" && labelOrientation[type]) ||
  labelOrientation;

const getLabelProps = (props, text, type) => {
  const {
    datum,
    positions,
    index,
    boxWidth,
    horizontal,
    labelOrientation,
    style,
    theme,
    disableInlineStyles,
  } = props;
  const orientation = getOrientation(labelOrientation, type);
  const namespace = `${type}Labels`;
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
  const whiskerWidth =
    typeof props.whiskerWidth === "number" ? props.whiskerWidth : boxWidth;
  const width = type === "min" || type === "max" ? whiskerWidth : boxWidth;

  const getOffset = (coord) => {
    const sign = {
      x: orientation === "left" ? -1 : 1,
      y: orientation === "top" ? -1 : 1,
    };
    return (sign[coord] * width) / 2 + sign[coord] * (labelStyle.padding || 0);
  };

  const labelProps = {
    text,
    datum,
    index,
    orientation,
    style: disableInlineStyles ? {} : labelStyle,
    y: horizontal ? positions.y : positions[type],
    x: horizontal ? positions[type] : positions.x,
    dy: horizontal ? getOffset("y") : 0,
    dx: horizontal ? 0 : getOffset("x"),
    textAnchor: labelStyle.textAnchor || defaultTextAnchors[orientation],
    verticalAnchor:
      labelStyle.verticalAnchor || defaultVerticalAnchors[orientation],
    angle: labelStyle.angle,
    horizontal,
    disableInlineStyles,
  };

  const component = props[`${type}LabelComponent`];
  if (!Helpers.isTooltip(component)) {
    return labelProps;
  }
  const tooltipTheme = (theme && theme.tooltip) || {};
  return defaults({}, labelProps, Helpers.omit(tooltipTheme, ["style"]));
};

const getDataProps = (props, type) => {
  if (type === "median") {
    return getMedianProps(props);
  } else if (type === "min" || type === "max") {
    return getWhiskerProps(props, type);
  }
  return getBoxProps(props, type);
};

// if all data points on an axis are out of bound of the domain, filter out this datum
const isDatumOutOfBounds = (datum, domain) => {
  const exists = (val) => val !== undefined;
  const { _x, _min, _max } = datum;

  const minDomainX = Collection.getMinValue(domain.x);
  const maxDomainX = Collection.getMaxValue(domain.x);
  const minDomainY = Collection.getMinValue(domain.y);
  const maxDomainY = Collection.getMaxValue(domain.y);
  const underMin = (min) => (val) => exists(val) && val < min;
  const overMax = (max) => (val) => exists(val) && val > max;
  const isUnderMinX = underMin(minDomainX);
  const isUnderMinY = underMin(minDomainY);
  const isOverMaxX = overMax(maxDomainX);
  const isOverMaxY = overMax(maxDomainY);
  let yOutOfBounds;
  let xOutOfBounds;

  // if x is out of the bounds of the domain
  if (isUnderMinX(_x) || isOverMaxX(_x)) xOutOfBounds = true;
  // if min/max are out of the bounds of the domain
  if (
    (isUnderMinY(_min) && isUnderMinY(_max)) ||
    (isOverMaxY(_min) && isOverMaxY(_max))
  )
    yOutOfBounds = true;

  return yOutOfBounds || xOutOfBounds;
};

export const getBaseProps = (initialProps, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(
    initialProps,
    fallbackProps,
    "boxplot",
  );
  const props = Object.assign(
    {},
    modifiedProps,
    getCalculatedValues(modifiedProps),
  );
  const {
    groupComponent,
    width,
    height,
    padding,
    standalone,
    theme,
    events,
    sharedEvents,
    scale,
    horizontal,
    data,
    style,
    domain,
    name,
  } = props;
  const initialChildProps = {
    parent: {
      domain,
      scale,
      width,
      height,
      data,
      standalone,
      name,
      theme,
      style: style.parent || {},
      padding,
      groupComponent,
      horizontal,
    },
  };
  const boxScale = scale.y;
  return data.reduce((acc, datum, index) => {
    const eventKey = !Helpers.isNil(datum.eventKey) ? datum.eventKey : index;

    if (isDatumOutOfBounds(datum, domain)) return acc;

    const positions = {
      x: horizontal ? scale.y(datum._y) : scale.x(datum._x),
      y: horizontal ? scale.x(datum._x) : scale.y(datum._y),
      min: boxScale(datum._min),
      max: boxScale(datum._max),
      median: boxScale(datum._median),
      q1: boxScale(datum._q1),
      q3: boxScale(datum._q3),
    };
    const dataProps = Object.assign({ index, datum, positions }, props);
    const dataObj = TYPES.reduce((memo, type) => {
      memo[type] = getDataProps(dataProps, type);
      return memo;
    }, {});

    acc[eventKey] = dataObj;

    TYPES.forEach((type) => {
      const labelText = getText(dataProps, type);
      const labelProp = props.labels || props[`${type}Labels`];
      if (
        (labelText !== null && labelText !== undefined) ||
        (labelProp && (events || sharedEvents))
      ) {
        const target = `${type}Labels`;
        acc[eventKey][target] = getLabelProps(
          Object.assign({}, props, dataProps),
          labelText,
          type,
        );
      }
    });

    return acc;
  }, initialChildProps);
};
