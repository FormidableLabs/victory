import defaults from "lodash/defaults";
import assign from "lodash/assign";
import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel
} from "victory-core";
import AxisLine from "./axis-line";
import GridLine from "./grid";
import Tick from "./tick";
import AxisHelpers from "./helper-methods";
import Axis from "../../helpers/axis";

const defaultStyles = {
  axis: {
    stroke: "#756f6a",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round"
  },
  axisLabel: {
    stroke: "transparent",
    fill: "#756f6a",
    fontSize: 16,
    fontFamily: "Helvetica"
  },
  grid: {
    stroke: "none",
    fill: "none",
    strokeLinecap: "round"
  },
  ticks: {
    stroke: "#756f6a",
    fill: "none",
    padding: 5,
    strokeWidth: 2,
    strokeLinecap: "round",
    size: 4
  },
  tickLabels: {
    stroke: "transparent",
    fill: "#756f6a",
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 5
  }
};

const orientationSign = {
  top: -1,
  left: -1,
  right: 1,
  bottom: 1
};

const getStyles = (props) => {
  const style = props.style || {};
  const parentStyleProps = { height: "auto", width: "100%" };
  return {
    parent: defaults(parentStyleProps, style.parent, defaultStyles.parent),
    axis: defaults({}, style.axis, defaultStyles.axis),
    axisLabel: defaults({}, style.axisLabel, defaultStyles.axisLabel),
    grid: defaults({}, style.grid, defaultStyles.grid),
    ticks: defaults({}, style.ticks, defaultStyles.ticks),
    tickLabels: defaults({}, style.tickLabels, defaultStyles.tickLabels)
  };
};

export default class VictoryAxis extends React.Component {
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
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the axis will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {duration: 500, onEnd: () => alert("done!")}
     */
    animate: PropTypes.object,
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
     * The domain prop describes the range of values your axis will include. This prop should be
     * given as a array of the minimum and maximum expected values for your axis.
     * If this value is not given it will be calculated based on the scale or tickValues.
     * @examples [-1, 1]
     */
    domain: CustomPropTypes.domain,
    /**
     * The events prop attaches arbitrary event handlers to data and label elements
     * Event handlers are called with their corresponding events, corresponding component props,
     * and their index in the data array, and event name. The return value of event handlers
     * will be stored by index and namespace on the state object of VictoryAxis
     * i.e. `this.state.[index].axis = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryAxis
     * if one exists. If VictoryAxis is set up to render g elements i.e. when it is
     * rendered within chart, or when `standalone={false}` parent events will not be applied.
     *
     * @examples {ticks: {
     *  onClick: () =>
     *   return {ticks: {style: {stroke: "green"}}, tickLabels: {style: {stroke: "black"}}
     *}}
     */
    events: PropTypes.shape({
      parent: PropTypes.object,
      axis: PropTypes.object,
      axisLabel: PropTypes.object,
      grid: PropTypes.object,
      ticks: PropTypes.object,
      tickLabels: PropTypes.object
    }),
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
     * The height props specifies the height the svg viewBox of the chart container.
     * This value should be given as a number of pixels
     */
    height: CustomPropTypes.nonNegative,
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
    /**
     * The padding props specifies the amount of padding in number of pixels between
     * the edge of the chart and any rendered child components. This prop can be given
     * as a number or as an object with padding specified for top, bottom, left
     * and right.
     */
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    /**
     * The scale prop determines which scales your axis should use. This prop can be
     * given as a `d3-scale@0.3.0` function or as a string corresponding to a supported d3-string
     * function.
     * @examples d3Scale.time(), "linear", "time", "log", "sqrt"
     */
    scale: CustomPropTypes.scale,
    /**
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryAxis with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your VictoryAxis. Any valid inline style properties
     * will be applied. Height, width, and padding should be specified via the height,
     * width, and padding props, as they are used to calculate the alignment of
     * components within chart.
     * @examples {axis: {stroke: "#756f6a"}, grid: {stroke: "grey"}, ticks: {stroke: "grey"},
     * tickLabels: {fontSize: 10, padding: 5}, axisLabel: {fontSize: 16, padding: 20}}
     */
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
     * The tickCount prop specifies how many ticks should be drawn on the axis if
     * tickValues are not explicitly provided.
     */
    tickCount: CustomPropTypes.nonNegative,
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
    tickValues: CustomPropTypes.homogeneousArray,
    /**
     * The width props specifies the width of the svg viewBox of the chart container
     * This value should be given as a number of pixels
     */
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    axisComponent: <AxisLine/>,
    axisLabelComponent: <VictoryLabel/>,
    tickLabelComponent: <VictoryLabel/>,
    tickComponent: <Tick/>,
    gridComponent: <GridLine/>,
    events: {},
    height: 300,
    padding: 50,
    scale: "linear",
    standalone: true,
    tickCount: 5,
    width: 450
  };

  static getDomain = AxisHelpers.getDomain.bind(AxisHelpers);
  static getAxis = AxisHelpers.getAxis.bind(AxisHelpers);
  static getScale = AxisHelpers.getScale.bind(AxisHelpers);
  static getStyles = getStyles;

  constructor() {
    super();
    this.state = {};
    this.getEvents = Helpers.getEvents.bind(this);
    this.getEventState = Helpers.getEventState.bind(this);
  }


  getTickProps(props) {
    const stringTicks = Axis.stringTicks(props);
    const scale = AxisHelpers.getScale(props);
    const ticks = AxisHelpers.getTicks(props, scale);
    return {scale, ticks, stringTicks};
  }

  getLayoutProps(props) {
    const style = getStyles(props);
    const padding = Helpers.getPadding(props);
    const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
    const isVertical = Axis.isVertical(props);
    const labelPadding = AxisHelpers.getLabelPadding(props, style);
    const offset = AxisHelpers.getOffset(props, style);
    return {style, padding, orientation, isVertical, labelPadding, offset};
  }

  renderLine(props, layoutProps) {
    const {style, padding, isVertical} = layoutProps;
    const axisEvents = this.getEvents(props.events.axis, "axis");
    const axisProps = defaults(
      {},
      this.getEventState(0, "axis"),
      props.axisComponent.props,
      {
        style: style.axis,
        x1: isVertical ? null : padding.left,
        x2: isVertical ? null : props.width - padding.right,
        y1: isVertical ? padding.top : null,
        y2: isVertical ? props.height - padding.bottom : null
      }
    );
    return React.cloneElement(props.axisComponent, assign(
      {}, axisProps, { events: Helpers.getPartialEvents(axisEvents, 0, axisProps) }
    ));
  }

  getAnchors(orientation, isVertical) {
    const anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
    const anchor = anchorOrientation[orientation];
    return {
      textAnchor: isVertical ? anchor : "middle",
      verticalAnchor: isVertical ? "middle" : anchor
    };
  }

  renderTicks(props, layoutProps, dataProps) {
    const {style, orientation, isVertical} = layoutProps;
    const {scale, ticks, stringTicks} = dataProps;
    const tickFormat = AxisHelpers.getTickFormat(props, dataProps);
    const tickPosition = AxisHelpers.getTickPosition(style.ticks, orientation, isVertical);
    const tickEvents = this.getEvents(props.events.ticks, "ticks");
    const labelEvents = this.getEvents(props.events.tickLabels, "tickLabels");

    return ticks.map((data, index) => {
      const tick = stringTicks ? props.tickValues[data - 1] : data;
      const groupPosition = scale(data);
      const yTransform = isVertical ? groupPosition : 0;
      const xTransform = isVertical ? 0 : groupPosition;
      const tickProps = defaults(
        {},
        this.getEventState(index, "ticks"),
        props.tickComponent.props,
        {
          key: `tick-${index}`,
          style: Helpers.evaluateStyle(style.ticks, tick),
          x1: xTransform,
          y1: yTransform,
          x2: xTransform + tickPosition.x2,
          y2: yTransform + tickPosition.y2,
          tick
        }
      );
      const tickComponent = React.cloneElement(props.tickComponent, assign(
        {}, tickProps, {events: Helpers.getPartialEvents(tickEvents, index, tickProps)}
      ));
      let labelComponent;
      const label = tickFormat.call(this, tick, index);
      if (label !== null && label !== undefined) {
        const anchors = this.getAnchors(orientation, isVertical);
        const labelStyle = Helpers.evaluateStyle(style.tickLabels, tick);
        const labelProps = defaults(
          {},
          this.getEventState(index, "tickLabels"),
          props.tickLabelComponent.props,
          {
            key: `tick-label-${index}`,
            style: labelStyle,
            x: xTransform + tickPosition.x,
            y: yTransform + tickPosition.y,
            verticalAnchor: labelStyle.verticalAnchor || anchors.verticalAnchor,
            textAnchor: labelStyle.textAnchor || anchors.textAnchor,
            angle: labelStyle.angle,
            text: label,
            tick
          }
        );
        labelComponent = React.cloneElement(props.tickLabelComponent, assign(
          {}, labelProps, {events: Helpers.getPartialEvents(labelEvents, index, labelProps)}
        ));
      }

      return (
        <g key={`tick-group-${index}`}>
          {tickComponent}
          {labelComponent}
        </g>
      );
    });
  }

  renderGrid(props, layoutProps, tickProps) {
    const {scale, ticks, stringTicks} = tickProps;
    const {style, padding, isVertical, offset, orientation} = layoutProps;
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    const sign = -orientationSign[orientation];
    const xOffset = props.crossAxis ? offset.x - xPadding : 0;
    const yOffset = props.crossAxis ? offset.y - yPadding : 0;
    const x2 = isVertical ?
      sign * (props.width - (padding.left + padding.right)) : 0;
    const y2 = isVertical ?
      0 : sign * (props.height - (padding.top + padding.bottom));
    const gridEvents = this.getEvents(props.events.grid, "grid");
    return ticks.map((data, index) => {
      const tick = stringTicks ? props.tickValues[data - 1] : data;
      // determine the position and translation of each gridline
      const position = scale(data);
      const xTransform = isVertical ? -xOffset : position;
      const yTransform = isVertical ? position : yOffset;
      const gridProps = defaults(
        {},
        this.getEventState(index, "grid"),
        props.gridComponent.props,
        {
          key: `grid-${index}`,
          style: Helpers.evaluateStyle(style.grid, tick),
          x1: xTransform,
          y1: yTransform,
          x2: x2 + xTransform,
          y2: y2 + yTransform,
          tick
        }
      );
      const gridComponent = React.cloneElement(props.gridComponent, assign(
        {}, gridProps, {events: Helpers.getPartialEvents(gridEvents, index, gridProps)}
      ));
      return gridComponent;
    });
  }

  renderLabel(props, layoutProps) {
    if (!props.label) {
      return undefined;
    }
    const {style, orientation, padding, labelPadding, isVertical} = layoutProps;
    const sign = orientationSign[orientation];
    const hPadding = padding.left + padding.right;
    const vPadding = padding.top + padding.bottom;
    const x = isVertical ?
      -((props.height - vPadding) / 2) - padding.top :
      ((props.width - hPadding) / 2) + padding.left;
    const y = sign * labelPadding;
    const verticalAnchor = sign < 0 ? "end" : "start";
    const transform = isVertical ? "rotate(-90)" : "";
    const labelEvents = this.getEvents(props.events.axisLabel, "axisLabel");
    const labelStyle = style.axisLabel;
    const labelProps = defaults(
      {},
      this.getEventState(0, "axisLabel"),
      props.axisLabelComponent.props,
      {
        verticalAnchor: labelStyle.verticalAnchor || verticalAnchor,
        textAnchor: labelStyle.textAnchor || "middle",
        angle: labelStyle.angle,
        style: labelStyle,
        transform,
        x,
        y,
        text: props.label
      }
    );
    return React.cloneElement(props.axisLabelComponent, assign(
      {}, labelProps, {events: Helpers.getPartialEvents(labelEvents, 0, labelProps)}
    ));
  }

  render() {
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "style", "domain", "range", "tickCount", "tickValues",
        "offsetX", "offsetY", "padding", "width", "height"
      ];
      return (
        <VictoryTransition animate={this.props.animate} animationWhitelist={whitelist}>
          <VictoryAxis {...this.props}/>
        </VictoryTransition>
      );
    }
    const layoutProps = this.getLayoutProps(this.props);
    const tickProps = this.getTickProps(this.props);
    const {style} = layoutProps;
    const transform = AxisHelpers.getTransform(this.props, layoutProps);
    const group = (
      <g style={style.parent} transform={transform}>
        {this.renderGrid(this.props, layoutProps, tickProps)}
        {this.renderLine(this.props, layoutProps)}
        {this.renderTicks(this.props, layoutProps, tickProps)}
        {this.renderLabel(this.props, layoutProps)}
      </g>
    );
    return this.props.standalone ? (
      <svg
        style={style.parent}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        {...this.props.events.parent}
      >
        {group}
      </svg>
    ) : group;
  }
}
