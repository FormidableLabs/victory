import React from "react";
import PropTypes from "prop-types";
import * as Helpers from "../victory-util/helpers";
import {
  CommonProps,
  VictoryCommonPrimitiveProps,
} from "../victory-util/common-props";
import { Rect } from "./rect";
import { Circle } from "./circle";

export interface BackgroundProps extends VictoryCommonPrimitiveProps {
  circleComponent?: React.ReactElement;
  height?: number;
  rectComponent?: React.ReactElement;
  rx?: number;
  ry?: number;
  width?: number;
  x?: number;
  y?: number;
}

const evaluateProps = (props) => {
  /**
   * Potential evaluated prop is:
   * `id`
   */
  const id = Helpers.evaluateProp(props.id, props);

  return Object.assign({}, props, { id });
};

const defaultProps = {
  circleComponent: <Circle />,
  rectComponent: <Rect />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Background = (initialProps: BackgroundProps) => {
  const props = evaluateProps({ ...defaultProps, ...initialProps });

  return props.polar
    ? React.cloneElement(props.circleComponent!, {
        ...props.events,
        style: props.style,
        role: props.role,
        shapeRendering: props.shapeRendering,
        cx: props.x,
        cy: props.y,
        r: props.height,
        className: props.className,
      })
    : React.cloneElement(props.rectComponent!, {
        ...props.events,
        style: props.style,
        role: props.role,
        shapeRendering: props.shapeRendering,
        x: props.x,
        y: props.y,
        rx: props.rx,
        ry: props.ry,
        width: props.width,
        height: props.height,
        className: props.className,
      });
};

Background.propTypes = {
  ...CommonProps.primitiveProps,
  circleComponent: PropTypes.element,
  height: PropTypes.number,
  rectComponent: PropTypes.element,
  rx: PropTypes.number,
  ry: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};
