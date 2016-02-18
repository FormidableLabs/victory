import transform from "lodash/object/transform";
import merge from "lodash/object/merge";
import some from "lodash/collection/some";
import isFunction from "lodash/lang/isFunction";
import isUndefined from "lodash/lang/isUndefined";
import isNull from "lodash/lang/isNull";
import property from "lodash/utility/property";
import identity from "lodash/utility/identity";
import compact from "lodash/array/compact";
import isEmpty from "lodash/lang/isEmpty";
import has from "lodash/object/has";
import uniq from "lodash/array/uniq";
import zipObject from "lodash/array/zipObject";

module.exports = {
  getPadding(props) {
    const padding = typeof props.padding === "number" ? props.padding : 0;
    const paddingObj = typeof props.padding === "object" ? props.padding : {};
    return {
      top: paddingObj.top || padding,
      bottom: paddingObj.bottom || padding,
      left: paddingObj.left || padding,
      right: paddingObj.right || padding
    };
  },

  getStyles(props, defaultStyles) {
    const style = props.style || defaultStyles;
    const {data, labels, parent} = style;
    return {
      parent: merge({}, defaultStyles.parent, parent, {height: props.height, width: props.width}),
      labels: merge({}, defaultStyles.labels, labels),
      data: merge({}, defaultStyles.data, data)
    };
  },

  evaluateProp(prop, data) {
    return typeof prop === "function" ? prop(data) : prop;
  },

  evaluateStyle(style, data) {
    if (!some(style, (value) => typeof value === "function")) {
      return style;
    }
    return transform(style, (result, value, key) => {
      result[key] = this.evaluateProp(value, data);
    });
  },

  getRange(props, axis) {
    // determine how to lay the axis and what direction positive and negative are
    const {horizontal} = props;
    const isVertical = (horizontal && axis === "x") || (!horizontal && axis !== "x");
    const isDependent = (horizontal && !isVertical) || (!horizontal && isVertical);
    const padding = this.getPadding(props);
    if (isVertical) {
      const bottomToTop = [props.height - padding.bottom, padding.top];
      return isDependent ? bottomToTop : bottomToTop.reverse();
    }
    return [padding.left, props.width - padding.right];
  },

  // for components that take single datasets
  getData(props) {
    if (props.data) {
      return this.formatData(props.data, props);
    }
  },

  formatData(dataset, props, stringMap) {
    if (!dataset) {
      return [];
    }
    stringMap = stringMap || {
      x: this.createStringMap(props, "x"),
      y: this.createStringMap(props, "y")
    };
    const accessor = {
      x: this.createAccessor(props.x),
      y: this.createAccessor(props.y)
    };

    return dataset.map((datum) => {
      const x = accessor.x(datum);
      const y = accessor.y(datum);
      return merge({}, datum, {
        // map string data to numeric values, and add names
        x: typeof x === "string" ? stringMap.x[x] : x,
        xName: typeof x === "string" ? x : undefined,
        y: typeof y === "string" ? stringMap.y[y] : y,
        yName: typeof y === "string" ? y : undefined
      });
    });
  },

  createStringMap(props, axis) {
    const stringsFromData = this.getStringsFromData(props, axis);
    return isEmpty(stringsFromData) ? null :
      zipObject(stringsFromData.map((string, index) => [string, index + 1]));
  },

  getStringsFromData(props, axis) {
    if (!props.data) {
      return [];
    }
    const accessor = this.createAccessor(has(props, axis) ? props[axis] : axis);
    const dataStrings = (props.data)
        .map((datum) => accessor(datum))
        .filter((datum) => typeof datum === "string");
    // return a unique set of strings
    return compact(uniq(dataStrings));
  },

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
