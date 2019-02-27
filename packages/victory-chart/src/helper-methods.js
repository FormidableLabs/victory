/* eslint-disable func-style */
/* eslint-disable no-use-before-define */

import React from "react";
import { Helpers, Scale, Axis, Wrapper } from "victory-core";
import { defaults, assign } from "lodash";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

function getAxisProps(child, props, calculatedProps) {
  const { domain, scale, stringMap, categories, horizontal, orientations } = calculatedProps;
  const childProps = child.props || {};
  const axis = child.type.getAxis(assign({ horizontal }, childProps));
  const axisOffset = horizontal
    ? getHorizontalAxisOffset(props, calculatedProps)
    : getAxisOffset(props, calculatedProps);
  const crossAxis = childProps.crossAxis === false ? false : true;
  const orientation = childProps.orientation || orientations[axis];
  return {
    stringMap,
    horizontal,
    categories,
    startAngle: props.startAngle,
    endAngle: props.endAngle,
    innerRadius: props.innerRadius,
    domain,
    scale,
    offsetY: childProps.offsetY !== undefined ? childProps.offsetY : axisOffset.y,
    offsetX: childProps.offsetX !== undefined ? childProps.offsetX : axisOffset.x,
    crossAxis,
    orientation
  };
}

function getChildProps(child, props, calculatedProps) {
  const axisChild = Axis.findAxisComponents([child]);
  if (axisChild.length > 0) {
    return getAxisProps(axisChild[0], props, calculatedProps);
  }
  const { categories, domain, range, scale, stringMap, horizontal } = calculatedProps;
  return { categories, domain, range, scale, stringMap, horizontal };
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

function getOrientation(axis, originSign, horizontal) {
  const sign = originSign || "positive";
  const orientations = {
    positive: { x: "bottom", y: "left" },
    negative: { x: "top", y: "right" }
  };
  const horizontalOrientations = {
    positive: { x: "left", y: "bottom" },
    negative: { x: "right", y: "top" }
  };
  return horizontal ? horizontalOrientations[sign][axis] : orientations[sign][axis];
}

function getCalculatedProps(props, childComponents) {
  const style = getStyles(props);
  props = Helpers.modifyProps(props, fallbackProps, "chart");
  const { horizontal, polar } = props;
  const categories = Wrapper.getCategories(props, childComponents);
  const stringMap = createStringMap(props, childComponents);
  const domain = {
    x: getDomain(assign({}, props, { categories }), "x", childComponents),
    y: getDomain(assign({}, props, { categories }), "y", childComponents)
  };
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const baseScale = {
    x: Scale.getScaleFromProps(props, "x") || Wrapper.getScale(props, "x"),
    y: Scale.getScaleFromProps(props, "y") || Wrapper.getScale(props, "y")
  };
  const scale = {
    x: baseScale.x.domain(domain.x).range(horizontal ? range.y : range.x),
    y: baseScale.y.domain(domain.y).range(horizontal ? range.x : range.y)
  };
  const origin = polar ? Helpers.getPolarOrigin(props) : Axis.getOrigin(domain);

  const originSign = {
    x: Axis.getOriginSign(origin.x, domain.x),
    y: Axis.getOriginSign(origin.y, domain.y)
  };

  const orientations = {
    x: getOrientation("x", originSign.y, horizontal),
    y: getOrientation("y", originSign.x, horizontal)
  };

  const padding = Helpers.getPadding(props);

  return {
    categories,
    domain,
    range,
    horizontal,
    scale,
    stringMap,
    style,
    origin,
    padding,
    orientations
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
  return childComponents;
};

const getDomain = (props, axis, childComponents) => {
  childComponents = childComponents || React.Children.toArray(props.children);
  const domain = Wrapper.getDomain(props, axis, childComponents);
  const axisComponent = Axis.getAxisComponent(childComponents, axis);
  const invertDomain = axisComponent && axisComponent.props && axisComponent.props.invertAxis;
  return invertDomain ? domain.concat().reverse() : domain;
};

const getAxisOffset = (props, calculatedProps) => {
  const { scale, origin, domain, padding, orientations } = calculatedProps;
  const { top, bottom, left, right } = padding;
  // make the axes line up, and cross when appropriate
  const orientationOffset = {
    y: orientations.x === "bottom" ? bottom : top,
    x: orientations.y === "left" ? left : right
  };
  const originOffset = {
    x: orientations.y === "left" ? 0 : props.width,
    y: orientations.x === "bottom" ? props.height : 0
  };

  const originPosition = {
    x: origin.x === domain.x[0] || origin.x === domain.x[1] ? 0 : scale.x(origin.x),
    y: origin.y === domain.y[0] || origin.y === domain.y[1] ? 0 : scale.y(origin.y)
  };

  return {
    x: originPosition.x ? Math.abs(originOffset.x - originPosition.x) : orientationOffset.x,
    y: originPosition.y ? Math.abs(originOffset.y - originPosition.y) : orientationOffset.y
  };
};

const getHorizontalAxisOffset = (props, calculatedProps) => {
  const { scale, origin, domain, padding, orientations } = calculatedProps;
  const { top, bottom, left, right } = padding;
  // make the axes line up, and cross when appropriate
  const orientationOffset = {
    x: orientations.y === "bottom" ? bottom : top,
    y: orientations.x === "left" ? left : right
  };
  const originOffset = {
    y: orientations.x === "left" ? 0 : props.width,
    x: orientations.y === "bottom" ? props.height : 0
  };

  const originPosition = {
    x: origin.x === domain.x[0] || origin.x === domain.x[1] ? 0 : scale.x(origin.x),
    y: origin.y === domain.y[0] || origin.y === domain.y[1] ? 0 : scale.y(origin.y)
  };

  return {
    y: originPosition.x ? Math.abs(originOffset.x - originPosition.x) : orientationOffset.x,
    x: originPosition.y ? Math.abs(originOffset.y - originPosition.y) : orientationOffset.y
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
