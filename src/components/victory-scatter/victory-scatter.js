import React, { PropTypes } from "react";
import { partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Point, Data, Domain
} from "victory-core";
import ScatterHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  size: 3,
  symbol: "circle"
};

const animationWhitelist = [
  "data", "domain", "height", "maxBubbleSize", "padding", "samples", "size", "style", "width"
];

class VictoryScatter extends React.Component {
  static displayName = "VictoryScatter";
  static role = "scatter";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    animate: PropTypes.object,
    bubbleProperty: PropTypes.string,
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string), y: PropTypes.arrayOf(PropTypes.string)
      })
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
    labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    labelComponent: PropTypes.element,
    maxBubbleSize: CustomPropTypes.nonNegative,
    name: PropTypes.string,
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
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      parent: PropTypes.object, data: PropTypes.object, labels: PropTypes.object
    }),
    symbol: PropTypes.oneOfType([
      PropTypes.oneOf([
        "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"
      ]),
      PropTypes.func
    ]),
    theme: PropTypes.object,
    width: CustomPropTypes.nonNegative,
    x: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    y: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    standalone: true,
    dataComponent: <Point/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(
    ScatterHelpers.getBaseProps.bind(ScatterHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  renderData(props) {
    const { dataComponent, labelComponent, groupComponent } = props;

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

    return labelComponents.length > 0 ?
      React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents) :
      dataComponents;
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  renderContainer(props, children) {
    const {containerComponent} = props;
    const parentProps = this.getComponentProps(containerComponent, "parent", "parent");
    return React.cloneElement(containerComponent, parentProps, children);
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
    return this.renderContainer(props, children);
  }
}

export default addEvents(VictoryScatter);
