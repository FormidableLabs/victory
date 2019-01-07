/* eslint-disable func-style */
/* eslint-disable no-use-before-define */

import React from "react";
import { Log, Helpers, Scale, Axis, Wrapper } from "victory-core";
import { defaults, assign } from "lodash";

function getAxisProps(child, props, calculatedProps) {
  const { domain, scale, originSign, stringMap, categories, horizontal } = calculatedProps;
  const childProps = child.props || {};
  const axis = child.type.getAxis(childProps);
  const currentAxis = Axis.getCurrentAxis(axis, horizontal);
  const otherAxis = axis === "x" ? "y" : "x";
  const axisOffset = getAxisOffset(props, calculatedProps);
  const offsetY = axis === "y" ? undefined : axisOffset.y;
  const offsetX = axis === "x" ? undefined : axisOffset.x;
  const crossAxis = childProps.crossAxis === false ? false : true;
  const orientation = Axis.getOrientation(child, axis, originSign[otherAxis]);
  return {
    stringMap: stringMap[currentAxis],
    categories: categories[currentAxis],
    startAngle: props.startAngle,
    endAngle: props.endAngle,
    innerRadius: props.innerRadius,
    domain,
    scale,
    offsetY: childProps.offsetY !== undefined ? childProps.offsetY : offsetY,
    offsetX: childProps.offsetX !== undefined ? childProps.offsetX : offsetX,
    crossAxis,
    orientation
  };
}

function getChildProps(child, props, calculatedProps) {
  const axisChild = Axis.findAxisComponents([child]);
  if (axisChild.length > 0) {
    return getAxisProps(axisChild[0], props, calculatedProps);
  }
  const { categories, domain, range, scale } = calculatedProps;
  return { categories, domain, range, scale };
}

function getStyles(props) {
  const styleProps = props.style && props.style.parent;
  return {
    parent: defaults({}, styleProps, {
      height: "100%",
      width: "100%",
      userSelect: "none"
    })
  };
}

function getCalculatedProps(props, childComponents) {
  const style = getStyles(props);
  const horizontal = Helpers.isHorizontal(props);
  // TODO: check
  const categories = Wrapper.getCategories(props, childComponents);

  const stringMap = createStringMap(props, childComponents);

  const axisComponents = {
    x: Axis.getAxisComponent(childComponents, "x"),
    y: Axis.getAxisComponent(childComponents, "y")
  };
  const domain = {
    x: getDomain(assign({}, props, { categories }), "x", childComponents),
    y: getDomain(assign({}, props, { categories }), "y", childComponents)
  };
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const baseScale = {
    x:
      Scale.getScaleFromProps(props, "x") ||
      (axisComponents.x && axisComponents.x.type.getScale(axisComponents.x.props)) ||
      Scale.getDefaultScale(),
    y:
      Scale.getScaleFromProps(props, "y") ||
      (axisComponents.y && axisComponents.y.type.getScale(axisComponents.y.props)) ||
      Scale.getDefaultScale()
  };
  const scale = {
    x: baseScale.x.domain(domain.x).range(range.x),
    y: baseScale.y.domain(domain.y).range(range.y)
  };

  const origin = props.polar ? Helpers.getPolarOrigin(props) : Axis.getOrigin(domain);

  const originSign = {
    x: Axis.getOriginSign(origin.x, domain.x),
    y: Axis.getOriginSign(origin.y, domain.y)
  };

  const defaultDomainPadding = getDefaultDomainPadding(childComponents, horizontal);

  const padding = Helpers.getPadding(props);

  return {
    axisComponents,
    categories,
    domain,
    range,
    horizontal,
    scale,
    stringMap,
    style,
    origin,
    originSign,
    defaultDomainPadding,
    padding
  };
}

function getChildren(props, childComponents, calculatedProps) {
  childComponents = childComponents || getChildComponents(props);
  calculatedProps = calculatedProps || getCalculatedProps(props, childComponents);
  const baseStyle = calculatedProps.style.parent;
  const { height, polar, theme, width } = props;
  const { origin, horizontal } = calculatedProps;
  const parentName = props.name || "chart";
  return childComponents.map((child, index) => {
    const role = child.type && child.type.role;
    const style = Array.isArray(child.props.style)
      ? child.props.style
      : defaults({}, child.props.style, { parent: baseStyle });
    const childProps = getChildProps(child, props, calculatedProps);
    const name = child.props.name || `${parentName}-${role}-${index}`;
    const newProps = defaults(
      {
        horizontal,
        height,
        polar,
        theme,
        width,
        style,
        name,
        origin: polar ? origin : undefined,
        padding: calculatedProps.padding,
        key: `${name}-key-${index}`,
        standalone: false
      },
      childProps
    );

    return React.cloneElement(child, newProps);
  });
}

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

  let axisCount = 0;
  return childComponents.filter((child) => {
    const role = child.type && child.type.role;
    const childProps = child.props || {};
    if (role !== "axis" || childProps.dependentAxis) {
      return true;
    } else if (axisCount < 1) {
      axisCount++;
      return true;
    } else {
      const msg =
        "Only one independent VictoryAxis component is allowed when " +
        "using the VictoryChart wrapper. Only the first axis will be used. Please compose " +
        "multi-axis charts manually";
      Log.warn(msg);
      return false;
    }
  });
};

const getDefaultDomainPadding = (childComponents, horizontal) => {
  const groupComponent = childComponents.filter((child) => {
    return child.type && child.type.role && child.type.role === "group";
  });

  if (groupComponent.length < 1) {
    return undefined;
  }

  const { offset, children } = groupComponent[0].props;
  return horizontal ? { y: (offset * children.length) / 2 } : { x: (offset * children.length) / 2 };
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
    x:
      axisComponents.x && axisComponents.x.offsetX !== undefined
        ? axisComponents.x.offsetX
        : calculatedOffset.x,
    y:
      axisComponents.y && axisComponents.y.offsetY !== undefined
        ? axisComponents.y.offsetY
        : calculatedOffset.y
  };
};

const createStringMap = (props, childComponents) => {
  const allStrings = Wrapper.getStringsFromChildren(props, childComponents);

  const x =
    !allStrings.x || allStrings.x.length === 0
      ? null
      : allStrings.x.reduce((memo, string, index) => {
          memo[string] = index + 1;
          return memo;
        }, {});

  const y =
    !allStrings.y || allStrings.y.length === 0
      ? null
      : allStrings.y.reduce((memo, string, index) => {
          memo[string] = index + 1;
          return memo;
        }, {});

  return { x, y };
};

export { getChildren, getCalculatedProps, getChildComponents };
