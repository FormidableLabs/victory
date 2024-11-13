import React from "react";
import defaults from "lodash/defaults";
import uniq from "lodash/uniq";
import groupBy from "lodash/groupBy";
import uniqBy from "lodash/uniqBy";

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
  parentProps,
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
      "VictoryHistogram only supports being stacked with other VictoryHistogram components. Check to make sure that you are only passing VictoryHistogram components to VictoryStack",
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
        child.props.data.map((datum) => ({ x: xAccessor(datum) })),
      );
    }, []);

    // use the same function to generate bins as VictoryHistogram but with
    // the combined data from above, then get explicit bins from that
    const getFormattedHistogramData = children[0].type.getFormattedData;
    childBins = getFormattedHistogramData({
      data: combinedData,
      bins: childBins,
    }).reduce(
      (memo, { x0, x1 }, index) =>
        index === 0 ? memo.concat([x0, x1]) : memo.concat(x1),
      [],
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
    maxDomain,
  };
  let stack = 0;
  const children = childComponents
    ? childComponents.slice(0)
    : React.Children.toArray(props.children);

  parentProps = addBinsToParentPropsIfHistogram({
    children,
    props,
    childComponents,
    parentProps,
  });

  const iteratee = (child, childName, parent) => {
    const childProps = Object.assign({}, child.props, parentProps);
    let childData;
    let childElement = child;
    if (!Data.isDataComponent(child)) {
      return null;
    } else if (child.type && Helpers.isFunction(child.type.getData)) {
      childElement = parent ? React.cloneElement(child, parent.props) : child;
      childData = childElement.type.getData(childProps);
    } else {
      childData = Data.getData(childProps);
    }
    stack += 1;
    return childData.map((datum, index) =>
      Object.assign({ _stack: stack, _group: index }, datum),
    );
  };

  const stacked = children.filter(
    (c) => c.type && c.type.role === "stack",
  ).length;
  const combine = (memo, val) => memo.concat(uniqBy(val, "_group"));
  const datasets = Helpers.reduceChildren(
    children,
    iteratee,
    props,
    [],
    combine,
  );
  const group = stacked ? "_group" : "_stack";
  return Object.values(groupBy(datasets, group));
}

export function getData(props, childComponents) {
  if (props.data) {
    return Data.getData(props);
  }
  return getDataFromChildren(
    props,
    childComponents || React.Children.toArray(props.children),
  );
}

export function getWidth(props, groupLength?, seriesLength?) {
  const { datasets, horizontal } = props;
  const range = horizontal
    ? Helpers.getRange(props, "y")
    : Helpers.getRange(props, "x");
  const extent = Math.abs(range[1] - range[0]);
  const seriesLengthValue =
    seriesLength !== undefined
      ? seriesLength
      : (Array.isArray(datasets[0]) && datasets[0].length) || 1;
  const groupLengthValue = groupLength || datasets.length;
  const bars = groupLengthValue * seriesLengthValue;
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
      (offset - width * ((children.length - 1) / 2)),
  };
}

export function getDomainFromChildren(props, axis, childComponents) {
  const children = childComponents
    ? childComponents.slice(0)
    : React.Children.toArray(props.children);
  const parentData = props.data ? Data.getData(props) : undefined;
  const {
    polar,
    startAngle,
    endAngle,
    categories,
    minDomain,
    maxDomain,
    horizontal,
  } = props;
  const baseParentProps = {
    horizontal,
    polar,
    startAngle,
    endAngle,
    minDomain,
    maxDomain,
    categories,
  };
  const parentProps = parentData
    ? Object.assign(baseParentProps, { data: parentData })
    : baseParentProps;

  const iteratee = (child) => {
    const sharedProps = Object.assign({}, child.props, parentProps);
    if (!Domain.isDomainComponent(child)) {
      return null;
    } else if (child.type && Helpers.isFunction(child.type.getDomain)) {
      return child.props && child.type.getDomain(sharedProps, axis);
    }
    return Domain.getDomain(sharedProps, axis);
  };

  const childDomains = Helpers.reduceChildren(children, iteratee, props);
  const min =
    childDomains.length === 0 ? 0 : Collection.getMinValue(childDomains);
  const max =
    childDomains.length === 0 ? 1 : Collection.getMaxValue(childDomains);
  return [min, max];
}

export function getDomain(props, axis, childComponents) {
  const children = childComponents || React.Children.toArray(props.children);

  const propsDomain = Domain.getDomainFromProps(props, axis);
  const domainPadding = getDefaultDomainPadding(props, axis, children);
  let domain;

  if (propsDomain) {
    domain = propsDomain;
  } else {
    const minDomain = Domain.getMinFromProps(props, axis);
    const maxDomain = Domain.getMaxFromProps(props, axis);
    const dataset = (props.data || props.y) && Data.getData(props);
    const dataDomain = dataset
      ? Domain.getDomainFromData(props, axis, dataset)!
      : [];
    const childDomain = getDomainFromChildren(props, axis, children);
    const min =
      minDomain || Collection.getMinValue([...dataDomain, ...childDomain]);
    const max =
      maxDomain || Collection.getMaxValue([...dataDomain, ...childDomain]);
    domain = Domain.getDomainFromMinMax(min, max);
  }
  return Domain.formatDomain(
    domain,
    Object.assign({ domainPadding }, props),
    axis,
  );
}

export function getScale(props, axis, childComponents?) {
  if (props.data) {
    return Scale.getBaseScale(props, axis);
  }
  const children = childComponents
    ? childComponents.slice(0)
    : React.Children.toArray(props.children);
  const iteratee = (child) => {
    const sharedProps = Object.assign({}, child.props, {
      horizontal: props.horizontal,
    });
    return Scale.getScaleType(sharedProps, axis);
  };
  const childScale: string[] = uniq(
    Helpers.reduceChildren(children, iteratee, props),
  );

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

// eslint-disable-next-line max-params
export function getColor(calculatedProps, child, index, theme) {
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
    : Style.getColorScale(colorScale, theme);
  return color || colors[index % colors.length];
}

export function getStyle(theme, style, role) {
  const defaultStyle =
    theme && theme[role] && theme[role].style ? theme[role].style : {};
  return Helpers.getStyles(style, defaultStyle);
}

// eslint-disable-next-line max-params
export function getChildStyle(child, index, calculatedProps, theme) {
  const { style, role } = calculatedProps;
  const childStyle = child.props.style || {};
  if (Array.isArray(childStyle)) {
    return childStyle;
  }
  const childRole = child.type && child.type.role;
  const defaultFill =
    childRole === "stack"
      ? undefined
      : getColor(calculatedProps, child, index, theme);
  const defaultColor =
    childRole === "line"
      ? { fill: "none", stroke: defaultFill }
      : { fill: defaultFill };
  const dataWidth =
    role === "stack" ? {} : { width: getWidth(calculatedProps) };
  const dataStyle = defaults(
    {},
    childStyle.data,
    Object.assign({}, dataWidth, style.data, defaultColor),
  );
  const labelsStyle = defaults({}, childStyle.labels, style.labels);
  return {
    ...childStyle,
    parent: style.parent,
    data: dataStyle,
    labels: labelsStyle,
  };
}

export function getStringsFromChildrenCategories(childComponents, axis) {
  const iteratee = (child) => {
    if (!Domain.isDomainComponent(child)) {
      return null;
    }
    const childProps = child.props || {};
    return Data.getStringsFromCategories(childProps, axis);
  };
  return Helpers.reduceChildren(childComponents.slice(0), iteratee);
}

export function getStringsFromData(childComponents) {
  const iteratee = (child) => {
    const childProps = child.props || {};
    let data;
    if (!Data.isDataComponent(child)) {
      return null;
    } else if (child.type && Helpers.isFunction(child.type.getData)) {
      data = child.type.getData(childProps);
    } else {
      data = Data.getData(childProps);
    }
    return data.map((d) => ({ x: d.xName, y: d.yName }));
  };

  const initialMemo = { x: [] as number[], y: [] as number[] };
  const combine = (
    memo: typeof initialMemo,
    datum: NonNullable<ReturnType<typeof iteratee>>,
  ) => {
    const x = Array.isArray(datum)
      ? datum.map((d) => d.x).filter(Boolean)
      : datum.x;
    const y = Array.isArray(datum)
      ? datum.map((d) => d.y).filter(Boolean)
      : datum.y;
    return {
      x: x !== undefined ? memo.x.concat(x) : memo.x,
      y: y !== undefined ? memo.y.concat(y) : memo.y,
    };
  };
  return Helpers.reduceChildren(
    childComponents.slice(0),
    iteratee,
    {},
    initialMemo,
    combine,
  );
}

export function getCategoryAndAxisStringsFromChildren(
  props,
  axis,
  childComponents,
) {
  const categories = Data.getStringsFromCategories(props, axis);
  const axisComponent = Axis.getAxisComponent(childComponents, axis);
  const axisStrings = axisComponent
    ? Data.getStringsFromAxes(axisComponent.props, axis)
    : [];
  const categoryStrings = categories.length
    ? categories
    : getStringsFromChildrenCategories(childComponents, axis);
  return uniq([...categoryStrings, ...axisStrings].flat());
}

export function getStringsFromChildren(props, childComponents) {
  const children = childComponents || React.Children.toArray(props.children);

  const xStrings = getCategoryAndAxisStringsFromChildren(props, "x", children);
  const yStrings = getCategoryAndAxisStringsFromChildren(props, "y", children);

  const dataStrings = getStringsFromData(children);

  return {
    x: uniq([...xStrings, ...dataStrings.x].flat()),
    y: uniq([...yStrings, ...dataStrings.y].flat()),
  };
}

export function getCategories(props, childComponents, allStrings?) {
  const xPropCategories =
    props.categories && Data.getStringsFromCategories(props, "x");
  const yPropCategories =
    props.categories && Data.getStringsFromCategories(props, "y");
  const fallbackRequired = !xPropCategories || !yPropCategories;

  const fallbackProps = fallbackRequired
    ? allStrings || getStringsFromChildren(props, childComponents)
    : {};

  const xCategories = xPropCategories || fallbackProps.x;
  const yCategories = yPropCategories || fallbackProps.y;

  return {
    x: xCategories.length > 0 ? xCategories : undefined,
    y: yCategories.length > 0 ? yCategories : undefined,
  };
}
