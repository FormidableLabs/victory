import React from "react";
import defaults from "lodash/defaults";

import * as Helpers from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
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

  return Object.assign({}, props, { ariaLabel, desc, id, style, tabIndex });
};

const defaultProps = {
  groupComponent: <g />,
  lineComponent: <Line />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Whisker = (initialProps: WhiskerProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
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

  return React.cloneElement(groupComponent, {}, [
    React.cloneElement(
      lineComponent,
      Object.assign(
        { key: "major-whisker", "aria-label": ariaLabel },
        baseProps,
        majorWhisker,
      ),
    ),
    React.cloneElement(
      lineComponent,
      Object.assign(
        { key: "minor-whisker", "aria-label": ariaLabel },
        baseProps,
        minorWhisker,
      ),
    ),
  ]);
};
