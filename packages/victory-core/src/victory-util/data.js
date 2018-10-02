/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
import React from "react";
import assign from "lodash/assign";
import uniq from "lodash/uniq";
import range from "lodash/range";
import last from "lodash/last";
import isFunction from "lodash/isFunction";
import isPlainObject from "lodash/isPlainObject";
import property from "lodash/property";
import orderBy from "lodash/orderBy";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import Helpers from "./helpers";
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
  return dataset.filter((datum) => {
    return rules(datum, "x") && rules(datum, "y") && rules(datum, "y0");
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
  const eventKeyAccessor = getEventKey(props.eventKey);
  return data.map((datum, index) => {
    const eventKey = datum.eventKey || eventKeyAccessor(datum) || index;
    return assign({ eventKey }, datum);
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
  const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
  const stringsFromAxes = getStringsFromAxes(props, currentAxis);
  const stringsFromCategories = getStringsFromCategories(props, currentAxis);
  const stringsFromData = getStringsFromData(props, axis);

  const allStrings = uniq([...stringsFromAxes, ...stringsFromCategories, ...stringsFromData]);
  return allStrings.length === 0 ? null :
    allStrings.reduce((memo, string, index) => {
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
      (d, i) => (((i + startingIndex) % k) === 0)
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

  expectedKeys = Array.isArray(expectedKeys) ? expectedKeys : ["x", "y", "y0"];

  const stringMap = {
    x: expectedKeys.indexOf("x") !== -1 ? createStringMap(props, "x") : undefined,
    y: expectedKeys.indexOf("y") !== -1 ? createStringMap(props, "y") : undefined,
    y0: expectedKeys.indexOf("y0") !== -1 ? createStringMap(props, "y") : undefined
  };

  const createAccessor = (name) => {
    return Helpers.createAccessor(props[name] !== undefined ? props[name] : name);
  };

  const accessor = expectedKeys.reduce((memo, type) => {
    memo[type] = createAccessor(type);
    return memo;
  }, {});


  const data = dataset.reduce((dataArr, datum, index) => { // eslint-disable-line complexity
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
  return addEventKeys(props, cleanedData);
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
  const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
  return props.categories && !Array.isArray(props.categories) ?
    props.categories[currentAxis] : props.categories;
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

  const sortedData = sortData(props.data, props.sortKey, props.sortOrder);
  const dataStrings = sortedData.reduce((dataArr, datum) => {
    datum = parseDatum(datum);
    dataArr.push(accessor(datum));
    return dataArr;
  }, []).filter((datum) => typeof datum === "string");

  // return a unique set of strings
  return dataStrings.reduce((prev, curr) => {
    if (curr !== undefined && curr !== null && prev.indexOf(curr) === -1) {
      prev.push(curr);
    }
    return prev;
  }, []);
}

/**
 * Checks whether a given component can be used to calculate date
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
