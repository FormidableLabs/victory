import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, TextSize } from "../victory-util/index";
import { default as VictoryLabel } from "../victory-label/victory-label";
import { assign, merge } from "lodash";

const defaultStyles = {
  stroke: "black",
  strokeWidth: 1,
  fill: "f0f0f0"
};

const defaultLabelStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  stroke: "transparent",
  padding: 5
};

export default class VictoryFlyout extends React.Component {
  static displayName = "VictoryFlyout";

  static propTypes = {
    /**
     * Specifies whether the flyout will be displayed
     */
    active: React.PropTypes.bool,
    /**
     * Victory components can pass a datum prop to their label component. This can
     * be used to calculate functional styles, and determine child text
     */
    datum: PropTypes.object,
    /**
     * Labels that apply to an entire data series will recieve the entire series
     * as `data` instead of an individual datum prop.
     */
    data: PropTypes.array,
    /**
     * The events prop attaches arbitrary event handlers to the label component.
     * Event handlers are currently only called with their corresponding events.
     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
     */
    events: PropTypes.object,
    /**
     * all Victory components will pass a text prop to their label component.
     * This defines the content of the label when child nodes are absent. It
     * will be ignored if children are provided.
     */
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func
    ]),
    /**
     * The style prop applies CSS properties to the rendered `<path>` element.
     */
    style: PropTypes.object,
    /**
     * The style prop applies CSS properties to the rendered `<text>` element.
     */
    labelStyle: PropTypes.object,
    /**
     * The x prop defines the x coordinate to use as a basis for horizontal
     * positioning.
     */
    x: PropTypes.number,
    /**
     * The y prop defines the y coordinate to use as a basis for vertical
     * positioning.
     */
    y: PropTypes.number,
    dx: CustomPropTypes.nonNegative,
    dy: CustomPropTypes.nonNegative,
    width: CustomPropTypes.nonNegative,
    height: CustomPropTypes.nonNegative,
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    pointerLength: CustomPropTypes.nonNegative,
    pointerWidth: CustomPropTypes.nonNegative,
    cornerRadius: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    cornerRadius: 5,
    pointerLength: 10,
    pointerWidth: 10,
    orientation: "top",
    dx: 0,
    dy: 0
  }

  getVerticalPath(props, dimensions) {
    const { width, height } = dimensions;
    const { pointerLength, pointerWidth, cornerRadius, orientation} = props;
    const sign = orientation === "top" ? 1 : -1;
    const x = props.x + props.dx;
    const y = props.y - sign * props.dy;
    const pointerEdge = y - (sign * pointerLength);
    const oppositeEdge = y - (sign * pointerLength) - (sign * height);
    const rightEdge = x + (width / 2);
    const leftEdge = x - (width / 2);
    const direction = orientation === "top" ? "0 0 0" : "0 0 1";
    const arc = `${cornerRadius} ${cornerRadius} ${direction}`;
    return `M ${x - pointerWidth / 2}, ${pointerEdge}
      L ${x}, ${y}
      L ${x + pointerWidth / 2}, ${pointerEdge}
      L ${rightEdge - cornerRadius}, ${pointerEdge}
      A ${arc} ${rightEdge}, ${pointerEdge - sign * cornerRadius}
      L ${rightEdge}, ${oppositeEdge + sign * cornerRadius}
      A ${arc} ${rightEdge - cornerRadius}, ${oppositeEdge}
      L ${leftEdge + cornerRadius}, ${oppositeEdge}
      A ${arc} ${leftEdge}, ${oppositeEdge + sign * cornerRadius}
      L ${leftEdge}, ${pointerEdge - sign * cornerRadius}
      A ${arc} ${leftEdge + cornerRadius}, ${pointerEdge}
      z`;
  }

  getHorizontalPath(props, dimensions) {
    const { width, height } = dimensions;
    const { pointerLength, pointerWidth, cornerRadius, orientation} = props;
    const sign = orientation === "right" ? 1 : -1;
    const x = props.x + sign * props.dx;
    const y = props.y - props.dy;
    const pointerEdge = x + sign * pointerLength;
    const oppositeEdge = x + (sign * pointerLength) + (sign * width);
    const bottomEdge = y + height / 2;
    const topEdge = y - height / 2;
    const direction = orientation === "right" ? "0 0 0" : "0 0 1";
    const arc = `${cornerRadius} ${cornerRadius} ${direction}`;
    return `M ${pointerEdge}, ${y - pointerWidth / 2}
      L ${x}, ${y}
      L ${pointerEdge}, ${y + pointerWidth / 2}
      L ${pointerEdge}, ${bottomEdge - cornerRadius}
      A ${arc} ${pointerEdge + sign * cornerRadius}, ${bottomEdge}
      L ${oppositeEdge - sign * cornerRadius}, ${bottomEdge}
      A ${arc} ${oppositeEdge}, ${bottomEdge - cornerRadius}
      L ${oppositeEdge}, ${topEdge + cornerRadius}
      A ${arc} ${oppositeEdge - sign * cornerRadius}, ${topEdge}
      L ${pointerEdge + sign * cornerRadius}, ${topEdge}
      A ${arc} ${pointerEdge}, ${topEdge + cornerRadius}
      z`;
  }

  getFlyoutPath(props, dimensions) {
    const { orientation } = props;
    return orientation === "left" || orientation === "right" ?
      this.getHorizontalPath(props, dimensions) : this.getVerticalPath(props, dimensions);
  }

  getCalculatedValues(props) {
    const labelStyle = props.labelStyle ?
      merge({}, defaultLabelStyles, props.labelStyle) : defaultLabelStyles;
    const flyoutStyle = props.style ? merge({}, defaultStyles, props.style) : defaultStyles;
    const labelSize = TextSize.approximateTextSize(props.text, labelStyle);
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
    const padding = labelStyle.padding || 0;
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
    const { flyoutCenter, labelStyle } = calculatedValues;
    const { text, datum } = props;
    return {
      text, datum,
      style: labelStyle,
      x: flyoutCenter.x,
      y: flyoutCenter.y,
      textAnchor: labelStyle.textAnchor || "middle",
      verticalAnchor: labelStyle.verticalAnchor || "middle",
      angle: labelStyle.angle
    };
  }

  getFlyoutProps(props, calculatedValues) {
    const {flyoutDimensions, flyoutStyle} = calculatedValues;
    return assign(
      {},
      {
        style: flyoutStyle,
        d: this.getFlyoutPath(props, flyoutDimensions)
      },
      props.events
    );
  }

  render() {
    const calculatedValues = this.getCalculatedValues(this.props);
    const labelProps = this.getLabelProps(this.props, calculatedValues);
    const flyoutProps = this.getFlyoutProps(this.props, calculatedValues);
    const group = (
      <g>
        <path {...flyoutProps}/>
        <VictoryLabel {...labelProps}/>
      </g>
    );
    return this.props.active ? group : null;
  }

}
