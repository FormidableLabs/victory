import React, { PropTypes } from "react";
import { partialRight } from "lodash";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Point, VictoryGroupContainer
} from "victory-core";
import ScatterHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  size: 3,
  symbol: "circle"
};

class VictoryScatter extends React.Component {
  static displayName = "VictoryScatter";
  static role = "scatter";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...commonProps,
    ...cartesianProps,
    /**
     * The bubbleProperty prop indicates which property of the data object should be used
     * to scale data points in a bubble chart
     */
    bubbleProperty: PropTypes.string,
    /**
     * The maxBubbleSize prop sets an upper limit for scaling data points in a bubble chart
     */
    maxBubbleSize: CustomPropTypes.nonNegative,
    /**
     * The symbol prop determines which symbol should be drawn to represent data points.
     */
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"
      ]),
      PropTypes.func
    ])
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    standalone: true,
    x: "x",
    y: "y",
    dataComponent: <Point/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryGroupContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(
    ScatterHelpers.getBaseProps.bind(ScatterHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  renderContainer(props, group) {
    const { containerComponent } = props;
    const parentProps = this.getComponentProps(containerComponent, "parent", "parent");
    return React.cloneElement(containerComponent, parentProps, group);
  }

  renderGroup(children, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      children
    );
  }

  renderData(props) {
    const { dataComponent, labelComponent, groupComponent } = props;
    const dataComponents = [];
    const labelComponents = [];
    for (let index = 0, len = this.dataKeys.length; index < len; index++) {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      dataComponents[index] = React.cloneElement(dataComponent, dataProps);

      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
        labelComponents[index] = React.cloneElement(labelComponent, labelProps);
      }
    }
    return labelComponents.length > 0 ?
      React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents) :
      dataComponents;
  }

  render() {
    const modifiedProps = Helpers.modifyProps(this.props, fallbackProps);
    const { animate, style, standalone } = modifiedProps;

    if (animate) {
      const whitelist = [
        "data", "domain", "height", "maxBubbleSize", "padding", "samples", "size",
        "style", "width", "x", "y"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, modifiedProps)}
        </VictoryTransition>
      );
    }

    const styleObject = modifiedProps.theme && modifiedProps.theme.scatter
    ? modifiedProps.theme.scatter
    : fallbackProps.style;

    const baseStyles = Helpers.getStyles(style, styleObject, "auto", "100%");

    const group = this.renderGroup(this.renderData(modifiedProps), baseStyles.parent);

    return standalone ? this.renderContainer(modifiedProps, group) : group;
  }
}

export default addEvents(VictoryScatter);
