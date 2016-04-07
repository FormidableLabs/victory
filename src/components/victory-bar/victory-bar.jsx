import pick from "lodash/pick";
import omit from "lodash/omit";
import defaults from "lodash/defaults";
import assign from "lodash/assign";
import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers, VictoryAnimation } from "victory-core";

import Bar from "./bar";
import BarLabel from "./bar-label";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";

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
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the bar chart will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {duration: 500, onEnd: () => alert("done!")}
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
     * The dataComponent prop takes an entire, HTML-complete data component which will be used to
     * create bars for each datum in the chart. The new element created from the passed
     * dataComponent will be provided with the following properties calculated by VictoryBar:
     * datum, index, style, events, horizontal (boolean), and position as object with
     * values for x, y0, and y1. If a dataComponent is not provided, VictoryBar will
     * use its default Bar component.
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
     * will be stored by unique index on the state object of VictoryBar
     * i.e. `this.state.dataState[dataIndex] = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryBar
     * if one exists. If VictoryBar is set up to render g elements i.e. when it is
     * rendered within chart, or when `standalone={false}` parent events will not be applied.
     *
     * @examples {data: {
     *  onClick: () => onClick: () => return {style: {fill: "green"}}
     *}}
     */
    events: PropTypes.shape({
      data: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object
    }),
    /**
     * The height props specifies the height of the chart container element in pixels
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
     * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
     */
    labels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array
    ]),
    /**
     * The labelComponent prop takes in an entire, HTML-complete label
     * component which will be used to create labels for each bar in the bar
     * chart. The new element created from the passed labelComponent will have
     * property data provided by the bar's datum; properties x, y, textAnchor,
     * and verticalAnchor preserved or default values provided by the bar; and
     * styles filled out with defaults provided by the bar, and overrides from
     * the datum. If labelComponent is omitted, a new VictoryLabel will be
     * created with props and styles from the bar.
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
     * The style prop specifies styles for your chart. VictoryBar relies on Radium,
     * so valid Radium style objects should work for this prop, however height, width, and margin
     * are used to calculate range, and need to be expressed as a number of pixels
     * @examples {data: {fill: "red", width: 8}, labels: {fontSize: 12}}
     */
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    /**
     * The width prop specifies the width of the chart container element in pixels
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
    events: {},
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

  componentWillMount() {
    this.state = {
      dataState: {},
      labelsState: {}
    };
  }

  getScale(props) {
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    return {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
  }

  getBarPosition(props, datum) {
    const yOffset = datum.yOffset || 0;
    const xOffset = datum.xOffset || 0;
    const y0 = yOffset;
    const y1 = datum.y + yOffset;
    const x = datum.x + xOffset;
    const formatValue = (value, axis) => {
      return datum[axis] instanceof Date ? new Date(value) : value;
    };
    const scale = this.getScale(props);
    return {
      x: scale.x(formatValue(x, "x")),
      y0: scale.y(formatValue(y0, "y")),
      y1: scale.y(formatValue(y1, "y"))
    };
  }

  getBarStyle(datum, baseStyle) {
    const styleData = omit(datum, [
      "xName", "yName", "x", "y", "label"
    ]);
    return defaults({}, styleData, baseStyle);
  }

  getSharedProps(props, datum, index) {
    const horizontal = props.horizontal;
    const position = this.getBarPosition(props, datum);
    return { index, horizontal, datum, position };
  }

  renderData(props, data, style) {
    return data.map((datum, index) => {
      const sharedProps = this.getSharedProps(props, datum, index);
      const getBoundEvents = Helpers.getEvents.bind(this);
      const barStyle = this.getBarStyle(datum, style.data);
      const events = getBoundEvents(props.events.data, "data");
      const barProps = assign(
        {key: `bar-${index}`, style: barStyle, events},
        sharedProps,
        this.state.dataState[index]
      );
      const barComponent = React.cloneElement(this.props.dataComponent, barProps);
      if (datum.label || props.labels) {
        const labelText = datum.label || (props.labels && props.labels[index]) || "";
        const labelEvents = getBoundEvents(props.events.labels, "labels");
        const labelProps = assign(
          {
            key: `bar-label-${index}`, style: style.labels, events: labelEvents,
            labelText, labelComponent: props.labelComponent
          },
          sharedProps,
          this.state.labelsState[index]
        );
        return (
          <g key={`bar-${index}`}>
            {barComponent}
            <BarLabel {...labelProps}/>
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
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "data", "domain", "height", "padding", "style", "width"
      ];
      const animateData = pick(this.props, whitelist);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryBar {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    }

    const style = Helpers.getStyles(
      this.props.style, defaultStyles, this.props.height, this.props.width);
    const data = Data.getData(this.props);
    const group = <g style={style.parent}>{this.renderData(this.props, data, style)}</g>;
    return this.props.standalone ?
      <svg style={style.parent} {...this.props.events.parent}>{group}</svg> :
      group;
  }
}
