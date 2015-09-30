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
    this.state = {};
    this.state.data = this.consolidateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: this.consolidateData(nextProps)});
  }

  getStyles() {
    return _.merge({
      color: "#000",
      margin: 50,
      width: 500,
      height: 300
    }, this.props.style);
  }

  consolidateData(props) {
    // build all of the types of data into one consistent dataset for easy plotting
    // data can exist as props.data, this.props.x, and this.props.y
    const datasets = [];

    // if no data is passed in, plot a straight line
    const defaultData = (x) => x;
    const yData = (!props.data && !props.y) ? defaultData : props.y;
    // if y is given, construct data for all y, and add it to the dataset
    if (yData) {
      const xArrays = this.returnOrGenerateX(props); // returns an array of arrays
      const yArrays = this.returnOrGenerateY(props); // returns an array of arrays
      let n;
      let xArray;
      // create dataArrays of n points from each x array and each y array
      const dataArrays = _.map(yArrays, (y, index) => {
        xArray = xArrays[index] || xArrays[0];
        n = _.min([xArray.length, y.length]);
        return _.zip(_.take(xArray, n), _.take(y, n));
      });

      // for each dataArray create an array of data points and add it to
      // the consolidated datasets
      _.each(dataArrays, (dataArray, index) => {
        datasets.push({
          attrs: this._getAttributes(props, "y", index),
          data: _.map(dataArray, (datum) => {
            return {
              x: datum[0],
              y: datum[1]
            };
          })
        });
      });
    }

    // if data is given in props.data, add it to the cosolidated datasets
    if (props.data) {
      if (_.isArray(props.data[0])) {
        _.each(props.data, (dataset, index) => {
          datasets.push({
            attrs: this._getAttributes(props, "data", index),
            data: dataset
          });
        });
      } else {
        datasets.push({
          attrs: this._getAttributes(props, "data", 0),
          data: props.data
        });
      }
    }
    return this._handleStringData(datasets);
  }

  _handleStringData(datasets) {
    const data = _.flatten(_.pluck(datasets, "data"));
    const xData = this._getUniqueStrings(data, "x");
    const yData = this._getUniqueStrings(data, "y");
    const formattedData = _.map(datasets, (dataset) => {
      return {
        attrs: dataset.attrs,
        data: _.map(dataset.data, (data) => {
          return _.merge(data, {
            x: _.isString(data.x) ? _.indexOf(xData, data.x) : data.x,
            xName: _.isString(data.x) ? data.x : undefined,
            y: _.isString(data.y) ? _.indexOf(yData, data.y) : data.y,
            yName: _.isString(data.y) ? data.y : undefined
          });
        })
      };
    })
    return formattedData
  }

  _getUniqueStrings(data, type) {
    return _.chain(data)
      .pluck(type)
      .map((datum) => {
        return _.isString(datum) ? datum : 0;
      })
      .compact()
      .uniq()
      .sort()
      .value();
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

  returnOrGenerateX(props) {
    if (props.x) {
      return _.isArray(props.x[0]) ? props.x : [props.x];
    }
    // if x is not given in props, create an array of values evenly
    // spaced across the x domain

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

    // determin3 which domain to use in order of preference
    const domain = domainFromProps || domainFromTicks || domainFromData || domainFromScale;
    const samples = this._getNumSamples(props);
    const step = (_.max(domain) - _.min(domain)) / samples;
    // return an array of an array of x values spaced scross the domain,
    // include the maximum of the domain
    return [_.union(_.range(_.min(domain), _.max(domain), step), [_.max(domain)])];
  }

  // helper for returnOrGenerateX
  _getDomainFromDataProps(props) {
    const xData = _.pluck(_.flatten(props.data), "x");
    if (Util.containsStrings(xData)) {
      const dataNames = this._getUniqueStrings(props.data, "x");
      return [0, dataNames.length - 1];
    } else {
      return [_.min(xData), _.max(xData)];
    }
  }

  // helper for returnOrGenerateX
  _getNumSamples(props) {
    // if y props exist and have some sensible length, return that length
    const yArray = _.isArray(props.y) ? props.y : undefined;
    if (yArray && !_.isArray(yArray[0]) && !_.isFunction(yArray[0])) {
      return yArray.length;
    } else if (yArray) {
      const arrayLengths = _.map(yArray, (element) => {
        return _.isArray(element) ? element.length : 0;
      });
      const max = _.max(arrayLengths.concat(0));
      return max > 1 ? max : props.samples;
    }
    // otherwise just use props.samples (default value: 50)
    return props.samples;
  }

  returnOrGenerateY(props) {
    // Always return an array of arrays.
    const y = (!props.data && !props.y) ? this.defaultData : props.y;
    const xArray = this.returnOrGenerateX(props);
    if (_.isFunction(y)) {
      // if y is a function, apply it to each element in each x array
      return _.map(xArray, (xSegment) => {
        return _.map(xSegment, (datum) => y(datum));
      });
    } else if (_.isNumber(y[0])) {
      // if y is an array of numbers, return it wrapped in an array
      return [y];
    } else {
      // if y is an array of arrays and/or functions return the arrays,
      // and return the result of applying the functions to corresponding x arrays
      let x;
      return _.map(y, (yElement, index) => {
        x = xArray[index] || xArray[0];
        return _.isFunction(yElement) ?
          _.map(x, (datum) => yElement(datum)) : yElement;
      });
    }
  }

  getDomain(type) {
    let domain;
    if (this.props.domain) {
      domain = this.props.domain[type] || this.props.domain;
    } else if (this.props.tickValues) {
      domain = this._getDomainFromTickValues(this.props, type)
    } else {
      domain = this._getDomainFromData(type);
    }

    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = type === "x" ? "y" : "x";
    const orientation = this.props.axisOrientation[otherAxis];

    return orientation === "bottom" || orientation === "left" ?
      domain : domain.concat().reverse();
  }

  // helper method for getDomain
  _getDomainFromTickValues(props, type) {
    const ticks = this.props.tickValues[type];
    if (Util.containsStrings(ticks)) {
      return [0, ticks.length - 1];
    }
    return [_.min(ticks), _.max(ticks)];
  }

  // helper method for getDomain
  _getDomainFromData(type) {
    const data = _.pluck(this.state.data, "data")
    const dataNames = this._getDataNames();
    if (!_.isEmpty(dataNames[type])) {
      return [0, dataNames[type].length - 1];
    }
    const min = [];
    const max = [];
    _.each(data, (datum) => {
      min.push(_.min(_.pluck(datum, type)));
      max.push(_.max(_.pluck(datum, type)));
    });
    return [_.min(min), _.max(max)];
  }

  _getDataNames() {
    const data = _.flatten(_.pluck(this.state.data, "data"));
    return {
      x: _.chain(data)
        .pluck("xName")
        .uniq()
        .compact()
        .sort()
        .value(),
      y: _.chain(data)
        .pluck("yName")
        .uniq()
        .compact()
        .sort()
        .value()
    };
  }

  getRange(type) {
    if (this.props.range) {
      return this.props.range[type] ? this.props.range[type] : this.props.range;
    }
    // if the range is not given in props, calculate it from width, height and margin
    const style = this.getStyles();

    return type === "x" ?
      [style.margin, style.width - style.margin] :
      [style.height - style.margin, style.margin];
  }

  getScale(type) {
    const scale = this.props.scale[type] ? this.props.scale[type]().copy() :
      this.props.scale().copy();
    const range = this.getRange(type);
    const domain = this.getDomain(type);
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

  getTickValues(type) {
    const scale = this.getScale(type);
    const dataNames = this._getDataNames();
    if (this.props.tickValues) {
      return this.props.tickValues[type];
    } else if (!_.isEmpty(dataNames[type])) {
      return _.range(dataNames[type].length);
    } else if (_.isFunction(scale.ticks)) {
      const ticks = scale.ticks(this.props.tickCount[type]);
      return _.without(ticks, 0);
    } else {
      return scale.domain();
    }
  }

  getTickFormat(type) {
    const dataNames = this._getDataNames();
    const scale = this.getScale(type);
    if (this.props.tickFormat) {
      return this.props.tickFormat[type]();
    } else if (this.props.tickValues && Util.containsStrings(this.props.tickValues[type])) {
      return (x) => x;
    } else if (!_.isEmpty(dataNames[type])) {
      return (x) => dataNames[type][x];
    } else {
      return scale.tickFormat();
    }
  }

  drawLine(dataset, index) {
    const style = this.getStyles();
    const {type, name, ...attrs} = dataset.attrs;
    const animate = (this.props.animate.line !== undefined) ?
      this.props.animate.line : this.props.animate;
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
  }

  drawScatter(dataset, index) {
    const style = this.getStyles();
    const {type, name, symbol, size, ...attrs} = dataset.attrs;
    const animate = (this.props.animate.scatter !== undefined) ?
      this.props.animate.scatter : this.props.animate;
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
        key={index}/>
    );
  }

  drawBar(dataset, index) {
    const style = this.getStyles();
    const {type, name, ...attrs} = dataset.attrs;
    const animate = (this.props.animate.scatter !== undefined) ?
      this.props.animate.scatter : this.props.animate;
    return (
      <VictoryBar
        {...this.props}
        animate={animate}
        containerElement="g"
        data={dataset.data}
        style={_.merge(style, attrs)}
        domain={{x: this.getDomain("x"), y: this.getDomain("y")}}
        range={{x: this.getRange("x"), y: this.getRange("y")}}
        barPadding={this.props.barPadding || 5}
        colorCategories={this.props.barColors}
        ref={name}
        key={index}/>
    );
  }

  drawData() {
    let type;
    return _.map(this.state.data, (dataset, index) => {
      type = dataset.attrs.type;
      if (type === "line") {
        return this.drawLine(dataset, index);
      } else if (type === "scatter") {
        return this.drawScatter(dataset, index);
      } else if (type === "bar") {
        return this.drawBar(dataset, index);
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
  barColors: React.PropTypes.array,
  barPadding: React.PropTypes.number,
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
  samples: 50,
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
