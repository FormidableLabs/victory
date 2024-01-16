import React from "react";
import PropTypes from "prop-types";
import * as Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import {
  CommonProps,
  VictoryCommonPrimitiveProps,
} from "../victory-util/common-props";
import { Polyline } from "./polyline";

export interface PolylineSegmentProps extends VictoryCommonPrimitiveProps {
  polylineComponent?: React.ReactElement;
  points: string;
}

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
    assign({ stroke: "black",fill:"none" }, props.style),
    props,
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, { ariaLabel, id, style, tabIndex });
};

const defaultProps = {
  polylineComponent: <Polyline />,
  role: "presentation",
  shapeRendering: "auto",
};

export const PolylineSegment = (props: PolylineSegmentProps) => {
  props = evaluateProps({ ...defaultProps, ...props });

  return React.cloneElement(props.polylineComponent!, {
    ...props.events,
    "aria-label": props.ariaLabel,
    style: props.style,
    tabIndex: props.tabIndex,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    points: props.points,
    transform: props.transform,
    clipPath: props.clipPath,
  });
};

PolylineSegment.propTypes = {
  ...CommonProps.primitiveProps,
  points: PropTypes.string,
  polylineComponent: PropTypes.element,
};
