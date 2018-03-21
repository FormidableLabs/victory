/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.25, 0.5, 0.75, 1, 2] }]*/
/*eslint-disable no-nested-ternary */
import { sortBy, defaults, has, mapValues, replace, assign, uniq } from "lodash";
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

      if (props.dimension === "y") {
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

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "boxplot");
    const calculatedValues = this.getCalculatedValues(props);
    const { data, style, scale, domain } = calculatedValues;
    console.log(data)
    const {
      groupComponent, width, height, padding, standalone, horizontal,
      theme, boxWidth, labelOrientation
    } = props;
    const initialChildProps = {
      parent: {
        domain, scale, width, height, data, standalone,
        theme, style: style.parent || {}, padding, groupComponent
      }
    };

    return data.reduce((acc, datum, index) => {
      const eventKey = index;
      const x = scale.x(datum._x);
      const y = scale.y(datum._y);
      const boxScale = horizontal ? scale.x : scale.y;
      const min = boxScale(datum._min);
      const max = boxScale(datum._max);
      const q1 = boxScale(datum._q1);
      const q3 = boxScale(datum._q3);
      const median = boxScale(datum._median);
      const dataProps = {
        datum, x, y, min, max, q1, q3, median, horizontal,
        boxWidth, groupComponent, style, labelOrientation
      };
      const { q1Props, q3Props } = this.getBoxProps(dataProps);
      const {
        minLabelProps, maxLabelProps, q1LabelProps, q3LabelProps, medianLabelProps
      } = this.getLabelProps(dataProps);

      acc[eventKey] = {
        max: this.getWhiskerProps(dataProps, "max"),
        maxLabel: maxLabelProps,
        median: this.getMedianProps(dataProps),
        medianLabel: medianLabelProps,
        min: this.getWhiskerProps(dataProps, "min"),
        minLabel: minLabelProps,
        q1: q1Props,
        q1Label: q1LabelProps,
        q3: q3Props,
        q3Label: q3LabelProps
      };
      return acc;
    }, initialChildProps);
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

    return this.processData(props, formattedData);
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
      maxLabel: defaults({}, style.maxLabel, styleObject.maxlabel, labelStyles),
      median: defaults({}, style.median, styleObject.median, whiskerStyles),
      medianLabel: defaults({}, style.medianLabel, styleObject.medianlabel, labelStyles),
      min: defaults({}, style.min, styleObject.min, whiskerStyles),
      minLabel: defaults({}, style.minLabel, styleObject.minlabel, labelStyles),
      q1: defaults({}, style.q1, styleObject.q1, boxStyles),
      q1Label: defaults({}, style.q1Label, styleObject.q1label, labelStyles),
      q3: defaults({}, style.q3, styleObject.q3, boxStyles),
      q3Label: defaults({}, style.q3Label, styleObject.q3label, labelStyles),
      whiskers: whiskerStyles
    };
  },

  getCalculatedValues(props) {
    const { theme } = props;
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
    return { domain, data, scale, style };
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

    if (horizontal) {
      return {
        ...quartiles,
        _y: data[0]._y
      };
    } else {
      return {
        ...quartiles,
        _x: data[0]._x
      };
    }
  },

  // try to find a way to simplify this rather than disable es-lint
  getWhiskerProps(dataProps, type) {
    const {
      horizontal, x, y, min, max, q1, q3, style, boxWidth, groupComponent
    } = dataProps;

    const whiskerStyle = style[type] || style.whisker || {};
    const boxValue = type === "min" ? q1 : q3;
    const whiskerValue = type === "min" ? min : max;
    const majorCoordinates = {
      x1: horizontal ? boxValue : x,
      y1: horizontal ? y : boxValue,
      x2: horizontal ? whiskerValue : x,
      y2: horizontal ? y : whiskerValue
    };
    const minorCoordinates = {
      x1: horizontal ? whiskerValue : x - boxWidth / 2,
      y1: horizontal ? y - boxWidth / 2 : whiskerValue,
      x2: horizontal ? whiskerValue : x + boxWidth / 2,
      y2: horizontal ? y + boxWidth / 2 : whiskerValue
    };

    return {
      majorWhisker: majorCoordinates,
      minorWhisker: minorCoordinates,
      style: whiskerStyle,
      groupComponent,
      statistic: type
    };
  },

  getBoxProps(dataProps) {
    const { horizontal, x, y, median, q1, q3, boxWidth, groupComponent, style } = dataProps;

    const q1Props = {
      x: horizontal ? q1 : x - boxWidth / 2,
      y: horizontal ? y - boxWidth / 2 : median,
      width: horizontal ? median - q1 : boxWidth,
      height: horizontal ? boxWidth : q1 - median,
      groupComponent,
      style: style.q1,
      statistic: "q1"
    };

    const q3Props = {
      x: horizontal ? median : x - boxWidth / 2,
      y: horizontal ? y - boxWidth / 2 : q3,
      width: horizontal ? q3 - median : boxWidth,
      height: horizontal ? boxWidth : median - q3,
      groupComponent,
      style: style.q3,
      statistic: "q3"
    };

    return { q1Props, q3Props };
  },

  getMedianProps(dataProps) {
    const { median, x, y, boxWidth, horizontal, groupComponent, style } = dataProps;
    return {
      x1: horizontal ? median : x - boxWidth / 2,
      y1: horizontal ? y - boxWidth / 2 : median,
      x2: horizontal ? median : x + boxWidth / 2,
      y2: horizontal ? y + boxWidth / 2 : median,
      groupComponent,
      style: style.median,
      statistic: "median"
    };
  },

  getLabelProps(dataProps) {
    const { datum, x, y, min, max, q1, q3, median, boxWidth,
      horizontal, labelOrientation, style } = dataProps;
    const labelsObj = {
      minLabelProps: { datum: datum.min, value: min },
      maxLabelProps: { datum: datum.max, value: max },
      q1LabelProps: { datum: datum.q1, value: q1 },
      q3LabelProps: { datum: datum.q3, value: q3 },
      medianLabelProps: { datum: datum.median, value: median }
    };

    return mapValues(labelsObj, (labelProps, key) => {
      const labelStyle = style[replace(key, "Props", "s")] || {};
      const labelPadding = labelStyle.padding ? labelStyle.padding : 0;
      const defaultVerticalAnchor = horizontal ? "end" : "middle";
      const defaultTextAnchor = horizontal ? "middle" : "start";

      return {
        style: labelStyle,
        y: horizontal
          ? labelOrientation === "top"
            ? y - boxWidth / 2 - labelPadding
            : y + boxWidth / 2 + labelPadding
          : labelProps.value,
        x: horizontal
          ? labelProps.value
          : labelOrientation === "left"
            ? x - boxWidth / 2 - labelPadding
            : x + boxWidth / 2 + labelPadding,
        text: labelProps.datum,
        statistic: replace(key, "LabelProps", ""),
        textAnchor: labelStyle.textAnchor || defaultTextAnchor,
        verticalAnchor: labelStyle.verticalAnchor || defaultVerticalAnchor,
        angle: labelStyle.angle
      };
    });
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
  }
};
