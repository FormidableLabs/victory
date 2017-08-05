/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { partialRight } from "lodash";
import {
  addEvents, Helpers, Data, PropTypes as CustomPropTypes, Slice,
  VictoryContainer, VictoryLabel, VictoryTheme
} from "victory-core";
import PieHelpers from "./helper-methods";

const fallbackProps = {
  endAngle: 360,
  height: 400,
  innerRadius: 0,
  cornerRadius: 0,
  padAngle: 0,
  padding: 30,
  width: 400,
  startAngle: 0,
  colorScale: [
    "#ffffff",
    "#f0f0f0",
    "#d9d9d9",
    "#bdbdbd",
    "#969696",
    "#737373",
    "#525252",
    "#252525",
    "#000000"
  ]
};

const animationWhitelist = [
  "data", "endAngle", "height", "innerRadius", "cornerRadius", "padAngle", "padding",
  "colorScale", "startAngle", "style", "width"
];

class VictoryPie extends React.Component {
  static displayName = "VictoryPie";

  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: () => ({ _y: 0, label: " " })
    },
    onEnter: {
      duration: 500,
      before: () => ({ _y: 0, label: " " }),
      after: (datum) => ({ y_: datum._y, label: datum.label })
    }
  };

  static propTypes = {
    animate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    containerComponent: PropTypes.element,
    cornerRadius: CustomPropTypes.nonNegative,
    data: PropTypes.array,
    dataComponent: PropTypes.element,
    endAngle: PropTypes.number,
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.func,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    groupComponent: PropTypes.element,
    height: CustomPropTypes.nonNegative,
    innerRadius: CustomPropTypes.nonNegative,
    labelComponent: PropTypes.element,
    labelRadius: PropTypes.oneOfType([ CustomPropTypes.nonNegative, PropTypes.func ]),
    labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    name: PropTypes.string,
    padAngle: CustomPropTypes.nonNegative,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number, bottom: PropTypes.number,
        left: PropTypes.number, right: PropTypes.number
      })
    ]),
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func
    }),
    sortKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    standalone: PropTypes.bool,
    startAngle: PropTypes.number,
    style: PropTypes.shape({
      parent: PropTypes.object, data: PropTypes.object, labels: PropTypes.object
    }),
    theme: PropTypes.object,
    width: CustomPropTypes.nonNegative,
    x: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    y: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  };

  static defaultProps = {
    data: [
      { x: "A", y: 1 },
      { x: "B", y: 2 },
      { x: "C", y: 3 },
      { x: "D", y: 1 },
      { x: "E", y: 2 }
    ],
    standalone: true,
    dataComponent: <Slice/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    theme: VictoryTheme.grayscale
  };

  static getBaseProps = partialRight(PieHelpers.getBaseProps.bind(PieHelpers), fallbackProps);
  static getData = Data.getData.bind(Data);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  // Overridden in victory-native
  shouldAnimate() {
    return Boolean(this.props.animate);
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

export default addEvents(VictoryPie);
