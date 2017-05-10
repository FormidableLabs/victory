import PropTypes from "prop-types";
import React from "react";
import BarHelpers from "./helper-methods";
import { partialRight } from "lodash";
import {
  Helpers, VictoryLabel, VictoryContainer, VictoryTheme, Bar, addEvents, Data, Domain
} from "victory-core";
import { BaseProps, DataProps } from "../../helpers/common-props";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 }
];

const animationWhitelist = ["data", "domain", "height", "padding", "style", "width"];

class VictoryBar extends React.Component {
  static displayName = "VictoryBar";

  static role = "bar";

  static defaultTransitions = {
    onLoad: {
      duration: 2000,
      before: () => ({ _y: 0, _y1: 0, _y0: 0 }),
      after: (datum) => ({ _y: datum._y, _y1: datum._y1, _y0: datum._y0 })
    },
    onExit: {
      duration: 500,
      before: () => ({ _y: 0, yOffset: 0 })
    },
    onEnter: {
      duration: 500,
      before: () => ({ _y: 0, _y1: 0, _y0: 0 }),
      after: (datum) => ({ _y: datum._y, _y1: datum._y1, _y0: datum._y0 })
    }
  };

  static propTypes = {
    ...BaseProps,
    ...DataProps,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    data: defaultData,
    dataComponent: <Bar/>,
    labelComponent: <VictoryLabel/>,
    scale: "linear",
    standalone: true,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g role="presentation"/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(BarHelpers.getBaseProps.bind(BarHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps((this.props), fallbackProps, role);
    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }
    const children = this.renderData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryBar);
