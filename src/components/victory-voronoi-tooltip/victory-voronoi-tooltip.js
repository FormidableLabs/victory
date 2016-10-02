import React from "react";
import { partialRight } from "lodash";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryTooltip, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Voronoi, VictoryGroupContainer
} from "victory-core";
import TooltipHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

class VictoryVoronoiTooltip extends React.Component {
  static displayName = "VictoryVoronoiTooltip";
  static role = "tooltip";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...commonProps,
    ...cartesianProps,
    /**
     * The size prop determines the maximum size of each voronoi area. If this prop
     * is not given, the entire voronoi area will be used.
     */
    size: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    standalone: true,
    x: "x",
    y: "y",
    dataComponent: <Voronoi/>,
    labelComponent: <VictoryTooltip/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryGroupContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(
    TooltipHelpers.getBaseProps.bind(TooltipHelpers), fallbackProps);
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
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "data", "domain", "height", "padding", "samples", "size",
        "style", "width", "x", "y"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, modifiedProps)}
        </VictoryTransition>
      );
    }
    const styleObject = modifiedProps.theme && modifiedProps.theme.voronoi
    ? modifiedProps.theme.voronoi
    : fallbackProps.style;

    const baseStyles = TooltipHelpers.getStyles(style, styleObject, "auto", "100%");

    const group = this.renderGroup(this.renderData(modifiedProps), baseStyles.parent);

    return standalone ? this.renderContainer(modifiedProps, group) : group;
  }
}
export default addEvents(VictoryVoronoiTooltip);
