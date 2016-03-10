const nullConstructor = () => null;
const undefinedConstructor = () => undefined;

export default {
  /**
   * Get the constructor of `value`. If `value` is null or undefined, return the
   * special singletons `nullConstructor` or `undefinedConstructor`, respectively.
   * @param {*} value Instance to return the constructor of.
   * @returns {Function} Constructor of `value`.
   */
  getConstructor(value) {
    if (typeof value === "undefined") {
      return undefinedConstructor;
    } else if (value === null) {
      return nullConstructor;
    } else {
      return value.constructor;
    }
  },

  /**
   * Get the name of the constructor used to create `value`, using
   * `Object.protoype.toString`. If the value is null or undefined, return
   * "null" or "undefined", respectively.
   * @param {*} value Instance to return the constructor name of.
   * @returns {String} Name of the constructor.
   */
  getConstructorName(value) {
    if (typeof value === "undefined") {
      return "undefined";
    } else if (value === null) {
      return "null";
    }
    return Object.prototype.toString.call(value).slice(8, -1);
  }
};
