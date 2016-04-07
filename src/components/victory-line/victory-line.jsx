import sortBy from "lodash/sortBy";
import pick from "lodash/pick";
import defaults from "lodash/defaults";
import React, { PropTypes } from "react";
import LineSegment from "./line-segment";
import LineLabel from "./line-label";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import { PropTypes as CustomPropTypes, Helpers, VictoryAnimation } from "victory-core";

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

export default class VictoryLine extends React.Component {
  static role = "line";
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the line will not tween between changing data / style props.
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
     * The data prop specifies the data to be plotted.
     * Data should be in the form of an array of data points.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */

    data: PropTypes.array,
    /**
     * The dataComponent prop takes an entire, HTML-complete data component which will be used to
     * create line segments between each point in the plotted line. The new element created from
     * the passed dataComponent will have the property data set by the line for the segment it
     * renders; properties scale and style calculated by the VictoryLine component; a key and index
     * property set corresponding to the location of the segment in the data provided to the line;
     * and all the remaining properties from the VictoryLine data at the index of the segment.
     * If a dataComponent is not provided, VictoryLine's LineSegment component will be used.
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
     * will be stored by unique index on the state object of VictoryLine
     * i.e. `this.state.dataState[dataIndex] = {style: {fill: "red"}...}`, and will be
     * applied to by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryLine
     * if one exists. If VictoryLine is set up to render g elements i.e. when it is
     * rendered within chart, or when `standalone={false}` parent events will not be applied.
     *
     * @examples {data: {
     *  onClick: () => onClick: () => return {style: {stroke: "green"}}
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
     * The label prop specifies a label to display at the end of a line component.
     * This prop can be given as a value, or as an entire, HTML-complete label component.
     * If given as a value, a new VictoryLabel will be created with props and
     * styles from the line. When given as a component, a new element will be
     * cloned from the label component. The new element will have default
     * values provided by the line for properties x, y, textAnchor, and
     * verticalAnchor; and styles filled out with defaults from the line, and
     * overrides from the datum.
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
    events: {},
    height: 300,
    interpolation: "linear",
    padding: 50,
    samples: 50,
    scale: "linear",
    standalone: true,
    width: 450,
    x: "x",
    y: "y",
    dataComponent: <LineSegment />
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);

  componentWillMount() {
    this.state = {
      dataState: {},
      labelsState: {}
    };
  }

  getDataSegments(dataset) {
    const orderedData = sortBy(dataset, "x");
    const segments = [];
    let segmentStartIndex = 0;
    orderedData.forEach((datum, index) => {
      if (datum.y === null || typeof datum.y === "undefined") {
        segments.push(orderedData.slice(segmentStartIndex, index));
        segmentStartIndex = index + 1;
      }
    });
    segments.push(orderedData.slice(segmentStartIndex, orderedData.length));
    return segments.filter((segment) => {
      return Array.isArray(segment) && segment.length > 0;
    });
  }

  getLabelStyle(style) {
    // match labels styles to data style by default (fill, opacity, others?)
    const opacity = style.data.opacity;
    // match label color to data color if it is not given.
    // use fill instead of stroke for text
    const fill = style.data.stroke;
    const padding = style.labels.padding || 0;
    return defaults({}, style.labels, {opacity, fill, padding});
  }

  renderLine(calculatedProps) {
    const {dataSegments, scale, style} = calculatedProps;
    const {interpolation, dataComponent, events} = this.props;

    return dataSegments.map((segment, index) => {
      const lineEvents = Helpers.getEvents.bind(this)(events.data, "data");
      const key = `line-segment-${index}`;

      return React.cloneElement(dataComponent, {
        key,
        index,
        events: lineEvents,
        data: segment,
        interpolation,
        scale,
        style: style.data,
        ...this.state.dataState[index]
      });
    });
  }

  renderLabel(calculatedProps) {
    const {dataset, dataSegments, scale, style} = calculatedProps;
    if (!this.props.label) {
      return undefined;
    }
    const lastSegment = dataSegments[dataSegments.length - 1];
    const lastPoint = Array.isArray(lastSegment) ?
      lastSegment[lastSegment.length - 1] : lastSegment;
    const getBoundEvents = Helpers.getEvents.bind(this);
    return (
      <LineLabel
        key={`line-label`}
        events={getBoundEvents(this.props.events.labels, "labels")}
        data={dataset}
        position={{
          x: scale.x.call(this, lastPoint.x),
          y: scale.y.call(this, lastPoint.y)
        }}
        label={this.props.label}
        style={this.getLabelStyle(style)}
        {...this.state.labelsState[0]}
      />
    );
  }

  renderData(props, style) {
    const dataset = Data.getData(props);
    const dataSegments = this.getDataSegments(dataset);
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
      // TODO: extract into helper
      const whitelist = [
        "data", "domain", "height", "padding", "samples", "style", "width", "x", "y"
      ];
      const animateData = pick(this.props, whitelist);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryLine {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    }
    const style = Helpers.getStyles(
      this.props.style, defaultStyles, this.props.height, this.props.width);
    const group = <g style={style.parent}>{this.renderData(this.props, style)}</g>;
    return this.props.standalone ?
      <svg style={style.parent} {...this.props.events.parent}>{group}</svg> :
      group;
  }
}
