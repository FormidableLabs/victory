import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";
import log from "../log";
import Util from "../util";
import {VictoryLine} from "victory-line";
import {VictoryAxis} from "victory-axis";
import {VictoryScatter} from "victory-scatter";
import {VictoryBar} from "victory-bar";

const styles = {
  parent: {
    width: 500,
    height: 300,
    margin: 50
  },
  axis: {
    axis: {
      stroke: "#756f6a",
      fill: "#756f6a",
      strokeWidth: 2,
      strokeLinecap: "round"
    },
    grid: {
      stroke: "#c9c5bb",
      fill: "none",
      strokeWidth: 0,
      strokeLinecap: "round"
    },
    ticks: {
      stroke: "#756f6a",
      fill: "#756f6a",
      strokeWidth: 2,
      strokeLinecap: "round",
      size: 4,
      padding: 5
    },
    axisLabels: {
      stroke: "transparent",
      fill: "#756f6a",
      fontSize: 16,
      fontFamily: "Helvetica"
    },
    tickLabels: {
      stroke: "transparent",
      fill: "#756f6a",
      fontFamily: "Helvetica",
      fontSize: 10,
      padding: 5
    }
  },
  line: {
    data: {
      strokeWidth: 2,
      fill: "none",
      stroke: "#756f6a",
      opacity: 1
    },
    labels: {
      padding: 5,
      fontFamily: "Helvetica",
      fontSize: 10,
      strokeWidth: 0,
      stroke: "transparent",
      textAnchor: "start"
    }
  },
  scatter: {
    data: {
      fill: "#756f6a",
      opacity: 1,
      stroke: "transparent",
      strokeWidth: 0
    },
    labels: {
      stroke: "transparent",
      strokeWidth: 0,
      fill: "#756f6a",
      fontFamily: "Helvetica",
      fontSize: 10,
      textAnchor: "middle"
    }
  },
  bar: {
    data: {
      width: 8,
      padding: 6,
      stroke: "transparent",
      strokeWidth: 0,
      fill: "#756f6a",
      opacity: 1
    },
    labels: {
      padding: 5,
      fontFamily: "Helvetica",
      fontSize: 10,
      strokeWidth: 0,
      stroke: "transparent",
      textAnchor: "middle"
    }
  }
};

@Radium
export default class VictoryChart extends React.Component {
  static propTypes = {
    /**
     * The chartType prop specifies how data should be plotted.
     */
    chartType: React.PropTypes.oneOf([
      "line",
      "scatter",
      "bar",
      "stackedBar"
    ]),
    /**
     * The data prop specifies the data to be plotted. Data should be in the form of an array
     * of data points, or an array of arrays of data points for multiple datasets.
     * Each data point should be an object with x and y properties. Other properties may
     * be added to the data point object, such as label, color, size, symbol or opacity.
     * These properties will be interpreted and applied to the individual data point
     * in chart types that support them.
     * @exampes [
     *   {x: new Date(1982, 1, 1), y: 125, color: "red", symbol: "plus"},
     *   {x: new Date(1987, 1, 1), y: 257, color: "blue", symbol: "star"},
     *   {x: new Date(1993, 1, 1), y: 345, color: "green", symbol: "circle"},
     * ],
     * [
     *   [{x: 5, y: 3}, {x: 4, y: 2}, {x: 3, y: 1}],
     *   [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}],
     *   [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]
     * ]
     */
    data: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(
        React.PropTypes.shape({
          x: React.PropTypes.any,
          y: React.PropTypes.any
        })
      ),
      React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(
          React.PropTypes.shape({
            x: React.PropTypes.any,
            y: React.PropTypes.any
          })
        )
      )
    ]),
    /**
     * The dataAttributes prop describes how a data set should be plotted and styled.
     * This prop can be given as an object, or an array of objects. If this prop is
     * given as an array of objects, the properties of each object in the array will
     * be applied to the data points in the corresponding array of the data prop.
     * @exampes {type: "scatter", symbol: "square", color: "blue"},
     * [{type: "line", stroke: "green", width: 3}, {type: "bar", color: "orange"}]
     */
    dataAttributes: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.arrayOf(React.PropTypes.object)
    ]),
    /**
     * The x props provides another way to supply data for chart to plot. This prop can be given
     * as an array of values or an array of arrays, and it will be plotted against whatever
     * y prop is provided. If no props are provided for y, the values in x will be plotted
     * as the identity function (x) => x.
     * @examples ["apples", "oranges", "bananas"], [[1, 2, 3], [2, 3, 4], [4, 5, 6]]
     */
    x: React.PropTypes.array,
    /**
     * The y props provides another way to supply data for chart to plot. This prop can be given
     * as a function of x, or an array of values, or an array of functions and / or values.
     * if x props are given, they will be used in plotting (x, y) data points. If x props are not
     * provided, a set of x values evenly spaced across the x domain will be calculated, and used
     * for plotting data points.
     * @examples (x) => x + 5, [1, 2, 3], [(x) => x, [2, 3, 4], (x) => Math.sin(x)]
     */
    y: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]),
    /**
     * The yAttributes prop describes how a data set should be plotted and styled.
     * This prop behaves identically to the dataAttributes prop, but is applied to
     * any data provided via the y prop
     * @exampes {type: "scatter", symbol: "square", color: "blue"},
     * [{type: "line", stroke: "green", width: 3}, {type: "bar", color: "orange"}]
     */
    yAttributes: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.arrayOf(React.PropTypes.object)
    ]),
    /**
     * The samples prop specifies how many individual points to plot when plotting
     * y as a function of x. Samples is ignored if x props are provided instead.
     */
    samples: React.PropTypes.number,
    /**
     * The interpolation prop determines how data points should be connected
     * when plotting a line
     */
    interpolation: React.PropTypes.oneOf([
      "linear",
      "linear-closed",
      "step",
      "step-before",
      "step-after",
      "basis",
      "basis-open",
      "basis-closed",
      "bundle",
      "cardinal",
      "cardinal-open",
      "cardinal-closed",
      "monotone"
    ]),
    /**
     * The scale prop determines which scales your chart should use. This prop can be
     * given as a function, or as an object that specifies separate functions for x and y.
     * @exampes d3.time.scale(), {x: d3.scale.linear(), y: d3.scale.log()}
     */
    scale: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.shape({
        x: React.PropTypes.func,
        y: React.PropTypes.func
      })
    ]),
    /**
     * The domain prop describes the range of values your chart will include. This prop can be
     * given as a array of the minimum and maximum expected values for your chart,
     * or as an object that specifies separate arrays for x and y.
     * If this prop is not provided, a domain will be calculated from data, or other
     * available information.
     * @exampes [-1, 1], {x: [0, 100], y: [0, 1]}
     */
    domain: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.shape({
        x: React.PropTypes.array,
        y: React.PropTypes.array
      })
    ]),
    /**
     * The range prop describes the range of pixels your chart will cover. This prop can be
     * given as a array of the minimum and maximum expected values for your chart,
     * or as an object that specifies separate arrays for x and y.
     * If this prop is not provided, a range will be calculated based on the height,
     * width, and margin provided in the style prop, or in default styles. It is usually
     * a good idea to let the chart component calculate its own range.
     * @exampes [0, 500], {x: [0, 500], y: [500, 300]}
     */
    range: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.shape({
        x: React.PropTypes.arrayOf(React.PropTypes.number),
        y: React.PropTypes.arrayOf(React.PropTypes.number)
      })
    ]),
    /**
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryChart with other components within an enclosing <svg> tag.
     */
    standalone: React.PropTypes.bool,
    /**
     * The style prop specifies styles for your chart. Victory Chart relies on Radium,
     * so valid Radium style objects should work for this prop, however height, width, and margin
     * are used to calculate range, and need to be expressed as a number of pixels
     * @examples {width: 500, height: 300, axis: {x: {...}, y: {...}},
     * line: {data: {...}, labels: {...}}, scatter: {...}, bar: {...}}
     */
    style: React.PropTypes.object,
    /**
     * The axisLabels prop specifies the labels for your axes. It should be given as
     * an object with x and y properties.
     * @examples {x: "years", y: "cats"}
     */
    axisLabels: React.PropTypes.object,
    /**
     * The axisOrientation prop specifies the layout of your axes. It should be given as
     * an object with x and y properties. Currently, Victory Chart only suppotys vertical y axes
     * and horizontal x axes
     * @examples {x: "bottom", y: "right"}
     */
    axisOrientation: React.PropTypes.shape({
      x: React.PropTypes.oneOf(["top", "bottom"]),
      y: React.PropTypes.oneOf(["left", "right"])
    }),
    /**
     * The tickValues prop explicity specifies which ticks values to draw on each axis.
     * This prop should be given as an object with arrays specified for x and y
     * @examples {x: ["apples", "bananas", "oranges"] y: [2, 4, 6, 8]}
     */
    tickValues: React.PropTypes.shape({
      x: React.PropTypes.arrayOf(React.PropTypes.any),
      y: React.PropTypes.arrayOf(React.PropTypes.any)
    }),
    /**
     * The tickFormat prop specifies how tick values should be expressed visually.
     * This prop should be given as an object with functions or arrays of display
     * values specified for x and y
     * @examples {x: d3.time.format("%Y"), y: (x) => x.toPrecision(2)}, {
     * x: ["dogs", "cats", "birds"]}
     */
    tickFormat: React.PropTypes.shape({
      x: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.array]),
      y: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.array])
    }),
    /**
     * The tickCount prop specifies how many ticks should be drawn on each axis if
     * ticksValues are not explicitly provided. This prop shouls be given as an object
     * with numbers specified for x and y
     * @examples {x: 7, y: 5}
     */
    tickCount: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    }),
    /**
     * The domainPadding prop specifies a number of pixels of padding to add to the
     * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
     * from the origin to prevent crowding. This prop should be given as an object with
     * numbers specified for x and y.
     */
    domainPadding: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    }),
    /**
     * The categories prop specifies the categories for a bar chart. This prop should
     * be given as an array of string values, numeric values, or arrays. When this prop is
     * given as an array of arrays, the minimum and maximum values of the arrays define range bands,
     * allowing numeric data to be grouped into segments.
     * @examples ["dogs", "cats", "mice"], [[0, 5], [5, 10], [10, 15]]
     */
    categories: React.PropTypes.array,
    /**
     * The categories prop specifies category labels for a bar chart. This prop should be
     * given as an array of values. The number of elements in the label array should be
     * equal to number of elements in the categories array, or if categories is not defined,
     * to the number of unique x values in your data. Use this prop to add labels to
     * stacked bars and groups of bars. Adding labels to individual bars can be accomplished
     * by adding a label property directly to the data object.
     * @examples: ["spring", "summer", "fall", "winter"]
     */
    categoryLabels: React.PropTypes.array,
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the chart will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {line: {delay: 5, velocity: 10, onEnd: () => alert("woo!")}}
     */
    animate: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.shape({
        line: React.PropTypes.object,
        scatter: React.PropTypes.object,
        axis: React.PropTypes.object,
        bar: React.PropTypes.object
      })
    ])
  };

  static defaultProps = {
    chartType: "line",
    interpolation: "linear",
    scale: d3.scale.linear(),
    axisOrientation: {
      x: "bottom",
      y: "left"
    },
    tickCount: {
      x: 7,
      y: 5
    },
    standalone: true
  };

  constructor(props) {
    super(props);
    // warn about bad data
    this.validateData(props);
    // provide default data for the component to render
    this.defaultData = (x) => x;
    this.getCalculatedValues(props);
  }

  componentWillReceiveProps(nextProps) {
    // warn about bad data
    this.validateData(nextProps);
    this.getCalculatedValues(nextProps);
  }

  getStyles(props) {
    if (!props.style) {
      return styles;
    }
    const {axis, line, scatter, bar, parent} = props.style;
    return {
      parent: _.merge({}, styles.parent, parent),
      axis: {
        x: _.merge({}, styles.axis, (axis && axis.x)),
        y: _.merge({}, styles.axis, (axis && axis.y))
      },
      line: _.merge({}, styles.line, line),
      scatter: _.merge({}, styles.scatter, scatter),
      bar: _.merge({}, styles.bar, bar)
    };
  }

  validateData(props) {
    const axes = ["x", "y"];
    _.each(axes, (axis) => {
      // check for mixed string and numeric data
      const data = props.data ? _.pluck(_.flatten(props.data), axis) : [];
      const typeData = props[axis] && _.isArray(props[axis]) ?
        _.flatten(_.map(props[axis], (element) => {
          return _.isFunction(element) ? [] : element;
        })) : [];
      const allData = data.concat(typeData);
      if (Util.containsStrings(allData) && !Util.containsOnlyStrings(allData)) {
        log.warn("Don't mix string data with numeric data on the same axis!");
      }
      // check for mixed bar and stackedBar chart types
      const dataTypes = this.props.dataAttributes ?
        _.pluck(_.flatten(this.props.dataAttributes), "type") : [];
      const yTypes = this.props.yAttributes ?
        _.pluck(_.flatten(this.props.yAttributes), "type") : [];
      const globalType = this.props.chartType || [];
      const types = dataTypes.concat(yTypes, globalType);
      if (_.includes(types, "bar") && _.includes(types, "stackedBar")) {
        log.warn("Don't mix bar with stackedBar in the same chart!");
      }
    });
  }

  getCalculatedValues(props) {
    this.style = this.getStyles(props);
    this.range = {
      x: this.getRange(props, "x"),
      y: this.getRange(props, "y")
    };
    this.stringMap = {
      x: this.createStringMap(props, "x"),
      y: this.createStringMap(props, "y")
    };
    this.datasets = this.consolidateData(props);
    this.stackedData = this.getStackedData(props);
    this.domain = {
      x: this.getDomain(props, "x"),
      y: this.getDomain(props, "y")
    };
    this.scale = {
      x: this.getScale(props, "x"),
      y: this.getScale(props, "y")
    };
    this.tickValues = {
      x: this.getTickValues(props, "x"),
      y: this.getTickValues(props, "y")
    };
    this.tickFormat = {
      x: this.getTickFormat(props, "x"),
      y: this.getTickFormat(props, "y")
    };
    this.axisOffset = this.getAxisOffset(props);
  }

  createStringMap(props, axis) {
    // if tick values exist and are strings, create a map using only those strings
    // dont alter the order.
    const tickValues = props.tickValues && props.tickValues[axis];
    if (tickValues && Util.containsStrings(tickValues)) {
      return _.zipObject(_.map(props.tickValues[axis], (tick, index) => {
        return ["" + tick, index + 1];
      }));
    }

    // if categories exist and are strings, create a map from those strings
    if (props.categories && Util.containsStrings(props.categories)) {
      return _.zipObject(_.map(props.categories, (category, index) => {
        return ["" + category, index + 1];
      }));
    }

    // otherwise, collect strings from data sources
    const allStrings = [];
    // collect strings from props.data
    if (props.data) {
      const data = _.isArray(props.data) ? _.flatten(props.data) : props.data;
      const stringData = _.chain(data)
        .pluck(axis)
        .map((datum) => {
          return _.isString(datum) ? datum : null;
        })
        .value();
      allStrings.push(stringData);
    }
    // collect strings from props x or props y
    if (props[axis] && _.isArray(props[axis])) {
      _.each(_.flatten(props[axis]), (element) => {
        if (_.isString(element)) {
          allStrings.push(element);
        }
      });
    }
    // create a unique, sorted set of strings
    const uniqueStrings = _.chain(allStrings)
      .flatten()
      .compact()
      .uniq()
      .sort()
      .value();

    return _.isEmpty(uniqueStrings) ?
      null :
      _.zipObject(_.map(uniqueStrings, (string, index) => {
        return [string, index + 1];
      }));
  }

  consolidateData(props) {
    // build all of the types of data into one consistent dataset for easy plotting
    // data can exist as props.data, this.props.x, and this.props.y
    const datasets = [];
    // if no data is passed in, plot a straight line
    const yData = (!props.data && !props.y) ? this.defaultData : props.y;
    // if y is given, construct data for all y, and add it to the dataset
    if (yData) {
      const dataArrays = this.generateDataFromXY(props);
      let attributes;
      _.each(dataArrays, (dataArray, index) => {
        attributes = this._getAttributes(props, "y", index);
        datasets.push(this._formatDataset(dataArray, attributes));
      });
    }
    // if data is given in props.data, add it to the cosolidated datasets
    if (props.data) {
      const dataFromProps = _.isArray(props.data[0]) ? props.data : [props.data];
      let attributes;
      _.each(dataFromProps, (dataset, index) => {
        attributes = this._getAttributes(props, "data", index);
        datasets.push(this._formatDataset(dataset, attributes));
      });
    }
    return _.map(datasets, (dataset, index) => {
      return _.merge({index}, dataset);
    });
  }

  _formatDataset(dataset, attributes) {
    return {
      attrs: attributes,
      data: _.map(dataset, (data) => {
        return _.merge(data, {
          // map string data to numeric values, and add names
          x: _.isString(data.x) ? this.stringMap.x[data.x] : data.x,
          xName: _.isString(data.x) ? data.x : undefined,
          y: _.isString(data.y) ? this.stringMap.y[data.y] : data.y,
          yName: _.isString(data.y) ? data.y : undefined
        });
      })
    };
  }

  // https://github.com/FormidableLabs/victory-chart/issues/5
  // helper for consolidateData
  _getAttributes(props, type, index) {
    // type is y or data
    const source = type + "Attributes";
    const attributes = props[source] && props[source][index] ?
      props[source][index] : props[source];
    const requiredAttributes = {
      name: attributes && attributes.name ? attributes.name : type + "-" + index,
      type: attributes && attributes.type ? attributes.type : props.chartType
    };
    return _.merge(requiredAttributes, attributes);
  }

  generateXFromDomain(props) {
    //create an array of values evenly spaced across the x domain

    // Determine how to calculate the domain:
    // domain based on props.domain if it is given
    const domainFromProps = (props.domain && props.domain.x) ?
      props.domain.x : props.domain;

    // domain based on tickValues if they are given
    const domainFromTicks = (props.tickValues && props.tickValues.x) ?
      this._getDomainFromTickValues(props, "x") : undefined;

    // domain based on props.data if it is given
    const domainFromData = props.data ?
      this._getDomainFromDataProps(props) : undefined;

    // domain based on props.scale
    // note: props.scale will never be undefined thanks to default props
    const domainFromScale = props.scale.x ?
      props.scale.x.domain() : props.scale.domain();

    // determine which domain to use in order of preference
    const domain = domainFromProps || domainFromTicks || domainFromData || domainFromScale;
    const paddedDomain = (domainFromProps || domainFromTicks) ?
      domain : this._padDomain(props, domain, "x");
    const samples = this._getNumSamples(props);
    const step = (_.max(paddedDomain) - _.min(paddedDomain)) / samples;
    // return an array of an array of x values spaced scross the domain,
    // include the maximum of the domain
    return [_.union(_.range(_.min(paddedDomain),
      _.max(paddedDomain), step),
      [_.max(paddedDomain)]
    )];
  }

  // helper for generateXFromDomain
  _getDomainFromDataProps(props) {
    const xData = _.pluck(_.flatten(props.data), "x");
    if (Util.containsStrings(xData)) {
      const data = _.values(this.stringMap.x);
      return [_.min(data), _.max(data)];
    }
    return [_.min(xData), _.max(xData)];
  }

  // helper for generateXFromDomain
  _getNumSamples(props) {
    // if props.samples is defined, return it:
    if (props.samples) {
      return props.samples;
    }
    // if y props exist and have some sensible length, return that length
    const yArray = _.isArray(props.y) ? props.y : undefined;
    if (yArray && !_.isArray(yArray[0]) && !_.isFunction(yArray[0])) {
      return yArray.length;
    } else if (yArray) {
      const arrayLengths = _.map(yArray, (element) => {
        return _.isArray(element) ? element.length : 0;
      });
      const max = _.max(arrayLengths.concat(0));
      // return a default length of 50 if the number of samples would otherwise
      // be 1 or fewer
      return max > 1 ? max : 50;
    }
  }

  generateDataFromXY(props) {
    // Always return an array of arrays of {x, y} datasets
    // determine possible values of an x array:
    const xFromProps = (props.x && _.isNumber(props.x[0])) ? [props.x] : props.x;
    const xFromDomain = this.generateXFromDomain(props);
    const xArrays = xFromProps || xFromDomain;
    let xArray;
    let n;

    // determine y
    const y = (!props.data && !props.y) ? this.defaultData : props.y;
    if (_.isFunction(y)) {
      // if y is a function, apply it to each element in each x array
      return _.map(xArrays, (xArr) => {
        return _.map(xArr, (x) => {
          return {x, y: y(x)};
        });
      });
    } else if (_.isNumber(y[0])) {
      // if y is an array of numbers, create an object with the first xArray

      xArray = xArrays[0];
      n = _.min([xArray.length, y.length]);
      return [_.map(_.take(xArray, n), (x, index) => {
        return { x, y: y[index]};
      })];
    } else {
      // if y is an array of arrays and/or functions return the arrays,
      // and return the result of applying the functions to corresponding x arrays
      return _.map(y, (yElement, index) => {
        if (_.isArray(yElement)) {
          xArray = xArrays[index] || xArrays[0];
          n = _.min([xArray.length, yElement.length]);
          return _.map(_.take(xArray, n), (x, i) => {
            return {x, y: yElement[i]};
          });
        } else {
          xArray = xArrays[index] || xArrays[0];
          return _.map(xArray, (x) => {
            return {x, y: yElement(x)};
          });
        }
      });
    }
  }

  getStackedData() {
    const stackedTypes = ["stackedBar"];
    const stackedData = _.filter(this.datasets, (dataset) => {
      return _.includes(stackedTypes, dataset.attrs.type) ? dataset : null;
    });
    return _.isEmpty(stackedData) ? undefined : stackedData;
  }

  getDomain(props, axis) {
    let domain;
    if (props.domain) {
      domain = props.domain[axis] || props.domain;
    } else if (props.tickValues && props.tickValues[axis]) {
      domain = this._getDomainFromTickValues(props, axis);
    } else if (props.categories && axis === "x") {
      domain = this._getDomainFromCategories(props);
    } else {
      domain = this._getDomainFromData(props, axis);
    }
    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = axis === "x" ? "y" : "x";
    const orientation = props.axisOrientation[otherAxis];
    return orientation === "bottom" || orientation === "left" ?
      domain : domain.concat().reverse();
  }

  _padDomain(props, domain, axis) {
    // don't pad non-numeric domains
    if (_.some(domain, (element) => !_.isNumber(element))) {
      return domain;
    } else if (!props.domainPadding || props.domainPadding[axis] === 0) {
      return domain;
    }
    const min = _.min(domain);
    const max = _.max(domain);
    const rangeExtent = Math.abs(_.max(this.range[axis]) - _.min(this.range[axis]));
    const extent = Math.abs(max - min);
    const percentPadding = props.domainPadding ? props.domainPadding[axis] / rangeExtent : 0;
    const padding = extent * percentPadding;
    const adjustedMin = min === 0 ? min : min - padding;
    const adjustedMax = max === 0 ? max : max + padding;
    return [adjustedMin, adjustedMax];
  }

  // helper method for getDomain
  _getDomainFromTickValues(props, axis) {
    const ticks = props.tickValues[axis];
    const data = Util.containsStrings(ticks) ?
      _.map(ticks, (tick) => this.stringMap[axis][tick]) : ticks;
    const domain = [_.min(data), _.max(data)];
    // dont pad the domain twice!
    // return (axis === "x" && props.y && !props.x) ? domain :
    return this._padDomain(props, domain, axis);
  }

  _getDomainFromCategories(props) {
    const categories = _.flatten(props.categories);
    if (Util.containsStrings(categories)) {
      return undefined;
    }
    return this._padDomain(props, [_.min(categories), _.max(categories)], "x");
  }

  // helper method for getDomain
  _getDomainFromData(props, axis) {
    let domain;
    // if a sensible string map exists, return the minimum and maximum values
    if (this.stringMap[axis] !== null) {
      const mapValues = _.values(this.stringMap[axis]);
      domain = [_.min(mapValues), _.max(mapValues)];
    } else {
      // find the global min and max
      const allData = _.flatten(_.pluck(this.datasets, "data"));
      const min = _.min(_.pluck(allData, axis));
      const max = _.max(_.pluck(allData, axis));
      // find the cumulative max for stacked chart types
      // this is only sensible for the y domain
      const cumulativeMax = (this.stackedData && axis === "y") ?
        _.reduce(this.stackedData, (memo, dataset) => {
          const localMax = (_.max(_.pluck(dataset.data, "y")));
          return localMax > 0 ? memo + localMax : memo;
        }, 0) : -Infinity;
      const cumulativeMin = (this.stackedData && axis === "y") ?
        _.reduce(this.stackedData, (memo, dataset) => {
          const localMin = (_.min(_.pluck(dataset.data, "y")));
          return localMin < 0 ? memo + localMin : memo;
        }, 0) : Infinity;
      domain = [_.min([min, cumulativeMin]), _.max([max, cumulativeMax])];
    }
    // dont pad the domain twice
    return (axis === "x" && props.y && !props.x) ? domain :
      this._padDomain(props, domain, axis);
  }

  getRange(props, axis) {
    if (props.range) {
      return props.range[axis] ? props.range[axis] : props.range;
    }
    // if the range is not given in props, calculate it from width, height and margin
    const style = this.style.parent;
    return axis === "x" ?
      [style.margin, style.width - style.margin] :
      [style.height - style.margin, style.margin];
  }

  getScale(props, axis) {
    const scale = props.scale[axis] ? props.scale[axis].copy() :
      props.scale.copy();
    const range = this.range[axis];
    const domain = this.domain[axis];
    scale.range(range);
    scale.domain(domain);
    // hacky check for identity scale
    if (_.difference(scale.range(), range).length !== 0) {
      // Warn identity scale, reset the domain and range
      log.warn("This scale is not supported");
    }
    return scale;
  }

  getAxisOffset(props) {
    // make the axes line up, and cross when appropriate
    const origin = {
      x: _.max([_.min(this.domain.x), 0]),
      y: _.max([_.min(this.domain.y), 0])
    };
    const orientationOffset = {
      x: props.axisOrientation.y === "left" ? 0 : this.style.parent.width,
      y: props.axisOrientation.x === "bottom" ? this.style.parent.height : 0
    };
    return {
      x: Math.abs(orientationOffset.x - this.scale.x.call(this, origin.x)),
      y: Math.abs(orientationOffset.y - this.scale.y.call(this, origin.y))
    };
  }

  getTickValues(props, axis) {
    // if tickValues are defined in props, and dont contain strings, just return them
    const ticks = props.tickValues && props.tickValues[axis];
    if (ticks && !Util.containsStrings(ticks)) {
      return ticks;
    } else if (this.stringMap[axis] !== null) {
      // return the values from the string map
      return (ticks) ?
        _.map(ticks, (tick) => this.stringMap[axis][tick]) :
        _.values(this.stringMap[axis]);
    } else if (axis === "x" && props.categories && !Util.containsStrings(props.categories)) {
      // return tick values based on the bar categories
      return _.isArray(props.categories[0]) ?
        _.map(props.categories, (arr) => (_.sum(arr) / arr.length)) : props.categories;
    } else {
      // let axis determine it's own ticks
      return undefined;
    }
  }

  getTickFormat(props, axis) {
    const tickFormat = props.tickFormat && props.tickFormat[axis];
    const tickValues = props.tickValues && props.tickValues[axis];
    if (tickFormat) {
      return tickFormat;
    } else if (tickValues && !Util.containsStrings(tickValues)) {
      return (x) => x;
    } else if (this.stringMap[axis] !== null) {
      const tickValueArray = _.sortBy(_.values(this.stringMap[axis]), (n) => n);
      const invertedStringMap = _.invert(this.stringMap[axis]);
      const dataNames = _.map(tickValueArray, (tick) => {
        return invertedStringMap[tick];
      });
      // string ticks should have one tick of padding at the beginning
      const dataTicks = ["", ...dataNames, ""];
      return (x) => dataTicks[x];
    } else {
      return this.scale[axis].tickFormat();
    }
  }

  drawLine(dataset) {
    const animate = this.props.animate && (this.props.animate.line || this.props.animate);
    const {type, name, ...attrs} = dataset.attrs;
    const lineStyle = {data: _.merge({}, this.style.line.data, attrs)};
    const style = _.merge({}, {parent: this.style.parent}, this.style.line, lineStyle);
    return (
      <VictoryLine
        {...this.props}
        animate={animate}
        standalone={false}
        data={dataset.data}
        label={attrs.label}
        interpolation={attrs.interpolation || this.props.interpolation}
        style={style}
        domain={this.domain}
        range={this.range}
        ref={name}
        key={"line-" + dataset.index}/>
    );
  }

  drawScatter(dataset) {
    const animate = this.props.animate && (this.props.animate.scatter || this.props.animate);
    const {type, name, symbol, size, ...attrs} = dataset.attrs;
    const scatterStyle = {data: _.merge({}, this.style.scatter.data, attrs)};
    const style = _.merge({}, {parent: this.style.parent}, this.style.scatter, scatterStyle);
    return (
      <VictoryScatter
        {...this.props}
        animate={animate}
        standalone={false}
        data={dataset.data}
        size={size || 3}
        symbol={symbol || "circle"}
        style={style}
        domain={this.domain}
        range={this.range}
        ref={name}
        key={"scatter-" + dataset.index}/>
    );
  }

  drawBars(datasets, options) {
    const animate = this.props.animate && (this.props.animate.bar || this.props.animate);
    const categories = (this.stringMap.x) && _.keys(this.stringMap.x);
    return (
      <VictoryBar
        {...this.props}
        animate={animate}
        standalone={false}
        data={_.pluck(datasets, "data")}
        dataAttributes={_.pluck(datasets, "attrs")}
        stacked={(options && !!options.stacked) ? options.stacked : false}
        style={_.merge({}, {parent: this.style.parent}, this.style.bar)}
        domain={this.domain}
        range={this.range}
        categories={this.props.categories || categories}
        categoryLabels={this.props.categoryLabels}
        key={"bar"}/>
    );
  }

  drawStackedBars(datasets) {
    return this.drawBars(datasets, {stacked: true});
  }

  drawData() {
    const functionMap = {
      line: this.drawLine,
      scatter: this.drawScatter,
      bar: this.drawBars,
      stackedBar: this.drawStackedBars
    };

    const dataByType = _.groupBy(this.datasets, (data) => {
      return data.attrs.type;
    });
    // stackedBar and bar data must be treated as a group, and will
    // be rendered in the order determined by the highest z-index
    // in the group
    const {stackedBar, bar, ...rest} = dataByType;
    const stackedBarZ = stackedBar ? {
      data: stackedBar,
      z: _.max(_.map(stackedBar, "attrs.zIndex")) || this.style.bar.data.zIndex || 0,
      type: "stackedBar"
    } : [];
    const barZ = bar ? {
      data: bar,
      z: _.max(_.map(bar, "attrs.zIndex")) || this.style.bar.data.zIndex || 0,
      type: "bar"
    } : [];

    // the other data is dealt with independently
    const otherData = _.flatten(_.values(rest));
    const dataWithZ = _.isEmpty(otherData) ? [] :
      _.map(otherData, (data) => {
        const type = data.attrs.type;
        const z = data.attrs.zIndex || this.style[type].data.zIndex || 0;
        return {data, z, type};
      });
    // Put it all together, and sort the array of objects by z
    const orderedDatasets = _.sortBy(dataWithZ.concat(stackedBarZ, barZ), "z");
    return _.map(orderedDatasets, (dataset) => {
      return functionMap[dataset.type].call(this, dataset.data);
    });
  }

  drawAxis(axis) {
    const offsetY = axis === "y" ? undefined : this.axisOffset.y;
    const offsetX = axis === "x" ? undefined : this.axisOffset.x;
    const axisLabel = this.props.axisLabels && this.props.axisLabels[axis];
    const animate = this.props.animate && (this.props.animate.axis || this.props.animate);
    const style = _.merge({}, {parent: this.style.parent}, this.style.axis[axis]);
    return (
      <VictoryAxis
        {...this.props}
        label={axisLabel}
        animate={animate}
        standalone={false}
        offsetY={offsetY}
        offsetX={offsetX}
        crossAxis={true}
        scale={this.scale[axis]}
        domain={this.domain[axis]}
        range={this.range[axis]}
        orientation={this.props.axisOrientation[axis]}
        tickCount={this.props.tickCount[axis]}
        tickValues={this.tickValues[axis]}
        tickFormat={this.tickFormat[axis]}
        style={style}/>
    );
  }

  render() {
    if (this.props.standalone === true) {
      const style = this.style.parent;
      return (
        <svg style={{ width: style.width, height: style.height, overflow: "visible" }}>
          {this.drawAxis("x")}
          {this.drawAxis("y")}
          {this.drawData()}
        </svg>
      );
    } else {
      return (
        <g>
          {this.drawAxis("x")}
          {this.drawAxis("y")}
          {this.drawData()}
        </g>
      );
    }
  }
}
