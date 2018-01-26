/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.25, 0.5, 0.75, 1, 2] }]*/
import { assign, sortBy, keys, omit, defaults, isNaN, mapValues } from "lodash";
import { Helpers, LabelHelpers, Scale, Domain, Data } from "victory-core";
import { min, max, quantile } from "d3-array";

export default {
  getBaseProps(props, fallbackProps) {
    // TODO add a theme for boxplot
    props = Helpers.modifyProps(props, fallbackProps, "boxplot");
    const calculatedValues = this.getCalculatedValues(props);
    const { data, style, scale, domain, horizontal } = calculatedValues;
    const statistics = this.getSummaryStatistics(data, horizontal);
    const scaledStatistics = mapValues(statistics, (stat, key) => {
      if (key === "x") {
        return scale.x(stat);
      }
      if (key === "y") {
        return scale.y(stat);
      }
      return horizontal ? scale.x(stat) : scale.y(stat);
    });

    const { groupComponent, width, height, padding, standalone, theme } = props;
    const initialChildProps = {
      parent: {
        domain, scale, width, height, data, standalone, theme,
        style: style.parent, padding, groupComponent
      }
    };

    return {
      ...initialChildProps,
      ...mapValues(scaledStatistics, (stat, key) => {

        const text = LabelHelpers.getText(props, { label: key }, null);
        let labels;
        if (text !== undefined && text !== null || props.events || props.sharedEvents) {
          labels = this.getLabelProps(
            stat,
            scaledStatistics.x,
            scaledStatistics.y,
            props.boxWidth,
            text,
            style[`${key}Labels`]
          );
        }

        return {
          ...scaledStatistics,
          x1: horizontal ? stat : scaledStatistics.x - props.boxWidth / 2,
          y1: horizontal ? scaledStatistics.y - props.boxWidth / 2 : stat,
          x2: horizontal ? stat : scaledStatistics.x + props.boxWidth / 2,
          y2: horizontal ? scaledStatistics.y + props.boxWidth / 2 : stat,
          boxWidth: props.boxWidth,
          position: key === "q1" || key === "min" ? "min" : "max",
          horizontal,
          style: style[key],
          labels
        };
      })
    };
  },

  getCalculatedValues(props) {
    // determine the orientation of the data
    const horizontal = this.getDataAxis(props.data);
    const data = Data.addEventKeys(
      props,
      this.getData({ ...props, sortKey: horizontal ? "x" : "y" })
    );
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
    return { domain, horizontal, data, scale, style: props.style };
  },

  /* method to detect if the x or y coordinate is the repeat
  coordinate in the data series */
  getDataAxis(data) {
    return data.every(({ y }) => y === data[0].y);
  },

  getSummaryStatistics(data, horizontal) {
    const formattedData = data.map(({ x, y }) => horizontal ? x : y);
    const quartiles = {
      q1: quantile(formattedData, 0.25),
      q3: quantile(formattedData, 0.75),
      min: min(formattedData),
      median: quantile(formattedData, 0.5),
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
  //eslint-disable-next-line max-params
  getLabelProps(stat, x, y, boxWidth, text, style) {
    const labelStyle = style || {};
    return {
      style: labelStyle,
      y: stat,
      // eslint-disable-next-line no-magic-numbers
      x: x + boxWidth / 2 + 5,
      text,
      // index,
      // scale,
      // datum,
      // data,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "end",
      angle: labelStyle.angle
    };
  },

  getData(props) {
    if (!props.data || Data.getLength(props.data) < 1) {
      return [];
    }

    const stringMap = {
      x: Data.createStringMap(props, "x"),
      y: Data.createStringMap(props, "y")
    };

    const accessor = {
      x: Helpers.createAccessor(props.x !== undefined ? props.x : "x"),
      y: Helpers.createAccessor(props.y !== undefined ? props.y : "y")
    };

    const formattedData = props.data.reduce((dataArr, datum, index) => {
      datum = Data.parseDatum(datum);

      const evaluatedX = accessor.x(datum);
      const evaluatedY = accessor.y(datum);
      const _x = evaluatedX !== undefined ? evaluatedX : index;
      const _y = evaluatedY !== undefined ? evaluatedY : index;

      dataArr.push(
        assign(
          {},
          datum,
          { _x, _y },
          typeof _x === "string" ? { _x: stringMap.x[_x], x: _x } : {},
          typeof _y === "string" ? { _x: stringMap.y[_y], y: _y } : {}
        )
      );

      return dataArr;
    }, []);

    return this.sortData(formattedData, props.sortKey, props.sortOrder);
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
  },

  isTransparent(attr) {
    return attr === "none" || attr === "transparent";
  },

  getDataStyles(datum, style) {
    style = style || {};
    const numKeys = keys(datum).filter((k) => isNaN(k));
    const omitKeys = [
      "x", "_x", "y", "_y", "size", "name", "label", "eventKey"
    ];
    const stylesFromData = omit(datum, [...omitKeys, ...numKeys]);
    const fill = datum.fill || style.fill;
    const strokeColor = datum.stroke || style.stroke;
    const stroke = this.isTransparent(strokeColor) ? fill : strokeColor || "black";
    return defaults({}, stylesFromData, { stroke, fill }, style);
  }
};
