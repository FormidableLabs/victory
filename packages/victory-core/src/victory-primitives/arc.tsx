/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2, 180] }]*/
import React from "react";

import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
import * as Helpers from "../victory-util/helpers";
import { Path } from "./path";

export interface ArcProps extends VictoryCommonPrimitiveProps {
  closedPath?: boolean;
  cx: number;
  cy: number;
  datum?: any;
  endAngle: number;
  pathComponent?: React.ReactElement;
  r: number;
  startAngle: number;
  type?: string;
}

interface InternalArcProps extends ArcProps {
  pathComponent: React.ReactElement;
  role: string;
  shapeRendering: string;
  style: React.CSSProperties;
}

const defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
  style: { stroke: "black", fill: "none" },
};

export const Arc = (props: ArcProps) => {
  const resolvedProps = evaluateProps(props);

  return React.cloneElement(resolvedProps.pathComponent, {
    ...resolvedProps.events,
    "aria-label": resolvedProps.ariaLabel,
    d: getArcPath(resolvedProps),
    style: resolvedProps.style,
    desc: resolvedProps.desc,
    tabIndex: resolvedProps.tabIndex,
    className: resolvedProps.className,
    role: resolvedProps.role,
    shapeRendering: resolvedProps.shapeRendering,
    transform: resolvedProps.transform,
    clipPath: resolvedProps.clipPath,
  });
};

function evaluateProps(props: ArcProps): InternalArcProps {
  const resolvedProps = Helpers.evaluatePrimitiveProps(props);

  return {
    ...defaultProps,
    ...resolvedProps,
  };
}

function getArcPath(props: InternalArcProps) {
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
  const arcStart = closedPath
    ? ` M ${cx}, ${cy} L ${x1}, ${y1}`
    : `M ${x1}, ${y1}`;
  const arc1 = `A ${r}, ${r}, 0, ${largerArcFlag1}, 0, ${x2}, ${y2}`;
  const arc2 = `A ${r}, ${r}, 0, ${largerArcFlag2}, 0, ${x3}, ${y3}`;
  const arcEnd = closedPath ? "Z" : "";
  return `${arcStart} ${arc1} ${arc2} ${arcEnd}`;
}
