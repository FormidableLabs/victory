import flatten from "lodash/array/flatten";
import includes from "lodash/collection/includes";
import * as Collection from "./collection";
import d3Scale from "d3-scale";

const supportedScaleStrings = ["linear", "time", "log", "sqrt"];

module.exports = {
  validScale(scale) {
    if (typeof scale === "function") {
      const isFunction = (val) => typeof val === "function";
      return (isFunction(scale.copy) && isFunction(scale.domain) && isFunction(scale.range));
    } else if (typeof scale === "string") {
      return includes(supportedScaleStrings, scale);
    }
    return false;
  },

  isScaleDefined(props, axis) {
    if (!props.scale) {
      return false;
    } else if (props.scale.x || props.scale.y) {
      return props.scale[axis] ? true : false;
    }
    return true;
  },

  getScaleFromProps(props, axis) {
    if (!this.isScaleDefined(props, axis)) {
      return undefined;
    }
    const scale = props.scale[axis] || props.scale;
    if (this.validScale(scale)) {
      return typeof scale === "function" ? scale : d3Scale[scale]();
    }
  },

  getScaleTypeFromData(props, axis) {
    if (!props.data) {
      return "linear";
    }
    const allData = flatten(props.data);
    const axisData = allData.map((datum) => datum[axis]);
    return Collection.containsDates(axisData) ? "time" : "linear";
  },

  getBaseScale(props, axis) {
    const scale = this.getScaleFromProps(props, axis);
    if (scale) {
      return scale;
    }
    return d3Scale[this.getScaleTypeFromData(props, axis)]();
  },

  getScaleType(props, axis) {
    const scale = this.getScaleFromProps(props, axis);
    // if the scale was not given in props, it will be set to linear or time depending on data
    if (!scale) {
      return this.getScaleTypeFromData(props, axis);
    } else if (typeof scale === "string") {
      return includes(supportedScaleStrings, scale) ? scale : "invalid";
    } else if (!this.validScale(scale)) {
      return "invalid";
    }
    const duckTypes = [
      {name: "log", method: "base"},
      {name: "ordinal", method: "unknown"},
      {name: "pow-sqrt", method: "exponent"},
      {name: "quantile", method: "quantiles"},
      {name: "quantize-threshold", method: "invertExtent"}
    ];
    const scaleType = duckTypes.filter((type) => {
      return scale[type.method] !== undefined;
    })[0];
    if (scaleType) {
      return scaleType.name;
    }
    return this.getScaleTypeFromData(props, axis);
  }
};
