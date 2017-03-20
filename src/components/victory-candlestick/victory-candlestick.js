import React, { PropTypes } from "react";
import { partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Candle
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

const animationWhitelist = [
  "data", "domain", "height", "padding", "samples", "size", "style", "width"
];

class VictoryCandlestick extends React.Component {
  static displayName = "VictoryCandlestick";
  static role = "candlestick";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    animate: PropTypes.object,
    candleColors: PropTypes.shape({ positive: PropTypes.string, negative: PropTypes.string }),
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string), y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    close: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    containerComponent: PropTypes.element,
    data: PropTypes.array,
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ]),
        y: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ])
      }),
      PropTypes.number
    ]),
    dataComponent: PropTypes.element,
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    groupComponent: PropTypes.element,
    height: CustomPropTypes.nonNegative,
    high: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    labelComponent: PropTypes.element,
    low: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    name: PropTypes.string,
    open: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number, bottom: PropTypes.number,
        left: PropTypes.number, right: PropTypes.number
      })
    ]),
    samples: CustomPropTypes.nonNegative,
    scale: PropTypes.oneOfType([
      CustomPropTypes.scale,
      PropTypes.shape({ x: CustomPropTypes.scale, y: CustomPropTypes.scale })
    ]),
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func
    }),
    sortKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    size: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      parent: PropTypes.object, data: PropTypes.object, labels: PropTypes.object
    }),
    theme: PropTypes.object,
    width: CustomPropTypes.nonNegative,
    x: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    data: defaultData,
    standalone: true,
    dataComponent: <Candle/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g role="presentation"/>,
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

    const dataComponents = this.dataKeys.map((_dataKey, index) => {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      return React.cloneElement(dataComponent, dataProps);
    });

    const labelComponents = this.dataKeys.map((_dataKey, index) => {
      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      if (labelProps.text !== undefined && labelProps.text !== null) {
        return React.cloneElement(labelComponent, labelProps);
      }
    }).filter(Boolean);

    const children = [...dataComponents, ...labelComponents];
    return this.renderContainer(groupComponent, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  renderContainer(component, children) {
    const isContainer = component.type && component.type.role === "container";
    const parentProps = isContainer ? this.getComponentProps(component, "parent", "parent") : {};
    return React.cloneElement(component, parentProps, children);
  }

  render() {
    const {role} = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    if (this.shouldAnimate()) {
      return (
        <VictoryTransition animate={props.animate} animationWhitelist={animationWhitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }
    const children = this.renderData(props);
    return this.renderContainer(props.containerComponent, children);
  }
}

export default addEvents(VictoryCandlestick);
