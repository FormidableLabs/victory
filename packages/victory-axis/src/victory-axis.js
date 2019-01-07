import PropTypes from "prop-types";
import React from "react";
import { assign } from "lodash";
import {
  PropTypes as CustomPropTypes,
  Helpers,
  VictoryLabel,
  CommonProps,
  VictoryContainer,
  VictoryTheme,
  LineSegment,
  TextSize,
  addEvents,
  Axis
} from "victory-core";
import { getBaseProps, getScale, getStyles } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

class VictoryAxis extends React.Component {
  static animationWhitelist = [
    "style",
    "domain",
    "range",
    "tickCount",
    "tickValues",
    "offsetX",
    "offsetY",
    "padding",
    "width",
    "height"
  ];

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
    ...CommonProps.baseProps,
    axisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string),
        y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    crossAxis: PropTypes.bool,
    dependentAxis: PropTypes.bool,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels"]),
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
          PropTypes.string
        ]),
        eventHandlers: PropTypes.object
      })
    ),
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
      parent: PropTypes.object,
      axis: PropTypes.object,
      axisLabel: PropTypes.object,
      grid: PropTypes.object,
      ticks: PropTypes.object,
      tickLabels: PropTypes.object
    }),
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.greaterThanZero
    ]),
    tickFormat: PropTypes.oneOfType([PropTypes.func, CustomPropTypes.homogeneousArray]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray
  };

  static defaultProps = {
    axisComponent: <LineSegment type={"axis"} />,
    axisLabelComponent: <VictoryLabel />,
    tickLabelComponent: <VictoryLabel />,
    tickComponent: <LineSegment type={"tick"} />,
    gridComponent: <LineSegment type={"grid"} />,
    scale: "linear",
    standalone: true,
    theme: VictoryTheme.grayscale,
    containerComponent: <VictoryContainer />,
    groupComponent: <g role="presentation" />,
    fixLabelOverlap: false
  };

  static getDomain = Axis.getDomain;
  static getAxis = Axis.getAxis;
  static getScale = getScale;
  static getStyles = (props) => getStyles(props, fallbackProps.style);
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static expectedComponents = [
    "axisComponent",
    "axisLabelComponent",
    "groupComponent",
    "containerComponent",
    "tickComponent",
    "tickLabelComponent",
    "gridComponent"
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
    const { tickComponent, tickLabelComponent, gridComponent, name } = props;
    return this.dataKeys.map((key, index) => {
      const tickProps = this.getComponentProps(tickComponent, "ticks", index);
      const TickComponent = React.cloneElement(tickComponent, tickProps);
      const gridProps = this.getComponentProps(gridComponent, "grid", index);
      const GridComponent = React.cloneElement(gridComponent, gridProps);
      const tickLabelProps = this.getComponentProps(tickLabelComponent, "tickLabels", index);
      const TickLabel = React.cloneElement(tickLabelComponent, tickLabelProps);
      return React.cloneElement(
        props.groupComponent,
        { key: `${name}-tick-group-${key}` },
        GridComponent,
        TickComponent,
        TickLabel
      );
    });
  }

  fixLabelOverlap(gridAndTicks, props) {
    const isVertical = Axis.isVertical(props);
    const isVictoryLabel = (child) => child.type && child.type.role === "label";
    const paddingToObject = (padding) =>
      typeof padding === "object"
        ? assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, padding)
        : { top: padding, right: padding, bottom: padding, left: padding };

    let labelPosition = 0;
    const doesNotOverlap = function(label) {
      const padding = paddingToObject(label.props.style.padding);
      const labelSize = TextSize.approximateTextSize(label.props.text, {
        angle: label.props.angle,
        fontSize: label.props.style.fontSize,
        letterSpacing: label.props.style.letterSpacing,
        fontFamily: label.props.style.fontFamily,
      });
      const sumLabelSize = isVertical
        ? labelSize.height + padding.top + padding.bottom
        : labelSize.width + padding.right + padding.left;

      if (label.props.x > labelPosition) {
        labelPosition = sumLabelSize + label.props.x;
        return true;
      }
      return false;
    };
    const getLabelCoord = (gridAndTick) =>
      gridAndTick.props.children
        .filter(isVictoryLabel)
        .reduce((prev, child) => (isVertical ? child.props.y : child.props.x) || 0, 0);
    const sorted = gridAndTicks.sort(
      (a, b) =>
        isVertical
          ? getLabelCoord(b) - getLabelCoord(a) //ordinat axis has top-bottom orientation
          : getLabelCoord(a) - getLabelCoord(b) //ordinat axis has left-right orientation
    );
    return sorted.filter((gridAndTick) => gridAndTick.props.children.filter(isVictoryLabel).some(doesNotOverlap));
  }

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { animationWhitelist, role } = VictoryAxis;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const gridAndTicks = this.renderGridAndTicks(props);
    const modifiedGridAndTicks = props.fixLabelOverlap
      ? this.fixLabelOverlap(gridAndTicks, props)
      : gridAndTicks;
    const children = [this.renderLine(props), this.renderLabel(props), ...modifiedGridAndTicks];
    return props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : React.cloneElement(props.groupComponent, {}, children);
  }
}

export default addEvents(VictoryAxis);
