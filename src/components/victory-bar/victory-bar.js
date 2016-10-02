import React, { PropTypes } from "react";
import BarHelpers from "./helper-methods";
import addEvents from "../victory-base/add-events";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import { partialRight } from "lodash";
import {
  Helpers, VictoryTransition, VictoryLabel, VictoryContainer,
  VictoryTheme, Bar, VictoryGroupContainer
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  {x: 1, y: 1},
  {x: 2, y: 2},
  {x: 3, y: 3},
  {x: 4, y: 4}
];

class VictoryBar extends React.Component {
  static displayName = "VictoryBar";

  static role = "bar";

  static defaultTransitions = {
    onLoad: {
      duration: 2000,
      before: () => ({ y: 0, y1: 0, y0: 0 }),
      after: (datum) => ({ y: datum.y, y1: datum.y1, y0: datum.y0 })
    },
    onExit: {
      duration: 500,
      before: () => ({ y: 0, yOffset: 0 })
    },
    onEnter: {
      duration: 500,
      before: () => ({ y: 0, y1: 0, y0: 0 }),
      after: (datum) => ({ y: datum.y, y1: datum.y1, y0: datum.y0 })
    }
  };

  static propTypes = {
    ...cartesianProps,
    ...commonProps,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    data: defaultData,
    dataComponent: <Bar/>,
    labelComponent: <VictoryLabel/>,
    scale: "linear",
    standalone: true,
    x: "x",
    y: "y",
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryGroupContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(BarHelpers.getBaseProps.bind(BarHelpers), fallbackProps);
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
    const { role } = this.constructor;
    const props = Helpers.modifyProps((this.props), fallbackProps, role);
    const { animate, style, standalone, theme } = props;
    if (animate) {
      const animationWhitelist = [
        "data", "domain", "height", "padding", "style", "width"
      ];

      return (
        <VictoryTransition animate={animate} animationWhitelist={animationWhitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    const styleObject = theme && theme[role] && theme[role].style ? theme[role].style : {};

    const baseStyles = Helpers.getStyles(style, styleObject, "auto", "100%");
    const group = this.renderGroup(
      this.renderData(props), props, baseStyles
    );

    return standalone ? this.renderContainer(props, group) : group;
  }
}

export default addEvents(VictoryBar);

