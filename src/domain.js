import flatten from "lodash/array/flatten";
import isDate from "lodash/lang/isDate";

import Data from "./data";
import Chart from "./chart";

module.exports = {
  getDomain(props, axis) {
    const propsDomain = this.getDomainFromProps(props, axis);
    if (propsDomain) {
      return propsDomain;
    }
    const dataset = Data.getData(props);
    return this.getDomainFromData(dataset, axis);
  },

  getDomainFromProps(props, axis) {
    if (props.domain && props.domain[axis]) {
      return props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      return props.domain;
    }
  },

  getDomainFromData(dataset, axis) {
    const allData = flatten(dataset).map((datum) => datum[axis]);
    const min = Math.min(...allData);
    const max = Math.max(...allData);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (min === max) {
      const adjustedMax = max === 0 ? 1 : max;
      return [0, adjustedMax];
    }
    return [min, max];
  },

  padDomain(domain, props, axis) {
    if (!props.domainPadding) {
      return domain;
    }
    const domainPadding = typeof props.domainPadding === "number" ?
      props.domainPadding : props.domainPadding[axis];

    if (!domainPadding) {
      return domain;
    }
    const domainMin = Math.min(...domain);
    const domainMax = Math.max(...domain);
    const range = Chart.getRange(props, axis);
    const rangeExtent = Math.abs(Math.max(...range) - Math.min(...range));
    const padding = Math.abs(domainMax - domainMin) * domainPadding / rangeExtent;
    // don't make the axes cross if they aren't already
    const adjustedMin = (domainMin >= 0 && (domainMin - padding) <= 0) ?
      0 : domainMin.valueOf() - padding;
    const adjustedMax = (domainMax <= 0 && (domainMax + padding) >= 0) ?
      0 : domainMax.valueOf() + padding;
    return isDate(domainMin) || isDate(domainMax) ?
      [new Date(adjustedMin), new Date(adjustedMax)] : [adjustedMin, adjustedMax];
  }
};
