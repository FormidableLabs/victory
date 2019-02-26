/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
import { assign, keys, orderBy } from "lodash";
import React from "react";
import { Helpers, Scale, Wrapper } from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

// Assumes data in `datasets` is sorted by `Data.getData`.
function fillData(props, datasets) {
  const { fillInMissingData } = props;
  const xMap = datasets.reduce((prev, dataset) => {
    dataset.forEach((datum) => {
      prev[datum._x instanceof Date ? datum._x.getTime() : datum._x] = true;
    });
    return prev;
  }, {});
  const xKeys = keys(xMap).map((k) => +k);
  const xArr = orderBy(xKeys);

  return datasets.map((dataset) => {
    let indexOffset = 0;
    const isDate = dataset[0] && dataset[0]._x instanceof Date;
    const filledInData = xArr.map((x, index) => {
      x = +x;
      const datum = dataset[index - indexOffset];

      if (datum) {
        const x1 = isDate ? datum._x.getTime() : datum._x;
        if (x1 === x) {
          return datum;
        } else {
          indexOffset++;
          const y = fillInMissingData ? 0 : null;
          x = isDate ? new Date(x) : x;
          return { x, y, _x: x, _y: y };
        }
      } else {
        const y = fillInMissingData ? 0 : null;
        x = isDate ? new Date(x) : x;
        return { x, y, _x: x, _y: y };
      }
    });

    return filledInData;
  });
}

function getY0(datum, index, datasets) {
  if (datum.y0) {
    return datum.y0;
  }
  const y = datum._y;
  const previousDatasets = datasets.slice(0, index);
  const previousPoints = previousDatasets.reduce((prev, dataset) => {
    return prev.concat(
      dataset
        .filter((previousDatum) =>
          datum._x instanceof Date
            ? previousDatum._x.getTime() === datum._x.getTime()
            : previousDatum._x === datum._x
        )
        .map((previousDatum) => previousDatum._y || 0)
    );
  }, []);
  const y0 =
    previousPoints.length &&
    previousPoints.reduce((memo, value) => {
      const sameSign = (y < 0 && value < 0) || (y >= 0 && value >= 0);
      return sameSign ? +value + memo : memo;
    }, 0);
  return previousPoints.some((point) => point instanceof Date) ? new Date(y0) : y0;
}

/* eslint-disable no-nested-ternary */
function addLayoutData(props, datasets, index) {
  const xOffset = props.xOffset || 0;
  return datasets[index].map((datum) => {
    const yOffset = getY0(datum, index, datasets) || 0;
    return assign({}, datum, {
      _y0: !(datum._y instanceof Date) ? yOffset : yOffset ? new Date(yOffset) : datum._y,
      _y1:
        datum._y === null
          ? null
          : datum._y instanceof Date
          ? new Date(+datum._y + +yOffset)
          : datum._y + yOffset,
      _x1:
        datum._x === null
          ? null
          : datum._x instanceof Date
          ? new Date(+datum._x + +xOffset)
          : datum._x + xOffset
    });
  });
}
/* eslint-enable no-nested-ternary */

function stackData(props, childComponents) {
  const dataFromChildren = Wrapper.getDataFromChildren(props, childComponents);
  const datasets = fillData(props, dataFromChildren);
  return datasets.map((d, i) => addLayoutData(props, datasets, i));
}

function getCalculatedProps(props, childComponents) {
  childComponents = childComponents || React.Children.toArray(props.children);
  const role = "stack";
  props = Helpers.modifyProps(props, fallbackProps, role);
  const style = Wrapper.getStyle(props.theme, props.style, role);
  const categories = Wrapper.getCategories(props, childComponents);
  const datasets = stackData(props, childComponents);
  const children = childComponents.map((c, i) => {
    return React.cloneElement(c, { data: datasets[i] });
  });
  const domain = {
    x: Wrapper.getDomain(assign({}, props, { categories }), "x", children),
    y: Wrapper.getDomain(assign({}, props, { categories }), "y", children)
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
    x: baseScale.x.domain(domain.x).range(props.horizontal ? range.y : range.x),
    y: baseScale.y.domain(domain.y).range(props.horizontal ? range.x : range.y)
  };
  const { colorScale, horizontal } = props;
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
  return props.theme ? colorScaleOptions || props.theme.props.colorScale : colorScaleOptions;
}

function getChildren(props, childComponents, calculatedProps) {
  props = Helpers.modifyProps(props, fallbackProps, "stack");
  childComponents = childComponents || React.Children.toArray(props.children);
  calculatedProps = calculatedProps || getCalculatedProps(props, childComponents);
  const { datasets } = calculatedProps;
  const childProps = getChildProps(props, calculatedProps);
  const parentName = props.name || "stack";
  return childComponents.map((child, index) => {
    const role = child.type && child.type.role;
    const data = datasets[index];
    const style = Wrapper.getChildStyle(child, index, calculatedProps);
    const labels = props.labels ? getLabels(props, datasets, index) : child.props.labels;
    const name = child.props.name || `${parentName}-${role}-${index}`;
    return React.cloneElement(
      child,
      assign(
        {
          key: `${name}-key-${index}`,
          labels,
          name,
          domainPadding: child.props.domainPadding || props.domainPadding,
          theme: props.theme,
          labelComponent: props.labelComponent || child.props.labelComponent,
          style,
          colorScale: getColorScale(props, child),
          data,
          polar: props.polar
        },
        childProps
      )
    );
  });
}

export { getChildren, getCalculatedProps };
