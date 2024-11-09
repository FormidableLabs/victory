import React from "react";
import {
  Helpers,
  VictoryLabel,
  addEvents,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  UserProps,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  StringOrNumberOrList,
  VictoryDatableProps,
  VictoryCommonProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
  EventsMixinClass,
} from "victory-core";
import { ErrorBar } from "./error-bar";
import { getBaseProps, getDomain, getData } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
};

const defaultData = [
  { x: 1, y: 1, errorX: 0.1, errorY: 0.1 },
  { x: 2, y: 2, errorX: 0.2, errorY: 0.2 },
  { x: 3, y: 3, errorX: 0.3, errorY: 0.3 },
  { x: 4, y: 4, errorX: 0.4, errorY: 0.4 },
];

export type VictoryErrorBarTTargetType = "data" | "labels" | "parent";
export type ErrorType =
  | StringOrNumberOrList
  | ((...args: any[]) => StringOrNumberOrList);

export interface VictoryErrorBarProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  borderWidth?: number;
  errorX?: ErrorType;
  errorY?: ErrorType;
  events?: EventPropTypeInterface<
    VictoryErrorBarTTargetType,
    StringOrNumberOrCallback
  >[];
  style?: VictoryStyleInterface;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface VictoryErrorBarBase extends EventsMixinClass<VictoryErrorBarProps> {}

class VictoryErrorBarBase extends React.Component<VictoryErrorBarProps> {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "samples",
    "style",
    "width",
    "errorX",
    "errorY",
    "borderWidth",
  ];

  static displayName = "VictoryErrorBar";
  static role = "errorbar";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static defaultProps: VictoryErrorBarProps = {
    containerComponent: <VictoryContainer />,
    data: defaultData,
    dataComponent: <ErrorBar />,
    labelComponent: <VictoryLabel />,
    groupComponent: <g role="presentation" />,
    samples: 50,
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale,
  };

  static getDomain(props, axis) {
    return getDomain(props, axis);
  }
  static getData(props) {
    return getData(props);
  }
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
    const { animationWhitelist, role } = VictoryErrorBar;
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

export const VictoryErrorBar = addEvents(VictoryErrorBarBase);
