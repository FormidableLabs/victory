import React from "react";
import Radium from "radium";
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
  x: <VictoryAxis independentAxis orientation="bottom" animate={{velocity: 0.02}}/>,
  y: <VictoryAxis orientation="left" animate={{velocity: 0.02}}/>
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
    }),
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * given, all children defined in chart will pass the options specified in this prop to
     * victory-animation, unless they have animation props of their own specified.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {line: {delay: 5, velocity: 10, onEnd: () => alert("woo!")}}
     */
    animate: React.PropTypes.object
  };

  static defaultProps = {
    standalone: true
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
    this.groupedDataTypes = ["VictoryBar"];
    this.childComponents = this.getChildComponents(props);
    this.dataComponents = this.getDataComponents();
    this.groupedDataComponents = this.getGroupedDataComponents();
    this.axisComponents = {
      x: this.getAxisComponents("x")[0],
      y: this.getAxisComponents("y")[0]
    };
    this.stringMap = {
      x: this.createStringMap("x"),
      y: this.createStringMap("y")
    };
    this.domain = {};
    this.domain.x = this.getDomain(props, "x");
    this.domain.y = this.getDomain(props, "y");
    this.scale = {
      x: this.getScale(props, "x"),
      y: this.getScale(props, "y")
    };
    this.tickValues = {
      x: this.getTickValues("x"),
      y: this.getTickValues("y")
    };
    this.tickFormat = {
      x: this.getTickFormat("x"),
      y: this.getTickFormat("y")
    };
    this.axisOffset = this.getAxisOffset(props);
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

  getAxisType(child) {
    const type = child.type.displayName;
    if (type !== "VictoryAxis") {
      return undefined;
    }
    return child.props.independentAxis ? "x" : "y";
  }

  getChildComponents(props) {
    // set up a counter for component types
    const count = () => {
      const counts = {};
      return {
        add: (child) => {
          const type = child.type.displayName;
          const axis = this.getAxisType(child);
          if (!counts[type]) {
            counts[type] = axis ? {x: 0, y: 0} : 0;
          }
          if (axis) {
            counts[type][axis] = counts[type][axis] += 1;
          } else {
            counts[type] = counts[type] += 1;
          }

        },
        limitReached: (child) => {
          const type = child.type.displayName;
          const axis = this.getAxisType(child);
          if (!counts[type]) {
            return false;
          } else if (axis) {
            return counts[type][axis] > 1;
          } else if (_.includes(this.groupedDataTypes, type)) {
            // TODO: should we remove the limit on grouped data types?
            return counts[type] > 1;
          }
          return false;
        },
        total: (type, axis) => {
          const totalCount = (axis && counts[type]) ?
            counts[type][axis] : counts[type];
          return totalCount || 0;
        }
      };
    }();

    const childComponents = [];
    // loop through children, and add each child to the childComponents array
    // unless the limit for that child type has already been reached.
    React.Children.forEach(props.children, (child) => {
      const type = child.type.displayName;
      if (count.limitReached(child)) {
        const msg = type === "VictoryAxis" ?
          "Only one VictoryAxis component of each axis type is allowed when using the " +
          "VictoryChart wrapper. Only the first axis will be used. Please compose " +
          "multi-axis charts manually" :
          "Only one " + type + "component is allowed per chart. If you are trying " +
          "to plot several datasets, please pass an array of data arrays directly " +
          "into " + type + ".";
        log.warn(msg);
      }
      childComponents.push(child);
      count.add(child);
    });

    // Add default axis components if necessary
    // TODO: should we add both axes by default?
    if (count.total("VictoryAxis", "x") < 1) { childComponents.push(defaultAxes.x); }
    if (count.total("VictoryAxis", "y") < 1) { childComponents.push(defaultAxes.y); }

    // Add defaut data if no data is provided
    const dataComponents = _.filter(childComponents, (child) => {
      return child.type.displayName !== "VictoryAxis";
    });

    if (dataComponents.length === 0) { childComponents.push(defaultData); }
    return childComponents;
  }

  getDataComponents() {
    return _.filter(this.childComponents, (child) => {
      const type = child.type.displayName;
      return !_.includes(this.groupedDataTypes, type) && type !== "VictoryAxis";
    });
  }

  getGroupedDataComponents() {
    return _.filter(this.childComponents, (child) => {
      const type = child.type.displayName;
      return _.includes(this.groupedDataTypes, type);
    });
  }

  getAxisComponents(axis) {
    return _.filter(this.childComponents, (child) => {
      return axis === "x" ?
      child.props.independentAxis && child.type.displayName === "VictoryAxis" :
      child.type.displayName === "VictoryAxis" && !child.props.independentAxis;
    });
  }

  createStringMap(axis) {
    // if tick values exist and are strings, create a map using those strings
    // dont alter the order.
    const tickMap = this._getStringsFromAxes(axis);

    // if categories exist in grouped data, create a string map based on
    // categories which preserves order
    const categoryMap = this._getStringsFromCategories(axis);

    // collect all the strings from data and x / y props, and return a
    // unique sorted set of strings
    const dataStrings = this._getStringsFromData(axis);

    return _.isEmpty(dataStrings) ?
      tickMap || categoryMap || null :
      _.zipObject(_.map(dataStrings, (string, index) => {
        const tickValue = tickMap && tickMap[string];
        const categoryValue = categoryMap && categoryMap[string];
        const value = tickValue || categoryValue || index + 1;
        return [string, value];
      }));
  }

  _getStringsFromAxes(axis) {
    const axisComponent = this.axisComponents[axis];
    const tickValues = axisComponent.props.tickValues ?
      axisComponent.props.tickValues[axis] || axisComponent.props.tickValues : undefined;
    return (tickValues && Util.containsStrings(tickValues)) ?
      _.zipObject(_.map(tickValues, (tick, index) => {
        return ["" + tick, index + 1];
      })) : undefined;
  }

  _getStringsFromCategories(axis) {
    // TODO categories only apply to x for bar at the moment.
    if (this.groupedDataComponents && axis === "x") {
      const allCategories = _.map(this.groupedDataComponents, (component) => {
        const categories = component.props.categories;
        return (categories && Util.containsStrings(categories)) ? categories : undefined;
      });
      const stringCategories = _.compact(_.flatten(allCategories));
      return _.isEmpty(stringCategories) ? undefined :
        _.zipObject(_.map(stringCategories, (category, index) => {
          return ["" + category, index + 1];
        }));
    }
  }

  _getStringsFromData(axis) {
    // Collect strings from dataComponents and groupDataComponents props.data
    const allChildData = this.dataComponents.concat(this.groupedDataComponents);
    const allStrings = [];
    const allData = _.map(allChildData, (dataComponent) => {
      return dataComponent.props.data;
    });

    // collect strings from allData
    if (allData) {
      const data = _.flattenDeep(allData);
      const stringData = _.chain(data)
        .pluck(axis)
        .map((datum) => {
          return _.isString(datum) ? datum : null;
        })
        .value();
      allStrings.push(stringData);
    }
    // collect strings from  data components props x or props y
    const allXYData = _.map(allChildData, (dataComponent) => {
      return dataComponent.props[axis];
    });
    if (allXYData) {
      _.each(_.flattenDeep(allXYData), (element) => {
        if (_.isString(element)) {
          allStrings.push(element);
        }
      });
    }
    // create a unique, sorted set of strings
    return _.chain(allStrings)
      .flatten()
      .compact()
      .uniq()
      .sort()
      .value();
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
    };
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
      _.flattenDeep(dataDomains.concat(groupedDataDomains, axisDomain))
    );
    const domain = _.isEmpty(domainFromChildren) ?
      [0, 1] : [_.min(domainFromChildren), _.max(domainFromChildren)];
    const paddedDomain = this.padDomain(props, domain, axis);
    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = axis === "x" ? "y" : "x";
    const orientation = this.axisComponents[otherAxis].props.orientation;
    return orientation === "bottom" || orientation === "left" ?
      paddedDomain : paddedDomain.concat().reverse();
  }

  getDomainFromData(component, axis) {
    // TODO refactor for code cleanliness
    let dataByAxis;
    if (component.props.domain) {
      return component.props.domain[axis] || component.props.domain;
    } else if (component.props.data) {
      const formattedData = this.formatChildData(component.props.data);
      dataByAxis = _.map(_.flatten(formattedData), (data) => {
        return data[axis];
      });
    } else if (component.props[axis]) {
      dataByAxis = _.isFunction(component.props[axis]) ?
        _.pluck(this.generateData(component), axis) : component.props[axis];
    }
    return dataByAxis ? [_.min(dataByAxis), _.max(dataByAxis)] : undefined;
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
    if (component.props.domain) {
      return component.props.domain[axis] || component.props.domain;
    } else if (component.props.categories && axis === "x") {
      // TODO support y-axis categories for horizontal bars
      return this.getDomainFromCategories(component, axis);
    }
    const formattedData = this.formatChildData(component.props.data);
    // find the global min and max
    const allData = _.flatten(formattedData);
    const min = _.min(_.pluck(allData, axis));
    const max = _.max(_.pluck(allData, axis));
    if (this._isStackedComponentData(component, axis)) {
      // find the cumulative max and min for stacked chart types
      // TODO: clean up cumulative max / min check assumptions.
      const cumulativeMax = _.reduce(formattedData, (memo, dataset) => {
        const localMax = (_.max(_.pluck(dataset, "y")));
        return localMax > 0 ? memo + localMax : memo;
      }, 0);
      const cumulativeMin = _.reduce(formattedData, (memo, dataset) => {
        const localMin = (_.min(_.pluck(dataset, "y")));
        return localMin < 0 ? memo + localMin : memo;
      }, 0);
      return [_.min([min, cumulativeMin]), _.max([max, cumulativeMax])];
    }
    return [min, max];
  }

  getDomainFromCategories(component, axis) {
    // TODO: axis is currently always x
    const categories = _.flatten(component.props.categories);
    const categoryValues = Util.containsStrings(categories) ?
      _.map(categories, (value) => this.stringMap[axis][value]) : categories;
    return [_.min(categoryValues), _.max(categoryValues)];
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
      return [_.min(tickValues), _.max(tickValues)];
    } else {
      return undefined;
    }
  }

  padDomain(props, domain, axis) {
    const domainPadding = props.domainPadding ?
      props.domainPadding[axis] || props.domainPadding : null;
    if (!_.isNumber(domainPadding) || domainPadding === 0) {
      return domain;
    }
    const min = _.min(domain);
    const max = _.max(domain);
    const rangeExtent = Math.abs(_.max(this.range[axis]) - _.min(this.range[axis]));
    const extent = Math.abs(max - min);
    const percentPadding = domainPadding / rangeExtent;
    const padding = extent * percentPadding;
    // don't make the axes cross if they aren't already
    const adjustedMin = (min >= 0 && (min - padding) <= 0) ? 0 : min - padding;
    const adjustedMax = (max <= 0 && (max + padding) >= 0) ? 0 : max + padding;
    return [adjustedMin, adjustedMax];
  }

  getScale(props, axis) {
    let baseScale;
    if (this.props.scale) {
      // if scale is provided to chart, prefer it
      baseScale = this.props.scale[axis] || this.props.scale;
    } else {
      // otherwise use whatever scale the axis uses, (default: d3.scale.linear)
      baseScale = this.axisComponents[axis].props.scale;
    }
    const scale = baseScale.copy();
    scale.range(this.range[axis]);
    scale.domain(this.domain[axis]);
    return scale;
  }

  getAxisOffset() {
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
    const calculatedOffset = {
      x: Math.abs(orientationOffset.x - this.scale.x.call(this, origin.x)),
      y: Math.abs(orientationOffset.y - this.scale.y.call(this, origin.y))
    };
    return {
      x: this.axisComponents.x.offsetX || calculatedOffset.x,
      y: this.axisComponents.y.offsetY || calculatedOffset.y
    };
  }

  getTickValues(axis) {
    let ticks;
    const stringMap = this.stringMap[axis];
    // if tickValues are defined for an axis component use them
    if (this.axisComponents[axis].props.tickValues) {
      const axisTicks = this.axisComponents[axis].props.tickValues;
      ticks = Util.containsOnlyStrings(ticks) && stringMap ?
        _.map(axisTicks, (tick) => stringMap[tick]) : axisTicks;
    } else if (!_.isEmpty(this.groupedDataComponents) && axis === "x") {
      // otherwise, creat a set of tickValues base on groupedData categories
      // TODO: support categories for x and y
      const allCategoryTicks = _.map(this.groupedDataComponents, (component) => {
        const categories = component.props.categories;
        return categories && Util.isArrayOfArrays(categories) ?
          _.map(categories, (arr) => (_.sum(arr) / arr.length)) : categories;
      });
      const categoryTicks = _.uniq(_.flatten(allCategoryTicks));
      ticks = Util.containsOnlyStrings(categoryTicks) ?
        _.map(categoryTicks, (tick) => stringMap[tick]) : categoryTicks;
    } else if (stringMap) {
      // otherwise use the values from the string map
      ticks = _.values(stringMap);
    }
    // when ticks is undefined, axis will determine it's own ticks
    return ticks;
  }

  getTickFormat(axis) {
    const tickFormat = this.axisComponents[axis].props.tickFormat;
    const tickValues = this.tickValues[axis];
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

  generateData(child) {
    if (!child.props.y) {
      return undefined;
    }
    const generateX = (component) => {
      const domain = this.domain.x;
      const samples = _.isArray(component.props.y) ? component.props.y.length : 50;
      const step = _.max(domain) / samples;
      // return an array of x values spaced across the domain,
      // include the maximum of the domain
      return _.union(_.range(_.min(domain), _.max(domain), step), [_.max(domain)]);
    };
    const y = child.props.y;
    const xArray = child.props.x || generateX(child);
    if (_.isFunction(y)) {
      return _.map(xArray, (x) => {
        return {x, y: y(x)};
      });
    } else {
      const n = _.min([xArray.length, y.length]);
      return _.map(_.take(xArray, n), (x, index) => {
        return { x, y: y[index]};
      });
    }
  }

  getNewProps(child) {
    const type = child.type.displayName;
    const animate = child.props.animate || this.props.animate;
    if (type === "VictoryAxis") {
      const axis = child.props.independentAxis ? "x" : "y";
      const offsetY = axis === "y" ? undefined : this.axisOffset.y;
      const offsetX = axis === "x" ? undefined : this.axisOffset.x;
      return {
        animate,
        domain: this.domain[axis],
        range: this.range[axis],
        scale: this.scale[axis],
        tickValues: this.tickValues[axis],
        tickFormat: this.tickFormat[axis],
        offsetY,
        offsetX,
        crossAxis: true
      };
    } else if (_.includes(this.groupedDataTypes, type)) {
      const categories = this.stringMap.x && _.keys(this.stringMap.x);
      return {
        animate,
        domain: this.domain,
        range: this.range,
        scale: this.scale,
        categories: child.props.categories || categories
      };
    }
    const data = !child.props.data && child.props.y ? this.generateData(child) : undefined;
    return {
      data,
      animate,
      domain: this.domain,
      range: this.range,
      scale: this.scale
    };
  }

  // the old ones were bad
  getNewChildren() {
    return _.map(this.childComponents, (child, index) => {
      const style = _.merge({}, {parent: this.props.style}, child.props.style);
      const newProps = this.getNewProps(child);
      return React.cloneElement(child, _.merge({}, newProps, {
        ref: index,
        key: index,
        standalone: false,
        style
      }));
    });
  }

  render() {
    return (
      <svg style={this.style.parent}>
        {this.getNewChildren()}
      </svg>
    );
  }
}
