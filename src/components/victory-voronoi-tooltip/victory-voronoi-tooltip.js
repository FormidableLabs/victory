import React, { PropTypes } from "react";
import { partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryTooltip, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Voronoi, Data, Domain
} from "victory-core";
import TooltipHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const animationWhitelist = [
  "data", "domain", "height", "padding", "samples", "size", "style", "width"
];

class VictoryVoronoiTooltip extends React.Component {
  static displayName = "VictoryVoronoiTooltip";
  static role = "tooltip";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    animate: PropTypes.object,
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
    size: CustomPropTypes.nonNegative,
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object,
      flyout: PropTypes.object
    }),
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
    dataComponent: <Voronoi/>,
    labelComponent: <VictoryTooltip/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g role="presentation"/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(
    TooltipHelpers.getBaseProps.bind(TooltipHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  renderData(props) {
    const { dataComponent, labelComponent, groupComponent } = props;
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

  shouldAnimate() {
    return !!this.props.animate;
  }

  renderContainer(component, children) {
    const parentProps = this.getComponentProps(component, "parent", "parent");
    return React.cloneElement(component, parentProps, children);
  }

  render() {
    const {role} = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    const { animate, standalone, containerComponent, groupComponent } = props;
    if (this.shouldAnimate()) {
      return (
        <VictoryTransition animate={animate} animationWhitelist={animationWhitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }
    const children = this.renderData(props);
    const component = standalone ? containerComponent : groupComponent;
    return this.renderContainer(component, children);
  }
}
export default addEvents(VictoryVoronoiTooltip);
