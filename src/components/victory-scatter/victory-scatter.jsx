import React, { PropTypes } from "react";
import pick from "lodash/pick";
import omit from "lodash/omit";
import defaults from "lodash/defaults";
import assign from "lodash/assign";
import Point from "./point";
import PointLabel from "./point-label";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import { PropTypes as CustomPropTypes, Helpers, VictoryAnimation } from "victory-core";
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
      before: (datum) => ({ opacity: "opacity" in datum ? datum.opacity : 1 }),
      after: () => ({ opacity: 0 })
    },
    onEnter: {
      duration: 600,
      before: () => ({ opacity: 0 }),
      after: (datum) => ({ opacity: "opacity" in datum ? datum.opacity : 1 })
    }
  }

  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the scatter plot will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {delay: 5, duration: 500, onEnd: () => alert("woo!")}
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
     * will be stored by unique index on the state object of VictoryScatter
     * i.e. `this.state.dataState[dataIndex] = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryScatter
     * if one exists. If VictoryScatter is set up to render g elements i.e. when it is
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
     * The labelComponent prop takes in an entire, HTML-complete label component which will be used
     * to create labels for each point in the scatter plot. The new element created from the passed
     * labelComponent will have property data provided by the point's datum; properties x, y, dy,
     * textAnchor, and verticalAnchor preserved or default values provided by the point; and styles
     * filled out with defaults from the scatter, and overrides from the datum. If labelComponent is
     * omitted, a new VictoryLabel will be created with props and styles from the point.
     */
    labelComponent: PropTypes.element,
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
     * The dataComponent prop takes an entire, HTML-complete data component which will be used to
     * create points for each datum in the scatter plot. The new element created from the passed
     * dataComponent will have the property datum set by the scatter for the point it renders;
     * properties x, y, size and symbol are calculated by the scatter for the datum; a key and index
     * property set corresponding to the location of the datum in the data provided to the scatter;
     * style calculated by the scatter based on the scatter's styles and the datum; and all the
     * remaining properties from the scatter's data at the index of the datum.
     * If a dataComponent is not provided, VictoryScatter's Point component will be used.
     */
    dataComponent: PropTypes.element,
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
     * The style prop specifies styles for your scatter plot. VictoryScatter relies on Radium,
     * so valid Radium style objects should work for this prop. Height, width, and
     * padding should be specified via the height, width, and padding props, as they
     * are used to calculate the alignment of components within chart.
     * @examples {parent: {margin: 50}, data: {fill: "red"}, labels: {padding: 20}}
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
    padding: 50,
    samples: 50,
    scale: "linear",
    size: 3,
    standalone: true,
    symbol: "circle",
    width: 450,
    x: "x",
    y: "y",
    dataComponent: <Point />
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);

  componentWillMount() {
    this.state = {
      dataState: {},
      labelsState: {}
    };
  }

  getDataStyles(data, style) {
    const stylesFromData = omit(data, [
      "x", "y", "z", "size", "symbol", "name", "label"
    ]);
    const baseDataStyle = defaults({}, stylesFromData, style);
    return Helpers.evaluateStyle(baseDataStyle, data);
  }

  getSharedProps(datum, index, calculatedProps) {
    const { style } = calculatedProps;
    const position = {
      x: calculatedProps.scale.x.call(null, datum.x),
      y: calculatedProps.scale.y.call(null, datum.y)
    };

    const baseSize = ScatterHelpers.getSize(datum, this.props, calculatedProps);

    const symbol = ScatterHelpers.getSymbol(datum, this.props);

    return assign({}, {index, datum, baseSize, symbol, style}, position);
  }

  addDataProps(sharedProps, getBoundEvents) {
    const {datum, style, index, baseSize} = sharedProps;

    const dataStyle = this.getDataStyles(datum, style.data);
    const size = Helpers.evaluateProp(baseSize, datum);
    const events = getBoundEvents(this.props.events.data, "data");

    return assign(
      {},
      sharedProps,
      {key: `point-${index}`, style: dataStyle, events, size},
      this.state.dataState[index]
    );
  }

  addLabelProps(sharedProps, dataProps, getBoundEvents) {
    const { datum, style, index } = sharedProps;
    const dataStyle = dataProps.style;
    const { size } = dataProps;

    const matchedStyle = pick(dataStyle, ["opacity", "fill"]);
    const padding = style.labels.padding || size * 0.25;
    const baseLabelStyle = defaults({}, style.labels, matchedStyle, {padding});
    const labelStyle = Helpers.evaluateStyle(baseLabelStyle, datum);

    const events = getBoundEvents(this.props.events.labels, "labels");

    return assign(
      {},
      sharedProps,
      {style: labelStyle, labelComponent: this.props.labelComponent, events},
      this.state.labelsState[index]
    );
  }

  renderPoint(datum, index, calculatedProps) {
    const getBoundEvents = Helpers.getEvents.bind(this);
    const sharedProps = this.getSharedProps(datum, index, calculatedProps);
    const dataProps = this.addDataProps(sharedProps, getBoundEvents);
    const pointComponent = React.cloneElement(this.props.dataComponent, dataProps);
    if (datum.label) {
      const labelProps = this.addLabelProps(sharedProps, dataProps, getBoundEvents);
      return (
        <g key={`point-group-${index}`}>
          {pointComponent}
          <PointLabel {...labelProps}/>
        </g>
      );
    }
    return pointComponent;
  }

  renderData(props, style) {
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
    const calculatedProps = {data, scale, style, z};
    return data.map((datum, index) => {
      return this.renderPoint(datum, index, calculatedProps);
    });
  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryScatter` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = pick(this.props, [
        "data", "domain", "height", "maxBubbleSize", "padding", "samples", "size",
        "style", "width", "x", "y"
      ]);

      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryScatter {...this.props} {...props} animate={null}/>}
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
