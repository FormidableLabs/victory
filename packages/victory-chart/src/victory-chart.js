import { defaults, assign, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  Background,
  CommonProps,
  Helpers,
  Hooks,
  PropTypes as CustomPropTypes,
  UserProps,
  VictoryContainer,
  VictoryTheme,
  Wrapper
} from "victory-core";
import { VictorySharedEvents } from "victory-shared-events";
import { VictoryAxis } from "victory-axis";
import { VictoryPolarAxis } from "victory-polar-axis";
import {
  getBackgroundWithProps,
  getChildComponents,
  getCalculatedProps,
  getChildren
} from "./helper-methods";
import isEqual from "react-fast-compare";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const VictoryChart = (initialProps) => {
  const role = "chart";
  const { getAnimationProps, setAnimationState, getProps } =
    Hooks.useAnimationState();
  const props = getProps(initialProps);

  const modifiedProps = Helpers.modifyProps(props, fallbackProps, role);
  const {
    desc,
    eventKey,
    containerComponent,
    standalone,
    groupComponent,
    externalEventMutations,
    width,
    height,
    theme,
    polar,
    name,
    title
  } = modifiedProps;

  const axes = props.polar
    ? modifiedProps.defaultPolarAxes
    : modifiedProps.defaultAxes;

  const childComponents = React.useMemo(
    () => getChildComponents(modifiedProps, axes),
    [modifiedProps, axes]
  );

  const calculatedProps = React.useMemo(
    () => getCalculatedProps(modifiedProps, childComponents),
    [modifiedProps, childComponents]
  );
  const { domain, scale, style, origin, radius, horizontal } = calculatedProps;

  const newChildren = React.useMemo(() => {
    const children = getChildren(props, childComponents, calculatedProps);

    const mappedChildren = children.map((child, index) => {
      const childProps = assign(
        { animate: getAnimationProps(props, child, index, "victory chart") },
        child.props
      );
      return React.cloneElement(child, childProps);
    });

    if (props.style && props.style.background) {
      const backgroundComponent = getBackgroundWithProps(
        props,
        calculatedProps
      );

      mappedChildren.unshift(backgroundComponent);
    }

    return mappedChildren;
  }, [getAnimationProps, childComponents, props, calculatedProps]);

  const containerProps = React.useMemo(() => {
    if (standalone) {
      return {
        desc,
        domain,
        width,
        height,
        horizontal,
        name,
        origin: polar ? origin : undefined,
        polar,
        radius,
        theme,
        title,
        scale,
        standalone,
        style: style.parent
      };
    }
    return {};
  }, [
    desc,
    domain,
    height,
    horizontal,
    name,
    origin,
    polar,
    radius,
    scale,
    standalone,
    style,
    title,
    theme,
    width
  ]);

  const container = React.useMemo(() => {
    if (standalone) {
      const defaultContainerProps = defaults(
        {},
        containerComponent.props,
        containerProps,
        UserProps.getSafeUserProps(initialProps)
      );
      return React.cloneElement(containerComponent, defaultContainerProps);
    }
    return groupComponent;
  }, [
    groupComponent,
    standalone,
    containerComponent,
    containerProps,
    initialProps
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

VictoryChart.propTypes = {
  ...CommonProps.baseProps,
  backgroundComponent: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  defaultAxes: PropTypes.shape({
    independent: PropTypes.element,
    dependent: PropTypes.element
  }),
  defaultPolarAxes: PropTypes.shape({
    independent: PropTypes.element,
    dependent: PropTypes.element
  }),
  endAngle: PropTypes.number,
  innerRadius: CustomPropTypes.nonNegative,
  prependDefaultAxes: PropTypes.bool,
  startAngle: PropTypes.number
};

VictoryChart.defaultProps = {
  backgroundComponent: <Background />,
  containerComponent: <VictoryContainer />,
  defaultAxes: {
    independent: <VictoryAxis />,
    dependent: <VictoryAxis dependentAxis />
  },
  defaultPolarAxes: {
    independent: <VictoryPolarAxis />,
    dependent: <VictoryPolarAxis dependentAxis />
  },
  groupComponent: <g />,
  standalone: true,
  theme: VictoryTheme.grayscale
};

const VictoryChartMemo = React.memo(VictoryChart, isEqual);

VictoryChartMemo.displayName = "VictoryChart";
VictoryChartMemo.expectedComponents = ["groupComponent", "containerComponent"];

export default VictoryChartMemo;
