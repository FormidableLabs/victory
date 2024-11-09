import React from "react";
import {
  Helpers,
  VictoryLabel,
  addEvents,
  LineSegment,
  VictoryContainer,
  VictoryTheme,
  Box,
  Whisker,
  DefaultTransitions,
  UserProps,
  EventPropTypeInterface,
  DomainPropType,
  DomainPaddingPropType,
  OrientationTypes,
  StringOrNumberOrCallback,
  VictoryDatableProps,
  VictoryCommonProps,
  VictoryStyleObject,
  VictoryLabelStyleObject,
  EventsMixinClass,
} from "victory-core";
import { getDomain, getData, getBaseProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
};

const defaultData = [
  { x: 1, min: 5, q1: 7, median: 12, q3: 18, max: 20 },
  { x: 2, min: 2, q1: 5, median: 8, q3: 12, max: 15 },
];

const options = {
  components: [
    { name: "min" },
    { name: "minLabels" },
    { name: "max" },
    { name: "maxLabels" },
    { name: "median" },
    { name: "medianLabels" },
    { name: "q1" },
    { name: "q1Labels" },
    { name: "q3" },
    { name: "q3Labels" },
    { name: "parent", index: "parent" },
  ],
};

export type VictoryBoxPlotLabelType =
  | boolean
  | (string | number)[]
  | { (): any }
  | { (data: any): string | null };

export interface VictoryBoxPlotStyleInterface {
  parent?: VictoryStyleObject;
  max?: VictoryStyleObject;
  maxLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  min?: VictoryStyleObject;
  minLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  median?: VictoryStyleObject;
  medianLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  q1?: VictoryStyleObject;
  q1Labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  q3?: VictoryStyleObject;
  q3Labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  boxes?: VictoryStyleObject;
  whiskers?: VictoryStyleObject;
}

export interface VictoryBoxPlotLabelOrientationInterface {
  max?: OrientationTypes;
  min?: OrientationTypes;
  median?: OrientationTypes;
  q1?: OrientationTypes;
  q3?: OrientationTypes;
}

export interface VictoryBoxPlotProps
  extends VictoryCommonProps,
    VictoryDatableProps {
  boxWidth?: number;
  datum?: any;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  events?: EventPropTypeInterface<string, StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  labelOrientation?: OrientationTypes | VictoryBoxPlotLabelOrientationInterface;
  labels?: boolean;
  max?: StringOrNumberOrCallback | string[];
  maxComponent?: React.ReactElement;
  maxLabelComponent?: React.ReactElement;
  maxLabels?: VictoryBoxPlotLabelType;
  median?: StringOrNumberOrCallback | string[];
  medianComponent?: React.ReactElement;
  medianLabelComponent?: React.ReactElement;
  medianLabels?: VictoryBoxPlotLabelType;
  min?: StringOrNumberOrCallback | string[];
  minComponent?: React.ReactElement;
  minLabelComponent?: React.ReactElement;
  minLabels?: VictoryBoxPlotLabelType;
  q1?: StringOrNumberOrCallback | string[];
  q1Component?: React.ReactElement;
  q1LabelComponent?: React.ReactElement;
  q1Labels?: VictoryBoxPlotLabelType;
  q3?: StringOrNumberOrCallback | string[];
  q3Component?: React.ReactElement;
  q3LabelComponent?: React.ReactElement;
  q3Labels?: VictoryBoxPlotLabelType;
  style?: VictoryBoxPlotStyleInterface;
  text?: StringOrNumberOrCallback | string[];
  whiskerWidth?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface VictoryBoxPlotBase extends EventsMixinClass<VictoryBoxPlotProps> {}

class VictoryBoxPlotBase extends React.Component<VictoryBoxPlotProps> {
  static animationWhitelist: Array<keyof VictoryBoxPlotProps> = [
    "data",
    "domain",
    "height",
    "padding",
    "style",
    "width",
  ];

  static displayName = "VictoryBoxPlot";
  static role = "boxplot";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static defaultProps: VictoryBoxPlotProps = {
    containerComponent: <VictoryContainer />,
    data: defaultData,
    dataComponent: <Box />,
    groupComponent: <g role="presentation" />,
    maxComponent: <Whisker />,
    maxLabelComponent: <VictoryLabel />,
    medianComponent: <LineSegment />,
    medianLabelComponent: <VictoryLabel />,
    minComponent: <Whisker />,
    minLabelComponent: <VictoryLabel />,
    q1Component: <Box />,
    q1LabelComponent: <VictoryLabel />,
    q3Component: <Box />,
    q3LabelComponent: <VictoryLabel />,
    samples: 50,
    sortKey: "x",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale,
  };

  static getDomain(props, axis) {
    return getDomain(props, axis);
  }
  static getData(props) {
    return getData(props);
  }
  static getBaseProps(props) {
    return getBaseProps(props, fallbackProps);
  }
  static expectedComponents: Array<keyof VictoryBoxPlotProps> = [
    "maxComponent",
    "maxLabelComponent",
    "medianComponent",
    "medianLabelComponent",
    "minComponent",
    "minLabelComponent",
    "q1Component",
    "q1LabelComponent",
    "q3Component",
    "q3LabelComponent",
    "groupComponent",
    "containerComponent",
  ];

  renderBoxPlot(props) {
    const types = ["q1", "q3", "max", "min", "median"];
    const dataComponents = types
      .map((type) => {
        return this.dataKeys.reduce((validDataComponents, _key, index) => {
          const baseComponent = props[`${type}Component`];
          const componentProps = this.getComponentProps(
            baseComponent,
            type,
            index,
          );
          if (this.shouldRenderDatum(componentProps.datum)) {
            validDataComponents.push(
              React.cloneElement(baseComponent, componentProps),
            );
          }
          return validDataComponents;
        }, [] as React.ReactElement[]);
      })
      .flat();

    const labelComponents = types
      .map((type) => {
        const components = this.dataKeys.reduce(
          (validComponents, _key, index) => {
            const name = `${type}Labels`;
            const baseComponent = props[`${type}LabelComponent`];
            const labelProps = this.getComponentProps(
              baseComponent,
              name,
              index,
            );
            if (labelProps.text !== undefined && labelProps.text !== null) {
              validComponents.push(
                React.cloneElement(baseComponent, labelProps),
              );
            }
            return validComponents;
          },
          [] as React.ReactElement[],
        );
        return components.filter(Boolean);
      })
      .flat();

    const children = [...dataComponents, ...labelComponents];
    return this.renderContainer(props.groupComponent, children);
  }

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  shouldRenderDatum(datum) {
    const hasX = !Helpers.isNil(datum._x);
    const hasY = !Helpers.isNil(datum._y);
    const hasSummaryStatistics =
      !Helpers.isNil(datum._min) &&
      !Helpers.isNil(datum._max) &&
      !Helpers.isNil(datum._median) &&
      !Helpers.isNil(datum._q1) &&
      !Helpers.isNil(datum._q3);

    return hasSummaryStatistics && (this.props.horizontal ? hasY : hasX);
  }

  render(): React.ReactElement {
    const { animationWhitelist, role } = VictoryBoxPlot;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderBoxPlot(props);
    const component = props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;

    return UserProps.withSafeUserProps(component, props);
  }
}

export const VictoryBoxPlot = addEvents(VictoryBoxPlotBase, options);
