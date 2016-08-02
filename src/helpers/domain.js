import { flatten, includes, isPlainObject } from "lodash";
import Data from "./data";
import Axis from "./axis";
import Scale from "./scale";
import { Helpers, Collection } from "victory-core";

export default {
  getDomain(props, axis) {
    const propsDomain = this.getDomainFromProps(props, axis);
    if (propsDomain) {
      return this.padDomain(propsDomain, props, axis);
    }
    const categoryDomain = this.getDomainFromCategories(props, axis);
    if (categoryDomain) {
      return this.padDomain(categoryDomain, props, axis);
    }
    const dataset = Data.getData(props);
    const domain = this.getDomainFromData(props, axis, dataset);
    return this.cleanDomain(this.padDomain(domain, props, axis), props, axis);
  },

  cleanDomain(domain, props, axis) {
    // Some scale types break when certain data is supplies. This method will
    // remove data points that break scales. So far this method only removes
    // zeroes for log scales
    // TODO other cases?
    const scaleType = Scale.getScaleType(props, axis);

    if (scaleType !== "log") {
      return domain;
    }

    const rules = (dom) => {
      const almostZero = dom[0] < 0 || dom[1] < 0 ? -1 / Number.MAX_SAFE_INTEGER
      : 1 / Number.MAX_SAFE_INTEGER;
      const domainOne = dom[0] === 0 ? almostZero : dom[0];
      const domainTwo = dom[1] === 0 ? almostZero : dom[1];
      return [domainOne, domainTwo];
    };

    return rules(domain);
  },

  getDomainWithZero(props, axis) {
    const propsDomain = this.getDomainFromProps(props, axis);
    if (propsDomain) {
      return this.cleanDomain(this.padDomain(propsDomain, props, axis), props, axis);
    }
    const { horizontal } = props;
    const ensureZero = (domain) => {
      const isDependent = (axis === "y" && !horizontal) || (axis === "x" && horizontal);
      const min = Collection.getMinValue(domain, 0);
      const max = Collection.getMaxValue(domain, 0);
      const zeroDomain = isDependent ? [min, max] : domain;
      return this.padDomain(zeroDomain, props, axis);
    };
    const categoryDomain = this.getDomainFromCategories(props, axis);
    if (categoryDomain) {
      return this.cleanDomain(this.padDomain(ensureZero(categoryDomain), props, axis), props, axis);
    }
    const dataset = Data.getData(props);
    const domain = ensureZero(this.getDomainFromData(props, axis, dataset));
    return this.cleanDomain(this.padDomain(domain, props, axis), props, axis);
  },

  getDomainFromProps(props, axis) {
    if (props.domain && props.domain[axis]) {
      return props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      return props.domain;
    }
  },

  getDomainFromData(props, axis, dataset) {
    const currentAxis = Axis.getCurrentAxis(axis, props.horizontal);
    const allData = flatten(dataset).map((datum) => datum[currentAxis]);

    if (allData.length < 1) {
      return Scale.getBaseScale(props, axis).domain();
    }

    const min = Collection.getMinValue(allData);
    const max = Collection.getMaxValue(allData);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (min === max) {
      const adjustedMax = max === 0 ? 1 : max + max;
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
    const { horizontal } = props;
    const dependent = (axis === "x" && !horizontal) || (axis === "y" && horizontal);
    if (dependent && props.categories) {
      return this.getDomainFromCategories(props, axis);
    }
    const globalDomain = this.getDomainFromData(props, axis, datasets);

    // find the cumulative max for stacked chart types
    const cumulativeData = !dependent ?
      this.getCumulativeData(props, axis, datasets) : [];

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

  getCumulativeData(props, axis, datasets) {
    const currentAxis = Axis.getCurrentAxis(axis, props.horizontal);
    const categories = [];
    const axisValues = [];
    datasets.forEach((dataset) => {
      dataset.forEach((data) => {
        if (data.category !== undefined && !includes(categories, data.category)) {
          categories.push(data.category);
        } else if (!includes(axisValues, data[currentAxis])) {
          axisValues.push(data[currentAxis]);
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
        return datasets.map((data) => data[index] && data[index][currentAxis]);
      });
    };

    return categories.length === 0 ? _dataByIndex() : _dataByCategory();
  },

  getDomainPadding(props, axis) {
    const formatPadding = (padding) => {
      return Array.isArray(padding) ?
        {left: padding[0], right: padding[1]} : {left: padding, right: padding};
    };

    return isPlainObject(props.domainPadding) ?
      formatPadding(props.domainPadding[axis]) : formatPadding(props.domainPadding);
  },

  padDomain(domain, props, axis) {
    if (!props.domainPadding) {
      return domain;
    }

    const padding = this.getDomainPadding(props, axis);
    if (!padding.left && !padding.right) {
      return domain;
    }

    const domainMin = Collection.getMinValue(domain);
    const domainMax = Collection.getMaxValue(domain);
    const range = Helpers.getRange(props, axis);
    const rangeExtent = Math.abs(Math.max(...range) - Math.min(...range));

    const paddingLeft = Math.abs(domainMax - domainMin) * padding.left / rangeExtent;
    const paddingRight = Math.abs(domainMax - domainMin) * padding.right / rangeExtent;
    // don't make the axes cross if they aren't already
    const adjustedMin = (domainMin >= 0 && (domainMin - paddingLeft) <= 0) ?
      0 : domainMin.valueOf() - paddingLeft;

    const adjustedMax = (domainMax <= 0 && (domainMax + paddingRight) >= 0) ?
      0 : domainMax.valueOf() + paddingRight;

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
      return standardOrientation ? domain.concat().reverse() : domain;
    } else {
      return standardOrientation ? domain : domain.concat().reverse();
    }
  }
};
