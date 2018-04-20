import PropTypes from "prop-types";
import React from "react";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, ErrorBar, Data
} from "victory-core";
import { getBaseProps, getDomain } from "./helper-methods";
import { BaseProps, DataProps } from "../../helpers/common-props";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  { x: 1, y: 1, errorX: 0.1, errorY: 0.1 },
  { x: 2, y: 2, errorX: 0.2, errorY: 0.2 },
  { x: 3, y: 3, errorX: 0.3, errorY: 0.3 },
  { x: 4, y: 4, errorX: 0.4, errorY: 0.4 }
];

const animationWhitelist = [
  "data", "domain", "height", "padding", "samples",
  "style", "width", "errorX", "errorY", "borderWidth"
];

class VictoryErrorBar extends React.Component {
  static displayName = "VictoryErrorBar";
  static role = "errorBar";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...BaseProps,
    ...DataProps,
    borderWidth: PropTypes.number,
    errorX: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    errorY: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    containerComponent: <VictoryContainer/>,
    data: defaultData,
    dataComponent: <ErrorBar/>,
    labelComponent: <VictoryLabel/>,
    groupComponent: <g role="presentation"/>,
    samples: 50,
    scale: "linear",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static getDomain = getDomain;
  static getData = Data.getData.bind(Data);
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }
    const children = this.renderData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryErrorBar);
