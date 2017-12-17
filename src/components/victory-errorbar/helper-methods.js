import { assign, keys, omit, defaults, isArray, flatten, sortBy, isNaN } from "lodash";
import { Helpers, LabelHelpers, Scale, Domain, Data } from "victory-core";

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "errorbar");
    const { data, style, scale, domain, origin } = this.getCalculatedValues(props, fallbackProps);
    const { groupComponent, height, width, borderWidth, standalone, theme, polar, padding } = props;
    const initialChildProps = { parent: {
      domain, scale, data, height, width, standalone, theme, polar, origin,
      padding, style: style.parent
    } };

    return data.reduce((childProps, datum, index) => {
      const eventKey = datum.eventKey || index;
      const x = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
      const y = scale.y(datum._y1 !== undefined ? datum._y1 : datum._y);

      const dataProps = {
        x, y, scale, datum, data, index, groupComponent, borderWidth,
        style: this.getDataStyles(datum, style.data),
        errorX: this.getErrors(datum, scale, "x"),
        errorY: this.getErrors(datum, scale, "y")
      };

      childProps[eventKey] = {
        data: dataProps
      };
      const text = LabelHelpers.getText(props, datum, index);
      if (text !== undefined && text !== null || props.events || props.sharedEvents) {
        childProps[eventKey].labels = this.getLabelProps(dataProps, text, style);
      }

      return childProps;
    }, initialChildProps);
  },

  getLabelProps(dataProps, text, style) {
    const { x, index, scale, errorY } = dataProps;
    const error = errorY && Array.isArray(errorY) ? errorY[0] : errorY;
    const y = error || dataProps.y;
    const labelStyle = style.labels || {};
    return {
      style: labelStyle,
      y: y - (labelStyle.padding || 0),
      x,
      text,
      index,
      scale,
      datum: dataProps.datum,
      data: dataProps.data,
      textAnchor: labelStyle.textAnchor,
      verticalAnchor: labelStyle.verticalAnchor || "end",
      angle: labelStyle.angle
    };
  },

  getErrorData(props) {
    if (props.data) {
      if (props.data.length < 1) {
        return [];
      }

      return this.formatErrorData(props.data, props);
    } else {
      const generatedData = (props.errorX || props.errorY) && this.generateData(props);
      return this.formatErrorData(generatedData, props);
    }
  },

  getErrors(datum, scale, axis) {
    /**
     * check if it is asymmetric error or symmetric error, asymmetric error should be an array
     * and the first value is the positive error, the second is the negative error
     * @param  {Boolean} isArray(errorX)
     * @return {String or Array}
     */

    const errorNames = { x: "errorX", y: "errorY" };
    const errors = datum[errorNames[axis]];
    if (errors === 0) {
      return false;
    }

    return isArray(errors) ?
      [ errors[0] === 0 ? false : scale[axis](errors[0] + datum[`_${axis}`]),
        errors[1] === 0 ? false : scale[axis](datum[`_${axis}`] - errors[1]) ] :
      [ scale[axis](errors + datum[`_${axis}`]), scale[axis](datum[`_${axis}`] - errors) ];
  },

  formatErrorData(dataset, props) {
    if (!dataset) {
      return [];
    }
    const accessor = {
      x: Helpers.createAccessor(props.x !== undefined ? props.x : "x"),
      y: Helpers.createAccessor(props.y !== undefined ? props.y : "y"),
      errorX: Helpers.createAccessor(props.errorX !== undefined ? props.errorX : "errorX"),
      errorY: Helpers.createAccessor(props.errorY !== undefined ? props.errorY : "errorY")
    };

    const replaceNegatives = (errors) => {
      // check if the value is negative, if it is set to 0
      const replaceNeg = (val) => !val || val < 0 ? 0 : val;
      return isArray(errors) ? errors.map((err) => replaceNeg(err)) : replaceNeg(errors);
    };

    const stringMap = {
      x: Data.createStringMap(props, "x"),
      y: Data.createStringMap(props, "y")
    };

    return this.sortData(dataset.map((datum, index) => {
      const evaluatedX = accessor.x(datum);
      const evaluatedY = accessor.y(datum);
      const _x = evaluatedX !== undefined ? evaluatedX : index;
      const _y = evaluatedY !== undefined ? evaluatedY : datum;
      const errorX = replaceNegatives(accessor.errorX(datum));
      const errorY = replaceNegatives(accessor.errorY(datum));

      return assign(
        {},
        datum,
        { _x, _y, errorX, errorY },
        // map string data to numeric values, and add names
        typeof _x === "string" ? { _x: stringMap.x[_x], x: _x } : {},
        typeof _y === "string" ? { _y: stringMap.y[_y], y: _y } : {}
      );
    }), props.sortKey, props.sortOrder);
  },

  sortData(dataset, sortKey, sortOrder = "ascending") {
    if (!sortKey) {
      return dataset;
    }

    if (sortKey === "x" || sortKey === "y") {
      sortKey = `_${sortKey}`;
    }

    const sortedData = sortBy(dataset, sortKey);

    if (sortOrder === "descending") {
      return sortedData.reverse();
    }

    return sortedData;
  },

  getDomain(props, axis) {
    const propsDomain = Domain.getDomainFromProps(props, axis);
    if (propsDomain) {
      return Domain.padDomain(propsDomain, props, axis);
    }
    const categoryDomain = Domain.getDomainFromCategories(props, axis);
    if (categoryDomain) {
      return Domain.padDomain(categoryDomain, props, axis);
    }
    const dataset = this.getErrorData(props);

    if (dataset.length < 1) {
      return Scale.getBaseScale(props, axis).domain();
    }

    const domain = this.getDomainFromData(props, axis, dataset);
    return Domain.cleanDomain(Domain.padDomain(domain, props, axis), props);
  },

  getDomainFromData(props, axis, dataset) {
    const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
    let error;
    if (currentAxis === "x") {
      error = "errorX";
    } else if (currentAxis === "y") {
      error = "errorY";
    }
    const axisData = flatten(dataset).map((datum) => datum[`_${currentAxis}`]);
    const errorData = flatten(flatten(dataset).map((datum) => {
      let errorMax;
      let errorMin;
      if (isArray(datum[error])) {
        errorMax = datum[error][0] + datum[`_${currentAxis}`];
        errorMin = datum[`_${currentAxis}`] - datum[error][1];
      } else {
        errorMax = datum[error] + datum[`_${currentAxis}`];
        errorMin = datum[`_${currentAxis}`] - datum[error];
      }
      return [errorMax, errorMin];
    }));

    const allData = axisData.concat(errorData);
    const min = Math.min(...allData);
    const max = Math.max(...allData);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (+min === +max) {
      return Domain.getSinglePointDomain(max);
    }
    return [min, max];
  },

  getCalculatedValues(props) {
    const defaultStyles = props.theme && props.theme.errorbar && props.theme.errorbar.style ?
      props.theme.errorbar.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles) || {};
    const dataWithErrors = assign(Data.getData(props), this.getErrorData(props));
    const data = Data.addEventKeys(props, dataWithErrors);
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
    const origin = props.polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
    return { domain, data, scale, style, origin };
  },

  getDataStyles(datum, style) {
    const numKeys = keys(datum).filter((k) => isNaN(k));
    const omitKeys = [
      "x", "y", "_x", "_y", "name", "errorX", "errorY", "eventKey", "label"
    ];
    const stylesFromData = omit(datum, [...omitKeys, ...numKeys]);
    return defaults({}, stylesFromData, style);
  }
};
