import React from "react";
import PropTypes from "prop-types";
import {
  PropTypes as CustomPropTypes,
  TextSize,
  Helpers,
  LabelHelpers,
  VictoryLabel,
  VictoryTheme,
  VictoryPortal
} from "victory-core";
import Flyout from "./flyout";
import { assign, defaults, uniqueId } from "lodash";

const fallbackProps = {
  cornerRadius: 5,
  pointerLength: 10,
  pointerWidth: 10
};

export default class VictoryTooltip extends React.Component {
  static displayName = "VictoryTooltip";

  static propTypes = {
    activateData: PropTypes.bool,
    active: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    angle: PropTypes.number,
    cornerRadius: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
    data: PropTypes.array,
    datum: PropTypes.object,
    dx: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    dy: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    events: PropTypes.object,
    flyoutComponent: PropTypes.element,
    flyoutStyle: PropTypes.object,
    groupComponent: PropTypes.element,
    height: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
    horizontal: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelComponent: PropTypes.element,
    orientation: PropTypes.oneOfType([
      PropTypes.oneOf(["top", "bottom", "left", "right"]),
      PropTypes.func
    ]),
    pointerLength: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
    pointerWidth: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
    polar: PropTypes.bool,
    renderInPortal: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func,
      PropTypes.array
    ]),
    theme: PropTypes.object,
    width: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    active: false,
    renderInPortal: true,
    labelComponent: <VictoryLabel />,
    flyoutComponent: <Flyout />,
    groupComponent: <g />
  };

  static defaultEvents = (props) => {
    return [
      {
        target: "data",
        eventHandlers: {
          onMouseOver: () => {
            return props.activateData
              ? [
                  { target: "labels", mutation: () => ({ active: true }) },
                  { target: "data", mutation: () => ({ active: true }) }
                ]
              : [{ target: "labels", mutation: () => ({ active: true }) }];
          },
          onTouchStart: () => {
            return props.activateData
              ? [
                  { target: "labels", mutation: () => ({ active: true }) },
                  { target: "data", mutation: () => ({ active: true }) }
                ]
              : [{ target: "labels", mutation: () => ({ active: true }) }];
          },
          onMouseOut: () => {
            return props.activateData
              ? [
                  { target: "labels", mutation: () => ({ active: undefined }) },
                  { target: "data", mutation: () => ({ active: undefined }) }
                ]
              : [{ target: "labels", mutation: () => ({ active: undefined }) }];
          },
          onTouchEnd: () => {
            return props.activateData
              ? [
                  { target: "labels", mutation: () => ({ active: undefined }) },
                  { target: "data", mutation: () => ({ active: undefined }) }
                ]
              : [{ target: "labels", mutation: () => ({ active: undefined }) }];
          }
        }
      }
    ];
  };

  constructor(props) {
    super(props);
    this.id = props.id === undefined ? uniqueId("tooltip-") : props.id;
  }

  getDefaultOrientation(props) {
    const { datum, horizontal, polar } = props;
    if (!polar) {
      const positive = horizontal ? "right" : "top";
      const negative = horizontal ? "left" : "bottom";
      return datum && datum.y < 0 ? negative : positive;
    } else {
      return this.getPolarOrientation(props, datum);
    }
  }

  getPolarOrientation(props, datum) {
    const degrees = LabelHelpers.getDegrees(props, datum);
    const placement = props.labelPlacement || "vertical";
    if (placement === " vertical") {
      return this.getVerticalOrientations(degrees);
    } else if (placement === "parallel") {
      return degrees < 90 || degrees > 270 ? "right" : "left";
    } else {
      return degrees > 180 ? "bottom" : "top";
    }
  }

  getVerticalOrientations(degrees) {
    // eslint-disable-next-line no-magic-numbers
    if (degrees < 45 || degrees > 315) {
      return "right";
      // eslint-disable-next-line no-magic-numbers
    } else if (degrees >= 45 && degrees <= 135) {
      return "top";
      // eslint-disable-next-line no-magic-numbers
    } else if (degrees > 135 && degrees < 225) {
      return "left";
    } else {
      return "bottom";
    }
  }

  getEvaluatedProps(props) {
    const {
      horizontal,
      datum,
      pointerLength,
      pointerWidth,
      cornerRadius,
      width,
      height,
      dx,
      dy,
      text,
      active
    } = props;

    const style = Array.isArray(props.style)
      ? props.style.map((s) => Helpers.evaluateStyle(s, datum, active))
      : Helpers.evaluateStyle(props.style, datum, active);
    const flyoutStyle = Helpers.evaluateStyle(props.flyoutStyle, datum, active);
    const padding = (flyoutStyle && flyoutStyle.padding) || 0;
    const defaultDx = horizontal ? padding : 0;
    const defaultDy = horizontal ? 0 : padding;
    const orientation =
      Helpers.evaluateProp(props.orientation, datum, active) || this.getDefaultOrientation(props);
    return assign({}, props, {
      style,
      flyoutStyle,
      orientation,
      dx: dx !== undefined ? Helpers.evaluateProp(dx, datum, active) : defaultDx,
      dy: dy !== undefined ? Helpers.evaluateProp(dy, datum, active) : defaultDy,
      cornerRadius: Helpers.evaluateProp(cornerRadius, datum, active),
      pointerLength: Helpers.evaluateProp(pointerLength, datum, active),
      pointerWidth: Helpers.evaluateProp(pointerWidth, datum, active),
      width: Helpers.evaluateProp(width, datum, active),
      height: Helpers.evaluateProp(height, datum, active),
      active: Helpers.evaluateProp(active, datum, active),
      text: Helpers.evaluateProp(text, datum, active)
    });
  }

  getCalculatedValues(props) {
    const { style, text, datum, active } = props;
    const theme = props.theme || VictoryTheme.grayscale;
    const defaultLabelStyles =
      theme && theme.tooltip && theme.tooltip.style ? theme.tooltip.style : {};
    const baseLabelStyle = Array.isArray(style)
      ? style.map((s) => defaults({}, s, defaultLabelStyles))
      : defaults({}, style, defaultLabelStyles);
    const defaultFlyoutStyles =
      theme && theme.tooltip && theme.tooltip.flyoutStyle ? theme.tooltip.flyoutStyle : {};
    const flyoutStyle = props.flyoutStyle
      ? defaults({}, props.flyoutStyle, defaultFlyoutStyles)
      : defaultFlyoutStyles;
    const labelStyle = Array.isArray(baseLabelStyle)
      ? baseLabelStyle.map((s) => Helpers.evaluateStyle(s, datum, active))
      : Helpers.evaluateStyle(baseLabelStyle, datum, active);
    const labelSize = TextSize.approximateTextSize(text, labelStyle);
    const flyoutDimensions = this.getDimensions(props, labelSize, labelStyle);
    const flyoutCenter = this.getFlyoutCenter(props, flyoutDimensions);
    const transform = this.getTransform(props);
    return {
      labelStyle,
      flyoutStyle,
      labelSize,
      flyoutDimensions,
      flyoutCenter,
      transform
    };
  }

  getTransform(props) {
    const { x, y, style } = props;
    const labelStyle = style || {};
    const angle = labelStyle.angle || props.angle || this.getDefaultAngle(props);
    return angle ? `rotate(${angle} ${x} ${y})` : undefined;
  }

  // eslint-disable-next-line complexity
  getDefaultAngle(props) {
    const { polar, labelPlacement, orientation, datum } = props;
    if (!polar || !labelPlacement || labelPlacement === "vertical") {
      return 0;
    }
    const degrees = LabelHelpers.getDegrees(props, datum);
    const sign = (degrees > 90 && degrees < 180) || degrees > 270 ? 1 : -1;
    const labelRotation = labelPlacement === "perpendicular" ? 0 : 90;
    let angle;
    if (degrees === 0 || degrees === 180) {
      angle = orientation === "top" && degrees === 180 ? 270 : 90;
    } else if (degrees > 0 && degrees < 180) {
      angle = 90 - degrees;
    } else if (degrees > 180 && degrees < 360) {
      angle = 270 - degrees;
    }
    return angle + sign * labelRotation;
  }

  getFlyoutCenter(props, dimensions) {
    const { x, y, dx, dy, pointerLength, orientation } = props;
    const { height, width } = dimensions;
    const xSign = orientation === "left" ? -1 : 1;
    const ySign = orientation === "bottom" ? -1 : 1;
    return {
      x:
        orientation === "left" || orientation === "right"
          ? x + xSign * (pointerLength + width / 2 + dx)
          : x + dx,
      y:
        orientation === "top" || orientation === "bottom"
          ? y - ySign * (pointerLength + height / 2 + dy)
          : y - dy
    };
  }

  getLabelPadding(style) {
    if (!style) {
      return 0;
    }
    const paddings = Array.isArray(style) ? style.map((s) => s.padding) : [style.padding];
    return Math.max(...paddings, 0);
  }

  getDimensions(props, labelSize, labelStyle) {
    const { orientation, cornerRadius, pointerLength, pointerWidth } = props;
    const padding = this.getLabelPadding(labelStyle);
    const getHeight = () => {
      const calculatedHeight = labelSize.height + padding;
      const minHeight =
        orientation === "top" || orientation === "bottom"
          ? 2 * cornerRadius
          : 2 * cornerRadius + pointerWidth;
      return Math.max(minHeight, calculatedHeight);
    };
    const getWidth = () => {
      const calculatedWidth = labelSize.width + padding;
      const minWidth =
        orientation === "left" || orientation === "right"
          ? 2 * cornerRadius + pointerLength
          : 2 * cornerRadius;
      return Math.max(minWidth, calculatedWidth);
    };
    return {
      height: props.height || getHeight(props, labelSize, orientation) + padding / 2,
      width: props.width || getWidth(props, labelSize, orientation) + padding
    };
  }

  getLabelProps(props, calculatedValues) {
    const { flyoutCenter, labelStyle, labelSize, dy, dx } = calculatedValues;
    const { text, datum, labelComponent, index } = props;
    const textAnchor =
      (Array.isArray(labelStyle) && labelStyle.length
        ? labelStyle[0].textAnchor
        : labelStyle.textAnchor) || "middle";
    const getLabelX = () => {
      const sign = textAnchor === "end" ? -1 : 1;
      return flyoutCenter.x - sign * (labelSize.width / 2);
    };
    return defaults({}, labelComponent.props, {
      key: `${this.id}-label-${index}`,
      text,
      datum,
      textAnchor,
      dy,
      dx,
      style: labelStyle,
      x: !textAnchor || textAnchor === "middle" ? flyoutCenter.x : getLabelX(),
      y: flyoutCenter.y,
      verticalAnchor: "middle",
      angle: labelStyle.angle
    });
  }

  getFlyoutProps(props, calculatedValues) {
    const { flyoutDimensions, flyoutStyle } = calculatedValues;
    const {
      x,
      y,
      dx,
      dy,
      datum,
      index,
      orientation,
      pointerLength,
      pointerWidth,
      cornerRadius,
      events,
      flyoutComponent
    } = props;
    return defaults({}, flyoutComponent.props, {
      x,
      y,
      dx,
      dy,
      datum,
      index,
      orientation,
      pointerLength,
      pointerWidth,
      cornerRadius,
      events,
      key: `${this.id}-tooltip-${index}`,
      width: flyoutDimensions.width,
      height: flyoutDimensions.height,
      style: flyoutStyle
    });
  }

  // Overridden in victory-core-native
  renderTooltip(props) {
    const evaluatedProps = this.getEvaluatedProps(props);
    const {
      flyoutComponent,
      labelComponent,
      groupComponent,
      active,
      renderInPortal
    } = evaluatedProps;
    if (!active) {
      return renderInPortal ? <VictoryPortal>{null}</VictoryPortal> : null;
    }
    const calculatedValues = this.getCalculatedValues(evaluatedProps);
    const children = [
      React.cloneElement(flyoutComponent, this.getFlyoutProps(evaluatedProps, calculatedValues)),
      React.cloneElement(labelComponent, this.getLabelProps(evaluatedProps, calculatedValues))
    ];
    const tooltip = React.cloneElement(
      groupComponent,
      { role: "presentation", transform: calculatedValues.transform },
      children
    );
    return renderInPortal ? <VictoryPortal>{tooltip}</VictoryPortal> : tooltip;
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "tooltip");
    return this.renderTooltip(props);
  }
}
