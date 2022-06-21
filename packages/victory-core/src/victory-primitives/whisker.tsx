import React from "react";
import { assign } from "lodash";
import PropTypes from "prop-types";
import * as Helpers from "../victory-util/helpers";
import {
  CommonProps,
  VictoryCommonPrimitiveProps,
} from "../victory-util/common-props";
import { Line } from "./line";

export type WhiskerAxes = {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
};

export interface WhiskerProps extends VictoryCommonPrimitiveProps {
  groupComponent?: React.ReactElement;
  lineComponent?: React.ReactElement;
  majorWhisker?: WhiskerAxes;
  minorWhisker?: WhiskerAxes;
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
  const style = Helpers.evaluateStyle(props.style, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, { ariaLabel, desc, id, style, tabIndex });
};

export const Whisker = (props: WhiskerProps) => {
  props = evaluateProps(props);
  const {
    ariaLabel,
    groupComponent,
    lineComponent,
    events,
    className,
    majorWhisker,
    minorWhisker,
    transform,
    clipPath,
    role,
    shapeRendering,
    style,
    desc,
    tabIndex,
  } = props;
  const baseProps = {
    ...events,
    style,
    desc,
    tabIndex,
    className,
    transform,
    clipPath,
    role,
    shapeRendering,
  };

  return React.cloneElement(groupComponent!, {}, [
    React.cloneElement(
      lineComponent!,
      assign(
        { key: "major-whisker", "aria-label": ariaLabel },
        baseProps,
        majorWhisker,
      ),
    ),
    React.cloneElement(
      lineComponent!,
      assign(
        { key: "minor-whisker", "aria-label": ariaLabel },
        baseProps,
        minorWhisker,
      ),
    ),
  ]);
};

Whisker.propTypes = {
  ...CommonProps.primitiveProps,
  groupComponent: PropTypes.element,
  lineComponent: PropTypes.element,
  majorWhisker: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
  }),
  minorWhisker: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
  }),
};

Whisker.defaultProps = {
  groupComponent: <g />,
  lineComponent: <Line />,
  role: "presentation",
  shapeRendering: "auto",
};
