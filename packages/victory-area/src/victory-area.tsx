import React from "react";
import { getBaseProps } from "./helper-methods";
import { Area } from "./area";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  DefaultTransitions,
  VictoryClipContainer,
  addEvents,
  VictoryTheme,
  Data,
  Domain,
  UserProps,
  EventPropTypeInterface,
  InterpolationPropType,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
  EventsMixinClass,
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear",
};

const options = {
  components: [
    { name: "parent", index: "parent" },
    { name: "data", index: "all" },
    { name: "labels" },
  ],
};

export type VictoryAreaTTargetType = "data" | "labels" | "parent";

export interface VictoryAreaProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  eventKey?: string[] | number[] | StringOrNumberOrCallback;
  events?: EventPropTypeInterface<VictoryAreaTTargetType, string | number>[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  interpolation?: InterpolationPropType | Function;
  samples?: number;
  style?: VictoryStyleInterface;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryAreaBase extends EventsMixinClass<VictoryAreaProps> {}

/**
 * Draw area charts with React. VictoryArea is a composable component, so it doesn't include axes.
 * Add VictoryArea as a child of VictoryChart for a complete chart.
 */
class VictoryAreaBase extends React.Component<VictoryAreaProps> {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "style",
    "width",
  ];

  static defaultProps: VictoryAreaProps = {
    containerComponent: <VictoryContainer />,
    dataComponent: <Area />,
    groupComponent: <VictoryClipContainer />,
    labelComponent: <VictoryLabel renderInPortal />,
    samples: 50,
    sortKey: "x",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale,
  };

  static displayName = "VictoryArea";
  static role = "area";
  static continuous = true;
  static defaultTransitions = DefaultTransitions.continuousTransitions();
  static defaultPolarTransitions =
    DefaultTransitions.continuousPolarTransitions();
  static getDomain = Domain.getDomainWithZero;
  static getData = Data.getData;
  static getBaseProps(props) {
    return getBaseProps(props, fallbackProps);
  }
  static expectedComponents = [
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent",
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { animationWhitelist, role } = VictoryAreaBase;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderContinuousData(props);
    const component = props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;

    return UserProps.withSafeUserProps(component, props);
  }
}

export const VictoryArea = addEvents(VictoryAreaBase, options);
