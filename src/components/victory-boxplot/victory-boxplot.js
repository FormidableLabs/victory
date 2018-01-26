import React from "react";
import PropTypes from "prop-types";
import { partialRight } from "lodash";
import { BaseProps, DataProps } from "../../helpers/common-props";
import {
    Helpers, VictoryLabel, addEvents, Line,
    VictoryContainer, VictoryTheme, Box, Whisker
} from "victory-core";
import BoxPlotHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }
};

const defaultData = [
  { x: 1, y: 8 },
  { x: 1, y: 8 },
  { x: 1, y: 9 },
  { x: 1, y: 10 },
  { x: 1, y: 8 },
  { x: 1, y: 9 },
  { x: 1, y: 9 },
  { x: 1, y: 13 },
  { x: 1, y: 7 },
  { x: 1, y: 9 },
  { x: 1, y: 10 }
];

// const defaultData = [
//   { x: 8, y: 1 },
//   { x: 8, y: 1 },
//   { x: 9, y: 1 },
//   { x: 10, y: 1 },
//   { x: 8, y: 1 },
//   { x: 9, y: 1 },
//   { x: 9, y: 1 },
//   { x: 13, y: 1 },
//   { x: 7, y: 1 },
//   { x: 9, y: 1 },
//   { x: 10, y: 1 }
// ];

class VictoryBoxPlot extends React.Component {

  static displayName = "VictoryBoxPlot";
  static role = "boxplot"
  static propTypes = {
    ...BaseProps,
    ...DataProps,
    boxWidth: PropTypes.number,
    maxComponent: PropTypes.element,
    maxLabelComponent: PropTypes.element,
    medianComponent: PropTypes.element,
    medianLabelComponent: PropTypes.element,
    minComponent: PropTypes.element,
    minLabelComponent: PropTypes.element,
    q1Component: PropTypes.element,
    q1LabelComponent: PropTypes.element,
    q3Component: PropTypes.element,
    q3LabelComponent: PropTypes.element
  }

  static defaultProps = {
    boxWidth: 20,
    containerComponent: <VictoryContainer/>,
    data: defaultData,
    dataComponent: <Box />,
    groupComponent: <g role="presentation"/>,
    horizontal: true,
    maxComponent: <Whisker />,
    maxLabelComponent: <VictoryLabel />,
    medianComponent: <Line />,
    medianLabelComponent: <VictoryLabel />,
    minComponent: <Whisker />,
    minLabelComponent: <VictoryLabel />,
    q1Component: <Box />,
    q1LabelComponent: <VictoryLabel />,
    q3Component: <Box />,
    q3LabelComponent: <VictoryLabel />,
    samples: 50,
    scale: "linear",
    sortKey: "x",
    sortOrder: "ascending",
    theme: VictoryTheme.grayscale
  };

  static getDomain = BoxPlotHelpers.getDomain.bind(BoxPlotHelpers);
  static getData = BoxPlotHelpers.getData.bind(BoxPlotHelpers);
  static getBaseProps = partialRight(
      BoxPlotHelpers.getBaseProps.bind(BoxPlotHelpers),
      fallbackProps
  );

  getBoxPlotComponent(statistic, props) {
    const { q1Component, q3Component, minComponent, maxComponent, medianComponent } = props;
    switch (statistic) {
    case "q1":
      return q1Component;
    case "q3":
      return q3Component;
    case "min":
      return minComponent;
    case "max":
      return maxComponent;
    case "median":
      return medianComponent;
    default:
      return null;
    }
  }

  getLabelComponent(statistic, props) {
    const {
      q1LabelComponent,
      q3LabelComponent,
      minLabelComponent,
      maxLabelComponent,
      medianLabelComponent
    } = props;
    switch (statistic) {
    case "q1":
      return q1LabelComponent;
    case "q3":
      return q3LabelComponent;
    case "min":
      return minLabelComponent;
    case "max":
      return maxLabelComponent;
    case "median":
      return medianLabelComponent;
    default:
      return null;
    }
  }

  renderBoxPlot(props) {
    const boxPlotComponents = this.dataKeys
      .filter((_dataKey) => _dataKey !== "x" && _dataKey !== "y")
      .map((_dataKey, index) => {
        const boxPlotComponent = this.getBoxPlotComponent(_dataKey, props);
        const boxPlotProps = this.getComponentProps(boxPlotComponent, "data", index);
        return React.cloneElement(boxPlotComponent, boxPlotProps);
      });

    const labelComponents = this.dataKeys
      .filter((_dataKey) => _dataKey !== "x" && _dataKey !== "y")
      .map((_dataKey, index) => {
        const labelComponent = this.getLabelComponent(_dataKey, props);
        const labelProps = this.getComponentProps(labelComponent, "labels", index);
        if (typeof labelProps.text !== "undefined" && labelProps.text !== null) {
          return React.cloneElement(labelComponent, labelProps);
        }
        return undefined;
      }).filter(Boolean);

    const children = [...boxPlotComponents, ...labelComponents];
    return this.renderContainer(props.groupComponent, children);
  }
  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    const children = this.renderBoxPlot(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryBoxPlot);
