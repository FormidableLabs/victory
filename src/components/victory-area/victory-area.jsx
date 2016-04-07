import pick from "lodash/pick";
import last from "lodash/last";
import assign from "lodash/assign";
import React, { PropTypes } from "react";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";
import { PropTypes as CustomPropTypes, Helpers, VictoryAnimation } from "victory-core";
import Area from "./area";
import AreaLabel from "./area-label";

const defaultStyles = {
  data: {
    fill: "#756f6a",
    opacity: 1
  },
  labels: {
    fontSize: 12,
    padding: 4,
    fill: "black"
  }
};

export default class VictoryArea extends React.Component {
  static role = "area";
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
     * of data points, or an array of arrays of data points for multiple datasets.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */
    data: PropTypes.array,
    /**
     * The dataComponent prop takes an entire, HTML-complete data component which will be used to
     * create an area. The new element created from the passed dataComponent will be provided
     * with the following properties calculated by VictoryArea: a scale object, an array of
     * modified data objects (including x, y, and calculated y0), interpolation, style, and events
     * If a dataComponent is not provided, VictoryArea will use its default Area component.
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
     * will be stored by unique index on the state object of VictoryArea
     * i.e. `this.state.dataState[dataIndex] = {style: {fill: "red"}...}`, and will be
     * applied by index to the appropriate child component. Event props on the
     * parent namespace are just spread directly on to the top level svg of VictoryArea
     * if one exists. If VictoryArea is set up to render g elements i.e. when it is
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
     * The label prop defines labels that will appear at the edge of each area. This prop
     * should be given as a string
     */
    label: PropTypes.string,
    /**
    * The labelComponent prop takes in an entire, HTML-complete label
    * component which will be used to create labels for each area in the
    * chart. The new element created from the passed labelComponent will have
    * children preserved, or provided via the labels array, textAnchor, and verticalAnchor
    * preserved or default values provided by defaults; and styles filled out with defaults
    * provided by the style prop, and dataAttributes prop. If labelComponent is omitted,
    * but a labels array is specified, a new VictoryLabel will be created.
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
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.func)
    ])
  };

  static defaultProps = {
    dataComponent: <Area/>,
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

  componentWillMount() {
    this.state = {
      dataState: {},
      labelsState: {}
    };
  }

  getBaseline(calculatedProps) {
    const {data, domain} = calculatedProps;
    const minY = Math.min(...domain.y) > 0 ? Math.min(...domain.y) : 0;
    return data.map((datum) => {
      const y0 = datum.yOffset || minY;
      return assign({y0}, datum);
    });
  }

  renderArea(props, calculatedProps) {
    const {scale, style} = calculatedProps;
    const {interpolation, events, label, labelComponent, dataComponent} = props;
    const getBoundEvents = Helpers.getEvents.bind(this);
    const dataEvents = getBoundEvents(events.data, "data");
    const data = this.getBaseline(calculatedProps);
    const areaProps = assign(
      {scale, interpolation, data, events: dataEvents, style: style.data},
      this.state.dataState[0]
    );
    const areaComponent = React.cloneElement(dataComponent, areaProps);
    if (label) {
      const lastData = last(data);
      const position = {
        x: scale.x.call(this, lastData.x),
        y: scale.y.call(this, lastData.y + lastData.y0)
      };
      return (
        <g>
          {areaComponent}
          <AreaLabel
            style={style.labels}
            data={data}
            events={getBoundEvents(events.labels, "labels")}
            position={position}
            labelText={label}
            labelComponent={labelComponent}
            {...this.state.labelsState[0]}
          />
        </g>
      );
    }
    return areaComponent;
  }

  renderData(props, style) {
    const data = Data.getData(props);
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const padding = Helpers.getPadding(props);
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    const calculatedProps = {
      style, data, domain, scale, padding
    };
    return this.renderArea(props, calculatedProps);
  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryBar` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = pick(this.props, [
        "data", "domain", "height", "padding", "style", "width"
      ]);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryArea {...this.props} {...props} animate={null}/>}
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
