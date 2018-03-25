import React from "react";
import PropTypes from "prop-types";
import { partialRight, assign, flatten } from "lodash";
import { BaseProps, DataProps } from "../../helpers/common-props";
import {
    Helpers, VictoryLabel, addEvents, Line, PropTypes as CustomPropTypes,
    VictoryContainer, VictoryTheme, Box, Whisker
} from "victory-core";
import { getDomain, getData, getBaseProps } from "./helper-methods";

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
  { x: 1, min: 5, q1: 7, median: 12, q3: 18, max: 20 },
  { x: 2, min: 2, q1: 5, median: 8, q3: 12, max: 15 }
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
    labels: PropTypes.bool,
    max: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    maxComponent: PropTypes.element,
    maxLabelComponent: PropTypes.element,
    maxLabels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    median: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    medianComponent: PropTypes.element,
    medianLabelComponent: PropTypes.element,
    medianLabels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    min: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    minComponent: PropTypes.element,
    minLabelComponent: PropTypes.element,
    minLabels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    q1: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    q1Component: PropTypes.element,
    q1LabelComponent: PropTypes.element,
    q1Labels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    q3: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    q3Component: PropTypes.element,
    q3LabelComponent: PropTypes.element,
    q3Labels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    style: PropTypes.shape({
      boxes: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object,
      max: PropTypes.object,
      maxLabels: PropTypes.object,
      median: PropTypes.object,
      medianLabels: PropTypes.object,
      min: PropTypes.object,
      minLabels: PropTypes.object,
      q1: PropTypes.object,
      q1Labels: PropTypes.object,
      q3: PropTypes.object,
      q3Labels: PropTypes.object,
      whiskers: PropTypes.object
    }),
    whiskerWidth: PropTypes.number
  }

  static defaultProps = {
    containerComponent: <VictoryContainer/>,
    data: defaultData,
    dataComponent: <Box/>,
    groupComponent: <g role="presentation"/>,
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

  static getDomain = getDomain;
  static getData = getData;
  static getBaseProps = partialRight(getBaseProps, fallbackProps);

  renderBoxPlot(props) {
    const types = ["q1", "q3", "max", "min", "median"];
    const dataComponents = flatten(types.map((type) => {
      return this.dataKeys.map((key, index) => {
        const baseComponent = props[`${type}Component`];
        const componentProps = this.getComponentProps(baseComponent, type, index);
        return React.cloneElement(baseComponent, componentProps);
      });
    }));

    const labelComponents = flatten(types.map((type) => {
      const components = this.dataKeys.map((key, index) => {
        const name = `${type}Labels`;
        const baseComponent = props[`${type}LabelComponent`];
        const labelProps = this.getComponentProps(baseComponent, name, index);
        if (typeof labelProps.text !== "undefined" && labelProps.text !== null) {
          return React.cloneElement(baseComponent, labelProps);
        }
        return undefined;
      });
      return components.filter(Boolean);
    }));
    const children = [...dataComponents, ...labelComponents];
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
