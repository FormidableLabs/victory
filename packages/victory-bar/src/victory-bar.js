import PropTypes from "prop-types";
import React from "react";
import { getBaseProps } from "./helper-methods";
import Bar from "./bar";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  CommonProps,
  addEvents,
  Data,
  Domain
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 }
];

class VictoryBar extends React.Component {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "style",
    "width"
  ];

  static displayName = "VictoryBar";

  static role = "bar";

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

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    alignment: PropTypes.oneOf(["start", "middle", "end"]),
    barRatio: PropTypes.number,
    barWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
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

  static getDomain = Domain.getDomainWithZero;
  static getData = Data.getData;
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
    const { animationWhitelist, role } = VictoryBar;
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

export default addEvents(VictoryBar);
