import { isEqual, keys, isEmpty, isPlainObject, isFunction } from "lodash";

export default {
  isNonEmptyArray(collection) {
    return Array.isArray(collection) && collection.length > 0;
  },

  containsStrings(collection) {
    return Array.isArray(collection) && collection.some((value) => typeof value === "string");
  },

  containsDates(collection) {
    return Array.isArray(collection) && collection.some((value) => value instanceof Date);
  },

  containsNumbers(collection) {
    return Array.isArray(collection) && collection.some((value) => typeof value === "number");
  },

  containsOnlyStrings(collection) {
    return this.isNonEmptyArray(collection) &&
      collection.every((value) => typeof value === "string");
  },

  isArrayOfArrays(collection) {
    return this.isNonEmptyArray(collection) && collection.every(Array.isArray);
  },

  removeUndefined(arr) {
    return arr.filter((el) => typeof el !== "undefined");
  },

  getMaxValue(arr, ...values) {
    const array = arr.concat(values);
    return this.containsDates(array) ?
      new Date(Math.max(...array)) :
      Math.max(...array);
  },

  getMinValue(arr, ...values) {
    const array = arr.concat(values);
    return this.containsDates(array) ?
      new Date(Math.min(...array)) :
      Math.min(...array);
  },

  /**
   * Split array into subarrays using a delimiter function. Items qualifying as
   * delimiters are excluded from the subarrays. Functions similarly to String.split
   *
   * Example:
   * const array = [1, 2, 3, "omit", 4, 5, "omit", 6]
   * splitArray(array, (item) => item === "omit");
   * => [[1, 2, 3], [4, 5], [6]]
   *
   * @param {Array}    array        An array of items
   * @param {Function} delimiterFn  A function indicating values to be used as delimiters
   * @returns {Object}              Array of subarrays
   */
  splitArray(array, delimiterFn) {
    let segmentStartIndex = 0;
    const segments = array.reduce((memo, item, index) => {
      if (delimiterFn(item)) {
        memo = memo.concat([array.slice(segmentStartIndex, index)]);
        segmentStartIndex = index + 1;
      } else if (index === array.length - 1) {
        memo = memo.concat([array.slice(segmentStartIndex, array.length)]);
      }
      return memo;
    }, []);

    return segments.filter((segment) => {
      return Array.isArray(segment) && segment.length > 0;
    });
  },

  /**
   * Takes an array of arrays. Returns whether each subarray has equivalent items.
   * Each subarray should have two items. Used for componentShouldUpdate functions.
   *
   * Example:
   * const propComparisons = [
   *   [x, nextProps.x],
   *   [y, nextProps.y],
   *   [style, this.style]
   * ];
   *
   * allSetsEqual(propComparisons);
   * => true
   *
   * @param {Array}    itemSets     An array of item sets
   * @returns {Boolean}             Whether all item comparisons are equal
   */
  allSetsEqual(itemSets) {
    return itemSets.every((comparisonSet) => {
      return isEqual(comparisonSet[0], comparisonSet[1]);
    });
  },

  // Custom equality checking for props in shouldComponentUpdate.
  areVictoryPropsEqual(a, b) {
    return this.checkEquality(a, b);
  },

  // Broken into a separate method for ease of unit testing
  checkEquality(o1, o2) {
    if (o1 === o2) { return true; }
    const keys1 = keys(o1);
    const keys2 = keys(o2);
    if (keys1.length !== keys2.length) { return false; }
    return keys1.reduce((equal, key) => {
      if (!equal) { return false; }
      const val1 = o1[key];
      const val2 = o2[key];
      if (val1 === val2) { return true; }
      if (typeof val1 !== typeof val2) { return false; }
      if (isPlainObject(val1)) {
        return !isPlainObject(val2) ?
          false : (isEmpty(val1) && isEmpty(val2)) || this.checkEquality(val1, val2);
      } else if (Array.isArray(val1)) {
        return !Array.isArray(val2) ?
          false : (isEmpty(val1) && isEmpty(val2)) || this.checkEquality(val1, val2);
      } else if (isFunction(val1)) {
        // isEqual does not support equality checking on functions,
        // so just return true when both values are functions
        return true;
      } else {
        return isEqual(val1, val2);
      }
    }, true);
  }
};
