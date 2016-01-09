import _ from "lodash";
import React, { PropTypes } from "react";
import Radium from "radium";
import { PropTypes as CustomPropTypes, Collection, Log, Chart, Data, Domain } from "victory-util";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";

const defaultAxes = {
  independent: <VictoryAxis animate={{velocity: 0.02}}/>,
  dependent: <VictoryAxis dependentAxis animate={{velocity: 0.02}}/>
};

const defaultData = <VictoryLine domain={{x: [0, 1], y: [0, 1]}}/>;

@Radium
export default class VictoryChart extends React.Component {
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. If this prop is
     * given, all children defined in chart will pass the options specified in this prop to
     * victory-animation, unless they have animation props of their own specified.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {velocity: 0.02, onEnd: () => alert("woo!")}
     */
    animate: PropTypes.object,
    /**
     * The domain prop describes the range of values your chart will include. This prop can be
     * given as a array of the minimum and maximum expected values for your chart,
     * or as an object that specifies separate arrays for x and y.
     * If this prop is not provided, a domain will be calculated from data, or other
     * available information.
     * @examples: [-1, 1], {x: [0, 100], y: [0, 1]}
     */
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({
        x: CustomPropTypes.domain,
        y: CustomPropTypes.domain
      })
    ]),
    /**
     * The domainPadding prop specifies a number of pixels of padding to add to the
     * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
     * from the origin to prevent crowding. This prop should be given as an object with
     * numbers specified for x and y.
     */
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: CustomPropTypes.nonNegative,
        y: CustomPropTypes.nonNegative
      }),
      CustomPropTypes.nonNegative
    ]),
    /**
     * The height props specifies the height of the chart container element in pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The padding props specifies the amount of padding in number of pixels between
     * the edge of the chart and any rendered child components. This prop can be given
     * as a number or as an object with padding specified for top, bottom, left
     * and right.
     */
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    /**
     * The scale prop determines which scales your chart should use. This prop can be
     * given as a function, or as an object that specifies separate functions for x and y.
     * @examples d3.time.scale(), {x: d3.scale.linear(), y: d3.scale.log()}
     */
    scale: PropTypes.oneOfType([
      CustomPropTypes.scale,
      PropTypes.shape({
        x: CustomPropTypes.scale,
        y: CustomPropTypes.scale
      })
    ]),
    /**
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryChart with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your chart. Victory Chart relies on Radium,
     * so valid Radium style objects should work for this prop. Height, width, and
     * padding should be specified via the height, width, and padding props, as they
     * are used to calculate the alignment of components within chart.
     * @examples {background: transparent, margin: 50}
     */
    style: PropTypes.object,
    /**
     * The width props specifies the width of the chart container element in pixels
     */
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    height: 300,
    width: 450,
    padding: 50,
    standalone: true
  };

  getComponents(props) {
    this.groupedDataTypes = ["bar"];
    this.childComponents = this.getChildComponents(props);
    this.dataComponents = this.getDataComponents();
    this.groupedDataComponents = this.getGroupedDataComponents();
    this.axisComponents = this.getAxisComponents();
  }

  getCalculatedValues() {
    this.axisOrientations = this.getAxisOrientations();
    this.independentAxis = this.axisComponents.y.props.dependentAxis ? "x" : "y";
    this.dependentAxis = this.axisComponents.y.props.dependentAxis ? "y" : "x";

  }

  getStyles(props) {
    const styleProps = props.style && props.style.parent;
    return {
      parent: _.merge({
        height: props.height,
        width: props.width
      },
      styleProps
    )};
  }

  getAxisType(child) {
    if (!child.type || child.type.role !== "axis") {
      return undefined;
    }
    return child.props.dependentAxis ? "dependent" : "independent";
  }

  getChildComponents(props) {
    // set up a counter for component types
    const count = () => {
      const counts = {};
      return {
        add: (child) => {
          const type = child.type && child.type.role;
          const axis = this.getAxisType(child);
          if (!counts[type]) {
            counts[type] = axis ? {independent: 0, dependent: 0} : 0;
          }
          if (axis) {
            counts[type][axis] = counts[type][axis] += 1;
          } else {
            counts[type] = counts[type] += 1;
          }
        },
        limitReached: (child) => {
          const type = child.type && child.type.role;
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

    if (!props.children) {
      return [defaultData, defaultAxes.independent, defaultAxes.dependent];
    }
    const childComponents = [];
    // loop through children, and add each child to the childComponents array
    // unless the limit for that child type has already been reached.
    React.Children.forEach(props.children, (child) => {
      if (!child || !child.type) { return; }
      const type = child.type && child.type.role;
      if (count.limitReached(child)) {
        const msg = type === "axis" ?
          `Only one VictoryAxis component of each axis type is allowed when using the ` +
          `VictoryChart wrapper. Only the first axis will be used. Please compose ` +
          `multi-axis charts manually` :
          `Only one " + type + "component is allowed per chart. If you are trying ` +
          `to plot several datasets, please pass an array of data arrays directly ` +
          `into ${type}.`;
        Log.warn(msg);
      }
      childComponents.push(child);
      count.add(child);
    });

    // Add default axis components if necessary
    // TODO: should we add both axes by default?
    if (count.total("axis", "independent") < 1) {
      childComponents.push(defaultAxes.independent);
    }
    if (count.total("axis", "dependent") < 1) {
      childComponents.push(defaultAxes.dependent);
    }

    // Add defaut data if no data is provided
    const dataComponents = _.filter(childComponents, (child) => {
      const type = child.type && child.type.role;
      return type !== "axis";
    });

    if (dataComponents.length === 0) { childComponents.push(defaultData); }
    return childComponents;
  }

  getDataComponents() {
    return _.filter(this.childComponents, (child) => {
      const type = child.type && child.type.role;
      return !_.includes(this.groupedDataTypes, type) && type !== "axis";
    });
  }

  getGroupedDataComponents() {
    return _.filter(this.childComponents, (child) => {
      const type = child.type && child.type.role;
      return _.includes(this.groupedDataTypes, type);
    });
  }

  getAxisComponents() {
    // TODO: currently flipped axes are only supported for bar, a groupedDataComponent
    const flippedAxes = _.some(this.groupedDataComponents, (component) => {
      return component.props.horizontal;
    });
    const typicalOrientations = {
      independent: ["top", "bottom"],
      dependent: ["left", "right"]
    };
    const typicalAxes = {independent: "x", dependent: "y"};
    const atypicalAxes = {independent: "y", dependent: "x"};
    const components = _.filter(this.childComponents, (child) => {
      const type = child.type && child.type.role;
      return type === "axis";
    });
    const componentsWithType = _.map(components, (component) => {
      return [this.getAxisType(component), component];
    });
    const axisComponents = _.zipObject(componentsWithType);
    const componentsWithOrientation = _.map(_.keys(axisComponents), (type) => {
      const component = axisComponents[type];
      const orientation = component.props.orientation;
      if (!orientation) {
        return flippedAxes ?
        [atypicalAxes[type], component] : [typicalAxes[type], component];
      }
      return (_.includes(typicalOrientations, orientation)) ?
          [atypicalAxes[type], component] : [typicalAxes[type], component];
    });
    return _.merge({}, axisComponents, _.zipObject(componentsWithOrientation));
  }

  getAxisOrientations() {
    const getDefaultOrientation = (type) => {
      return type === "independent" || type === "x" ? "bottom" : "left";
    };

    const orientations = _.map(_.keys(this.axisComponents), (type) => {
      const component = this.axisComponents[type];
      const orientation = component.props.orientation || getDefaultOrientation(type);
      return [type, orientation];
    });
    return _.zipObject(orientations);
  }

  createStringMap(axis) {
    // if tick values exist and are strings, create a map using those strings
    // dont alter the order.
    const tickValues = this.axisComponents[axis].props.tickValues;
    const tickMap = Data.getStringsFromAxes(tickValues, axis);

    // if categories exist in grouped data, create a string map based on
    // categories which preserves order
    const categories = this.groupedDataComponents.map((component) => {
      return component.props.categories;
    });
    const categoryMap = Data.getStringsFromCategories(categories, axis);

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

  _getStringsFromData(axis) {
    // Collect strings from dataComponents and groupedDataComponents props.data
    const dataComponents = this.dataComponents.concat(this.groupedDataComponents);
    const xyProps = dataComponents.map((component) => component.props[axis]);
    const dataProps = dataComponents.map((component) => component.props.data);
    const xyStrings = Data.getStringsFromXY(xyProps);
    const dataStrings = Data.getStringsFromData(dataProps, axis);
    const allStrings = [...xyStrings, ...dataStrings];
    // create a unique, sorted set of strings
    return _.chain(allStrings)
      .flatten()
      .compact()
      .uniq()
      .sort()
      .value();
  }

  getDomain(props, axis) {
    let domain;
    if (props.domain && (_.isArray(props.domain) || props.domain[axis])) {
      domain = _.isArray(props.domain) ? props.domain : props.domain[axis];
    } else {
      const childDomains = this.childComponents.map((component) => {
        return component.type.getDomain(component.props, axis);
      });
      const allDomains = Collection.removeUndefined(_.flatten(childDomains));
      domain = [Math.min(...allDomains), Math.max(...allDomains)];
    }
    const paddedPropsDomain = Domain.padDomain(domain, props, axis);
    return this.orientDomain(paddedPropsDomain, axis);
  }

  orientDomain(domain, axis) {
    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = axis === "x" ? "y" : "x";
    const orientation = this.axisOrientations[otherAxis];

    if (this.independentAxis === "x") {
      return orientation === "bottom" || orientation === "left" ?
        domain : domain.concat().reverse();
    } else {
      return orientation === "bottom" || orientation === "left" ?
        domain.concat().reverse() : domain;
    }
  }

  getScale(props, axis, domain) {
    let baseScale;
    if (props.scale && props.scale[axis]) {
      // if scale is provided to chart, prefer it
      baseScale = props.scale[axis];
    } else if (props.scale && !_.isObject(props.scale)) {
      baseScale = props.scale;
    } else {
      // otherwise use whatever scale the axis uses, (default: d3.scale.linear)
      baseScale = this.axisComponents[axis].props.scale;
    }
    const scale = baseScale.copy();
    scale.range(Chart.getRange(props, axis));
    scale.domain(domain[axis]);
    return scale;
  }

  getAxisOffset(props, calculatedProps) {
    const {domain, scale} = calculatedProps;
    // make the axes line up, and cross when appropriate
    const origin = {
      x: _.max([_.min(domain.x), 0]),
      y: _.max([_.min(domain.y), 0])
    };
    const orientation = {
      x: this.axisOrientations.x || "bottom",
      y: this.axisOrientations.y || "left"
    };
    const orientationOffset = {
      x: orientation.y === "left" ? 0 : props.width,
      y: orientation.x === "bottom" ? props.height : 0
    };
    const calculatedOffset = {
      x: Math.abs(orientationOffset.x - scale.x.call(this, origin.x)),
      y: Math.abs(orientationOffset.y - scale.y.call(this, origin.y))
    };
    return {
      x: this.axisComponents.x.offsetX || calculatedOffset.x,
      y: this.axisComponents.y.offsetY || calculatedOffset.y
    };
  }

  getTicksFromData(component, axis, calculatedProps) {
    const stringMap = calculatedProps.stringMap[axis];
    let ticksFromCategories;
    let ticksFromStringMap;
    // if tickValues are defined for an axis component use them

    if (!_.isEmpty(this.groupedDataComponents) && axis === this.independentAxis) {
      // otherwise, create a set of tickValues base on groupedData categories
      const allCategoryTicks = _.map(this.groupedDataComponents, (component) => {
        const categories = component.props.categories;
        return categories && Collection.isArrayOfArrays(categories) ?
          _.map(categories, (arr) => (_.sum(arr) / arr.length)) : categories;
      });
      const categoryTicks = _.compact(_.uniq(_.flatten(allCategoryTicks)));
      const categoryArray = _.isEmpty(categoryTicks) ? undefined : categoryTicks;
      ticksFromCategories = categoryArray && Collection.containsOnlyStrings(categoryArray) ?
        _.map(categoryTicks, (tick) => stringMap[tick]) : categoryArray;
    }
    if (stringMap) {
      // otherwise use the values from the string map
      ticksFromStringMap = _.values(stringMap);
    }
    // when ticks is undefined, axis will determine it's own ticks
    return ticksFromCategories || ticksFromStringMap;
  }

  getTicksFromAxis(component, axis, calculatedProps) {
    const tickValues = component.props.tickValues;
    if (!tickValues) {
      return undefined
    }
    const stringMap = calculatedProps.stringMap[axis];
    return Collection.containsOnlyStrings(tickValues) && stringMap ?
      tickValues.map((tick) => stringMap[tick]) : tickValues;
  }

  getTickFormat(component, axis, calculatedProps) {
    const tickValues = component.props.tickValues;
    const stringMap = calculatedProps.stringMap[axis];
    if (tickValues && !Collection.containsStrings(tickValues)) {
      return (x) => x;
    } else if (stringMap !== null) {
      const tickValueArray = _.sortBy(_.values(stringMap), (n) => n);
      const invertedStringMap = _.invert(stringMap);
      const dataNames = _.map(tickValueArray, (tick) => {
        return invertedStringMap[tick];
      });
      // string ticks should have one tick of padding at the beginning
      const dataTicks = ["", ...dataNames, ""];
      return (x) => dataTicks[x];
    } else {
      return calculatedProps.scale[axis].tickFormat();
    }
  }

  getAxisProps(child, calculatedProps) {
    const {domain, scale} = calculatedProps;
    const axis = child.props.dependentAxis ? this.dependentAxis : this.independentAxis;
    const axisOffset = this.getAxisOffset(this.props, calculatedProps);
    const tickValues = this.getTicksFromAxis(child, axis, calculatedProps) ||
      this.getTicksFromData(child, axis, calculatedProps);
    const tickFormat =
      child.props.tickFormat || this.getTickFormat(child, axis, calculatedProps);
    const offsetY = axis === "y" ? undefined : axisOffset.y;
    const offsetX = axis === "x" ? undefined : axisOffset.x;
    return {
      domain: domain[axis],
      scale: scale[axis],
      tickValues,
      tickFormat,
      offsetY,
      offsetX,
      crossAxis: true
    };
  }

  getGroupedDataProps(child, calculatedProps) {
    const {domain, scale, stringMap} = calculatedProps;
    const categoryAxis = this.independentAxis;
    const categories = stringMap[categoryAxis] && _.keys(stringMap[categoryAxis]);
    return {
      domain,
      scale,
      categories: child.props.categories || categories
    };
  }

  getDataProps(child, calculatedProps) {
    const {domain, scale} = calculatedProps;
    const data = Data.getData(_.merge({}, child.props, {domain, scale}));
    return {
      data,
      domain,
      scale
    };
  }

  getNewProps(child, calculatedProps) {
    const type = child.type && child.type.role;
    if (type === "axis") {
      return this.getAxisProps(child, calculatedProps);
    } else if (type === "bar") {
      return this.getGroupedDataProps(child, calculatedProps);
    }
    return this.getDataProps(child, calculatedProps);
  }

  getCalculatedProps(props, child) {
    const domain = {
      x: this.getDomain(props, "x"),
      y: this.getDomain(props, "y")
    };
    const scale = {
      x: this.getScale(props, "x", domain),
      y: this.getScale(props, "y", domain)
    };
    const stringMap = {
      x: this.createStringMap("x"),
      y: this.createStringMap("y")
    };
    return {domain, scale, stringMap};
  }

  // the old ones were bad
  getNewChildren(childComponents, baseStyle) {
    const calculatedProps = this.getCalculatedProps(this.props);
    return _.map(childComponents, (child, index) => {
      const style = _.merge({}, {parent: baseStyle.parent}, child.props.style);
      const newProps = this.getNewProps(child, calculatedProps);
      return React.cloneElement(child, _.merge({}, newProps, {
        animate: child.props.animate || this.props.animate,
        height: this.props.height,
        width: this.props.width,
        padding: Chart.getPadding(this.props),
        ref: index,
        key: index,
        standalone: false,
        style
      }));
    });
  }

  render() {
    this.getComponents(this.props);
    this.getCalculatedValues(this.props);
    const style = this.getStyles(this.props);
    const childComponents = this.getChildComponents(this.props);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(childComponents, style)}
      </g>
    );
    return this.props.standalone ? <svg style={style.parent}>{group}</svg> : group;
  }
}
