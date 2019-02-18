import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import {
  PropTypes as CustomPropTypes,
  Helpers,
  VictoryLabel,
  CommonProps,
  VictoryContainer,
  VictoryTheme,
  LineSegment,
  addEvents,
  Arc,
  Axis
} from "victory-core";
import { getScale, getStyles, getBaseProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const options = {
  components: [
    { name: "axis", index: 0 },
    { name: "axisLabel", index: 0 },
    { name: "grid" },
    { name: "parent", index: "parent" },
    { name: "ticks" },
    { name: "tickLabels" }
  ]
};

class VictoryPolarAxis extends React.Component {
  static animationWhitelist = [
    "style",
    "domain",
    "range",
    "tickCount",
    "tickValues",
    "padding",
    "width",
    "height"
  ];

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
    ...CommonProps.baseProps,
    axisAngle: PropTypes.number,
    axisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    axisValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string),
        y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    circularAxisComponent: PropTypes.element,
    circularGridComponent: PropTypes.element,
    containerComponent: PropTypes.element,
    dependentAxis: PropTypes.bool,
    endAngle: PropTypes.number,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels"]),
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
          PropTypes.string
        ]),
        eventHandlers: PropTypes.object
      })
    ),
    gridComponent: PropTypes.element,
    innerRadius: CustomPropTypes.nonNegative,
    labelPlacement: PropTypes.oneOf(["parallel", "perpendicular", "vertical"]),
    startAngle: PropTypes.number,
    stringMap: PropTypes.object,
    style: PropTypes.shape({
      parent: PropTypes.object,
      axis: PropTypes.object,
      axisLabel: PropTypes.object,
      grid: PropTypes.object,
      ticks: PropTypes.object,
      tickLabels: PropTypes.object
    }),
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.greaterThanZero
    ]),
    tickFormat: PropTypes.oneOfType([PropTypes.func, CustomPropTypes.homogeneousArray]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray
  };

  static defaultProps = {
    axisComponent: <LineSegment type={"axis"} />,
    axisLabelComponent: <VictoryLabel />,
    circularAxisComponent: <Arc type={"axis"} />,
    circularGridComponent: <Arc type={"grid"} />,
    containerComponent: <VictoryContainer />,
    endAngle: 360,
    gridComponent: <LineSegment type={"grid"} />,
    groupComponent: <g role="presentation" />,
    labelPlacement: "parallel",
    startAngle: 0,
    standalone: true,
    theme: VictoryTheme.grayscale,
    tickComponent: <LineSegment type={"tick"} />,
    tickLabelComponent: <VictoryLabel />
  };

  static getDomain = Axis.getDomain;
  static getAxis = Axis.getAxis;
  static getScale = getScale;
  static getStyles = (props) => getStyles(props, fallbackProps.style);
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static expectedComponents = [
    "axisComponent",
    "circularAxisComponent",
    "groupComponent",
    "containerComponent",
    "tickComponent",
    "tickLabelComponent",
    "gridComponent",
    "circularGridComponent"
  ];

  renderAxisLine(props) {
    const { dependentAxis } = props;
    const axisComponent = dependentAxis ? props.axisComponent : props.circularAxisComponent;
    const axisProps = this.getComponentProps(axisComponent, "axis", 0);
    return React.cloneElement(axisComponent, axisProps);
  }

  renderLabel(props) {
    const { axisLabelComponent, dependentAxis, label } = props;
    if (!label || !dependentAxis) {
      return null;
    }
    const axisLabelProps = this.getComponentProps(axisLabelComponent, "axisLabel", 0);
    return React.cloneElement(axisLabelComponent, axisLabelProps);
  }

  renderAxis(props) {
    const { tickComponent, tickLabelComponent, name } = props;
    const axisType = props.dependentAxis ? "radial" : "angular";
    const gridComponent = axisType === "radial" ? props.circularGridComponent : props.gridComponent;
    const tickComponents = this.dataKeys.map((key, index) => {
      const tickProps = assign(
        { key: `${name}-tick-${key}` },
        this.getComponentProps(tickComponent, "ticks", index)
      );
      return React.cloneElement(tickComponent, tickProps);
    });

    const gridComponents = this.dataKeys.map((key, index) => {
      const gridProps = assign(
        { key: `${name}-grid-${key}` },
        this.getComponentProps(gridComponent, "grid", index)
      );
      return React.cloneElement(gridComponent, gridProps);
    });

    const tickLabelComponents = this.dataKeys.map((key, index) => {
      const tickLabelProps = assign(
        { key: `${name}-tick-${key}` },
        this.getComponentProps(tickLabelComponent, "tickLabels", index)
      );
      return React.cloneElement(tickLabelComponent, tickLabelProps);
    });
    const axis = this.renderAxisLine(props);
    const axisLabel = this.renderLabel(props);
    const children = [
      axis,
      axisLabel,
      ...tickComponents,
      ...gridComponents,
      ...tickLabelComponents
    ];
    return this.renderGroup(props, children);
  }

  // Overridden in victory-native
  renderGroup(props, children) {
    const { groupComponent } = props;
    const groupComponentProps = groupComponent.props || {};
    const origin = Helpers.getPolarOrigin(props);
    const transform = groupComponentProps.transform || `translate(${origin.x}, ${origin.y})`;
    return React.cloneElement(groupComponent, { transform }, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { animationWhitelist, role } = VictoryPolarAxis;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }
    const children = this.renderAxis(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryPolarAxis, options);
