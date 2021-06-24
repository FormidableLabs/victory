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
  PropTypes as CustomPropTypes
} from "victory-core";
import {
  getBaseProps,
  getData,
  getDomain,
  getFormattedData
} from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [];

export class VictoryHistogram extends React.Component {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "style",
    "width"
  ];

  static displayName = "VictoryHistogram";

  static role = "histogram";

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

  static getFormattedData = getFormattedData;

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    binSpacing: CustomPropTypes.nonNegative,
    bins: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
      ),
      CustomPropTypes.nonNegative
    ]),
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
    return props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;
  }
}

export default addEvents(VictoryHistogram);
