import flatten from "lodash/array/flatten";
import take from "lodash/array/take";
import uniq from "lodash/array/uniq";
import isDate from "lodash/lang/isDate";
import defaults from "lodash/object/defaults";
import omit from "lodash/object/omit";
import Domain from "../../helpers/domain";

module.exports = {
  getDomain(props, axis) {
    const propsDomain = Domain.getDomainFromProps(props, axis);
    if (propsDomain) {
      return Domain.padDomain(propsDomain, props, axis);
    }
    const ensureZero = (domain) => {
      return axis === "y" ? [Math.min(...domain, 0), Math.max(... domain, 0)] : domain;
    };
    const dataDomain = ensureZero(Domain.getDomainFromGroupedData(props, axis));
    return Domain.padDomain(dataDomain, props, axis);
  },

  // Layout Helpers
  getBarPosition(datum, index, calculatedProps) {
    const { scale, stacked, categories } = calculatedProps;
    const yOffset = stacked ? this.getYOffset(datum, index, calculatedProps) : 0;
    const y0 = yOffset;
    const y1 = yOffset + datum.y;
    const x = (stacked && !categories) ? datum.x :
      this.adjustX(datum, index.seriesIndex, calculatedProps);
    const formatValue = (value, axis) => {
      return isDate(datum[axis]) ? new Date(value) : value;
    };
    return {
      independent: scale.x(formatValue(x, "x")),
      dependent0: scale.y(formatValue(y0, "y")),
      dependent1: scale.y(formatValue(y1, "y"))
    };
  },

  getYOffset(datum, index, calculatedProps) {
    const { datasets } = calculatedProps;
    if (index.seriesIndex === 0) {
      return 0;
    }
    const y = datum.y;
    const previousDataSets = take(datasets, index.seriesIndex);
    const previousBars = flatten(previousDataSets.map((dataset) => {
      return dataset.data
        .filter((previousDatum) => previousDatum.x === datum.x)
        .map((previousDatum) => previousDatum.y || 0);
    }));
    return previousBars.reduce((memo, barValue) => {
      const sameSign = (y < 0 && barValue < 0) || (y >= 0 && barValue >= 0);
      return sameSign ? memo + barValue : memo;
    }, 0);
  },

  adjustX(datum, index, calculatedProps) {
    const {stacked, categories} = calculatedProps;
    const style = calculatedProps.style.data;
    const x = datum.x;
    const datasets = calculatedProps.datasets;
    const center = datasets.length % 2 === 0 ?
      datasets.length / 2 : (datasets.length - 1) / 2;
    const centerOffset = index - center;
    const totalWidth = this.pixelsToValue(style.padding, "x", calculatedProps) +
      this.pixelsToValue(style.width, "x", calculatedProps);
    if (datum.category !== undefined) {
      // if this is category data, shift x to the center of its category
      const rangeBand = categories[datum.category];
      const bandCenter = (Math.max(...rangeBand) + Math.min(...rangeBand)) / 2;
      return stacked ? bandCenter : bandCenter + (centerOffset * totalWidth);
    }
    return stacked ? x : x + (centerOffset * totalWidth);
  },

  pixelsToValue(pixels, axis, calculatedProps) {
    if (pixels === 0) {
      return 0;
    }
    const domain = calculatedProps.domain[axis];
    const range = calculatedProps.range[axis];
    const domainExtent = Math.max(...domain) - Math.min(...domain);
    const rangeExtent = Math.max(...range) - Math.min(...range);
    return domainExtent / rangeExtent * pixels;
  },

  // Label Helpers
  shouldPlotLabel(index, props, datasets) {
    const isCenter = Math.floor(datasets.length / 2) === index;
    const isLast = datasets.length === index + 1;
    const stacked = props.stacked;
    const plotGroupLabel = (stacked && isLast) || (!stacked && isCenter);
    const labelExists = (props.labels || props.labelComponents) ? true : false;
    return (plotGroupLabel && labelExists);
  },

  getLabelIndex(datum, calculatedProps) {
    const { datasets, stringMap } = calculatedProps;
    if (datum.category !== undefined) {
      return datum.category;
    } else if (stringMap.x) {
      return (datum.x - 1);
    } else {
      const allX = datasets.map((dataset) => {
        return dataset.data.map((d) => d.x);
      });
      const uniqueX = uniq(flatten(allX));
      return uniqueX.findIndex((x) => x === datum.x);
    }
  },

  getBarStyle(datum, dataset, baseStyle) {
    const styleData = omit(datum, [
      "xName", "yName", "x", "y", "label", "category"
    ]);
    return defaults({}, styleData, omit(dataset.attrs, "name"), baseStyle.data);
  }
};
