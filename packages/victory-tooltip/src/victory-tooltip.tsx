import React from "react";
import {
  TextSize,
  Helpers,
  LabelHelpers,
  VictoryLabel,
  VictoryTheme,
  VictoryPortal,
  VictoryLabelableProps,
  VictoryLabelProps,
  VictoryLabelStyleObject,
  NumberOrCallback,
  PaddingOrCallback,
  VictoryStyleObject,
  OrientationTypes,
  VictoryThemeDefinition,
} from "victory-core";

import defaults from "lodash/defaults";
import uniqueId from "lodash/uniqueId";
import isPlainObject from "lodash/isPlainObject";
import orderBy from "lodash/orderBy";

import { Flyout } from "./flyout";

const fallbackProps = {
  cornerRadius: 5,
  pointerLength: 10,
  pointerWidth: 10,
};

export interface VictoryTooltipProps
  extends VictoryLabelableProps,
    VictoryLabelProps {
  activateData?: boolean;
  active?: boolean;
  activePoints?: any[];
  angle?: number;
  center?: { x?: number; y?: number };
  centerOffset?: {
    x?: NumberOrCallback;
    y?: NumberOrCallback;
  };
  constrainToVisibleArea?: boolean;
  cornerRadius?: NumberOrCallback;
  events?: any;
  height?: number;
  horizontal?: boolean;
  flyoutComponent?: React.ReactElement;
  flyoutHeight?: NumberOrCallback;
  flyoutPadding?: PaddingOrCallback;
  flyoutStyle?: VictoryStyleObject;
  flyoutWidth?: NumberOrCallback;
  id?: number | string;
  index?: number | string;
  orientation?: OrientationTypes | ((...args: any[]) => OrientationTypes);
  pointerLength?: NumberOrCallback;
  pointerOrientation?:
    | OrientationTypes
    | ((...args: any[]) => OrientationTypes);
  pointerWidth?: NumberOrCallback;
  style?:
    | (VictoryLabelStyleObject & {
        angle?: number;
      })
    | VictoryLabelStyleObject[];
  theme?: VictoryThemeDefinition;
  width?: number;
}

type InternalEvaluatedProps = VictoryTooltipProps & {
  centerOffset: { x: number; y: number };
  cornerRadius?: number;
  dx?: string | number;
  dy?: string | number;
  flyoutHeight: number;
  flyoutPadding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  flyoutWidth: number;
  orientation: OrientationTypes;
  pointerLength?: number;
  pointerWidth?: number;
  // TODO: This is a hack to get around the fact that the type of
  // style is used in akward ways in the functions
  style: any;
  text: string | string[];
};

type EventHandlers = Record<
  string,
  (props?: any) => {
    target: string;
    mutation: () => { active?: boolean | undefined };
  }[]
>;

export class VictoryTooltip extends React.Component<VictoryTooltipProps> {
  static displayName = "VictoryTooltip";
  static role = "tooltip";

  static defaultProps = {
    active: false,
    renderInPortal: true,
    labelComponent: <VictoryLabel />,
    flyoutComponent: <Flyout />,
    groupComponent: <g />,
  };

  static defaultEvents(props: VictoryTooltipProps): {
    target: string;
    eventHandlers: EventHandlers;
  }[] {
    const activate = props.activateData
      ? [
          { target: "labels", mutation: () => ({ active: true }) },
          { target: "data", mutation: () => ({ active: true }) },
        ]
      : [{ target: "labels", mutation: () => ({ active: true }) }];
    const deactivate = props.activateData
      ? [
          { target: "labels", mutation: () => ({ active: undefined }) },
          { target: "data", mutation: () => ({ active: undefined }) },
        ]
      : [{ target: "labels", mutation: () => ({ active: undefined }) }];
    return [
      {
        target: "data",
        eventHandlers: {
          onMouseOver: () => activate,
          onFocus: () => activate,
          onTouchStart: () => activate,
          onMouseOut: () => deactivate,
          onBlur: () => deactivate,
          onTouchEnd: () => deactivate,
        },
      },
    ];
  }

  id: string | number;

  constructor(props: VictoryTooltipProps) {
    super(props);
    this.id = props.id === undefined ? uniqueId("tooltip-") : props.id;
  }

  getDefaultOrientation(props: VictoryTooltipProps): OrientationTypes {
    const { datum, horizontal, polar } = props;
    if (!polar) {
      const positive = horizontal ? "right" : "top";
      const negative = horizontal ? "left" : "bottom";
      return datum && datum.y < 0 ? negative : positive;
    }
    return this.getPolarOrientation(props);
  }

  getPolarOrientation(props: VictoryTooltipProps): OrientationTypes {
    const degrees = LabelHelpers.getDegrees(props, props.datum);
    const placement = props.labelPlacement || "vertical";
    if (placement === "vertical") {
      return this.getVerticalOrientations(degrees);
    } else if (placement === "parallel") {
      return degrees < 90 || degrees > 270 ? "right" : "left";
    }
    return degrees > 180 ? "bottom" : "top";
  }

  getVerticalOrientations(degrees: number): OrientationTypes {
    // eslint-disable-next-line no-magic-numbers
    if (degrees < 45 || degrees > 315) {
      return "right";
      // eslint-disable-next-line no-magic-numbers
    } else if (degrees >= 45 && degrees <= 135) {
      return "top";
      // eslint-disable-next-line no-magic-numbers
    } else if (degrees > 135 && degrees < 225) {
      return "left";
    }
    return "bottom";
  }

  getStyles(props) {
    const theme = props.theme || VictoryTheme.grayscale;
    const defaultLabelStyles =
      theme && theme.tooltip && theme.tooltip.style ? theme.tooltip.style : {};
    const baseLabelStyle = Array.isArray(props.style)
      ? props.style.map((s) => defaults({}, s, defaultLabelStyles))
      : defaults({}, props.style, defaultLabelStyles);
    const defaultFlyoutStyles =
      theme && theme.tooltip && theme.tooltip.flyoutStyle
        ? theme.tooltip.flyoutStyle
        : {};
    const baseFlyoutStyle = props.flyoutStyle
      ? defaults({}, props.flyoutStyle, defaultFlyoutStyles)
      : defaultFlyoutStyles;
    const style = Array.isArray(baseLabelStyle)
      ? baseLabelStyle.map((s) => Helpers.evaluateStyle(s, props))
      : Helpers.evaluateStyle(baseLabelStyle, props);
    const flyoutStyle = Helpers.evaluateStyle(
      baseFlyoutStyle,
      Object.assign({}, props, { style }),
    );
    return { style, flyoutStyle };
  }

  getEvaluatedProps(props: VictoryTooltipProps): InternalEvaluatedProps {
    const { cornerRadius, centerOffset, dx, dy } = props;

    const active = Helpers.evaluateProp(props.active, props);

    let text = Helpers.evaluateProp(
      props.text,
      Object.assign({}, props, { active }),
    );
    if (text === undefined || text === null) {
      text = "";
    }
    if (typeof text === "number") {
      text = text.toString();
    }

    const { style, flyoutStyle } = this.getStyles(
      Object.assign({}, props, { active, text }),
    );
    const orientation =
      Helpers.evaluateProp(
        props.orientation,
        Object.assign({}, props, { active, text, style, flyoutStyle }),
      ) || this.getDefaultOrientation(props);

    const padding =
      Helpers.evaluateProp(
        props.flyoutPadding,
        Object.assign({}, props, {
          active,
          text,
          style,
          flyoutStyle,
          orientation,
        }),
      ) || this.getLabelPadding(style);

    const flyoutPadding = Helpers.getPadding(padding);

    const pointerWidth = Helpers.evaluateProp(
      props.pointerWidth,
      Object.assign({}, props, {
        active,
        text,
        style,
        flyoutStyle,
        orientation,
      }),
    );

    const pointerLength = Helpers.evaluateProp(
      props.pointerLength,
      Object.assign({}, props, {
        active,
        text,
        style,
        flyoutStyle,
        orientation,
      }),
    );
    const labelSize = TextSize.approximateTextSize(text, style);

    const { flyoutHeight, flyoutWidth } = this.getDimensions(
      Object.assign({}, props, {
        style,
        flyoutStyle,
        active,
        text,
        orientation,
        flyoutPadding,
        pointerWidth,
        pointerLength,
      }),
      labelSize,
    );

    const evaluatedProps = Object.assign({}, props, {
      active,
      text,
      style,
      flyoutStyle,
      orientation,
      flyoutHeight,
      flyoutWidth,
      flyoutPadding,
      pointerWidth,
      pointerLength,
    });

    const offsetX =
      isPlainObject(centerOffset) && centerOffset?.x !== undefined
        ? Helpers.evaluateProp(centerOffset.x, evaluatedProps)
        : 0;

    const offsetY =
      isPlainObject(centerOffset) && centerOffset?.y !== undefined
        ? Helpers.evaluateProp(centerOffset.y, evaluatedProps)
        : 0;

    return {
      ...evaluatedProps,
      centerOffset: { x: offsetX, y: offsetY },
      dx: dx !== undefined ? Helpers.evaluateProp(dx, evaluatedProps) : 0,
      dy: dy !== undefined ? Helpers.evaluateProp(dy, evaluatedProps) : 0,
      cornerRadius: Helpers.evaluateProp(cornerRadius, evaluatedProps),
    };
  }

  getCalculatedValues(props: InternalEvaluatedProps): {
    style: any;
    flyoutStyle?: VictoryStyleObject;
    labelSize: { width: number; height: number };
    flyoutDimensions: { height: number; width: number };
    flyoutCenter: { x: number; y: number };
    transform?: string;
  } {
    const { style, text, flyoutStyle, flyoutHeight, flyoutWidth } = props;
    const labelSize = TextSize.approximateTextSize(text, style);
    const flyoutDimensions = { height: flyoutHeight, width: flyoutWidth };
    const flyoutCenter = this.getFlyoutCenter(props, flyoutDimensions);
    const transform = this.getTransform(props);
    return {
      style,
      flyoutStyle,
      labelSize,
      flyoutDimensions,
      flyoutCenter,
      transform,
    };
  }

  getTransform(props): string | undefined {
    const { x, y, style } = props;
    const labelStyle = style || {};
    const angle =
      labelStyle.angle || props.angle || this.getDefaultAngle(props);
    return angle ? `rotate(${angle} ${x} ${y})` : undefined;
  }

  getDefaultAngle(props): number {
    const { polar, labelPlacement, orientation, datum } = props;
    if (!polar || !labelPlacement || labelPlacement === "vertical") {
      return 0;
    }
    const degrees = LabelHelpers.getDegrees(props, datum);
    const sign = (degrees > 90 && degrees < 180) || degrees > 270 ? 1 : -1;
    const labelRotation = labelPlacement === "perpendicular" ? 0 : 90;

    let angle = 0;
    if (degrees === 0 || degrees === 180) {
      angle = orientation === "top" && degrees === 180 ? 270 : 90;
    } else if (degrees > 0 && degrees < 180) {
      angle = 90 - degrees;
    } else if (degrees > 180 && degrees < 360) {
      angle = 270 - degrees;
    }
    return angle + sign * labelRotation;
  }

  constrainTooltip(center, props, dimensions) {
    const { x, y } = center;
    const { width, height } = dimensions;
    const extent = {
      x: [0, props.width],
      y: [0, props.height],
    };
    const flyoutExtent = {
      x: [x - width / 2, x + width / 2],
      y: [y - height / 2, y + height / 2],
    };
    const adjustments = {
      x: [
        flyoutExtent.x[0] < extent.x[0] ? extent.x[0] - flyoutExtent.x[0] : 0,
        flyoutExtent.x[1] > extent.x[1] ? flyoutExtent.x[1] - extent.x[1] : 0,
      ],
      y: [
        flyoutExtent.y[0] < extent.y[0] ? extent.y[0] - flyoutExtent.y[0] : 0,
        flyoutExtent.y[1] > extent.y[1] ? flyoutExtent.y[1] - extent.y[1] : 0,
      ],
    };
    return {
      x: Math.round(x + adjustments.x[0] - adjustments.x[1]),
      y: Math.round(y + adjustments.y[0] - adjustments.y[1]),
    };
  }

  getFlyoutCenter(props, dimensions) {
    const {
      x,
      y,
      dx,
      dy,
      pointerLength,
      orientation,
      constrainToVisibleArea,
      centerOffset,
    } = props;
    const { height, width } = dimensions;
    const xSign = orientation === "left" ? -1 : 1;
    const ySign = orientation === "bottom" ? -1 : 1;
    const flyoutCenter = {
      x:
        orientation === "left" || orientation === "right"
          ? x + xSign * (pointerLength + width / 2 + xSign * dx)
          : x + dx,
      y:
        orientation === "top" || orientation === "bottom"
          ? y - ySign * (pointerLength + height / 2 - ySign * dy)
          : y + dy,
    };

    const center = {
      x:
        isPlainObject(props.center) && props.center.x !== undefined
          ? props.center.x
          : flyoutCenter.x,
      y:
        isPlainObject(props.center) && props.center.y !== undefined
          ? props.center.y
          : flyoutCenter.y,
    };

    const centerWithOffset = {
      x: center.x + centerOffset.x,
      y: center.y + centerOffset.y,
    };

    return constrainToVisibleArea
      ? this.constrainTooltip(centerWithOffset, props, dimensions)
      : centerWithOffset;
  }

  getLabelPadding(style) {
    if (!style) {
      return 0;
    }
    const paddings = Array.isArray(style)
      ? style.map((s) => s.padding)
      : [style.padding];
    return Math.max(...paddings, 0);
  }

  getDimensions(props, labelSize) {
    const {
      orientation,
      pointerLength,
      pointerWidth,
      flyoutHeight,
      flyoutWidth,
      flyoutPadding,
    } = props;
    const cornerRadius = Helpers.evaluateProp(props.cornerRadius, props);

    const getHeight = () => {
      const calculatedHeight =
        labelSize.height + flyoutPadding.top + flyoutPadding.bottom;

      const minHeight =
        orientation === "top" || orientation === "bottom"
          ? 2 * cornerRadius
          : 2 * cornerRadius + pointerWidth;
      return Math.max(minHeight, calculatedHeight);
    };

    const getWidth = () => {
      const calculatedWidth =
        labelSize.width + flyoutPadding.left + flyoutPadding.right;

      const minWidth =
        orientation === "left" || orientation === "right"
          ? 2 * cornerRadius + pointerLength
          : 2 * cornerRadius;
      return Math.max(minWidth, calculatedWidth);
    };

    return {
      flyoutHeight: flyoutHeight
        ? Helpers.evaluateProp(flyoutHeight, props)
        : getHeight(),
      flyoutWidth: flyoutWidth
        ? Helpers.evaluateProp(flyoutWidth, props)
        : getWidth(),
    };
  }

  getLabelProps(props: InternalEvaluatedProps, calculatedValues) {
    const { flyoutCenter, style, labelSize, dy = 0, dx = 0 } = calculatedValues;
    const { text, datum, activePoints, labelComponent, index, flyoutPadding } =
      props;
    const textAnchor =
      (Array.isArray(style) && style.length
        ? style[0].textAnchor
        : style.textAnchor) || "middle";
    const getLabelX = () => {
      if (!textAnchor || textAnchor === "middle") {
        return flyoutCenter.x;
      }
      const sign = textAnchor === "end" ? -1 : 1;
      return flyoutCenter.x - sign * (labelSize.width / 2);
    };
    return defaults({}, labelComponent!.props, {
      key: `${this.id}-label-${index}`,
      text,
      datum,
      activePoints,
      textAnchor,
      dy,
      dx,
      style,
      x: getLabelX() + (flyoutPadding.left - flyoutPadding.right) / 2,
      y: flyoutCenter.y + (flyoutPadding.top - flyoutPadding.bottom) / 2,
      verticalAnchor: "middle",
      angle: style.angle,
    });
  }

  getPointerOrientation(
    point: { x: number; y: number },
    center: { x: number; y: number },
    flyoutDimensions: { height: number; width: number },
  ): string {
    const edges = {
      bottom: center.y + flyoutDimensions.height / 2,
      top: center.y - flyoutDimensions.height / 2,
      left: center.x - flyoutDimensions.width / 2,
      right: center.x + flyoutDimensions.width / 2,
    };

    const gaps = [
      { side: "top", val: edges.top > point.y ? edges.top - point.y : -1 },
      {
        side: "bottom",
        val: edges.bottom < point.y ? point.y - edges.bottom : -1,
      },
      {
        side: "right",
        val: edges.right < point.x ? point.x - edges.right : -1,
      },
      { side: "left", val: edges.left > point.x ? edges.left - point.x : -1 },
    ];

    return orderBy(gaps, "val", "desc")[0].side;
  }

  getFlyoutProps(props: InternalEvaluatedProps, calculatedValues) {
    const { flyoutDimensions, flyoutStyle, flyoutCenter } = calculatedValues;
    const {
      x,
      y,
      dx,
      dy,
      datum,
      activePoints,
      index,
      pointerLength,
      pointerWidth,
      cornerRadius,
      events,
      flyoutComponent,
    } = props;
    const pointerOrientation = Helpers.evaluateProp(
      props.pointerOrientation,
      props,
    );
    return defaults({}, flyoutComponent!.props, {
      x,
      y,
      dx,
      dy,
      datum,
      activePoints,
      index,
      pointerLength,
      pointerWidth,
      cornerRadius,
      events,
      orientation:
        pointerOrientation ||
        this.getPointerOrientation(
          { x: x!, y: y! },
          flyoutCenter,
          flyoutDimensions,
        ),
      key: `${this.id}-tooltip-${index}`,
      width: flyoutDimensions.width,
      height: flyoutDimensions.height,
      style: flyoutStyle,
      center: flyoutCenter,
    });
  }

  // Overridden in victory-core-native
  renderTooltip(props: VictoryTooltipProps): React.ReactElement | null {
    const active = Helpers.evaluateProp(props.active, props);
    const { renderInPortal } = props;
    if (!active) {
      return null;
    }
    const evaluatedProps = this.getEvaluatedProps(props);
    const { flyoutComponent, labelComponent, groupComponent } = evaluatedProps;
    const calculatedValues = this.getCalculatedValues(evaluatedProps);
    const children = [
      React.cloneElement(
        flyoutComponent!,
        this.getFlyoutProps(evaluatedProps, calculatedValues),
      ),
      React.cloneElement(
        labelComponent!,
        this.getLabelProps(evaluatedProps, calculatedValues),
      ),
    ];
    const tooltip = React.cloneElement(
      groupComponent!,
      { role: "presentation", transform: calculatedValues.transform },
      children,
    );
    return renderInPortal ? <VictoryPortal>{tooltip}</VictoryPortal> : tooltip;
  }

  render(): React.ReactElement | null {
    const props = Helpers.modifyProps(this.props, fallbackProps, "tooltip");
    return this.renderTooltip(props);
  }
}
