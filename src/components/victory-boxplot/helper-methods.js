/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.25, 0.5, 0.75, 1, 2] }]*/
/*eslint-disable no-nested-ternary */
import { sortBy, has, mapValues, replace, assign } from "lodash";
import { Helpers, Scale, Domain, Data } from "victory-core";
import { min as d3Min, max as d3Max, quantile as d3Quantile } from "d3-array";

/* Todos left for this component
  – Define and integrate a theme for boxplot
  – Create a better strategy for the horizontal prop rather than having
  the ternary operator littered all over the place
  – Integrate LabelHelpers getText method properly
  – Create a string map to parse data passed as string to numeric
  – Verify that events are being properly attached
*/

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "boxplot");
    const calculatedValues = this.getCalculatedValues(props);
    const { data, style, scale, domain, horizontal } = calculatedValues;
    const { groupComponent, width, height, padding, standalone,
      theme, boxWidth, whiskerStyle, labelOrientation } = props;
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
      const min = horizontal ? scale.x(datum._min) : scale.y(datum._min);
      const max = horizontal ? scale.x(datum._max) : scale.y(datum._max);
      const q1 = horizontal ? scale.x(datum._q1) : scale.y(datum._q1);
      const q3 = horizontal ? scale.x(datum._q3) : scale.y(datum._q3);
      const med = horizontal ? scale.x(datum._med) : scale.y(datum._med);
      const dataProps = { datum, x, y, min, max, q1, q3, med, horizontal,
        boxWidth, whiskerStyle, groupComponent, style, labelOrientation };
      const { minProps, maxProps } = this.getWhiskerProps(dataProps);
      const { q1Props, q3Props } = this.getBoxProps(dataProps);
      const { medProps } = this.getMedProps(dataProps);
      const { minLabelProps, maxLabelProps, q1LabelProps,
        q3LabelProps, medLabelProps } = this.getLabelProps(dataProps);

      acc[eventKey] = {
        data: {
          minProps,
          maxProps,
          q1Props,
          q3Props,
          medProps
        },
        labels: {
          minLabelProps,
          maxLabelProps,
          q1LabelProps,
          q3LabelProps,
          medLabelProps
        }
      };
      return acc;
    }, initialChildProps);
  },

  getData(props) {
    if (!props.data || Data.getLength(props.data) < 1) {
      return [];
    }

    const data = this.processData(props);

    // TODO create a string map to map string data to numeric data

    const accessor = {
      x: Helpers.createAccessor("x"),
      y: Helpers.createAccessor("y"),
      min: Helpers.createAccessor("min"),
      max: Helpers.createAccessor("max"),
      q1: Helpers.createAccessor("q1"),
      q3: Helpers.createAccessor("q3"),
      med: Helpers.createAccessor("med")
    };

    const formattedData = data.reduce((dataArr, datum) => {
      datum = Data.parseDatum(datum);

      const _x = accessor.x(datum);
      const _y = accessor.y(datum);
      const _min = accessor.min(datum);
      const _max = accessor.max(datum);
      const _q1 = accessor.q1(datum);
      const _q3 = accessor.q3(datum);
      const _med = accessor.med(datum);

      dataArr.push(
        assign(
          {},
          datum,
          { _x, _y, _min, _max, _q1, _q3, _med }
        )
      );

      return dataArr;
    }, []);

    return formattedData;
  },

  processData(props) {

    /* check if the data is coming in a pre-processed form,
    i.e. { x || y, min, max, q1, q3, med }. if not, process it. */
    let data;
    const isProcessed = this.checkProcessedData(props);
    if (!isProcessed) {

      // check if the data is coming with x or y values as an array
      const depedenentVarAsArray = this.checkDependentVariableAsArray(props);

      if (depedenentVarAsArray) {
        /* generate summary statistics for each datum. to do this, flatten
        the depedentVarArray and process each datum separately */
        data = props.data.map((datum) => {
          const flattenedDatum = props.horizontal
            ? datum.x.map((xVal) => ({ x: xVal, y: datum.y }))
            : datum.y.map((yVal) => ({ x: datum.x, y: yVal }));
          const sortedData = this.sortData(flattenedDatum, props.horizontal);
          return this.getSummaryStatistics(sortedData, props.horizontal);
        });
      } else {
        const sortedData = this.sortData(props.data, props.horizontal);
        data = [this.getSummaryStatistics(sortedData, props.horizontal)];
      }
    } else {
      data = props.data;
    }

    return data;
  },

  checkProcessedData(props) {
    /* check if the data is pre-processed. start by checking that it has
    all required quartile attributes. */
    const hasQuartiles = this.checkQuartileAttributes(props);

    if (hasQuartiles) {
      // check that the indepedent variable is distinct
      const hasDistinctIndependentVariable = this.checkHasDistinctIndependentVariable(props);
      if (!hasDistinctIndependentVariable) {
        throw new Error(`
          data prop may only take an array of objects with a unique 
          independent variable. Make sure your x or y values are distinct.
        `);
      }
      return true;
    }
    return false;
  },

  checkQuartileAttributes(props) {
    return props.data.every((datum) => {
      const hasQuartiles = has(datum, "min") && has(datum, "max")
        && has(datum, "q1") && has(datum, "q3") && has(datum, "med");
      return hasQuartiles;
    });
  },

  checkHasDistinctIndependentVariable(props) {
    const values = props.data.map(({ x, y }) => props.horizontal ? y : x);
    return (new Set(values)).size === values.length;
  },

  checkDependentVariableAsArray(props) {
    return props.data.every((datum) => {
      return props.horizontal ? Array.isArray(datum.x) : Array.isArray(datum.y);
    });
  },

  getCalculatedValues(props) {
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
    return { domain, horizontal: props.horizontal, data, scale, style: props.style };
  },

  sortData(dataset, horizontal) {
    const sortKey = horizontal ? "x" : "y";
    return sortBy(dataset, sortKey);
  },

  getSummaryStatistics(data, horizontal) {
    const dependentVars = data.map(({ x, y }) => horizontal ? x : y);
    const quartiles = {
      q1: d3Quantile(dependentVars, 0.25),
      q3: d3Quantile(dependentVars, 0.75),
      min: d3Min(dependentVars),
      med: d3Quantile(dependentVars, 0.5),
      max: d3Max(dependentVars)
    };

    if (horizontal) {
      return {
        ...quartiles,
        y: data[0].y
      };
    } else {
      return {
        ...quartiles,
        x: data[0].x
      };
    }
  },

  // try to find a way to simplify this rather than disable es-lint
  getWhiskerProps(dataProps) {
    // eslint-disable-next-line no-shadow
    const { horizontal, x, y, min, max, q1, q3, style,
      boxWidth, whiskerStyle: { whiskerWidth, whiskerStroke }, groupComponent } = dataProps;

    const minProps = {
      majorWhisker: {
        x1: horizontal ? min : x,
        y1: horizontal ? y : min,
        x2: horizontal ? q1 : x,
        y2: horizontal ? y : q1,
        strokeWidth: whiskerWidth,
        stroke: whiskerStroke
      },
      minorWhisker: {
        x1: horizontal ? min : x - boxWidth / 2,
        y1: horizontal ? y - boxWidth / 2 : min,
        x2: horizontal ? min : x + boxWidth / 2,
        y2: horizontal ? y + boxWidth / 2 : min,
        strokeWidth: whiskerWidth,
        stroke: whiskerStroke
      },
      style: style.min,
      groupComponent,
      statistic: "min"
    };

    const maxProps = {
      majorWhisker: {
        x1: horizontal ? q3 : x,
        y1: horizontal ? y : q3,
        x2: horizontal ? max : x,
        y2: horizontal ? y : max,
        strokeWidth: whiskerWidth,
        stroke: whiskerStroke
      },
      minorWhisker: {
        x1: horizontal ? max : x - boxWidth / 2,
        y1: horizontal ? y - boxWidth / 2 : max,
        x2: horizontal ? max : x + boxWidth / 2,
        y2: horizontal ? y + boxWidth / 2 : max,
        strokeWidth: whiskerWidth,
        stroke: whiskerStroke
      },
      style: style.max,
      groupComponent,
      statistic: "max"
    };

    return { minProps, maxProps };
  },

  getBoxProps(dataProps) {

    const { horizontal, x, y, med, q1, q3, boxWidth, groupComponent, style } = dataProps;

    const q1Props = {
      x: horizontal ? q1 : x - boxWidth / 2,
      y: horizontal ? y - boxWidth / 2 : med,
      width: horizontal ? med - q1 : boxWidth,
      height: horizontal ? boxWidth : q1 - med,
      groupComponent,
      style: style.q1,
      statistic: "q1"
    };

    const q3Props = {
      x: horizontal ? med : x - boxWidth / 2,
      y: horizontal ? y - boxWidth / 2 : q3,
      width: horizontal ? q3 - med : boxWidth,
      height: horizontal ? boxWidth : med - q3,
      groupComponent,
      style: style.q3,
      statistic: "q3"
    };

    return { q1Props, q3Props };
  },

  getMedProps(dataProps) {

    const { med, x, y, boxWidth, horizontal, groupComponent, style } = dataProps;

    const medProps = {
      x1: horizontal ? med : x - boxWidth / 2,
      y1: horizontal ? y - boxWidth / 2 : med,
      x2: horizontal ? med : x + boxWidth / 2,
      y2: horizontal ? y + boxWidth / 2 : med,
      groupComponent,
      style: style.med,
      statistic: "med"
    };

    return { medProps };
  },

  getLabelProps(dataProps) {
    const { datum, x, y, min, max, q1, q3, med, boxWidth,
      horizontal, labelOrientation, style } = dataProps;
    const labelsObj = {
      minLabelProps: { datum: datum.min, value: min },
      maxLabelProps: { datum: datum.max, value: max },
      q1LabelProps: { datum: datum.q1, value: q1 },
      q3LabelProps: { datum: datum.q3, value: q3 },
      medLabelProps: { datum: datum.med, value: med }
    };

    return mapValues(labelsObj, (labelProps, key) => {
      const labelStyle = style[replace(key, "Props", "s")] || {};
      const labelPadding = labelStyle.padding ? labelStyle.padding : 0;
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
        dx: labelStyle.dx,
        dy: labelStyle.dy,
        text: labelProps.datum,
        statistic: replace(key, "LabelProps", ""),
        textAnchor: labelStyle.textAnchor || "start",
        verticalAnchor: labelStyle.verticalAnchor || "end",
        angle: labelStyle.angle
      };
    });
  },

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
