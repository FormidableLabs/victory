import React, { PropTypes } from "react";
import Radium from "radium";
import d3Shape from "d3-shape";
import isArray from "lodash/lang/isArray";
import merge from "lodash/object/merge";
import assign from "lodash/object/assign";
import pick from "lodash/object/pick";
import { PropTypes as CustomPropTypes, Helpers, Style } from "victory-util";
import Slice from "./slice";
import SliceLabel from "./slice-label";
import {VictoryAnimation} from "victory-animation";

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

const degreesToRadians = function (degrees) {
  return degrees * (Math.PI / 180);
};

const getRadius = function (props, padding) {
  return Math.min(
    props.width - padding.left - padding.right,
    props.height - padding.top - padding.bottom
  ) / 2;
};

const getLabelPosition = function (props, style, radius) {
  // TODO: better label positioning
  const innerRadius = props.innerRadius ?
  props.innerRadius + style.labels.padding :
    style.labels.padding;
  return d3Shape.arc()
    .outerRadius(radius)
    .innerRadius(innerRadius);
};

@Radium
export default class VictoryPie extends React.Component {
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. If this prop is
     * not given, the pie chart will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {velocity: 0.02, onEnd: () => alert("done!")}
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
     * The overall end angle of the pie in degrees. This prop is used in conjunction with
     * startAngle to create a pie that spans only a segment of a circle.
     */
    endAngle: PropTypes.number,
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
     * This prop specifies the labels that will be applied to your data. This prop can be
     * passed in as an array of values, in the same order as your data, or as a function
     * to be applied to each data point. If this prop is not specified, the x value
     * of each data point will be used as a label.
     */
    labelComponent: PropTypes.element,
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
    y: "y"
  };

  renderSlice(slice, index, calculatedProps) {
    const {style, colorScale, makeSlicePath, labelPosition} = calculatedProps;
    const fill = colorScale[index % colorScale.length];
    const sliceStyle = merge({}, style.data, {fill});
    return (
      <g key={index}>
        <Slice
          slice={slice}
          pathFunction={makeSlicePath}
          style={sliceStyle}
        />
        <SliceLabel
          labelComponent={this.props.labelComponent}
          style={style.labels}
          positionFunction={labelPosition.centroid}
          slice={slice}
        />
      </g>
    );
  }

  renderData(props, calculatedProps) {
    const {style, radius} = calculatedProps;
    const data = Helpers.getData(props);
    const labelPosition = getLabelPosition(props, style, radius);
    const colorScale = isArray(props.colorScale) ?
      props.colorScale : Style.getColorScale(props.colorScale);
    const makeSlicePath = d3Shape.arc()
      .outerRadius(radius)
      .innerRadius(this.props.innerRadius);

    calculatedProps = assign(calculatedProps,
      {data, colorScale, makeSlicePath, labelPosition}
    );

    const pie = d3Shape.pie()
      .sort(null)
      .startAngle(degreesToRadians(props.startAngle))
      .endAngle(degreesToRadians(props.endAngle))
      .padAngle(degreesToRadians(props.padAngle))
      .value((datum) => { return datum.y; });
    const slices = pie(data);

    return (<g>
      {slices.map((slice, index) => {
        return this.renderSlice(slice, index, calculatedProps);
      })}
    </g>);
  }

  render() {
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = pick(this.props, [
        "data", "endAngle", "height", "innerRadius", "padAngle", "padding",
        "colorScale", "startAngle", "style", "width"
      ]);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryPie {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    }

    const style = Helpers.getStyles(this.props, defaultStyles);
    const padding = Helpers.getPadding(this.props);
    const radius = getRadius(this.props, padding);
    const parentStyle = style.parent;
    const xOffset = radius + padding.left;
    const yOffset = radius + padding.top;

    const group = (
      <g style={parentStyle} transform={`translate(${xOffset}, ${yOffset})`}>
        {this.renderData(this.props, {style, padding, radius})}
      </g>
    );

    return this.props.standalone ? <svg style={parentStyle}>{group}</svg> : group;
  }
}
