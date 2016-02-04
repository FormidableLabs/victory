import flatten from "lodash/array/flatten";
import last from "lodash/array/last";
import sortBy from "lodash/collection/sortBy";
import isEmpty from "lodash/lang/isEmpty";
import isNull from "lodash/lang/isNull";
import isUndefined from "lodash/lang/isUndefined";
import merge from "lodash/object/merge";
import pick from "lodash/object/pick";
import React, { PropTypes } from "react";
import Radium from "radium";
import LineSegment from "./line-segment";
import LineLabel from "./line-label";
import { PropTypes as CustomPropTypes, Chart, Data, Domain, Scale } from "victory-util";
import { VictoryAnimation } from "victory-animation";

const defaultStyles = {
  data: {
    strokeWidth: 2,
    fill: "none",
    stroke: "#756f6a",
    opacity: 1
  },
  labels: {
    padding: 5,
    fontFamily: "Helvetica",
    fontSize: 10,
    strokeWidth: 0,
    stroke: "transparent",
    textAnchor: "start"
  }
};

@Radium
export default class VictoryLine extends React.Component {
  static role = "line";
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the line will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {velocity: 0.02, onEnd: () => alert("done!")}
     */
    animate: PropTypes.object,
    /**
     * The data prop specifies the data to be plotted.
     * Data should be in the form of an array of data points.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */
    data: PropTypes.array,
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
     * The height props specifies the height of the chart container element in pixels
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
      "monotone",
      "natural",
      "radial",
      "step",
      "stepAfter",
      "stepBefore"
    ]),
    /**
     * The label prop specifies a label to display at the end of a line component,
     * this prop can be given as a value, or as an entire label component
     */
    label: PropTypes.any,
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
     * compose VictoryLine with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your chart. VictoryLine relies on Radium,
     * so valid Radium style objects should work for this prop, however height, width, and margin
     * are used to calculate range, and need to be expressed as a number of pixels
     * @examples {data: {stroke: "red"}, labels: {fontSize: 14}}
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
    height: 300,
    interpolation: "linear",
    padding: 50,
    samples: 50,
    scale: "linear",
    standalone: true,
    width: 450,
    x: "x",
    y: "y"
  };

  static getDomain = Domain.getDomain.bind(Domain);

  getDataSegments(dataset) {
    const orderedData = sortBy(dataset, "x");
    const segments = [];
    let segmentStartIndex = 0;
    orderedData.forEach((datum, index) => {
      if (isNull(datum.y) || isUndefined(datum.y)) {
        segments.push(orderedData.slice(segmentStartIndex, index));
        segmentStartIndex = index + 1;
      }
    });
    segments.push(orderedData.slice(segmentStartIndex, orderedData.length));
    return segments.filter((segment) => {
      return !isEmpty(segment);
    });
  }

  getLabelStyle(style) {
    // match labels styles to data style by default (fill, opacity, others?)
    const opacity = style.data.opacity;
    // match label color to data color if it is not given.
    // use fill instead of stroke for text
    const fill = style.data.stroke;
    const padding = style.labels.padding || 0;
    return merge({}, {opacity, fill, padding}, style.labels);
  }

  renderLine(calculatedProps) {
    const {dataSegments, scale, style} = calculatedProps;
    return dataSegments.map((segment, index) => {
      return (
        <LineSegment
          key={`line-segment-${index}`}
          data={segment}
          interpolation={this.props.interpolation}
          scale={scale}
          style={style.data}
        />
      );
    });
  }

  renderLabel(calculatedProps) {
    const {dataset, dataSegments, scale, style} = calculatedProps;
    if (!this.props.label) {
      return undefined;
    }
    const position = {
      x: scale.x.call(this, last(flatten(dataSegments)).x),
      y: scale.y.call(this, last(flatten(dataSegments)).y)
    };
    return (
      <LineLabel
        key={`line-label`}
        data={dataset}
        position={position}
        label={this.props.label}
        style={this.getLabelStyle(style)}
      />
    );
  }

  renderData(props, style) {
    const dataset = Data.getData(props);
    const dataSegments = this.getDataSegments(dataset);
    const range = {
      x: Chart.getRange(props, "x"),
      y: Chart.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomain(props, "x"),
      y: Domain.getDomain(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    const calculatedProps = {dataset, dataSegments, scale, style};
    return (
      <g style={style.parent}>
        {this.renderLine(calculatedProps)}
        {this.renderLabel(calculatedProps)}
      </g>
    );
  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryLine` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = pick(this.props, [
        "data", "domain", "height", "padding", "samples", "style", "width", "x", "y"
      ]);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryLine {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    }
    const style = Chart.getStyles(this.props, defaultStyles);
    const group = <g style={style.parent}>{this.renderData(this.props, style)}</g>;
    return this.props.standalone ? <svg style={style.parent}>{group}</svg> : group;
  }
}
