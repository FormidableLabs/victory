import { partialRight } from "lodash";
import React, { PropTypes } from "react";
import AreaHelpers from "./helper-methods";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import {
  Helpers, VictoryTransition, VictoryLabel, VictoryContainer, VictoryTheme,
  DefaultTransitions, Area, VictoryGroupContainer, addEvents
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear"
};

class VictoryArea extends React.Component {
  static displayName = "VictoryArea";
  static role = "area";
  static defaultTransitions = DefaultTransitions.continuousTransitions();

  static propTypes = {
    ...cartesianProps,
    ...commonProps,
    /**
     * The label prop defines the label that will appear at the end of the line.
     * This prop should be given a string or as a function of data. If individual
     * labels are required for each data point, they should be created by composing
     * VictoryLine with VictoryScatter
     * @examples: "Series 1", (data) => `${data.length} points`
     */
    label: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    /**
     * The interpolation prop determines how data points should be connected
     * when plotting a line
     */
    interpolation: PropTypes.oneOf([
      "basis",
      "basisClosed",
      "basisOpen",
      "bundle",
      "cardinal",
      "cardinalClosed",
      "cardinalOpen",
      "catmullRom",
      "catmullRomClosed",
      "catmullRomOpen",
      "linear",
      "linearClosed",
      "monotoneX",
      "monotoneY",
      "natural",
      "radial",
      "step",
      "stepAfter",
      "stepBefore"
    ])
  };

  static defaultProps = {
    dataComponent: <Area/>,
    labelComponent: <VictoryLabel/>,
    scale: "linear",
    samples: 50,
    standalone: true,
    x: "x",
    y: "y",
    containerComponent: <VictoryContainer />,
    groupComponent: <VictoryGroupContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(AreaHelpers.getBaseProps.bind(AreaHelpers), fallbackProps);
  static getScale = partialRight(AreaHelpers.getScale.bind(AreaHelpers),
    fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];


  renderData(props) {
    const { dataComponent, labelComponent, groupComponent } = props;
    const dataProps = this.getComponentProps(dataComponent, "data", "all");
    const areaComponent = React.cloneElement(dataComponent, dataProps);

    const labelProps = this.getComponentProps(labelComponent, "labels", "all");
    if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
      const areaLabel = React.cloneElement(labelComponent, labelProps);
      return React.cloneElement(groupComponent, {}, areaComponent, areaLabel);
    }
    return areaComponent;
  }

  renderContainer(props, group) {
    const { containerComponent } = props;
    const parentProps = this.getComponentProps(containerComponent, "parent", "parent");
    return React.cloneElement(containerComponent, parentProps, group);
  }

  renderGroup(children, props, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      children
    );
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "area");
    const { animate, style, standalone, theme } = props;

    if (animate) {
      const whitelist = [
        "data", "domain", "height", "padding", "style", "width",
        "x", "y"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    const styleObject = theme && theme.area ? theme.area.style : {};

    const baseStyles = Helpers.getStyles(style, styleObject, "auto", "100%");

    const group = this.renderGroup(
      this.renderData(props), props, baseStyles.parent
    );

    return standalone ? this.renderContainer(props, group) : group;
  }
}

export default addEvents(VictoryArea);

