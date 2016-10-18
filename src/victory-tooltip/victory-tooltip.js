import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, TextSize, Helpers } from "../victory-util/index";
import { default as VictoryLabel } from "../victory-label/victory-label";
import { Flyout } from "../victory-primitives/index";
import { default as VictoryPortal} from "../victory-portal/victory-portal";
import { assign, defaults } from "lodash";

const defaultStyles = {
  stroke: "black",
  strokeWidth: 1,
  fill: "#f0f0f0"
};

const defaultLabelStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  stroke: "transparent",
  padding: 5
};

export default class VictoryTooltip extends React.Component {
  static displayName = "VictoryTooltip";

  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    datum: PropTypes.object,
    data: PropTypes.array,
    events: PropTypes.object,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func
    ]),
    style: PropTypes.object,
    flyoutStyle: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    dx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    width: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    height: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
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
    cornerRadius: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    horizontal: PropTypes.bool,
    labelComponent: PropTypes.element,
    flyoutComponent: PropTypes.element,
    groupComponent: PropTypes.element,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    renderInPortal: PropTypes.bool
  };

  static defaultProps = {
    active: false,
    renderInPortal: true,
    cornerRadius: 5,
    pointerLength: 10,
    pointerWidth: 10,
    labelComponent: <VictoryLabel/>,
    flyoutComponent: <Flyout/>,
    groupComponent: <g/>
  };

  static defaultEvents = [{
    target: "data",
    eventHandlers: {
      onMouseOver: () => {
        return {
          target: "labels",
          mutation: () => {
            return { active: true };
          }
        };
      },
      onMouseOut: () => {
        return {
          target: "labels",
          mutation: () => {
            return { active: false };
          }
        };
      }
    }
  }];

  getEvaluatedProps(props) {
    const {
      horizontal, datum, pointerLength, pointerWidth, cornerRadius,
      width, height, orientation, dx, dy, text, active
    } = props;
    const style = Helpers.evaluateStyle(props.style, datum);
    const flyoutStyle = Helpers.evaluateStyle(props.flyoutStyle, datum);
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
        dx: dx !== undefined ? Helpers.evaluateProp(dx, datum) : defaultDx,
        dy: dy !== undefined ? Helpers.evaluateProp(dy, datum) : defaultDy,
        cornerRadius: Helpers.evaluateProp(cornerRadius, datum),
        pointerLength: Helpers.evaluateProp(pointerLength, datum),
        pointerWidth: Helpers.evaluateProp(pointerWidth, datum),
        orientation: Helpers.evaluateProp(orientation, datum) || getDefaultOrientation(),
        width: Helpers.evaluateProp(width, datum),
        height: Helpers.evaluateProp(height, datum),
        active: Helpers.evaluateProp(active, datum),
        text: Helpers.evaluateProp(text, datum)
      }
    );
  }

  getCalculatedValues(props) {
    const { style, text, datum } = props;
    const baseLabelStyle = style ?
      defaults({}, style, defaultLabelStyles) : defaultLabelStyles;
    const baseFlyoutStyle = props.flyoutStyle ?
      defaults({}, props.flyoutStyle, defaultStyles) : defaultStyles;
    const labelStyle = Helpers.evaluateStyle(baseLabelStyle, datum);
    const flyoutStyle = Helpers.evaluateStyle(baseFlyoutStyle, datum);
    const labelSize = TextSize.approximateTextSize(text, labelStyle);
    const flyoutDimensions = this.getDimensions(props, labelSize, labelStyle);
    const flyoutCenter = this.getFlyoutCenter(props, flyoutDimensions);
    return {labelStyle, flyoutStyle, labelSize, flyoutDimensions, flyoutCenter};
  }

  getFlyoutCenter(props, dimensions) {
    const {x, y, dx, dy, pointerLength, orientation} = props;
    const {height, width} = dimensions;
    const sign = orientation === "right" || orientation === "top" ? 1 : -1;
    return {
      x: orientation === "left" || orientation === "right" ?
        x + sign * (pointerLength + (width / 2) + dx) : x + sign * dx,
      y: orientation === "top" || orientation === "bottom" ?
        y - sign * (pointerLength + (height / 2) + dy) : y - sign * dy
    };
  }

  getDimensions(props, labelSize, labelStyle) {
    const { orientation, cornerRadius, pointerLength, pointerWidth } = props;
    const padding = labelStyle && labelStyle.padding || 0;
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
    const { flyoutCenter, labelStyle, labelSize, flyoutDimensions } = calculatedValues;
    const { text, datum, labelComponent, index } = props;
    const textAnchor = labelStyle.textAnchor || "middle";
    const getLabelX = () => {
      const sign = textAnchor === "end" ? -1 : 1;
      return flyoutCenter.x - sign * (flyoutDimensions.width - labelSize.width);
    };
    return defaults(
      {},
      labelComponent.props,
      {
        key: `label-${index}`,
        text, datum, textAnchor,
        style: labelStyle,
        x: !labelStyle.textAnchor || labelStyle.textAnchor === "middle" ?
          flyoutCenter.x : getLabelX(),
        y: flyoutCenter.y,
        verticalAnchor: "middle",
        angle: labelStyle.angle
      }
    );
  }

  getFlyoutProps(props, calculatedValues) {
    const {flyoutDimensions, flyoutStyle} = calculatedValues;
    const {
      x, y, dx, dy, orientation, pointerLength, pointerWidth, cornerRadius,
      events, flyoutComponent, index
    } = props;
    return defaults(
      {},
      flyoutComponent.props,
      {
        x, y, dx, dy, orientation, pointerLength, pointerWidth, cornerRadius, events,
        key: `flyout-${index}`,
        width: flyoutDimensions.width,
        height: flyoutDimensions.height,
        style: flyoutStyle
      }
    );
  }

  renderTooltip(props) {
    const evaluatedProps = this.getEvaluatedProps(props);
    const { flyoutComponent, labelComponent, groupComponent } = evaluatedProps;
    const calculatedValues = this.getCalculatedValues(evaluatedProps);
    const children = [
      React.cloneElement(flyoutComponent, this.getFlyoutProps(evaluatedProps, calculatedValues)),
      React.cloneElement(labelComponent, this.getLabelProps(evaluatedProps, calculatedValues))
    ];
    return React.cloneElement(groupComponent, { role: "presentation" }, children);
  }

  // Overridden in victory-core-native
  render() {
    const { active, renderInPortal } = this.props;
    const tooltip = active ? this.renderTooltip(this.props) : null;
    return renderInPortal ? <VictoryPortal>{tooltip}</VictoryPortal> : tooltip;
  }
}
