import React from "react";
import PropTypes from "prop-types";
import { partialRight, mapValues } from "lodash";
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

// const defaultData = [
//   { x: 1, y: 8 },
//   { x: 1, y: 8 },
//   { x: 1, y: 9 },
//   { x: 1, y: 10 },
//   { x: 1, y: 8 },
//   { x: 1, y: 9 },
//   { x: 1, y: 9 },
//   { x: 1, y: 13 },
//   { x: 1, y: 7 },
//   { x: 1, y: 9 },
//   { x: 1, y: 10 }
// ];

const defaultData = [
  { x: 1, min: 5, q1: 7, med: 12, q3: 18, max: 20 },
  { x: 2, min: 2, q1: 5, med: 8, q3: 12, max: 15 }
];

class VictoryBoxPlot extends React.Component {

  static displayName = "VictoryBoxPlot";
  static role = "boxplot"
  static propTypes = {
    ...BaseProps,
    ...DataProps,
    boxWidth: PropTypes.number,
    horizontal: PropTypes.bool,
    labelOrientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    maxComponent: PropTypes.element,
    maxLabelComponent: PropTypes.element,
    medianComponent: PropTypes.element,
    medianLabelComponent: PropTypes.element,
    minComponent: PropTypes.element,
    minLabelComponent: PropTypes.element,
    q1Component: PropTypes.element,
    q1LabelComponent: PropTypes.element,
    q3Component: PropTypes.element,
    q3LabelComponent: PropTypes.element,
    style: PropTypes.shape({
      boxes: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object,
      max: PropTypes.object,
      maxLabel: PropTypes.object,
      median: PropTypes.object,
      medianLabel: PropTypes.object,
      min: PropTypes.object,
      minLabel: PropTypes.object,
      q1: PropTypes.object,
      q1Label: PropTypes.object,
      q3: PropTypes.object,
      q3Label: PropTypes.object,
      whiskers: PropTypes.object
    })
  }

  static defaultProps = {
    boxWidth: 20,
    containerComponent: <VictoryContainer/>,
    data: defaultData,
    dataComponent: <Box/>,
    groupComponent: <g role="presentation"/>,
    labelOrientation: "right",
    maxComponent: <Whisker />,
    maxLabelComponent: <VictoryLabel />,
    medComponent: <Line />,
    medLabelComponent: <VictoryLabel />,
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
    return props[`${statistic}Component`];
  }

  getLabelComponent(statistic, props) {
    return props[`${statistic}LabelComponent`];
  }

  renderBoxPlot(props) {
    const boxPlotComponents = this.dataKeys.map((_dataKey, index) => {

      const dataComponents = mapValues(this.baseProps[_dataKey].data, (propsObj) => {
        const statistic = propsObj.statistic;
        const boxPlotComponent = this.getBoxPlotComponent(statistic, props);
        const boxPlotProps = { ...propsObj, key: `data-${statistic}-${index}` };
        return React.cloneElement(boxPlotComponent, boxPlotProps);
      });

      return Object.keys(dataComponents).map((key) => dataComponents[key]);
    });

    const boxPlotLabelComponents = this.dataKeys.map((_dataKey, index) => {

      const labelComponents = mapValues(this.baseProps[_dataKey].labels, (labelPropsObj) => {
        const statistic = labelPropsObj.statistic;
        const labelComponent = this.getLabelComponent(statistic, props);
        const labelProps = { ...labelPropsObj, key: `label-${statistic}-${index}` };
        return React.cloneElement(labelComponent, labelProps);
      });

      return Object.keys(labelComponents).map((key) => labelComponents[key]);
    });

    const children = [...boxPlotComponents, ...boxPlotLabelComponents];
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
