import Axis from "../../helpers/axis";
import Wrapper from "../../helpers/wrapper";
import React from "react";
import { Collection, Log } from "victory-core";

const getDataComponents = (childComponents) => {
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
};

const getChildComponents = (props, defaultAxes) => {
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
    const dataComponents = getDataComponents(childComponents);
    return Collection.removeUndefined(
      dataComponents.concat([...axisComponents.dependent, axisComponents.independent[0]])
    );
  }
  return childComponents;
};

const getDefaultDomainPadding = (childComponents, horizontal) => {
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
};

const getDomain = (props, axis, childComponents) => {
  childComponents = childComponents || React.Children.toArray(props.children);
  const domain = Wrapper.getDomain(props, axis, childComponents);
  const axisComponent = Axis.getAxisComponent(childComponents, axis);
  const invertDomain = axisComponent && axisComponent.props && axisComponent.props.invertAxis;
  return invertDomain ? domain.concat().reverse() : domain;
};

// eslint-disable-next-line complexity
const getAxisOffset = (props, calculatedProps) => {
  const { axisComponents, scale, origin, domain, originSign, padding } = calculatedProps;
  const { top, bottom, left, right } = padding;
  // make the axes line up, and cross when appropriate
  const axisOrientations = {
    x: Axis.getOrientation(axisComponents.x, "x", originSign.y),
    y: Axis.getOrientation(axisComponents.y, "y", originSign.x)
  };
  const orientationOffset = {
    y: axisOrientations.x === "bottom" ? bottom : top,
    x: axisOrientations.y === "left" ? left : right
  };
  const originOffset = {
    x: axisOrientations.y === "left" ? 0 : props.width,
    y: axisOrientations.x === "bottom" ? props.height : 0
  };
  const originPosition = {
    x: origin.x === domain.x[0] || origin.x === domain.x[1] ? 0 : scale.x(origin.x),
    y: origin.y === domain.y[0] || origin.y === domain.y[1] ? 0 : scale.y(origin.y)
  };
  const calculatedOffset = {
    x: originPosition.x ? Math.abs(originOffset.x - originPosition.x) : orientationOffset.x,
    y: originPosition.y ? Math.abs(originOffset.y - originPosition.y) : orientationOffset.y
  };

  return {
    x: axisComponents.x && axisComponents.x.offsetX !== undefined ?
      axisComponents.x.offsetX : calculatedOffset.x,
    y: axisComponents.y && axisComponents.y.offsetY !== undefined ?
      axisComponents.y.offsetY : calculatedOffset.y
  };
};

const createStringMap = (props, axis, childComponents) => {
  const allStrings = Wrapper.getStringsFromChildren(props, axis, childComponents);
  return allStrings.length === 0 ? null :
    allStrings.reduce((memo, string, index) => {
      memo[string] = index + 1;
      return memo;
    }, {});
};

export { getDomain,
  getAxisOffset,
  getDataComponents,
  getChildComponents,
  getDefaultDomainPadding,
  createStringMap
};
