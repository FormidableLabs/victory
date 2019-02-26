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
    const { errorX, errorY } = props;
    const settings = {
      right: { error: errorX, errorIndex: 0 },
      left: { error: errorX, errorIndex: 1 },
      top: { error: errorY, errorIndex: 1 },
      bottom: { error: errorY, errorIndex: 0 }
    };

    const getError = (direction) => {
      const { error, errorIndex } = settings[direction];
      return error ? error[errorIndex] : undefined;
    };

    const result = ["right", "left", "top", "bottom"].reduce((memo, dir) => {
      memo[dir] = getError(dir);
      return memo;
    }, {});
    return result;
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
