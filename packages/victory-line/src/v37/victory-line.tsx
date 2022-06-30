import PropTypes, { number } from "prop-types";
import React, { ReactElement, ValidationMap, WeakValidationMap } from "react";
import { assign, defaults, without } from "lodash";
import { Curve, CurveProps } from "../curve";
import {
  PropTypes as CustomPropTypes,
  Helpers,
  VictoryLabel,
  addEvents,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  VictoryClipContainer,
  Data,
  Domain,
  CommonProps,
  UserProps,
  EventPropTypeInterface,
  InterpolationPropType,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryLabelableProps,
  VictoryStyleInterface,
  EventsMixinClass,
  Path,
  LineHelpers,
  defaultPropsFor,
  useData,
  useDomain,
  useScale,
  VictoryClipContainerProps,
  VictoryLabelProps,
  withContainer,
  withDefaultProps,
  Events,
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear",
};

export interface VictoryLineProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interpolation?: InterpolationPropType | Function;
  samples?: number;
  style?: VictoryStyleInterface;
  animate?: boolean;
}

const Clone = <TProps,>(
  props: React.PropsWithChildren<
    {
      element: React.ReactElement<TProps>;
      children?: React.ReactNode | React.ReactNode[];
    } & TProps
  >,
) => {
  const { children, element, ...rest } = props;
  return React.cloneElement(element, rest as unknown as TProps, children);
};

export const VictoryLineBase = (props: VictoryLineProps) => {
  const data = useData();
  const scale = useScale();
  const domain = useDomain();
  const dataProps = { ...props, data, scale, domain };

  return (
    <Clone element={props.groupComponent}>
      <Clone element={props.dataComponent} {...dataProps} />
    </Clone>
  );
};

const defaultProps: Pick<
  VictoryLineProps,
  | "data"
  | "containerComponent"
  | "dataComponent"
  | "labelComponent"
  | "groupComponent"
  | "samples"
  | "sortKey"
  | "sortOrder"
  | "standalone"
  | "theme"
> = {
  data: [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ],
  containerComponent: <VictoryContainer />,
  dataComponent: (<Curve />) as React.ReactElement<CurveProps>,
  labelComponent: (
    <VictoryLabel renderInPortal />
  ) as React.ReactElement<VictoryLabelProps>,
  groupComponent: (
    <VictoryClipContainer />
  ) as React.ReactElement<VictoryClipContainerProps>,
  samples: 50,
  sortKey: "x",
  sortOrder: "ascending",
  standalone: true,
  theme: VictoryTheme.grayscale,
};

VictoryLineBase.defaultProps = defaultProps;

VictoryLineBase.propTypes = {
  interpolation: PropTypes.oneOfType([
    PropTypes.oneOf([
      "basis",
      "bundle",
      "cardinal",
      "catmullRom",
      "linear",
      "monotoneX",
      "monotoneY",
      "natural",
      "step",
      "stepAfter",
      "stepBefore",
    ]),
    PropTypes.func,
  ]),
};

export const VictoryLine = withContainer(VictoryLineBase);

export type VictoryLineTTargetType = "data" | "labels" | "parent";

namespace AddEvents {
  const that: {
    dataKeys;
    baseProps;
    hasEvents;
    getEvents;
    props;
    globalEvents;
    getEventState;
    getSharedEventState;
  } = null as any;

  export function renderContinuousData(props) {
    const { dataComponent, labelComponent, groupComponent } = props;
    const dataKeys = without(that.dataKeys, "all");
    const labelComponents = dataKeys.reduce((memo, key) => {
      const labelProps = getComponentProps(labelComponent, "labels", key);
      if (
        labelProps &&
        labelProps.text !== undefined &&
        labelProps.text !== null
      ) {
        memo = memo.concat(React.cloneElement(labelComponent, labelProps));
      }
      return memo;
    }, [] as React.ReactElement[]);

    const dataProps = getComponentProps(dataComponent, "data", "all");
    const children = [
      React.cloneElement(dataComponent, dataProps),
      ...labelComponents,
    ];
    return renderContainer(groupComponent, children);
  }

  function renderContainer(component, children) {
    const isContainer = component.type && component.type.role === "container";
    const parentProps = isContainer
      ? getComponentProps(component, "parent", "parent")
      : {};

    if (parentProps.events) {
      that.globalEvents = Events.getGlobalEvents(parentProps.events);
      parentProps.events = Events.omitGlobalEvents(parentProps.events);
    }

    return React.cloneElement(component, parentProps, children);
  }

  function getComponentProps(
    component: React.ReactElement,
    type: "labels" | "data" | "parent",
    index: "parent" | "all" | string | number,
  ) {
    const name = that.props.name || WrappedComponent.role;
    const key = (that.dataKeys && that.dataKeys[index]) || index;
    const id = `${name}-${type}-${key}`;

    const baseProps =
      (that.baseProps[key] && that.baseProps[key][type]) || that.baseProps[key];

    if (!baseProps && !that.hasEvents) {
      return undefined;
    }

    if (that.hasEvents) {
      const baseEvents = that.getEvents(that.props, type, key);
      const componentProps = defaults(
        { index, key: id },
        that.getEventState(key, type),
        that.getSharedEventState(key, type),
        component.props,
        baseProps,
        { id },
      );

      const events = defaults(
        {},
        Events.getPartialEvents(baseEvents, key, componentProps),
        componentProps.events,
      );

      return assign({}, componentProps, { events });
    }

    return defaults({ index, key: id }, component.props, baseProps, { id });
  }
}
