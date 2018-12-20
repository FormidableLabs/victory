import {
  assign,
  defaults,
  flatten,
  isFunction,
  uniq,
  some,
  groupBy,
  values,
  isPlainObject
} from "lodash";
import React from "react";
import Axis from "./axis";
import Style from "./style";
import Transitions from "./transitions";
import Data from "./data";
import Domain from "./domain";
import Events from "./events";
import Collection from "./collection";
import Helpers from "./helpers";

export default {
  getData(props, childComponents) {
    if (props.data) {
      return Data.getData(props);
    }
    childComponents = childComponents || React.Children.toArray(props.children);
    return this.getDataFromChildren(childComponents);
  },

  getDefaultDomainPadding(props, axis, childComponents) {
    const horizontalChildren = childComponents.some((component) => {
      return component.props && component.props.horizontal;
    });
    const horizontal = (props && props.horizontal) || horizontalChildren;
    const groupComponent = childComponents.filter((child) => {
      return child.type && child.type.role && child.type.role === "group";
    });

    if (groupComponent.length < 1) {
      return undefined;
    }
    const { offset, children } = groupComponent[0].props;
    const defaultDomainPadding = horizontal
      ? { y: (offset * children.length) / 2 }
      : { x: (offset * children.length) / 2 };
    return defaultDomainPadding[axis];
  },

  getDomain(props, axis, childComponents) {
    childComponents = childComponents || React.Children.toArray(props.children);
    const propsDomain = Domain.getDomainFromProps(props, axis);
    const minDomain = Domain.getMinFromProps(props, axis);
    const maxDomain = Domain.getMaxFromProps(props, axis);
    const domainPadding = props.polar
      ? 0
      : this.getDefaultDomainPadding(props, axis, childComponents);
    let domain;
    if (propsDomain) {
      domain = propsDomain;
    } else {
      const dataset = (props.data || props.y) && Data.getData(props);
      const dataDomain = dataset ? Domain.getDomainFromData(props, axis, dataset) : [];
      const childDomain = this.getDomainFromChildren(props, axis, childComponents);
      const min = minDomain || Collection.getMinValue([...dataDomain, ...childDomain]);
      const max = maxDomain || Collection.getMaxValue([...dataDomain, ...childDomain]);
      domain = Domain.getDomainFromMinMax(min, max);
    }
    return Domain.formatDomain(domain, assign({ domainPadding }, props), axis);
  },

  setAnimationState(props, nextProps) {
    if (!props.animate) {
      return;
    }
    if (props.animate.parentState) {
      const nodesWillExit = props.animate.parentState.nodesWillExit;
      const oldProps = nodesWillExit ? props : null;
      this.setState(defaults({ oldProps, nextProps }, props.animate.parentState));
    } else {
      const oldChildren = React.Children.toArray(props.children);
      const nextChildren = React.Children.toArray(nextProps.children);
      const isContinuous = (child) => {
        const check = (c) => c.type && c.type.continuous;
        return Array.isArray(child) ? some(child, check) : check(child);
      };

      const continuous =
        !props.polar &&
        some(oldChildren, (child) => {
          return (
            isContinuous(child) || (child.props.children && isContinuous(child.props.children))
          );
        });
      const {
        nodesWillExit,
        nodesWillEnter,
        childrenTransitions,
        nodesShouldEnter
      } = Transitions.getInitialTransitionState(oldChildren, nextChildren);

      this.setState({
        nodesWillExit,
        nodesWillEnter,
        nodesShouldEnter,
        childrenTransitions: Collection.isArrayOfArrays(childrenTransitions)
          ? childrenTransitions[0]
          : childrenTransitions,
        oldProps: nodesWillExit ? props : null,
        nextProps,
        continuous
      });
    }
  },

  getAllEvents(props) {
    const components = ["groupComponent", "containerComponent", "labelComponent"];
    this.componentEvents = Events.getComponentEvents(props, components);
    if (Array.isArray(this.componentEvents)) {
      return Array.isArray(props.events)
        ? this.componentEvents.concat(...props.events)
        : this.componentEvents;
    }
    return props.events;
  },

  getAnimationProps(props, child, index) {
    if (!props.animate) {
      return child.props.animate;
    }
    const getFilteredState = () => {
      let childrenTransitions = this.state && this.state.childrenTransitions;
      childrenTransitions = Collection.isArrayOfArrays(childrenTransitions)
        ? childrenTransitions[index]
        : childrenTransitions;
      return defaults({ childrenTransitions }, this.state);
    };

    let getTransitions = props.animate && props.animate.getTransitions;
    const state = getFilteredState();
    const parentState = (props.animate && props.animate.parentState) || state;
    if (!getTransitions) {
      const getTransitionProps = Transitions.getTransitionPropsFactory(props, state, (newState) =>
        this.setState(newState)
      );
      getTransitions = (childComponent) => getTransitionProps(childComponent, index);
    }
    return defaults({ getTransitions, parentState }, props.animate, child.props.animate);
  },

  getDomainFromChildren(props, axis, childComponents) {
    // eslint-disable-line max-statements, complexity, max-len
    const children = childComponents
      ? childComponents.slice(0)
      : React.Children.toArray(props.children);
    const horizontalChildren = childComponents.some((component) => {
      return component.props && component.props.horizontal;
    });
    const horizontal = (props && props.horizontal) || horizontalChildren.length > 0;
    const currentAxis = Axis.getCurrentAxis(axis, horizontal);
    const parentData = props.data ? Data.getData(props, axis) : undefined;
    const { polar, startAngle, endAngle, categories, minDomain, maxDomain } = props;
    const baseParentProps = { polar, startAngle, endAngle, categories, minDomain, maxDomain };
    const parentProps = parentData
      ? assign(baseParentProps, { data: parentData })
      : baseParentProps;

    const iteratee = (child) => {
      const sharedProps = assign({}, child.props, parentProps);
      if (!Domain.isDomainComponent(child)) {
        return null;
      } else if (child.type && isFunction(child.type.getDomain)) {
        return child.props && child.type.getDomain(sharedProps, currentAxis);
      } else {
        return Domain.getDomain(sharedProps, currentAxis);
      }
    };
    const childDomains = Helpers.reduceChildren(children, iteratee, props);

    const min = childDomains.length === 0 ? 0 : Collection.getMinValue(childDomains);
    const max = childDomains.length === 0 ? 1 : Collection.getMaxValue(childDomains);
    return [min, max];
  },

  getDataFromChildren(props, childComponents) {
    const { polar, startAngle, endAngle, categories, minDomain, maxDomain } = props;
    const parentProps = { polar, startAngle, endAngle, categories, minDomain, maxDomain };

    let stack = 0;
    const iteratee = (child, childName, parent) => {
      const childProps = assign({}, child.props, parentProps);
      let childData;
      if (!Data.isDataComponent(child)) {
        return null;
      } else if (child.type && isFunction(child.type.getData)) {
        child = parent ? React.cloneElement(child, parent.props) : child;
        childData = child.type.getData(childProps);
      } else {
        childData = Data.getData(childProps);
      }
      stack += 1;
      return childData.map((datum) => assign({ stack }, datum));
    };
    const children = childComponents
      ? childComponents.slice(0)
      : React.Children.toArray(props.children);
    const stacked = children.filter((c) => c.type && c.type.role === "stack").length;
    const datasets = Helpers.reduceChildren(children, iteratee, props);
    const group = stacked ? "eventKey" : "stack";
    return values(groupBy(datasets, group));
  },

  getColor(calculatedProps, child, index) {
    // check for styles first
    const { style } = calculatedProps;
    let { colorScale, color } = calculatedProps;
    if (style && style.data && style.data.fill) {
      return style.data.fill;
    }
    colorScale = child.props && child.props.colorScale ? child.props.colorScale : colorScale;
    color = child.props && child.props.color ? child.props.color : color;
    if (!colorScale && !color) {
      return undefined;
    }
    const colors = Array.isArray(colorScale) ? colorScale : Style.getColorScale(colorScale);
    return color || colors[index % colors.length];
  },

  getWidth(props) {
    const { datasets, scale, horizontal } = props;
    const range = horizontal ? scale.y.range() : scale.x.range();
    const extent = Math.abs(range[1] - range[0]);
    const seriesLength = Array.isArray(datasets[0]) ? datasets[0].length : 1;
    const bars = datasets.length * seriesLength + 2;
    const barRatio = 0.5;
    return { width: Math.round((barRatio * extent) / bars) };
  },

  getStyle(theme, style, role) {
    const defaultStyle = theme && theme[role] && theme[role].style ? theme[role].style : {};
    return Helpers.getStyles(style, defaultStyle);
  },

  getChildStyle(child, index, calculatedProps) {
    const { style, role } = calculatedProps;
    const childStyle = child.props.style || {};
    if (Array.isArray(childStyle)) {
      return childStyle;
    }
    const childRole = child.type && child.type.role;
    const defaultFill =
      childRole === "stack" ? undefined : this.getColor(calculatedProps, child, index);
    const defaultColor =
      childRole === "line" ? { fill: "none", stroke: defaultFill } : { fill: defaultFill };
    const dataWidth = role === "stack" ? {} : this.getWidth(calculatedProps);
    const dataStyle = defaults(
      {},
      childStyle.data,
      assign({}, dataWidth, style.data, defaultColor)
    );
    const labelsStyle = defaults({}, childStyle.labels, style.labels);
    return {
      parent: style.parent,
      data: dataStyle,
      labels: labelsStyle
    };
  },

  getStringsFromCategories(childComponents, axis) {
    const iteratee = (child) => {
      const childProps = child.props || {};
      if (!Domain.isDomainComponent(child) || !childProps.categories) {
        return null;
      } else {
        const categories =
          childProps.categories && !Array.isArray(childProps.categories)
            ? childProps.categories[axis]
            : childProps.rops.categories;
        const categoryStrings = categories && categories.filter((val) => typeof val === "string");
        return categoryStrings ? Collection.removeUndefined(categoryStrings) : [];
      }
    };
    return Helpers.reduceChildren(childComponents.slice(0), iteratee);
  },

  getStringsFromData(childComponents, axis) {
    const iteratee = (child) => {
      const childProps = child.props || {};
      let data;
      if (!Data.isDataComponent(child)) {
        return null;
      } else if (child.type && isFunction(child.type.getData)) {
        data = child.type.getData(childProps);
      } else {
        data = Data.getData(childProps);
      }
      const attr = axis === "x" ? "xName" : "yName";
      return data.map((d) => d[attr]).filter(Boolean);
    };
    return Helpers.reduceChildren(childComponents.slice(0), iteratee);
  },

  getStringsFromChildren(props, axis, childComponents) {
    const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
    childComponents = childComponents || React.Children.toArray(props.children);
    const categories = isPlainObject(props.categories) ? props.categories[axis] : props.categories;
    const axisComponent = Axis.getAxisComponent(childComponents, currentAxis);
    const axisStrings = axisComponent ? Data.getStringsFromAxes(axisComponent.props, axis) : [];
    const categoryStrings = categories || this.getStringsFromCategories(childComponents, axis);
    const dataStrings = this.getStringsFromData(childComponents, axis);
    return uniq(flatten([...categoryStrings, ...dataStrings, ...axisStrings]));
  },

  getCategories(props, axis) {
    const propCategories =
      props.categories && !Array.isArray(props.categories)
        ? props.categories[axis]
        : props.categories;
    const categories = propCategories || this.getStringsFromChildren(props, axis);
    return categories.length > 0 ? categories : undefined;
  }
};
