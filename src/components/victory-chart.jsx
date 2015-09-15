import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";
import log from "../log";
import {VictoryLine} from "victory-line";
import {VictoryAxis} from "victory-axis";
import {VictoryScatter} from "victory-scatter";
import {VictoryBar} from "victory-bar";

@Radium
class VictoryChart extends React.Component {
  constructor(props) {
    super(props);
  }

  getStyles() {
    return _.merge({
      color: "#000",
      margin: 50,
      width: 500,
      height: 300
    }, this.props.style);
  }

  // look out for scope errors, this was removed from consolidateData()
  inCaseOfYData(datasets) {
    const xArrays = this.returnOrGenerateX(); // returns an array of arrays
    const yArrays = this.returnOrGenerateY(); // returns an array of arrays
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
        attrs: this._getAttributes("y", index),
        data: _.map(dataArray, (datum) => {
          return {
            x: datum[0],
            y: datum[1]
          };
        })
      });
    });
    return datasets;
  }

  consolidateData() {

    // Lauren && Colin to reconcile upon her return...
    if (this.props.dataAttributes && this.props.dataAttributes.type === "bar") {
      return [{
        attrs: this._getAttributes("data", 0),
        data: this.props.barData
      }];
    }

    // build all of the types of data into one consistent dataset for easy plotting
    // data can exist as this.props.data, this.props.x, and this.props.y
    let datasets = [];

    // if no data is passed in, plot a straight line
    const defaultData = (x) => x;
    const yData = (!this.props.data && !this.props.y) ? defaultData : this.props.y;
    // if y is given, construct data for all y, and add it to the dataset
    if (yData) {
      // eslint made me do this. too many statements in one function?
      datasets = this.inCaseOfYData(datasets);
    }

    // if data is given in this.props.data, add it to the cosolidated datasets
    if (this.props.data) {
      if (_.isArray(this.props.data[0])) {
        _.each(this.props.data, (dataset, index) => {
          datasets.push({
            attrs: this._getAttributes("data", index),
            data: dataset
          });
        });
      } else {
        datasets.push({
          attrs: this._getAttributes("data", 0),
          data: this.props.data
        });
      }
    }
    return datasets;
  }

  // https://github.com/FormidableLabs/victory-chart/issues/5
  // helper for consolidateData
  _getAttributes(type, index) {
    // type is y or data
    const source = type + "Attributes";
    const attributes = this.props[source] && this.props[source][index] ?
      this.props[source][index] : this.props[source];
    const requiredAttributes = {
      name: attributes && attributes.name ? attributes.name : type + "-" + index,
      type: attributes && attributes.type ? attributes.type : "line"
    };
    return _.merge(requiredAttributes, attributes);
  }

  returnOrGenerateX() {
    if (this.props.x) {
      return _.isArray(this.props.x[0]) ? this.props.x : [this.props.x];
    }
    // if x is not given in props, create an array of values evenly
    // spaced across the x domain

    // Determine how to calculate the domain:
    // domain based on this.props.domain if it is given
    const domainFromProps = (this.props.domain && this.props.domain.x) ?
      this.props.domain.x : this.props.domain;

    // domain based on tickValues if they are given
    const domainFromTicks = this.props.tickValues ?
      [_.min(this.props.tickValues.x), _.max(this.props.tickValues.x)] : undefined;

    // domain based on this.props.data if it is given
    const domainFromData = this.props.data ?
      this._getDomainFromDataProps("x") : undefined;

    // domain based on this.props.scale
    // note: this.props.scale  will never be undefined thanks to default props
    const domainFromScale = this.props.scale.x ?
      this.props.scale.x().domain() : this.props.scale().domain();

    // determin3 which domain to use in order of preference
    const domain = domainFromProps || domainFromTicks || domainFromData || domainFromScale;
    const samples = this._getNumSamples();
    const step = (_.max(domain) - _.min(domain)) / samples;
    // return an array of an array of x values spaced scross the domain,
    // include the maximum of the domain
    return [_.union(_.range(_.min(domain), _.max(domain), step), [_.max(domain)])];
  }

  // helper for returnOrGenerateX
  _getDomainFromDataProps(type) {
    const data = _.flatten(this.props.data);
    return [_.min(_.pluck(data, type)), _.max(_.pluck(data, type))];
  }

  // helper for returnOrGenerateX
  _getNumSamples() {
    // if y props exist and have some sensible length, return that length
    const yArray = _.isArray(this.props.y) ? this.props.y : undefined;
    if (yArray && !_.isArray(yArray[0]) && !_.isFunction(yArray[0])) {
      return yArray.length;
    } else if (yArray) {
      const arrayLengths = _.map(yArray, (element) => {
        return _.isArray(element) ? element.length : 0;
      });
      const max = _.max(arrayLengths.concat(0));
      return max > 1 ? max : this.props.samples;
    }
    // otherwise just use this.props.samples (default value: 50)
    return this.props.samples;
  }

  returnOrGenerateY() {
    // Always return an array of arrays.
    const y = (!this.props.data && !this.props.y) ? this.defaultData : this.props.y;
    const xArray = this.returnOrGenerateX();
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
      domain = [_.min(this.props.tickValues[type]), _.max(this.props.tickValues[type])];
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
  _getDomainFromData(type) {
    const data = _.map(this.consolidateData(), (dataset) => {
      return dataset.data;
    });
    const min = [];
    const max = [];
    _.each(data, (datum) => {
      min.push(_.min(_.pluck(datum, type)));
      max.push(_.max(_.pluck(datum, type)));
    });
    return [_.min(min), _.max(max)];
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
    if (this.props.tickValues) {
      return this.props.tickValues[type];
    } else if (_.isFunction(scale.ticks)) {
      const ticks = scale.ticks(this.props.tickCount[type]);
      return _.without(ticks, 0);
    } else {
      return scale.domain();
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
    const axisWidth = 1; // placeholder, connect to variable above later
    return (
      <VictoryBar
        svg={false}
        colorCategories={this.props.barColors}
        data={this.props.barData}
        width={style.width}
        height={style.height}
        totalReductionInX={2 * style.margin}
        totalReductionInY={2 * style.margin}
        translateX={style.margin}
        translateY={style.margin - axisWidth}
        key={index}/>
    );
  }

  drawData() {
    let type;
    return _.map(this.consolidateData(), (dataset, index) => {
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
    const animate = (this.props.animate.axis !== undefined) ?
      this.props.animate.axis : this.props.animate;

    return (
      <VictoryAxis
        {...this.props}
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
        tickFormat={this.props.tickFormat[axis]}
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
        <svg style={{width: style.width, height: style.height}}>
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
  barColors: React.PropTypes.array,
  barData: React.PropTypes.array,
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
  tickFormat: {
    x: () => d3.scale.linear().tickFormat(),
    y: () => d3.scale.linear().tickFormat()
  },
  animate: false,
  containerElement: "svg"
};

export default VictoryChart;
