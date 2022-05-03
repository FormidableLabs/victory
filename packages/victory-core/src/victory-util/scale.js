/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
import { includes, isFunction, isPlainObject } from "lodash";
import * as Helpers from "./helpers";
import * as Collection from "./collection";
import * as d3Scale from "victory-vendor/d3-scale";

const supportedScaleStrings = ["linear", "time", "log", "sqrt"];

// const D3_OBJ = {};
// Object.keys(d3Scale).forEach((meth) => {
//   try {
//     // Function call
//     D3_OBJ[meth] = {
//       type: "function",
//       keys: Object.keys(d3Scale[meth]())
//     };
//   } catch (err) {
//     if (err.message.includes("is not a function")) {
//       // Object
//       D3_OBJ[meth] = {
//         type: "object",
//         keys: Object.keys(d3Scale[meth])
//       };
//     } else {
//       throw err;
//     }
//   }
// });

// console.log("TODO HERE D3_OBJ", JSON.stringify(D3_OBJ, null, 2));

// Private Functions

function toNewName(scale) {
  // d3 scale changed the naming scheme for scale from "linear" -> "scaleLinear" etc.
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
  return `scale${capitalize(scale)}`;
}

function validScale(scale) {
  if (typeof scale === "function") {
    return (
      isFunction(scale.copy) &&
      isFunction(scale.domain) &&
      isFunction(scale.range)
    );
  } else if (typeof scale === "string") {
    return includes(supportedScaleStrings, scale);
  }
  return false;
}

function isScaleDefined(props, axis) {
  if (!props.scale) {
    return false;
  } else if (props.scale.x || props.scale.y) {
    return props.scale[axis] ? true : false;
  }
  return true;
}

function getScaleTypeFromProps(props, axis) {
  if (!isScaleDefined(props, axis)) {
    return undefined;
  }
  const scale = props.scale[axis] || props.scale;
  // console.log("TODO HERE getScaleFromProps", {
  //   scale,
  //   getType: getType(scale)
  // })
  return typeof scale === "string" ? scale : getType(scale);
}

function getScaleFromDomain(props, axis) {
  let domain;
  if (props.domain && props.domain[axis]) {
    domain = props.domain[axis];
  } else if (props.domain && Array.isArray(props.domain)) {
    domain = props.domain;
  }
  if (!domain) {
    return undefined;
  }
  return Collection.containsDates(domain) ? "time" : "linear";
}

function getScaleTypeFromData(props, axis) {
  if (!props.data) {
    return "linear";
  }
  const accessor = Helpers.createAccessor(props[axis]);
  const axisData = props.data.map((datum) => {
    const processedData = isPlainObject(accessor(datum))
      ? accessor(datum)[axis]
      : accessor(datum);
    return processedData !== undefined ? processedData : datum[axis];
  });
  return Collection.containsDates(axisData) ? "time" : "linear";
}

// Exported Functions

export function getScaleFromName(name) {
  return validScale(name) ? d3Scale[toNewName(name)]() : d3Scale.scaleLinear();
}

export function getBaseScale(props, axis) {
  const scale = getScaleFromProps(props, axis);
  if (scale) {
    return typeof scale === "string" ? getScaleFromName(scale) : scale;
  }
  const defaultScale =
    getScaleFromDomain(props, axis) || getScaleTypeFromData(props, axis);
  return d3Scale[toNewName(defaultScale)]();
}

export function getDefaultScale() {
  return d3Scale.scaleLinear();
}

export function getScaleFromProps(props, axis) {
  if (!isScaleDefined(props, axis)) {
    return undefined;
  }
  const scale = props.scale[axis] || props.scale;
  if (validScale(scale)) {
    return isFunction(scale) ? scale : d3Scale[toNewName(scale)]();
  }
  return undefined;
}

export function getScaleType(props, axis) {
  // console.log("TODO HERE getScaleType", {
  //   getScaleTypeFromProps: getScaleTypeFromProps(props, axis),
  //   getScaleTypeFromData: getScaleTypeFromData(props, axis)
  // })
  // if the scale was not given in props, it will be set to linear or time depending on data
  return (
    getScaleTypeFromProps(props, axis) || getScaleTypeFromData(props, axis)
  );
}

const DUCK_TYPES = [
  { name: "log", method: "base" },
  { name: "ordinal", method: "unknown" },
  { name: "pow-sqrt", method: "exponent" },
  { name: "quantile", method: "quantiles" },
  { name: "quantize-threshold", method: "invertExtent" }
];

export function getType(scale) {
  if (typeof scale === "string") {
    return scale;
  }

  if (isFunction(scale)) {
    console.log("TODO HERE", {
      name: scale.name
    });
  }

  const scaleType = DUCK_TYPES.filter((type) => {
    return scale[type.method] !== undefined;
  })[0];

  // console.log("TODO HERE getType", {
  //   keys: Object.keys(scale),
  //   scale,
  //   scaleType
  // })

  return scaleType ? scaleType.name : undefined;
}
