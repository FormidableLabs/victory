/* eslint-disable max-statements */
import React from "react";
import PropTypes from "prop-types";
import {
  Helpers,
  CommonProps,
  Line,
  UserProps,
  VictoryCommonPrimitiveProps,
  EventsMixinClass,
} from "victory-core";
import { assign } from "lodash";

const renderBorder = (props, error, type) => {
  const vertical = type === "right" || type === "left";
  return React.cloneElement(props.lineComponent, {
    ...props.events,
    role: props.role,
    shapeRendering: props.shapeRendering,
    className: props.className,
    style: props.style,
    transform: props.transform,
    key: `${props.id}-border-${type}`,
    x1: vertical ? error[type] : props.x - props.borderWidth,
    x2: vertical ? error[type] : props.x + props.borderWidth,
    y1: vertical ? props.y - props.borderWidth : error[type],
    y2: vertical ? props.y + props.borderWidth : error[type],
    "data-type": `border-${type}`,
  });
};

const renderCross = (props, error, type) => {
  const vertical = type === "top" || type === "bottom";
  return React.cloneElement(props.lineComponent, {
    ...props.events,
    role: props.role,
    shapeRendering: props.shapeRendering,
    className: props.className,
    style: props.style,
    transform: props.transform,
    key: `${props.id}-cross-${type}`,
    x1: props.x,
    x2: vertical ? props.x : error[type],
    y1: props.y,
    y2: vertical ? error[type] : props.y,
    "data-type": `cross-${type}`,
  });
};

const calculateError = (props) => {
  const { errorX, errorY } = props;
  const settings = {
    right: { error: errorX, errorIndex: 0 },
    left: { error: errorX, errorIndex: 1 },
    top: { error: errorY, errorIndex: 1 },
    bottom: { error: errorY, errorIndex: 0 },
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
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `ariaLabel`
   * `id`
   * `style`
   * `tabIndex`
   */
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const id = Helpers.evaluateProp(props.id, props);
  const style = Helpers.evaluateStyle(
    assign({ stroke: "black" }, props.style),
    props,
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, { ariaLabel, id, style, tabIndex });
};

export interface ErrorBarProps extends VictoryCommonPrimitiveProps {
  borderWidth?: number;
  datum?: any;
  errorX?: number | any[] | boolean;
  errorY?: number | any[] | boolean;
  groupComponent?: React.ReactElement;
  lineComponent?: React.ReactElement;
  x?: number;
  y?: number;
}

// ErrorProps for calculateError
export interface ErrorProps {
  right?: { error: any; errorIndex: number };
  left?: { error: any; errorIndex: number };
  bottom?: { error: any; errorIndex: number };
  top?: { error: any; errorIndex: number };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ErrorBar extends EventsMixinClass<ErrorBarProps> {}

export const ErrorBar = (props: ErrorBarProps & typeof ErrorBar.default) => {
  props = evaluateProps(props);
  const { groupComponent } = props;
  const userProps = UserProps.getSafeUserProps(props);
  const { tabIndex, ariaLabel } = props;
  const error: ErrorProps = calculateError(props);
  const children = [
    error.right ? renderBorder(props, error, "right") : null,
    error.left ? renderBorder(props, error, "left") : null,
    error.bottom ? renderBorder(props, error, "bottom") : null,
    error.top ? renderBorder(props, error, "top") : null,
    error.right ? renderCross(props, error, "right") : null,
    error.left ? renderCross(props, error, "left") : null,
    error.bottom ? renderCross(props, error, "bottom") : null,
    error.top ? renderCross(props, error, "top") : null,
  ].filter(Boolean);
  return React.cloneElement(
    groupComponent,
    { tabIndex, "aria-label": ariaLabel, ...userProps },
    children,
  );
};

ErrorBar.propTypes = {
  ...CommonProps.primitiveProps,
  borderWidth: PropTypes.number,
  datum: PropTypes.object,
  errorX: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
  ]),
  errorY: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
  ]),
  groupComponent: PropTypes.element,
  lineComponent: PropTypes.element,
  x: PropTypes.number,
  y: PropTypes.number,
};

ErrorBar.defaultProps = {
  groupComponent: <g />,
  lineComponent: <Line />,
  role: "presentation",
  shapeRendering: "auto",
};
