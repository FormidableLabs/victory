import { assign, uniq, range, last } from "lodash";
import { Helpers, Collection, Log } from "victory-core";
import Scale from "./scale";

export default {
  // String Data
  createStringMap(props, axis) {
    const stringsFromAxes = this.getStringsFromAxes(props, axis);
    const stringsFromCategories = this.getStringsFromCategories(props, axis);
    const stringsFromData = Helpers.getStringsFromData(props, axis);

    const allStrings = uniq([...stringsFromAxes, ...stringsFromCategories, ...stringsFromData]);
    return allStrings.length === 0 ? null :
      allStrings.reduce((memo, string, index) => {
        memo[string] = index + 1;
        return memo;
      }, {});
  },

  getStringsFromAxes(props, axis) {
    if (!props.tickValues || (!Array.isArray(props.tickValues) && !props.tickValues[axis])) {
      return [];
    }
    const tickValueArray = props.tickValues[axis] || props.tickValues;
    return tickValueArray.filter((val) => typeof val === "string");
  },

  getStringsFromCategories(props, axis) {
    if (!props.categories) {
      return [];
    }
    const categories = this.getCategories(props, axis);
    const categoryStrings = categories && categories.filter((val) => typeof val === "string");
    return categoryStrings ? Collection.removeUndefined(categoryStrings) : [];
  },

  getCategories(props, axis) {
    return props.categories && !Array.isArray(props.categories) ?
      props.categories[axis] : props.categories;
  },

  getData(props) {
    if (props.data) {
      if (props.data.length < 1) {
        Log.warn("This is an empty dataset.");
        return [];
      } else {
        return this.formatData(props.data, props);
      }
    } else {
      const generatedData = (props.x || props.y) && this.generateData(props);
      return this.formatData(generatedData, props);
    }
  },

  generateData(props) {
    // create an array of values evenly spaced across the x domain that include domain min/max
    const domain = props.domain ? (props.domain.x || props.domain) :
      Scale.getBaseScale(props, "x").domain();
    const samples = props.samples || 1;
    const domainMax = Math.max(...domain);
    const domainMin = Math.min(...domain);
    const step = (domainMax - domainMin) / samples;
    const values = range(domainMin, domainMax, step).map((v) => {
      return { x: v, y: v };
    });
    return last(values).x === domainMax ?
      values : values.concat([{ x: domainMax, y: domainMax }]);
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
      x: Helpers.createAccessor(props.x),
      y: Helpers.createAccessor(props.y)
    };
    return this.cleanData(dataset, props).map((datum) => {
      const x = accessor.x(datum);
      const y = accessor.y(datum);
      return assign(
          {},
          datum,
          { x, y },
          // map string data to numeric values, and add names
          typeof x === "string" ? { x: stringMap.x[x], xName: x } : {},
          typeof y === "string" ? { y: stringMap.y[y], yName: y } : {}
        );
    });
  },

  cleanData(dataset, props) {
    // Some scale types break when certain data is supplies. This method will
    // remove data points that break scales. So far this method only removes
    // zeroes for log scales
    // TODO other cases?
    const scaleType = {
      x: Scale.getScaleType(props, "x"),
      y: Scale.getScaleType(props, "y")
    };
    const accessor = {
      x: Helpers.createAccessor(props.x),
      y: Helpers.createAccessor(props.y)
    };
    if (scaleType.x !== "log" && scaleType.y !== "log") {
      return dataset;
    }
    const rules = (datum, axis) => {
      return scaleType[axis] === "log" ? accessor[axis](datum) !== 0 : true;
    };
    return dataset.filter((datum) => {
      return rules(datum, "x") && rules(datum, "y");
    });
  }
};
