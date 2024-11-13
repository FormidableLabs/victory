import React from "react";
import defaults from "lodash/defaults";
import isEmpty from "lodash/isEmpty";

import {
  CategoryPropType,
  DomainPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
  Helpers,
  Hooks,
  UserProps,
  VictoryComponentConfiguration,
  VictoryContainer,
  VictoryTheme,
  Wrapper,
} from "victory-core";

import { VictorySharedEvents } from "victory-shared-events";
import { getChildren, useMemoizedProps } from "./helper-methods";
import isEqual from "react-fast-compare";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
};

export type VictoryStackTTargetType = "data" | "labels" | "parent";
export interface VictoryStackProps
  extends VictoryCommonProps,
    VictoryMultiLabelableProps {
  bins?: number | number[] | Date[];
  categories?: CategoryPropType;
  children?: React.ReactNode | React.ReactNode[];
  domain?: DomainPropType;
  events?: EventPropTypeInterface<
    VictoryStackTTargetType,
    StringOrNumberOrCallback
  >[];
  eventKey?: StringOrNumberOrCallback;
  fillInMissingData?: boolean;
  style?: VictoryStyleInterface;
  xOffset?: number;
}

const defaultProps = {
  containerComponent: <VictoryContainer />,
  groupComponent: <g />,
  standalone: true,
  theme: VictoryTheme.grayscale,
  fillInMissingData: true,
};

const VictoryStackBase = (initialProps: VictoryStackProps) => {
  const { role } = VictoryStack;
  const propsWithDefaults = React.useMemo(
    () => defaults({}, initialProps, defaultProps),
    [initialProps],
  );
  const { setAnimationState, getAnimationProps, getProps } =
    Hooks.useAnimationState();

  const props = getProps(propsWithDefaults);

  const modifiedProps = Helpers.modifyProps(props, fallbackProps, role);
  const {
    eventKey,
    containerComponent,
    standalone,
    groupComponent,
    externalEventMutations,
    width,
    height,
    theme,
    polar,
    horizontal,
    name,
  } = modifiedProps;

  const childComponents = React.Children.toArray(modifiedProps.children);
  const calculatedProps = useMemoizedProps(modifiedProps);
  const { domain, scale, style } = calculatedProps;

  const newChildren = React.useMemo(() => {
    const children = getChildren(props, childComponents, calculatedProps);
    const orderedChildren = children.map((child, index) => {
      const childProps = Object.assign(
        { animate: getAnimationProps(props, child, index) },
        child.props,
      );
      return React.cloneElement(child, childProps);
    });
    /*
      reverse render order for children of `VictoryStack` so that higher children in the stack
      are rendered behind lower children. This looks nicer for stacked bars with cornerRadius, and
      areas with strokes
    */
    return orderedChildren.reverse();
  }, [props, childComponents, calculatedProps, getAnimationProps]);

  const containerProps = React.useMemo(() => {
    if (standalone) {
      return {
        domain,
        scale,
        width,
        height,
        standalone,
        theme,
        style: style.parent,
        horizontal,
        polar,
        name,
      };
    }
    return {};
  }, [
    standalone,
    domain,
    scale,
    width,
    height,
    theme,
    style,
    horizontal,
    polar,
    name,
  ]);
  const userProps = React.useMemo(
    () => UserProps.getSafeUserProps(propsWithDefaults),
    [propsWithDefaults],
  );

  const container = React.useMemo(() => {
    if (standalone) {
      const defaultContainerProps = defaults(
        {},
        containerComponent.props,
        containerProps,
        userProps,
      );
      return React.cloneElement(containerComponent, defaultContainerProps);
    }
    return React.cloneElement(groupComponent, userProps);
  }, [
    groupComponent,
    standalone,
    containerComponent,
    containerProps,
    userProps,
  ]);

  const events = React.useMemo(() => {
    return Wrapper.getAllEvents(props);
  }, [props]);

  const previousProps = Hooks.usePreviousProps(propsWithDefaults);

  React.useEffect(() => {
    // This is called before dismount to keep state in sync
    return () => {
      if (propsWithDefaults.animate) {
        setAnimationState(previousProps, propsWithDefaults);
      }
    };
  }, [setAnimationState, previousProps, propsWithDefaults]);

  if (!isEmpty(events)) {
    return (
      <VictorySharedEvents
        container={container}
        eventKey={eventKey}
        events={events}
        externalEventMutations={externalEventMutations}
      >
        {newChildren}
      </VictorySharedEvents>
    );
  }

  return React.cloneElement(container, container.props, newChildren);
};

const componentConfig: VictoryComponentConfiguration<VictoryStackProps> = {
  role: "stack",
  expectedComponents: [
    "groupComponent",
    "containerComponent",
    "labelComponent",
  ],
  getChildren,
};

export const VictoryStack = Object.assign(
  React.memo(VictoryStackBase, isEqual),
  componentConfig,
);
VictoryStack.displayName = "VictoryStack";
