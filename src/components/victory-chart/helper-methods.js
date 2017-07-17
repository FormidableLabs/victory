import { invert, sortBy, values } from "lodash";
import Axis from "../../helpers/axis";
import Wrapper from "../../helpers/wrapper";
import React from "react";
import { Helpers, Collection, Log, Domain } from "victory-core";

const identity = (x) => x;

export default {
  getChildComponents(props, defaultAxes) {
    const childComponents = React.Children.toArray(props.children);
    if (childComponents.length === 0) {
      return [defaultAxes.independent, defaultAxes.dependent];
    }

    const axisComponents = {
      dependent: Axis.getAxisComponentsWithParent(childComponents, "dependent"),
      independent: Axis.getAxisComponentsWithParent(childComponents, "independent")
    };

    if (axisComponents.dependent.length === 0 && axisComponents.independent.length === 0) {
      return childComponents.concat([defaultAxes.independent, defaultAxes.dependent]);
    }
    if (axisComponents.independent.length > 1) {
      const msg = "Only one independent VictoryAxis component is allowed when " +
        "using the VictoryChart wrapper. Only the first axis will be used. Please compose " +
        "multi-axis charts manually";
      Log.warn(msg);
      const dataComponents = this.getDataComponents(childComponents);
      return Collection.removeUndefined(
        dataComponents.concat([...axisComponents.dependent, axisComponents.independent[0]])
      );
    }
    return childComponents;
  },

  getDefaultDomainPadding(childComponents, horizontal) {
    const groupComponent = childComponents.filter((child) => {
      return child.type && child.type.role && child.type.role === "group-wrapper";
    });

    if (groupComponent.length < 1) {
      return undefined;
    }

    const { offset, children } = groupComponent[0].props;
    return horizontal ?
      { y: (offset * children.length) / 2 } :
      { x: (offset * children.length) / 2 };
  },

  getDataComponents(childComponents) {
    const findDataComponents = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && child.type.role === "axis") {
          return memo;
        } else if (child.props && child.props.children) {
          return memo.concat(findDataComponents(React.Children.toArray(child.props.children)));
        }
        return memo.concat(child);
      }, []);
    };

    return findDataComponents(childComponents);
  },

  getDomain(props, axis, childComponents) {
    childComponents = childComponents || React.Children.toArray(props.children);
    const domain = Wrapper.getDomain(props, axis, childComponents);
    const orientations = Axis.getAxisOrientations(childComponents);
    return Domain.orientDomain(domain, orientations, axis);
  },

  getAxisOffset(props, calculatedProps) {
    const { axisComponents, scale, origin, originSign } = calculatedProps;
    // make the axes line up, and cross when appropriate
    const axisOrientations = {
      x: Axis.getOrientation(axisComponents.x, "x", originSign.x),
      y: Axis.getOrientation(axisComponents.y, "y", originSign.y)
    };
    const orientationOffset = {
      x: axisOrientations.y === "left" ? 0 : props.width,
      y: axisOrientations.x === "bottom" ? props.height : 0
    };
    const calculatedOffset = {
      x: Math.abs(orientationOffset.x - scale.x(origin.x)),
      y: Math.abs(orientationOffset.y - scale.y(origin.y))
    };

    return {
      x: axisComponents.x && axisComponents.x.offsetX !== undefined ?
        axisComponents.x.offsetX : calculatedOffset.x,
      y: axisComponents.y && axisComponents.y.offsetY !== undefined ?
        axisComponents.y.offsetY : calculatedOffset.y
    };
  },

  getTicksFromData(calculatedProps, axis) {
    const currentAxis = Helpers.getCurrentAxis(axis, calculatedProps.horizontal);
    const stringMap = calculatedProps.stringMap[currentAxis];
    // if tickValues are defined for an axis component use them
    const categoryArray = calculatedProps.categories[currentAxis];
    const ticksFromCategories = categoryArray && Collection.containsOnlyStrings(categoryArray) ?
      categoryArray.map((tick) => stringMap[tick]) : categoryArray;
    const ticksFromStringMap = stringMap && values(stringMap);
    // when ticks is undefined, axis will determine its own ticks
    return ticksFromCategories && ticksFromCategories.length !== 0 ?
      ticksFromCategories : ticksFromStringMap;
  },

  getTicksFromAxis(calculatedProps, axis, component) {
    const tickValues = component.props.tickValues;
    if (!tickValues) {
      return undefined;
    }
    const currentAxis = Helpers.getCurrentAxis(axis, calculatedProps.horizontal);
    const stringMap = calculatedProps.stringMap[currentAxis];
    return Collection.containsOnlyStrings(tickValues) && stringMap ?
      tickValues.map((tick) => stringMap[tick]) : tickValues;
  },

  getTicks(...args) {
    return this.getTicksFromAxis(...args) || this.getTicksFromData(...args);
  },

  getTickFormat(component, axis, calculatedProps) {
    const currentAxis = Helpers.getCurrentAxis(axis, calculatedProps.horizontal);
    const stringMap = calculatedProps.stringMap[currentAxis];
    const tickValues = component.props.tickValues;
    const useIdentity = tickValues && !Collection.containsStrings(tickValues) &&
      !Collection.containsDates(tickValues);
    if (useIdentity) {
      return identity;
    } else if (stringMap !== null) {
      const tickValueArray = sortBy(values(stringMap), (n) => n);
      const invertedStringMap = invert(stringMap);
      const dataNames = tickValueArray.map((tick) => invertedStringMap[tick]);
      // string ticks should have one tick of padding at the beginning
      const dataTicks = ["", ...dataNames, ""];
      return (x) => dataTicks[x];
    } else {
      return undefined;
    }
  },

  createStringMap(props, axis, childComponents) {
    const allStrings = Wrapper.getStringsFromChildren(props, axis, childComponents);
    return allStrings.length === 0 ? null :
      allStrings.reduce((memo, string, index) => {
        memo[string] = index + 1;
        return memo;
      }, {});
  }
};
