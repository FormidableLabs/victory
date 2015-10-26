import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";
import log from "../log";
import Util from "../util";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";

const defaultStyles = {
  parent: {
    width: 500,
    height: 300,
    margin: 50
  }
};

const defaultAxes = {
  x: <VictoryAxis axisType="x" orientation="bottom"/>,
  y: <VictoryAxis axisType="y" orientation="left"/>
};

const defaultData = [
  <VictoryLine domain={{x: [0, 1], y: [0, 1]}}/>
];

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
    standalone: true,
  };

  constructor(props) {
    super(props);
    this.getCalculatedValues(props);
  }

  componentWillReceiveProps(nextProps) {
    this.getCalculatedValues(nextProps);
  }

  getCalculatedValues(props) {
    this.style = this.getStyles(props);
    this.range = {
      x: this.getRange(props, "x"),
      y: this.getRange(props, "y")
    };
    this.dataComponents = this.getDataComponents(props);
    this.groupedDataComponents = this.getGroupedDataComponents(props);
    this.axisComponents = {
      x: this.getAxisComponents(props, "x"),
      y: this.getAxisComponents(props, "y")
    };
    this.stringMap = {
      x: this.createStringMap("x"),
      y: this.createStringMap("y")
    };
    this.domain = {
      x: this.getDomain(props, "x"),
      y: this.getDomain(props, "y")
    }
    this.scale = {
      x: this.getScale(props, "x"),
      y: this.getScale(props, "y")
    };
    // this.tickValues = {
    //   x: this.getTickValues(props, "x"),
    //   y: this.getTickValues(props, "y")
    // };
    // this.tickFormat = {
    //   x: this.getTickFormat(props, "x"),
    //   y: this.getTickFormat(props, "y")
    // };
    // this.axisOffset = this.getAxisOffset(props);
  }

  getStyles(props) {
    return props.style ? {parent: _.merge({}, props.style.parent, defaultStyles.parent)} :
      defaultStyles;
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

  getDataComponents(props) {
    if (!props.children) {
      return defaultData;
    }
    const dataNames = ["VictoryLine", "VictoryScatter"]
    const childData = _.filter(props.children, (child) => {
      return _.includes(dataNames, child.type.displayName);
    });
    return childData || defaultData;
  }

  getGroupedDataComponents(props) {
    const groupedDataNames = ["VictoryBar"];
    const groupedData = _.filter(props.children, (child) => {
      return _.includes(groupedDataNames, child.type.displayName);
    });
    if (_.isEmpty(groupedData)) {
      return undefined;
    }
    // TODO: what is the correct behavior when more than one barComponent child
    // is present? Use the first one? use none? throw an error?
    const dataByGroup = _.groupBy(groupedData, (component) => {
      return component.type.displayName;
    });
    return _.map(dataByGroup, (group) => {
      const components = _.values(group);
      const name = _.keys(group)[0];
      if (components.length > 1) {
        log.warn("Only one " + name + "component is allowed per chart. If you are trying " +
          "to plot several datasets, please pass an array of data arrays directly " +
          "into " + name + ".");
      }
      return components[0];
    });
  }

  getAxisComponents(props, axis) {
    if (!this.props.children) {
      return defaultAxes[axis];
    }
    const childAxis = _.filter(this.props.children, (child) => {
      return child.props.axisType === axis;
    });
    // TODO: what is the correct behavior when more than one axis of a given type
    // is present? Use the first one? use none? throw an error?
    // TODO: axisType should be a required prop on VictoryAxis
    if (childAxis.length > 1) {
      log.warn("Only one VictoryAxis component of each axis type is allowed when using. " +
       "the VictoryChart wrapper. Only the first axis will be used. Please compose " +
       "multi-axis charts manually");
      return childAxis[0];
    }
    return childAxis[0] || defaultAxes[axis];
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



  createStringMap(axis) {
    // if tick values exist and are strings, create a map using those strings
    // dont alter the order.
    const axisComponent = this.axisComponents[axis];
    const tickValues = axisComponent.props.tickValues ?
      axisComponent.props.tickValues[axis] || axisComponent.props.tickValues : undefined;
    const tickMap = (tickValues && Util.containsStrings(tickValues)) ?
      _.zipObject(_.map(props.tickValues[axis], (tick, index) => {
        return ["" + tick, index + 1];
      })) : undefined;

    let categoryMap;
    // TODO categories only apply to x for bar at the moment.
    if (this.groupedDataComponents && axis === "x") {
      const allCategories = _.map(this.groupedDataComponents, (component) => {
        const categories = component.props.categories;
        return (categories && Util.containsStrings(categories)) ? categories : undefined;
      });
      const stringCategories = _.compact(_.flatten(allCategories));
      categoryMap = _.isEmpty(stringCategories) ? undefined :
        _.zipObject(_.map(stringCategories, (category, index) => {
          return ["" + category, index + 1];
        }));
    }

    // Collect strings from dataComponents props.data
    const allStrings = [];
    const allData = _.map(this.dataComponents, (dataComponent) => {
      return dataComponent.props.data;
    });

    // collect strings from allData
    if (allData) {
      const data = _.flatten(allData);
      const stringData = _.chain(data)
        .pluck(axis)
        .map((datum) => {
          return _.isString(datum) ? datum : null;
        })
        .value();
      allStrings.push(stringData);
    }
    // collect strings from props x or props y
    const allXYData = _.map(this.dataComponents, (dataComponent) => {
      return dataComponent.props[axis];
    });
    if (allXYData) {
      _.each(_.flatten(allXYData), (element) => {
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
      tickMap || categoryMap || null :
      _.zipObject(_.map(uniqueStrings, (string, index) => {
        const tickValue = tickMap && tickMap[string];
        const categoryValue = categoryMap && categoryMap[string];
        const value = tickValue || categoryValue || index + 1;
        return [string, value];
      }));
  }

  formatChildData(childData) {
    const _formatData = (dataset) => {
      return _.map(dataset, (data) => {
        return _.merge({}, data, {
          // map string data to numeric values, and add names
          x: _.isString(data.x) ? this.stringMap.x[data.x] : data.x,
          xName: _.isString(data.x) ? data.x : undefined,
          y: _.isString(data.y) ? this.stringMap.y[data.y] : data.y,
          yName: _.isString(data.y) ? data.y : undefined
        });
      });
    }
    if (Util.isArrayOfArrays(childData)) {
      return _.map(childData, (dataset) => _formatData(dataset));
    }
    return _formatData(childData);
  }

  getDomain(props, axis) {
    if (props.domain) {
      return props.domain[axis] || props.domain;
    }
    const dataDomains = _.map(this.dataComponents, (component) => {
      return this.getDomainFromData(component, axis);
    });
    const groupedDataDomains = _.map(this.groupedDataComponents, (component) => {
      return this.getDomainFromGroupedData(component, axis);
    });
    const axisDomain = this.getDomainFromAxis(axis);
    const domainFromChildren = Util.removeUndefined(
      _.flatten(dataDomains.concat(groupedDataDomains, axisDomain))
    );
    const domain =  _.isEmpty(domainFromChildren) ?
      [0, 1] : [_.min(domainFromChildren), _.max(domainFromChildren)];
    return this.padDomain(props, domain, axis);
  }

  getDomainFromData(component, axis) {
    if (component.props.domain) {
      return component.props.domain[axis] || component.props.domain;
    } else if (component.props.data) {
      const formattedData = this.formatChildData(component.props.data);
      const dataByAxis = _.map(_.flatten(formattedData), (data) => {
        return data[axis];
      });
      return [_.min(dataByAxis), _.max(dataByAxis)];
   } else {
    return undefined;
   }
  }

  _isStackedComponentData(component, axis) {
    // checks whether grouped data is stacked, and whether there are multiple
    // datasets to stack.
    // TODO: only vertical stacking is currently supported. remove y-axis check
    // when horizontal stacking is supported
    return (component.props.stacked === true)
      && Util.isArrayOfArrays(component.props.data)
      && (axis === "y");
  }

  getDomainFromGroupedData(component, axis) {
    const formattedData = this.formatChildData(component.props.data);
    // find the global min and max
    const allData = _.flatten(formattedData);
    const min = _.min(_.pluck(allData, axis));
    const max = _.max(_.pluck(allData, axis));
    if (this._isStackedComponentData(component, axis)) {
      // find the cumulative max and min for stacked chart types
      // TODO: clean up cumulative max / min check assumptions.
      const cumulativeMax =  _.reduce(formattedData[0], (memo, data, index) => {
        const total =  _.reduce(formattedData, (memo, dataset) => {
          return dataset[index][axis] > 0 ? memo + dataset[index][axis] : memo;
        }, 0);
        return total > memo ? total : memo;
      }, 0);
      const cumulativeMin =  _.reduce(formattedData[0], (memo, data, index) => {
        const total =  _.reduce(formattedData, (memo, dataset) => {
          return dataset[index][axis] < 0 ? memo + dataset[index][axis] : memo;
        }, 0);
        return total > memo ? total : memo;
      }, 0);
      return [_.min([min, cumulativeMin]), _.max([max, cumulativeMax])];
    }
    return [min, max];
  }

  getDomainFromAxis(axis) {
    const component = this.axisComponents[axis];
    if (component.props.domain) {
      return component.props.domain;
    }
    const ticks = component.props.tickValues;
    if (ticks) {
      const tickValues = Util.containsStrings(ticks) ?
        _.map(ticks, (tick) => this.stringMap[axis][tick]) : ticks;
      return [_.min(ticks), _.max(ticks)];
    } else {
      return undefined;
    }
  }

  padDomain(props, domain, axis) {
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

  getScale(props, axis) {
    let baseScale;
    if (this.props.scale) {
      baseScale = this.props.scale[axis] || this.props.scale;
    } else {
      baseScale = this.axisComponents[axis].scale;
    }
    const scale = baseScale ? baseScale.copy() : d3.scale.linear();
    scale.range(this.range[axis]);
    scale.domain(this.domain[axis]);
    return scale;
  }

  getAxisOffset(props) {
    // make the axes line up, and cross when appropriate
    const origin = {
      x: _.max([_.min(this.domain.x), 0]),
      y: _.max([_.min(this.domain.y), 0])
    };
    const orientation = {
      x: this.axisComponents.x.props.orientation || "bottom",
      y: this.axisComponents.y.props.orientation || "left"
    };
    const orientationOffset = {
      x: orientation.y === "left" ? 0 : this.style.parent.width,
      y: orientation.x === "bottom" ? this.style.parent.height : 0
    };
    return {
      x: Math.abs(orientationOffset.x - this.scale.x.call(this, origin.x)),
      y: Math.abs(orientationOffset.y - this.scale.y.call(this, origin.y))
    };
  }

  // getTickValues(props, axis) {
  //   // if tickValues are defined in props, and dont contain strings, just return them
  //   const ticks = this.axisComponents[axis].props.tickValues;

  //   const barComponent = _.filter(this.dataComponents, (child) => {
  //     return child.type.displayName === "VictoryBar";
  //   });

  //   if (ticks && !Util.containsStrings(ticks)) {
  //     return ticks;
  //   } else if (this.stringMap[axis] !== null) {
  //     // return the values from the string map
  //     return (ticks) ?
  //       _.map(ticks, (tick) => this.stringMap[axis][tick]) :
  //       _.values(this.stringMap[axis]);
  //   } else if ()

  //   else if (axis === "x" && props.categories && !Util.containsStrings(props.categories)) {
  //     // return tick values based on the bar categories
  //     return _.isArray(props.categories[0]) ?
  //       _.map(props.categories, (arr) => (_.sum(arr) / arr.length)) : props.categories;
  //   } else {
  //     // let axis determine it's own ticks
  //     return undefined;
  //   }
  // }

  // getTickFormat(props, axis) {
  //   const tickFormat = props.tickFormat && props.tickFormat[axis];
  //   const tickValues = props.tickValues && props.tickValues[axis];
  //   if (tickFormat) {
  //     return tickFormat;
  //   } else if (tickValues && !Util.containsStrings(tickValues)) {
  //     return (x) => x;
  //   } else if (this.stringMap[axis] !== null) {
  //     const tickValueArray = _.sortBy(_.values(this.stringMap[axis]), (n) => n);
  //     const invertedStringMap = _.invert(this.stringMap[axis]);
  //     const dataNames = _.map(tickValueArray, (tick) => {
  //       return invertedStringMap[tick];
  //     });
  //     // string ticks should have one tick of padding at the beginning
  //     const dataTicks = ["", ...dataNames, ""];
  //     return (x) => dataTicks[x];
  //   } else {
  //     return this.scale[axis].tickFormat();
  //   }
  // }

  // drawLine(dataset) {
  //   const animate = this.props.animate && (this.props.animate.line || this.props.animate);
  //   const {type, name, ...attrs} = dataset.attrs;
  //   const lineStyle = {data: _.merge({}, this.style.line.data, attrs)};
  //   const style = _.merge({}, {parent: this.style.parent}, this.style.line, lineStyle);
  //   return (
  //     <VictoryLine
  //       {...this.props}
  //       animate={animate}
  //       standalone={false}
  //       data={dataset.data}
  //       label={attrs.label}
  //       interpolation={attrs.interpolation || this.props.interpolation}
  //       style={style}
  //       domain={this.domain}
  //       range={this.range}
  //       ref={name}
  //       key={"line-" + dataset.index}/>
  //   );
  // }

  // drawScatter(dataset) {
  //   const animate = this.props.animate && (this.props.animate.scatter || this.props.animate);
  //   const {type, name, symbol, size, ...attrs} = dataset.attrs;
  //   const scatterStyle = {data: _.merge({}, this.style.scatter.data, attrs)};
  //   const style = _.merge({}, {parent: this.style.parent}, this.style.scatter, scatterStyle);
  //   return (
  //     <VictoryScatter
  //       {...this.props}
  //       standalone={false}
  //       style={style}
  //       domain={this.domain}
  //       range={this.range}
  //       ref={name}
  //       key={"scatter-" + dataset.index}/>
  //   );
  // }

  // drawBars(datasets, options) {
  //   const animate = this.props.animate && (this.props.animate.bar || this.props.animate);
  //   const categories = (this.stringMap.x) && _.keys(this.stringMap.x);
  //   return (
  //     <VictoryBar
  //       {...this.props}
  //       standalone={false}
  //       style={_.merge({}, {parent: this.style.parent}, this.style.bar)}
  //       domain={this.domain}
  //       range={this.range}
  //       key={"bar"}/>
  //   );
  // }

  // drawStackedBars(datasets) {
  //   return this.drawBars(datasets, {stacked: true});
  // }

  // drawAxis(axis) {
  //   const offsetY = axis === "y" ? undefined : this.axisOffset.y;
  //   const offsetX = axis === "x" ? undefined : this.axisOffset.x;
  //   const animate = this.props.animate && (this.props.animate.axis || this.props.animate);
  //   const style = _.merge({}, {parent: this.style.parent}, this.style.axis[axis]);
  //   return (
  //     <VictoryAxis
  //       {...this.props}
  //       standalone={false}
  //       offsetY={offsetY}
  //       offsetX={offsetX}
  //       crossAxis={true}
  //       scale={this.scale[axis]}
  //       domain={this.domain[axis]}
  //       range={this.range[axis]}
  //       tickValues={this.tickValues[axis]}
  //       tickFormat={this.tickFormat[axis]}
  //       style={style}/>
  //   );
  // }




  getNewProps(child) {
    const type = child.type.displayName;
    if (type === "VictoryAxis") {
      const axis = child.props.axisType;
      return {
        domain: this.domain[axis],
        range: this.range[axis],
      };
    }
    return {
      domain: this.domain,
      range: this.range,
    };

  }

  // the old ones were bad
  getNewChildren() {
    return  React.Children.map(this.props.children, (child, index) => {
      const style = _.merge({}, {parent: this.props.style}, child.props.style);
      const newProps = this.getNewProps(child);
      return React.cloneElement(child, _.merge(newProps, {
        ref: index,
        key: index,
        standalone: false,
        style: style
      }));
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