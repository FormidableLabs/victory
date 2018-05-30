import { flatten, includes, isPlainObject, sortedUniq } from "lodash";
import Data from "./data";
import Scale from "./scale";
import Helpers from "./helpers";
import Collection from "./collection";

export default {
  formatDomain(domain, props, axis) {
    return this.cleanDomain(this.padDomain(domain, props, axis), props, axis);
  },
  /**
   * Returns a domain for a given axis based on props, category, or data
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array} the domain for the given axis
   */
  getDomain(props, axis) {
    const propsDomain = this.getDomainFromProps(props, axis);
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    if (propsDomain || minDomain !== undefined && maxDomain !== undefined) {
      const domain = propsDomain || this.getDomainFromMinMax(minDomain, maxDomain);
      return this.formatDomain(domain, props, axis);
    }
    const categories = Data.getCategories(props, axis);
    if (categories) {
      const domain = this.getDomainFromCategories(props, axis, categories);
      return this.formatDomain(domain, props, axis);
    }
    const dataset = Data.getData(props);
    const domain = this.getDomainFromData(props, axis, dataset);
    return this.formatDomain(domain, props, axis);
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
   * zero unless the domain is explicitly specified in props.
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @returns {Array} the domain for the given axis
   */
  getDomainWithZero(props, axis) {
    const propsDomain = this.getDomainFromProps(props, axis);
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    if (propsDomain || minDomain !== undefined && maxDomain !== undefined) {
      const domain = propsDomain || this.getDomainFromMinMax(minDomain, maxDomain);
      return this.formatDomain(domain, props, axis);
    }
    const ensureZero = (domain) => {
      const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
      if (currentAxis === "x") {
        return domain;
      }
      const defaultMin = minDomain || 0;
      const defaultMax = maxDomain || 0;
      const min = minDomain !== undefined ? minDomain : Collection.getMinValue(domain, defaultMin);
      const max = maxDomain !== undefined ? maxDomain : Collection.getMaxValue(domain, defaultMax);
      return this.getDomainFromMinMax(min, max);
    };
    let domain;
    const categories = Data.getCategories(props, axis);
    if (categories) {
      domain = ensureZero(this.getDomainFromCategories(props, axis, categories));
    } else {
      const dataset = Data.getData(props);
      domain = ensureZero(this.getDomainFromData(props, axis, dataset));
    }
    return this.formatDomain(domain, props, axis);
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

  getMinFromProps(props, axis) {
    if (props.minDomain && props.minDomain[axis] !== undefined) {
      return props.minDomain[axis];
    }
    return typeof props.minDomain === "number" ? props.minDomain : undefined;
  },

  getMaxFromProps(props, axis) {
    if (props.maxDomain && props.maxDomain[axis] !== undefined) {
      return props.maxDomain[axis];
    }
    return typeof props.maxDomain === "number" ? props.maxDomain : undefined;
  },

  getFlatData(dataset, axis) {
    return flatten(dataset).map((datum) => {
      return datum[`_${axis}`] && datum[`_${axis}`][1] !== undefined ?
        datum[`_${axis}`][1] : datum[`_${axis}`];
    });
  },

  getMinFromData(dataset, axis) {
    let containsDate = false;
    const minValue = flatten(dataset).reduce((memo, datum) => {
      const current = datum[`_${axis}`] && datum[`_${axis}`][0] !== undefined ?
        datum[`_${axis}`][0] : datum[`_${axis}`];
      containsDate = containsDate || current instanceof Date;
      return memo < current ? memo : current;
    }, Infinity);
    return containsDate ? new Date(minValue) : minValue;
  },

  getMaxFromData(dataset, axis) {
    let containsDate = false;
    const minValue = flatten(dataset).reduce((memo, datum) => {
      const current = datum[`_${axis}`] && datum[`_${axis}`][1] !== undefined ?
        datum[`_${axis}`][1] : datum[`_${axis}`];
      containsDate = containsDate || current instanceof Date;
      return memo > current ? memo : current;
    }, -Infinity);
    return containsDate ? new Date(minValue) : minValue;
  },

  getDomainFromMinMax(min, max) {
    const getSinglePointDomain = (val) => {
      // d3-scale does not properly resolve very small differences.
      // eslint-disable-next-line no-magic-numbers
      const verySmallNumber = Math.pow(10, -10);
      const verySmallDate = 1;
      const minVal = val instanceof Date ? new Date(+val - verySmallDate) : val - verySmallNumber;
      const maxVal = val instanceof Date ? new Date(+val + verySmallDate) : val + verySmallNumber;
      return [minVal, maxVal];
    };
    return +min === +max ? getSinglePointDomain(max) : [min, max];
  },

  /**
   * Returns a domain from a dataset for a given axis
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @param {Array} dataset: an array of data
   * @returns {Array} the domain based on data
   */
  getDomainFromData(props, axis, dataset) {
    const { horizontal, polar, startAngle = 0, endAngle = 360 } = props;
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    const currentAxis = Helpers.getCurrentAxis(axis, horizontal);
    if (dataset.length < 1) {
      const scaleDomain = Scale.getBaseScale(props, axis).domain();
      const min = minDomain !== undefined ? minDomain : Collection.getMinValue(scaleDomain);
      const max = maxDomain !== undefined ? maxDomain : Collection.getMaxValue(scaleDomain);
      return this.getDomainFromMinMax(min, max);
    }
    const min = minDomain !== undefined ? minDomain : this.getMinFromData(dataset, currentAxis);
    const max = maxDomain !== undefined ? maxDomain : this.getMaxFromData(dataset, currentAxis);
    const domain = this.getDomainFromMinMax(min, max);

    return polar && axis === "x" && Math.abs(startAngle - endAngle) === 360 ?
      this.getSymmetricDomain(domain, this.getFlatData(dataset, currentAxis)) : domain;
  },

  getSymmetricDomain(domain, data) {
    const processedData = sortedUniq(data.sort((a, b) => a - b));
    const step = processedData[1] - processedData[0];
    return [domain[0], domain[1] + step];
  },

  /**
   * Returns a domain based tickValues
   * @param {Object} props: the props object
   * @param {String} axis: either x or y
   * @returns {Array} returns a domain from tickValues
   */
  getDomainFromTickValues(props, axis) {
    const { tickValues, polar, startAngle = 0, endAngle = 360 } = props;
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    const stringTicks = Helpers.stringTicks(props);
    const ticks = tickValues.map((value) => +value);
    const defaultMin = stringTicks ? 1 : Collection.getMinValue(ticks);
    const defaultMax = stringTicks ? tickValues.length : Collection.getMaxValue(ticks);
    const min = minDomain !== undefined ? minDomain : defaultMin;
    const max = maxDomain !== undefined ? maxDomain : defaultMax;
    const initialDomain = this.getDomainFromMinMax(min, max);
    const domain = polar && axis === "x" && Math.abs(startAngle - endAngle) === 360 ?
      this.getSymmetricDomain(initialDomain, ticks) : initialDomain;
    if (Helpers.isVertical(props)) {
      domain.reverse();
    }
    return domain;
  },

  /**
   * Returns a domain based on categories if they exist
   * @param {Object} props: the props object
   * @param {String} axis: the current axis
   * @param {Array} categories: an array of categories
   * @returns {Array|undefined} returns a domain from categories or undefined
   */
  getDomainFromCategories(props, axis, categories) {
    categories = categories || Data.getCategories(props, axis);
    const { polar, startAngle = 0, endAngle = 360 } = props;
    if (!categories) {
      return undefined;
    }
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    const stringArray = Collection.containsStrings(categories) ?
     Data.getStringsFromCategories(props, axis) : [];
    const stringMap = stringArray.length === 0 ? null :
      stringArray.reduce((memo, string, index) => {
        memo[string] = index + 1;
        return memo;
      }, {});
    const categoryValues = stringMap ?
      categories.map((value) => stringMap[value]) : categories;
    const min = minDomain !== undefined ? minDomain : Collection.getMinValue(categoryValues);
    const max = maxDomain !== undefined ? maxDomain : Collection.getMaxValue(categoryValues);
    const categoryDomain = this.getDomainFromMinMax(min, max);
    return polar && axis === "x" && Math.abs(startAngle - endAngle) === 360 ?
      this.getSymmetricDomain(categoryDomain, categoryValues) : categoryDomain;
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
    const categories = isPlainObject(props.categories) ? props.categories.axis : props.categories;
    if (dependent && categories) {
      return this.getDomainFromCategories(props, axis, categories);
    }
    const globalDomain = this.getDomainFromData(props, axis, datasets);
    if (dependent) {
      return globalDomain;
    }
    // find the cumulative max for stacked chart types
    const cumulativeData = this.getCumulativeData(props, axis, datasets);
    const cumulativeMax = cumulativeData.reduce((memo, dataset) => {
      const currentMax = dataset.reduce((m, val) => {
        return val > 0 ? m + val : m;
      }, 0);
      return memo > currentMax ? memo : currentMax;
    }, -Infinity);

    const cumulativeMin = cumulativeData.reduce((memo, dataset) => {
      const currentMin = dataset.reduce((m, val) => {
        return val < 0 ? m + val : m;
      }, 0);
      return memo < currentMin ? memo : currentMin;
    }, Infinity);

    // use greatest min / max
    return this.getDomainFromMinMax(
      Collection.getMinValue(globalDomain, cumulativeMin),
      Collection.getMaxValue(globalDomain, cumulativeMax)
    );
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
    const otherAxis = currentAxis === "x" ? "y" : "x";
    const categories = [];
    const axisValues = [];
    datasets.forEach((dataset) => {
      dataset.forEach((data) => {
        if (data.category !== undefined && !includes(categories, data.category)) {
          categories.push(data.category);
        } else if (!includes(axisValues, data[`_${otherAxis}`])) {
          axisValues.push(data[`_${otherAxis}`]);
        }
      });
    });

    const _dataByCategory = () => {
      return categories.map((value) => {
        return datasets.reduce((prev, data) => {
          return data.category === value ? prev.concat(data[`_${axis}`]) : prev;
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
  }
};
