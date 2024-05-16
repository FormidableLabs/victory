import React from "react";
import { defaults } from "lodash";

import * as Helpers from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
import { Line } from "./line";

export interface LineSegmentProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  lineComponent?: React.ReactElement;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `ariaLabel`
   * `desc`
   * `id`
   * `style`
   * `tabIndex`
   */
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const style = Helpers.evaluateStyle(
    Object.assign({ stroke: "black" }, props.style),
    props,
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, { ariaLabel, desc, id, style, tabIndex });
};

const defaultProps = {
  lineComponent: <Line />,
  role: "presentation",
  shapeRendering: "auto",
};

export const LineSegment = (initialProps: LineSegmentProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));

  return React.cloneElement(props.lineComponent!, {
    ...props.events,
    "aria-label": props.ariaLabel,
    style: props.style,
    desc: props.desc,
    tabIndex: props.tabIndex,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    x1: props.x1,
    x2: props.x2,
    y1: props.y1,
    y2: props.y2,
    transform: props.transform,
    clipPath: props.clipPath,
  });
};
