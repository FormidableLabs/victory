import React from "react";
import PropTypes from "prop-types";
import { partialRight, assign } from "lodash";
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
    dimension: PropTypes.oneOf(["x", "y"]),
    horizontal: PropTypes.bool,
    labelOrientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    maxComponent: PropTypes.element,
    maxLabelComponent: PropTypes.element,
    maxLabels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    medianComponent: PropTypes.element,
    medianLabelComponent: PropTypes.element,
    medianLabels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    minComponent: PropTypes.element,
    minLabelComponent: PropTypes.element,
    minLabels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    q1Component: PropTypes.element,
    q1LabelComponent: PropTypes.element,
    q1Labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    q3Component: PropTypes.element,
    q3LabelComponent: PropTypes.element,
    q3Labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
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
    containerComponent: <VictoryContainer/>,
    data: defaultData,
    dataComponent: <Box/>,
    dimension: "x",
    groupComponent: <g role="presentation"/>,
    labelOrientation: "right",
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

  getComponent(props, name, index) {
    const baseComponent = props[`${name}Component`];
    const componentProps = this.getComponentProps(baseComponent, name, index);
    return React.cloneElement(baseComponent, assign({ key: `${name}-${index}` }, componentProps));
  }

  renderBoxPlot(props) {
    return this.dataKeys.map((key, index) => {
      return React.cloneElement(
        props.groupComponent, { key }, [
          this.getComponent(props, "q1", index),
          this.getComponent(props, "q3", index),
          this.getComponent(props, "max", index),
          this.getComponent(props, "median", index),
          this.getComponent(props, "min", index),
          this.getComponent(props, "maxLabel", index),
          this.getComponent(props, "medianLabel", index),
          this.getComponent(props, "minLabel", index),
          this.getComponent(props, "q1Label", index),
          this.getComponent(props, "q3Label", index)
        ]
      );
    });
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    const children = this.renderBoxPlot(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryBoxPlot);
