import React from "react";
import { getBaseProps, getDimensions } from "./helper-methods";
import {
  addEvents,
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  Point,
  Border,
  BlockProps,
  ColorScalePropType,
  EventPropTypeInterface,
  OrientationTypes,
  PaddingProps,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictorySingleLabelableProps,
  VictoryStyleInterface,
  VictoryLabelStyleObject,
  EventsMixinClass,
} from "victory-core";

export type VictoryLegendTTargetType = "data" | "labels" | "parent";

export type VictoryLegendOrientationType = "horizontal" | "vertical";

export interface VictoryLegendProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictorySingleLabelableProps {
  borderComponent?: React.ReactElement;
  borderPadding?: PaddingProps;
  centerTitle?: boolean;
  colorScale?: ColorScalePropType;
  dataComponent?: React.ReactElement;
  eventKey?: StringOrNumberOrCallback | string[];
  events?: EventPropTypeInterface<
    VictoryLegendTTargetType,
    StringOrNumberOrCallback
  >[];
  gutter?: number | { left: number; right: number };
  itemsPerRow?: number;
  orientation?: VictoryLegendOrientationType;
  rowGutter?: number | Omit<BlockProps, "left" | "right">;
  style?: VictoryStyleInterface & {
    title?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  };
  symbolSpacer?: number;
  title?: string | string[];
  titleComponent?: React.ReactElement;
  titleOrientation?: OrientationTypes;
}

const fallbackProps = {
  orientation: "vertical",
  titleOrientation: "top",
  width: 450,
  height: 300,
  x: 0,
  y: 0,
};

const defaultLegendData = [{ name: "Series 1" }, { name: "Series 2" }];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryLegendBase extends EventsMixinClass<VictoryLegendProps> {}

class VictoryLegendBase extends React.Component<VictoryLegendProps> {
  static displayName = "VictoryLegend";

  static role = "legend";

  static defaultProps = {
    borderComponent: <Border />,
    data: defaultLegendData,
    containerComponent: <VictoryContainer />,
    dataComponent: <Point />,
    groupComponent: <g />,
    labelComponent: <VictoryLabel />,
    standalone: true,
    theme: VictoryTheme.grayscale,
    titleComponent: <VictoryLabel />,
  };

  static getBaseProps(props: VictoryLegendProps) {
    return getBaseProps(props, fallbackProps);
  }

  static getDimensions(props: VictoryLegendProps) {
    return getDimensions(props, fallbackProps);
  }

  static expectedComponents = [
    "borderComponent",
    "containerComponent",
    "dataComponent",
    "groupComponent",
    "labelComponent",
    "titleComponent",
  ];

  renderChildren(props: VictoryLegendProps) {
    const { dataComponent, labelComponent, title } = props;

    const children: React.ReactElement[] = [];

    if (props.borderComponent) {
      const borderProps = this.getComponentProps(
        props.borderComponent,
        "border",
        "all",
      );
      const borderComponent = React.cloneElement(
        props.borderComponent,
        borderProps,
      );

      children.push(borderComponent);
    }

    if (dataComponent) {
      const dataComponents = this.dataKeys
        .map((_dataKey, index) => {
          if (_dataKey === "all") {
            return undefined;
          }
          const dataProps = this.getComponentProps(
            dataComponent,
            "data",
            index,
          );
          return React.cloneElement(dataComponent, dataProps);
        })
        .filter(
          (comp: React.ReactElement | undefined): comp is React.ReactElement =>
            comp !== undefined,
        );

      children.push(...dataComponents);
    }

    if (title && props.titleComponent) {
      const titleProps = this.getComponentProps(title, "title", "all");
      const titleComponent = React.cloneElement(
        props.titleComponent,
        titleProps,
      );

      children.push(titleComponent);
    }

    if (labelComponent) {
      const labelComponents = this.dataKeys
        .map((_dataKey, index) => {
          if (_dataKey === "all") {
            return undefined;
          }
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

      children.push(...labelComponents);
    }

    return children;
  }

  render(): React.ReactElement {
    // @ts-expect-error Property 'role' does not exist on type 'Function'.
    // Ref: https://github.com/microsoft/TypeScript/issues/32452
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    const children = this.renderChildren(props);
    return props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : React.cloneElement(props.groupComponent, {}, children);
  }
}

export const VictoryLegend = addEvents(VictoryLegendBase);
