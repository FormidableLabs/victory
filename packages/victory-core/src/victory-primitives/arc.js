/*eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2, 180] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "../victory-util/common-props";
import Path from "./path";

const getArcPath = (props) => {
  const { cx, cy, r, startAngle, endAngle, closedPath } = props;
  // Always draw the path as two arcs so that complete circles may be rendered.
  const halfAngle = Math.abs(endAngle - startAngle) / 2 + startAngle;
  const x1 = cx + r * Math.cos(Helpers.degreesToRadians(startAngle));
  const y1 = cy - r * Math.sin(Helpers.degreesToRadians(startAngle));
  const x2 = cx + r * Math.cos(Helpers.degreesToRadians(halfAngle));
  const y2 = cy - r * Math.sin(Helpers.degreesToRadians(halfAngle));
  const x3 = cx + r * Math.cos(Helpers.degreesToRadians(endAngle));
  const y3 = cy - r * Math.sin(Helpers.degreesToRadians(endAngle));
  const largerArcFlag1 = halfAngle - startAngle <= 180 ? 0 : 1;
  const largerArcFlag2 = endAngle - halfAngle <= 180 ? 0 : 1;
  const arcStart = closedPath ? ` M ${cx}, ${cy} L ${x1}, ${y1}` : `M ${x1}, ${y1}`;
  const arc1 = `A ${r}, ${r}, 0, ${largerArcFlag1}, 0, ${x2}, ${y2}`;
  const arc2 = `A ${r}, ${r}, 0, ${largerArcFlag2}, 0, ${x3}, ${y3}`;
  const arcEnd = closedPath ? "Z" : "";
  return `${arcStart} ${arc1} ${arc2} ${arcEnd}`;
};

const Arc = (props) =>
  React.cloneElement(props.pathComponent, {
    ...props.events,
    d: getArcPath(props),
    style: Helpers.evaluateStyle(assign({ stroke: "black", fill: "none" }, props.style), props),
    desc: Helpers.evaluateProp(props.desc, props),
    tabIndex: Helpers.evaluateProp(props.tabIndex, props),
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    transform: props.transform,
    clipPath: props.clipPath
  });

Arc.propTypes = {
  ...CommonProps.primitiveProps,
  closedPath: PropTypes.bool,
  cx: PropTypes.number,
  cy: PropTypes.number,
  datum: PropTypes.any,
  endAngle: PropTypes.number,
  pathComponent: PropTypes.element,
  r: PropTypes.number,
  startAngle: PropTypes.number
};

Arc.defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Arc;
