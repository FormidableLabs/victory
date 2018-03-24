/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.25, 0.5, 0.75, 1, 2] }]*/
/*eslint-disable no-nested-ternary */
import { sortBy, defaults, mapValues, replace, assign, uniq } from "lodash";
import { Helpers, Scale, Domain, Data } from "victory-core";
import { min as d3Min, max as d3Max, quantile as d3Quantile } from "d3-array";

/* Todos left for this component
  – Create a better strategy for the horizontal prop rather than having
  the ternary operator littered all over the place
  – Integrate LabelHelpers getText method properly
  – Create a string map to parse data passed as string to numeric
*/

export default {

  getDomain(props, axis) {
    let domain;
    if (props.domain && props.domain[axis]) {
      domain = props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      domain = props.domain;
    } else {
      const dataset = this.getData(props);

      if (props.horizontal) {
        // find the domain of all y values, use the min and max for x
        domain = axis === "x"
          ? this.getDomainFromMinMax(dataset)
          : this.reduceDataset(props, dataset, axis);
      } else {
        // find the domain of all x values, use the min and max for y
        domain = axis === "x"
          ? this.reduceDataset(props, dataset, axis)
          : this.getDomainFromMinMax(dataset);
      }
    }
    return Domain.cleanDomain(Domain.padDomain(domain, props, axis), props);
  },

  getData(props) {
    if (!props.data || Data.getLength(props.data) < 1) {
      return [];
    }
    const createAccessor = (name) => {
      return Helpers.createAccessor(props[name] !== undefined ? props[name] : name);
    };

    const stringMap = {
      x: Data.createStringMap(props, "x"),
      y: Data.createStringMap(props, "y")
    };
    // TODO create a string map to map string data to numeric data

    const accessor = {
      x: createAccessor("x"),
      y: createAccessor("y"),
      min: createAccessor("min"),
      max: createAccessor("max"),
      q1: createAccessor("q1"),
      q3: createAccessor("q3"),
      median: createAccessor("median")
    };

    const formattedData = props.data.reduce((dataArr, datum) => {
      datum = Data.parseDatum(datum);

      const _x = accessor.x(datum);
      const _y = accessor.y(datum);
      const _min = accessor.min(datum);
      const _max = accessor.max(datum);
      const _q1 = accessor.q1(datum);
      const _q3 = accessor.q3(datum);
      const _median = accessor.median(datum);

      dataArr.push(
        assign(
          {},
          datum,
          { _x, _y, _min, _max, _q1, _q3, _median },
          typeof _x === "string" ? { _x: stringMap.x[_x], x: _x } : {},
          typeof _y === "string" ? { _y: stringMap.y[_y], y: _y } : {}
        )
      );

      return dataArr;
    }, []);

    return Data.addEventKeys(props, this.processData(props, formattedData));
  },

  processData(props, data) {
    /* check if the data is coming in a pre-processed form,
    i.e. { x || y, min, max, q1, q3, median }. if not, process it. */
    const isProcessed = this.checkProcessedData(props, data);
    if (!isProcessed) {
      // check if the data is coming with x or y values as an array
      const depedenentVarAsArray = data.every((datum) => {
        return props.horizontal ? Array.isArray(datum._x) : Array.isArray(datum._y);
      });

      if (depedenentVarAsArray) {
        /* generate summary statistics for each datum. to do this, flatten
        the depedentVarArray and process each datum separately */
        return data.map((datum) => {
          const flattenedDatum = props.horizontal
            ? datum._x.map((xVal) => ({ _x: xVal, _y: datum._y }))
            : datum._y.map((yVal) => ({ _x: datum._x, _y: yVal }));
          const sortedData = this.sortData(flattenedDatum, props.horizontal);
          return this.getSummaryStatistics(sortedData, props.horizontal);
        });
      } else {
        const sortedData = this.sortData(data, props.horizontal);
        return [this.getSummaryStatistics(sortedData, props.horizontal)];
      }
    } else {
      return data;
    }
  },

  checkProcessedData(props, data) {
    /* check if the data is pre-processed. start by checking that it has
    all required quartile attributes. */
    const quartiles = ["_max", "_min", "_median", "q1", "q3"];
    const hasQuartileAttributes = data.every((datum) => {
      return quartiles.every((val) => datum[val] !== undefined);
    });

    if (hasQuartileAttributes) {
      // check that the indepedent variable is distinct
      const values = data.map(({ _x, _y }) => props.horizontal ? _y : _x);
      if (!uniq(values).length === values.length) {
        throw new Error(`
          data prop may only take an array of objects with a unique
          independent variable. Make sure your x or y values are distinct.
        `);
      }
      return true;
    }
    return false;
  },

  getStyles(props, styleObject) {
    const style = props.style || {};
    styleObject = styleObject || {};
    const parentStyles = { height: "100%", width: "100%" };
    const labelStyles = defaults({}, style.labels, styleObject.labels);
    const boxStyles = defaults({}, style.boxes, styleObject.boxes);
    const whiskerStyles = defaults({}, style.whiskers, styleObject.whiskers);
    return {
      boxes: boxStyles,
      labels: labelStyles,
      parent: defaults(style.parent, styleObject.parent, parentStyles),
      max: defaults({}, style.max, styleObject.max, whiskerStyles),
      maxLabels: defaults({}, style.maxLabel, styleObject.maxlabel, labelStyles),
      median: defaults({}, style.median, styleObject.median, whiskerStyles),
      medianLabels: defaults({}, style.medianLabel, styleObject.medianlabel, labelStyles),
      min: defaults({}, style.min, styleObject.min, whiskerStyles),
      minLabels: defaults({}, style.minLabel, styleObject.minlabel, labelStyles),
      q1: defaults({}, style.q1, styleObject.q1, boxStyles),
      q1Labels: defaults({}, style.q1Label, styleObject.q1label, labelStyles),
      q3: defaults({}, style.q3, styleObject.q3, boxStyles),
      q3Labels: defaults({}, style.q3Label, styleObject.q3label, labelStyles),
      whiskers: whiskerStyles
    };
  },

  getCalculatedValues(props) {
    const { theme, horizontal } = props;
    const data = Data.addEventKeys(props, this.getData(props));
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
    const defaultStyles = theme && theme.boxplot && theme.boxplot.style ? theme.boxplot.style : {};
    const style = this.getStyles(props, defaultStyles);
    const dimension = horizontal ? "x" : "y";
    return { data, dimension, domain, scale, style };
  },

  sortData(dataset, horizontal) {
    const sortKey = horizontal ? "_x" : "_y";
    return sortBy(dataset, sortKey);
  },

  getSummaryStatistics(data, horizontal) {
    const dependentVars = data.map(({ _x, _y }) => horizontal ? _x : _y);
    const quartiles = {
      _q1: d3Quantile(dependentVars, 0.25),
      _q3: d3Quantile(dependentVars, 0.75),
      _min: d3Min(dependentVars),
      _median: d3Quantile(dependentVars, 0.5),
      _max: d3Max(dependentVars)
    };

    return horizontal ?
      assign({}, quartiles, { _y: data[0]._y }) : assign({}, quartiles, { _x: data[0]._x });
  },

  // eslint-disable-next-line complexity
  getWhiskerProps(props, type) {
    const { horizontal, style, boxWidth, datum, scale, index } = props;
    const { min, max, q1, q3, x, y } = props.positions;
    const boxValue = type === "min" ? q1 : q3;
    const whiskerValue = type === "min" ? min : max;

    return {
      datum, index, scale,
      majorWhisker: {
        x1: horizontal ? boxValue : x,
        y1: horizontal ? y : boxValue,
        x2: horizontal ? whiskerValue : x,
        y2: horizontal ? y : whiskerValue
      },
      minorWhisker: {
        x1: horizontal ? whiskerValue : x - boxWidth / 2,
        y1: horizontal ? y - boxWidth / 2 : whiskerValue,
        x2: horizontal ? whiskerValue : x + boxWidth / 2,
        y2: horizontal ? y + boxWidth / 2 : whiskerValue
      },
      style: style[type] || style.whisker
    };
  },

  getBoxProps(props, type) {
    const { horizontal, boxWidth, style, scale, datum, index } = props;
    const { median, q1, q3, x, y } = props.positions;
    const defaultX = type === "q1" ? q1 : median;
    const defaultY = type === "q1" ? median : q3;
    const defaultWidth = type === "q1" ? median - q1 : q3 - median;
    const defaultHeight = type === "q1" ? q1 - median : median - q3;
    return {
      datum, scale, index,
      x: horizontal ? defaultX : x - boxWidth / 2,
      y: horizontal ? y - boxWidth / 2 : defaultY,
      width: horizontal ? defaultWidth : boxWidth,
      height: horizontal ? boxWidth : defaultHeight,
      style: style[type] || style.boxes
    };
  },

  getMedianProps(props) {
    const { boxWidth, horizontal, style, datum, scale, index } = props;
    const { median, x, y } = props.positions;
    return {
      datum, scale, index,
      x1: horizontal ? median : x - boxWidth / 2,
      y1: horizontal ? y - boxWidth / 2 : median,
      x2: horizontal ? median : x + boxWidth / 2,
      y2: horizontal ? y + boxWidth / 2 : median,
      style: style.median
    };
  },

  getText(props, type) {
    const { datum, index, labels } = props;
    const propName = `${type}Labels`;
    const labelProp = props[propName];
    if (!labelProp && !labels) {
      return null;
    } else if (labelProp === true || labels === true) {
      const dataName = `_${type}`;
      return `${datum[dataName]}`;
    }
    return Array.isArray(labelProp) ? labelProp[index] : labelProp;
  },

  getLabelProps(props, text, type) {
    const { datum, positions, index, boxWidth, horizontal, labelOrientation, style } = props;
    const { x, y } = positions;
    const namespace = `${type}Labels`;
    const labelStyle = style[namespace] || style.labels;
    const labelPadding = labelStyle.padding ? labelStyle.padding : 0;
    const defaultVerticalAnchor = horizontal ? "end" : "middle";
    const defaultTextAnchor = horizontal ? "middle" : "start";
    const defaultX = labelOrientation === "left" ?
      x - boxWidth / 2 - labelPadding : x + boxWidth / 2 + labelPadding;
    const defaultY = labelOrientation === "top" ?
      y - boxWidth / 2 - labelPadding : y + boxWidth / 2 + labelPadding;

    return {
      text, datum, index,
      style: labelStyle,
      y: horizontal ? defaultY : positions[type],
      x: horizontal ? positions[type] : defaultX,
      textAnchor: labelStyle.textAnchor || defaultTextAnchor,
      verticalAnchor: labelStyle.verticalAnchor || defaultVerticalAnchor,
      angle: labelStyle.angle
    };
  },

  reduceDataset(props, dataset, axis) {
    const allData = dataset.reduce((memo, datum) => {
      return memo.concat(datum[`_${axis}`]);
    }, []);

    if (allData.length < 1) {
      return Scale.getBaseScale(props, axis).domain();
    }
    const minData = Math.min(...allData);
    const maxData = Math.max(...allData);
    if (+minData === +maxData) {
      return Domain.getSinglePointDomain(maxData);
    }
    return [minData, maxData];
  },

  getDomainFromMinMax(dataset) {

    const allMin = dataset.reduce((memo, datum) => memo.concat(datum._min), []);
    const allMax = dataset.reduce((memo, datum) => memo.concat(datum._max), []);

    const minData = Math.min(...allMin);
    const maxData = Math.max(...allMax);
    if (+minData === +maxData) {
      return Domain.getSinglePointDomain(maxData);
    }

    return [minData, maxData];
  },

  getDataProps(props, type) {
    if (type === "median") {
      return this.getMedianProps(props);
    } else if (type === "min" || type === "max") {
      return this.getWhiskerProps(props, type);
    }
    return this.getBoxProps(props, type);
  },

  getBaseProps(props, fallbackProps) {
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, "boxplot");
    props = assign({}, modifiedProps, this.getCalculatedValues(modifiedProps));
    const {
      groupComponent, width, height, padding, standalone, horizontal,
      theme, data, style, scale, domain, events, sharedEvents
    } = props;
    const initialChildProps = {
      parent: {
        domain, scale, width, height, data, standalone,
        theme, style: style.parent || {}, padding, groupComponent
      }
    };
    const types = ["max", "median", "min", "q1", "q3"];
    const boxScale = horizontal ? scale.x : scale.y;

    return data.reduce((acc, datum, index) => {
      const eventKey = typeof datum.eventKey !== undefined ? datum.eventKey : index;
      const positions = {
        x: scale.x(datum._x),
        y: scale.y(datum._y),
        min: boxScale(datum._min),
        max: boxScale(datum._max),
        median: boxScale(datum._median),
        q1: boxScale(datum._q1),
        q3: boxScale(datum._q3)
      };
      const dataProps = assign({ index, datum, positions }, props);
      const dataObj = types.reduce((memo, type) => {
        memo[type] = this.getDataProps(dataProps, type);
        return memo;
      }, {});

      acc[eventKey] = dataObj;

      types.forEach((type) => {
        const labelText = this.getText(dataProps, type);
        if (labelText !== null && typeof labelText !== undefined || !events || !sharedEvents) {
          const target = `${type}Labels`;
          acc[eventKey][target] = this.getLabelProps(dataProps, labelText, type);
        }
      });

      return acc;
    }, initialChildProps);
  }
};
