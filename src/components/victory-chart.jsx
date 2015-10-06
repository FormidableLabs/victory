import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";
import log from "../log";
import {VictoryLine} from "victory-line/src";
import {VictoryAxis} from "victory-axis/src";
import {VictoryScatter} from "victory-scatter/src";
import {VictoryBar} from "victory-bar/src";
import Util from "../util";

@Radium
class VictoryChart extends React.Component {
  constructor(props) {
    super(props);
    // warn about bad data
    this.validateData(this.props);
    // provide default data for the component to render
    this.defaultData = (x) => x;
    this.state = {};
    this.state.stringMap = {
      x: this.createStringMap(this.props, "x"),
      y: this.createStringMap(this.props, "y")
    };
    this.state.data = this.consolidateData(this.props);
    this.state.stackedData = this.getStackedData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // warn about bad data
    this.validateData(nextProps);
    this.setState({
      stringMap: {
        x: this.createStringMap(nextProps, "x"),
        y: this.createStringMap(nextProps, "y")
      },
      data: this.consolidateData(nextProps),
      stackedData: this.getStackedData(nextProps)
    });
  }

  validateData(originalProps) {
    const props = _.cloneDeep(originalProps);
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

  getStyles() {
    return _.merge({
      color: "#000",
      margin: 50,
      width: 500,
      height: 300
    }, this.props.style);
  }

  createStringMap(originalProps, axis) {
    const props = _.cloneDeep(originalProps);
    // if tick values exist and are strings, create a map using only those strings
    // dont alter the order.
    if (props.tickValues && Util.containsStrings(props.tickValues[axis])) {
      return _.zipObject(_.map(props.tickValues[axis], (tick, index) => {
        return ["" + tick, index + 1];
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

  consolidateData(originalProps) {
    const props = _.cloneDeep(originalProps);
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
    return datasets;
  }

  _formatDataset(dataset, attributes) {
    const stringMap = this.state.stringMap;
    return {
      attrs: attributes,
      data: _.map(dataset, (data) => {
        return _.merge(data, {
          // map string data to numeric values, and add names
          x: _.isString(data.x) ? stringMap.x[data.x] : data.x,
          xName: _.isString(data.x) ? data.x : undefined,
          y: _.isString(data.y) ? stringMap.y[data.y] : data.y,
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
    const domainFromTicks = props.tickValues ?
      this._getDomainFromTickValues(props, "x") : undefined;

    // domain based on props.data if it is given
    const domainFromData = props.data ?
      this._getDomainFromDataProps(props) : undefined;

    // domain based on props.scale
    // note: props.scale will never be undefined thanks to default props
    const domainFromScale = props.scale.x ?
      props.scale.x().domain() : props.scale().domain();

    // determine which domain to use in order of preference
    const domain = domainFromProps || domainFromTicks || domainFromData || domainFromScale;
    const samples = this._getNumSamples(props);
    const step = (_.max(domain) - _.min(domain)) / samples;
    // return an array of an array of x values spaced scross the domain,
    // include the maximum of the domain
    return [_.union(_.range(_.min(domain), _.max(domain), step), [_.max(domain)])];
  }

  // helper for generateXFromDomain
  _getDomainFromDataProps(props) {
    const xData = _.pluck(_.flatten(props.data), "x");
    if (Util.containsStrings(xData)) {
      const data = _.values(this.state.stringMap.x);
      return [_.min(data), _.max(data)];
    }
    return this._padDomain([_.min(xData), _.max(xData)], "x");
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
    const xFromStringMap = this.state.stringMap.x ? [_.values(this.state.stringMap.x)] : undefined;
    const xFromDomain = this.generateXFromDomain(props);
    let xArrays;
    let xArray;
    let n;

    // determine y
    const y = (!props.data && !props.y) ? this.defaultData : props.y;

    if (_.isFunction(y)) {
      // if y is a function, apply it to each element in each x array
      xArrays = xFromProps || xFromDomain;
      return _.map(xArrays, (xArr) => {
        return _.map(xArr, (x) => {
          return {x, y: y(x)};
        });
      });
    } else if (_.isNumber(y[0])) {
      // if y is an array of numbers, create an object with the first xArray
      xArrays = xFromProps || xFromStringMap || xFromDomain;
      n = _.min([xArrays[0].length, y.length]);
      return _.map(_.take(xArray[0], n), (x, index) => {
        return { x, y: y[index]};
      });
    } else {
      // if y is an array of arrays and/or functions return the arrays,
      // and return the result of applying the functions to corresponding x arrays

      return _.map(y, (yElement, index) => {
        if (_.isArray(yElement)) {
          xArrays = xFromProps || xFromStringMap || xFromDomain;
          xArray = xArrays[index] || xArrays[0];
          n = _.min([xArray.length, yElement.length]);
          return _.map(_.take(xArray, n), (x, i) => {
            return {x, y: yElement[i]};
          });
        } else {
          xArrays = xFromProps || xFromDomain;
          xArray = xArrays[index] || xArrays[0];
          return _.map(xArray, (x) => {
            return {x, y: yElement(x)};
          });
        }
      });
    }
  }

  getStackedData(originalProps) {
    const props = _.cloneDeep(originalProps);
    const stackedTypes = ["stackedBar"];
    if (_.includes(stackedTypes, props.chartType)) {
      return this.state.data;
    } else {
      const stackedData = _.filter(this.state.data, (dataset) => {
        return _.includes(stackedTypes, dataset.attrs.type) ? dataset : null;
      });
      return _.isEmpty(stackedData) ? undefined : stackedData;
    }
  }

  getDomain(axis) {
    let domain;
    if (this.props.domain) {
      domain = this.props.domain[axis] || this.props.domain;
    } else if (this.props.tickValues) {
      domain = this._getDomainFromTickValues(this.props, axis);
    } else {
      domain = this._getDomainFromData(axis);
    }

    const paddedDomain = this.props.domain ? domain : this._padDomain(domain, axis);

    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = axis === "x" ? "y" : "x";
    const orientation = this.props.axisOrientation[otherAxis];
    return orientation === "bottom" || orientation === "left" ?
      paddedDomain : paddedDomain.concat().reverse();
  }

  _padDomain(domain, axis) {
    // don't pad non-numeric domains
    if (_.some(domain, (element) => !_.isNumber(element))) {
      return domain;
    }
    const min = _.min(domain);
    const max = _.max(domain);
    const extent = Math.abs(max - min);
    const percentPadding = this.props.domainOffset ? this.props.domainOffset[axis] : 0;
    const padding = extent * percentPadding;
    const adjustedMin = min === 0 ? min : min - padding;
    const adjustedMax = max === 0 ? max : max + padding;
    return [adjustedMin, adjustedMax];
  }

  // helper method for getDomain
  _getDomainFromTickValues(props, axis) {
    const ticks = this.props.tickValues[axis];
    const data = Util.containsStrings(ticks) ?
      _.map(ticks, (tick) => this.state.stringMap[axis][tick]) : ticks;
    return [_.min(data), _.max(data)];
  }

  // helper method for getDomain
  _getDomainFromData(axis) {
    // if a sensible string map exists, return the minimum and maximum values
    if (this.state.stringMap[axis] !== null) {
      const mapValues = _.values(this.state.stringMap[axis]);
      return [_.min(mapValues), _.max(mapValues)];
    } else {
      // find the global min and max
      const allData = _.flatten(_.pluck(this.state.data, "data"));
      const min = _.min(_.pluck(allData, axis));
      const max = _.max(_.pluck(allData, axis));
      // find the cumulative max for stacked chart types
      // this is only sensible for the y domain
      const cumulativeMax = (this.state.stackedData && axis === "y") ?
        _.reduce(this.state.stackedData, (memo, dataset) => {
          return memo + (_.max(_.pluck(dataset.data, axis)) - _.min(_.pluck(dataset.data, axis)));
        }, 0) : -Infinity;
      return [min, _.max([max, cumulativeMax])];
    }
  }

  getRange(axis) {
    if (this.props.range) {
      return this.props.range[axis] ? this.props.range[axis] : this.props.range;
    }
    // if the range is not given in props, calculate it from width, height and margin
    const style = this.getStyles();

    return axis === "x" ?
      [style.margin, style.width - style.margin] :
      [style.height - style.margin, style.margin];
  }

  getScale(axis) {
    const scale = this.props.scale[axis] ? this.props.scale[axis]().copy() :
      this.props.scale().copy();
    const range = this.getRange(axis);
    const domain = this.getDomain(axis);
    scale.range(range);
    scale.domain(domain);
    // hacky check for identity scale
    if (_.difference(scale.range(), range).length !== 0) {
      // identity scale, reset the domain and range
      scale.range(range);
      scale.domain(range);
      log.warn("Identity Scale: domain and range must be identical. " +
        "Domain has been reset to match range.");
    }
    return scale;
  }

  getAxisOffset() {
    // make the axes line up, and cross when appropriate
    const style = this.getStyles();
    const scale = {
      x: this.getScale("x"),
      y: this.getScale("y")
    };
    const origin = {
      x: _.max([_.min(this.getDomain("x")), 0]),
      y: _.max([_.min(this.getDomain("y")), 0])
    };
    const orientationOffset = {
      x: this.props.axisOrientation.y === "left" ? 0 : style.width,
      y: this.props.axisOrientation.x === "bottom" ? style.height : 0
    };
    return {
      x: Math.abs(orientationOffset.x - scale.x.call(this, origin.x)),
      y: Math.abs(orientationOffset.y - scale.y.call(this, origin.y))
    };
  }

  getTickValues(axis) {
    const scale = this.getScale(axis);
    // if tickValues are defines in props, and dont contain strings, just return them
    if (this.props.tickValues && !Util.containsStrings(this.props.tickValues[axis])) {
      return this.props.tickValues[axis];
    } else if (this.state.stringMap[axis] !== null) {
      // category values should have one tick of padding on either side
      return this.props.tickValues ?
        _.map(this.props.tickValues[axis], (tick) => this.state.stringMap[axis][tick]) :
        _.values(this.state.stringMap[axis]);
    } else if (_.isFunction(scale.ticks)) {
      const ticks = scale.ticks(this.props.tickCount[axis]);
      return _.without(ticks, 0);
    } else {
      return scale.domain();
    }
  }

  getTickFormat(axis) {
    const scale = this.getScale(axis);
    if (this.props.tickFormat) {
      return this.props.tickFormat[axis]();
    } else if (this.props.tickValues && !Util.containsStrings(this.props.tickValues[axis])) {
      return (x) => x;
    } else if (this.state.stringMap[axis] !== null) {
      const dataNames = _.keys(this.state.stringMap[axis]);
      // string ticks should have one tick of padding on either side
      const dataTicks = ["", ...dataNames, ""];
      return (x) => dataTicks[x];
    } else {
      return scale.tickFormat();
    }
  }

  drawLines(datasets) {
    const style = this.getStyles();
    const animate = (this.props.animate.line !== undefined) ?
      this.props.animate.line : this.props.animate;

    return _.map(datasets, (dataset, index) => {
      const {type, name, ...attrs} = dataset.attrs;
      return (
        <VictoryLine
          {...this.props}
          animate={animate}
          containerElement="g"
          data={dataset.data}
          style={_.merge(style, attrs)}
          domain={{x: this.getDomain("x"), y: this.getDomain("y")}}
          range={{x: this.getRange("x"), y: this.getRange("y")}}
          ref={name}
          key={index}/>
      );
    });
  }

  drawScatters(datasets) {
    const style = this.getStyles();
    const animate = (this.props.animate.scatter !== undefined) ?
      this.props.animate.scatter : this.props.animate;
    return _.map(datasets, (dataset, index) => {
      const {type, name, symbol, size, ...attrs} = dataset.attrs;
      return (
        <VictoryScatter
          {...this.props}
          animate={animate}
          containerElement="g"
          data={dataset.data}
          size={size || 3}
          symbol={symbol || "circle"}
          style={_.merge(style, attrs)}
          domain={{x: this.getDomain("x"), y: this.getDomain("y")}}
          range={{x: this.getRange("x"), y: this.getRange("y")}}
          ref={name}
          key={"scatter-" + index}/>
      );
    });
  }

  drawBars(datasets, options) {
    const style = this.getStyles();
    const animate = (this.props.animate.bar !== undefined) ?
      this.props.animate.bar : this.props.animate;
    const categories = {
      x: this.state.stringMap.x ? _.keys(this.state.stringMap.x) : undefined,
      y: this.state.stringMap.y ? _.keys(this.state.stringMap.y) : undefined
    };
    return (
      <VictoryBar
        {...this.props}
        animate={animate}
        containerElement="g"
        data={_.pluck(datasets, "data")}
        dataAttributes={_.pluck(datasets, "attrs")}
        stacked={(options && !!options.stacked) ? options.stacked : false}
        style={style}
        domain={{x: this.getDomain("x"), y: this.getDomain("y")}}
        range={{x: this.getRange("x"), y: this.getRange("y")}}
        categories={categories}
        categoryOffset={this.props.domainOffset.x}
        key={"bar"}/>
    );
  }

  drawData() {
    const dataByType = _.groupBy(this.state.data, (data) => {
      return data.attrs.type;
    });
    return _.map(_.keys(dataByType), (type) => {
      switch (type) {
        case "line":
          return this.drawLines(dataByType[type]);
        case "scatter":
          return this.drawScatters(dataByType[type]);
        case "bar":
          return this.drawBars(dataByType[type]);
        case "stackedBar":
          return this.drawBars(dataByType[type], {stacked: true});
      }
    });
  }

  drawAxis(axis) {
    const style = this.getStyles();
    const offsetY = axis === "y" ? undefined : this.getAxisOffset().y;
    const offsetX = axis === "x" ? undefined : this.getAxisOffset().x;
    const axisStyle = this.props.axisStyle ? this.props.axisStyle : undefined;
    const tickStyle = this.props.tickStyle ? this.props.tickStyle : undefined;
    const gridStyle = this.props.gridStyle ? this.props.gridStyle : undefined;
    const axisLabel = this.props.axisLabels && this.props.axisLabels[axis] ?
      this.props.axisLabels[axis] : undefined;
    const labelPadding = this.props.axisLabels && this.props.axisLabels.labelPadding ?
      this.props.axisLabels.labelPadding : undefined;
    const animate = (this.props.animate.axis !== undefined) ?
      this.props.animate.axis : this.props.animate;
    return (
      <VictoryAxis
        {...this.props}
        label={axisLabel}
        labelPadding={labelPadding}
        animate={animate}
        containerElement="g"
        offsetY={offsetY}
        offsetX={offsetX}
        crossAxis={true}
        domain={this.getDomain(axis)}
        range={this.getRange(axis)}
        scale={this.props.scale[axis]}
        orientation={this.props.axisOrientation[axis]}
        showGridLines={this.props.showGridLines[axis]}
        tickCount={this.props.tickCount[axis]}
        tickValues={this.getTickValues(axis)}
        tickFormat={this.getTickFormat(axis)}
        axisStyle={axisStyle}
        gridStyle={gridStyle}
        tickStyle={tickStyle}
        style={style}/>
    );
  }

  render() {
    const style = this.getStyles();
    if (this.props.containerElement === "svg") {
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

VictoryChart.propTypes = {
  style: React.PropTypes.node,
  chartType: React.PropTypes.string,
  data: React.PropTypes.oneOfType([ // maybe this should just be "node"
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
  dataAttributes: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.arrayOf(React.PropTypes.object)
  ]),
  x: React.PropTypes.array,
  y: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func
  ]),
  yAttributes: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.arrayOf(React.PropTypes.object)
  ]),
  domain: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.shape({
      x: React.PropTypes.array,
      y: React.PropTypes.array
    })
  ]),
  range: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.shape({
      x: React.PropTypes.arrayOf(React.PropTypes.number),
      y: React.PropTypes.arrayOf(React.PropTypes.number)
    })
  ]),
  scale: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.shape({
      x: React.PropTypes.func,
      y: React.PropTypes.func
    })
  ]),
  samples: React.PropTypes.number,
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
  // axis props
  axisLabels: React.PropTypes.object,
  axisOrientation: React.PropTypes.shape({
    x: React.PropTypes.oneOf(["top", "bottom"]),
    y: React.PropTypes.oneOf(["left", "right"])
  }),
  showGridLines: React.PropTypes.shape({
    x: React.PropTypes.bool,
    y: React.PropTypes.bool
  }),
  tickValues: React.PropTypes.shape({
    x: React.PropTypes.arrayOf(React.PropTypes.any),
    y: React.PropTypes.arrayOf(React.PropTypes.any)
  }),
  tickFormat: React.PropTypes.shape({
    x: React.PropTypes.func,
    y: React.PropTypes.func
  }),
  tickCount: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  axisStyle: React.PropTypes.shape({
    x: React.PropTypes.node,
    y: React.PropTypes.node
  }),
  tickStyle: React.PropTypes.shape({
    x: React.PropTypes.node,
    y: React.PropTypes.node
  }),
  gridStyle: React.PropTypes.shape({
    x: React.PropTypes.node,
    y: React.PropTypes.node
  }),
  // bar props
  barWidth: React.PropTypes.number,
  barPadding: React.PropTypes.number,
  domainOffset: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  animate: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape({
      line: React.PropTypes.bool,
      scatter: React.PropTypes.bool,
      axis: React.PropTypes.bool
    })
  ]),
  containerElement: React.PropTypes.oneOf(["svg", "g"])
};

VictoryChart.defaultProps = {
  chartType: "line",
  interpolation: "basis",
  scale: () => d3.scale.linear(),
  axisOrientation: {
    x: "bottom",
    y: "left"
  },
  showGridLines: {
    x: false,
    y: false
  },
  tickCount: {
    x: 7,
    y: 5
  },
  animate: false,
  containerElement: "svg"
};

export default VictoryChart;
