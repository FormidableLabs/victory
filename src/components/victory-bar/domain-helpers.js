import flatten from "lodash/array/flatten";
import includes from "lodash/collection/includes";
import isEmpty from "lodash/lang/isEmpty";
import isUndefined from "lodash/lang/isUndefined";
import zipObject from "lodash/array/zipObject";

import { Collection, Data, Domain } from "victory-util";


module.exports = {
  // Domain Helpers
  getDomain(props, axis) {
    const domain = Domain.getDomainFromProps(props, axis) ||
      this.getDomainFromGroupedData(props, axis);
    return Domain.padDomain(domain, axis);
  },

  getDomainFromCategories(props, axis) {
    if (axis !== "x" || !props.categories) {
      return undefined;
    }
    const categories = flatten(props.categories);
    const stringArray = Collection.containsStrings(categories) ?
     Data.getStringsFromCategories(props, axis) : [];
    const stringMap = isEmpty(stringArray) ? null :
      zipObject(stringArray.map((string, index) => [string, index + 1]));
    const categoryValues = stringMap ?
      categories.map((value) => stringMap[value]) : categories;
    return [Math.min(...categoryValues), Math.max(...categoryValues)];
  },

  getDomainFromData(datasets, axis) {
    const ensureZero = (domain) => {
      return [Math.min(...domain, 0), Math.max(... domain, 0)];
    };
    const axisData = flatten(datasets).map((data) => data[axis]);
    const globalMin = Math.min(...axisData);
    const globalMax = Math.max(...axisData);
    const domain = [globalMin, globalMax];
    return axis === "y" ? ensureZero(domain) : domain;
  },

  getDomainFromGroupedData(props, axis) {
    if (axis === "x" && props.categories) {
      return this.getDomainFromCategories(props, axis);
    }
    // find the global min and max
    const rawDatasets = (props.stacked || this.shouldGroup(props)) ? props.data : [props.data];
    const datasets = Data.formatDatasets(rawDatasets, props)
      .map((dataset) => dataset.data);
    const globalDomain = this.getDomainFromData(datasets, axis);

    // find the cumulative max for stacked chart types
    const cumulativeData = this.isStacked(props, axis) ?
      this.getCumulativeData(datasets, axis) : [];

    const cumulativeMaxArray = cumulativeData.map((dataset) => {
      return dataset.reduce((memo, val) => {
        return val > 0 ? memo + val : memo;
      }, 0);
    });

    const cumulativeMinArray = cumulativeData.map((dataset) => {
      return dataset.reduce((memo, val) => {
        return val < 0 ? memo + val : memo;
      }, 0);
    });

    const cumulativeMin = Math.min(...cumulativeMinArray);
    // use greatest min / max
    const domainMin = cumulativeMin < 0 ? cumulativeMin : Math.min(...globalDomain);
    const domainMax = Math.max(...globalDomain, ...cumulativeMaxArray);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (domainMin === domainMax) {
      const adjustedMax = domainMax === 0 ? 1 : domainMax;
      return [0, adjustedMax];
    }
    return [domainMin, domainMax];
  },

  shouldGroup(props) {
    // automatically create grouped bars if data is array of arrays
    // and x/y accessors are the default "x" and "y" keys,
    return !props.stacked && (props.grouped || (
      isUndefined(props.grouped) && Collection.isArrayOfArrays(props.data) &&
      props.x === "x" && props.y === "y"
    ));
  },

  isStacked(props, axis) {
    // checks whether grouped data is stacked,
    // whether there are multiple datasets to stack
    // and whether the current axis is y (dependent)
    // TODO: check assumptions for inverted axis charts

    return (props.stacked === true)
      && Collection.isArrayOfArrays(props.data)
      && (axis === "y");
  },

  getCumulativeData(datasets, axis) {
    const categories = [];
    const axisValues = [];
    datasets.forEach((dataset) => {
      dataset.forEach((data) => {
        if (data.category !== undefined && !includes(categories, data.category)) {
          categories.push(data.category);
        } else if (!includes(axisValues, data[axis])) {
          axisValues.push(data[axis]);
        }
      });
    });

    const _dataByCategory = () => {
      return categories.map((value) => {
        const categoryData = datasets.filter((data) => data.category === value);
        return flatten(categoryData.map((data) => data[axis]));
      });
    };

    const _dataByIndex = () => {
      return axisValues.map((value, index) => {
        return datasets.map((data) => data[index] && data[index][axis]);
      });
    };

    return isEmpty(categories) ? _dataByIndex() : _dataByCategory();
  }
};
