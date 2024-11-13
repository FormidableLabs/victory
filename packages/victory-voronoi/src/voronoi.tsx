import React from "react";
import defaults from "lodash/defaults";

import {
  Helpers,
  ClipPath,
  Path,
  Circle,
  UserProps,
  VictoryCommonPrimitiveProps,
} from "victory-core";

export interface VoronoiProps extends VictoryCommonPrimitiveProps {
  circleComponent?: React.ReactElement;
  clipId?: number | string;
  clipPathComponent?: React.ReactElement;
  datum?: any;
  groupComponent?: React.ReactElement;
  pathComponent?: React.ReactElement;
  polygon?: [];
  size?: number;
  x?: number;
  y?: number;
}

const getVoronoiPath = (props: VoronoiProps) => {
  const { polygon } = props;
  return Array.isArray(polygon) && polygon.length
    ? `M ${props.polygon?.join("L")} Z`
    : "";
};

function evaluateProps<T extends VoronoiProps>(props: T) {
  /**
   * Potential evaluated props are:
   * `aria-label`
   * `id`
   * `size`
   * `style`
   * `tabIndex
   */
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const id = Helpers.evaluateProp(props.id, props);
  const size = Helpers.evaluateProp(props.size, props);
  const style = Helpers.evaluateStyle(props.style, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);
  return Object.assign({}, props, { ariaLabel, id, size, style, tabIndex });
}

const defaultProps = {
  pathComponent: <Path />,
  circleComponent: <Circle />,
  clipPathComponent: <ClipPath />,
  groupComponent: <g />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Voronoi = (initialProps: VoronoiProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
  const {
    ariaLabel,
    role,
    shapeRendering,
    className,
    events,
    transform,
    style,
    size,
    tabIndex,
  } = props;

  const voronoiPath = getVoronoiPath(props);
  const sharedProps = {
    "aria-label": ariaLabel,
    className,
    role,
    shapeRendering,
    style,
    tabIndex,
    transform,
    ...events,
  };
  const userProps = UserProps.getSafeUserProps(props);

  if (size) {
    const circle = React.cloneElement(props.circleComponent, {
      ...sharedProps,
      key: `${props.id}-circle-clip`,
      clipPath: `url(#${props.clipId})`,
      cx: props.x,
      cy: props.y,
      r: size,
    });

    const voronoiClipPath = React.cloneElement(
      props.clipPathComponent,
      { key: `${props.id}-voronoi-clip`, clipId: props.clipId },
      React.cloneElement(props.pathComponent, { d: voronoiPath, className }),
    );

    return React.cloneElement(props.groupComponent, {}, [
      voronoiClipPath,
      circle,
    ]);
  }

  return React.cloneElement(props.pathComponent, {
    ...sharedProps,
    ...userProps,
    d: voronoiPath,
  });
};
