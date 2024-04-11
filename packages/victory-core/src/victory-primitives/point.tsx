import React from "react";
import { defaults } from "lodash";

import * as Helpers from "../victory-util/helpers";
import * as pathHelpers from "../victory-util/point-path-helpers";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";
import * as UserProps from "../victory-util/user-props";
import { Path } from "./path";
import { ScatterSymbolType } from "./types";

export interface PointProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  getPath?: (x: number, y: number, size: number) => string;
  pathComponent?: React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/ban-types
  size?: number | Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  symbol?: ScatterSymbolType | Function;
  x?: number;
  y?: number;
}

const getPath = (props) => {
  const { x, y, size, symbol } = props;
  if (props.getPath) {
    return props.getPath(x, y, size);
  }
  const pathFunctions = pathHelpers;
  const symbolFunction =
    typeof pathFunctions[symbol] === "function"
      ? pathFunctions[symbol]
      : pathFunctions.circle;
  return symbolFunction(x, y, size);
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `ariaLabel`
   * `desc`
   * `id`
   * `size`
   * `style`
   * `symbol`
   * `tabIndex`
   */
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const size = Helpers.evaluateProp(props.size, props);
  const style = Helpers.evaluateStyle(props.style, props);
  const symbol = Helpers.evaluateProp(props.symbol, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, {
    ariaLabel,
    desc,
    id,
    size,
    style,
    symbol,
    tabIndex,
  });
};

const defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Point = (initialProps: PointProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
  const userProps = UserProps.getSafeUserProps(props);

  return React.cloneElement(props.pathComponent!, {
    ...props.events,
    "aria-label": props.ariaLabel,
    d: getPath(props),
    style: props.style,
    desc: props.desc,
    tabIndex: props.tabIndex,
    role: props.role,
    shapeRendering: props.shapeRendering,
    className: props.className,
    transform: props.transform,
    clipPath: props.clipPath,
    ...userProps,
  });
};
