import isFunction from "lodash/lang/isFunction";
import isUndefined from "lodash/lang/isUndefined";
import isNull from "lodash/lang/isNull";
import property from "lodash/utility/property";
import identity from "lodash/utility/identity";

export default {
  createAccessor(key) {
    // creates a data accessor function
    // given a property key, path, array index, or null for identity.
    if (isFunction(key)) {
      return key;
    } else if (isNull(key) || isUndefined(key)) {
      // null/undefined means "return the data item itself"
      return identity;
    }
    // otherwise, assume it is an array index, property key or path (_.property handles all three)
    return property(key);
  }
};
