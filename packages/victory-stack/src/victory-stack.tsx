import { assign, defaults, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  CategoryPropType,
  ColorScalePropType,
  DomainPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
  CommonProps,
  Helpers,
  Hooks,
  PropTypes as CustomPropTypes,
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
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  bins?: number | number[] | Date[];
  categories?: CategoryPropType;
  children?: React.ReactNode | React.ReactNode[];
  colorScale?: ColorScalePropType;
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

const VictoryStackBase = (initialProps: VictoryStackProps) => {
  // eslint-disable-next-line no-use-before-define
  const { role } = VictoryStack;
  const { setAnimationState, getAnimationProps, getProps } =
    Hooks.useAnimationState();

  const props = getProps(initialProps);

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
      const childProps = assign(
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
    () => UserProps.getSafeUserProps(initialProps),
    [initialProps],
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

  const previousProps = Hooks.usePreviousProps(initialProps);

  React.useEffect(() => {
    // This is called before dismount to keep state in sync
    return () => {
      if (initialProps.animate) {
        setAnimationState(previousProps, initialProps);
      }
    };
  }, [setAnimationState, previousProps, initialProps]);

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

VictoryStackBase.propTypes = {
  ...CommonProps.baseProps,
  bins: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        CustomPropTypes.nonNegative,
        PropTypes.instanceOf(Date),
      ]),
    ),
    CustomPropTypes.nonNegative,
  ]),
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.string),
      y: PropTypes.arrayOf(PropTypes.string),
    }),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  colorScale: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.oneOf([
      "grayscale",
      "qualitative",
      "heatmap",
      "warm",
      "cool",
      "red",
      "green",
      "blue",
    ]),
  ]),
  fillInMissingData: PropTypes.bool,
  horizontal: PropTypes.bool,
  labelComponent: PropTypes.element,
  labels: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  style: PropTypes.shape({
    parent: PropTypes.object,
    data: PropTypes.object,
    labels: PropTypes.object,
  }),
  xOffset: PropTypes.number,
};

VictoryStackBase.defaultProps = {
  containerComponent: <VictoryContainer />,
  groupComponent: <g />,
  standalone: true,
  theme: VictoryTheme.grayscale,
  fillInMissingData: true,
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
