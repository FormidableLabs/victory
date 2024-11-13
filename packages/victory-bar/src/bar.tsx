import React, { forwardRef } from "react";
import defaults from "lodash/defaults";
import {
  Helpers,
  NumberOrCallback,
  Path,
  VictoryCommonPrimitiveProps,
} from "victory-core";
import { getStyle, getBarWidth, getCornerRadius } from "./bar-helper-methods";
import { getPolarBarPath, getBarPath } from "./path-helper-methods";
import {
  VictoryBarAlignmentType,
  VictoryBarCornerRadiusObject,
} from "./victory-bar";

export interface BarProps extends VictoryCommonPrimitiveProps {
  alignment?: VictoryBarAlignmentType;
  barOffset?: number[];
  barRatio?: number;
  barWidth?: NumberOrCallback;
  cornerRadius?: NumberOrCallback | VictoryBarCornerRadiusObject;
  datum?: any;
  getPath?: (props: BarProps) => string;
  horizontal?: boolean;
  pathComponent?: React.ReactElement;
  width?: number;
  x?: number;
  y?: number;
  y0?: number;
}

const evaluateProps = (props: BarProps) => {
  /**
   * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `barWidth`
   * 3) `cornerRadius`
   *
   * Everything else does not have to be evaluated in a particular order:
   * `ariaLabel`
   * `desc`
   * `id`
   * `tabIndex`
   */
  const style = getStyle(props.style, props);
  const barWidth = getBarWidth(
    props.barWidth,
    Object.assign({}, props, { style }),
  );
  const cornerRadius = getCornerRadius(
    props.cornerRadius,
    Object.assign({}, props, { style, barWidth }),
  );

  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, {
    ariaLabel,
    style,
    barWidth,
    cornerRadius,
    desc,
    id,
    tabIndex,
  });
};

const defaultProps: Partial<BarProps> = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Bar = forwardRef<SVGPathElement, BarProps>(
  // eslint-disable-next-line prefer-arrow-callback
  function Bar(initialProps, ref) {
    const props = evaluateProps(defaults({}, initialProps, defaultProps));
    const { polar, origin, style, barWidth, cornerRadius } = props;

    const path = polar
      ? getPolarBarPath(props, cornerRadius)
      : getBarPath(props, barWidth, cornerRadius);
    const defaultTransform =
      polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;

    if (!props.pathComponent) {
      return null;
    }

    return React.cloneElement(props.pathComponent, {
      ...props.events,
      "aria-label": props.ariaLabel,
      style,
      d: path,
      className: props.className,
      clipPath: props.clipPath,
      desc: props.desc,
      index: props.index,
      role: props.role,
      shapeRendering: props.shapeRendering,
      transform: props.transform || defaultTransform,
      tabIndex: props.tabIndex,
      ref,
    });
  },
);
