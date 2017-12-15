export default {
  IMMUTABLE_ITERABLE: "@@__IMMUTABLE_ITERABLE__@@",
  IMMUTABLE_RECORD: "@@__IMMUTABLE_RECORD__@@",

  isImmutable(x) {
    return this.isIterable(x) || this.isRecord(x);
  },

  isIterable(x) {
    return !!(x && x[this.IMMUTABLE_ITERABLE]);
  },

  isRecord(x) {
    return !!(x && x[this.IMMUTABLE_RECORD]);
  }
};
