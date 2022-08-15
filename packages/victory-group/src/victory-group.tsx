import { assign, defaults, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  CategoryPropType,
  ColorScalePropType,
  CommonProps,
  DomainPaddingPropType,
  DomainPropType,
  EventPropTypeInterface,
  Helpers,
  Hooks,
  StringOrNumberOrCallback,
  UserProps,
  VictoryCommonProps,
  VictoryContainer,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
  VictoryTheme,
  Wrapper,
  VictoryComponentConfiguration,
} from "victory-core";
import { VictorySharedEvents } from "victory-shared-events";
import { getChildren, useMemoizedProps } from "./helper-methods";
import isEqual from "react-fast-compare";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  offset: 0,
};

export type VictoryGroupTTargetType = "data" | "labels" | "parent";
export interface VictoryGroupProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  categories?: CategoryPropType;
  children?: React.ReactNode;
  color?: string;
  colorScale?: ColorScalePropType;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  events?: EventPropTypeInterface<
    VictoryGroupTTargetType,
    StringOrNumberOrCallback
  >[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  offset?: number;
  style?: VictoryStyleInterface;
  displayName?: string;
}

const VictoryGroupBase: React.FC<VictoryGroupProps> = (initialProps) => {
  // eslint-disable-next-line no-use-before-define
  const role = VictoryGroup?.role;
  const { getAnimationProps, setAnimationState, getProps } =
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
  const { domain, scale, style, origin } = calculatedProps;

  const newChildren = React.useMemo(() => {
    const children = getChildren(props, childComponents, calculatedProps);
    return children.map((child, index) => {
      const childProps = assign(
        { animate: getAnimationProps(props, child, index) },
        child.props,
      );
      return React.cloneElement(child, childProps);
    });
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
        origin,
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
    origin,
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
        setAnimationState(previousProps, props);
      }
    };
  }, [setAnimationState, previousProps, initialProps, props]);

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

VictoryGroupBase.propTypes = {
  ...CommonProps.baseProps,
  ...CommonProps.dataProps,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  horizontal: PropTypes.bool,
  offset: PropTypes.number,
};

VictoryGroupBase.defaultProps = {
  containerComponent: <VictoryContainer />,
  groupComponent: <g />,
  samples: 50,
  sortOrder: "ascending",
  standalone: true,
  theme: VictoryTheme.grayscale,
};

const componentConfig: VictoryComponentConfiguration<VictoryGroupProps> = {
  role: "group",
  expectedComponents: [
    "groupComponent",
    "containerComponent",
    "labelComponent",
  ],
  getChildren,
};

export const VictoryGroup = Object.assign(
  React.memo(VictoryGroupBase, isEqual),
  componentConfig,
);
VictoryGroup.displayName = "VictoryGroup";
