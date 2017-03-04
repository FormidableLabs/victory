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
  }
};
