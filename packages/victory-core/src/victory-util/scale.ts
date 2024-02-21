/* eslint-disable no-use-before-define */
import { isPlainObject } from "lodash";
import * as Helpers from "./helpers";
import * as Collection from "./collection";
import * as d3Scale from "victory-vendor/d3-scale";
import { D3Scale, ScaleName } from "../types/prop-types";

const supportedScaleStrings = ["linear", "time", "log", "sqrt"] as const;

type D3ScaleMethods = Pick<
  typeof d3Scale,
  "scaleLinear" | "scaleTime" | "scaleLog" | "scaleSqrt"
>;

// Private Functions

function toNewName(scale: ScaleName): keyof D3ScaleMethods {
  // d3 scale changed the naming scheme for scale from "linear" -> "scaleLinear" etc.
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
  return `scale${capitalize(scale)}` as keyof D3ScaleMethods;
}

export function validScale(
  scale: string | D3Scale,
): scale is ScaleName | D3Scale {
  if (typeof scale === "function") {
    return (
      Helpers.isFunction(scale.copy) &&
      Helpers.isFunction(scale.domain) &&
      Helpers.isFunction(scale.range)
    );
  } else if (typeof scale === "string") {
    return (supportedScaleStrings as ReadonlyArray<string>).includes(scale);
  }
  return false;
}

function isScaleDefined(props, axis: "x" | "y") {
  if (!props.scale) {
    return false;
  } else if (props.scale.x || props.scale.y) {
    return !!props.scale[axis];
  }
  return true;
}

function getScaleTypeFromProps(props, axis: "x" | "y"): string | undefined {
  if (!isScaleDefined(props, axis)) {
    return undefined;
  }
  const scale = props.scale[axis] || props.scale;
  return typeof scale === "string" ? scale : getType(scale);
}

function getScaleFromDomain(props, axis: "x" | "y"): ScaleName | undefined {
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

function getScaleTypeFromData(props, axis): ScaleName {
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

export function getScaleFromName(name: ScaleName | string): D3Scale {
  if (validScale(name)) {
    const methodName = toNewName(name as ScaleName);
    // @ts-expect-error scaleTime is not directly compatible with our D3Scale definition
    return d3Scale[methodName]();
  }
  return d3Scale.scaleLinear();
}

export function getBaseScale(props, axis: "x" | "y") {
  const scale = getScaleFromProps(props, axis);
  if (scale) {
    return typeof scale === "string" ? getScaleFromName(scale) : scale;
  }
  const defaultScale =
    getScaleFromDomain(props, axis) || getScaleTypeFromData(props, axis);
  return getScaleFromName(defaultScale);
}

export function getDefaultScale() {
  return d3Scale.scaleLinear();
}

export function getScaleFromProps(props, axis): D3Scale | undefined {
  if (!isScaleDefined(props, axis)) {
    return undefined;
  }
  const scale = props.scale[axis] || props.scale;
  if (validScale(scale)) {
    return Helpers.isFunction(scale) ? scale : getScaleFromName(scale);
  }
  return undefined;
}

export function getScaleType(props, axis): string {
  // if the scale was not given in props, it will be set to linear or time depending on data
  return (
    getScaleTypeFromProps(props, axis) || getScaleTypeFromData(props, axis)
  );
}

// Ordered type inference off of function fields.
// **Note**: Brittle because reliant on d3 internals.
const DUCK_TYPES = [
  { name: "quantile", method: "quantiles" },
  { name: "log", method: "base" },
  // TODO(2214): Re-evaluate (1) duck typing approach, and (2) if duck typing,
  //   do we need a different approach? (Multiple keys? Stringifying functions?)
  // https://github.com/FormidableLabs/victory/issues/2214
  // Below are matches that don't seem to otherwise occur in Victory code base.
  // { name: "ordinal", method: "unknown" },
  // { name: "pow-sqrt", method: "exponent" },
  // { name: "quantize-threshold", method: "invertExtent" }
];

export function getType(scale) {
  if (typeof scale === "string") {
    return scale;
  }

  const scaleType = DUCK_TYPES.filter((type) => {
    return scale[type.method] !== undefined;
  })[0];

  return scaleType ? scaleType.name : undefined;
}
