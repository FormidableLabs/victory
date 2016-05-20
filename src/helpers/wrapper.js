import { defaults, flatten, isFunction, partialRight, uniq } from "lodash";
import React from "react";
import Data from "./data";
import Domain from "./domain";
import { Style, Transitions, Collection } from "victory-core";


export default {
  getData(props) {
    const childComponents = React.Children.toArray(props.children);
    return childComponents.map((child) => {
      const getData = child.type.getData || Data.getData;
      return getData(child.props);
    });
  },

  setAnimationState(nextProps) {
    if (!this.props.animate) {
      return;
    }
    if (this.props.animate.parentState) {
      const nodesWillExit = this.props.animate.parentState.nodesWillExit;
      const oldProps = nodesWillExit ? this.props : null;
      this.setState(defaults({oldProps}, this.props.animate.parentState));
    } else {
      const oldChildren = React.Children.toArray(this.props.children);
      const nextChildren = React.Children.toArray(nextProps.children);
      const {
        nodesWillExit,
        nodesWillEnter,
        childrenTransitions,
        nodesShouldEnter
      } = Transitions.getInitialTransitionState(oldChildren, nextChildren);

      this.setState({
        nodesWillExit,
        nodesWillEnter,
        childrenTransitions,
        nodesShouldEnter,
        oldProps: nodesWillExit ? this.props : null
      });
    }
  },

  getAnimationProps(props, child, index) {
    if (!props.animate) {
      return child.props.animate;
    }
    const getFilteredState = () => {
      let childrenTransitions = this.state && this.state.childrenTransitions;
      childrenTransitions = Collection.isArrayOfArrays(childrenTransitions) ?
        childrenTransitions[index] : childrenTransitions;
      return defaults({childrenTransitions}, this.state);
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
    return defaults({getTransitions, parentState}, props.animate, child.props.animate);
  },

  getDomainFromChildren(props, axis) {
    const getChildDomains = (children, axis) => {
      return children.reduce((memo, child) => {
        if (child.type && isFunction(child.type.getDomain)) {
          const childDomain = child.props && child.type.getDomain(child.props, axis);
          return childDomain ? memo.concat(childDomain) : memo;
        } else if (child.props && child.props.children) {
          return memo.concat(getChildDomains(React.Children.toArray(child.props.children), axis));
        }
        return memo;
      }, []);
    };

    const childComponents = React.Children.toArray(props.children);
    let domain;
    if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
      domain = Array.isArray(props.domain) ? props.domain : props.domain[axis];
    } else {
      const childDomains = getChildDomains(childComponents, axis);
      domain = childDomains.length === 0 ?
        [0, 1] : [Math.min(...childDomains), Math.max(...childDomains)];
    }
    return Domain.padDomain(domain, props, axis);
  },



  getStackedDomain(props, axis) {
    const propsDomain = Domain.getDomainFromProps(props, axis);
    if (propsDomain) {
      return Domain.padDomain(propsDomain, props, axis);
    }
    const ensureZero = (domain) => {
      return axis === "y" ? [Math.min(...domain, 0), Math.max(... domain, 0)] : domain;
    };
    const childComponents = React.Children.toArray(props.children);
    const getData = (child) => child.type.getData(child.props) || Data.getData(child.props);
    const datasets = childComponents.map((child) => {
      return child.props.children ?
        React.Children.toArray(child.props.children).map((ch) => getData(ch)) : getData(child);
    });
    const dataDomain = ensureZero(Domain.getDomainFromGroupedData(props, axis, datasets));
    return Domain.padDomain(dataDomain, props, axis);
  },

  getChildData(children) {
    return children.map((child) => {
      if (child.type && isFunction(child.type.getData)) {
        return child.type.getData(child.props);
      } else if (child.props.children) {
        return getChildData(React.Children.toArray(child.props.children))
      }
    });
  },

  getColor(calculatedProps, index) {
    // check for styles first
    const { style, colorScale } = calculatedProps;
    if (style && style.data && style.data.fill) {
      return style.data.fill;
    }
    const colors = Array.isArray(colorScale) ?
      colorScale : Style.getColorScale(colorScale);
    return colors[index % colors.length];
  },

  getChildStyle(child, index, calculatedProps) {
    const { style } = calculatedProps;
    const role = child.type && child.type.role;
    const defaultFill = role === "group-wrapper" || role === "stack-wrapper" ?
      undefined : this.getColor(calculatedProps, index);
    const childStyle = child.props.style || {};
    const dataStyle = defaults({}, childStyle.data, style.data, {fill: defaultFill});
    const labelsStyle = defaults({}, childStyle.labels, style.labels);
    return {
      parent: style.parent,
      data: dataStyle,
      labels: labelsStyle
    };
  },

  getStringsFromChildren(props, axis) {
    const childComponents = React.Children.toArray(props.children);
    const categoryStrings = childComponents.reduce((prev, component) => {
      const categoryData = Data.getStringsFromCategories(component.props, axis);
      return categoryData ? prev.concat(categoryData) : prev;
    }, []);
    const dataStrings = childComponents.reduce((prev, component) => {
      const stringData = Data.getStringsFromData(component.props, axis);
      return stringData ? prev.concat(stringData) : prev;
    }, []);
    return uniq(flatten([...categoryStrings, ...dataStrings]));
  },

  getCategories(props, axis) {
    const categories = Data.getCategories(props, axis) ||
      this.getStringsFromChildren(props, axis);
    return categories.length > 0 ? categories : undefined;
  },

  getY0(datum, index, calculatedProps) {
    const { datasets } = calculatedProps;
    const y = datum.y;
    const previousDataSets = datasets.slice(0, index);
    const previousPoints = previousDataSets.reduce((prev, dataset) => {
      return prev.concat(dataset
        .filter((previousDatum) => datum.x instanceof Date
          ? previousDatum.x.getTime() === datum.x.getTime()
          : previousDatum.x === datum.x)
        .map((previousDatum) => previousDatum.y || 0)
      );
    }, []);
    return previousPoints.reduce((memo, value) => {
      const sameSign = (y < 0 && value < 0) || (y >= 0 && value >= 0);
      return sameSign ? memo + value : memo;
    }, 0);
  }
};
