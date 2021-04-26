/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
import React from "react";
import {
  assign,
  uniq,
  range,
  last,
  isFunction,
  isPlainObject,
  property,
  orderBy,
  isEmpty,
  isEqual,
  includes
} from "lodash";
import Helpers from "./helpers";
import Domain from "./domain";
import Collection from "./collection";
import Scale from "./scale";
import Immutable from "./immutable";

// Private Functions

function parseDatum(datum) {
  const immutableDatumWhitelist = {
    errorX: true,
    errorY: true
  };

  return Immutable.isImmutable(datum)
    ? Immutable.shallowToJS(datum, immutableDatumWhitelist)
    : datum;
}

function getLength(data) {
  return Immutable.isIterable(data) ? data.size : data.length;
}

// Returns generated data for a given axis based on domain and sample from props
function generateDataArray(props, axis) {
  const propsDomain = isPlainObject(props.domain) ? props.domain[axis] : props.domain;
  const domain = propsDomain || Scale.getBaseScale(props, axis).domain();
  const samples = props.samples || 1;
  const domainMax = Math.max(...domain);
  const domainMin = Math.min(...domain);
  const step = (domainMax - domainMin) / samples;
  const values = range(domainMin, domainMax, step);
  return last(values) === domainMax ? values : values.concat(domainMax);
}

// Returns sorted data. If no sort keys are provided, data is returned unaltered.
function sortData(dataset, sortKey, sortOrder = "ascending") {
  if (!sortKey) {
    return dataset;
  }

  // Ensures previous VictoryLine api for sortKey prop stays consistent
  if (sortKey === "x" || sortKey === "y") {
    sortKey = `_${sortKey}`;
  }
  const order = sortOrder === "ascending" ? "asc" : "desc";
  return orderBy(dataset, sortKey, order);
}

// This method will remove data points that break certain scales. (log scale only)
function cleanData(dataset, props) {
  const smallNumber = 1 / Number.MAX_SAFE_INTEGER;
  const scaleType = {
    x: Scale.getScaleType(props, "x"),
    y: Scale.getScaleType(props, "y")
  };
  if (scaleType.x !== "log" && scaleType.y !== "log") {
    return dataset;
  }
  const rules = (datum, axis) => {
    return scaleType[axis] === "log" ? datum[`_${axis}`] !== 0 : true;
  };

  const sanitize = (datum) => {
    const _x = rules(datum, "x") ? datum._x : smallNumber;
    const _y = rules(datum, "y") ? datum._y : smallNumber;
    const _y0 = rules(datum, "y0") ? datum._y0 : smallNumber;
    return assign({}, datum, { _x, _y, _y0 });
  };

  return dataset.map((datum) => {
    if (rules(datum, "x") && rules(datum, "y") && rules(datum, "y0")) {
      return datum;
    }
    return sanitize(datum);
  });
}

// This method will remove data points that fall outside of the desired domain (non-continuous charts only)
function formatDataFromDomain(dataset, props) {
  const { domain, symbol, interpolation } = props;

  if (!domain || interpolation) return dataset;

  const domainX = domain.x || Domain.getDomainFromData(props, "x", dataset);
  const domainY = domain.y || Domain.getDomainFromData(props, "y", dataset);

  const minDomainX = Collection.getMinValue(domainX);
  const maxDomainX = Collection.getMaxValue(domainX);
  const minDomainY = Collection.getMinValue(domainY);
  const maxDomainY = Collection.getMaxValue(domainY);

  const exists = (val) => val !== undefined;

  // eslint-disable-next-line complexity
  return dataset.map((datum) => {
    let { _x, _y, _y0, _y1 } = datum;

    // single x point less than min domain
    if (exists(_x) && _x < minDomainX) {
      _x = null;
    }

    // single x point greater than max domain
    if (exists(_x) && _x > maxDomainX) {
      _x = null;
    }

    // single y point less than min domain
    if (exists(_y) && !exists(_y0) && _y < minDomainY) {
      if (exists(symbol)) _y = null;
      else _y = minDomainY;
    }

    // single y point greater than max domain
    if (exists(_y) && !exists(_y0) && _y > maxDomainY) {
      if (exists(symbol)) _y = null;
      else _y = maxDomainY;
    }

    // multiple y points all less than min domain
    if (exists(_y0) && exists(_y1) && _y0 < minDomainY && _y1 < minDomainY) {
      _y = _y0 = _y1 = null;
    }

    // multiple y points all greather than max domain
    if (exists(_y0) && exists(_y1) && _y0 > maxDomainY && _y1 > maxDomainY) {
      _y = _y0 = _y1 = null;
    }

    // multiple y points with lower point only below min
    if (exists(_y0) && exists(_y1) && _y0 < minDomainY && _y1 >= minDomainY) {
      _y0 = minDomainY;
    }

    // multiple y points with upper point only above max
    if (exists(_y0) && exists(_y1) && _y0 <= maxDomainY && _y1 > maxDomainY) {
      _y1 = maxDomainY;
    }

    return assign({}, datum, { _x, _y, _y0, _y1 });
  });
}

// Returns a data accessor given an eventKey prop
function getEventKey(key) {
  // creates a data accessor function
  // given a property key, path, array index, or null for identity.
  if (isFunction(key)) {
    return key;
  } else if (key === null || key === undefined) {
    return () => undefined;
  }
  // otherwise, assume it is an array index, property key or path (_.property handles all three)
  return property(key);
}

// Returns data with an eventKey prop added to each datum
function addEventKeys(props, data) {
  const hasEventKeyAccessor = !!props.eventKey;
  const eventKeyAccessor = getEventKey(props.eventKey);
  return data.map((datum, index) => {
    if (datum.eventKey !== undefined) {
      return datum;
    } else if (hasEventKeyAccessor) {
      const eventKey = eventKeyAccessor(datum, index);
      return eventKey !== undefined ? assign({ eventKey }, datum) : datum;
    } else {
      return datum;
    }
  });
}

// Exported Functions

/**
 * Returns an object mapping string data to numeric data
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Object} an object mapping string data to numeric data
 */
function createStringMap(props, axis) {
  const stringsFromAxes = getStringsFromAxes(props, axis);
  const stringsFromCategories = getStringsFromCategories(props, axis);
  const stringsFromData = getStringsFromData(props, axis);

  const allStrings = uniq([...stringsFromAxes, ...stringsFromCategories, ...stringsFromData]);
  return allStrings.length === 0
    ? null
    : allStrings.reduce((memo, string, index) => {
        memo[string] = index + 1;
        return memo;
      }, {});
}

/**
 * Reduces the size of a data array, such that it is <= maxPoints.
 * @param {Array} data: an array of data; must be sorted
 * @param {Number} maxPoints: maximum number of data points to return
 * @param {Number} startingIndex: the index of the data[0] *in the entire dataset*; this function
                   assumes `data` param is a subset of larger dataset that has been zoommed
  * @returns {Array} an array of data, a subset of data param
  */
function downsample(data, maxPoints, startingIndex = 0) {
  // ensures that the downampling of data while zooming looks good.
  const dataLength = getLength(data);
  if (dataLength > maxPoints) {
    // limit k to powers of 2, e.g. 64, 128, 256
    // so that the same points will be chosen reliably, reducing flicker on zoom
    const k = Math.pow(2, Math.ceil(Math.log2(dataLength / maxPoints)));
    return data.filter(
      // ensure modulo is always calculated from same reference: i + startingIndex
      (d, i) => (i + startingIndex) % k === 0
    );
  }
  return data;
}

/**
 * Returns formatted data. Data accessors are applied, and string values are replaced.
 * @param {Array} dataset: the original domain
 * @param {Object} props: the props object
 * @param {Array} expectedKeys: an array of expected data keys
 * @returns {Array} the formatted data
 */
function formatData(dataset, props, expectedKeys) {
  const isArrayOrIterable = Array.isArray(dataset) || Immutable.isIterable(dataset);
  if (!isArrayOrIterable || getLength(dataset) < 1) {
    return [];
  }

  const defaultKeys = ["x", "y", "y0"];
  expectedKeys = Array.isArray(expectedKeys) ? expectedKeys : defaultKeys;

  const createAccessor = (name) => {
    return Helpers.createAccessor(props[name] !== undefined ? props[name] : name);
  };

  const accessor = expectedKeys.reduce((memo, type) => {
    memo[type] = createAccessor(type);
    return memo;
  }, {});

  const preformattedData =
    isEqual(expectedKeys, defaultKeys) &&
    props.x === "_x" &&
    props.y === "_y" &&
    props.y0 === "_y0";

  let stringMap;
  if (preformattedData === false) {
    // stringMap is not required if the data is preformatted
    stringMap = {
      x: expectedKeys.indexOf("x") !== -1 ? createStringMap(props, "x") : undefined,
      y: expectedKeys.indexOf("y") !== -1 ? createStringMap(props, "y") : undefined,
      y0: expectedKeys.indexOf("y0") !== -1 ? createStringMap(props, "y") : undefined
    };
  }

  const data = preformattedData
    ? dataset
    : dataset.reduce((dataArr, datum, index) => {
        // eslint-disable-line complexity
        datum = parseDatum(datum);
        const fallbackValues = { x: index, y: datum };
        const processedValues = expectedKeys.reduce((memo, type) => {
          const processedValue = accessor[type](datum);
          const value = processedValue !== undefined ? processedValue : fallbackValues[type];
          if (value !== undefined) {
            if (typeof value === "string" && stringMap[type]) {
              memo[`${type}Name`] = value;
              memo[`_${type}`] = stringMap[type][value];
            } else {
              memo[`_${type}`] = value;
            }
          }
          return memo;
        }, {});

        const formattedDatum = assign({}, processedValues, datum);
        if (!isEmpty(formattedDatum)) {
          dataArr.push(formattedDatum);
        }

        return dataArr;
      }, []);

  const sortedData = sortData(data, props.sortKey, props.sortOrder);
  const cleanedData = cleanData(sortedData, props);
  const domainFormattedData = formatDataFromDomain(cleanedData, props);
  return addEventKeys(props, domainFormattedData);
}

/**
 * Returns generated x and y data based on domain and sample from props
 * @param {Object} props: the props object
 * @returns {Array} an array of data
 */
function generateData(props) {
  const xValues = generateDataArray(props, "x");
  const yValues = generateDataArray(props, "y");
  const values = xValues.map((x, i) => {
    return { x, y: yValues[i] };
  });
  return values;
}

/**
 * Returns an array of categories for a given axis
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array} an array of categories
 */
function getCategories(props, axis) {
  return props.categories && !Array.isArray(props.categories)
    ? props.categories[axis]
    : props.categories;
}

/**
 * Returns an array of formatted data
 * @param {Object} props: the props object
 * @returns {Array} an array of data
 */
function getData(props) {
  return props.data ? formatData(props.data, props) : formatData(generateData(props), props);
}

/**
 * Returns an array of strings from axis tickValues for a given axis
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array} an array of strings
 */
function getStringsFromAxes(props, axis) {
  const { tickValues, tickFormat } = props;
  let tickValueArray;
  if (!tickValues || (!Array.isArray(tickValues) && !tickValues[axis])) {
    tickValueArray = tickFormat && Array.isArray(tickFormat) ? tickFormat : [];
  } else {
    tickValueArray = tickValues[axis] || tickValues;
  }
  return tickValueArray.filter((val) => typeof val === "string");
}

/**
 * Returns an array of strings from categories for a given axis
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array} an array of strings
 */
function getStringsFromCategories(props, axis) {
  if (!props.categories) {
    return [];
  }
  const categories = getCategories(props, axis);
  const categoryStrings = categories && categories.filter((val) => typeof val === "string");
  return categoryStrings ? Collection.removeUndefined(categoryStrings) : [];
}

/**
 * Returns an array of strings from data
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array} an array of strings
 */
function getStringsFromData(props, axis) {
  const isArrayOrIterable = Array.isArray(props.data) || Immutable.isIterable(props.data);
  if (!isArrayOrIterable) {
    return [];
  }

  const key = props[axis] === undefined ? axis : props[axis];
  const accessor = Helpers.createAccessor(key);

  // support immutable data
  const data = props.data.reduce((memo, d) => {
    memo.push(parseDatum(d));
    return memo;
  }, []);

  const sortedData = sortData(data, props.sortKey, props.sortOrder);
  const dataStrings = sortedData
    .reduce((dataArr, datum) => {
      datum = parseDatum(datum);
      dataArr.push(accessor(datum));
      return dataArr;
    }, [])
    .filter((datum) => typeof datum === "string");

  // return a unique set of strings
  return dataStrings.reduce((prev, curr) => {
    if (curr !== undefined && curr !== null && prev.indexOf(curr) === -1) {
      prev.push(curr);
    }
    return prev;
  }, []);
}

/**
 * Checks whether a given component can be used to calculate data
 * @param {Component} component: a React component instance
 * @returns {Boolean} Returns true if the given component has a role included in the whitelist
 */
function isDataComponent(component) {
  const getRole = (child) => {
    return child && child.type ? child.type.role : "";
  };
  let role = getRole(component);
  if (role === "portal") {
    const children = React.Children.toArray(component.props.children);
    role = children.length ? getRole(children[0]) : "";
  }
  const whitelist = [
    "area",
    "bar",
    "boxplot",
    "candlestick",
    "errorbar",
    "group",
    "histogram",
    "line",
    "pie",
    "scatter",
    "stack",
    "voronoi"
  ];
  return includes(whitelist, role);
}

export default {
  createStringMap,
  downsample,
  formatData,
  generateData,
  getCategories,
  getData,
  getStringsFromAxes,
  getStringsFromCategories,
  getStringsFromData,
  isDataComponent
};
