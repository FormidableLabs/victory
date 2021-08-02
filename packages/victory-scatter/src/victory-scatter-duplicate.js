import PropTypes from "prop-types";
import React from "react";
import {
  CommonProps,
  Helpers,
  Point,
  PropTypes as CustomPropTypes,
  useEvents,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme
} from "victory-core";
import { getBaseProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  size: 3,
  symbol: "circle"
};

const expectedComponents = [
  "dataComponent",
  "labelComponent",
  "groupComponent",
  "containerComponent"
];

const VictoryScatter = (props) => {
  const role = "scatter";
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, role);
  const { renderedData, renderContainer } = useEvents(modifiedProps, {
    role,
    expectedComponents,
    getBaseProps: VictoryScatter.getBaseProps
  });

  return props.standalone
    ? renderContainer(props.containerComponent, renderedData)
    : renderedData;
};

VictoryScatter.role = "scatter";
VictoryScatter.getBaseProps = (props) => getBaseProps(props, fallbackProps);

VictoryScatter.propTypes = {
  ...CommonProps.baseProps,
  ...CommonProps.dataProps,
  bubbleProperty: PropTypes.string,
  maxBubbleSize: CustomPropTypes.nonNegative,
  minBubbleSize: CustomPropTypes.nonNegative,
  size: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
  symbol: PropTypes.oneOfType([
    PropTypes.oneOf([
      "circle",
      "cross",
      "diamond",
      "plus",
      "minus",
      "square",
      "star",
      "triangleDown",
      "triangleUp"
    ]),
    PropTypes.func
  ])
};

VictoryScatter.defaultProps = {
  containerComponent: <VictoryContainer />,
  dataComponent: <Point />,
  labelComponent: <VictoryLabel />,
  groupComponent: <g />,
  samples: 50,
  sortOrder: "ascending",
  standalone: true,
  theme: VictoryTheme.grayscale
};

export default VictoryScatter;
