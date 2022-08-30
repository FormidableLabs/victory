import { VictoryProviderProps } from "../..";
import { getData } from "../../victory-state/helpers/get-data";
import { getDomain } from "../../victory-state/helpers/get-domain";
import { getAxisData } from "../../victory-state/helpers/get-axis-data";
import { getRange, RangeProps } from "../../victory-state/helpers/get-range";
import { getScale, ScaleProps } from "../../victory-state/helpers/get-scale";
import { DataSelector } from "./data-selector";

/**
 * Normalizes the `data` property, evaluating using other props like x, y, and sortKey.
 *
 */
export const selectNormalizedData = (s: DataSelector) =>
  s.propsAs<VictoryProviderProps>().map((props) => {
    const normalizedData = getData(props);
    return {
      ...props,
      data: normalizedData,
      normalizedData,
    };
  });

/**
 * Returns the domains of each data set
 */
export const selectDomains = (s: DataSelector) =>
  s.select(selectNormalizedData).map((props) => {
    return {
      x: getDomain(props, "x"),
      y: getDomain(props, "y"),
    };
  });

/**
 * Returns the domain of all data sets
 */
export const selectDomain = (s: DataSelector) => {
  const domains = s.select(selectDomains);
  return {
    x: [
      Math.min(...domains.map((d) => d.x[0] as number)),
      Math.max(...domains.map((d) => d.x[1] as number)),
    ],
    y: [
      Math.min(...domains.map((d) => d.y[0] as number)),
      Math.max(...domains.map((d) => d.y[1] as number)),
    ],
  };
};

export const selectRanges = (s: DataSelector) => {
  return s.propsAs<RangeProps>().map((props) => ({
    x: getRange(props, "x"),
    y: getRange(props, "y"),
  }));
};

export const selectScales = (s: DataSelector) => {
  return s.propsAs<ScaleProps>().map((props) => ({
    x: getScale(props, "x"),
    y: getScale(props, "y"),
  }));
};
