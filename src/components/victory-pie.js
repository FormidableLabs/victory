import React, { PropTypes } from "react";
import d3Shape from "d3-shape";
import { assign, defaults, isFunction, omit } from "lodash";
import {
  PropTypes as CustomPropTypes,
  Helpers,
  Style,
  VictoryLabel,
  VictoryTransition
} from "victory-core";
import Slice from "./slice";

const defaultStyles = {
  data: {
    padding: 5,
    stroke: "white",
    strokeWidth: 1
  },
  labels: {
    padding: 10,
    fill: "black",
    strokeWidth: 0,
    stroke: "transparent",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: 10,
    textAnchor: "middle"
  }
};

export default class VictoryPie extends React.Component {
  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: () => ({ y: 0, label: " " })
    },
    onEnter: {
      duration: 500,
      before: () => ({ y: 0, label: " " }),
      after: (datum) => ({ y: datum.y, label: datum.label })
    }
  };

  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. If this prop is
     * not given, the pie chart will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {duration: 500, onEnd: () => alert("done!")}
     */
    animate: PropTypes.object,
    /**
     * The colorScale prop is an optional prop that defines the color scale the pie
     * will be created on. This prop should be given as an array of CSS colors, or as a string
     * corresponding to one of the built in color scales. VictoryPie will automatically assign
     * values from this color scale to the pie slices unless colors are explicitly provided in the
     * data object
     */
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    /**
     * Objects in the data array must be of the form { x: <x-val>, y: <y-val> }, where <x-val>
     * is the slice label (string or number), and <y-val> is the corresponding number
     * used to calculate arc length as a proportion of the pie's circumference.
     * If the data prop is omitted, the pie will render sample data.
     */

    /**
     * The data prop specifies the data to be plotted,
     * where data X-value is the slice label (string or number),
     * and Y-value is the corresponding number value represented by the slice
     * Data should be in the form of an array of data points.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */
    data: PropTypes.array,
    /**
     * The dataComponent prop takes an entire, HTML-complete data component which will be used to
     * create slices for each datum in the pie chart. The new element created from the passed
     * dataComponent will have the property datum set by the pie chart for the point it renders;
     * properties style and pathFunction calculated by VictoryPie; an index property set
     * corresponding to the location of the datum in the data provided to the pie; events bound to
     * the VictoryPie; and the d3 compatible slice object.
     * If a dataComponent is not provided, VictoryPie's Slice component will be used.
     */
    dataComponent: PropTypes.element,
    /**
     * The overall end angle of the pie in degrees. This prop is used in conjunction with
     * startAngle to create a pie that spans only a segment of a circle.
     */
    endAngle: PropTypes.number,
    /**
     * The events prop attaches arbitrary event handlers to data and label elements
     * Event handlers are called with their corresponding events, corresponding component props,
     * and their index in the data array, and event name. The return value of event handlers
     * will be stored by unique index on the state object of VictoryPie
     * i.e. `this.state.dataState[dataIndex] = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryPie
     * if one exists. If VictoryPie is set up to render g elements i.e. when it is
     * rendered within chart, or when `standalone={false}` parent events will not be applied.
     *
     * @examples {data: {
     *  onClick: () => onClick: () => return {style: {fill: "green"}}
     *}}
     */
    events: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    /**
     * The height props specifies the height of the chart container element in pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * When creating a donut chart, this prop determines the number of pixels between
     * the center of the chart and the inner edge of a donut. When this prop is set to zero
     * a regular pie chart is rendered.
     */
    innerRadius: CustomPropTypes.nonNegative,
    /**
     * The labelComponent prop takes in an entire label component which will be used
     * to create labels for each slice in the pie chart. The new element created from
     * the passed labelComponent will be supplied with the following properties:
     * x, y, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
     * any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If labelComponent is omitted,
     * a new VictoryLabel will be created with props described above.
     */
    labelComponent: PropTypes.element,
    /**
     * The labels prop defines labels that will appear in each slice on your pie chart.
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
     * The padAngle prop determines the amount of separation between adjacent data slices
     * in number of degrees
     */
    padAngle: CustomPropTypes.nonNegative,
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
     * The standalone prop determines whether VictoryPie should render as a standalone
     * svg, or in a g tag to be included in an svg
     */
    standalone: PropTypes.bool,
    /**
     * The overall start angle of the pie in degrees. This prop is used in conjunction with
     * endAngle to create a pie that spans only a segment of a circle.
     */
    startAngle: PropTypes.number,
    /**
     * The style prop specifies styles for your pie. VictoryPie relies on Radium,
     * so valid Radium style objects should work for this prop. Height, width, and
     * padding should be specified via the height, width, and padding props.
     * @examples {data: {stroke: "black"}, label: {fontSize: 10}}
     */
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    /**
     * The width props specifies the width of the chart container element in pixels
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
    data: [
      { x: "A", y: 1 },
      { x: "B", y: 2 },
      { x: "C", y: 3 },
      { x: "D", y: 1 },
      { x: "E", y: 2 }
    ],
    endAngle: 360,
    events: {},
    height: 400,
    innerRadius: 0,
    padAngle: 0,
    padding: 30,
    colorScale: [
      "#75C776",
      "#39B6C5",
      "#78CCC4",
      "#62C3A4",
      "#64A8D1",
      "#8C95C8",
      "#3BAF74"
    ],
    startAngle: 0,
    standalone: true,
    width: 400,
    x: "x",
    y: "y",
    dataComponent: <Slice/>,
    labelComponent: <VictoryLabel/>
  };

  constructor() {
    super();
    this.state = {};
    this.getEvents = Helpers.getEvents.bind(this);
    this.getEventState = Helpers.getEventState.bind(this);
  }

  getColor(style, colors, index) {
    if (style && style.data && style.data.fill) {
      return style.data.fill;
    }
    return colors[index % colors.length];
  }

  getRadius(props, padding) {
    return Math.min(
      props.width - padding.left - padding.right,
      props.height - padding.top - padding.bottom
    ) / 2;
  }

  getLabelPosition(props, style, radius) {
    // TODO: better label positioning
    const innerRadius = props.innerRadius ?
    props.innerRadius + style.labels.padding :
      style.labels.padding;
    return d3Shape.arc()
      .outerRadius(radius)
      .innerRadius(innerRadius);
  }

  getLabelText(props, datum, index) {
    if (datum.label) {
      return datum.label;
    } else if (Array.isArray(props.labels)) {
      return props.labels[index];
    }
    return isFunction(props.labels) ? props.labels(datum) : undefined;
  }

  getSliceFunction(props) {
    const degreesToRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    return d3Shape.pie()
      .sort(null)
      .startAngle(degreesToRadians(props.startAngle))
      .endAngle(degreesToRadians(props.endAngle))
      .padAngle(degreesToRadians(props.padAngle))
      .value((datum) => { return datum.y; });
  }

  renderData(props, calculatedProps) {
    const {style, colors, pathFunction, labelPosition, data} = calculatedProps;
    const dataEvents = this.getEvents(props.events.data, "data");
    const labelEvents = this.getEvents(props.events.labels, "labels");
    const layoutFunction = this.getSliceFunction(props);
    const slices = layoutFunction(data);

    return (slices.map((slice, index) => {
      const fill = this.getColor(style, colors, index);
      const datum = slice.data;
      const dataStyles = omit(slice.data, ["x", "y", "label"]);
      const sliceStyle = defaults({}, {fill}, style.data, dataStyles);
      const dataProps = defaults(
        {},
        this.getEventState(index, "data"),
        props.dataComponent.props,
        {
          key: `slice-${index}`,
          index,
          slice,
          pathFunction,
          style: Helpers.evaluateStyle(sliceStyle, datum),
          datum
        }
      );
      const sliceComponent = React.cloneElement(props.dataComponent, assign(
        {}, dataProps, {events: Helpers.getPartialEvents(dataEvents, index, dataProps)}
      ));
      const text = this.getLabelText(props, datum, index);
      if (text !== null && text !== undefined) {
        const position = labelPosition.centroid(slice);
        const labelStyle = Helpers.evaluateStyle(
          assign({padding: 0}, style.labels),
          dataProps.datum
        );
        const labelProps = defaults(
          {},
          this.getEventState(index, "labels"),
          props.labelComponent.props,
          {
            key: `slice-label-${index}`,
            style: labelStyle,
            x: position[0],
            y: position[1],
            slice,
            text,
            index,
            datum: dataProps.datum,
            textAnchor: labelStyle.textAnchor || "start",
            verticalAnchor: labelStyle.verticalAnchor || "middle",
            angle: labelStyle.angle
          }
        );
        const sliceLabel = React.cloneElement(props.labelComponent, assign({
          events: Helpers.getPartialEvents(labelEvents, index, labelProps)
        }, labelProps));
        return (
          <g key={`slice-group-${index}`}>
            {sliceComponent}
            {sliceLabel}
          </g>
        );
      }
      return sliceComponent;
    }));
  }

  getCalculatedProps(props) {
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const colors = Array.isArray(props.colorScale) ?
      props.colorScale : Style.getColorScale(props.colorScale);
    const padding = Helpers.getPadding(props);
    const radius = this.getRadius(props, padding);
    const data = Helpers.getData(props);
    const labelPosition = this.getLabelPosition(props, style, radius);
    const pathFunction = d3Shape.arc()
      .outerRadius(radius)
      .innerRadius(props.innerRadius);
    return {style, colors, padding, radius, data, labelPosition, pathFunction};

  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryBar` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      const whitelist = [
        "data", "endAngle", "height", "innerRadius", "padAngle", "padding",
        "colorScale", "startAngle", "style", "width"
      ];
      return (
        <VictoryTransition animate={this.props.animate} animationWhitelist={whitelist}>
          <VictoryPie {...this.props}/>
        </VictoryTransition>
      );
    }

    const calculatedProps = this.getCalculatedProps(this.props);
    const { style, padding, radius } = calculatedProps;
    const xOffset = radius + padding.left;
    const yOffset = radius + padding.top;
    const group = (
      <g style={style.parent} transform={`translate(${xOffset}, ${yOffset})`}>
        {this.renderData(this.props, calculatedProps)}
      </g>
    );

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
