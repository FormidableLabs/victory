export default {
  /**
   * Generates a new domain scaled by factor and constrained by the original domain.
   * @param  {[Number, Number]} currentDomain  The domain to be scaled.
   * @param  {[Number, Number]} originalDomain The original domain for the data set.
   * @param  {Number}           factor         The delta to translate by
   * @return {[Number, Number]}                The scale domain
   */
  scale: (currentDomain, originalDomain, factor) => {
    const [fromBound, toBound] = originalDomain;
    const [from, to] = currentDomain;
    const range = Math.abs(from - to);
    const midpoint = from + (range / 2);
    const newRange = (range * factor) / 2;
    return [
      Math.max(midpoint - newRange, fromBound),
      Math.min(midpoint + newRange, toBound)
    ];
  },

/**
 * Generate a new domain translated by the delta and constrained by the original domain.
 * @param  {[Number, Number]} currentDomain  The domain to be translated.
 * @param  {[Number, Number]} originalDomain The original domain for the data set.
 * @param  {Number}           delta          The delta to translate by
 * @return {[Number, Number]}                The translated domain
 */
  pan: (currentDomain, originalDomain, delta) => {
    const [fromCurrent, toCurrent] = currentDomain;
    const [fromOriginal, toOriginal] = originalDomain;
    const lowerBound = fromCurrent + delta;
    const upperBound = toCurrent + delta;

    if (lowerBound > fromOriginal && upperBound < toOriginal) {
      return [lowerBound, upperBound];
    } else if (lowerBound < fromOriginal) { // Clamp to lower limit
      const dx = toCurrent - fromCurrent;
      return [fromOriginal, fromOriginal + dx];
    } else if (upperBound > toOriginal) { // Clamp to upper limit
      const dx = toCurrent - fromCurrent;
      return [toOriginal - dx, toOriginal];
    } else {
      return currentDomain;
    }
  }
};
