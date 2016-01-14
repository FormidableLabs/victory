import transform from "lodash/object/transform";
import merge from "lodash/object/merge";
import some from "lodash/collection/some";

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
  }
};
