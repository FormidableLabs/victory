import PropTypes from "prop-types";
import React from "react";
import { assign } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryLabel,
  VictoryContainer, VictoryTheme, Grid, TextSize, addEvents
} from "victory-core";
import { getBaseProps, getDomain, getScale, getStyles } from "./helper-methods";
import Axis from "../../helpers/axis";
import { BaseProps } from "../../helpers/common-props";


const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const animationWhitelist = [
  "style", "domain", "range", "tickCount", "tickValues",
  "offsetX", "offsetY", "padding", "width", "height"
];

const options = {
  components: [
    { name: "axis", index: 0 },
    { name: "axisLabel", index: 0 },
    { name: "grid" },
    { name: "parent", index: "parent" },
    { name: "ticks" },
    { name: "tickLabels" }
  ]
};

class VictoryAxis extends React.Component {
  static displayName = "VictoryAxis";

  static role = "axis";

  static defaultTransitions = {
    onExit: {
      duration: 500
    },
    onEnter: {
      duration: 500
    }
  };

  static propTypes = {
    ...BaseProps,
    axisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string), y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    crossAxis: PropTypes.bool,
    dependentAxis: PropTypes.bool,
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    fixLabelOverlap: PropTypes.bool,
    gridComponent: PropTypes.element,
    groupComponent: PropTypes.element,
    invertAxis: PropTypes.bool,
    label: PropTypes.any,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    stringMap: PropTypes.object,
    style: PropTypes.shape({
      parent: PropTypes.object, axis: PropTypes.object, axisLabel: PropTypes.object,
      grid: PropTypes.object, ticks: PropTypes.object, tickLabels: PropTypes.object
    }),
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer, CustomPropTypes.greaterThanZero
    ]),
    tickFormat: PropTypes.oneOfType([ PropTypes.func, CustomPropTypes.homogeneousArray ]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray
  };

  static defaultProps = {
    axisComponent: <Grid type={"axis"}/>,
    axisLabelComponent: <VictoryLabel/>,
    tickLabelComponent: <VictoryLabel/>,
    tickComponent: <Grid type={"tick"}/>,
    gridComponent: <Grid type={"grid"}/>,
    scale: "linear",
    standalone: true,
    theme: VictoryTheme.grayscale,
    containerComponent: <VictoryContainer />,
    groupComponent: <g role="presentation"/>,
    fixLabelOverlap: false
  };

  static getDomain = getDomain;
  static getAxis = Axis.getAxis.bind(Axis);
  static getScale = getScale;
  static getStyles = (props) => getStyles(props, fallbackProps.style);
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static expectedComponents = [
    "axisComponent", "axisLabelComponent", "groupComponent", "containerComponent",
    "tickComponent", "tickLabelComponent", "gridComponent"
  ];

  renderLine(props) {
    const { axisComponent } = props;
    const axisProps = this.getComponentProps(axisComponent, "axis", 0);
    return React.cloneElement(axisComponent, axisProps);
  }

  renderLabel(props) {
    const { axisLabelComponent, label } = props;
    if (!label) {
      return null;
    }
    const axisLabelProps = this.getComponentProps(axisLabelComponent, "axisLabel", 0);
    return React.cloneElement(axisLabelComponent, axisLabelProps);
  }

  renderGridAndTicks(props) {
    const { tickComponent, tickLabelComponent, gridComponent } = props;

    return this.dataKeys.map((key, index) => {
      const tickProps = this.getComponentProps(tickComponent, "ticks", index);
      const TickComponent = React.cloneElement(tickComponent, tickProps);
      const gridProps = this.getComponentProps(gridComponent, "grid", index);
      const GridComponent = React.cloneElement(gridComponent, gridProps);
      const tickLabelProps = this.getComponentProps(tickLabelComponent, "tickLabels", index);
      const TickLabel = React.cloneElement(tickLabelComponent, tickLabelProps);

      return React.cloneElement(
        props.groupComponent, { key: `tick-group-${key}` }, GridComponent, TickComponent, TickLabel
      );
    });
  }

  fixLabelOverlap(gridAndTicks, props) {
    const isVertical = Helpers.isVertical(props);
    const size = isVertical ? props.height : props.width;
    const isVictoryLabel = (child) => child.type && child.type.role === "label";
    const labels = gridAndTicks.map((gridAndTick) => gridAndTick.props.children)
     .reduce((accumulator, childArr) => accumulator.concat(childArr))
     .filter(isVictoryLabel)
     .map((child) => child.props);
    const paddingToObject = (padding) =>
      typeof (padding) === "object"
        ? assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, padding)
        : { top: padding, right: padding, bottom: padding, left: padding };
    const labelsSumSize = labels.reduce((sum, label) => {
      const padding = paddingToObject(label.style.padding);
      const labelSize = TextSize.approximateTextSize(label.text, {
        angle: label.angle,
        fontSize: label.style.fontSize,
        letterSpacing: label.style.letterSpacing,
        fontFamily: label.style.fontFamily
      });
      return sum + (isVertical
        ? labelSize.height + padding.top + padding.bottom
        : labelSize.width + padding.right + padding.left);
    }, 0);
    const availiableLabelCount = Math.floor(size * gridAndTicks.length / labelsSumSize);
    const divider = Math.ceil(gridAndTicks.length / availiableLabelCount) || 1;
    const getLabelCoord = (gridAndTick) => gridAndTick.props.children
      .filter(isVictoryLabel)
      .reduce((prev, child) => (isVertical ? child.props.y : child.props.x) || 0, 0);
    const sorted = gridAndTicks.sort((a, b) => isVertical
      ? getLabelCoord(b) - getLabelCoord(a) //ordinat axis has top-bottom orientation
      : getLabelCoord(a) - getLabelCoord(b) //ordinat axis has left-right orientation
    );
    return sorted.filter((gridAndTick, index) => index % divider === 0);
  }

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "axis");
    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const gridAndTicks = this.renderGridAndTicks(props);
    const modifiedGridAndTicks = props.fixLabelOverlap
      ? this.fixLabelOverlap(gridAndTicks, props)
      : gridAndTicks;
    const children = [
      this.renderLine(props),
      this.renderLabel(props),
      ...modifiedGridAndTicks
    ];
    return props.standalone ?
      this.renderContainer(props.containerComponent, children) :
      React.cloneElement(props.groupComponent, {}, children);
  }
}

export default addEvents(VictoryAxis, options);
