export default {
  IMMUTABLE_ITERABLE: "@@__IMMUTABLE_ITERABLE__@@",
  IMMUTABLE_RECORD: "@@__IMMUTABLE_RECORD__@@",
  IMMUTABLE_LIST: "@@__IMMUTABLE_LIST__@@",
  IMMUTABLE_MAP: "@@__IMMUTABLE_MAP__@@",

  isImmutable(x) {
    return this.isIterable(x) || this.isRecord(x);
  },

  isIterable(x) {
    return !!(x && x[this.IMMUTABLE_ITERABLE]);
  },

  isRecord(x) {
    return !!(x && x[this.IMMUTABLE_RECORD]);
  },

  isList(x) {
    return !!(x && x[this.IMMUTABLE_LIST]);
  },

  isMap(x) {
    return !!(x && x[this.IMMUTABLE_MAP]);
  },

  shallowToJS(x, whitelist) {
    return this.isIterable(x)
      ? x.reduce(
          (prev, curr, key) => {
            if (whitelist && whitelist[key]) {
              curr = this.shallowToJS(curr);
            }
            prev[key] = curr;
            return prev;
          },
          this.isList(x) ? [] : {}
        )
      : x;
  }
};
