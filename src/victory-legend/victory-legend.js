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
import Border from "../victory-primitives/border";

const fallbackProps = {
  orientation: "vertical",
  width: 450,
  height: 300,
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
    borderComponent: PropTypes.element,
    borderPadding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    centerTitle: PropTypes.bool,
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
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    groupComponent: PropTypes.element,
    gutter: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.shape({
        left: CustomPropTypes.nonNegative,
        right: CustomPropTypes.nonNegative
      })
    ]),
    height: CustomPropTypes.nonNegative,
    itemsPerRow: CustomPropTypes.nonNegative,
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
    rowGutter: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.shape({
        top: CustomPropTypes.nonNegative,
        bottom: CustomPropTypes.nonNegative
      })
    ]),
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func
    }),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      border: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object,
      title: PropTypes.object
    }),
    symbolSpacer: PropTypes.number,
    theme: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    titleComponent: PropTypes.element,
    titleOrientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    width: CustomPropTypes.nonNegative,
    x: CustomPropTypes.nonNegative,
    y: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    borderComponent: <Border/>,
    data: defaultLegendData,
    containerComponent: <VictoryContainer/>,
    dataComponent: <Point/>,
    groupComponent: <g/>,
    labelComponent: <VictoryLabel/>,
    standalone: true,
    theme: VictoryTheme.grayscale,
    titleComponent: <VictoryLabel/>
  };

  static getBaseProps = partialRight(getBaseProps, fallbackProps);
  static expectedComponents = [
    "borderComponent", "containerComponent", "dataComponent",
    "groupComponent", "labelComponent", "titleComponent"
  ];

  renderChildren(props) {
    const { dataComponent, labelComponent, title } = props;
    const dataComponents = this.dataKeys.map((_dataKey, index) => {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      return React.cloneElement(dataComponent, dataProps);
    });

    const labelComponents = this.dataKeys.map((_dataKey, index) => {
      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      if (typeof labelProps.text !== "undefined" && labelProps.text !== null) {
        return React.cloneElement(labelComponent, labelProps);
      }
      return undefined;
    }).filter(Boolean);

    const borderProps = this.getComponentProps(props.borderComponent, "border", 0);
    const borderComponent = React.cloneElement(props.borderComponent, borderProps);
    if (title) {
      const titleProps = this.getComponentProps(props.title, "title", 0);
      const titleComponent = React.cloneElement(props.titleComponent, titleProps);
      return [borderComponent, ...dataComponents, titleComponent, ...labelComponents];
    }
    return [borderComponent, ...dataComponents, ...labelComponents];
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps((this.props), fallbackProps, role);
    const children = [this.renderChildren(props)];
    return props.standalone ?
      this.renderContainer(props.containerComponent, children) :
      React.cloneElement(props.groupComponent, {}, children);
  }
}

export default addEvents(VictoryLegend);
