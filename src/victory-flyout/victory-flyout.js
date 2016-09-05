import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers, Style, Log, TextSize } from "../victory-util/index";
import { default as VictoryLabel } from "../victory-label/victory-label"
import { assign, merge, pick } from "lodash";

const defaultStyles = {
  stroke: "black",
  strokeWidth: 2,
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
    width: PropTypes.number,
    height: PropTypes.number,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    pointerHeight: PropTypes.number,
    pointerWidth: PropTypes.number,
    cornerRadius: PropTypes.number
  };

  static defaultProps = {
    active: true,
    cornerRadius: 5,
    pointerHeight: 10,
    pointerWidth: 10,
    orientation: "top"
  }


  getFlyoutPath(props, calculatedValues) {
    const { width, height } = calculatedValues.flyoutDimensions;
    const { pointerHeight, pointerWidth, cornerRadius, x, y} = props;
    const bottomEdge = y - pointerHeight;
    const topEdge = y - pointerHeight - height;
    const rightEdge = x + (width / 2);
    const leftEdge = x - (width / 2);
    // orientation top only
    return `M ${x - pointerWidth / 2}, ${bottomEdge}
      L ${x}, ${y}
      L ${x + pointerWidth / 2}, ${bottomEdge}
      L ${rightEdge - cornerRadius}, ${bottomEdge}
      A ${cornerRadius} ${cornerRadius} 0 0 0 ${rightEdge}, ${bottomEdge - cornerRadius}
      L ${rightEdge}, ${topEdge + cornerRadius}
      A ${cornerRadius} ${cornerRadius} 0 0 0 ${rightEdge - cornerRadius}, ${topEdge}
      L ${leftEdge + cornerRadius}, ${topEdge}
      A ${cornerRadius} ${cornerRadius} 0 0 0 ${leftEdge}, ${topEdge + cornerRadius}
      L ${leftEdge}, ${bottomEdge - cornerRadius}
      A ${cornerRadius} ${cornerRadius} 0 0 0 ${leftEdge + cornerRadius}, ${bottomEdge}
      z`;
  }

  getCalculatedValues(props) {
    const labelStyle = props.labelStyle ?
      merge({}, defaultLabelStyles, props.labelStyle) : defaultLabelStyles;
    const flyoutStyle = props.style ? merge({}, defaultStyles, props.style) : defaultStyles;
    const labelSize = TextSize.approximateTextSize(props.text, labelStyle);
    const flyoutDimensions = this.getDimensions(props, labelSize, labelStyle);
    const flyoutCenter = this.getFlyoutCenter(props, flyoutDimensions);
    return {labelStyle, flyoutStyle, labelSize, flyoutDimensions, flyoutCenter}
  }

  getFlyoutCenter(props, dimensions) {
    const {x, y, pointerHeight, orientation} = props;
    const {height, width} = dimensions;
    const sign = orientation === "right" || orientation === "top" ? 1 : -1
    return {
      x: orientation === "left" || orientation === "right" ?
        x + sign * (pointerHeight + (width / 2)) : x,
      y: orientation === "top" || orientation === "bottom" ?
        y - sign * (pointerHeight + (height / 2)) : y
    };
  }

  getDimensions(props, labelSize, labelStyle) {
    const { height, width, orientation } = props;
    const padding = labelStyle.padding || 0;
    const getHeight = (props, labelSize, orientation) => {
      return orientation === "top" || orientation === "bottom" ?
        labelSize.height + props.pointerHeight : labelSize.height
    };
    const getWidth = (props, labelSize, orientation) => {
      return orientation === "left" || orientation === "right" ?
        labelSize.width + props.pointerHeight : labelSize.width
    };
    return {
      height: props.height || getHeight(props, labelSize, orientation) + padding,
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
    return assign(
      {},
      {
        style: calculatedValues.flyoutStyle,
        d: this.getFlyoutPath(props, calculatedValues)
      },
      props.events
    )
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
