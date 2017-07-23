import { partialRight } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import LineHelpers from "./helper-methods";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryLabel, addEvents, VictoryContainer, VictoryTheme,
  DefaultTransitions, Curve, VictoryClipContainer, Data, Domain
} from "victory-core";
import { BaseProps, DataProps } from "../../helpers/common-props";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear"
};

const options = {
  components: [
    { name: "parent", index: "parent" }, { name: "data", index: "all" }, { name: "labels" }
  ]
};

const animationWhitelist = ["data", "domain", "height", "padding", "samples", "style", "width"];

class VictoryLine extends React.Component {
  static displayName = "VictoryLine";
  static role = "line";
  static defaultTransitions = DefaultTransitions.continuousTransitions();
  static defaultPolarTransitions = DefaultTransitions.continuousPolarTransitions();
  static continuous = true;

  static propTypes = {
    ...BaseProps,
    ...DataProps,
    interpolation: PropTypes.oneOf([
      "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX",
      "monotoneY", "natural", "step", "stepAfter", "stepBefore"
    ]),
    label: CustomPropTypes.deprecated(
      PropTypes.string,
      "Use `labels` instead for individual data labels"
    )
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    standalone: true,
    sortKey: "x",
    dataComponent: <Curve/>,
    labelComponent: <VictoryLabel renderInPortal/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryClipContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(LineHelpers.getBaseProps.bind(LineHelpers),
    fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }
    const children = this.renderContinuousData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}
export default addEvents(VictoryLine, options);
