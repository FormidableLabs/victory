import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "../victory-util/common-props";
import Line from "./line";

const LineSegment = (props) =>
  React.cloneElement(props.lineComponent, {
    ...props.events,
    style: Helpers.evaluateStyle(assign({ stroke: "black" }, props.style), props),
    desc: Helpers.evaluateProp(props.desc, props),
    tabIndex: Helpers.evaluateProp(props.tabIndex, props),
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    x1: props.x1,
    x2: props.x2,
    y1: props.y1,
    y2: props.y2,
    transform: props.transform,
    clipPath: props.clipPath
  });

LineSegment.propTypes = {
  ...CommonProps.primitiveProps,
  datum: PropTypes.any,
  lineComponent: PropTypes.element,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number
};

LineSegment.defaultProps = {
  lineComponent: <Line />,
  role: "presentation",
  shapeRendering: "auto"
};

export default LineSegment;
