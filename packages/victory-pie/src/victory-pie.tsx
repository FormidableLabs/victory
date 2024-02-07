import React from "react";
import {
  addEvents,
  Helpers,
  Data,
  LineSegment,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  UserProps,
  ColorScalePropType,
  EventPropTypeInterface,
  NumberOrCallback,
  OriginType,
  Path,
  SliceNumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
  EventsMixinClass,
  VictoryDatableProps,
} from "victory-core";
import { isNil } from "lodash";
import { getBaseProps } from "./helper-methods";
import {
  Slice,
  SliceProps,
  VictorySliceTTargetType,
  VictorySliceLabelPlacementType,
  VictorySliceLabelPositionType,
} from "./slice";
import { CurvedLabel } from "./curved-label";

export interface VictoryPieProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  curvedLabelComponent?: React.ReactElement;
  colorScale?: ColorScalePropType;
  cornerRadius?: SliceNumberOrCallback<SliceProps, "cornerRadius">;
  endAngle?: number;
  events?: EventPropTypeInterface<
    VictorySliceTTargetType,
    StringOrNumberOrCallback | string[] | number[]
  >[];
  eventKey?: StringOrNumberOrCallback;
  innerRadius?: NumberOrCallback;
  labelIndicator?: boolean | React.ReactElement;
  labelIndicatorInnerOffset?: number;
  labelIndicatorOuterOffset?: number;
  labelPlacement?:
    | VictorySliceLabelPlacementType
    | ((props: SliceProps) => VictorySliceLabelPlacementType);
  labelPosition?:
    | VictorySliceLabelPositionType
    | ((props: SliceProps) => VictorySliceLabelPositionType);

  labelIndicatorComponent?: React.ReactElement;
  labelRadius?: number | ((props: SliceProps) => number);
  origin?: OriginType;
  padAngle?: NumberOrCallback;
  radius?: NumberOrCallback;
  startAngle?: number;
  startOffset?: number;
  style?: VictoryStyleInterface;
}

const fallbackProps = {
  endAngle: 360,
  height: 400,
  innerRadius: 0,
  cornerRadius: 0,
  padAngle: 0,
  padding: 30,
  width: 400,
  startAngle: 0,
  colorScale: [
    "#ffffff",
    "#f0f0f0",
    "#d9d9d9",
    "#bdbdbd",
    "#969696",
    "#737373",
    "#525252",
    "#252525",
    "#000000",
  ],
  labelPosition: "centroid",
  labelIndicatorInnerOffset: 15,
  labelIndicatorOuterOffset: 5,
};

const datumHasXandY = (datum) => {
  return !isNil(datum._x) && !isNil(datum._y);
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryPieBase extends EventsMixinClass<VictoryPieProps> {}

class VictoryPieBase extends React.Component<VictoryPieProps> {
  static animationWhitelist: (keyof VictoryPieProps)[] = [
    "data",
    "endAngle",
    "height",
    "innerRadius",
    "cornerRadius",
    "padAngle",
    "padding",
    "colorScale",
    "startAngle",
    "style",
    "width",
  ];

  static displayName = "VictoryPie";

  static role = "pie";

  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: () => ({ _y: 0, label: " " }),
    },
    onEnter: {
      duration: 500,
      before: () => ({ _y: 0, label: " " }),
      after: (datum) => ({
        y_: datum._y,
        label: datum.label,
      }),
    },
  };

  static defaultProps: VictoryPieProps = {
    data: [
      { x: "A", y: 1 },
      { x: "B", y: 2 },
      { x: "C", y: 3 },
      { x: "D", y: 1 },
      { x: "E", y: 2 },
    ],
    standalone: true,
    dataComponent: <Slice />,
    labelComponent: <VictoryLabel />,
    curvedLabelComponent: <CurvedLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <g />,
    sortOrder: "ascending",
    theme: VictoryTheme.grayscale,
  };

  static getBaseProps = (props: VictoryPieProps) =>
    getBaseProps(props, fallbackProps);
  static getData = Data.getData;
  static expectedComponents: (keyof VictoryPieProps)[] = [
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent",
    "labelIndicatorComponent",
  ];

  // Overridden in victory-native
  shouldAnimate() {
    return Boolean(this.props.animate);
  }

  renderComponents(props: VictoryPieProps, shouldRenderDatum = datumHasXandY) {
    const {
      dataComponent,
      labelComponent,
      groupComponent,
      labelIndicator,
      labelPosition,
      labelPlacement,
      curvedLabelComponent,
    } = props;

    if (!groupComponent) {
      throw new Error("VictoryPie expects a groupComponent prop");
    }

    const showIndicator =
      labelIndicator &&
      labelPosition === "centroid" &&
      labelPlacement !== "curved";
    let groupComponentTransform;

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

    // For curved labels, we need to create a path component with id and path value of
    // label arc. We need to pass this id to the href of textPath component which will
    // have label value(tspan) as child component.
    if (labelPlacement === "curved") {
      const labelPathComponents = this.dataKeys.map((_dataKey, index) => {
        const curvedLabelProps = this.getComponentProps(
          curvedLabelComponent,
          "curvedLabels",
          index,
        );

        // create labelPath
        const pathComponent: React.ReactElement = <Path />;
        return React.cloneElement(pathComponent, {
          d: curvedLabelProps.path,
          id: curvedLabelProps.id,
          key: index,
          textAnchor: "middle",
        });
      });
      children.push(...labelPathComponents);

      const curvedLabelComponents = this.dataKeys
        .map((_dataKey, index) => {
          const curvedLabelProps = this.getComponentProps(
            curvedLabelComponent,
            "curvedLabels",
            index,
          );
          groupComponentTransform = curvedLabelProps.transform;
          if (
            (curvedLabelProps as any).text !== undefined &&
            (curvedLabelProps as any).text !== null
          ) {
            return React.cloneElement(curvedLabelComponent, curvedLabelProps);
          }
          return undefined;
        })
        .filter(
          (comp: React.ReactElement | undefined): comp is React.ReactElement =>
            comp !== undefined,
        );
      children.push(...curvedLabelComponents);
    } else if (labelComponent) {
      const labelComponents = this.dataKeys
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

      children.push(...labelComponents);
    }

    if (showIndicator && labelIndicator) {
      let labelIndicatorComponent: React.ReactElement = <LineSegment />;

      if (typeof labelIndicator === "object") {
        // pass user provided react component
        labelIndicatorComponent = labelIndicator;
      }

      const labelIndicatorComponents = this.dataKeys.map((_dataKey, index) => {
        const labelIndicatorProps = this.getComponentProps(
          labelIndicatorComponent,
          "labelIndicators",
          index,
        );
        return React.cloneElement(labelIndicatorComponent, labelIndicatorProps);
      });

      children.push(...labelIndicatorComponents);
    }
    if (labelPlacement === "curved") {
      const groupCloneElement = React.cloneElement(groupComponent, {
        transform: groupComponentTransform,
      });
      return this.renderContainer(groupCloneElement, children);
    }
    return this.renderContainer(groupComponent, children);
  }

  render(): React.ReactElement {
    const { animationWhitelist, role } = VictoryPie;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderComponents(props);

    const component = props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;

    return UserProps.withSafeUserProps(component, props);
  }
}

export const VictoryPie = addEvents(VictoryPieBase);
