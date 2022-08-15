import React from "react";
import PropTypes from "prop-types";
import { flatten, isNil } from "lodash";
import {
  Helpers,
  VictoryLabel,
  addEvents,
  LineSegment,
  PropTypes as CustomPropTypes,
  VictoryContainer,
  VictoryTheme,
  Box,
  Whisker,
  DefaultTransitions,
  CommonProps,
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    boxWidth: PropTypes.number,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.oneOf([
          "max",
          "maxLabels",
          "median",
          "medianLabels",
          "min",
          "minLabels",
          "q1",
          "q1Labels",
          "q3",
          "q3Labels",
          "parent",
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
    horizontal: PropTypes.bool,
    labelOrientation: PropTypes.oneOfType([
      PropTypes.oneOf(["top", "bottom", "left", "right"]),
      PropTypes.shape({
        q1: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        q3: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        min: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        max: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        median: PropTypes.oneOf(["top", "bottom", "left", "right"]),
      }),
    ]),
    labels: PropTypes.bool,
    max: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    maxComponent: PropTypes.element,
    maxLabelComponent: PropTypes.element,
    maxLabels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array,
      PropTypes.bool,
    ]),
    median: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    medianComponent: PropTypes.element,
    medianLabelComponent: PropTypes.element,
    medianLabels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array,
      PropTypes.bool,
    ]),
    min: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    minComponent: PropTypes.element,
    minLabelComponent: PropTypes.element,
    minLabels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array,
      PropTypes.bool,
    ]),
    q1: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    q1Component: PropTypes.element,
    q1LabelComponent: PropTypes.element,
    q1Labels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array,
      PropTypes.bool,
    ]),
    q3: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    q3Component: PropTypes.element,
    q3LabelComponent: PropTypes.element,
    q3Labels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array,
      PropTypes.bool,
    ]),
    style: PropTypes.shape({
      boxes: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object,
      max: PropTypes.object,
      maxLabels: PropTypes.object,
      median: PropTypes.object,
      medianLabels: PropTypes.object,
      min: PropTypes.object,
      minLabels: PropTypes.object,
      q1: PropTypes.object,
      q1Labels: PropTypes.object,
      q3: PropTypes.object,
      q3Labels: PropTypes.object,
      whiskers: PropTypes.object,
    }),
    whiskerWidth: PropTypes.number,
  };

  static defaultProps = {
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

  static getDomain = getDomain;
  static getData = getData;
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
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
    const dataComponents = flatten(
      types.map((type) => {
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
      }),
    );

    const labelComponents = flatten(
      types.map((type) => {
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
      }),
    );
    const children = [...dataComponents, ...labelComponents];
    return this.renderContainer(props.groupComponent, children);
  }

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  shouldRenderDatum(datum) {
    const hasX = !isNil(datum._x);
    const hasY = !isNil(datum._y);
    const hasSummaryStatistics =
      !isNil(datum._min) &&
      !isNil(datum._max) &&
      !isNil(datum._median) &&
      !isNil(datum._q1) &&
      !isNil(datum._q3);

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
