import flatten from "lodash/flatten";
import includes from "lodash/includes";
import Data from "./data";
import Axis from "./axis";
import { Helpers, Collection } from "victory-core";

export default {
  getDomain(props, axis) {
    const propsDomain = this.getDomainFromProps(props, axis);
    if (propsDomain) {
      return propsDomain;
    }
    const categoryDomain = this.getDomainFromCategories(props, axis);
    if (categoryDomain) {
      return categoryDomain;
    }
    const dataset = Data.getData(props);
    return this.getDomainFromData(dataset, axis);
  },

  getDomainWithZero(props, axis) {
    const propsDomain = this.getDomainFromProps(props, axis);
    if (propsDomain) {
      return propsDomain;
    }
    const ensureZero = (domain) => {
      return axis === "y" ? [Math.min(...domain, 0), Math.max(... domain, 0)] : domain;
    };
    const categoryDomain = this.getDomainFromCategories(props, axis);
    if (categoryDomain) {
      return ensureZero(categoryDomain);
    }
    const dataset = Data.getData(props);
    return ensureZero(this.getDomainFromData(dataset, axis));
  },

  getDomainFromProps(props, axis) {
    if (props.domain && props.domain[axis]) {
      return props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      return props.domain;
    }
  },

  getDomainFromData(dataset, axis) {
    const allData = flatten(dataset).map((datum) => datum[axis]);
    const min = Math.min(...allData);
    const max = Math.max(...allData);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (min === max) {
      const adjustedMax = max === 0 ? 1 : max;
      return [0, adjustedMax];
    }
    return [min, max];
  },

  getDomainFromTickValues(props) {
    let domain;
    if (Axis.stringTicks(props)) {
      domain = [1, props.tickValues.length];
    } else {
      // coerce ticks to numbers
      const ticks = props.tickValues.map((value) => +value);
      domain = [Math.min(...ticks), Math.max(...ticks)];
    }
    if (Axis.isVertical(props)) {
      domain.reverse();
    }
    return domain;
  },

  getDomainFromCategories(props, axis) {
    const categories = Data.getCategories(props, axis);
    if (!categories) {
      return undefined;
    }
    const stringArray = Collection.containsStrings(categories) ?
     Data.getStringsFromCategories(props, axis) : [];
    const stringMap = stringArray.length === 0 ? null :
      stringArray.reduce((memo, string, index) => {
        memo[string] = index + 1;
        return memo;
      }, {});
    const categoryValues = stringMap ?
      categories.map((value) => stringMap[value]) : categories;
    return [Math.min(...categoryValues), Math.max(...categoryValues)];
  },

  getDomainFromGroupedData(props, axis, datasets) {
    if (axis === "x" && props.categories) {
      return this.getDomainFromCategories(props, axis);
    }
    const globalDomain = this.getDomainFromData(datasets, axis);

    // find the cumulative max for stacked chart types
    const cumulativeData = axis === "y" ?
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
        return datasets.reduce((prev, data) => {
          return data.category === value ? prev.concat(data[axis]) : prev;
        }, []);
      });
    };

    const _dataByIndex = () => {
      return axisValues.map((value, index) => {
        return datasets.map((data) => data[index] && data[index][axis]);
      });
    };

    return categories.length === 0 ? _dataByIndex() : _dataByCategory();
  },

  padDomain(domain, props, axis) {
    if (!props.domainPadding) {
      return domain;
    }
    const domainPadding = typeof props.domainPadding === "number" ?
      props.domainPadding : props.domainPadding[axis];

    if (!domainPadding) {
      return domain;
    }
    const domainMin = Math.min(...domain);
    const domainMax = Math.max(...domain);
    const range = Helpers.getRange(props, axis);
    const rangeExtent = Math.abs(Math.max(...range) - Math.min(...range));
    const padding = Math.abs(domainMax - domainMin) * domainPadding / rangeExtent;
    // don't make the axes cross if they aren't already
    const adjustedMin = (domainMin >= 0 && (domainMin - padding) <= 0) ?
      0 : domainMin.valueOf() - padding;
    const adjustedMax = (domainMax <= 0 && (domainMax + padding) >= 0) ?
      0 : domainMax.valueOf() + padding;
    return domainMin instanceof Date || domainMax instanceof Date ?
      [new Date(adjustedMin), new Date(adjustedMax)] : [adjustedMin, adjustedMax];
  },

  orientDomain(domain, orientations, axis) {
    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = axis === "x" ? "y" : "x";
    const defaultOrientation = (ax) => ax === "x" ? "bottom" : "left";
    const flippedAxis = orientations.x === "left" || orientations.x === "right";
    const standardOrientation = flippedAxis ?
      orientations[otherAxis] === defaultOrientation(axis) :
      orientations[otherAxis] === defaultOrientation(otherAxis);
    if (flippedAxis) {
      return standardOrientation ?
        domain.concat().reverse() : domain;
    } else {
      return standardOrientation ?
        domain : domain.concat().reverse();
    }
  }
};
