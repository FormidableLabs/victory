import { partialRight } from "lodash";
import React, { PropTypes } from "react";
import AreaHelpers from "./helper-methods";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel, VictoryContainer,
  DefaultTransitions, Area, VictoryClipContainer, addEvents, VictoryTheme, Data, Domain
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear"
};

const animationWhitelist = ["data", "domain", "height", "padding", "style", "width"];

class VictoryArea extends React.Component {

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
      eventKey: PropTypes.oneOf(["all"]),
      eventHandlers: PropTypes.object
    })),
    groupComponent: PropTypes.element,
    height: CustomPropTypes.nonNegative,
    interpolation: PropTypes.oneOf([
      "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX",
      "monotoneY", "natural", "radial", "step", "stepAfter", "stepBefore"
    ]),
    label: PropTypes.string,
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
    ]),
    y: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  };

  static defaultProps = {
    dataComponent: <Area/>,
    labelComponent: <VictoryLabel/>,
    scale: "linear",
    samples: 50,
    standalone: true,
    containerComponent: <VictoryContainer />,
    groupComponent: <VictoryClipContainer/>,
    theme: VictoryTheme.grayscale
  };

  static displayName = "VictoryArea";
  static role = "area";
  static continuous = true;
  static defaultTransitions = DefaultTransitions.continuousTransitions();
  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(AreaHelpers.getBaseProps.bind(AreaHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];


  renderData(props) {
    const { dataComponent, labelComponent, groupComponent } = props;
    const dataProps = this.getComponentProps(dataComponent, "data", "all");
    const areaComponent = React.cloneElement(dataComponent, dataProps);

    const labelProps = this.getComponentProps(labelComponent, "labels", "all");
    if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
      const areaLabel = React.cloneElement(labelComponent, labelProps);
      return React.cloneElement(groupComponent, {}, areaComponent, areaLabel);
    }
    return areaComponent;
  }

  renderContainer(component, children) {
    const parentProps = this.getComponentProps(component, "parent", "parent");
    return React.cloneElement(component, parentProps, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    const { animate, standalone, groupComponent, containerComponent} = props;

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

export default addEvents(VictoryArea);
