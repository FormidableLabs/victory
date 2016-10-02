import React, { PropTypes } from "react";
import { partialRight } from "lodash";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Candle, VictoryGroupContainer
} from "victory-core";
import CandlestickHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  candleColors: {
    positive: "#ffffff",
    negative: "#252525"
  }
};

const defaultData = [
  {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
  {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
  {x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10},
  {x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15},
  {x: new Date(2016, 6, 5), open: 25, close: 30, high: 35, low: 20},
  {x: new Date(2016, 6, 6), open: 30, close: 35, high: 40, low: 25},
  {x: new Date(2016, 6, 7), open: 35, close: 40, high: 45, low: 30},
  {x: new Date(2016, 6, 8), open: 40, close: 45, high: 50, low: 35}
];

class VictoryCandlestick extends React.Component {
  static displayName = "VictoryCandlestick";
  static role = "candlestick";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...commonProps,
    ...cartesianProps,
    /**
     * The size prop determines how to scale each data point
     */
    size: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The open prop specifies how to access the open value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'open', 'open.value.nested.1.thing', 'open[2].also.nested', null,
     * d => Math.sin(d)
     */
    open: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The close prop specifies how to access the close value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'close', 'close.value.nested.1.thing', 'close[2].also.nested', null,
     * d => Math.sin(d)
     */
    close: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The high prop specifies how to access the high value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'high', 'high.value.nested.1.thing', 'high[2].also.nested', null,
     * d => Math.sin(d)
     */
    high: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The low prop specifies how to access the low value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'low', 'low.value.nested.1.thing', 'low[2].also.nested', null, d => Math.sin(d)
     */
    low: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
    * Candle colors are significant in candlestick charts - one color signifies the stock
    * closed at a higher price than it opened, and the other signifies the reverse. The
    * candleColors prop takes an object with keys positive and negative, which each take
    * a string that should be a color. Positive is for data points where close is higher
    * than open, and defaults to white, and negative (close < open) defaults to black.
    * @examples candleColors={{positive: "purple", negative: "blue"}}
    */
    candleColors: PropTypes.shape({
      positive: PropTypes.string,
      negative: PropTypes.string
    })
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    data: defaultData,
    standalone: true,
    x: "x",
    open: "open",
    close: "close",
    high: "high",
    low: "low",
    dataComponent: <Candle/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryGroupContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = CandlestickHelpers.getDomain.bind(CandlestickHelpers);
  static getData = CandlestickHelpers.getData.bind(CandlestickHelpers);
  static getBaseProps = partialRight(
    CandlestickHelpers.getBaseProps.bind(CandlestickHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  renderData(props) {
    const { dataComponent, labelComponent, groupComponent} = props;
    const dataComponents = [];
    const labelComponents = [];

    for (let index = 0, len = this.dataKeys.length; index < len; index++) {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      dataComponents[index] = React.cloneElement(dataComponent, dataProps);

      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
        labelComponents[index] = React.cloneElement(labelComponent, labelProps);
      }
    }
    return labelComponents.length > 0 ?
      React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents) :
      dataComponents;
  }

  renderContainer(props, group) {
    const { containerComponent } = props;
    const parentProps = this.getComponentProps(containerComponent, "parent", "parent");
    return React.cloneElement(containerComponent, parentProps, group);
  }

  renderGroup(children, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      children
    );
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "candlestick");

    const { animate, standalone, style, theme } = props;
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryCandlestick` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "data", "domain", "height", "padding", "samples", "size",
        "style", "width", "x", "y"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }
    const styleObject = theme && theme.candlestick && theme.candlestick.style ?
      theme.candlestick.style : {};
    const baseStyle = Helpers.getStyles(style, styleObject, "auto", "100%");

    const group = this.renderGroup(this.renderData(props), baseStyle.parent);
    return standalone ? this.renderContainer(props, group) : group;
  }
}

export default addEvents(VictoryCandlestick);
