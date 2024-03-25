import React from "react";
import {
  Helpers,
  VictoryLabel,
  addEvents,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  UserProps,
  StringOrNumberOrCallback,
  EventPropTypeInterface,
  OrientationTypes,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryLabelStyleObject,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleObject,
  NumberOrCallback,
  EventsMixinClass,
} from "victory-core";
import { Candle } from "./candle";
import { getDomain, getData, getBaseProps } from "./helper-methods";

export interface VictoryCandlestickStyleInterface {
  close?: VictoryStyleObject;
  closeLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  data?: VictoryStyleObject;
  high?: VictoryStyleObject;
  highLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  low?: VictoryStyleObject;
  lowLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  open?: VictoryStyleObject;
  openLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  parent?: VictoryStyleObject;
}

export type VictoryCandlestickLabelsType =
  | (string | number)[]
  | boolean
  | ((datum: any) => number | string);

export interface VictoryCandlestickProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  candleColors?: {
    positive?: string;
    negative?: string;
  };
  candleRatio?: number;
  candleWidth?: NumberOrCallback;
  close?: StringOrNumberOrCallback | string[];
  closeLabelComponent?: React.ReactElement;
  closeLabels?: VictoryCandlestickLabelsType;
  eventKey?: StringOrNumberOrCallback | string[];
  events?: EventPropTypeInterface<
    | "data"
    | "labels"
    | "open"
    | "openLabels"
    | "close"
    | "closeLabels"
    | "low"
    | "lowLabels"
    | "high"
    | "highLabels",
    StringOrNumberOrCallback | string[]
  >[];
  high?: StringOrNumberOrCallback | string[];
  highLabelComponent?: React.ReactElement;
  highLabels?: VictoryCandlestickLabelsType;
  labelOrientation?:
    | OrientationTypes
    | {
        open?: OrientationTypes;
        close?: OrientationTypes;
        low?: OrientationTypes;
        high?: OrientationTypes;
      };
  low?: StringOrNumberOrCallback | string[];
  lowLabelComponent?: React.ReactElement;
  lowLabels?: VictoryCandlestickLabelsType;
  open?: StringOrNumberOrCallback | string[];
  openLabelComponent?: React.ReactElement;
  openLabels?: VictoryCandlestickLabelsType;
  size?: number;
  style?: VictoryCandlestickStyleInterface;
  wickStrokeWidth?: number;
}

/* eslint-disable no-magic-numbers */
const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  candleColors: {
    positive: "#ffffff",
    negative: "#252525",
  },
};

const options = {
  components: [
    { name: "lowLabels" },
    { name: "highLabels" },
    { name: "openLabels" },
    { name: "closeLabels" },
    { name: "labels" },
    { name: "data" },
    { name: "parent", index: "parent" },
  ],
};

const defaultData = [
  { x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0 },
  { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
  { x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10 },
  { x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15 },
  { x: new Date(2016, 6, 5), open: 25, close: 30, high: 35, low: 20 },
  { x: new Date(2016, 6, 6), open: 30, close: 35, high: 40, low: 25 },
  { x: new Date(2016, 6, 7), open: 35, close: 40, high: 45, low: 30 },
  { x: new Date(2016, 6, 8), open: 40, close: 45, high: 50, low: 35 },
];
/* eslint-enable no-magic-numbers */
const datumHasXandY = (datum) => {
  return !Helpers.isNil(datum._x) && !Helpers.isNil(datum._y);
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryCandlestickBase
  extends EventsMixinClass<VictoryCandlestickProps> {}

/**
 * VictoryCandlestick renders a dataset as a series of candlesticks.
 * VictoryCandlestick can be composed with VictoryChart to create candlestick charts.
 */
class VictoryCandlestickBase extends React.Component<VictoryCandlestickProps> {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "samples",
    "size",
    "style",
    "width",
  ];

  static displayName = "VictoryCandlestick";
  static role = "candlestick";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static defaultProps: VictoryCandlestickProps = {
    containerComponent: <VictoryContainer />,
    data: defaultData,
    dataComponent: <Candle />,
    groupComponent: <g role="presentation" />,
    labelComponent: <VictoryLabel />,
    highLabelComponent: <VictoryLabel />,
    lowLabelComponent: <VictoryLabel />,
    openLabelComponent: <VictoryLabel />,
    closeLabelComponent: <VictoryLabel />,
    samples: 50,
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
  static getBaseProps(props: VictoryCandlestickProps) {
    return getBaseProps(props, fallbackProps);
  }
  static expectedComponents = [
    "openLabelComponent",
    "closeLabelComponent",
    "highLabelComponent",
    "lowLabelComponent",
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent",
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  shouldRenderDatum = (datum) => {
    return (
      !Helpers.isNil(datum._x) &&
      !Helpers.isNil(datum._high) &&
      !Helpers.isNil(datum._low) &&
      !Helpers.isNil(datum._close) &&
      !Helpers.isNil(datum._open)
    );
  };

  renderCandleData(
    props: VictoryCandlestickProps,
    shouldRenderDatum = datumHasXandY,
  ) {
    const { dataComponent, labelComponent, groupComponent } = props;
    const types = ["close", "open", "low", "high"];

    if (!groupComponent) {
      throw new Error("VictoryCandlestick expects a groupComponent prop");
    }

    const children: React.ReactElement[] = [];

    if (dataComponent) {
      const dataComponents = this.dataKeys.reduce<React.ReactElement[]>(
        (validDataComponents, _dataKey, index) => {
          const dataProps = this.getComponentProps(
            dataComponent,
            "data",
            index,
          );
          if (shouldRenderDatum((dataProps as any).datum)) {
            validDataComponents.push(
              React.cloneElement(dataComponent, dataProps),
            );
          }
          return validDataComponents;
        },
        [],
      );

      children.push(...dataComponents);
    }

    const labelComponents = types.flatMap((type) =>
      this.dataKeys
        .map((key, index) => {
          const name = `${type}Labels`;
          const baseComponent: React.ReactElement =
            props[`${type}LabelComponent`];
          const labelProps = this.getComponentProps(baseComponent, name, index);
          if (
            (labelProps as any).text !== undefined &&
            (labelProps as any).text !== null
          ) {
            return React.cloneElement(baseComponent, labelProps);
          }
          return undefined;
        })
        .filter(
          (comp: React.ReactElement | undefined): comp is React.ReactElement =>
            comp !== undefined,
        ),
    );

    children.push(...labelComponents);

    if (labelComponent) {
      const labelsComponents = this.dataKeys
        .map((_dataKey, index) => {
          const labelProps = this.getComponentProps(
            labelComponent,
            "labels",
            index,
          );
          if (
            (labelProps as any).text !== undefined &&
            (labelProps as any).text !== null
          ) {
            return React.cloneElement(labelComponent, labelProps);
          }
          return undefined;
        })
        .filter(
          (comp: React.ReactElement | undefined): comp is React.ReactElement =>
            comp !== undefined,
        );

      children.push(...labelsComponents);
    }

    return this.renderContainer(groupComponent, children);
  }

  render(): React.ReactElement {
    const { animationWhitelist, role } = VictoryCandlestick;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderCandleData(props, this.shouldRenderDatum);

    const component = props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;

    return UserProps.withSafeUserProps(component, props);
  }
}

export const VictoryCandlestick = addEvents(VictoryCandlestickBase, options);
