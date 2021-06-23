import PropTypes from "prop-types";
import React from "react";
import { getBaseProps } from "./helper-methods";
import Curve from "./curve";
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
  CommonProps
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear"
};

const options = {
  components: [
    { name: "parent", index: "parent" },
    { name: "data", index: "all" },
    { name: "labels" }
  ]
};

class VictoryLine extends React.Component {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "samples",
    "style",
    "width"
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
        "stepBefore"
      ]),
      PropTypes.func
    ]),
    label: CustomPropTypes.deprecated(
      PropTypes.string,
      "Use `labels` instead for individual data labels"
    )
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
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomain;
  static getData = Data.getData;
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static expectedComponents = [
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent"
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { animationWhitelist, role } = VictoryLine;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderContinuousData(props);
    return props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;
  }
}
export default addEvents(VictoryLine, options);
