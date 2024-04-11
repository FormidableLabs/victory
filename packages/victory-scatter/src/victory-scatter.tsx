import React from "react";
import {
  Helpers,
  VictoryLabel,
  addEvents,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  Data,
  Domain,
  Point,
  UserProps,
  EventPropTypeInterface,
  ScatterSymbolType,
  StringOrNumberOrCallback,
  EventsMixinClass,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
} from "victory-core";
import { getBaseProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  size: 3,
  symbol: "circle",
};

export type VictoryScatterTTargetType = "data" | "labels" | "parent";

export interface VictoryScatterProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  bubbleProperty?: string;
  children?: React.ReactElement | React.ReactElement[];
  events?: EventPropTypeInterface<
    VictoryScatterTTargetType,
    StringOrNumberOrCallback
  >[];
  eventKey?: StringOrNumberOrCallback;
  maxBubbleSize?: number;
  minBubbleSize?: number;
  size?: number | { (data: any): number };
  style?: VictoryStyleInterface;
  symbol?: ScatterSymbolType | { (data: any): ScatterSymbolType };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryScatterBase extends EventsMixinClass<VictoryScatterProps> {}

/**
 * Draw area charts with React. VictoryArea is a composable component, so it doesn't include axes.
 * Add VictoryArea as a child of VictoryChart for a complete chart.
 */
class VictoryScatterBase extends React.Component<VictoryScatterProps> {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "maxBubbleSize",
    "padding",
    "samples",
    "size",
    "style",
    "width",
  ];

  static displayName = "VictoryScatter";
  static role = "scatter";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static defaultProps: VictoryScatterProps = {
    containerComponent: <VictoryContainer />,
    dataComponent: <Point />,
    labelComponent: <VictoryLabel />,
    groupComponent: <g />,
    samples: 50,
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale,
  };

  static getDomain = Domain.getDomain;
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

  render(): React.ReactElement {
    const { animationWhitelist, role } = VictoryScatter;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderData(props);

    const component = props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;

    return UserProps.withSafeUserProps(component, props);
  }
}

export const VictoryScatter = addEvents(VictoryScatterBase);
