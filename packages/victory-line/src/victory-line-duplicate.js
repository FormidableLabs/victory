import PropTypes from "prop-types";
import React from "react";
import { getBaseProps } from "./helper-methods";
import Curve from "./curve";
import {
  PropTypes as CustomPropTypes,
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  VictoryClipContainer,
  Data,
  Domain,
  CommonProps,
  useEvents
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear"
};

// const options = {
//   components: [
//     { name: "parent", index: "parent" },
//     { name: "data", index: "all" },
//     { name: "labels" }
//   ]
// };

const VictoryLine = (props) => {
  const modifiedProps = Helpers.modifyProps(
    props,
    fallbackProps,
    VictoryLine.role
  );
  const { renderedContinuousData, renderContainer } = useEvents(modifiedProps, {
    role: VictoryLine.role,
    getBaseProps: VictoryLine.getBaseProps,
    expectedComponents: VictoryLine.expectedComponents
  });
  return props.standalone
    ? renderContainer(props.containerComponent, renderedContinuousData)
    : renderedContinuousData;
};

VictoryLine.animationWhitelist = [
  "data",
  "domain",
  "height",
  "padding",
  "samples",
  "style",
  "width"
];

VictoryLine.displayName = "VictoryLine";
VictoryLine.role = "line";
VictoryLine.defaultTransitions = DefaultTransitions.continuousTransitions();
VictoryLine.defaultPolarTransitions =
  DefaultTransitions.continuousPolarTransitions();
VictoryLine.continuous = true;

VictoryLine.propTypes = {
  ...CommonProps.baseProps,
  ...CommonProps.dataProps,
  interpolation: PropTypes.oneOfType([
    PropTypes.oneOf([
      "basis",
      "bundle",
      "cardinal",
      "catmullRom",
      "linear",
      "monotoneX",
      "monotoneY",
      "natural",
      "step",
      "stepAfter",
      "stepBefore"
    ]),
    PropTypes.func
  ]),
  label: CustomPropTypes.deprecated(
    PropTypes.string,
    "Use `labels` instead for individual data labels"
  )
};

VictoryLine.defaultProps = {
  containerComponent: <VictoryContainer />,
  dataComponent: <Curve />,
  labelComponent: <VictoryLabel renderInPortal />,
  groupComponent: <VictoryClipContainer />,
  samples: 50,
  sortKey: "x",
  sortOrder: "ascending",
  standalone: true,
  theme: VictoryTheme.grayscale
};

VictoryLine.getDomain = Domain.getDomain;
VictoryLine.getData = Data.getData;
VictoryLine.getBaseProps = (props) => getBaseProps(props, fallbackProps);
VictoryLine.expectedComponents = [
  "dataComponent",
  "labelComponent",
  "groupComponent",
  "containerComponent"
];

export default VictoryLine;
