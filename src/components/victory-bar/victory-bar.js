import { defaults, isFunction, partialRight, partial } from "lodash";
import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers, Events, VictoryTransition, VictoryLabel
} from "victory-core";
import Bar from "./bar";
import BarHelpers from "./helper-methods";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";

const defaultStyles = {
  data: {
    width: 8,
    padding: 6,
    stroke: "transparent",
    strokeWidth: 0,
    fill: "#756f6a",
    opacity: 1
  },
  labels: {
    fontSize: 12,
    padding: 4,
    fill: "black"
  }
};

const defaultData = [
  {x: 1, y: 1},
  {x: 2, y: 2},
  {x: 3, y: 3},
  {x: 4, y: 4}
];

export default class VictoryBar extends React.Component {
  static role = "bar";

  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: () => ({ y: 0, yOffset: 0 })
    },
    onEnter: {
      duration: 500,
      before: () => ({ y: 0, yOffset: 0 }),
      after: (datum) => ({ y: datum.y, yOffset: datum.yOffset })
    }
  };

  static propTypes = {
    /**
     * The animate prop specifies props for VictoryAnimation to use. The animate prop should
     * also be used to specify enter and exit transition configurations with the `onExit`
     * and `onEnter` namespaces respectively.
     * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
     */
    animate: PropTypes.object,
    /**
     * The categories prop specifies how categorical data for a chart should be ordered.
     * This prop should be given as an array of string values, or an object with
     * these arrays of values specified for x and y. If this prop is not set,
     * categorical data will be plotted in the order it was given in the data array
     * @examples ["dogs", "cats", "mice"]
     */
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string),
        y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    /**
     * The data prop specifies the data to be plotted. Data should be in the form of an array
     * of data points. Each data point may be any format you wish
     * (depending on the `x` and `y` accessor props), but by default, an object
     * with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */
    data: PropTypes.array,
    /**
     * The dataComponent prop takes an entire component which will be used to create bars for
     * each datum in the chart. The new element created from the passed dataComponent will be
     * provided with the following properties calculated by VictoryBar: datum, index, scale,
     * style, events, horizontal (boolean), x, y, and y0. Any of these props may be overridden
     * by passing in props to the supplied component, or modified or ignored within the custom
     * component itself. If a dataComponent is not provided, VictoryBar will use its default
     * Bar component.
     */
    dataComponent: PropTypes.element,
    /**
     * The domain prop describes the range of values your bar chart will cover. This prop can be
     * given as a array of the minimum and maximum expected values for your bar chart,
     * or as an object that specifies separate arrays for x and y.
     * If this prop is not provided, a domain will be calculated from data, or other
     * available information.
     * @examples [-1, 1], {x: [0, 100], y: [0, 1]}
     */
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({
        x: CustomPropTypes.domain,
        y: CustomPropTypes.domain
      })
    ]),
    /**
     * The events prop attaches arbitrary event handlers to data and label elements
     * Event handlers are called with their corresponding events, corresponding component props,
     * and their index in the data array, and event name. The return value of event handlers
     * will be stored by index and namespace on the state object of VictoryBar
     * i.e. `this.state[index].data = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryBar
     * if one exists. If VictoryBar is set up to render g elements i.e. when it is
     * rendered within chart, or when `standalone={false}` parent events will not be applied.
     *
     * @examples {data: {
     *  onClick: () =>  return {data: {style: {fill: "green"}}, labels: {style: {fill: "black"}}}
     *}}
     */
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.func,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    /**
     * TODO
     */
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    /**
     * TODO
     */
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func
    }),
    /**
     * The height props specifies the height the svg viewBox of the chart container.
     * This value should be given as a number of pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The horizontal prop determines whether the bars will be laid vertically or
     * horizontally. The bars will be vertical if this prop is false or unspecified,
     * or horizontal if the prop is set to true.
     */
    horizontal: PropTypes.bool,
    /**
     * The labels prop defines labels that will appear above each bar in your bar chart.
     * This prop should be given as an array of values or as a function of data.
     * If given as an array, the number of elements in the array should be equal to
     * the length of the data array. Labels may also be added directly to the data object
     * like data={[{x: 1, y: 1, label: "first"}]}.
     * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
     */
    labels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array
    ]),
    /**
     * The labelComponent prop takes in an entire label component which will be used
     * to create labels for each bar in the bar chart. The new element created from
     * the passed labelComponent will be supplied with the following properties:
     * x, y, y0, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If labelComponent is omitted,
     * a new VictoryLabel will be created with props described above.
     */
    labelComponent: PropTypes.element,
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
     * The scale prop determines which scales your chart should use. This prop can be
     * given as a string specifying a supported scale ("linear", "time", "log", "sqrt"),
     * as a d3 scale function, or as an object with scales specified for x and y
     * @exampes d3Scale.time(), {x: "linear", y: "log"}
     */
    scale: PropTypes.oneOfType([
      CustomPropTypes.scale,
      PropTypes.shape({
        x: CustomPropTypes.scale,
        y: CustomPropTypes.scale
      })
    ]),
    /**
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryBar with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your VictoryBar. Any valid inline style properties
     * will be applied. Height, width, and padding should be specified via the height,
     * width, and padding props, as they are used to calculate the alignment of
     * components within chart. In addition to normal style properties, angle and verticalAnchor
     * may also be specified via the labels object, and they will be passed as props to
     * VictoryLabel, or any custom labelComponent.
     * @examples {data: {fill: "red", width: 8}, labels: {fontSize: 12}}
     */
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    /**
     * The width props specifies the width of the svg viewBox of the chart container
     * This value should be given as a number of pixels
     */
    width: CustomPropTypes.nonNegative,
    /**
     * The x prop specifies how to access the X value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'x', 'x.value.nested.1.thing', 'x[2].also.nested', null, d => Math.sin(d)
     */
    x: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The y prop specifies how to access the Y value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'y', 'y.value.nested.1.thing', 'y[2].also.nested', null, d => Math.sin(d)
     */
    y: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  };

  static defaultProps = {
    data: defaultData,
    dataComponent: <Bar/>,
    labelComponent: <VictoryLabel/>,
    height: 300,
    padding: 50,
    scale: "linear",
    standalone: true,
    width: 450,
    x: "x",
    y: "y"
  };

  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(BarHelpers.getBaseProps.bind(BarHelpers), defaultStyles);

  constructor() {
    super();
    this.state = {};
    const getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEvents = partial(Events.getEvents.bind(this), getScopedEvents);
    this.getEventState = Events.getEventState.bind(this);
  }

  componentWillMount() {
    this.baseProps = BarHelpers.getBaseProps(this.props, defaultStyles);
  }

  componentWillReceiveProps(newProps) {
    this.baseProps = BarHelpers.getBaseProps(newProps, defaultStyles);
  }

  renderData(props) {
    const { dataComponent, labelComponent, sharedEvents } = props;
    const getSharedEventState = sharedEvents && isFunction(sharedEvents.getEventState) ?
      sharedEvents.getEventState : () => undefined;
    return Object.keys(this.baseProps).map((key) => {
      const dataEvents = this.getEvents(props, "data", key);
      const dataProps = defaults(
        {},
        this.getEventState(key, "data"),
        getSharedEventState(key, "data"),
        this.baseProps[key].data
      );
      const barComponent = React.cloneElement(dataComponent, Object.assign(
        {}, dataProps, {events: Events.getPartialEvents(dataEvents, key, dataProps)}
      ));
      const labelProps = defaults(
        {},
        this.getEventState(key, "labels"),
        getSharedEventState(key, "labels"),
        this.baseProps[key].labels
      );
      if (labelProps && labelProps.text) {
        const labelEvents = this.getEvents(props, "labels", key);
        const barLabel = React.cloneElement(labelComponent, Object.assign({
          events: Events.getPartialEvents(labelEvents, key, labelProps)
        }, labelProps));
        return (
          <g key={`bar-group-${key}`}>
            {barComponent}
            {barLabel}
          </g>
        );
      }
      return barComponent;
    });
  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryBar` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      const whitelist = [
        "data", "domain", "height", "padding", "style", "width"
      ];
      return (
        <VictoryTransition animate={this.props.animate} animationWhitelist={whitelist}>
          <VictoryBar {...this.props}/>
        </VictoryTransition>
      );
    }
    const style = Helpers.getStyles(this.props.style, defaultStyles, "auto", "100%");
    const parentEvents = this.props.events && this.props.events.parent;
    const group = <g style={style.parent}>{this.renderData(this.props)}</g>;
    return this.props.standalone ?
      <svg
        style={style.parent}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        {...parentEvents}
      >
        {group}
      </svg> :
      group;
  }
}
