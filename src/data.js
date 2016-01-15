import compact from "lodash/array/compact";
import findIndex from "lodash/array/findIndex";
import flatten from "lodash/array/flatten";
import take from "lodash/array/take";
import union from "lodash/array/union";
import isEmpty from "lodash/lang/isEmpty";
import merge from "lodash/object/merge";
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
    const stringsFromData = this.getDataStrings(props, axis);
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

  getDataStrings(props, axis) {
    const xyStrings = this.getStringsFromXY(props, axis);
    const dataStrings = this.getStringsFromData(props, axis);
    const allStrings = flatten([...dataStrings, ...xyStrings]);
    // return a unique set of strings
    return compact(uniq(allStrings));
  },

  getStringsFromData(props, axis) {
    if (!props.data) {
      return [];
    }
    const axisData = flatten(props.data).map((datum) => {
      return datum && datum[axis];
    });
    return axisData.filter((datum) => typeof datum === "string");
  },

  getStringsFromXY(props, axis) {
    if (!props[axis] || !Array.isArray(props[axis])) {
      return [];
    }
    const allData = flatten(props[axis]);
    return allData.filter((element) => typeof element === "string");
  },

  // For components that take multiple datasets
  consolidateData(props) {
    const datasets = Array.isArray(props.data[0]) ? props.data : [props.data];
    return this.formatData(datasets, props);
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

  formatData(allData, props) {
    if (!allData) {
      return [];
    }
    const stringMap = {
      x: this.createStringMap(props, "x"),
      y: this.createStringMap(props, "y")
    };
    const _formatData = (dataset) => {
      const cleanedData = this.cleanData(dataset, props);
      return cleanedData.map((data) => {
        return merge({}, data, {
          category: this.determineCategoryIndex(data.x, props.categories),
          // map string data to numeric values, and add names
          x: typeof data.x === "string" ? stringMap.x[data.x] : data.x,
          xName: typeof data.x === "string" ? data.x : undefined,
          y: typeof data.y === "string" ? stringMap.y[data.y] : data.y,
          yName: typeof data.y === "string" ? data.y : undefined
        });
      });
    };
    if (Collection.isArrayOfArrays(allData)) {
      return allData.map((dataset, index) => {
        return {
          attrs: this.getAttributes(props, index),
          data: _formatData(dataset)
        };
      });
    }
    return _formatData(allData);
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
    if (scaleType.x !== "log" && scaleType.y !== "log") {
      return dataset;
    }
    const rules = (datum, axis) => {
      return scaleType[axis] === "log" ? datum[axis] !== 0 : true;
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
  }
};
