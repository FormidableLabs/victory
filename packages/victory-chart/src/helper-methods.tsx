import React from "react";
import { Helpers, Scale, Axis, Wrapper } from "victory-core";
import defaults from "lodash/defaults";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
};

function getAxisProps(child, props, calculatedProps) {
  const { domain, scale, stringMap, categories, horizontal } = calculatedProps;
  return {
    stringMap,
    horizontal,
    categories,
    startAngle: props.startAngle,
    endAngle: props.endAngle,
    innerRadius: props.innerRadius,
    domain,
    scale,
  };
}

export function getBackgroundWithProps(props, calculatedProps) {
  const backgroundElement = props.backgroundComponent;

  const height = props.polar
    ? calculatedProps.range.y[1]
    : calculatedProps.range.y[0] - calculatedProps.range.y[1];
  const width = calculatedProps.range.x[1] - calculatedProps.range.x[0];

  const xScale = props.horizontal
    ? calculatedProps.scale.y.range()[0]
    : calculatedProps.scale.x.range()[0];
  const yScale = props.horizontal
    ? calculatedProps.scale.x.range()[1]
    : calculatedProps.scale.y.range()[1];

  const xCoordinate = props.polar ? calculatedProps.origin.x : xScale;
  const yCoordinate = props.polar ? calculatedProps.origin.y : yScale;
  const parentName = props.name || "chart";

  const backgroundProps = {
    height,
    polar: props.polar,
    scale: calculatedProps.scale,
    style: props.style.background,
    x: xCoordinate,
    y: yCoordinate,
    key: `${parentName}-background`,
    width,
  };

  return React.cloneElement(
    backgroundElement,
    defaults({}, backgroundElement.props, backgroundProps),
  );
}

function getChildProps(child, props, calculatedProps) {
  const axisChild = Axis.findAxisComponents([child]);
  if (axisChild.length > 0) {
    return getAxisProps(axisChild[0], props, calculatedProps);
  }
  const { categories, domain, range, scale, stringMap, horizontal } =
    calculatedProps;
  return { categories, domain, range, scale, stringMap, horizontal };
}

function getStyles(props) {
  const styleProps = props.style && props.style.parent;

  return {
    parent: defaults({}, styleProps, {
      height: "100%",
      width: "100%",
      userSelect: "none",
    }),
  };
}

export function getCalculatedProps(initialProps, childComponents) {
  const style = getStyles(initialProps);
  const props = Helpers.modifyProps(initialProps, fallbackProps, "chart");
  const { horizontal, polar } = props;
  const allStrings = Wrapper.getStringsFromChildren(props, childComponents);
  const categories = Wrapper.getCategories(props, childComponents, allStrings);
  const stringMap = createStringMap(props, childComponents, allStrings);
  const domain = {
    x: getDomain(
      Object.assign({}, props, { categories }),
      "x",
      childComponents,
    ),
    y: getDomain(
      Object.assign({}, props, { categories }),
      "y",
      childComponents,
    ),
  };

  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y"),
  };
  const baseScale = {
    x: Scale.getScaleFromProps(props, "x") || Wrapper.getScale(props, "x"),
    y: Scale.getScaleFromProps(props, "y") || Wrapper.getScale(props, "y"),
  };
  const scale = {
    x: baseScale.x.domain(domain.x).range(horizontal ? range.y : range.x),
    y: baseScale.y.domain(domain.y).range(horizontal ? range.x : range.y),
  };

  const origin = polar ? Helpers.getPolarOrigin(props) : Axis.getOrigin(domain);

  const padding = Helpers.getPadding(props.padding);

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
  };
}

export function getChildren(props, childComponents, calculatedProps) {
  const children = childComponents || getChildComponents(props);
  const newCalculatedProps =
    calculatedProps || getCalculatedProps(props, children);
  const baseStyle = newCalculatedProps.style.parent;
  const { height, polar, theme, width } = props;
  const { origin, horizontal } = newCalculatedProps;
  const parentName = props.name || "chart";

  return children.filter(React.isValidElement).map((child, index) => {
    const role = child.type && child.type.role;
    const style = Array.isArray(child.props.style)
      ? child.props.style
      : defaults({}, child.props.style, { parent: baseStyle });
    const childProps = getChildProps(child, props, newCalculatedProps);
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
        padding: newCalculatedProps.padding,
        key: `${name}-key-${index}`,
        standalone: false,
      },
      childProps,
    );
    return React.cloneElement(child, newProps);
  });
}

export const getChildComponents = (props, defaultAxes?) => {
  let childComponents = React.Children.toArray(props.children);

  if (childComponents.length === 0) {
    childComponents.push(defaultAxes.independent, defaultAxes.dependent);
  } else {
    const axisComponents = {
      dependent: Axis.getAxisComponentsWithParent(childComponents, "dependent"),
      independent: Axis.getAxisComponentsWithParent(
        childComponents,
        "independent",
      ),
    };

    if (
      axisComponents.dependent.length === 0 &&
      axisComponents.independent.length === 0
    ) {
      childComponents = props.prependDefaultAxes
        ? [defaultAxes.independent, defaultAxes.dependent].concat(
            childComponents,
          )
        : childComponents.concat([
            defaultAxes.independent,
            defaultAxes.dependent,
          ]);
    }
  }

  return childComponents;
};

const getDomain = (props, axis, childComponents) => {
  const children = childComponents || React.Children.toArray(props.children);
  const domain = Wrapper.getDomain(props, axis, children);
  const axisComponent = Axis.getAxisComponent(children, axis);
  const invertDomain =
    axisComponent && axisComponent.props && axisComponent.props.invertAxis;
  return invertDomain ? domain.concat().reverse() : domain;
};

const createStringMap = (props, childComponents, allStrings) => {
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
