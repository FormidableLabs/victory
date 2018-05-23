import { flatten, includes, isPlainObject, sortedUniq } from "lodash";
import Data from "./data";
import Scale from "./scale";
import Helpers from "./helpers";
import Collection from "./collection";

export default {

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
      return this.cleanDomain(this.padDomain(domain, props, axis), props, axis);
    }
    let domain;
    const categories = Data.getCategories(props, axis);
    if (categories) {
      domain = this.getDomainFromCategories(props, axis, categories);
    } else {
      const dataset = Data.getData(props);
      domain = this.getDomainFromData(props, axis, dataset);
    }
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
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    if (propsDomain || minDomain !== undefined && maxDomain !== undefined) {
      const domain = propsDomain || this.getDomainFromMinMax(minDomain, maxDomain);
      return this.cleanDomain(this.padDomain(domain, props, axis), props, axis);
    }
    const { horizontal } = props;
    const ensureZero = (domain, dataset) => {
      const defaultMin = minDomain || 0;
      const defaultMax = maxDomain || 0;
      const currentAxis = Helpers.getCurrentAxis(axis, horizontal);
      if (currentAxis === "x") {
        return domain;
      } else if (!dataset) {
        return [
          Collection.getMinValue(domain, defaultMin),
          Collection.getMaxValue(domain, defaultMax)
        ];
      }
      const minData = this.getFlatData(dataset, currentAxis, "min");
      const maxData = this.getFlatData(dataset, currentAxis);
      const min = minDomain !== undefined ? minDomain :
        Collection.getMinValue([...domain, ...minData, ...maxData], defaultMin);
      const max = maxDomain !== undefined ? maxDomain :
        Collection.getMaxValue([...domain, ...maxData, ...minData], defaultMax);
      return this.getDomainFromMinMax(min, max);
    };
    let domain;
    const categories = Data.getCategories(props, axis);
    if (categories) {
      domain = ensureZero(this.getDomainFromCategories(props, axis, categories));
    } else {
      const dataset = Data.getData(props);
      domain = ensureZero(this.getDomainFromData(props, axis, dataset), dataset);
    }
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

  getFlatData(dataset, currentAxis, type) {
    const flatData = flatten(dataset);
    const dataType = type === "min" ? 0 : 1;
    return flatData.map((datum) => {
      return datum[`_${currentAxis}${dataType}`] === undefined ?
        datum[`_${currentAxis}`] : datum[`_${currentAxis}${dataType}`];
    });
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
    const { horizontal, polar, startAngle, endAngle } = props;
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    const currentAxis = Helpers.getCurrentAxis(axis, horizontal);
    if (dataset.length < 1) {
      const scaleDomain = Scale.getBaseScale(props, axis).domain();
      const min = minDomain !== undefined ? minDomain : Collection.getMinValue(scaleDomain);
      const max = maxDomain !== undefined ? maxDomain : Collection.getMaxValue(scaleDomain);
      return this.getDomainFromMinMax(min, max);
    }
    const min = minDomain !== undefined ?
      minDomain : Collection.getMinValue(this.getFlatData(dataset, currentAxis, "min"));
    const max = maxDomain !== undefined ?
      maxDomain : Collection.getMaxValue(this.getFlatData(dataset, currentAxis));
    const domain = this.getDomainFromMinMax(min, max);

    const angularRange = Math.abs((startAngle || 0) - (endAngle || 360));
    return polar && axis === "x" && angularRange === 360 ?
      this.getSymmetricDomain(domain, this.getFlatData(dataset, currentAxis)) : domain;
  },

  getSinglePointDomain(val) {
    // d3-scale does not properly resolve very small differences.
    // eslint-disable-next-line no-magic-numbers
    const verySmallNumber = Math.pow(10, -10);
    const verySmallDate = 1;
    const min = val instanceof Date ? new Date(+val - verySmallDate) : val - verySmallNumber;
    const max = val instanceof Date ? new Date(+val + verySmallDate) : val + verySmallNumber;
    return [min, max];
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
    const { tickValues, polar } = props;
    const minDomain = this.getMinFromProps(props, axis);
    const maxDomain = this.getMaxFromProps(props, axis);
    const stringTicks = Helpers.stringTicks(props);
    const ticks = tickValues.map((value) => +value);
    const defaultMin = stringTicks ? 1 : Collection.getMinValue(ticks);
    const defaultMax = stringTicks ? tickValues.length : Collection.getMaxValue(ticks);
    const min = minDomain !== undefined ? minDomain : defaultMin;
    const max = maxDomain !== undefined ? maxDomain : defaultMax;
    const initialDomain = this.getDomainFromMinMax(min, max);
    const domain = polar && axis === "x" && !stringTicks ?
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
   * @returns {Array|undefined} returns a domain from categories or undefined
   */
  getDomainFromCategories(props, axis, categories) {
    categories = categories || Data.getCategories(props, axis);
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
    return this.getDomainFromMinMax(min, max);
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
    if (dependent && props.categories && props.categories[axis]) {
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
    return this.getDomainFromMinMax(domainMin, domainMax);
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
