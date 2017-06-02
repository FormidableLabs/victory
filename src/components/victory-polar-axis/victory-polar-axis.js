import React from "react";
import PropTypes from "prop-types";
import { assign, partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryLabel,
  VictoryContainer, VictoryTheme, Line, addEvents, Arc
} from "victory-core";
import AxisHelpers from "./helper-methods";
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
  static getAxis = AxisHelpers.getAxis.bind(AxisHelpers);
  static getScale = AxisHelpers.getScale.bind(AxisHelpers);
  static getStyles = partialRight(AxisHelpers.getStyles.bind(AxisHelpers), fallbackProps.style);
  static getBaseProps = partialRight(AxisHelpers.getBaseProps.bind(AxisHelpers), fallbackProps);
  static expectedComponents = [
    "axisComponent", "circularAxisComponent", "groupComponent", "containerComponent",
    "tickComponent", "tickLabelComponent", "gridComponent", "circularGridComponent"
  ];

  getTransform(props) {
    const groupComponentProps = props.groupComponent.props || {};
    const origin = Helpers.getPolarOrigin(props);
    const transform = `translate(${origin.x}, ${origin.y})`;
    return groupComponentProps.transform || transform;
  }

  renderAxis(props) {
    const { tickComponent, tickLabelComponent, groupComponent } = props;
    const axisType = props.dependentAxis ? "radial" : "angular";
    const gridComponent = axisType === "radial" ? props.circularGridComponent : props.gridComponent;
    const axisComponent = props.dependentAxis ? props.axisComponent : props.circularAxisComponent;
    const axisProps = this.getComponentProps(axisComponent, "axis", 0);

    const tickComponents = this.dataKeys.map((key, index) => {
      const tickProps = assign(
        { key: `tick-${key}` }, this.getComponentProps(tickComponent, "ticks", index)
      );
      return React.cloneElement(tickComponent, tickProps);
    });

    const gridComponents = this.dataKeys.map((key, index) => {
      const gridProps = assign(
        { key: `grid-${key}` }, this.getComponentProps(gridComponent, "grid", index)
      );
      return React.cloneElement(gridComponent, gridProps);
    });

    const tickLabelComponents = this.dataKeys.map((key, index) => {
      const tickLabelProps = assign(
        { key: `tick-${key}` }, this.getComponentProps(tickLabelComponent, "tickLabels", index)
      );
      return React.cloneElement(tickLabelComponent, tickLabelProps);
    });
    const children = [
      React.cloneElement(axisComponent, axisProps),
      ...tickComponents, ...gridComponents, ...tickLabelComponents
    ];
    return React.cloneElement(groupComponent, { transform: this.getTransform(props) }, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "axis");
    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }
    return this.renderContainer(props.containerComponent, this.renderAxis(props));
  }
}

export default addEvents(VictoryPolarAxis);
