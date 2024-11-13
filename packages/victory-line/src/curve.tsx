/* eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import defaults from "lodash/defaults";

import {
  Helpers,
  Path,
  LineHelpers,
  UserProps,
  StringOrCallback,
  NumberOrCallback,
  VictoryCommonPrimitiveProps,
} from "victory-core";

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
    Object.assign(
      { fill: "none", stroke: "black", pointerEvents: "stroke" },
      props.style,
    ),
    props,
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, { ariaLabel, id, style, tabIndex });
};

const defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Curve: React.FC<CurveProps> = (initialProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
  const userProps = UserProps.getSafeUserProps(props);
  const { polar, origin } = props;
  const lineFunction = LineHelpers.getLineFunction(props);
  const defaultTransform =
    polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
  const d = lineFunction(props.data);

  return React.cloneElement(props.pathComponent!, {
    ...props.events,
    ...userProps,
    "aria-label": props.ariaLabel,
    d,
    style: props.style,
    transform: props.transform || defaultTransform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    clipPath: props.clipPath,
    tabIndex: props.tabIndex,
  });
};

export interface CurveProps extends VictoryCommonPrimitiveProps {
  ariaLabel?: StringOrCallback;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  interpolation?: string | Function;
  openCurve?: boolean;
  pathComponent?: React.ReactElement;
  tabIndex?: NumberOrCallback;
}
