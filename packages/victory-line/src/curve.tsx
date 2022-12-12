/* eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import {
  Helpers,
  CommonProps,
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
    assign(
      { fill: "none", stroke: "black", pointerEvents: "stroke" },
      props.style,
    ),
    props,
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, { ariaLabel, id, style, tabIndex });
};

export const Curve: React.FC<CurveProps> = (props) => {
  props = evaluateProps(props);
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

Curve.propTypes = {
  ...CommonProps.primitiveProps,
  interpolation: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  openCurve: PropTypes.bool,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  pathComponent: PropTypes.element,
  polar: PropTypes.bool,
};

Curve.defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
};

export interface CurveProps extends VictoryCommonPrimitiveProps {
  ariaLabel?: StringOrCallback;
  // eslint-disable-next-line @typescript-eslint/ban-types
  interpolation?: string | Function;
  openCurve?: boolean;
  pathComponent?: React.ReactElement;
  tabIndex?: NumberOrCallback;
}
