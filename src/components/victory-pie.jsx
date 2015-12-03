import d3 from "d3";
import _ from "lodash";
import React, { PropTypes } from "react";
import Radium from "radium";
import Util from "victory-util";
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
     * Objects in the data array must be of the form { x: <x-val>, y: <y-val> }, where <x-val>
     * is the slice label (string or number), and <y-val> is the corresponding number
     * used to calculate arc length as a proportion of the pie's circumference.
     * If the data prop is omitted, the pie will render sample data.
     */
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.number
    })),
    /**
     * The overall end angle of the pie in degrees. This prop is used in conjunction with
     * startAngle to create a pie that spans only a segment of a circle.
     */
    endAngle: Util.PropTypes.nonNegative,
    /**
     * The height props specifies the height of the chart container element in pixels
     */
    height: Util.PropTypes.nonNegative,
    /**
     * When creating a donut chart, this prop determines the number of pixels between
     * the center of the chart and the inner edge of a donut. When this prop is set to zero
     * a regular pie chart is rendered.
     */
    innerRadius: Util.PropTypes.nonNegative,
    /**
     * The padAngle prop determines the amount of separation between adjacent data slices
     * in number of degrees
     */
    padAngle: Util.PropTypes.nonNegative,
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
     * The sliceColors prop defines an array of colors to use for distinguishing data
     * segments in a pie chart. If the data array is longer than the sliceColors array,
     * colors will be reused.
     */
    sliceColors: PropTypes.arrayOf(PropTypes.string),
    /**
     * The sort prop determines how to order data. This prop can be given as "ascending"
     * or "descending", or as a custom comparator function
     */
    sort: PropTypes.oneOfType([
      PropTypes.oneOf(["ascending", "descending"]),
      PropTypes.func
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
    startAngle: Util.PropTypes.nonNegative,
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
    width: Util.PropTypes.nonNegative
  }

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
    sliceColors: [
      "#75C776",
      "#39B6C5",
      "#78CCC4",
      "#62C3A4",
      "#64A8D1",
      "#8C95C8",
      "#3BAF74"
    ],
    sort: null,
    startAngle: 0,
    standalone: true,
    width: 400
  }

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  getCalculatedValues(props) {
    this.style = this.getStyles(props);
    this.padding = this.getPadding(props);
    this.radius = this.getRadius(props);
    this.sortOrder = this.getSortOrder(props);
    this.colors = d3.scale.ordinal().range(props.sliceColors);
    this.slice = d3.svg.arc()
      .outerRadius(this.radius)
      .innerRadius(this.props.innerRadius);
    this.labelPosition = this.getLabelPosition(props);
    this.pie = d3.layout.pie()
      .sort(this.sortOrder)
      .startAngle(this.degreesToRadians(props.startAngle))
      .endAngle(this.degreesToRadians(props.endAngle))
      .padAngle(this.degreesToRadians(props.padAngle))
      .value((data) => { return data.y; });
  }

  getStyles(props) {
    const style = props.style || defaultStyles;
    const {data, labels, parent} = style;
    return {
      parent: _.merge({height: props.height, width: props.width}, parent),
      data: _.merge({}, defaultStyles.data, data),
      labels: _.merge({}, defaultStyles.labels, labels)
    };
  }

  getPadding(props) {
    const padding = _.isNumber(props.padding) ? props.padding : 0;
    const paddingObj = _.isObject(props.padding) ? props.padding : {};
    return {
      top: paddingObj.top || padding,
      bottom: paddingObj.bottom || padding,
      left: paddingObj.left || padding,
      right: paddingObj.right || padding
    };
  }

  getRadius(props) {
    return _.min([
      props.width - this.padding.left - this.padding.right,
      props.height - this.padding.top - this.padding.bottom
    ]) / 2;
  }

  getLabelPosition(props) {
    // TODO: better label positioning
    const innerRadius = props.innerRadius ?
      props.innerRadius + this.style.labels.padding :
      this.style.labels.padding;
    return d3.svg.arc()
      .outerRadius(this.radius)
      .innerRadius(innerRadius);
  }

  getSortOrder(props) {
    // TODO: animation looks broken when a sort order is specified
    let comparator = props.sort;
    if (!_.isNull(comparator) && _.isString(comparator)) {
      if (comparator === "ascending" || comparator === "descending") {
        comparator = (a, b) => { return d3[props.sort](a.y, b.y); };
      } else {
        Util.Log.warn("Victory Pie: Invalid sort string. Try 'ascending' or 'descending'.");
        comparator = null;
      }
    }
    return comparator;
  }

  renderData(slices) {
    const indexArray = _.range(0, this.props.data.length);
    const sliceData = this.pie(this.props.data, indexArray);
    const sliceComponents = _.map(slices, (slice, index) => {
      const fill = this.colors(slice.x);
      const style = _.merge({}, this.style.data, {fill});
      const data = sliceData[index];
      return (
        <g key={index}>
          <path
            d={this.slice(data)}
            style={style}
          />
          <text
            dy=".35em"
            style={this.style.labels}
            transform={`translate( ${this.labelPosition.centroid(data)})`}
          >
            {slice.x}
          </text>
        </g>
      );
    });

    return (<g>{sliceComponents}</g>);
  }

  render() {
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = _.pick(this.props, [
        "data", "endAngle", "height", "innerRadius", "padAngle", "padding",
        "sliceColors", "startAngle", "style", "width"
      ]);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryPie {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    } else {
      this.getCalculatedValues(this.props);
    }
    const style = this.style.parent;
    const xOffset = this.radius + this.padding.left;
    const yOffset = this.radius + this.padding.top;
    const group = (
      <g style={style} transform={`translate(${xOffset}, ${yOffset})`}>
        {this.renderData(this.props.data)}
      </g>
    );

    return this.props.standalone ? <svg style={style}>{group}</svg> : group;
  }
}
