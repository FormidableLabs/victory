import defaults from "lodash/defaults";
import uniq from "lodash/uniq";
import omit from "lodash/omit";

export default {
  getBarPosition(datum, calculatedProps) {
    const {scale} = calculatedProps;
    const yOffset = datum.yOffset || 0;
    const xOffset = datum.xOffset || 0;
    const y0 = yOffset;
    const y1 = datum.y + yOffset;
    const x = datum.x + xOffset;
    const formatValue = (value, axis) => {
      return datum[axis] instanceof Date ? new Date(value) : value;
    };
    return {
      independent: scale.x(formatValue(x, "x")),
      dependent0: scale.y(formatValue(y0, "y")),
      dependent1: scale.y(formatValue(y1, "y"))
    };
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

  getUniqueX(datasets) {
    return uniq(datasets.reduce((prev, dataset) => {
      return prev.concat(dataset.data.map((d) => d.x));
    }, []));
  },

  getLabelIndex(datum, calculatedProps) {
    const { stringMap, uniqueX } = calculatedProps;
    if (datum.category !== undefined) {
      return datum.category;
    } else if (stringMap.x) {
      return (datum.x - 1);
    } else {
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
