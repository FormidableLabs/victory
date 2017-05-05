import React from "react";
import PropTypes from "prop-types";
import { partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryLabel,
  VictoryContainer, VictoryTheme, Line, addEvents, Circle, Arc
} from "victory-core";
import AxisHelpers from "./helper-methods";
import Axis from "../../helpers/axis";
import { BaseProps } from "../../helpers/common-props";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const animationWhitelist = [
  "style", "domain", "range", "tickCount", "tickValues", "padding", "width", "height"
];

class VictoryPolarAxis extends React.Component {
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
    ...BaseProps,
    axisAngle: PropTypes.number,
    axisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    circularAxisComponent: PropTypes.element,
    circularGridComponent: PropTypes.element,
    containerComponent: PropTypes.element,
    dependentAxis: PropTypes.bool,
    endAngle: PropTypes.number,
    gridComponent: PropTypes.element,
    labelPlacement: PropTypes.oneOf(["parallel", "perpendicular", "vertical"]),
    radius: PropTypes.number,
    startAngle: PropTypes.number,
    style: PropTypes.shape({
      parent: PropTypes.object, axis: PropTypes.object, axisLabel: PropTypes.object,
      grid: PropTypes.object, ticks: PropTypes.object, tickLabels: PropTypes.object
    }),
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer, CustomPropTypes.greaterThanZero
    ]),
    tickFormat: PropTypes.oneOfType([ PropTypes.func, CustomPropTypes.homogeneousArray ]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray
  };

  static defaultProps = {
    axisComponent: <Line type={"axis"}/>,
    axisLabelComponent: <VictoryLabel/>,
    circularAxisComponent: <Arc type={"axis"}/>,
    circularGridComponent: <Arc type={"grid"}/>,
    containerComponent: <VictoryContainer />,
    endAngle: 360,
    gridComponent: <Line type={"grid"}/>,
    groupComponent: <g role="presentation"/>,
    labelPlacement: "parallel",
    scale: "linear",
    startAngle: 0,
    standalone: true,
    theme: VictoryTheme.grayscale,
    tickComponent: <Line type={"tick"}/>,
    tickCount: 5,
    tickLabelComponent: <VictoryLabel/>
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
    const axisType = props.dependentAxis ? "radial" : "angular";
    const gridComponent = axisType === "radial" ? props.circularGridComponent : props.gridComponent;
    return this.dataKeys.map((key, index) => {
      const tickProps = this.getComponentProps(tickComponent, "ticks", index);
      const TickComponent = React.cloneElement(tickComponent, tickProps);
      const gridProps = this.getComponentProps(gridComponent, "grid", index);
      const GridComponent = React.cloneElement(gridComponent, gridProps);
      const tickLabelProps = this.getComponentProps(tickLabelComponent, "tickLabels", index);
      const TickLabel = React.cloneElement(tickLabelComponent, tickLabelProps);

      return React.cloneElement(
        props.groupComponent, { key: `tick-group-${key}` }, GridComponent, TickComponent, TickLabel
      );
    });
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "axis");
    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const gridAndTicks = this.renderGridAndTicks(props);
    const children = [
      ...gridAndTicks,
      this.renderLine(props)
    ];
    return this.renderContainer(props.containerComponent, children);
  }
}

export default addEvents(VictoryPolarAxis);
