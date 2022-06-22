import React from "react";
import PropTypes from "prop-types";
import { assign, isEmpty } from "lodash";
import {
  PropTypes as CustomPropTypes,
  VictoryLabel,
  CommonProps,
  VictoryContainer,
  VictoryTheme,
  LineSegment,
  addEvents,
  Arc,
  Axis,
} from "victory-core";
import { getScale, getStyles, getBaseProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
};

const options = {
  components: [
    { name: "axis", index: 0 },
    { name: "axisLabel", index: 0 },
    { name: "grid" },
    { name: "parent", index: "parent" },
    { name: "ticks" },
    { name: "tickLabels" },
  ],
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
    "height",
  ];

  static displayName = "VictoryAxis";

  static role = "axis";

  static defaultTransitions = {
    onExit: {
      duration: 500,
    },
    onEnter: {
      duration: 500,
    },
  };

  static propTypes = {
    ...CommonProps.baseProps,
    axisAngle: PropTypes.number,
    axisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    axisValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string),
        y: PropTypes.arrayOf(PropTypes.string),
      }),
    ]),
    circularAxisComponent: PropTypes.element,
    circularGridComponent: PropTypes.element,
    containerComponent: PropTypes.element,
    dependentAxis: PropTypes.bool,
    disableInlineStyles: PropTypes.bool,
    endAngle: PropTypes.number,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.oneOf([
          "axis",
          "axisLabel",
          "grid",
          "ticks",
          "tickLabels",
        ]),
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          CustomPropTypes.allOfType([
            CustomPropTypes.integer,
            CustomPropTypes.nonNegative,
          ]),
          PropTypes.string,
        ]),
        eventHandlers: PropTypes.object,
      }),
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
      tickLabels: PropTypes.object,
    }),
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.greaterThanZero,
    ]),
    tickFormat: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.homogeneousArray,
    ]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray,
  };

  static defaultProps = {
    axisComponent: <LineSegment />,
    axisLabelComponent: <VictoryLabel />,
    circularAxisComponent: <Arc />,
    circularGridComponent: <Arc />,
    containerComponent: <VictoryContainer />,
    endAngle: 360,
    gridComponent: <LineSegment />,
    groupComponent: <g role="presentation" />,
    labelPlacement: "parallel",
    startAngle: 0,
    standalone: true,
    theme: VictoryTheme.grayscale,
    tickComponent: <LineSegment />,
    tickLabelComponent: <VictoryLabel />,
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
    "circularGridComponent",
  ];

  renderAxisLine(props) {
    const { dependentAxis } = props;
    const axisComponent = dependentAxis
      ? props.axisComponent
      : props.circularAxisComponent;
    const axisProps = this.getComponentProps(axisComponent, "axis", 0);
    return React.cloneElement(axisComponent, axisProps);
  }

  renderLabel(props) {
    const { axisLabelComponent, dependentAxis, label } = props;
    if (!label || !dependentAxis) {
      return null;
    }
    const axisLabelProps = this.getComponentProps(
      axisLabelComponent,
      "axisLabel",
      0,
    );
    return React.cloneElement(axisLabelComponent, axisLabelProps);
  }

  renderAxis(props) {
    const { tickComponent, tickLabelComponent, name } = props;
    const shouldRender = (componentProps) => {
      const { style = {}, events = {} } = componentProps;
      const visible =
        style.stroke !== "transparent" &&
        style.stroke !== "none" &&
        style.strokeWidth !== 0;
      return visible || !isEmpty(events);
    };
    const axisType = props.dependentAxis ? "radial" : "angular";
    const gridComponent =
      axisType === "radial" ? props.circularGridComponent : props.gridComponent;
    const tickComponents = this.dataKeys
      .map((key, index) => {
        const tickProps = assign(
          { key: `${name}-tick-${key}` },
          this.getComponentProps(tickComponent, "ticks", index),
        );
        const TickComponent = React.cloneElement(tickComponent, tickProps);
        return shouldRender(TickComponent.props) ? TickComponent : undefined;
      })
      .filter(Boolean);

    const gridComponents = this.dataKeys
      .map((key, index) => {
        const gridProps = assign(
          { key: `${name}-grid-${key}` },
          this.getComponentProps(gridComponent, "grid", index),
        );
        const GridComponent = React.cloneElement(gridComponent, gridProps);
        return shouldRender(GridComponent.props) ? GridComponent : undefined;
      })
      .filter(Boolean);

    const tickLabelComponents = this.dataKeys.map((key, index) => {
      const tickLabelProps = assign(
        { key: `${name}-tick-${key}` },
        this.getComponentProps(tickLabelComponent, "tickLabels", index),
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
      ...tickLabelComponents,
    ];
    return this.renderGroup(props, children);
  }

  // Overridden in victory-native
  renderGroup(props, children) {
    const { groupComponent } = props;
    return React.cloneElement(groupComponent, {}, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { animationWhitelist } = VictoryPolarAxis;
    const props = Axis.modifyProps(this.props, fallbackProps);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }
    const children = this.renderAxis(props);
    return props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;
  }
}

export default addEvents(VictoryPolarAxis, options);
