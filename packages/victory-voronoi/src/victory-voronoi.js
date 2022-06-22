import React from "react";
import {
  PropTypes as CustomPropTypes,
  Helpers,
  VictoryLabel,
  addEvents,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  Data,
  Domain,
  CommonProps,
  UserProps,
} from "victory-core";
import Voronoi from "./voronoi";
import { getBaseProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
};

class VictoryVoronoi extends React.Component {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "samples",
    "size",
    "style",
    "width",
  ];

  static displayName = "VictoryVoronoi";
  static role = "voronoi";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    size: CustomPropTypes.nonNegative,
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    dataComponent: <Voronoi />,
    labelComponent: <VictoryLabel />,
    groupComponent: <g role="presentation" />,
    samples: 50,
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
    const { animationWhitelist, role } = VictoryVoronoi;
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

export default addEvents(VictoryVoronoi);
