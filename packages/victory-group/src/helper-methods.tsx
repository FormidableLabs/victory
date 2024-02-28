/* eslint-disable no-use-before-define */
import React from "react";
import { Data, Helpers, Scale, Wrapper } from "victory-core";
import isEqual from "react-fast-compare";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  offset: 0,
};

// eslint-disable-next-line max-statements
export function getCalculatedProps(initialProps, childComponents) {
  const role = "group";
  const props = Helpers.modifyProps(initialProps, fallbackProps, role);
  const style = Wrapper.getStyle(props.theme, props.style, role);
  const { offset, colorScale, color, polar, horizontal } = props;
  const categories =
    props.categories || Wrapper.getCategories(props, childComponents, null);
  const datasets = props.datasets || Wrapper.getDataFromChildren(props, null);
  const domain = {
    x: Wrapper.getDomain(
      Object.assign({}, props, { categories }),
      "x",
      childComponents,
    ),
    y: Wrapper.getDomain(
      Object.assign({}, props, { categories }),
      "y",
      childComponents,
    ),
  };
  const range = props.range || {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y"),
  };
  const baseScale = {
    x: Scale.getScaleFromProps(props, "x") || Wrapper.getScale(props, "x"),
    y: Scale.getScaleFromProps(props, "y") || Wrapper.getScale(props, "y"),
  };
  const scale = {
    x: baseScale.x.domain(domain.x).range(props.horizontal ? range.y : range.x),
    y: baseScale.y.domain(domain.y).range(props.horizontal ? range.x : range.y),
  };

  const origin = polar ? props.origin : Helpers.getPolarOrigin(props);
  const padding = Helpers.getPadding(props);
  return {
    datasets,
    categories,
    range,
    domain,
    horizontal,
    scale,
    style,
    colorScale,
    color,
    offset,
    origin,
    padding,
  };
}

// We need to remove sharedEvents in order to memoize the calculated data
// With shared events, the props change on every event, and every value is re-calculated
const withoutSharedEvents = (props) => {
  const { children } = props;
  const modifiedChildren = React.Children.toArray(children).map(
    (child: Record<string, any> | any) => {
      return {
        ...child,
        props: Helpers.omit(child.props, ["sharedEvents"]),
      };
    },
  );
  props.children = modifiedChildren;
  return props;
};

export function useMemoizedProps(initialProps) {
  const modifiedProps = withoutSharedEvents(initialProps);
  const [props, setProps] = React.useState(modifiedProps);

  // React.memo uses shallow equality to compare objects. This way props
  // will only be re-calculated when they change.
  React.useEffect(() => {
    if (!isEqual(modifiedProps, props)) {
      setProps(modifiedProps);
    }
  }, [props, setProps, modifiedProps]);

  return React.useMemo(() => {
    return getCalculatedProps(props, props.children);
  }, [props]);
}

function pixelsToValue(props, axis, calculatedProps) {
  if (!props.offset) {
    return 0;
  }
  const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
  const domain = calculatedProps.domain[axis];
  const range = calculatedProps.range[currentAxis];
  const domainExtent = Math.max(...domain) - Math.min(...domain);
  const rangeExtent = Math.max(...range) - Math.min(...range);
  return (domainExtent / rangeExtent) * props.offset;
}

// eslint-disable-next-line max-params
function getX0(props, calculatedProps, index, role) {
  const groupLength =
    role === "stack"
      ? calculatedProps.datasets[0].length
      : calculatedProps.datasets.length;
  const center = (groupLength - 1) / 2;
  const totalWidth = pixelsToValue(props, "x", calculatedProps);
  return (index - center) * totalWidth;
}

// eslint-disable-next-line max-params
function getPolarX0(props, calculatedProps, index, role) {
  const groupLength =
    role === "stack"
      ? calculatedProps.datasets[0].length
      : calculatedProps.datasets.length;
  const center = (groupLength - 1) / 2;
  const width = getAngularWidth(props, calculatedProps);
  return (index - center) * width;
}

function getAngularWidth(props, calculatedProps) {
  const { range } = calculatedProps;
  const angularRange = Math.abs(range.x[1] - range.x[0]);
  const r = Math.max(...range.y);
  return (props.offset / (2 * Math.PI * r)) * angularRange;
}

function getLabels(props, datasets, index) {
  if (!props.labels) {
    return undefined;
  }
  return Math.floor(datasets.length / 2) === index ? props.labels : undefined;
}

function getChildProps(props, calculatedProps) {
  const { categories, domain, range, scale, horizontal, origin, padding } =
    calculatedProps;
  const { width, height, theme, polar } = props;
  return {
    height,
    width,
    theme,
    polar,
    origin,
    categories,
    domain,
    range,
    scale,
    horizontal,
    padding,
    standalone: false,
  };
}

function getColorScale(props, child) {
  const role = child.type && child.type.role;
  const colorScaleOptions = child.props.colorScale || props.colorScale;
  if (role !== "group" && role !== "stack") {
    return undefined;
  }
  return props.theme && props.theme.group
    ? colorScaleOptions || props.theme.group.colorScale
    : colorScaleOptions;
}

function getDataWithOffset(props, defaultDataset = [], offset) {
  const dataset = props.data || props.y ? Data.getData(props) : defaultDataset;
  const xOffset = offset || 0;
  return dataset.map((datum) => {
    const _x1 =
      datum._x instanceof Date
        ? new Date(datum._x.getTime() + xOffset)
        : datum._x + xOffset;

    return Object.assign({}, datum, { _x1 });
  });
}

export function getChildren(initialProps, childComponents?, calculatedProps?) {
  const props = Helpers.modifyProps(initialProps, fallbackProps, "stack");
  const children = childComponents || React.Children.toArray(props.children);
  const newCalculatedProps =
    calculatedProps || getCalculatedProps(props, children);
  const { datasets } = newCalculatedProps;
  const { labelComponent, polar } = props;
  const childProps = getChildProps(props, newCalculatedProps);
  const parentName = props.name || "group";
  return children.map((child, index) => {
    const role = child.type && child.type.role;
    const xOffset = polar
      ? getPolarX0(props, newCalculatedProps, index, role)
      : getX0(props, newCalculatedProps, index, role);
    const style =
      role === "voronoi" || role === "tooltip" || role === "label"
        ? child.props.style
        : Wrapper.getChildStyle(child, index, newCalculatedProps);
    const labels = props.labels
      ? getLabels(props, datasets, index)
      : child.props.labels;
    const name = child.props.name || `${parentName}-${role}-${index}`;
    return React.cloneElement(
      child,
      Object.assign(
        {
          labels,
          style,
          key: `${name}-key-${index}`,
          name,
          data: getDataWithOffset(props, datasets[index], xOffset),
          colorScale: getColorScale(props, child),
          labelComponent: labelComponent || child.props.labelComponent,
          xOffset,
        },
        childProps,
      ),
    );
  });
}
