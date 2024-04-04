import React from "react";
import { defaults } from "lodash";

import * as Helpers from "../victory-util/helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
import { Rect } from "./rect";

export interface BorderProps extends VictoryCommonPrimitiveProps {
  width?: number;
  height?: number;
  rectComponent?: React.ReactElement;
  x?: number;
  y?: number;
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
    Object.assign({ fill: "none" }, props.style),
    props,
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, { ariaLabel, desc, id, style, tabIndex });
};

const defaultProps = {
  rectComponent: <Rect />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Border = (initialProps: BorderProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));

  return React.cloneElement(props.rectComponent!, {
    ...props.events,
    "aria-label": props.ariaLabel,
    style: props.style,
    desc: props.desc,
    tabIndex: props.tabIndex,
    transform: props.transform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    clipPath: props.clipPath,
  });
};
