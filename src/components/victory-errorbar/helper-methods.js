import { omit, defaults, isArray } from "lodash";
import { Helpers, Events } from "victory-core";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";

export default {
  getBaseProps(props, fallbackProps) {
    const modifiedProps = Helpers.modifyProps(props, fallbackProps);
    const calculatedValues = this.getCalculatedValues(modifiedProps, fallbackProps);
    const { data, style, scale } = calculatedValues;
    const { height, width } = modifiedProps;
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
        x, y, scale, datum, index, style: dataStyle, errorX, errorY,
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
      errorX: Helpers.createAccessor(props.errorX),
      errorY: Helpers.createAccessor(props.errorY)
    };
    return dataset.map((datum) => {
      let errorX = accessor.errorX(datum.errorX);
      let errorY = accessor.errorY(datum.errorY);
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
          { errorX, errorY }
        );
    });
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
      x: Domain.getDomain(props, "x"),
      y: Domain.getDomain(props, "y")
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
