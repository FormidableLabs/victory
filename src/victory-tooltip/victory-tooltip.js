import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, TextSize, Helpers } from "../victory-util/index";
import { default as VictoryLabel } from "../victory-label/victory-label";
import { Flyout } from "../victory-primitives/index";
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
    /**
     * Specifies whether the flyout will be displayed
     */
    active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    /**
     * Victory components can pass a datum prop to their tooltip component. This can
     * be used to calculate functional styles, and determine child text
     */
    datum: PropTypes.object,
    /**
     * Labels that apply to an entire data series will recieve the entire series
     * as `data` instead of an individual datum prop.
     */
    data: PropTypes.array,
    /**
     * The events prop attaches arbitrary event handlers to the tooltip component.
     * Event handlers are currently only called with their corresponding events.
     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
     */
    events: PropTypes.object,
    /**
     * all Victory components will pass a text prop to their label component.
     * This defines the content of the label.
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
    flyoutStyle: PropTypes.object,
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
    /**
     * The dx prop defines a horizontal shift from the `x` coordinate.
     */
    dx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    /**
     * The dy prop defines a vertical shift from the `y` coordinate.
     */
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    /**
     * The width prop defines the width of the tooltip flyout.
     */
    width: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The height prop defines the height of the tooltip flyout.
     */
    height: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The orientation prop determines which side of the (x, y) coordinate the tooltip
     * be rendered on. This prop can be given as "top", "bottom", "left", "right", or
     * as a function of datum that returns one of these values.
     */
    orientation: PropTypes.oneOfType([
      PropTypes.oneOf(["top", "bottom", "left", "right"]),
      PropTypes.func
    ]),
    /**
     * The pointerLength prop determines the length of the pointer extending from the flyout
     */
    pointerLength: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The pointerLength prop determines the width of the base of the triangular pointer
     * extending from the flyout
     */
    pointerWidth: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The cornerRadius prop determines corner radius of the flyout container
     */
    cornerRadius: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The horizontal prop determines whether to plot the flyouts to the left / right
     * of the (x, y) coordinate rather than top / bottom. This is useful when an orientation
     * prop is not provided, and data will determine the default orientation. i.e. negative
     * values result in a left orientation and positive values will result in a y orientation
     * by default
     */
    horizontal: PropTypes.bool,
    /**
     * The labelComponent prop takes in an entire label component which will be used
     * to create labels for each tooltip. The new element created from
     * the passed labelComponent will be supplied with the following properties:
     * x, y, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
     * any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If labelComponent is omitted,
     * a new VictoryLabel will be created with props described above.
     */
    labelComponent: PropTypes.element,
    /**
     * The flyoutComponent prop takes in an entire flyout component which will be used
     * to create the container path for each tooltip. The new element created from
     * the passed flyoutComponent will be supplied with the following properties:
     * x, y, dx, dy, index, datum, cornerRadius, pointerLength, pointerWidth, width, height,
     * style, and events. Any of these props may be overridden by passing in props to
     * the supplied component, or modified or ignored within the custom component itself.
     * If labelComponent is omitted, a a default Flyout component will be created with
     * props described above.
     */
    flyoutComponent: PropTypes.element,
    /**
     * The groupComponent prop takes an entire component which will be used to
     * create group elements for use within container elements. This prop defaults
     * to a <g> tag.
     */
    groupComponent: PropTypes.element,
    /**
     * Victory components pass an index prop to their tooltip component.
     */
    index: PropTypes.number
  };

  static defaultProps = {
    active: false,
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

  // this will be overridden in victory-core-native
  renderEmpty() {
    return null;
  }

  render() {
    return this.props.active ? this.renderTooltip(this.props) : this.renderEmpty();
  }
}
