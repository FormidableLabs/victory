import React, { PropTypes } from "react";
import { assign, partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel,
  VictoryContainer, VictoryTheme, Line, TextSize, addEvents
} from "victory-core";
import AxisHelpers from "./helper-methods";
import Axis from "../../helpers/axis";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const animationWhitelist = [
  "style", "domain", "range", "tickCount", "tickValues",
  "offsetX", "offsetY", "padding", "width", "height"
];

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
    animate: PropTypes.object,
    axisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    containerComponent: PropTypes.element,
    crossAxis: PropTypes.bool,
    dependentAxis: PropTypes.bool,
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
    ]),
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ]),
        y: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ])
      }),
      PropTypes.number
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels", "parent"]),
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
    height: CustomPropTypes.nonNegative,
    label: PropTypes.any,
    name: PropTypes.string,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number, bottom: PropTypes.number,
        left: PropTypes.number, right: PropTypes.number
      })
    ]),
    scale: CustomPropTypes.scale,
    sharedEvents: PropTypes.shape({ events: PropTypes.array, getEventState: PropTypes.func }),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      parent: PropTypes.object, axis: PropTypes.object, axisLabel: PropTypes.object,
      grid: PropTypes.object, ticks: PropTypes.object, tickLabels: PropTypes.object
    }),
    theme: PropTypes.object,
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer, CustomPropTypes.greaterThanZero
    ]),
    tickFormat: PropTypes.oneOfType([ PropTypes.func, CustomPropTypes.homogeneousArray ]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray,
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    axisComponent: <Line type={"axis"}/>,
    axisLabelComponent: <VictoryLabel/>,
    tickLabelComponent: <VictoryLabel/>,
    tickComponent: <Line type={"tick"}/>,
    gridComponent: <Line type={"grid"}/>,
    scale: "linear",
    standalone: true,
    theme: VictoryTheme.grayscale,
    tickCount: 5,
    containerComponent: <VictoryContainer />,
    groupComponent: <g role="presentation"/>,
    fixLabelOverlap: false
  };

  static getDomain = AxisHelpers.getDomain.bind(AxisHelpers);
  static getAxis = Axis.getAxis.bind(Axis);
  static getScale = AxisHelpers.getScale.bind(AxisHelpers);
  static getStyles = partialRight(AxisHelpers.getStyles.bind(AxisHelpers), fallbackProps.style);
  static getBaseProps = partialRight(AxisHelpers.getBaseProps.bind(AxisHelpers), fallbackProps);
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
    const { axisLabelComponent } = props;
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
        props.groupComponent, {key: `tick-group-${key}`}, GridComponent, TickComponent, TickLabel
      );
    });
  }

  fixLabelOverlap(gridAndTicks, props) {
    const isVertical = Helpers.isVertical(props);
    const size = isVertical ? props.height : props.width;
    const isVictoryLabel = (child) => child.type.name === "VictoryLabel";
    const labels = gridAndTicks.map((gridAndTick) => gridAndTick.props.children)
     .reduce((accumulator, childArr) => accumulator.concat(childArr))
     .filter(isVictoryLabel)
     .map((child) => child.props);
    const paddingToObject = (padding) =>
      typeof (padding) === "object"
        ? assign({}, {top: 0, right: 0, bottom: 0, left: 0}, padding)
        : {top: padding, right: padding, bottom: padding, left: padding };
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

  renderContainer(props, children) {
    const {containerComponent} = props;
    const parentProps = this.getComponentProps(containerComponent, "parent", "parent");
    return React.cloneElement(containerComponent, parentProps, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "axis");
    if (this.shouldAnimate()) {
      return (
        <VictoryTransition animate={props.animate} animationWhitelist={animationWhitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    const gridAndTicks = this.renderGridAndTicks(props);
    const modifiedGridAndTicks = props.fixLabelOverlap
      ? this.fixLabelOverlap(gridAndTicks, props)
      : gridAndTicks;
    const children = [
      ...modifiedGridAndTicks,
      this.renderLine(props),
      this.renderLabel(props)
    ];
    return this.renderContainer(props, children);
  }
}

export default addEvents(VictoryAxis);
