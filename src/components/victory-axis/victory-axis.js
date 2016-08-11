import { assign, defaults, isFunction, partialRight } from "lodash";
import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers, Events, VictoryTransition, VictoryLabel,
  VictoryContainer
} from "victory-core";
import AxisLine from "./axis-line";
import AxisHelpers from "./helper-methods";
import Axis from "../../helpers/axis";

const fallbackProps = {
  props: {
    width: 450,
    height: 300
  },
  style: {
    axis: {
      fill: "none",
      stroke: "#252525",
      strokeWidth: 1,
      strokeLinecap: "round"
    },
    axisLabel: {
      fill: "#252525",
      fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
      fontSize: 14,
      letterSpacing: "0.04em",
      padding: 25,
      stroke: "transparent"
    },
    grid: {
      fill: "none",
      stroke: "transparent",
      strokeLinecap: "round"
    },
    ticks: {
      fill: "none",
      padding: 10,
      size: 1,
      stroke: "none",
      strokeWidth: 1,
      strokeLinecap: "round"
    },
    tickLabels: {
      fill: "#252525",
      fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
      fontSize: 14,
      letterSpacing: "0.04em",
      padding: 10,
      stroke: "transparent"
    }
  }
};

export default class VictoryAxis extends React.Component {
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
     * The domainPadding prop specifies a number of pixels of padding to add to the
     * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
     * from the origin to prevent crowding. This prop should be given as an object with
     * numbers specified for x and y.
     */
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.oneOfType([
          PropTypes.number,
          CustomPropTypes.domain
        ]),
        y: PropTypes.oneOfType([
          PropTypes.number,
          CustomPropTypes.domain
        ])
      }),
      PropTypes.number
    ]),
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
      target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
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
    tickValues: CustomPropTypes.homogeneousArray,
    /**
     * The width props specifies the width of the svg viewBox of the chart container
     * This value should be given as a number of pixels
     */
    width: CustomPropTypes.nonNegative,
    /**
     * The containerComponent prop takes an entire component which will be used to
     * create a container element for standalone charts.
     * The new element created from the passed containerComponent wil be provided with
     * these props from VictoryAxis: height, width, children
     * (the chart itself) and style. Props that are not provided by the
     * child chart component include title and desc, both of which
     * are intended to add accessibility to Victory components. The more descriptive these props
     * are, the more accessible your data will be for people using screen readers.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If a dataComponent is
     * not provided, VictoryAxis will use the default VictoryContainer component.
     * @examples <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
     * popular each dog breed is by percentage in Seattle." />
     */
    containerComponent: PropTypes.element,
    /**
    * The theme prop takes a style object with nested axis, ticks, axisLabel, grid, and
    * tickLabels objects. You can create this object yourself, or you can use a theme provided by
    * Victory. When using VictoryAxis as a solo component, implement the theme directly on
    * VictoryAxis. If you are wrapping VictoryAxis in VictoryChart, VictoryStack, or
    * VictoryGroup, please call the theme on the outermost wrapper component instead.
    * @examples theme={VictoryTheme.material}
    */
    theme: PropTypes.object,
    /**
     * The groupComponent prop takes an entire component which will be used to
     * create group elements for use within container elements. This prop defaults
     * to a <g> tag on web, and a react-native-svg <G> tag on mobile
     */
    groupComponent: PropTypes.element
  };

  static defaultProps = {
    axisComponent: <AxisLine type={"axis"}/>,
    axisLabelComponent: <VictoryLabel/>,
    tickLabelComponent: <VictoryLabel/>,
    tickComponent: <AxisLine type={"tick"}/>,
    gridComponent: <AxisLine type={"grid"}/>,
    padding: 50,
    scale: "linear",
    standalone: true,
    tickCount: 5,
    containerComponent: <VictoryContainer />,
    groupComponent: <g/>
  };

  static getDomain = AxisHelpers.getDomain.bind(AxisHelpers);
  static getAxis = Axis.getAxis.bind(Axis);
  static getScale = AxisHelpers.getScale.bind(AxisHelpers);
  static getStyles = partialRight(AxisHelpers.getStyles.bind(AxisHelpers), fallbackProps.style);
  static getBaseProps = partialRight(AxisHelpers.getBaseProps.bind(AxisHelpers), fallbackProps);

  constructor() {
    super();
    this.state = {};
    const getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEvents = partialRight(Events.getEvents.bind(this), getScopedEvents);
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
    this.baseProps = AxisHelpers.getBaseProps(props, fallbackProps);
    this.dataKeys = Object.keys(this.baseProps).filter((key) => key !== "parent");
    this.getSharedEventState = sharedEvents && isFunction(sharedEvents.getEventState) ?
      sharedEvents.getEventState : () => undefined;
  }

  renderLine(props) {
    const key = 0;
    const axisEvents = this.getEvents(props, "axis", key);
    const baseProps = this.baseProps[key];
    const axisProps = defaults(
      {},
      this.getEventState(key, "axis"),
      this.getSharedEventState(key, "axis"),
      props.axisComponent.props,
      baseProps ? baseProps.axis : null
    );
    return React.cloneElement(props.axisComponent, assign(
      {}, axisProps, {events: Events.getPartialEvents(axisEvents, key, axisProps)}
    ));
  }

  renderLabel(props) {
    const key = 0;
    const axisLabelEvents = this.getEvents(props, "axisLabel", key);
    const baseProps = this.baseProps[key];
    const axisLabelProps = defaults(
      {},
      this.getEventState(key, "axisLabel"),
      this.getSharedEventState(key, "axisLabel"),
      props.axisLabelComponent.props,
      baseProps ? baseProps.axisLabel : null
    );
    return React.cloneElement(props.axisLabelComponent, assign(
      {}, axisLabelProps, {events: Events.getPartialEvents(axisLabelEvents, key, axisLabelProps)}
    ));
  }

  renderGridAndTicks(props) {
    const { tickComponent, tickLabelComponent, gridComponent } = props;
    const gridAndTickComponents = [];
    for (let index = 0, len = this.dataKeys.length; index < len; index++) {
      const key = this.dataKeys[index];
      const tickEvents = this.getEvents(props, "ticks", key);
      const tickProps = defaults(
        {index},
        this.getEventState(key, "ticks"),
        this.getSharedEventState(key, "ticks"),
        tickComponent.props,
        this.baseProps[key].ticks
      );
      const TickComponent = React.cloneElement(tickComponent, assign(
        {}, tickProps, {events: Events.getPartialEvents(tickEvents, key, tickProps)}
      ));
      const gridEvents = this.getEvents(props, "grid", key);
      const gridProps = defaults(
        {index},
        this.getEventState(key, "grid"),
        this.getSharedEventState(key, "grid"),
        gridComponent.props,
        this.baseProps[key].grid
      );
      const GridComponent = React.cloneElement(gridComponent, assign(
        {}, gridProps, {events: Events.getPartialEvents(gridEvents, key, gridProps)}
      ));
      const tickLabelProps = defaults(
        {index},
        this.getEventState(key, "tickLabels"),
        this.getSharedEventState(key, "tickLabels"),
        tickLabelComponent.props,
        this.baseProps[key].tickLabels
      );
      const tickLabelEvents = this.getEvents(props, "tickLabels", key);
      const TickLabel = React.cloneElement(tickLabelComponent, assign({
        events: Events.getPartialEvents(tickLabelEvents, key, tickLabelProps)
      }, tickLabelProps));

      gridAndTickComponents[index] = React.cloneElement(
        props.groupComponent, {key: `tick-group-${key}`}, GridComponent, TickComponent, TickLabel
      );
    }
    return gridAndTickComponents;
  }

  renderContainer(props, group) {
    const parentEvents = this.getEvents(props, "parent", "parent");
    const parentProps = defaults(
      {},
      this.getEventState("parent", "parent"),
      this.getSharedEventState("parent", "parent"),
      props.containerComponent.props,
      this.baseProps.parent
    );
    return React.cloneElement(
      props.containerComponent,
      assign(
        {}, parentProps, {events: Events.getPartialEvents(parentEvents, "parent", parentProps)}
      ),
      group
    );
  }

  renderGroup(children, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      ...children
    );
  }

  render() {
    const modifiedProps = Helpers.modifyProps(this.props, fallbackProps);
    const { animate, standalone } = modifiedProps;
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
          {React.createElement(this.constructor, modifiedProps)}
        </VictoryTransition>
      );
    }

    const styleObject = modifiedProps.theme && modifiedProps.theme.axis ? modifiedProps.theme.axis
    : fallbackProps.style;
    const style = AxisHelpers.getStyles(modifiedProps, styleObject);
    const children = [
      ...this.renderGridAndTicks(modifiedProps),
      this.renderLine(modifiedProps),
      this.renderLabel(modifiedProps)
    ];

    const group = this.renderGroup(children, style.parent);

    return standalone ? this.renderContainer(modifiedProps, group) : group;
  }
}
