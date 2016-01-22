import compact from "lodash/array/compact";
import findIndex from "lodash/array/findIndex";
import flatten from "lodash/array/flatten";
import take from "lodash/array/take";
import union from "lodash/array/union";
import isEmpty from "lodash/lang/isEmpty";
import isFunction from "lodash/lang/isFunction";
import isUndefined from "lodash/lang/isUndefined";
import isNull from "lodash/lang/isNull";
import merge from "lodash/object/merge";
import identity from "lodash/utility/identity";
import property from "lodash/utility/property";
import lodashRange from "lodash/utility/range";
import uniq from "lodash/array/uniq";
import zipObject from "lodash/array/zipObject";
import zip from "lodash/array/zip";
import * as Collection from "./collection";
import * as Style from "./style";
import Scale from "./scale";

module.exports = {
  // String Data
  createStringMap(props, axis) {
    const stringsFromAxes = this.getStringsFromAxes(props, axis);
    const stringsFromCategories = this.getStringsFromCategories(props, axis);
    const stringsFromData = this.getStringsFromData(props, axis);
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
    const accessor = this.createAccessor(props[axis]);
    const dataStrings = flatten(props.data)
        .map((datum) => datum && accessor(datum))
        .filter((datum) => typeof datum === "string");
    // return a unique set of strings
    return compact(uniq(dataStrings));
  },

  // for components that take single datasets
  getData(props) {
    if (props.data) {
      return this.formatData(props.data, props);
    }
    const x = this.returnOrGenerateX(props);
    const y = this.returnOrGenerateY(props, x);
    const n = Math.min(x.length, y.length);
    // create a dataset from x and y with n points
    const dataset = zip(take(x, n), take(y, n));
    // return data as an array of objects
    const data = dataset.map((point) => {
      return {x: point[0], y: point[1]};
    });
    return this.formatData(data, props);
  },

  returnOrGenerateX(props) {
    if (props.x) {
      return props.x;
    }
    // if x is not given in props, create an array of values evenly
    // spaced across the x domain
    const domain = props.domain ? (props.domain.x || props.domain) :
      Scale.getBaseScale(props, "x").domain();
    const samples = Array.isArray(props.y) ? props.y.length : props.samples;
    const step = Math.max(...domain) / samples;
    // return an array of x values spaced across the domain,
    // include the maximum of the domain
    return union(
      lodashRange(Math.min(...domain),
      Math.max(...domain), step),
      [Math.max(...domain)]
    );
  },

  returnOrGenerateY(props, x) {
    if (props.y && typeof props.y === "function") {
      // if y is a function, apply the function y to to each value of the array x,
      // and return the results as an array
      return x.map((datum) => props.y(datum));
    }
    // y is either a function or an array, and is never undefined
    // if it isn't a function, just return it.
    return props.y;
  },

  formatData(dataset, props) {
    if (!dataset) {
      return [];
    }
    const stringMap = {
      x: this.createStringMap(props, "x"),
      y: this.createStringMap(props, "y")
    };
    const accessor = {
      x: this.createAccessor(props.x),
      y: this.createAccessor(props.y)
    };

    return this.cleanData(dataset, props)
      .map((datum) => {
        const x = accessor.x(datum);
        const y = accessor.y(datum);
        return merge({}, datum, {
          category: this.determineCategoryIndex(x, props.categories),
          // map string data to numeric values, and add names
          x: typeof x === "string" ? stringMap.x[x] : x,
          xName: typeof x === "string" ? x : undefined,
          y: typeof y === "string" ? stringMap.y[y] : y,
          yName: typeof y === "string" ? y : undefined
        });
      });
  },

  // For components that take multiple datasets
  formatDatasets(datasets, props) {
    return datasets.map((dataset, index) => {
      return {
        attrs: this.getAttributes(props, index),
        data: this.formatData(dataset, props)
      };
    })
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
      x: this.createAccessor(props.x),
      y: this.createAccessor(props.y)
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
    return merge(requiredAttributes, attributes);
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
    // creates a data accessor function given a property key, path, array index, or null for identity.
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
