import { assign, defaults, flatten, isFunction, partialRight, uniq, some } from "lodash";
import React from "react";
import Axis from "./axis";
import { Style, Transitions, Collection, Data, Domain, Events } from "victory-core";


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
    const horizontal = props && props.horizontal || horizontalChildren;
    const groupComponent = childComponents.filter((child) => {
      return child.type && child.type.role && child.type.role === "group";
    });

    if (groupComponent.length < 1) {
      return undefined;
    }
    const { offset, children } = groupComponent[0].props;
    const defaultDomainPadding = horizontal ?
      { y: (offset * children.length) / 2 } :
      { x: (offset * children.length) / 2 };
    return defaultDomainPadding[axis];
  },

  getDomain(props, axis, childComponents) {
    childComponents = childComponents || React.Children.toArray(props.children);
    const propsDomain = Domain.getDomainFromProps(props, axis);
    const domainPadding = props.polar ?
      0 : this.getDefaultDomainPadding(props, axis, childComponents);
    let domain;
    if (propsDomain) {
      domain = propsDomain;
    } else {
      const dataset = (props.data || props.y) && Data.getData(props);
      const dataDomain = dataset ? Domain.getDomainFromData(props, axis, dataset) : [];
      const childDomain = this.getDomainFromChildren(props, axis, childComponents);
      const min = Collection.getMinValue([...dataDomain, ...childDomain]);
      const max = Collection.getMaxValue([...dataDomain, ...childDomain]);
      domain = [min, max];
    }
    const paddedDomain = Domain.padDomain(domain, assign({ domainPadding }, props), axis);
    return Domain.cleanDomain(paddedDomain, props, axis);
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

      const continuous = !props.polar && some(oldChildren, (child) => {
        return isContinuous(child) || child.props.children && isContinuous(child.props.children);
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
        childrenTransitions: Collection.isArrayOfArrays(childrenTransitions) ?
          childrenTransitions[0] : childrenTransitions,
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
      return Array.isArray(props.events) ?
        this.componentEvents.concat(...props.events) : this.componentEvents;
    }
    return props.events;
  },

  getAnimationProps(props, child, index) {
    if (!props.animate) {
      return child.props.animate;
    }
    const getFilteredState = () => {
      let childrenTransitions = this.state && this.state.childrenTransitions;
      childrenTransitions = Collection.isArrayOfArrays(childrenTransitions) ?
        childrenTransitions[index] : childrenTransitions;
      return defaults({ childrenTransitions }, this.state);
    };

    let getTransitions = props.animate && props.animate.getTransitions;
    const state = getFilteredState();
    const parentState = props.animate && props.animate.parentState || state;
    if (!getTransitions) {
      const getTransitionProps = Transitions.getTransitionPropsFactory(
        props,
        state,
        (newState) => this.setState(newState)
      );
      getTransitions = partialRight(getTransitionProps, index);
    }
    return defaults({ getTransitions, parentState }, props.animate, child.props.animate);
  },

  getDomainFromChildren(props, axis, childComponents) { // eslint-disable-line max-statements, complexity, max-len
    const childDomains = [];
    let childDomainsLength = 0;

    const children = childComponents
      ? childComponents.slice(0)
      : React.Children.toArray(props.children);
    let childrenLength = children.length;

    const horizontalChildren = childComponents.some((component) => {
      return component.props && component.props.horizontal;
    });
    const horizontal = props && props.horizontal || horizontalChildren.length > 0;
    const currentAxis = Axis.getCurrentAxis(axis, horizontal);

    const parentData = props.data ? Data.getData(props, axis) : undefined;
    const { polar, startAngle, endAngle } = props;
    const parentProps = parentData ?
      { data: parentData, polar, startAngle, endAngle } : { polar, startAngle, endAngle };

    while (childrenLength > 0) {
      const child = children[--childrenLength];

      if (child.type && isFunction(child.type.getDomain)) {
        const sharedProps = assign({}, child.props, parentProps);
        const childDomain = child.props && child.type.getDomain(sharedProps, currentAxis);
        if (childDomain) {
          const childDomainLength = childDomain.length;
          for (let index = 0; index < childDomainLength; index++) {
            childDomains[childDomainsLength++] = childDomain[index];
          }
        }
      } else if (child.props && child.props.children) {
        const newChildren = React.Children.toArray(child.props.children);
        const newChildrenLength = newChildren.length;
        for (let index = 0; index < newChildrenLength; index++) {
          children[childrenLength++] = newChildren[index];
        }
      }
    }
    const min = Collection.getMinValue(childDomains);
    const max = Collection.getMaxValue(childDomains);
    return childDomains.length === 0 ?
      [0, 1] : [min, max];
  },

  getDataFromChildren(props, childComponents) { // eslint-disable-line max-statements
    const getData = (childProps) => {
      const data = Data.getData(childProps);
      return Array.isArray(data) && data.length > 0 ? data : undefined;
    };

    // Reverse the child array to maintain correct order when looping over
    // children starting from the end of the array.
    const children = childComponents
      ? childComponents.slice(0).reverse()
      : React.Children.toArray(props.children).reverse();

    let childrenLength = children.length;

    const dataArr = [];
    let dataArrLength = 0;
    while (childrenLength > 0) {
      const child = children[--childrenLength];
      if (child.type && child.type.role === "axis") {
        dataArrLength = dataArrLength;
      } else if (child.type && child.type.role !== "axis" && isFunction(child.type.getData)) {
        dataArr[dataArrLength++] = child.type.getData(child.props);
      } else if (child.props && child.props.children) {
        const newChildren = React.Children.toArray(child.props.children);
        const newChildrenLength = newChildren.length;
        for (let index = 0; index < newChildrenLength; index++) {
          children[childrenLength++] = newChildren[index];
        }
      } else {
        dataArr[dataArrLength++] = getData(child.props);
      }
    }

    return dataArr;
  },

  getStackedDomain(props, axis) {
    const propsDomain = Domain.getDomainFromProps(props, axis);
    if (propsDomain) {
      return propsDomain;
    }
    const { horizontal } = props;
    const ensureZero = (domain) => {
      const isDependent = (axis === "y" && !horizontal) || (axis === "x" && horizontal);
      return isDependent ?
        [Collection.getMinValue(domain, 0), Collection.getMaxValue(domain, 0)] : domain;
    };
    const datasets = this.getDataFromChildren(props);
    return ensureZero(Domain.getDomainFromGroupedData(props, axis, datasets));
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
    const colors = Array.isArray(colorScale) ?
      colorScale : Style.getColorScale(colorScale);
    return color || colors[index % colors.length];
  },

  getWidth(props) {
    const { datasets, scale, horizontal } = props;
    const range = horizontal ? scale.y.range() : scale.x.range();
    const extent = Math.abs(range[1] - range[0]);
    const bars = datasets.length * (datasets[0].length || 1) + 2;
    const barRatio = 0.5;
    return { width: Math.round(barRatio * extent / bars) };
  },

  getChildStyle(child, index, calculatedProps) {
    const { style, role } = calculatedProps;
    const childStyle = child.props.style || {};
    if (Array.isArray(childStyle)) {
      return childStyle;
    }
    const childRole = child.type && child.type.role;
    const defaultFill = childRole === "stack" ?
      undefined : this.getColor(calculatedProps, child, index);
    const defaultColor = childRole === "line" ?
      { fill: "none", stroke: defaultFill } : { fill: defaultFill };
    const dataWidth = role === "stack" ? {} : this.getWidth(calculatedProps);
    const dataStyle = defaults(
      {}, childStyle.data, assign({}, dataWidth, style.data, defaultColor)
    );
    const labelsStyle = defaults({}, childStyle.labels, style.labels);
    return {
      parent: style.parent,
      data: dataStyle,
      labels: labelsStyle
    };
  },

  getStringsFromCategories(childComponents, axis) { // eslint-disable-line max-statements
    const strings = [];
    let stringsLength = 0;

    const children = childComponents.slice(0).reverse();
    let childrenLength = children.length;

    while (childrenLength > 0) {
      const child = children[--childrenLength];

      if (child.props && child.props.categories) {
        const newStrings = Data.getStringsFromCategories(child.props, axis);
        const newStringsLength = newStrings.length;
        for (let index = 0; index < newStringsLength; index++) {
          strings[stringsLength++] = newStrings[index];
        }
      } else if (child.props && child.props.children) {
        const newChildren = React.Children.toArray(child.props.children);
        const newChildrenLength = newChildren.length;
        for (let index = 0; index < newChildrenLength; index++) {
          children[childrenLength++] = newChildren[index];
        }
      }
    }

    return strings;
  },

  getStringsFromData(childComponents, axis) { // eslint-disable-line max-statements
    const strings = [];
    let stringsLength = 0;

    const children = childComponents.slice(0).reverse();
    let childrenLength = children.length;

    while (childrenLength > 0) {
      const child = children[--childrenLength];

      if (child.props && child.props.data) {
        const newStrings = Data.getStringsFromData(child.props, axis);
        const newStringsLength = newStrings.length;
        for (let index = 0; index < newStringsLength; index++) {
          strings[stringsLength++] = newStrings[index];
        }
      } else if (child.type && isFunction(child.type.getData)) {
        const data = flatten(child.type.getData(child.props));
        const attr = axis === "x" ? "xName" : "yName";
        for (let index = 0; index < data.length; index++) {
          const datum = data[index];
          if (datum[attr]) {
            strings[stringsLength++] = datum[attr];
          }
        }
      } else if (child.props && child.props.children) {
        const newChildren = React.Children.toArray(child.props.children);
        const newChildrenLength = newChildren.length;
        for (let index = 0; index < newChildrenLength; index++) {
          children[childrenLength++] = newChildren[index];
        }
      }
    }

    return strings;
  },

  getStringsFromChildren(props, axis, childComponents) {
    childComponents = childComponents || React.Children.toArray(props.children);
    const axisComponent = Axis.getAxisComponent(childComponents, axis);
    const axisStrings = axisComponent ? Data.getStringsFromAxes(axisComponent.props, axis) : [];
    const categoryStrings = this.getStringsFromCategories(childComponents, axis);
    const dataStrings = this.getStringsFromData(childComponents, axis);
    return uniq(flatten([...categoryStrings, ...dataStrings, ...axisStrings]));
  },

  getCategories(props, axis) {
    const categories = Data.getCategories(props, axis) ||
      this.getStringsFromChildren(props, axis);
    return categories.length > 0 ? categories : undefined;
  },

  getY0(datum, index, calculatedProps) {
    if (datum.y0) {
      return datum.y0;
    }
    const { datasets } = calculatedProps;
    const y = datum._y;
    const previousDataSets = datasets.slice(0, index);
    const previousPoints = previousDataSets.reduce((prev, dataset) => {
      return prev.concat(dataset
        .filter((previousDatum) => datum._x instanceof Date
          ? previousDatum._x.getTime() === datum._x.getTime()
          : previousDatum._x === datum._x)
        .map((previousDatum) => previousDatum._y || 0)
      );
    }, []);
    const y0 = previousPoints.length && previousPoints.reduce((memo, value) => {
      const sameSign = (y < 0 && value < 0) || (y >= 0 && value >= 0);
      return sameSign ? +value + memo : memo;
    }, 0);
    return previousPoints.some((point) => point instanceof Date) ? new Date(y0) : y0;
  }
};
