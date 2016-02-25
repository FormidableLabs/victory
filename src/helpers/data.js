import isFunction from "lodash/lang/isFunction";
import isUndefined from "lodash/lang/isUndefined";
import isNull from "lodash/lang/isNull";
import property from "lodash/utility/property";
import identity from "lodash/utility/identity";

import compact from "lodash/array/compact";
import findIndex from "lodash/array/findIndex";
import flatten from "lodash/array/flatten";
import union from "lodash/array/union";
import isEmpty from "lodash/lang/isEmpty";
import has from "lodash/object/has";
import defaults from "lodash/object/defaults";
import lodashRange from "lodash/utility/range";
import uniq from "lodash/array/uniq";
import zipObject from "lodash/array/zipObject";
import { Helpers, Style } from "victory-util";
import Scale from "./scale";

export default {
  // String Data
  createStringMap(props, axis, hasMultipleDatasets = false) {
    const stringsFromAxes = this.getStringsFromAxes(props, axis);
    const stringsFromCategories = this.getStringsFromCategories(props, axis);
    const stringsFromData = hasMultipleDatasets ?
        uniq(flatten(props.data.map((dataset) => {
          return Helpers.getStringsFromData(defaults({}, axis, {data: dataset}), props);
        })))
        : this.getStringsFromData(props, axis);

    const allStrings = uniq(compact(
      [...stringsFromAxes, ...stringsFromCategories, ...stringsFromData]
    ));
    return isEmpty(allStrings) ? null :
      zipObject(allStrings.map((string, index) => [string, index + 1]));
  },

  getStringsFromAxes(props, axis) {
    if (!props.tickValues || (!Array.isArray(props.tickValues) && !props.tickValues[axis])) {
      return [];
    }
    const tickValueArray = props.tickValues[axis] || props.tickValues;
    return tickValueArray.filter((val) => typeof val === "string");
  },

  getStringsFromCategories(props, axis) {
    // TODO generalize for independent vertical axes
    if (!props.categories || axis !== "x") {
      return [];
    } else {
      const categoryArray = compact(flatten(props.categories));
      return categoryArray.filter((val) => typeof val === "string");
    }
  },

  getStringsFromData(props, axis) {
    if (!props.data) {
      return [];
    }
    const accessor = Helpers.createAccessor(has(props, axis) ? props[axis] : axis);
    const dataStrings = (props.data)
        .map((datum) => accessor(datum))
        .filter((datum) => typeof datum === "string");
    // return a unique set of strings
    return compact(uniq(dataStrings));
  },

  // for components that take single datasets
  getData(props) {
    if (props.data) {
      return this.formatData(props.data, props);
    }
    const data = this.generateData(props);
    return this.formatData(data, props);
  },

  generateData(props) {
    // create an array of values evenly spaced across the x domain that include domain min/max
    const domain = props.domain ? (props.domain.x || props.domain) :
      Scale.getBaseScale(props, "x").domain();
    const step = Math.max(...domain) / props.samples;
    const values = union(
        lodashRange(Math.min(...domain), Math.max(...domain), step),
        [Math.max(...domain)]
    );
    // return data objects for values in {x, y} format
    return values.map((v) => ({x: v, y: v}));
  },

  formatData(dataset, props, stringMap) {
    if (!dataset) {
      return [];
    }
    stringMap = stringMap || {
      x: this.createStringMap(props, "x"),
      y: this.createStringMap(props, "y")
    };
    const accessor = {
      x: Helpers.createAccessor(props.x),
      y: Helpers.createAccessor(props.y)
    };

    return this.cleanData(dataset, props)
      .map((datum) => {
        const x = accessor.x(datum);
        const y = accessor.y(datum);
        return defaults({}, {
          category: this.determineCategoryIndex(x, props.categories),
          // map string data to numeric values, and add names
          x: typeof x === "string" ? stringMap.x[x] : x,
          xName: typeof x === "string" ? x : undefined,
          y: typeof y === "string" ? stringMap.y[y] : y,
          yName: typeof y === "string" ? y : undefined
        }, datum);
      });
  },

  // For components that take multiple datasets
  //
  // NOTE: This code is in the hot path.  Future optimizations may be possible by
  // reducing the frequency and number of data transformations that occur here.
  formatDatasets(props, hasMultipleDatasets) {
    // string map must be calculated using all datasets and shared
    const stringMap = {
      x: this.createStringMap(props, "x", hasMultipleDatasets),
      y: this.createStringMap(props, "y", hasMultipleDatasets)
    };

    const _format = (dataset, index) => ({
      attrs: this.getAttributes(props, index),
      data: this.formatData(dataset, props, stringMap)
    });

    return hasMultipleDatasets ? props.data.map(_format) : [_format(props.data, 0)];
  },

  cleanData(dataset, props) {
    // Some scale types break when certain data is supplies. This method will
    // remove data points that break scales. So far this method only removes
    // zeroes for log scales
    // TODO other cases?
    const scaleType = {
      x: Scale.getScaleType(props, "x"),
      y: Scale.getScaleType(props, "y")
    };
    const accessor = {
      x: Helpers.createAccessor(props.x),
      y: Helpers.createAccessor(props.y)
    };
    if (scaleType.x !== "log" && scaleType.y !== "log") {
      return dataset;
    }
    const rules = (datum, axis) => {
      return scaleType[axis] === "log" ? accessor[axis](datum) !== 0 : true;
    };
    return dataset.filter((datum) => {
      return rules(datum, "x") && rules(datum, "y");
    });
  },

  determineCategoryIndex(x, categories) {
    // if categories don't exist or are not given as an array of arrays, return undefined;
    if (!categories || !Array.isArray(categories[0])) {
      return undefined;
    }
    // determine which range band this x value belongs to, and return the index of that range band.
    return findIndex(categories, (category) => {
      return (x >= Math.min(...category) && x <= Math.max(...category));
    });
  },

  getAttributes(props, index) {
    let attributes = props.dataAttributes && props.dataAttributes[index] ?
      props.dataAttributes[index] : props.dataAttributes;
    if (attributes) {
      attributes.fill = attributes.fill || this.getColor(props, index);
    } else {
      attributes = {fill: this.getColor(props, index)};
    }
    const requiredAttributes = {
      name: attributes && attributes.name ? attributes.name : `data-${index}`
    };
    return defaults(requiredAttributes, attributes);
  },

  getColor(props, index) {
    // check for styles first
    if (props.style && props.style.data && props.style.data.fill) {
      return props.style.data.fill;
    }
    const colorScale = Array.isArray(props.colorScale) ?
      props.colorScale : Style.getColorScale(props.colorScale);
    return colorScale[index % colorScale.length];
  },

  createAccessor(key) {
    // creates a data accessor function
    // given a property key, path, array index, or null for identity.
    if (isFunction(key)) {
      return key;
    } else if (isNull(key) || isUndefined(key)) {
      // null/undefined means "return the data item itself"
      return identity;
    }
    // otherwise, assume it is an array index, property key or path (_.property handles all three)
    return property(key);
  }
};
