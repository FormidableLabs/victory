import isEqual from "react-fast-compare";

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
    return arr.filter((el) => el !== undefined);
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

  /*
  `areVictoryPropsEqual` does the following:
    - marks any two Functions as equal
    - returns false when checking the equality of things like `1` vs. `Object(1)`
    (see the tests for more specifics)
  */
  areVictoryPropsEqual(a, b) {
    return isEqual(a, b);
  }
};
