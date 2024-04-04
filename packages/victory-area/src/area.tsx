/* eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import { defaults } from "lodash";
import * as d3Shape from "victory-vendor/d3-shape";
import {
  Helpers,
  Path,
  UserProps,
  VictoryCommonPrimitiveProps,
  LineHelpers,
  VictoryCommonThemeProps,
} from "victory-core";

const defined = (d) => {
  const y = d._y1 !== undefined ? d._y1 : d._y;
  return y !== null && y !== undefined && d._y0 !== null;
};

const getXAccessor = (scale) => {
  return (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
};

const getYAccessor = (scale) => {
  return (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
};

const getY0Accessor = (scale) => {
  return (d) => scale.y(d._y0);
};

const getAngleAccessor = (scale) => {
  return (d) => {
    const x = scale.x(d._x1 !== undefined ? d._x1 : d._x);
    return -1 * x + Math.PI / 2;
  };
};

const getCartesianArea = (props: AreaProps) => {
  const { horizontal, scale } = props;
  const interpolationFunction = LineHelpers.getInterpolationFunction(props);
  return horizontal
    ? d3Shape
        .area()
        .defined(defined)
        .curve(interpolationFunction)
        .x0(getY0Accessor(scale))
        .x1(getYAccessor(scale))
        .y(getXAccessor(scale))
    : d3Shape
        .area()
        .defined(defined)
        .curve(interpolationFunction)
        .x(getXAccessor(scale))
        .y1(getYAccessor(scale))
        .y0(getY0Accessor(scale));
};

const getAreaFunction = (props: AreaProps) => {
  const { polar, scale } = props;
  const interpolationFunction = LineHelpers.getInterpolationFunction(props);
  return polar
    ? d3Shape
        .radialArea()
        .defined(defined)
        .curve(interpolationFunction)
        .angle(getAngleAccessor(scale))
        .outerRadius(getYAccessor(scale))
        .innerRadius(getY0Accessor(scale))
    : getCartesianArea(props);
};

const evaluateProps = (props: AreaProps) => {
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
    Object.assign({ fill: "black" }, props.style),
    props,
  );
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, { ariaLabel, desc, id, style, tabIndex });
};

const defaultProps = {
  groupComponent: <g />,
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
};

/**
 * The area primitive used by VictoryArea
 */
export const Area: React.FC<AreaProps> = (initialProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
  const {
    ariaLabel,
    role,
    shapeRendering,
    className,
    polar,
    origin,
    data,
    pathComponent,
    events,
    groupComponent,
    clipPath,
    id,
    style,
    desc,
    tabIndex,
  } = props;
  const userProps = UserProps.getSafeUserProps(props);
  const defaultTransform =
    polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
  const transform = props.transform || defaultTransform;
  const renderLine =
    style.stroke && style.stroke !== "none" && style.stroke !== "transparent";
  const areaFunction = getAreaFunction(props);
  const lineFunction = renderLine && LineHelpers.getLineFunction(props);

  const areaStroke = style.stroke ? "none" : style.fill;

  const sharedProps = {
    "aria-label": ariaLabel,
    className,
    role,
    shapeRendering,
    transform,
    ...events,
    clipPath,
    tabIndex,
  };

  const area = React.cloneElement(
    pathComponent!,
    Object.assign(
      {
        key: `${id}-area`,
        style: Object.assign({}, style, { stroke: areaStroke }),
        d: areaFunction(data),
        desc,
        tabIndex,
      },
      sharedProps,
      userProps,
    ),
  );

  const line = renderLine
    ? React.cloneElement(
        pathComponent!,
        Object.assign(
          {
            key: `${id}-area-stroke`,
            style: Object.assign({}, style, { fill: "none" }),
            d: lineFunction(data),
          },
          sharedProps,
        ),
      )
    : null;

  return renderLine
    ? React.cloneElement(groupComponent!, userProps, [area, line])
    : area;
};

export interface AreaProps extends VictoryCommonPrimitiveProps {
  horizontal?: VictoryCommonThemeProps["horizontal"];
  groupComponent?: React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/ban-types
  interpolation?: string | Function;
  pathComponent?: React.ReactElement;
}
