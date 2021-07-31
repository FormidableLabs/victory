import { defaults, isNil } from "lodash";
import React from "react";

const KEYS = {
  PARENT: "parent",
  DATA: "data",
  CONTAINER: "container",
  LABELS: "labels"
};

const datumHasXandY = (datum) => {
  return !isNil(datum._x) && !isNil(datum._y);
};

export const useEvents = (
  props,
  baseProps,
  { shouldRenderDatum = datumHasXandY, role } = {}
) => {
  const { dataComponent, labelComponent, groupComponent, name } = props;

  const dataKeys = React.useMemo(() => {
    return Object.keys(baseProps).filter((key) => key !== KEYS.PARENT);
  }, [baseProps]);

  const getComponentProps = React.useCallback(
    (component, type, index) => {
      const componentName = name || role;
      const key = dataKeys[index] || index;
      const id = `${componentName}-${type}-${key}`;

      const dataProps =
        (baseProps[key] && baseProps[key][type]) || baseProps[key];

      return defaults({ index, key: id }, component.props, dataProps, { id });
    },
    [name, role, dataKeys, baseProps]
  );

  const renderContainer = React.useCallback(
    (component, children) => {
      const isContainer =
        component.type && component.type.role === KEYS.CONTAINER;
      const parentProps = isContainer
        ? getComponentProps(component, KEYS.PARENT, KEYS.PARENT)
        : {};
      return React.cloneElement(component, parentProps, children);
    },
    [getComponentProps]
  );

  const dataComponents = React.useMemo(() => {
    return dataKeys.reduce((validDataComponents, _dataKey, index) => {
      const dataProps = getComponentProps(dataComponent, KEYS.DATA, index);

      if (shouldRenderDatum(dataProps.datum)) {
        return [
          ...validDataComponents,
          React.cloneElement(dataComponent, dataProps)
        ];
      }
      return validDataComponents;
    }, []);
  }, [dataKeys, dataComponent, getComponentProps, shouldRenderDatum]);

  const labelComponents = React.useMemo(() => {
    return dataKeys.reduce((components, key) => {
      const labelProps = getComponentProps(labelComponent, KEYS.LABELS, key);

      if (!isNil(labelProps?.text)) {
        return [...components, React.cloneElement(labelComponent, labelProps)];
      }
      return labelComponents;
    }, []);
  }, [dataKeys, getComponentProps, labelComponent]);

  const renderedData = React.useMemo(() => {
    const children = [...dataComponents, ...labelComponents];

    return renderContainer(groupComponent, children);
  }, [dataComponents, labelComponents, renderContainer, groupComponent]);

  return { renderedData, renderContainer };
};
