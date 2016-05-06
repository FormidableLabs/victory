import React, { PropTypes } from "react";
import pick from "lodash/pick";
import omit from "lodash/omit";
import defaults from "lodash/defaults";
import assign from "lodash/assign";
import Point from "./point";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel
} from "victory-core";
import ScatterHelpers from "./helper-methods";

const defaultStyles = {
  data: {
    fill: "#756f6a",
    opacity: 1,
    stroke: "transparent",
    strokeWidth: 0
  },
  labels: {
    stroke: "transparent",
    fill: "#756f6a",
    fontFamily: "Helvetica",
    fontSize: 10,
    textAnchor: "middle",
    padding: 5
  }
};

export default class VictoryScatter extends React.Component {
  static role = "scatter";

  static defaultTransitions = {
    onExit: {
      duration: 600,
      before: () => ({ opacity: 0 })
    },
    onEnter: {
      duration: 600,
      before: () => ({ opacity: 0 }),
      after: (datum) => ({ opacity: datum.opacity || 1 })
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
     * The bubbleProperty prop indicates which property of the data object should be used
     * to scale data points in a bubble chart
     */
    bubbleProperty: PropTypes.string,
    /**
     * The data prop specifies the data to be plotted.
     * Data should be in the form of an array of data points.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * Other properties may be added to the data point object, such as fill, size, and symbol.
     * These properties will be interpreted and applied to the individual lines
     * @examples [{x: 1, y: 2, fill: "red"}, {x: 2, y: 3, label: "foo"}]
     */

    data: PropTypes.array,
    /**
     * The dataComponent prop takes an entire component which will be used to create points for
     * each datum in the chart. The new element created from the passed dataComponent will be
     * provided with the following properties calculated by VictoryScatter: datum, index, scale,
     * style, events, x, y, size, and symbol. Any of these props may be overridden by passing in
     * props to the supplied component, or modified or ignored within the custom component itself.
     * If a dataComponent is not provided, VictoryScatter will use its default Point component.
     */
    dataComponent: PropTypes.element,
    /**
     * The domain prop describes the range of values your chart will include. This prop can be
     * given as a array of the minimum and maximum expected values for your chart,
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
     * will be stored by index and namespace on the state object of VictoryScatter
     * i.e. `this.state[index].data = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryScatter
     * if one exists. If VictoryScatter is set up to render g elements i.e. when it is
     * rendered within chart, or when `standalone={false}` parent events will not be applied.
     *
     * @examples {data: {
     *  onClick: () =>  return {data: {style: {fill: "green"}}, labels: {style: {fill: "black"}}}
     *}}
     */
    events: PropTypes.shape({
      data: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object
    }),
    /**
     * The height props specifies the height the svg viewBox of the chart container.
     * This value should be given as a number of pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The labelComponent prop takes in an entire label component which will be used
     * to create labels for each point in the scatter. The new element created from
     * the passed labelComponent will be supplied with the following properties:
     * x, y, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
     * any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If labelComponent is omitted,
     * a new VictoryLabel will be created with props described above.
     */
    labelComponent: PropTypes.element,
    /**
     * The labels prop defines labels that will appear with each point in your chart.
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
     * The maxBubbleSize prop sets an upper limit for scaling data points in a bubble chart
     */
    maxBubbleSize: CustomPropTypes.nonNegative,
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
     * The samples prop specifies how many individual points to plot when plotting
     * y as a function of x. Samples is ignored if x props are provided instead.
     */
    samples: CustomPropTypes.nonNegative,
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
     * The size prop determines how to scale each data point
     */
    size: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryScatter with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your VictoryScatter. Any valid inline style properties
     * will be applied. Height, width, and padding should be specified via the height,
     * width, and padding props, as they are used to calculate the alignment of
     * components within chart. In addition to normal style properties, angle and verticalAnchor
     * may also be specified via the labels object, and they will be passed as props to
     * VictoryLabel, or any custom labelComponent.
     * @examples {data: {fill: "red"}, labels: {fontSize: 12}}
     */
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    /**
     * The symbol prop determines which symbol should be drawn to represent data points.
     */
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"
      ]),
      PropTypes.func
    ]),
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
    events: {},
    height: 300,
    padding: 50,
    samples: 50,
    scale: "linear",
    size: 3,
    standalone: true,
    symbol: "circle",
    width: 450,
    x: "x",
    y: "y",
    dataComponent: <Point/>,
    labelComponent: <VictoryLabel/>
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);

  constructor() {
    super();
    this.state = {};
    this.getEvents = Helpers.getEvents.bind(this);
    this.getEventState = Helpers.getEventState.bind(this);
  }

  getDataStyles(data, style) {
    const stylesFromData = omit(data, [
      "x", "y", "z", "size", "symbol", "name", "label"
    ]);
    const baseDataStyle = defaults({}, stylesFromData, style);
    return Helpers.evaluateStyle(baseDataStyle, data);
  }

  getLabelText(props, datum, index) {
    const propsLabel = Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum);
    return datum.label || propsLabel;
  }

  getLabelStyle(labelStyle, dataProps) {
    const { datum, size, style } = dataProps;
    const matchedStyle = pick(style, ["opacity", "fill"]);
    const padding = labelStyle.padding || size * 0.25;
    const baseLabelStyle = defaults({}, labelStyle, matchedStyle, {padding});
    return Helpers.evaluateStyle(baseLabelStyle, datum);
  }

  renderData(props, calculatedProps, style) {
    const dataEvents = this.getEvents(props.events.data, "data");
    const labelEvents = this.getEvents(props.events.labels, "labels");
    const { scale, data } = calculatedProps;
    return data.map((datum, index) => {
      const x = scale.x(datum.x);
      const y = scale.y(datum.y);
      const size = ScatterHelpers.getSize(datum, props, calculatedProps);
      const symbol = ScatterHelpers.getSymbol(datum, props);
      const dataStyle = this.getDataStyles(datum, style.data);
      const dataProps = defaults(
        {},
        this.getEventState(index, "data"),
        props.dataComponent.props,
        {
          x, y, size, scale, datum, symbol, index, style: dataStyle, key: `point-${index}`
        }
      );
      const pointComponent = React.cloneElement(props.dataComponent, assign(
        {}, dataProps, {events: Helpers.getPartialEvents(dataEvents, index, dataProps)}
      ));
      const text = this.getLabelText(props, dataProps.datum, index);
      if (text !== null && text !== undefined) {
        const labelStyle = this.getLabelStyle(style.labels, dataProps);
        const labelProps = defaults(
          {},
          this.getEventState(index, "labels"),
          props.labelComponent.props,
          {
            key: `point-label-${index}`,
            style: labelStyle,
            x,
            y: y - labelStyle.padding,
            text,
            index,
            datum: dataProps.datum,
            textAnchor: labelStyle.textAnchor,
            verticalAnchor: labelStyle.verticalAnchor || "end",
            angle: labelStyle.angle
          }
        );
        const pointLabel = React.cloneElement(props.labelComponent, assign({
          events: Helpers.getPartialEvents(labelEvents, index, labelProps)
        }, labelProps));
        return (
          <g key={`point-group-${index}`}>
            {pointComponent}
            {pointLabel}
          </g>
        );
      }
      return pointComponent;
    });
  }

  getCalculatedProps(props, style) {
    const data = Data.getData(props);
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomain(props, "x"),
      y: Domain.getDomain(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    const z = props.bubbleProperty || "z";
    return {data, scale, style, z};
  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryScatter` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "data", "domain", "height", "maxBubbleSize", "padding", "samples", "size",
        "style", "width", "x", "y"
      ];
      return (
        <VictoryTransition animate={this.props.animate} animationWhitelist={whitelist}>
          <VictoryScatter {...this.props}/>
        </VictoryTransition>
      );
    }

    const style = Helpers.getStyles(
      this.props.style,
      defaultStyles,
      "auto",
      "100%"
    );
    const calculatedProps = this.getCalculatedProps(this.props, style);
    const group = <g style={style.parent}>{this.renderData(this.props, calculatedProps, style)}</g>;
    return this.props.standalone ?
      <svg
        style={style.parent}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        {...this.props.events.parent}
      >
        {group}
      </svg> :
      group;
  }
}
