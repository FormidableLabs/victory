import PropTypes from "prop-types";
import React from "react";
import { getBaseProps } from "./helper-methods";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryLabel, VictoryContainer,
  DefaultTransitions, Area, VictoryClipContainer, addEvents, VictoryTheme, Data, Domain
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

const animationWhitelist = ["data", "domain", "height", "padding", "style", "width"];

class VictoryArea extends React.Component {

  static propTypes = {
    ...BaseProps,
    ...DataProps,
    interpolation: PropTypes.oneOf([
      "basis", "cardinal", "catmullRom", "linear", "monotoneX",
      "monotoneY", "natural", "step", "stepAfter", "stepBefore"
    ]),
    label: CustomPropTypes.deprecated(
      PropTypes.string,
      "Use `labels` instead for individual data labels"
    )
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    dataComponent: <Area/>,
    groupComponent: <VictoryClipContainer/>,
    labelComponent: <VictoryLabel renderInPortal/>,
    samples: 50,
    scale: "linear",
    sortKey: "x",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static displayName = "VictoryArea";
  static role = "area";
  static continuous = true;
  static defaultTransitions = DefaultTransitions.continuousTransitions();
  static defaultPolarTransitions = DefaultTransitions.continuousPolarTransitions();
  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
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

export default addEvents(VictoryArea, options);
