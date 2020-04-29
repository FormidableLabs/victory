import React from "react";
import PropTypes from "prop-types";
import { VictoryBar, Bar } from "../../victory-bar/src";
import { VictoryAxis } from "../../victory-axis/src";
import { VictoryChart } from "../../victory-chart/src";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  CommonProps,
  addEvents
} from "../../victory-core/src";
import { getBaseProps, getData, getDomain } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = Array.from({ length: 40 }, () => ({
  x: Math.max(18, Math.floor(Math.random() * 100))
}));

export class VictoryHistogram extends React.Component {
  static animationWhitelist = ["data", "domain", "height", "padding", "style", "width"];

  static displayName = "VictoryHistogram";

  static role = "histogram";

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    barSpacing: PropTypes.number,
    bins: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    cornerRadius: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
      PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        topLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        topRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottomLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottomRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
      })
    ]),
    getPath: PropTypes.func,
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
    const { animationWhitelist, role } = VictoryHistogram;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryHistogram);
