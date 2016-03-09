/**
 * Memoizes multi-argument functions.
 *
 * NOTE: If `fn` receives another function as its argument, memoization is
 * not guaranteed to work.  The function will be strigified, but it will
 * no longer be a closure.
 *
 * @param  {Function}  fn  The function to memoize
 *
 * @return {Function}      Memoized `fn`.
 */
export default {
  memoize: function memoize(fn) {
    const cache = {};
    return function () {
      const args = Array.prototype.slice.call(arguments);
      const hash = args.map((arg) => {
        return (typeof arg === "string" || typeof arg === "number") ? arg : JSON.stringify(arg);
      }).join("~");
      return hash in cache ?
        cache[hash] :
        cache[hash] = fn.apply(this, args);  // eslint-disable-line no-invalid-this
    };
  }
};
