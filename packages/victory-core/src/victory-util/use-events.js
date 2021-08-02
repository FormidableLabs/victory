import { assign, defaults, isFunction, isNil, pick } from "lodash";
import React from "react";
import Events from "./events";

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
  {
    shouldRenderDatum = datumHasXandY,
    role,
    getBaseProps,
    expectedComponents
  } = {}
) => {
  const {
    dataComponent,
    labelComponent,
    groupComponent,
    name,
    events,
    sharedEvents
  } = props;

  const componentEvents = Events.getComponentEvents(props, expectedComponents);

  const hasEvents = !!events || !!sharedEvents || !!componentEvents;

  const getSharedEventState = React.useCallback(
    (...args) => {
      if (isFunction(sharedEvents?.getSharedEventState)) {
        return sharedEvents?.getSharedEventState(...args);
      }
      return undefined;
    },
    [sharedEvents]
  );

  const baseProps = React.useMemo(() => {
    const sharedParentState = getSharedEventState(KEYS.PARENT, KEYS.PARENT);
    const parentState = Events.getEventState(KEYS.PARENT, KEYS.PARENT);
    const baseParentProps = defaults({}, parentState, sharedParentState);
    const { parentControlledProps } = baseParentProps;
    const parentProps = parentControlledProps
      ? pick(baseParentProps, parentControlledProps)
      : {};
    const modifiedProps = defaults({}, parentProps, props);
    return isFunction(getBaseProps) ? getBaseProps(modifiedProps) : {};
  }, [props, getBaseProps, getSharedEventState]);

  const dataKeys = React.useMemo(() => {
    return Object.keys(baseProps).filter((key) => key !== KEYS.PARENT);
  }, [baseProps]);

  const getComponentProps = React.useCallback(
    (component, type, index) => {
      const componentName = name || role;
      const key = dataKeys[index] || index;
      const id = `${componentName}-${type}-${key}`;

      const currentBaseProps =
        (baseProps[key] && baseProps[key][type]) || baseProps[key];

      if (!currentBaseProps && !hasEvents) {
        return undefined;
      }

      if (hasEvents) {
        const baseEvents = Events.getEvents(props, type, key);
        const componentProps = defaults(
          { index, key: id },
          Events.getEventState(key, type),
          getSharedEventState(key, type),
          component.props,
          currentBaseProps,
          { id }
        );

        const currentEvents = defaults(
          {},
          Events.getPartialEvents(baseEvents, key, componentProps)
        );

        return assign({}, componentProps, { events: currentEvents });
      }

      return defaults({ index, key: id }, component.props, currentBaseProps, {
        id
      });
    },
    [name, role, dataKeys, baseProps, hasEvents, getSharedEventState, props]
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
    return dataKeys.reduce((restComponents, key) => {
      const labelProps = getComponentProps(labelComponent, KEYS.LABELS, key);

      if (!isNil(labelProps?.text)) {
        return [
          ...restComponents,
          React.cloneElement(labelComponent, labelProps)
        ];
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
