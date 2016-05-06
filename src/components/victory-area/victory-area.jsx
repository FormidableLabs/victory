import last from "lodash/last";
import defaults from "lodash/defaults";
import assign from "lodash/assign";
import React, { PropTypes } from "react";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel
} from "victory-core";
import Area from "./area";

const defaultStyles = {
  data: {
    fill: "#756f6a"
  },
  labels: {
    fontSize: 12,
    padding: 4,
    fill: "black"
  }
};

export default class VictoryArea extends React.Component {
  static role = "area";

  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: () => ({ y: 0, yOffset: 0 })
    },
    onEnter: {
      duration: 500,
      before: () => ({ y: 0, yOffset: 0, xOffset: 0 }),
      after: (datum) => ({ y: datum.y, yOffset: datum.yOffset, xOffset: datum.xOffset })
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
     * of data points, or an array of arrays of data points for multiple datasets.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */
    data: PropTypes.array,
    /**
     * The dataComponent prop takes an entire component which will be used to create an area.
     * The new element created from the passed dataComponent will be provided with the
     * following properties calculated by VictoryArea: a scale, style, events, interpolation,
     * and an array of modified data objects (including x, y, and calculated y0 and y1).
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If a dataComponent is
     * not provided, VictoryArea will use its default Area component.
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
     * will be stored by index and namespace on the state object of VictoryArea
     * i.e. `this.state[index].data = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryArea
     * if one exists. If VictoryArea is set up to render g elements i.e. when it is
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
     * The interpolation prop determines how data points should be connected
     * when plotting a line
     */
    interpolation: PropTypes.oneOf([
      "basis",
      "basisClosed",
      "basisOpen",
      "bundle",
      "cardinal",
      "cardinalClosed",
      "cardinalOpen",
      "catmullRom",
      "catmullRomClosed",
      "catmullRomOpen",
      "linear",
      "linearClosed",
      "monotoneX",
      "monotoneY",
      "natural",
      "radial",
      "step",
      "stepAfter",
      "stepBefore"
    ]),
    /**
     * The label prop defines the label that will appear at the edge of the area.
     * This prop should be given a string or as a function of data. If individual
     * labels are required for each data point, they should be created by composing
     * VictoryArea with VictoryScatter
     * @examples: "Series 1", (data) => `${data.length} points`
     */
    label: PropTypes.string,
    /**
     * The labelComponent prop takes in an entire label component which will be used
     * to create a label for the area. The new element created from the passed labelComponent
     * will be supplied with the following properties: x, y, index, data, verticalAnchor,
     * textAnchor, angle, style, text, and events. any of these props may be overridden
     * by passing in props to the supplied component, or modified or ignored within
     * the custom component itself. If labelComponent is omitted, a new VictoryLabel
     * will be created with props described above. This labelComponent prop should be used to
     * provide a series label for VictoryLine. If individual labels are required for each
     * data point, they should be created by composing VictoryArea with VictoryScatter
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
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryBar with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your VictoryArea. Any valid inline style properties
     * will be applied. Height, width, and padding should be specified via the height,
     * width, and padding props, as they are used to calculate the alignment of
     * components within chart.
     * @examples {data: {fill: "red"}, labels: {fontSize: 12}}
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
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.func)
    ])
  };

  static defaultProps = {
    dataComponent: <Area/>,
    labelComponent: <VictoryLabel/>,
    events: {},
    height: 300,
    padding: 50,
    scale: "linear",
    samples: 50,
    standalone: true,
    interpolation: "linear",
    width: 450,
    x: "x",
    y: "y"
  };

  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);

  constructor() {
    super();
    this.state = {};
    this.getEvents = Helpers.getEvents.bind(this);
    this.getEventState = Helpers.getEventState.bind(this);
  }

  getDataWithBaseline(props, domain) {
    const data = Data.getData(props);
    const minY = Math.min(...domain.y) > 0 ? Math.min(...domain.y) : 0;
    return data.map((datum) => {
      const y1 = datum.yOffset ? datum.yOffset + datum.y : datum.y;
      const y0 = datum.yOffset || minY;
      return assign({y0, y1}, datum);
    });
  }

  renderArea(props, calculatedProps) {
    const {scale, style, data} = calculatedProps;
    const {dataComponent, labelComponent, interpolation, events, label} = props;
    const dataEvents = this.getEvents(events.data, "data");
    const dataProps = defaults(
      {},
      this.getEventState(0, "data"),
      dataComponent.props,
      {
        scale,
        interpolation: Helpers.evaluateProp(interpolation, data),
        data,
        style: Helpers.evaluateStyle(style.data, data)
      }
    );
    const areaComponent = React.cloneElement(dataComponent, assign(
      {}, dataProps, {events: Helpers.getPartialEvents(dataEvents, 0, dataProps)}
    ));
    const text = Helpers.evaluateProp(label, dataProps.data);
    if (text !== null && text !== undefined) {
      const labelEvents = this.getEvents(events.labels, "labels");
      const lastData = last(data);
      const labelStyle = Helpers.evaluateStyle(style.labels, dataProps.data);
      const labelProps = defaults(
        {},
        this.getEventState(0, "labels"),
        labelComponent.props,
        {
          x: scale.x(lastData.x) + labelStyle.padding,
          y: scale.y(lastData.y1),
          y0: scale.y(lastData.y0),
          style: labelStyle,
          data: dataProps.data,
          textAnchor: labelStyle.textAnchor || "start",
          verticalAnchor: labelStyle.verticalAnchor || "middle",
          angle: labelStyle.angle,
          text
        }
      );
      const areaLabelComponent = React.cloneElement(labelComponent, assign(
        {}, labelProps, {events: Helpers.getPartialEvents(labelEvents, 0, labelProps)}
      ));
      return (
        <g>
          {areaComponent}
          {areaLabelComponent}
        </g>
      );
    }
    return areaComponent;
  }

  renderData(props, style) {
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    const data = this.getDataWithBaseline(props, domain);
    const calculatedProps = { style, data, scale };
    return this.renderArea(props, calculatedProps);
  }

  render() {
    if (this.props.animate) {
      const whitelist = [
        "data", "domain", "height", "padding", "style", "width"
      ];
      return (
        <VictoryTransition animate={this.props.animate} animationWhitelist={whitelist}>
          <VictoryArea {...this.props}/>
        </VictoryTransition>
      );
    }

    const style = Helpers.getStyles(
      this.props.style,
      defaultStyles,
      "auto",
      "100%"
    );
    const group = <g style={style.parent}>{this.renderData(this.props, style)}</g>;
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
