import React from "react";
import { isEmpty } from "lodash";
import {
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  LineSegment,
  addEvents,
  Arc,
  Axis,
  EventsMixinClass,
} from "victory-core";
import { getScale, getStyles, getBaseProps } from "./helper-methods";
import { VictoryPolarAxisProps } from "./types";

const fallbackProps: Partial<VictoryPolarAxisProps> = {
  width: 450,
  height: 300,
  padding: 50,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryPolarAxisBase
  extends EventsMixinClass<VictoryPolarAxisProps> {}

class VictoryPolarAxisBase extends React.Component<VictoryPolarAxisProps> {
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

  static defaultProps: VictoryPolarAxisProps = {
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
  static getScale(props) {
    return getScale(props);
  }
  static getStyles(props) {
    return getStyles(props, fallbackProps.style);
  }
  static getBaseProps(props) {
    return getBaseProps(props, fallbackProps);
  }
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

  renderAxisLine(props: VictoryPolarAxisProps) {
    const { dependentAxis } = props;
    const axisComponent = dependentAxis
      ? props.axisComponent
      : props.circularAxisComponent;
    const axisProps = this.getComponentProps(axisComponent, "axis", 0);
    return React.cloneElement(axisComponent!, axisProps);
  }

  renderLabel(props: VictoryPolarAxisProps) {
    const { axisLabelComponent, dependentAxis, label } = props;
    if (!label || !dependentAxis) {
      return null;
    }
    const axisLabelProps = this.getComponentProps(
      axisLabelComponent,
      "axisLabel",
      0,
    );
    return React.cloneElement(axisLabelComponent!, axisLabelProps);
  }

  renderAxis(props: VictoryPolarAxisProps) {
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
        const tickProps = Object.assign(
          { key: `${name}-tick-${key}` },
          this.getComponentProps(tickComponent, "ticks", index),
        );
        const TickComponent = React.cloneElement(tickComponent!, tickProps);
        return shouldRender(TickComponent.props) ? TickComponent : undefined;
      })
      .filter(Boolean);

    const gridComponents = this.dataKeys
      .map((key, index) => {
        const gridProps = Object.assign(
          { key: `${name}-grid-${key}` },
          this.getComponentProps(gridComponent, "grid", index),
        );
        const GridComponent = React.cloneElement(gridComponent!, gridProps);
        return shouldRender(GridComponent.props) ? GridComponent : undefined;
      })
      .filter(Boolean);

    const tickLabelComponents = this.dataKeys.map((key, index) => {
      const tickLabelProps = Object.assign(
        { key: `${name}-tick-${key}` },
        this.getComponentProps(tickLabelComponent, "tickLabels", index),
      );
      return React.cloneElement(tickLabelComponent!, tickLabelProps);
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
  renderGroup(props: VictoryPolarAxisProps, children: React.ReactNode) {
    const { groupComponent } = props;
    return React.cloneElement(groupComponent!, {}, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  render(): React.ReactElement {
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

export const VictoryPolarAxis = addEvents(VictoryPolarAxisBase, options);
