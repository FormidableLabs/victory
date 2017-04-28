import { flatten, includes, isPlainObject } from "lodash";
import Data from "./data";
import Scale from "./scale";
import Helpers from "./helpers";
import Collection from "./collection";

export default {

  /**
   * Returns a domain for a given axis based on props, catefory, or data
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array} the domain for the given axis
   */
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

  /**
   * Returns the cleaned domain. Some scale types break when certain data is supplied.
   * This method will replace elements in the domain that break certain scales.
   * So far this method only removes zeroes for log scales
   * @param {Array} domain: the original domain
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array} the cleaned domain
   */
  cleanDomain(domain, props, axis) {
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

  /**
   * Returns a domain for a given axis. This method forces the domain to include
   * zero unless the deomain is explicitly specified in props.
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array} the domain for the given axis
   */
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

  /**
   * Returns a the domain for a given axis if domain is given in props
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array|undefined} the domain based on props
   */
  getDomainFromProps(props, axis) {
    if (props.domain && props.domain[axis]) {
      return props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      return props.domain;
    }
    return undefined;
  },

  /**
   * Returns a domain from a dataset for a given axis
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @param {Array} dataset: an array of data
   * @returns {Array} the domain based on data
   */
  getDomainFromData(props, axis, dataset) {
    const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
    const allData = flatten(dataset).map((datum) => datum[`_${currentAxis}`]);

    if (allData.length < 1) {
      return Scale.getBaseScale(props, axis).domain();
    }

    const min = Collection.getMinValue(allData);
    const max = Collection.getMaxValue(allData);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (min === max) {
      const adjustedMax = max === 0 ? 1 : max;
      return [0, adjustedMax];
    }
    return [min, max];
  },

  /**
   * Returns a domain based tickValues
   * @param {Object} props: the props object
   * @returns {Array} returns a domain from tickValues
   */
  getDomainFromTickValues(props) {
    let domain;
    if (Helpers.stringTicks(props)) {
      domain = [1, props.tickValues.length];
    } else {
      // coerce ticks to numbers
      const ticks = props.tickValues.map((value) => +value);
      domain = [Collection.getMinValue(ticks), Collection.getMaxValue(ticks)];
    }
    if (Helpers.isVertical(props)) {
      domain.reverse();
    }
    return domain;
  },

  /**
   * Returns a domain based on categories if they exist
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array|undefined} returns a domain from categories or undefined
   */
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
    return [
      Collection.getMinValue(categoryValues), Collection.getMaxValue(categoryValues)
    ];
  },

  /**
   * Returns a cumulative domain for a set of grouped datasets (i.e. stacked charts)
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @param {Array} datasets: an array of data arrays
   * @returns {Array} the cumulative domain
   */
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
        return val > 0 ? +val + +memo : memo;
      }, 0);
    });
    const cumulativeMinArray = cumulativeData.map((dataset) => {
      return dataset.reduce((memo, val) => {
        return val < 0 ? +val + +memo : memo;
      }, 0);
    });

    const cumulativeMin = Math.min(...cumulativeMinArray);
    // use greatest min / max
    const domainMin = cumulativeMin < 0 ? cumulativeMin : Collection.getMinValue(globalDomain);
    const domainMax = Collection.getMaxValue(globalDomain, ...cumulativeMaxArray);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (domainMin === domainMax) {
      const adjustedMax = domainMax === 0 ? 1 : domainMax;
      return [0, adjustedMax];
    }
    return [domainMin, domainMax];
  },

  /**
   * Returns cumulative datasets either by index or category
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @param {Array} datasets: an array of data arrays
   * @returns {Array} an array of data arrays grouped by index or category
   */
  getCumulativeData(props, axis, datasets) {
    const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
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
        return datasets.map((data) => data[index] && data[index][`_${currentAxis}`]);
      });
    };

    return categories.length === 0 ? _dataByIndex() : _dataByCategory();
  },

  /**
   * Returns the domain padding appropriate for a given axis
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Object} an object with padding specified for "left" and "right"
   */
  getDomainPadding(props, axis) {
    const formatPadding = (padding) => {
      return Array.isArray(padding) ?
        { left: padding[0], right: padding[1] } : { left: padding, right: padding };
    };

    return isPlainObject(props.domainPadding) ?
      formatPadding(props.domainPadding[axis]) : formatPadding(props.domainPadding);
  },

  /**
   * Returns the domain with padding from the `domainPadding` prop applied
   * @param {Array} domain: the original domain
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array} the domain with padding applied
   */
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

    // Naive initial padding calculation
    const initialPadding = {
      left: Math.abs(domainMax - domainMin) * padding.left / rangeExtent,
      right: Math.abs(domainMax - domainMin) * padding.right / rangeExtent
    };

    // Adjust the domain by the initial padding
    const adjustedDomain = {
      min: (domainMin >= 0 && (domainMin - initialPadding.left) <= 0) ?
        0 : domainMin.valueOf() - initialPadding.left,
      max: (domainMax <= 0 && (domainMax + initialPadding.right) >= 0) ?
        0 : domainMax.valueOf() + initialPadding.right
    };

    // re-calculate padding, taking the adjusted domain into account
    const finalPadding = {
      left: Math.abs(adjustedDomain.max - adjustedDomain.min) * padding.left / rangeExtent,
      right: Math.abs(adjustedDomain.max - adjustedDomain.min) * padding.right / rangeExtent
    };

    // Adjust the domain by the final padding
    const finalDomain = {
      min: (domainMin >= 0 && (domainMin - finalPadding.left) <= 0) ?
        0 : domainMin.valueOf() - finalPadding.left,
      max: (domainMax >= 0 && (domainMax + finalPadding.right) <= 0) ?
        0 : domainMax.valueOf() + finalPadding.right
    };

    return domainMin instanceof Date || domainMax instanceof Date ?
      [new Date(finalDomain.min), new Date(finalDomain.max)] : [finalDomain.min, finalDomain.max];
  },

  /**
   * Returns the domain or the reversed domain depending on orientation
   * @param {Array} domain: the original domain
   * @param {Object} orientations: the x and y orientations
   * @param {String} axis: the current axis
   * @returns {Array} the domain or the reversed domain
   */
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
