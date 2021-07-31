import { isEqual } from "lodash";
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

const VictoryScatter = (props) => {
  const role = "scatter";
  const baseProps = getBaseProps(props, fallbackProps);
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, role);
  const { renderedData } = useEvents(modifiedProps, baseProps, { role });

  return renderedData;
};

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

export default React.memo(VictoryScatter, isEqual);
