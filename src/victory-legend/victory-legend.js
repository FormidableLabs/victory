/*eslint no-magic-numbers: ["error", { "ignore": [1, 2, 2.5, 3] }]*/
import React from "react";
import PropTypes from "prop-types";
import { partialRight } from "lodash";
import { default as getBaseProps } from "./helper-methods";
import CustomPropTypes from "../victory-util/prop-types";
import addEvents from "../victory-util/add-events";
import Helpers from "../victory-util/helpers";
import VictoryLabel from "../victory-label/victory-label";
import VictoryContainer from "../victory-container/victory-container";
import VictoryTheme from "../victory-theme/victory-theme";
import Point from "../victory-primitives/point";

const fallbackProps = {
  width: 450,
  height: 300,
  orientation: "vertical",
  padding: 50,
  x: 0,
  y: 0
};

const defaultLegendData = [
  { name: "Series 1" },
  { name: "Series 2" }
];

class VictoryLegend extends React.Component {
  static displayName = "VictoryLegend";

  static role = "legend";

  static propTypes = {
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    containerComponent: PropTypes.element,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.object,
        symbol: PropTypes.object
      })
    ),
    dataComponent: PropTypes.element,
    groupComponent: PropTypes.element,
    gutter: PropTypes.number,
    height: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    itemsPerRow: PropTypes.number,
    labelComponent: PropTypes.element,
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      data: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object
    }),
    symbolSpacer: PropTypes.number,
    theme: PropTypes.object,
    width: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    data: defaultLegendData,
    containerComponent: <VictoryContainer/>,
    dataComponent: <Point/>,
    groupComponent: <g/>,
    labelComponent: <VictoryLabel/>,
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static getBaseProps = partialRight(getBaseProps, fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps((this.props), fallbackProps, role);
    const children = this.renderData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryLegend);
