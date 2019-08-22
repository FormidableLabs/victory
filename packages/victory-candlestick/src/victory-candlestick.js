import PropTypes from "prop-types";
import React from "react";
import {
  PropTypes as CustomPropTypes,
  Helpers,
  VictoryLabel,
  addEvents,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  CommonProps
} from "victory-core";
import { isNil, flatten } from "lodash";
import Candle from "./candle";
import { getDomain, getData, getBaseProps } from "./helper-methods";

/*eslint-disable no-magic-numbers */
const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  candleColors: {
    positive: "#ffffff",
    negative: "#252525"
  }
};

const options = {
  components: [
    { name: "lowLabels" },
    { name: "highLabels" },
    { name: "openLabels" },
    { name: "closeLabels" },
    { name: "labels" },
    { name: "data" },
    { name: "parent", index: "parent" }
  ]
};

const defaultData = [
  { x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0 },
  { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
  { x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10 },
  { x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15 },
  { x: new Date(2016, 6, 5), open: 25, close: 30, high: 35, low: 20 },
  { x: new Date(2016, 6, 6), open: 30, close: 35, high: 40, low: 25 },
  { x: new Date(2016, 6, 7), open: 35, close: 40, high: 45, low: 30 },
  { x: new Date(2016, 6, 8), open: 40, close: 45, high: 50, low: 35 }
];
/*eslint-enable no-magic-numbers */
const datumHasXandY = (datum) => {
  return !isNil(datum._x) && !isNil(datum._y);
};

class VictoryCandlestick extends React.Component {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "samples",
    "size",
    "style",
    "width"
  ];

  static displayName = "VictoryCandlestick";
  static role = "candlestick";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    candleColors: PropTypes.shape({ positive: PropTypes.string, negative: PropTypes.string }),
    candleRatio: PropTypes.number,
    candleWidth: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    close: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    closeLabelComponent: PropTypes.element,
    closeLabels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    events: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.oneOf([
          "data",
          "labels",
          "open",
          "openLabels",
          "close",
          "closeLabels",
          "low",
          "lowLabels",
          "high",
          "highLabels"
        ]),
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
          PropTypes.string
        ]),
        eventHandlers: PropTypes.object
      })
    ),
    high: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    highLabelComponent: PropTypes.element,
    highLabels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    labelOrientation: PropTypes.oneOfType([
      PropTypes.oneOf(["top", "bottom", "left", "right"]),
      PropTypes.shape({
        open: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        close: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        low: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        high: PropTypes.oneOf(["top", "bottom", "left", "right"])
      })
    ]),
    low: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    lowLabelComponent: PropTypes.element,
    lowLabels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    open: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    openLabelComponent: PropTypes.element,
    openLabels: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.bool]),
    style: PropTypes.shape({
      data: PropTypes.object,
      labels: PropTypes.object,
      close: PropTypes.object,
      closeLabels: PropTypes.object,
      open: PropTypes.object,
      openLabels: PropTypes.object,
      high: PropTypes.object,
      highLabels: PropTypes.object,
      low: PropTypes.object,
      lowLabels: PropTypes.object
    }),
    wickStrokeWidth: PropTypes.number
  };

  static defaultProps = {
    defaultCandleWidth: 8,
    containerComponent: <VictoryContainer />,
    data: defaultData,
    dataComponent: <Candle />,
    groupComponent: <g role="presentation" />,
    labelComponent: <VictoryLabel />,
    highLabelComponent: <VictoryLabel />,
    lowLabelComponent: <VictoryLabel />,
    openLabelComponent: <VictoryLabel />,
    closeLabelComponent: <VictoryLabel />,
    samples: 50,
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static getDomain = getDomain;
  static getData = getData;
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static expectedComponents = [
    "openLabelComponent",
    "closeLabelComponent",
    "highLabelComponent",
    "lowLabelComponent",
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent"
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  shouldRenderDatum(datum) {
    return (
      !isNil(datum._x) &&
      !isNil(datum._high) &&
      !isNil(datum._low) &&
      !isNil(datum._close) &&
      !isNil(datum._open)
    );
  }

  renderCandleData(props, shouldRenderDatum = datumHasXandY) {
    const { dataComponent, labelComponent, groupComponent } = props;
    const types = ["close", "open", "low", "high"];

    const dataComponents = this.dataKeys.reduce((validDataComponents, _dataKey, index) => {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      if (shouldRenderDatum(dataProps.datum)) {
        validDataComponents.push(React.cloneElement(dataComponent, dataProps));
      }
      return validDataComponents;
    }, []);

    const labelComponents = flatten(
      types.map((type) => {
        const components = this.dataKeys.map((key, index) => {
          const name = `${type}Labels`;
          const baseComponent = props[`${type}LabelComponent`];
          const labelProps = this.getComponentProps(baseComponent, name, index);
          if (labelProps.text !== undefined && labelProps.text !== null) {
            return React.cloneElement(baseComponent, labelProps);
          }
          return undefined;
        });
        return components.filter(Boolean);
      })
    );

    const labelsComponents = this.dataKeys
      .map((_dataKey, index) => {
        const labelProps = this.getComponentProps(labelComponent, "labels", index);
        if (labelProps.text !== undefined && labelProps.text !== null) {
          return React.cloneElement(labelComponent, labelProps);
        }
        return undefined;
      })
      .filter(Boolean);

    const children = [...dataComponents, ...labelComponents, ...labelsComponents];
    return this.renderContainer(groupComponent, children);
  }

  render() {
    const { animationWhitelist, role } = VictoryCandlestick;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderCandleData(props, this.shouldRenderDatum);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryCandlestick, options);
