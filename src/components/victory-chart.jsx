import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";
import log from "../log";
import Util from "../util";


@Radium
export default class VictoryChart extends React.Component {
  static propTypes = {
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
     * The domainPadding prop specifies a number of pixels of padding to add to the
     * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
     * from the origin to prevent crowding. This prop should be given as an object with
     * numbers specified for x and y.
     */
    domainPadding: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    })
  };

  static defaultProps = {
    scale: d3.scale.linear(),
    standalone: true,
  };

  constructor(props) {
    super(props);
    this.getCalculatedValues(props);
  }

  componentWillReceiveProps(nextProps) {
    this.getCalculatedValues(nextProps);
  }

  // validateData(props) {
  //   const axes = ["x", "y"];
  //   _.each(axes, (axis) => {
  //     // check for mixed string and numeric data
  //     const data = props.data ? _.pluck(_.flatten(props.data), axis) : [];
  //     const typeData = props[axis] && _.isArray(props[axis]) ?
  //       _.flatten(_.map(props[axis], (element) => {
  //         return _.isFunction(element) ? [] : element;
  //       })) : [];
  //     const allData = data.concat(typeData);
  //     if (Util.containsStrings(allData) && !Util.containsOnlyStrings(allData)) {
  //       log.warn("Don't mix string data with numeric data on the same axis!");
  //     }
  //     // check for mixed bar and stackedBar chart types
  //     const dataTypes = this.props.dataAttributes ?
  //       _.pluck(_.flatten(this.props.dataAttributes), "type") : [];
  //     const yTypes = this.props.yAttributes ?
  //       _.pluck(_.flatten(this.props.yAttributes), "type") : [];
  //     const globalType = this.props.chartType || [];
  //     const types = dataTypes.concat(yTypes, globalType);
  //     if (_.includes(types, "bar") && _.includes(types, "stackedBar")) {
  //       log.warn("Don't mix bar with stackedBar in the same chart!");
  //     }
  //   });
  // }

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

  getDomain(props, axis) {
    let domain;
    if (props.domain) {
      domain = props.domain[axis] || props.domain;
    } else if (this.props.data) {
      domain = this._getDomainFromData(props, axis);
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
        standalone={false}
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
        standalone={false}
        style={_.merge({}, {parent: this.style.parent}, this.style.bar)}
        domain={this.domain}
        range={this.range}
        key={"bar"}/>
    );
  }

  drawStackedBars(datasets) {
    return this.drawBars(datasets, {stacked: true});
  }

  drawAxis(axis) {
    const offsetY = axis === "y" ? undefined : this.axisOffset.y;
    const offsetX = axis === "x" ? undefined : this.axisOffset.x;
    const animate = this.props.animate && (this.props.animate.axis || this.props.animate);
    const style = _.merge({}, {parent: this.style.parent}, this.style.axis[axis]);
    return (
      <VictoryAxis
        {...this.props}
        standalone={false}
        offsetY={offsetY}
        offsetX={offsetX}
        crossAxis={true}
        scale={this.scale[axis]}
        domain={this.domain[axis]}
        range={this.range[axis]}
        tickValues={this.tickValues[axis]}
        tickFormat={this.tickFormat[axis]}
        style={style}/>
    );
  }







  getNewChildren() {
    return  React.Children.map(this.props.children, (child) => {
      const style = _.merge({}, this.props.style, child.props.style)
      return React.cloneElement(this.props.children, {
        domain: this.props.domain,
        standalone: false,
        style
      })
    });
  }

  render() {
    return (
      <svg style={{width: 500, height: 300, margin: 50}}>
        {this.getNewChildren()}
      </svg>
    );
  }

};