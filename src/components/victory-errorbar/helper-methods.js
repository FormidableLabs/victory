import { omit, defaults, isArray, flatten } from "lodash";
import { Helpers, Events } from "victory-core";
import Scale from "../../helpers/scale";
import Axis from "../../helpers/axis";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";

export default {
  getBaseProps(props, fallbackProps) {
    const modifiedProps = Helpers.modifyProps(props, fallbackProps);
    const calculatedValues = this.getCalculatedValues(modifiedProps, fallbackProps);
    const { data, style, scale } = calculatedValues;
    const { groupComponent, height, width } = modifiedProps;
    const parentProps = {style: style.parent, scale, data, height, width};
    return data.reduce((memo, datum, index) => {
      const eventKey = datum.eventKey;
      const x = scale.x(datum.x);
      const y = scale.y(datum.y);
      let errorX;
      let errorY;
      /**
       * check if it is asymmetric error or symmetric error, asymmetric error should be an array
       * and the first value is the positive error, the second is the negative error
       * @param  {Boolean} isArray(errorX)
       * @return {String or Array}
       */
      if (isArray(datum.errorX)) {
        errorX = [
          scale.x(datum.errorX[0] + datum.x),
          scale.x(datum.x - datum.errorX[1])
        ];
      } else {
        errorX = [
          scale.x(datum.errorX + datum.x),
          scale.x(datum.x - datum.errorX)
        ];
      }

      /**
       * check if it is asymmetric error or symmetric error, asymmetric error should be an array
       * and the first value is the positive error, the second is the negative error
       * @param  {Boolean} isArray(errorY)
       * @return {String or Array}
       */
      if (isArray(datum.errorY)) {
        errorY = [
          scale.y(datum.errorY[0] + datum.y),
          scale.y(datum.y - datum.errorY[1])
        ];
      } else {
        errorY = [
          scale.y(datum.errorY + datum.y),
          scale.y(datum.y - datum.errorY)
        ];
      }

      const dataStyle = this.getDataStyles(datum, style.data);
      const dataProps = {
        x, y, scale, datum, index, style: dataStyle, errorX, errorY, groupComponent,
        borderWidth: modifiedProps.borderWidth
      };

      memo[eventKey] = {
        data: dataProps
      };
      return memo;
    }, {parent: parentProps});
  },

  getErrorData(props) {
    if (props.data) {
      return this.formatErrorData(props.data, props);
    } else {
      const generatedData = (props.errorX || props.errorY) && this.generateData(props);
      return this.formatErrorData(generatedData, props);
    }
  },

  formatErrorData(dataset, props) {
    if (!dataset) {
      return [];
    }
    const accessor = {
      x: Helpers.createAccessor(props.x),
      y: Helpers.createAccessor(props.y),
      errorX: Helpers.createAccessor(props.errorX),
      errorY: Helpers.createAccessor(props.errorY)
    };
    return dataset.map((datum) => {
      const x = accessor.x(datum);
      const y = accessor.y(datum);
      let errorX = accessor.errorX(datum);
      let errorY = accessor.errorY(datum);
      // check if the value is negative, if it is set to 0
      if (!isArray(errorX) && errorX < 0) {
        errorX = 0;
      } else if (isArray(errorX)) {
        errorX.map((err) => {
          if (err < 0) {
            return 0;
          }
          return err;
        });
      }

      if (!isArray(errorY) && errorY < 0) {
        errorY = 0;
      } else if (isArray(errorY)) {
        errorY.map((err) => {
          if (err < 0) {
            return 0;
          }
          return err;
        });
      }

      return Object.assign(
          {},
          datum,
          { x, y, errorX, errorY }
        );
    });
  },

  getDomain(props, axis) {
    const propsDomain = Domain.getDomainFromProps(props, axis);
    if (propsDomain) {
      return propsDomain;
    }
    const categoryDomain = Domain.getDomainFromCategories(props, axis);
    if (categoryDomain) {
      return categoryDomain;
    }
    const dataset = this.getErrorData(props);
    return this.getDomainFromData(props, axis, dataset);
  },

  getDomainFromData(props, axis, dataset) {
    const currentAxis = Axis.getCurrentAxis(axis, props.horizontal);
    let error;
    if (currentAxis === "x") {
      error = "errorX";
    } else if (currentAxis === "y") {
      error = "errorY";
    }
    const axisData = flatten(dataset).map((datum) => datum[currentAxis]);
    const errorData = flatten(flatten(dataset).map((datum) => {
      let errorMax;
      let errorMin;
      if (isArray(datum[error])) {
        errorMax = datum[error][0] + datum[currentAxis];
        errorMin = datum[currentAxis] - datum[error][1];
      } else {
        errorMax = datum[error] + datum[currentAxis];
        errorMin = datum[currentAxis] - datum[error];
      }
      return [errorMax, errorMin];
    }));

    const allData = axisData.concat(errorData);
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

  getCalculatedValues(props, fallbackProps) {
    const defaultStyles = props.theme && props.theme.errorbar ? props.theme.errorbar
    : fallbackProps.style;
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const assignData = Object.assign(Data.getData(props), this.getErrorData(props));
    const data = Events.addEventKeys(props, assignData);
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: this.getDomain(props, "x"),
      y: this.getDomain(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };

    return {data, scale, style};
  },

  getDataStyles(datum, style) {
    const stylesFromData = omit(datum, [
      "x", "y", "name"
    ]);
    const baseDataStyle = defaults({}, stylesFromData, style);
    return Helpers.evaluateStyle(baseDataStyle, datum);
  }
};
