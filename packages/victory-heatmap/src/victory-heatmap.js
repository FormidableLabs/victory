import React from "react";
import PropTypes from "prop-types";
import { Bar } from "victory-bar";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  CommonProps,
  addEvents,
} from "victory-core";
import { getBaseProps, getData, getDomain } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [];

export class VictoryHeatmap extends React.Component {
  static animationWhitelist = ["data", "domain", "height", "padding", "style", "width"];

  static displayName = "VictoryHeatmap";

  static role = "heatmap";

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
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    data: defaultData,
    dataComponent: <Bar />,
    groupComponent: <g role="presentation" />,
    labelComponent: <VictoryLabel />,
    samples: 50,
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static getDomain = getDomain;
  static getData = getData;
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
    const { animationWhitelist, role } = VictoryHeatmap;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryHeatmap);
