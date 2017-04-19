import React, { PropTypes } from "react";
import { assign, partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel,
  VictoryContainer, VictoryTheme, Line, TextSize, addEvents, Circle
} from "victory-core";
import AxisHelpers from "./helper-methods";
import Axis from "../../helpers/axis";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const animationWhitelist = [
  "style", "domain", "range", "tickCount", "tickValues",
  "offsetX", "offsetY", "padding", "width", "height"
];

class VictoryAxis extends React.Component {
  static displayName = "VictoryAxis";

  static role = "axis";

  static defaultTransitions = {
    onExit: {
      duration: 500
    },
    onEnter: {
      duration: 500
    }
  };

  static propTypes = {
    animate: PropTypes.object,
    axisComponent: PropTypes.element,
    circularAxisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    containerComponent: PropTypes.element,
    crossAxis: PropTypes.bool,
    dependentAxis: PropTypes.bool,
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
    ]),
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ]),
        y: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ])
      }),
      PropTypes.number
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    gridComponent: PropTypes.element,
    circularGridComponent: PropTypes.element,
    groupComponent: PropTypes.element,
    height: CustomPropTypes.nonNegative,
    name: PropTypes.string,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number, bottom: PropTypes.number,
        left: PropTypes.number, right: PropTypes.number
      })
    ]),
    scale: PropTypes.oneOfType([
      CustomPropTypes.scale,
      PropTypes.shape({ x: CustomPropTypes.scale, y: CustomPropTypes.scale })
    ]),
    sharedEvents: PropTypes.shape({ events: PropTypes.array, getEventState: PropTypes.func }),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      parent: PropTypes.object, axis: PropTypes.object, axisLabel: PropTypes.object,
      grid: PropTypes.object, ticks: PropTypes.object, tickLabels: PropTypes.object
    }),
    theme: PropTypes.object,
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer, CustomPropTypes.greaterThanZero
    ]),
    tickFormat: PropTypes.oneOfType([ PropTypes.func, CustomPropTypes.homogeneousArray ]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray,
    width: CustomPropTypes.nonNegative,
    radius: PropTypes.number,
    axisAngle: PropTypes.number
  };

  static defaultProps = {
    axisComponent: <Line type={"axis"}/>,
    circularAxisComponent: <Circle type={"axis"}/>,
    axisLabelComponent: <VictoryLabel/>,
    tickLabelComponent: <VictoryLabel/>,
    tickComponent: <Line type={"tick"}/>,
    gridComponent: <Line type={"grid"}/>,
    circularGridComponent: <Circle type={"grid"}/>,
    scale: "linear",
    standalone: true,
    theme: VictoryTheme.grayscale,
    tickCount: 5,
    containerComponent: <VictoryContainer />,
    groupComponent: <g role="presentation"/>,
    radius: 1
  };

  static getDomain = AxisHelpers.getDomain.bind(AxisHelpers);
  static getAxis = Axis.getAxis.bind(Axis);
  static getScale = AxisHelpers.getScale.bind(AxisHelpers);
  static getStyles = partialRight(AxisHelpers.getStyles.bind(AxisHelpers), fallbackProps.style);
  static getBaseProps = partialRight(AxisHelpers.getBaseProps.bind(AxisHelpers), fallbackProps);
  static expectedComponents = [
    "axisComponent", "circularAxisComponent", "groupComponent", "containerComponent",
    "tickComponent", "tickLabelComponent", "gridComponent", "circularGridComponent"
  ];

  renderLine(props) {
    const axisComponent = props.dependentAxis ? props.axisComponent : props.circularAxisComponent;
    const axisProps = this.getComponentProps(axisComponent, "axis", 0);
    return React.cloneElement(axisComponent, axisProps);
  }

  renderGridAndTicks(props) {
    const { tickComponent, tickLabelComponent } = props;
    const gridComponent = props.dependentAxis ? props.circularGridComponent : props.gridComponent;
    const axisType = props.dependentAxis ? "radial" : "angular";
    return this.dataKeys.map((key, index) => {
      const tickProps = this.getComponentProps(tickComponent, "ticks", index);
      const TickComponent = React.cloneElement(tickComponent, tickProps);
      const gridProps = this.getComponentProps(gridComponent, "grid", index);
      const GridComponent = React.cloneElement(gridComponent, gridProps);
      const tickLabelProps = this.getComponentProps(tickLabelComponent, "tickLabels", index);
      const TickLabel = React.cloneElement(tickLabelComponent, tickLabelProps);

      return React.cloneElement(
        props.groupComponent, {key: `tick-group-${key}`}, GridComponent, TickComponent, TickLabel
      );
    });
  }

  renderContainer(component, children) {
    const isContainer = component.type && component.type.role === "container";
    const parentProps = isContainer ? this.getComponentProps(component, "parent", "parent") : {};
    return React.cloneElement(component, parentProps, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "axis");
    if (this.shouldAnimate()) {
      return (
        <VictoryTransition animate={props.animate} animationWhitelist={animationWhitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    const gridAndTicks = this.renderGridAndTicks(props);
    const children = [
      ...gridAndTicks,
      this.renderLine(props)
    ];
    return this.renderContainer(props.containerComponent, children);
  }
}

export default addEvents(VictoryAxis);
