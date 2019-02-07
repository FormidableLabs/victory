/* eslint-disable max-statements */
import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Line } from "victory-core";
import { assign } from "lodash";

export default class ErrorBar extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    borderWidth: PropTypes.number,
    datum: PropTypes.object,
    errorX: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.bool]),
    errorY: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.bool]),
    groupComponent: PropTypes.element,
    lineComponent: PropTypes.element,
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    groupComponent: <g />,
    lineComponent: <Line />
  };

  getStyle(props) {
    const { style, datum, active } = props;
    return Helpers.evaluateStyle(assign({ stroke: "black" }, style), datum, active);
  }

  renderBorder(props, error, type) {
    const {
      x,
      y,
      borderWidth,
      events,
      style,
      role,
      shapeRendering,
      className,
      lineComponent,
      transform,
      id
    } = props;
    const vertical = type === "right" || type === "left";
    const borderProps = {
      role,
      shapeRendering,
      className,
      events,
      style,
      transform,
      key: `${id}-border-${type}`,
      x1: vertical ? error[type] : x - borderWidth,
      x2: vertical ? error[type] : x + borderWidth,
      y1: vertical ? y - borderWidth : error[type],
      y2: vertical ? y + borderWidth : error[type]
    };
    return React.cloneElement(lineComponent, borderProps);
  }

  renderCross(props, error, type) {
    const {
      x,
      y,
      events,
      style,
      role,
      shapeRendering,
      className,
      lineComponent,
      transform,
      id
    } = props;
    const vertical = type === "top" || type === "bottom";
    const borderProps = {
      role,
      shapeRendering,
      className,
      events,
      style,
      transform,
      key: `${id}-cross-${type}`,
      x1: x,
      x2: vertical ? x : error[type],
      y1: y,
      y2: vertical ? error[type] : y
    };
    return React.cloneElement(lineComponent, borderProps);
  }

  calculateError(props) {
    const { errorX, errorY, scale, horizontal } = props;
    const rangeX = horizontal ? scale.y.range() : scale.x.range();
    const rangeY = horizontal ? scale.x.range() : scale.y.range();
    const getError = (error, index) => error ? error[index] : undefined;
    // const positiveErrorX = horizontal ? getError(errorY, 1) : getError(errorX, 0);
    // const negativeErrorX = horizontal ? getError(errorY, 0) : getError(errorX, 1);
    // const positiveErrorY = horizontal ? getError(errorX, 1) : getError(errorY, 1);
    // const negativeErrorY = horizontal ? getError(errorX, 0) : getError(errorY, 0);

    const positiveErrorX = getError(errorX, 0);
    const negativeErrorX = getError(errorX, 1);
    const positiveErrorY = getError(errorY, 1);
    const negativeErrorY = getError(errorY, 0);


    // const result = {
    //   right: positiveErrorX >= rangeX[1] ? rangeX[1] : positiveErrorX,
    //   left: negativeErrorX <= rangeX[0] ? rangeX[0] : negativeErrorX,
    //   top: positiveErrorY >= rangeY[0] ? rangeY[0] : positiveErrorY,
    //   bottom: negativeErrorY <= rangeY[1] ? rangeY[1] : negativeErrorY
    // };
    const result = {
      right: positiveErrorX,
      left: negativeErrorX,
      top: positiveErrorY,
      bottom: negativeErrorY
    };
    console.log(result, props)
    return result
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
