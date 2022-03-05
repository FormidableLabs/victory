import PropTypes from "prop-types";
import React from "react";
import {
  addEvents,
  CommonProps,
  Data,
  DefaultTransitions,
  Domain,
  Helpers,
  Point,
  PropTypes as CustomPropTypes,
  UserProps,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme
} from "victory-core";
import { getBaseProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  size: 3,
  symbol: "circle"
};

class VictoryScatter extends React.Component {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "maxBubbleSize",
    "padding",
    "samples",
    "size",
    "style",
    "width"
  ];

  static displayName = "VictoryScatter";
  static role = "scatter";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    bubbleProperty: PropTypes.string,
    maxBubbleSize: CustomPropTypes.nonNegative,
    minBubbleSize: CustomPropTypes.nonNegative,
    size: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle",
        "cross",
        "diamond",
        "plus",
        "minus",
        "square",
        "star",
        "triangleDown",
        "triangleUp"
      ]),
      PropTypes.func
    ])
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    dataComponent: <Point />,
    labelComponent: <VictoryLabel />,
    groupComponent: <g />,
    samples: 50,
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
    const { animationWhitelist, role } = VictoryScatter;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const userProps = UserProps.getSafeUserProps(props);
    const children = this.renderData(props);
    const container = React.cloneElement(
      props.containerComponent,
      { ...userProps },
      children
    );
    return props.standalone
      ? this.renderContainer(container, children)
      : children;
  }
}

export default addEvents(VictoryScatter);
