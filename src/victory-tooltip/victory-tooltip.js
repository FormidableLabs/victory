/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";
import TextSize from "../victory-util/textsize";
import Helpers from "../victory-util/helpers";
import VictoryLabel from "../victory-label/victory-label";
import VictoryTheme from "../victory-theme/victory-theme";
import Flyout from "../victory-primitives/flyout";
import VictoryPortal from "../victory-portal/victory-portal";
import { assign, defaults } from "lodash";

const fallbackProps = {
  cornerRadius: 5,
  pointerLength: 10,
  pointerWidth: 10
};

export default class VictoryTooltip extends React.Component {
  static displayName = "VictoryTooltip";

  static propTypes = {
    activateData: PropTypes.bool,
    active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    cornerRadius: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    data: PropTypes.array,
    datum: PropTypes.object,
    dx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    events: PropTypes.object,
    flyoutComponent: PropTypes.element,
    flyoutStyle: PropTypes.object,
    groupComponent: PropTypes.element,
    height: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    horizontal: PropTypes.bool,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelComponent: PropTypes.element,
    orientation: PropTypes.oneOfType([
      PropTypes.oneOf(["top", "bottom", "left", "right"]),
      PropTypes.func
    ]),
    pointerLength: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    pointerWidth: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    renderInPortal: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func,
      PropTypes.array
    ]),
    theme: PropTypes.object,
    width: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    theme: VictoryTheme.grayscale,
    active: false,
    renderInPortal: true,
    labelComponent: <VictoryLabel/>,
    flyoutComponent: <Flyout/>,
    groupComponent: <g/>
  };

  static defaultEvents = [{
    target: "data",
    eventHandlers: {
      onMouseOver: (targetProps) => {
        return [
          {
            target: "labels",
            mutation: () => ({ active: true })
          }, {
            target: "data",
            mutation: () => targetProps.activateData ? ({ active: true }) : ({ active: undefined })
          }
        ];
      },
      onMouseOut: () => {
        return [
          {
            target: "labels",
            mutation: () => ({ active: undefined })
          }, {
            target: "data",
            mutation: () => ({ active: undefined })
          }
        ];
      }
    }
  }];

  getEvaluatedProps(props) {
    const {
      horizontal, datum, pointerLength, pointerWidth, cornerRadius,
      width, height, orientation, dx, dy, text, active
    } = props;

    const style = Array.isArray(props.style) ?
      props.style.map((s) => Helpers.evaluateStyle(s, datum, active)) :
      Helpers.evaluateStyle(props.style, datum, active);
    const flyoutStyle = Helpers.evaluateStyle(props.flyoutStyle, datum, active);
    const padding = flyoutStyle && flyoutStyle.padding || 0;
    const defaultDx = horizontal ? padding : 0;
    const defaultDy = horizontal ? 0 : padding;
    const getDefaultOrientation = () => {
      const positive = horizontal ? "right" : "top";
      const negative = horizontal ? "left" : "bottom";
      return datum && datum.y < 0 ? negative : positive;
    };
    return assign(
      {},
      props,
      {
        style,
        flyoutStyle,
        dx: dx !== undefined ? Helpers.evaluateProp(dx, datum, active) : defaultDx,
        dy: dy !== undefined ? Helpers.evaluateProp(dy, datum, active) : defaultDy,
        cornerRadius: Helpers.evaluateProp(cornerRadius, datum, active),
        pointerLength: Helpers.evaluateProp(pointerLength, datum, active),
        pointerWidth: Helpers.evaluateProp(pointerWidth, datum, active),
        orientation: Helpers.evaluateProp(orientation, datum, active) || getDefaultOrientation(),
        width: Helpers.evaluateProp(width, datum, active),
        height: Helpers.evaluateProp(height, datum, active),
        active: Helpers.evaluateProp(active, datum, active),
        text: Helpers.evaluateProp(text, datum, active)
      }
    );
  }

  getCalculatedValues(props) {
    const { style, text, datum, theme, active } = props;
    const defaultLabelStyles = theme && theme.tooltip && theme.tooltip.style ?
      theme.tooltip.style : {};
    const baseLabelStyle = Array.isArray(style) ?
      style.map((s) => defaults({}, s, defaultLabelStyles)) :
      defaults({}, style, defaultLabelStyles);
    const defaultFlyoutStyles = theme && theme.tooltip && theme.tooltip.flyoutStyle ?
      theme.tooltip.flyoutStyle : {};
    const flyoutStyle = props.flyoutStyle ?
      defaults({}, props.flyoutStyle, defaultFlyoutStyles) : defaultFlyoutStyles;
    const labelStyle = Array.isArray(baseLabelStyle) ?
      baseLabelStyle.map((s) => Helpers.evaluateStyle(s, datum, active)) :
      Helpers.evaluateStyle(baseLabelStyle, datum, active);
    const labelSize = TextSize.approximateTextSize(text, labelStyle);
    const flyoutDimensions = this.getDimensions(props, labelSize, labelStyle);
    const flyoutCenter = this.getFlyoutCenter(props, flyoutDimensions);
    return { labelStyle, flyoutStyle, labelSize, flyoutDimensions, flyoutCenter };
  }

  getFlyoutCenter(props, dimensions) {
    const { x, y, dx, dy, pointerLength, orientation } = props;
    const { height, width } = dimensions;
    const sign = orientation === "right" || orientation === "top" ? 1 : -1;
    return {
      x: orientation === "left" || orientation === "right" ?
        x + sign * (pointerLength + (width / 2) + dx) : x + sign * dx,
      y: orientation === "top" || orientation === "bottom" ?
        y - sign * (pointerLength + (height / 2) + dy) : y - sign * dy
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
      const minHeight = orientation === "top" || orientation === "bottom" ?
        2 * cornerRadius : 2 * cornerRadius + pointerWidth;
      return Math.max(minHeight, calculatedHeight);
    };
    const getWidth = () => {
      const calculatedWidth = labelSize.width + padding;
      const minWidth = orientation === "left" || orientation === "right" ?
        2 * cornerRadius + pointerLength : 2 * cornerRadius;
      return Math.max(minWidth, calculatedWidth);
    };
    return {
      height: props.height || getHeight(props, labelSize, orientation) + (padding / 2),
      width: props.width || getWidth(props, labelSize, orientation) + padding
    };
  }

  getLabelProps(props, calculatedValues) {
    const { flyoutCenter, labelStyle, labelSize, dy, dx } = calculatedValues;
    const { text, datum, labelComponent, index } = props;
    const textAnchor = (Array.isArray(labelStyle) && labelStyle.length ?
      labelStyle[0].textAnchor :
      labelStyle.textAnchor) || "middle";
    const getLabelX = () => {
      const sign = textAnchor === "end" ? -1 : 1;
      return flyoutCenter.x - sign * (labelSize.width / 2);
    };
    return defaults(
      {},
      labelComponent.props,
      {
        key: `label-${index}`,
        text, datum, textAnchor, dy, dx,
        style: labelStyle,
        x: !textAnchor || textAnchor === "middle" ?
          flyoutCenter.x : getLabelX(),
        y: flyoutCenter.y,
        verticalAnchor: "middle",
        angle: labelStyle.angle
      }
    );
  }

  getFlyoutProps(props, calculatedValues) {
    const { flyoutDimensions, flyoutStyle } = calculatedValues;
    const {
      x, y, dx, dy, datum, index, orientation, pointerLength, pointerWidth,
      cornerRadius, events, flyoutComponent
    } = props;
    return defaults(
      {},
      flyoutComponent.props,
      {
        x, y, dx, dy, datum, index, orientation, pointerLength, pointerWidth, cornerRadius, events,
        key: `flyout-${index}`,
        width: flyoutDimensions.width,
        height: flyoutDimensions.height,
        style: flyoutStyle
      }
    );
  }

  // Overridden in victory-core-native
  renderTooltip(props) {
    const evaluatedProps = this.getEvaluatedProps(props);
    const {
      flyoutComponent, labelComponent, groupComponent, active, renderInPortal
    } = evaluatedProps;
    if (!active) {
      return null;
    }
    const calculatedValues = this.getCalculatedValues(evaluatedProps);
    const children = [
      React.cloneElement(flyoutComponent, this.getFlyoutProps(evaluatedProps, calculatedValues)),
      React.cloneElement(labelComponent, this.getLabelProps(evaluatedProps, calculatedValues))
    ];
    const tooltip = React.cloneElement(groupComponent, { role: "presentation" }, children);
    return renderInPortal ? <VictoryPortal>{tooltip}</VictoryPortal> : tooltip;
  }

  render() {
    const props = Helpers.modifyProps((this.props), fallbackProps, "tooltip");
    return this.renderTooltip(props);
  }
}
