/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import Collection from "../victory-util/collection";
import CommonProps from "./common-props";

export default class Flyout extends React.Component {

  static propTypes = {
    ...CommonProps,
    cornerRadius: PropTypes.number,
    datum: PropTypes.object,
    dx: PropTypes.number,
    dy: PropTypes.number,
    height: PropTypes.number,
    orientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    pointerLength: PropTypes.number,
    pointerWidth: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  };

  componentWillMount() {
    const { style, path } = this.calculateAttributes(this.props);
    this.style = style;
    this.path = path;
  }

  shouldComponentUpdate(nextProps) {
    const { style, path } = this.calculateAttributes(nextProps);
    const {
      className, cornerRadius, datum, dx, dy, height, width,
      orientation, pointerLength, pointerWidth, x, y
    } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [cornerRadius, nextProps.cornerRadius],
      [dx, nextProps.dx],
      [dy, nextProps.dy],
      [x, nextProps.x],
      [y, nextProps.y],
      [height, nextProps.height],
      [width, nextProps.width],
      [orientation, nextProps.orientation],
      [pointerLength, nextProps.pointerLength],
      [pointerWidth, nextProps.pointerWidth],
      [path, this.path],
      [style, this.style],
      [datum, nextProps.datum]
    ])) {
      this.style = style;
      this.path = path;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { datum, active, style } = props;
    return {
      style: Helpers.evaluateStyle(style, datum, active),
      path: this.getFlyoutPath(props)
    };
  }


  getVerticalPath(props) {
    const { pointerLength, pointerWidth, cornerRadius, orientation, width, height } = props;
    const sign = orientation === "top" ? 1 : -1;
    const x = props.x + (props.dx || 0);
    const y = props.y - sign * (props.dy || 0);
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

  getHorizontalPath(props) {
    const { pointerLength, pointerWidth, cornerRadius, orientation, width, height } = props;
    const sign = orientation === "right" ? 1 : -1;
    const x = props.x + sign * (props.dx || 0);
    const y = props.y - (props.dy || 0);
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

  getFlyoutPath(props) {
    const orientation = props.orientation || "top";
    return orientation === "left" || orientation === "right" ?
      this.getHorizontalPath(props) : this.getVerticalPath(props);
  }

  // Overridden in victory-core-native
  renderFlyout(path, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        className={className}
        d={path}
        style={style}
        shapeRendering={shapeRendering || "auto"}
        role={role || "presentation"}
        {...events}
      />
    );
  }

  render() {
    return this.renderFlyout(this.path, this.style, this.props.events);
  }
}
