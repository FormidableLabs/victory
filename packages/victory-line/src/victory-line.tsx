import PropTypes from "prop-types";
import React from "react";
import { getBaseProps } from "./helper-methods";
import { Curve } from "./curve";
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryLineBase extends EventsMixinClass<VictoryLineProps> {}

class VictoryLineBase extends React.Component<VictoryLineProps> {
  constructor(props) {
    super(props);
  }

  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "samples",
    "style",
    "width",
  ];

  static displayName = "VictoryLine";
  static role = "line";
  static defaultTransitions = DefaultTransitions.continuousTransitions();
  static defaultPolarTransitions =
    DefaultTransitions.continuousPolarTransitions();
  static continuous = true;

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
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
    label: CustomPropTypes.deprecated(
      PropTypes.string,
      "Use `labels` instead for individual data labels",
    ),
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    dataComponent: <Curve />,
    labelComponent: <VictoryLabel renderInPortal />,
    groupComponent: <VictoryClipContainer />,
    samples: 50,
    sortKey: "x",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale,
  };

  static getDomain = Domain.getDomain;
  static getData = Data.getData;
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
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
    const { animationWhitelist, role } = VictoryLineBase;
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
export const VictoryLine = addEvents(VictoryLineBase, options);

export type VictoryLineTTargetType = "data" | "labels" | "parent";

export interface VictoryLineProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  events?: EventPropTypeInterface<VictoryLineTTargetType, number | string>[];
  eventKey?: StringOrNumberOrCallback | string[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  interpolation?: InterpolationPropType | Function;
  samples?: number;
  style?: VictoryStyleInterface;
}
