/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
import { assign } from "lodash";
import React from "react";
import { Helpers, Scale } from "victory-core";
import Wrapper from "../../helpers/wrapper";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

function getStyle(theme, style) {
  const defaultStyle = theme && theme.stack && theme.stack.style ? theme.stack.style : {};
  return Helpers.getStyles(style, defaultStyle);
}

function getCalculatedProps(props, childComponents) {
  childComponents = childComponents || React.Children.toArray(props.children);
  const role = "stack";
  const style = getStyle(props.theme, props.style);
  const horizontal = props.horizontal || childComponents.every(
    (component) => component.props.horizontal
  );
  const categories = {
    x: Wrapper.getCategories(props, "x"),
    y: Wrapper.getCategories(props, "y")
  };
  const dataFromChildren = Wrapper.getDataFromChildren(props);
  const datasets = Wrapper.fillInMissingData(props, dataFromChildren);
  const domain = {
    x: Wrapper.getStackedDomain(assign({}, props, { categories }), "x", datasets),
    y: Wrapper.getStackedDomain(assign({}, props, { categories }), "y", datasets)
  };
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const baseScale = {
    x: Scale.getScaleFromProps(props, "x") || Scale.getDefaultScale(),
    y: Scale.getScaleFromProps(props, "y") || Scale.getDefaultScale()
  };
  const xScale = baseScale.x.domain(domain.x).range(range.x);
  const yScale = baseScale.y.domain(domain.y).range(range.y);
  const scale = {
    x: horizontal ? yScale : xScale,
    y: horizontal ? xScale : yScale
  };
  const colorScale = props.colorScale;
  return { datasets, categories, range, domain, horizontal, scale, style, colorScale, role };
}

function getLabels(props, datasets, index) {
  if (!props.labels) {
    return undefined;
  }
  return datasets.length === index + 1 ? props.labels : undefined;
}

function getChildProps(props, calculatedProps) {
  const { categories, domain, range, scale, horizontal } = calculatedProps;
  return {
    height: props.height,
    width: props.width,
    padding: Helpers.getPadding(props),
    standalone: false,
    theme: props.theme,
    categories,
    domain,
    range,
    scale,
    horizontal
  };
}

function getColorScale(props, child) {
  const role = child.type && child.type.role;
  const colorScaleOptions = child.props.colorScale || props.colorScale;
  if (role !== "group" && role !== "stack") {
    return undefined;
  }
  return props.theme ? colorScaleOptions || props.theme.props.colorScale
  : colorScaleOptions;
}

// the old ones were bad
function getChildren(props, childComponents, calculatedProps) {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "stack");
  childComponents = childComponents || React.Children.toArray(modifiedProps.children);
  calculatedProps = calculatedProps || getCalculatedProps(modifiedProps, childComponents);
  const { datasets } = calculatedProps;
  const childProps = getChildProps(props, calculatedProps);

  return childComponents.map((child, index) => {
    const data = Wrapper.addLayoutData(props, datasets, index);
    const style = Wrapper.getChildStyle(child, index, calculatedProps);
    const labels = props.labels ? getLabels(props, datasets, index) : child.props.labels;

    return React.cloneElement(child, assign({
      key: index,
      labels,
      domainPadding: child.props.domainPadding || props.domainPadding,
      theme: props.theme,
      labelComponent: props.labelComponent || child.props.labelComponent,
      style,
      colorScale: getColorScale(props, child),
      data,
      polar: props.polar
    }, childProps));
  });
}


export { getChildren, getCalculatedProps };
