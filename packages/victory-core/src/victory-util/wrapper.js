/* eslint-disable func-style */
import {
  assign,
  defaults,
  flatten,
  isFunction,
  uniq,
  groupBy,
  uniqBy,
  values,
  isPlainObject
} from "lodash";
import React from "react";
import * as Axis from "./axis";
import * as Style from "./style";
import * as Data from "./data";
import * as Domain from "./domain";
import * as Events from "./events";
import * as Collection from "./collection";
import * as Helpers from "./helpers";
import * as Scale from "./scale";
import * as Log from "./log";

export function addBinsToParentPropsIfHistogram({
  children,
  props,
  childComponents,
  parentProps
}) {
  const someChildrenAreHistograms = children.some((child) => {
    return child.type && child.type.role === "histogram";
  });

  const allChildrenAreHistograms =
    someChildrenAreHistograms &&
    children.length &&
    children.every((child) => {
      return child.type && child.type.role === "histogram";
    });

  if (someChildrenAreHistograms && !allChildrenAreHistograms) {
    Log.warn(
      "VictoryHistogram only supports being stacked with other VictoryHistogram components. Check to make sure that you are only passing VictoryHistogram components to VictoryStack"
    );
  }

  // if we are stacking histograms, we need to generate explicit bins
  // or else each histogram may end up having different bins
  if (!allChildrenAreHistograms) {
    return parentProps;
  }

  let childBins = props.bins || childComponents[0].props.bins;

  // if we have explicit bins then we don't need to calculate them
  if (!Array.isArray(childBins)) {
    const combinedData = children.reduce((memo, child) => {
      const xAccessor = Helpers.createAccessor(child.props.x || "x");
      return memo.concat(
        child.props.data.map((datum) => ({ x: xAccessor(datum) }))
      );
    }, []);

    // use the same function to generate bins as VictoryHistogram but with
    // the combined data from above, then get explicit bins from that
    const getFormattedHistogramData = children[0].type.getFormattedData;
    childBins = getFormattedHistogramData({
      data: combinedData,
      bins: childBins
    }).reduce(
      (memo, { x0, x1 }, index) =>
        index === 0 ? memo.concat([x0, x1]) : memo.concat(x1),
      []
    );
  }

  return { ...parentProps, bins: childBins };
}

export function getDataFromChildren(props, childComponents) {
  const { polar, startAngle, endAngle, categories, minDomain, maxDomain } =
    props;
  let parentProps = {
    polar,
    startAngle,
    endAngle,
    categories,
    minDomain,
    maxDomain
  };
  let stack = 0;
  const children = childComponents
    ? childComponents.slice(0)
    : React.Children.toArray(props.children);

  parentProps = addBinsToParentPropsIfHistogram({
    children,
    props,
    childComponents,
    parentProps
  });

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
    return childData.map((datum, index) =>
      assign({ _stack: stack, _group: index }, datum)
    );
  };

  const stacked = children.filter(
    (c) => c.type && c.type.role === "stack"
  ).length;
  const combine = (memo, val) => memo.concat(uniqBy(val, "_group"));
  const datasets = Helpers.reduceChildren(
    children,
    iteratee,
    props,
    [],
    combine
  );
  const group = stacked ? "_group" : "_stack";
  return values(groupBy(datasets, group));
}

export function getData(props, childComponents) {
  if (props.data) {
    return Data.getData(props);
  }
  childComponents = childComponents || React.Children.toArray(props.children);
  return getDataFromChildren(childComponents);
}

export function getWidth(props, groupLength, seriesLength) {
  const { datasets, horizontal } = props;
  const range = horizontal
    ? Helpers.getRange(props, "y")
    : Helpers.getRange(props, "x");
  const extent = Math.abs(range[1] - range[0]);
  seriesLength =
    seriesLength !== undefined
      ? seriesLength
      : (Array.isArray(datasets[0]) && datasets[0].length) || 1;
  groupLength = groupLength || datasets.length;
  const bars = groupLength * seriesLength;
  const barRatio = 0.5;
  return Math.round((barRatio * extent) / bars);
}

export function getDefaultDomainPadding(props, axis, childComponents) {
  if (props.polar || axis !== "x") {
    return undefined;
  }
  const groupComponent = childComponents.filter((child) => {
    return child.type && child.type.role && child.type.role === "group";
  });

  if (groupComponent.length < 1) {
    return undefined;
  }
  const { offset, children } = groupComponent[0].props;
  if (!offset) {
    return undefined;
  }

  const firstChild = Array.isArray(children) && children[0];
  if (!firstChild) {
    return undefined;
  }
  let barWidth = firstChild.props.barWidth;
  let dataLength = (firstChild.props.data && firstChild.props.data.length) || 1;
  if (firstChild && firstChild.type.role === "stack") {
    const nestedChild =
      firstChild.props.children && firstChild.props.children[0];
    if (!nestedChild) {
      return undefined;
    }
    barWidth = nestedChild.props.barWidth;
    dataLength = firstChild.props.children.length;
  }
  const width = barWidth || getWidth(props, children.length, dataLength);
  return {
    x:
      (width * children.length) / 2 +
      (offset - width * ((children.length - 1) / 2))
  };
}

export function getDomainFromChildren(props, axis, childComponents) {
  // eslint-disable-line max-statements, complexity, max-len
  const children = childComponents
    ? childComponents.slice(0)
    : React.Children.toArray(props.children);
  const parentData = props.data ? Data.getData(props, axis) : undefined;
  const {
    polar,
    startAngle,
    endAngle,
    categories,
    minDomain,
    maxDomain,
    horizontal
  } = props;
  const baseParentProps = {
    horizontal,
    polar,
    startAngle,
    endAngle,
    minDomain,
    maxDomain,
    categories
  };
  const parentProps = parentData
    ? assign(baseParentProps, { data: parentData })
    : baseParentProps;

  const iteratee = (child) => {
    const sharedProps = assign({}, child.props, parentProps);
    if (!Domain.isDomainComponent(child)) {
      return null;
    } else if (child.type && isFunction(child.type.getDomain)) {
      return child.props && child.type.getDomain(sharedProps, axis);
    } else {
      return Domain.getDomain(sharedProps, axis);
    }
  };

  const childDomains = Helpers.reduceChildren(children, iteratee, props);
  const min =
    childDomains.length === 0 ? 0 : Collection.getMinValue(childDomains);
  const max =
    childDomains.length === 0 ? 1 : Collection.getMaxValue(childDomains);
  return [min, max];
}

export function getDomain(props, axis, childComponents) {
  childComponents = childComponents || React.Children.toArray(props.children);

  const propsDomain = Domain.getDomainFromProps(props, axis);
  const domainPadding = getDefaultDomainPadding(props, axis, childComponents);
  let domain;

  if (propsDomain) {
    domain = propsDomain;
  } else {
    const minDomain = Domain.getMinFromProps(props, axis);
    const maxDomain = Domain.getMaxFromProps(props, axis);
    const dataset = (props.data || props.y) && Data.getData(props);
    const dataDomain = dataset
      ? Domain.getDomainFromData(props, axis, dataset)
      : [];
    const childDomain = getDomainFromChildren(props, axis, childComponents);
    const min =
      minDomain || Collection.getMinValue([...dataDomain, ...childDomain]);
    const max =
      maxDomain || Collection.getMaxValue([...dataDomain, ...childDomain]);
    domain = Domain.getDomainFromMinMax(min, max);
  }
  return Domain.formatDomain(domain, assign({ domainPadding }, props), axis);
}

export function getScale(props, axis, childComponents) {
  if (props.data) {
    return Scale.getBaseScale(props, axis);
  }
  const children = childComponents
    ? childComponents.slice(0)
    : React.Children.toArray(props.children);
  const iteratee = (child) => {
    const sharedProps = assign({}, child.props, {
      horizontal: props.horizontal
    });
    return Scale.getScaleType(sharedProps, axis);
  };
  const childScale = uniq(Helpers.reduceChildren(children, iteratee, props));
  // default to linear scale if more than one uniq scale type is given by children

  return childScale.length > 1
    ? Scale.getScaleFromName("linear")
    : Scale.getScaleFromName(childScale[0]);
}

export function getAllEvents(props) {
  const components = ["groupComponent", "containerComponent", "labelComponent"];
  const componentEvents = Events.getComponentEvents(props, components);
  let events = props.events;
  if (Array.isArray(componentEvents)) {
    events = Array.isArray(props.events)
      ? componentEvents.concat(...props.events)
      : componentEvents;
  }
  return events || [];
}

export function getColor(calculatedProps, child, index) {
  // check for styles first
  const { style } = calculatedProps;
  let { colorScale, color } = calculatedProps;
  if (style && style.data && style.data.fill) {
    return style.data.fill;
  }
  colorScale =
    child.props && child.props.colorScale ? child.props.colorScale : colorScale;
  color = child.props && child.props.color ? child.props.color : color;
  if (!colorScale && !color) {
    return undefined;
  }
  const colors = Array.isArray(colorScale)
    ? colorScale
    : Style.getColorScale(colorScale);
  return color || colors[index % colors.length];
}

export function getStyle(theme, style, role) {
  const defaultStyle =
    theme && theme[role] && theme[role].style ? theme[role].style : {};
  return Helpers.getStyles(style, defaultStyle);
}

export function getChildStyle(child, index, calculatedProps) {
  const { style, role } = calculatedProps;
  const childStyle = child.props.style || {};
  if (Array.isArray(childStyle)) {
    return childStyle;
  }
  const childRole = child.type && child.type.role;
  const defaultFill =
    childRole === "stack" ? undefined : getColor(calculatedProps, child, index);
  const defaultColor =
    childRole === "line"
      ? { fill: "none", stroke: defaultFill }
      : { fill: defaultFill };
  const dataWidth =
    role === "stack" ? {} : { width: getWidth(calculatedProps) };
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
}

export function getStringsFromCategories(childComponents, axis) {
  const iteratee = (child) => {
    const childProps = child.props || {};
    if (!Domain.isDomainComponent(child) || !childProps.categories) {
      return null;
    } else {
      const categories =
        childProps.categories && !Array.isArray(childProps.categories)
          ? childProps.categories[axis]
          : childProps.props.categories;
      const categoryStrings =
        categories && categories.filter((val) => typeof val === "string");
      return categoryStrings ? Collection.removeUndefined(categoryStrings) : [];
    }
  };
  return Helpers.reduceChildren(childComponents.slice(0), iteratee);
}

export function getStringsFromData(childComponents) {
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
    return data.map((d) => ({ x: d.xName, y: d.yName }));
  };

  const initialMemo = { x: [], y: [] };
  const combine = (memo, datum) => {
    const x = Array.isArray(datum)
      ? datum.map((d) => d.x).filter(Boolean)
      : datum.x;
    const y = Array.isArray(datum)
      ? datum.map((d) => d.y).filter(Boolean)
      : datum.y;
    return {
      x: x !== undefined ? memo.x.concat(x) : memo.x,
      y: y !== undefined ? memo.y.concat(y) : memo.y
    };
  };
  return Helpers.reduceChildren(
    childComponents.slice(0),
    iteratee,
    {},
    initialMemo,
    combine
  );
}

export function getCategoryAndAxisStringsFromChildren(
  props,
  axis,
  childComponents
) {
  const categories = isPlainObject(props.categories)
    ? props.categories[axis]
    : props.categories;
  const axisComponent = Axis.getAxisComponent(childComponents, axis);
  const axisStrings = axisComponent
    ? Data.getStringsFromAxes(axisComponent.props, axis)
    : [];
  const categoryStrings =
    categories || getStringsFromCategories(childComponents, axis);
  return uniq(flatten([...categoryStrings, ...axisStrings]));
}

export function getStringsFromChildren(props, childComponents) {
  childComponents = childComponents || React.Children.toArray(props.children);

  const xStrings = getCategoryAndAxisStringsFromChildren(
    props,
    "x",
    childComponents
  );
  const yStrings = getCategoryAndAxisStringsFromChildren(
    props,
    "y",
    childComponents
  );

  const dataStrings = getStringsFromData(childComponents);

  return {
    x: uniq(flatten([...xStrings, ...dataStrings.x])),
    y: uniq(flatten([...yStrings, ...dataStrings.y]))
  };
}

export function getCategories(props, childComponents, allStrings) {
  const xPropCategories =
    props.categories && !Array.isArray(props.categories)
      ? props.categories.x
      : props.categories;

  const yPropCategories =
    props.categories && !Array.isArray(props.categories)
      ? props.categories.y
      : props.categories;

  const fallbackRequired = !xPropCategories || !yPropCategories;

  const fallbackProps = fallbackRequired
    ? allStrings || getStringsFromChildren(props, childComponents)
    : {};

  const xCategories = xPropCategories || fallbackProps.x;
  const yCategories = yPropCategories || fallbackProps.y;

  return {
    x: xCategories.length > 0 ? xCategories : undefined,
    y: yCategories.length > 0 ? yCategories : undefined
  };
}
