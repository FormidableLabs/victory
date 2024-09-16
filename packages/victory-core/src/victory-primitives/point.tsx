import React, { isValidElement } from "react";
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
  symbol?: ScatterSymbolType | Function | React.ReactElement;
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
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  let isSymbolCallbackFn = false;
  let symbol;

  if (typeof props.symbol === "function") {
    const symbolFn = props.symbol(props);
    isSymbolCallbackFn = isValidElement(symbolFn);
    symbol = isSymbolCallbackFn ? props.symbol : symbolFn;
  } else {
    symbol = props.symbol;
  }

  return Object.assign({}, props, {
    ariaLabel,
    desc,
    id,
    size,
    style,
    symbol,
    tabIndex,
    isSymbolCallbackFn,
  });
};

const defaultProps = {
  role: "presentation",
  shapeRendering: "auto",
};

export const Point = (initialProps: PointProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
  const userProps = UserProps.getSafeUserProps(props);

  const commonProps = {
    ...props.events,
    "aria-label": props.ariaLabel,
    style: props.style,
    tabIndex: props.tabIndex,
    role: props.role,
    shapeRendering: props.shapeRendering,
    className: props.className,
    transform: props.transform,
    ...userProps,
  };

  // check if symbol is React element
  if (isValidElement(props.symbol) || props.isSymbolCallbackFn) {
    const symbolProps = {
      ...commonProps,
      height: props.size,
      width: props.size,
      x: props.x,
      y: props.y,
    };
    if (props.isSymbolCallbackFn) {
      const symbol = props.symbol(symbolProps);
      return React.cloneElement(symbol);
    }
    return React.cloneElement(props.symbol, {
      ...symbolProps,
    });
  }

  const pathComponent = <Path />;
  return React.cloneElement(pathComponent!, {
    d: getPath(props),
    desc: props.desc,
    clipPath: props.clipPath,
    ...commonProps,
  });
};
