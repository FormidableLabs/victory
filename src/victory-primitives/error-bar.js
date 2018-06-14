/* eslint-disable max-statements */
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "./common-props";
import Line from "./line";


export default class ErrorBar extends React.Component {
  static propTypes = {
    ...CommonProps,
    borderWidth: PropTypes.number,
    datum: PropTypes.object,
    errorX: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.bool
    ]),
    errorY: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.bool
    ]),
    groupComponent: PropTypes.element,
    lineComponent: PropTypes.element,
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    groupComponent: <g/>,
    lineComponent: <Line/>
  }

  getStyle(props) {
    const { style, datum, active } = props;
    return Helpers.evaluateStyle(assign({ stroke: "black" }, style), datum, active);
  }

  renderBorder(props, error, type) {
    const {
      x, y, borderWidth, events, style, role, shapeRendering, className, lineComponent
    } = props;
    const vertical = type === "right" || type === "left";
    const borderProps = {
      role, shapeRendering, className, events, style,
      key: `border-${type}`,
      x1: vertical ? error[type] : x - borderWidth,
      x2: vertical ? error[type] : x + borderWidth,
      y1: vertical ? y - borderWidth : error[type],
      y2: vertical ? y + borderWidth : error[type]
    };
    return React.cloneElement(lineComponent, borderProps);
  }

  renderCross(props, error, type) {
    const { x, y, events, style, role, shapeRendering, className, lineComponent } = props;
    const vertical = type === "top" || type === "bottom";
    const borderProps = {
      role, shapeRendering, className, events, style,
      key: `cross-${type}`,
      x1: x,
      x2: vertical ? x : error[type],
      y1: y,
      y2: vertical ? error[type] : y
    };
    return React.cloneElement(lineComponent, borderProps);
  }

  calculateError(props) {
    const { errorX, errorY, scale } = props;
    const rangeX = scale.x.range();
    const rangeY = scale.y.range();
    const positiveErrorX = errorX ? errorX[0] : undefined;
    const negativeErrorX = errorX ? errorX[1] : undefined;
    const positiveErrorY = errorY ? errorY[1] : undefined;
    const negativeErrorY = errorY ? errorY[0] : undefined;

    return {
      right: positiveErrorX >= rangeX[1] ? rangeX[1] : positiveErrorX,
      left: negativeErrorX <= rangeX[0] ? rangeX[0] : negativeErrorX,
      top: positiveErrorY >= rangeY[0] ? rangeY[0] : positiveErrorY,
      bottom: negativeErrorY <= rangeY[1] ? rangeY[1] : negativeErrorY
    };
  }

  render() {
    const props = assign({}, this.props, { style: this.getStyle(this.props) });
    const error = this.calculateError(props);
    const children = [
      error.right ? this.renderBorder(props, error, "right") : null,
      error.left ? this.renderBorder(props, error, "left") : null,
      error.bottom ? this.renderBorder(props, error, "bottom") : null,
      error.top ? this.renderBorder(props, error, "top") : null,
      error.right ? this.renderCross(props, error, "right") : null,
      error.left ? this.renderCross(props, error, "left") : null,
      error.bottom ? this.renderCross(props, error, "bottom") : null,
      error.top ? this.renderCross(props, error, "top") : null
    ].filter(Boolean);
    return React.cloneElement(props.groupComponent, {}, children);
  }
}
