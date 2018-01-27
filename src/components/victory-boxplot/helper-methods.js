/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.25, 0.5, 0.75, 1, 2] }]*/
/*eslint-disable no-nested-ternary */
import { sortBy, mapValues, has } from "lodash";
import { Helpers, LabelHelpers, Scale, Domain } from "victory-core";
import { min, max, quantile } from "d3-array";

/* Todos left for this component
  – Define and integrate a theme for boxplot
  – Add support for data passed as an independent var and an array of dep vars
  i.e. data={[{ x: 1, y: [2, 3, 5] }, { x: 2, y: [3, 7, 9]}]}
*/

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "boxplot");
    const calculatedValues = this.getCalculatedValues(props);
    const { data, style, scale, domain, horizontal } = calculatedValues;
    const scaledData = mapValues(data, (datum, key) => {
      if (key === "x") {
        return scale.x(datum);
      }
      if (key === "y") {
        return scale.y(datum);
      }
      return horizontal ? scale.x(datum) : scale.y(datum);
    });

    const { groupComponent, width, height, padding, standalone, theme } = props;
    const initialChildProps = {
      parent: {
        domain, scale, width, height, scaledData, data, standalone,
        theme, style: style.parent, padding, groupComponent
      }
    };

    return {
      ...initialChildProps,
      ...mapValues(scaledData, (datum, key) => {

        const text = LabelHelpers.getText(props, { label: key }, null);
        let labels;
        if (text !== undefined && text !== null || props.events || props.sharedEvents) {
          labels = this.getLabelProps(
            { datum, labelOrientation: props.labelOrientation, data,
              scaledData, boxWidth: props.boxWidth, horizontal, scale },
            text,
            style[`${key}Labels`]
          );
        }

        return {
          ...scaledData,
          x1: horizontal ? datum : scaledData.x - props.boxWidth / 2,
          y1: horizontal ? scaledData.y - props.boxWidth / 2 : datum,
          x2: horizontal ? datum : scaledData.x + props.boxWidth / 2,
          y2: horizontal ? scaledData.y + props.boxWidth / 2 : datum,
          boxWidth: props.boxWidth,
          position: key === "q1" || key === "min" ? "min" : "max",
          horizontal,
          style: style[key],
          labels
        };
      })
    };
  },

  getData(props) {
    if (!props.data) {
      return [];
    }

    /* check if the data is coming in a pre-processed form,
    i.e. { x || y, min, max, q1, q3, med }. if not, process it. */
    let data;
    const isProcessed = this.checkProcessedData(props);
    if (!isProcessed) {
      const sortedData = this.sortData(props.data, props.horizontal);
      data = this.getSummaryStatistics(sortedData, props.horizontal);
    } else {
      data = props.data;
    }

    return { ...data };
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

  checkSingleBoxPlot(dataset, horizontal) {
    const isSingle = new Set(dataset.map(({ x, y }) => horizontal ? y : x)).size === 1;
    return isSingle;
  },

  getCalculatedValues(props) {
    const data = this.getData(props);
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
    const formattedData = data.map(({ x, y }) => horizontal ? x : y);
    const quartiles = {
      q1: quantile(formattedData, 0.25),
      q3: quantile(formattedData, 0.75),
      min: min(formattedData),
      med: quantile(formattedData, 0.5),
      max: max(formattedData)
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

  getLabelProps(dataProps, text, style) {
    const labelStyle = style || {};
    const { datum, labelOrientation, boxWidth,
      horizontal, scaledData, scale } = dataProps;
    return {
      style: labelStyle,
      y: horizontal
        ? labelOrientation === "top"
          ? scaledData.y - boxWidth / 2 - labelStyle.padding
          : scaledData.y + boxWidth / 2 + labelStyle.padding
        : datum,
      x: horizontal
        ? datum
        : labelOrientation === "left"
          ? scaledData.x - boxWidth / 2 - labelStyle.padding
          : scaledData.x + boxWidth / 2 + labelStyle.padding,
      dx: labelStyle.dx,
      dy: labelStyle.dy,
      text,
      scale,
      datum,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "end",
      angle: labelStyle.angle
    };
  },

  getDomain(props, axis) {
    let domain;
    if (props.domain && props.domain[axis]) {
      domain = props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      domain = props.domain;
    } else {
      const dataset = this.getData(props);
      const allData = dataset.reduce((memo, datum) => {
        return Array.isArray(datum[`_${axis}`]) ?
          memo.concat(...datum[`_${axis}`]) : memo.concat(datum[`_${axis}`]);
      },
      []);

      if (allData.length < 1) {
        return Scale.getBaseScale(props, axis).domain();
      }

      const minData = Math.min(...allData);
      const maxData = Math.max(...allData);
      if (+min === +max) {
        return Domain.getSinglePointDomain(max);
      }
      domain = [minData, maxData];
    }
    return Domain.cleanDomain(Domain.padDomain(domain, props, axis), props);
  }
};
