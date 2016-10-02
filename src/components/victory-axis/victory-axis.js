import React, { PropTypes } from "react";
import { assign, partialRight } from "lodash";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel,
  VictoryContainer, VictoryTheme, Line, TextSize, VictoryGroupContainer, addEvents
} from "victory-core";
import AxisHelpers from "./helper-methods";
import Axis from "../../helpers/axis";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
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
    ...commonProps,
    ...cartesianProps,
    /**
     * The axisComponent prop takes in an entire component which will be used
     * to create the axis line. The new element created from the passed axisComponent
     * will be supplied with the following properties: x1, y1, x2, y2, style and events.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If an axisComponent
     * is not supplied, VictoryAxis will render its default AxisLine component.
     */
    axisComponent: PropTypes.element,
    /**
     * The axisLabelComponent prop takes in an entire component which will be used
     * to create the axis label. The new element created from the passed axisLabelComponent
     * will be supplied with the following properties: x, y, verticalAnchor, textAnchor,
     * angle, transform, style and events. Any of these props may be overridden by
     * passing in props to the supplied component, or modified or ignored within
     * the custom component itself. If an axisLabelComponent is not supplied, a new
     * VictoryLabel will be created with props described above
     */
    axisLabelComponent: PropTypes.element,
    /**
     * This prop specifies whether a given axis is intended to cross another axis.
     */
    crossAxis: PropTypes.bool,
    /**
     * The dependentAxis prop specifies whether the axis corresponds to the
     * dependent variable (usually y). This prop is useful when composing axis
     * with other components to form a chart.
     */
    dependentAxis: PropTypes.bool,
    /**
     * This fixLabelOverlap prop enable algorithm for overlapped ticks labels.
     * This prop is useful when ticks amount much more than axis size.
     */
    fixLabelOverlap: PropTypes.bool,
    /**
     * The gridComponent prop takes in an entire component which will be used
     * to create grid lines. The new element created from the passed gridComponent
     * will be supplied with the following properties: x1, y1, x2, y2, tick, style and events.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If a gridComponent
     * is not supplied, VictoryAxis will render its default GridLine component.
     */
    gridComponent: PropTypes.element,
    /**
     * The label prop defines the label that will appear along the axis. This
     * prop should be given as a value or an entire, HTML-complete label
     * component. If a label component is given, it will be cloned. The new
     * element's properties x, y, textAnchor, verticalAnchor, and transform
     * will have defaults provided by the axis; styles filled out with
     * defaults provided by the axis, and overrides from the label component.
     * If a value is given, a new VictoryLabel will be created with props and
     * styles from the axis.
     */
    label: PropTypes.any,
    /**
     * This value describes how far from the "edge" of its permitted area each axis
     * will be set back in the x-direction.  If this prop is not given,
     * the offset is calculated based on font size, axis orientation, and label padding.
     */
    offsetX: PropTypes.number,
    /**
     * This value describes how far from the "edge" of its permitted area each axis
     * will be set back in the y-direction.  If this prop is not given,
     * the offset is calculated based on font size, axis orientation, and label padding.
     */
    offsetY: PropTypes.number,
    /**
     * The orientation prop specifies the position and orientation of your axis.
     */
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    style: PropTypes.shape({
      parent: PropTypes.object,
      axis: PropTypes.object,
      axisLabel: PropTypes.object,
      grid: PropTypes.object,
      ticks: PropTypes.object,
      tickLabels: PropTypes.object
    }),
    /**
     * The tickComponent prop takes in an entire component which will be used
     * to create tick lines. The new element created from the passed tickComponent
     * will be supplied with the following properties: x1, y1, x2, y2, tick, style and events.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If a tickComponent
     * is not supplied, VictoryAxis will render its default Tick component.
     */
    tickComponent: PropTypes.element,
    /**
     * The tickCount prop specifies approximately how many ticks should be drawn on the axis if
     * tickValues are not explicitly provided. This value is calculated by d3 scale and
     * prioritizes returning "nice" values and evenly spaced ticks over an exact number of ticks.
     * If you need an exact number of ticks, please specify them via the tickValues prop.
     * This prop must have a value greater than zero.
     */
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer, CustomPropTypes.greaterThanZero
    ]),
    /**
     * The tickLabelComponent prop takes in an entire component which will be used
     * to create the tick labels. The new element created from the passed tickLabelComponent
     * will be supplied with the following properties: x, y, verticalAnchor, textAnchor,
     * angle, tick, style and events. Any of these props may be overridden by
     * passing in props to the supplied component, or modified or ignored within
     * the custom component itself. If an tickLabelComponent is not supplied, a new
     * VictoryLabel will be created with props described above
     */
    tickLabelComponent: PropTypes.element,
    /**
     * The tickFormat prop specifies how tick values should be expressed visually.
     * tickFormat can be given as a function to be applied to every tickValue, or as
     * an array of display values for each tickValue.
     * @examples d3.time.format("%Y"), (x) => x.toPrecision(2), ["first", "second", "third"]
     */
    tickFormat: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.homogeneousArray
    ]),
    /**
     * The tickValues prop explicitly specifies which tick values to draw on the axis.
     * @examples ["apples", "bananas", "oranges"], [2, 4, 6, 8]
     */
    tickValues: CustomPropTypes.homogeneousArray
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
    groupComponent: <VictoryGroupContainer/>,
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
    const gridAndTickComponents = [];
    for (let index = 0, len = this.dataKeys.length; index < len; index++) {
      const key = this.dataKeys[index];
      const tickProps = this.getComponentProps(tickComponent, "ticks", index);
      const TickComponent = React.cloneElement(tickComponent, tickProps);
      const gridProps = this.getComponentProps(gridComponent, "grid", index);
      const GridComponent = React.cloneElement(gridComponent, gridProps);
      const tickLabelProps = this.getComponentProps(tickLabelComponent, "tickLabels", index);
      const TickLabel = React.cloneElement(tickLabelComponent, tickLabelProps);
      gridAndTickComponents[index] = React.cloneElement(
        props.groupComponent, {key: `tick-group-${key}`}, GridComponent, TickComponent, TickLabel
      );
    }
    return gridAndTickComponents;
  }

  fixLabelOverlap(gridAndTicks, props) {
    const isVertical = Axis.isVertical(props);
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

  renderContainer(props, group) {
    const { containerComponent } = props;
    const parentProps = this.getComponentProps(containerComponent, "parent", "parent");
    return React.cloneElement(containerComponent, parentProps, group);
  }

  renderGroup(children, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      ...children
    );
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "axis");
    const { animate, standalone, theme } = props;
    if (animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "style", "domain", "range", "tickCount", "tickValues",
        "offsetX", "offsetY", "padding", "width", "height"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    const styleObject = theme && theme.axis && theme.axis.style ? theme.axis.style : {};
    const style = AxisHelpers.getStyles(props, styleObject);
    const gridAndTicks = this.renderGridAndTicks(props);
    const modifiedGridAndTicks = props.fixLabelOverlap
      ? this.fixLabelOverlap(gridAndTicks, props)
      : gridAndTicks;
    const children = [
      ...modifiedGridAndTicks,
      this.renderLine(props),
      this.renderLabel(props)
    ];

    const group = this.renderGroup(children, style.parent);

    return standalone ? this.renderContainer(props, group) : group;
  }
}

export default addEvents(VictoryAxis)
