import defaults from "lodash/defaults";
import pick from "lodash/pick";

import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes,
  VictoryAnimation,
  Helpers
} from "victory-core";
import AxisLine from "./axis-line";
import AxisLabel from "./axis-label";
import GridLine from "./grid";
import Tick from "./tick";
import TickLabel from "./tick-label";
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
  const parentStyleProps = { height: props.height, width: props.width };
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
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the axis will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {duration: 500, onEnd: () => alert("done!")}
     */
    animate: PropTypes.object,
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
     * will be stored by unique index on the state object of VictoryAxis
     * i.e. `this.state.axisState[axisIndex] = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryAxis
     * if one exists. If VictoryAxis is set up to render g elements i.e. when it is
     * rendered within chart, or when `standalone={false}` parent events will not be applied.
     *
     * @examples {axis: {
     *  onClick: () => return {style: {stroke: "green"}}
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
     * The height prop specifies the height of the chart container element in pixels.
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
     * The style prop specifies styles for your chart. Victory Axis relies on Radium,
     * so valid Radium style objects should work for this prop, however height, width, and margin
     * are used to calculate range, and need to be expressed as a number of pixels.
     * Styles for axis lines, gridlines, and ticks are scoped to separate props.
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
     * The tickCount prop specifies how many ticks should be drawn on the axis if
     * tickValues are not explicitly provided.
     */
    tickCount: CustomPropTypes.nonNegative,
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
     * The width props specifies the width of the chart container element in pixels
     */
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
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

  componentWillMount() {
    this.state = {
      axisState: {},
      axisLabelState: {},
      gridState: {},
      ticksState: {},
      tickLabelsState: {}
    };
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
    const getBoundEvents = Helpers.getEvents.bind(this);
    return (
      <AxisLine key="line"
        events={getBoundEvents(this.props.events.axis, "axis")}
        style={style.axis}
        x1={isVertical ? null : padding.left}
        x2={isVertical ? null : props.width - padding.right}
        y1={isVertical ? padding.top : null}
        y2={isVertical ? props.height - padding.bottom : null}
        {...this.state.axisState[0]}
      />
    );
  }

  renderTicks(props, layoutProps, tickProps) {
    const {style, orientation} = layoutProps;
    const {scale, ticks, stringTicks} = tickProps;
    const tickFormat = AxisHelpers.getTickFormat(props, tickProps);
    return ticks.map((tick, index) => {
      const isVertical = orientation === "left" || orientation === "right";
      const tickPosition = AxisHelpers.getTickPosition(style.ticks, orientation, isVertical);
      const getBoundEvents = Helpers.getEvents.bind(this);
      const tickComponent = (
        <Tick key={`tick-${index}`}
          index={index}
          events={getBoundEvents(this.props.events.ticks, "ticks")}
          position={tickPosition}
          tick={stringTicks ? props.tickValues[tick - 1] : tick}
          style={style.ticks}
          {...this.state.ticksState[index]}
        />
      );
      const label = tickFormat.call(this, tick, index);
      let labelComponent;
      if (label) {
        labelComponent = (
          <TickLabel key={`tick-label-${index}`}
            index={index}
            events={getBoundEvents(this.props.events.tickLabels, "tickLabels")}
            position={tickPosition}
            label={label}
            tick={stringTicks ? props.tickValues[tick - 1] : tick}
            orientation={orientation}
            isVertical={isVertical}
            style={style.tickLabels}
            {...this.state.tickLabelsState[index]}
          />
        );
      }
      const groupPosition = scale(tick);
      const transform = isVertical ?
        `translate(0, ${groupPosition})` : `translate(${groupPosition}, 0)`;
      return (
        <g key={`tick-group-${index}`} transform={transform}>
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
    return ticks.map((tick, index) => {
      // determine the position and translation of each gridline
      const position = scale(tick);
      const getBoundEvents = Helpers.getEvents.bind(this);
      return (
        <GridLine key={`grid-${index}`}
          index={index}
          events={getBoundEvents(this.props.events.grid, "grid")}
          tick={stringTicks ? props.tickValues[tick - 1] : tick}
          x2={x2}
          y2={y2}
          xTransform={isVertical ? -xOffset : position}
          yTransform={isVertical ? position : yOffset}
          style={style.grid}
          {...this.state.gridState[index]}
        />
      );
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
    const getBoundEvents = Helpers.getEvents.bind(this);
    return (
      <AxisLabel
        events={getBoundEvents(this.props.events.axisLabel, "axisLabels")}
        verticalAnchor={verticalAnchor}
        transform={transform}
        position={{x, y}}
        label={this.props.label}
        style={style.axisLabel}
        {...this.state.axisLabelState[0]}
      />
    );
  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryAxis` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "style", "domain", "range", "tickCount", "tickValues",
        "offsetX", "offsetY", "padding", "width", "height"
      ];
      const animateData = pick(this.props, whitelist);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryAxis {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
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
      <svg style={style.parent} {...this.props.events.parent}>
        {group}
      </svg>
    ) : group;
  }
}
