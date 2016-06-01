import { defaults, isFunction, partial, partialRight, omit } from "lodash";
import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers, Events, VictoryTransition, VictoryLabel
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
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({
        x: CustomPropTypes.domain,
        y: CustomPropTypes.domain
      })
    ]),
    /**
     * The event prop take an array of event objects. Event objects are composed of
     * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
     * for a given component, so "axis", "axisLabel", "ticks", "tickLabels", and "grid" are
     * all valid targets for VictoryAxis events. The eventKey may optionally be used to select a
     * single element by index rather than an entire set. The eventHandlers object
     * should be given as an object whose keys are standard event names (i.e. onClick)
     * and whose values are event callbacks. The return value of an event handler
     * be used to modify other elemnts. The return value should be given as an object or
     * an array of objects with optional target and eventKey keys, and a mutation
     * key whose value is a function. The target and eventKey keys will default to those
     * corresponding to the element the event handler was attached to. The mutation
     * function will be called with the calculated props for the individual selected
     * element (i.e. a single tick), and the object returned from the mutation function
     * will override the props of the selected element via object assignment.
     * @examples
     * events={[
     *   {
     *     target: "grid",
     *     eventKey: 2,
     *     eventHandlers: {
     *       onClick: () => {
     *         return [
     *           {
     *             mutation: (props) => {
     *               return {style: merge({}, props.style, {stroke: "orange"})};
     *             }
     *           }, {
     *             target: "tickLabels",
     *             mutation: () => {
     *               return {text: "hey"};
     *             }
     *           }
     *         ];
     *       }
     *     }
     *   }
     * ]}
     *}}
     */
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels"]),
      eventKey: PropTypes.oneOfType([
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    /**
     * The name prop is used to reference a component instance when defining shared events.
     */
    name: PropTypes.string,
    /**
     * This prop is used to coordinate events between VictoryAxis and other Victory
     * Components via VictorySharedEvents. This prop should not be set manually.
     */
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func
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
     * The tickCount prop specifies approximately how many ticks should be drawn on the axis if
     * tickValues are not explicitly provided. This values is calculated by d3 scale and
     * prioritizes returning "nice" values and evenly spaced ticks over an exact numnber of ticks
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
    height: 300,
    padding: 50,
    scale: "linear",
    standalone: true,
    tickCount: 5,
    width: 450
  };

  static getDomain = AxisHelpers.getDomain.bind(AxisHelpers);
  static getAxis = Axis.getAxis.bind(Axis);
  static getScale = AxisHelpers.getScale.bind(AxisHelpers);
  static getStyles = partialRight(AxisHelpers.getStyles.bind(AxisHelpers), defaultStyles);
  static getBaseProps = partialRight(AxisHelpers.getBaseProps.bind(AxisHelpers), defaultStyles);

  constructor() {
    super();
    this.state = {};
    const getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEvents = partial(Events.getEvents.bind(this), getScopedEvents);
    this.getEventState = Helpers.getEventState.bind(this);
  }

  componentWillMount() {
    this.setupEvents(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setupEvents(newProps);
  }

  setupEvents(props) {
    const {sharedEvents} = props;
    this.baseProps = AxisHelpers.getBaseProps(props, defaultStyles);
    this.getSharedEventState = sharedEvents && isFunction(sharedEvents.getEventState) ?
      sharedEvents.getEventState : () => undefined;
  }

  renderLine(props) {
    const key = 0;
    const axisEvents = this.getEvents(props, "axis", key);
    const axisProps = defaults(
      {},
      this.getEventState(key, "axis"),
      this.getSharedEventState(key, "axis"),
      this.baseProps[key].axis,
      props.axisComponent.props
    );
    return React.cloneElement(props.axisComponent, Object.assign(
      {}, axisProps, {events: Events.getPartialEvents(axisEvents, key, axisProps)}
    ));
  }

  renderLabel(props) {
    const key = 0;
    const axisLabelEvents = this.getEvents(props, "axisLabel", key);
    const axisLabelProps = defaults(
      {},
      this.getEventState(key, "axisLabel"),
      this.getSharedEventState(key, "axisLabel"),
      this.baseProps[key].axisLabel,
      props.axisLabelComponent.props
    );
    return React.cloneElement(props.axisLabelComponent, Object.assign(
      {}, axisLabelProps, {events: Events.getPartialEvents(axisLabelEvents, key, axisLabelProps)}
    ));
  }

  renderGridAndTicks(props) {
    const { tickComponent, tickLabelComponent, gridComponent } = props;
    const baseProps = omit(this.baseProps, ["axis", "axisLabel"]);
    return Object.keys(baseProps).map((key) => {
      const tickEvents = this.getEvents(props, "ticks", key);
      const tickProps = defaults(
        {},
        this.getEventState(key, "ticks"),
        this.getSharedEventState(key, "ticks"),
        this.baseProps[key].ticks,
        tickComponent.props
      );
      const TickComponent = React.cloneElement(tickComponent, Object.assign(
        {}, tickProps, {events: Events.getPartialEvents(tickEvents, key, tickProps)}
      ));
      const gridEvents = this.getEvents(props, "grid", key);
      const gridProps = defaults(
        {},
        this.getEventState(key, "grid"),
        this.getSharedEventState(key, "grid"),
        this.baseProps[key].grid,
        gridComponent.props
      );
      const GridComponent = React.cloneElement(gridComponent, Object.assign(
        {}, gridProps, {events: Events.getPartialEvents(gridEvents, key, gridProps)}
      ));
      const tickLabelProps = defaults(
        {},
        this.getEventState(key, "tickLabels"),
        this.getSharedEventState(key, "tickLabels"),
        this.baseProps[key].tickLabels,
        tickLabelComponent.props
      );
      const tickLabelEvents = this.getEvents(props, "tickLabels", key);
      const TickLabel = React.cloneElement(tickLabelComponent, Object.assign({
        events: Events.getPartialEvents(tickLabelEvents, key, tickLabelProps)
      }, tickLabelProps));
      return (
        <g key={`tick-group-${key}`}>
          {TickComponent}
          {TickLabel}
          {GridComponent}
        </g>
      );
    });
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
    const style = AxisHelpers.getStyles(this.props, defaultStyles);
    const calculatedValues = AxisHelpers.getCalculatedValues(this.props, defaultStyles);
    const transform = AxisHelpers.getTransform(this.props, calculatedValues);
    const group = (
      <g style={style.parent} transform={transform}>
        {this.renderGridAndTicks(this.props)}
        {this.renderLine(this.props)}
        {this.renderLabel(this.props)}
      </g>
    );
    return this.props.standalone ? (
      <svg
        style={style.parent}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        {group}
      </svg>
    ) : group;
  }
}
