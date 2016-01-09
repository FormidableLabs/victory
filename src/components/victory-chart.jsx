import compact from "lodash/array/compact";
import flatten from "lodash/array/flatten";
import invert from "lodash/object/invert";
import isEmpty from "lodash/lang/isEmpty";
import keys from "lodash/object/keys";
import merge from "lodash/object/merge";
import some from "lodash/collection/some";
import sortBy from "lodash/collection/sortBy";
import sum from "lodash/math/sum";
import uniq from "lodash/array/uniq";
import values from "lodash/object/values";
import zipObject from "lodash/array/zipObject";

import React, { PropTypes } from "react";
import Radium from "radium";
import {
  PropTypes as CustomPropTypes, Collection, Log, Chart, Data, Domain, Scale
} from "victory-util";
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

  getStyles(props) {
    const styleProps = props.style && props.style.parent;
    return {
      parent: merge({
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
          } else if (type === "bar") {
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
    const dataComponents = childComponents.filter((child) => {
      const type = child.type && child.type.role;
      return type !== "axis";
    });

    if (dataComponents.length === 0) { childComponents.push(defaultData); }
    return childComponents;
  }

  getDataComponents(childComponents) {
    return childComponents.filter((child) => {
      const type = child.type && child.type.role;
      return type !== "bar" && type !== "axis";
    });
  }

  getGroupedDataComponents(childComponents) {
    return childComponents.filter((child) => {
      const type = child.type && child.type.role;
      return type === "bar";
    });
  }

  createStringMap(childComponents, axis) {
    // if tick values exist and are strings, create a map using those strings
    // dont alter the order.
    const tickValues = childComponents.axis[axis].props.tickValues;
    const tickMap = Data.getStringsFromAxes(tickValues, axis);

    // if categories exist in grouped data, create a string map based on
    // categories which preserves order
    const categories = childComponents.groupedData.map((component) => {
      return component.props.categories;
    });
    const categoryMap = Data.getStringsFromCategories(categories, axis);

    // collect all the strings from data and x / y props, and return a
    // unique sorted set of strings
    const dataStrings = this._getStringsFromData(childComponents, axis);

    return isEmpty(dataStrings) ?
      tickMap || categoryMap || null :
      zipObject(dataStrings.map((string, index) => {
        const tickValue = tickMap && tickMap[string];
        const categoryValue = categoryMap && categoryMap[string];
        const value = tickValue || categoryValue || index + 1;
        return [string, value];
      }));
  }

  _getStringsFromData(childComponents, axis) {
    // Collect strings from dataComponents and groupedDataComponents props.data
    const dataComponents = childComponents.data.concat(childComponents.groupedData);
    const xyProps = dataComponents.map((component) => component.props[axis]);
    const dataProps = dataComponents.map((component) => component.props.data);
    const xyStrings = Data.getStringsFromXY(xyProps);
    const dataStrings = Data.getStringsFromData(dataProps, axis);
    const allStrings = flatten([...xyStrings, ...dataStrings]);
    // return a unique set of strings
    return compact(uniq(allStrings));
  }

  getDomain(childComponents, axis, orientations) {
    let domain;
    if (this.props.domain && (Array.isArray(this.props.domain) || this.props.domain[axis])) {
      domain = Array.isArray(this.props.domain) ? this.props.domain : this.props.domain[axis];
    } else {
      const childDomains = childComponents.all.map((component) => {
        return component.type.getDomain(component.props, axis);
      });
      const allDomains = Collection.removeUndefined(flatten(childDomains));
      domain = [Math.min(...allDomains), Math.max(...allDomains)];
    }
    const paddedPropsDomain = Domain.padDomain(domain, this.props, axis);
    return this.orientDomain(paddedPropsDomain, axis, orientations);
  }

  orientDomain(domain, axis, orientation) {
    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = axis === "x" ? "y" : "x";
    const defaultOrientation = otherAxis === "x" ? "bottom" : "left";
    const standardOrientation = orientation[otherAxis] === defaultOrientation;
    const flippedAxis = orientation.x === "left" || orientation.x === "right";
    if (flippedAxis) {
      return standardOrientation ?
        domain.concat().reverse() : domain;
    } else {
      return standardOrientation ?
        domain : domain.concat().reverse();
    }
  }

  getScale(axisComponent, axis, domain) {
    const propsScale = Scale.getScaleFromProps(this.props, axis);
      // otherwise use whatever scale the axis uses, (default: d3.scale.linear)
    const axisScale = axisComponent.type.getScale(axisComponent.props);
    const scale = propsScale || axisScale;
    scale.range(Chart.getRange(this.props, axis));
    scale.domain(domain[axis]);
    return scale;
  }

  getAxisOffset(calculatedProps, axisComponents) {
    const {domain, axisOrientations, scale} = calculatedProps;
    // make the axes line up, and cross when appropriate
    const origin = {
      x: Math.max(Math.min(...domain.x), 0),
      y: Math.max(Math.min(...domain.y), 0)
    };
    const orientationOffset = {
      x: axisOrientations.y === "left" ? 0 : this.props.width,
      y: axisOrientations.x === "bottom" ? this.props.height : 0
    };
    const calculatedOffset = {
      x: Math.abs(orientationOffset.x - scale.x.call(this, origin.x)),
      y: Math.abs(orientationOffset.y - scale.y.call(this, origin.y))
    };
    return {
      x: axisComponents.x.offsetX || calculatedOffset.x,
      y: axisComponents.y.offsetY || calculatedOffset.y
    };
  }

  getCategories(groupedComponents) {
    if (isEmpty(groupedComponents)) {
      return undefined;
    }
    // otherwise, create a set of tickValues base on groupedData categories
    const allCategories = groupedComponents.map((component) => {
      const categories = component.props.categories;
      return categories && Collection.isArrayOfArrays(categories) ?
        categories.map((arr) => (sum(arr) / arr.length)) : categories;
    });
    const uniqueCategories = compact(uniq(flatten(allCategories)));
    return isEmpty(uniqueCategories) ? undefined : uniqueCategories;
  }

  getTicksFromData(component, axis, calculatedProps) {
    const stringMap = calculatedProps.stringMap[axis];
    // if tickValues are defined for an axis component use them
    const categoryArray = calculatedProps.categories[axis];
    const ticksFromCategories = categoryArray && Collection.containsOnlyStrings(categoryArray) ?
      categoryArray.map((tick) => stringMap[tick]) : categoryArray;
    const ticksFromStringMap = stringMap && values(stringMap);
    // when ticks is undefined, axis will determine it's own ticks
    return ticksFromCategories || ticksFromStringMap;
  }

  getTicksFromAxis(component, axis, calculatedProps) {
    const tickValues = component.props.tickValues;
    if (!tickValues) {
      return undefined;
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
      const tickValueArray = sortBy(values(stringMap), (n) => n);
      const invertedStringMap = invert(stringMap);
      const dataNames = tickValueArray.map((tick) => invertedStringMap[tick]);
      // string ticks should have one tick of padding at the beginning
      const dataTicks = ["", ...dataNames, ""];
      return (x) => dataTicks[x];
    } else {
      return calculatedProps.scale[axis].tickFormat();
    }
  }

  getAxisProps(child, calculatedProps, childComponents) {
    const {domain, scale} = calculatedProps;
    const axis = child.type.getAxis(child.props);
    const axisOffset = this.getAxisOffset(calculatedProps, childComponents.axis);
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
    const {domain, flipped, scale, stringMap} = calculatedProps;
    const categoryAxis = flipped ? "y" : "x";
    const categories = stringMap[categoryAxis] && keys(stringMap[categoryAxis]);
    return {
      domain,
      scale,
      categories: child.props.categories || categories
    };
  }

  getDataProps(child, calculatedProps) {
    const {domain, scale} = calculatedProps;
    const data = Data.getData(merge({}, child.props, {domain, scale}));
    return {
      data,
      domain,
      scale
    };
  }

  getNewProps(child, calculatedProps, childComponents) {
    const type = child.type && child.type.role;
    if (type === "axis") {
      return this.getAxisProps(child, calculatedProps, childComponents);
    } else if (type === "bar") {
      return this.getGroupedDataProps(child, calculatedProps);
    }
    return this.getDataProps(child, calculatedProps);
  }

  getCalculatedProps(childComponents) {
    const flipped = some(childComponents.all, (component) => component.props.horizontal);
    const axisOrientations = {
      x: this.getAxisOrientation(childComponents.axis.x, "x"),
      y: this.getAxisOrientation(childComponents.axis.y, "y")
    };
    const domain = {
      x: this.getDomain(childComponents, "x", axisOrientations),
      y: this.getDomain(childComponents, "y", axisOrientations)
    };
    const scale = {
      x: this.getScale(childComponents.axis.x, "x", domain),
      y: this.getScale(childComponents.axis.y, "y", domain)
    };
    const stringMap = {
      x: this.createStringMap(childComponents, "x"),
      y: this.createStringMap(childComponents, "y")
    };
    // TODO: check
    const categories = {
      x: this.getCategories(childComponents.groupedData, "x"),
      y: this.getCategories(childComponents.groupedData, "y")
    };
    return {axisOrientations, categories, domain, flipped, scale, stringMap};
  }

  // the old ones were bad
  getNewChildren(childComponents, baseStyle) {
    const calculatedProps = this.getCalculatedProps(childComponents);
    return childComponents.all.map((child, index) => {
      const style = merge({}, {parent: baseStyle.parent}, child.props.style);
      const newProps = this.getNewProps(child, calculatedProps, childComponents);
      return React.cloneElement(child, merge({}, newProps, {
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

  getAxisComponent(childComponents, axis) {
    const getAxis = (component) => {
      const flipped = some(childComponents, (child) => child.props.horizontal);
      return component.type.getAxis(component.props, flipped);
    };
    const axisComponents = childComponents.filter((component) => {
      return component.type.role === "axis" && getAxis(component) === axis;
    });
    return axisComponents[0];
  }

  getAxisOrientation(component, axis) {
    if (component.props.orientation) {
      return component.props.orientation;
    }
    const typicalOrientations = {x: "bottom", y: "left"};
    const flippedOrientations = {x: "left", y: "bottom"};
    const dependent = component.props.dependentAxis;
    return (dependent && axis === "y") || (!dependent && axis === "x") ?
      typicalOrientations[axis] : flippedOrientations[axis];
  }

  getAllComponents(props) {
    const all = this.getChildComponents(props);
    const axis = {
      x: this.getAxisComponent(all, "x"),
      y: this.getAxisComponent(all, "y")
    };
    const data = this.getDataComponents(all);
    const groupedData = this.getGroupedDataComponents(all);
    return { all, axis, data, groupedData };
  }

  render() {
    const style = this.getStyles(this.props);
    // const allChildren = this.getAllComponents(this.props);
    const childComponents = this.getAllComponents(this.props);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(childComponents, style)}
      </g>
    );
    return this.props.standalone ? <svg style={style.parent}>{group}</svg> : group;
  }
}
