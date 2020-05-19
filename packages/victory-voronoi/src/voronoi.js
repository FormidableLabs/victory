/*eslint no-magic-numbers: ["error", { "ignore": [2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import { Helpers, CommonProps, ClipPath, Path, Circle } from "victory-core";

const getVoronoiPath = (props) => {
  const { polygon } = props;
  return Array.isArray(polygon) && polygon.length ? `M ${props.polygon.join("L")} Z` : "";
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `id`
   * `size`
   * `style`
   */
  const id = Helpers.evaluateProp(props.id, props);
  const size = Helpers.evaluateProp(props.size, props);
  const style = Helpers.evaluateStyle(props.style, props);

  return assign({}, props, { id, size, style });
};

const Voronoi = (props) => {
  props = evaluateProps(props);

  const { role, shapeRendering, className, events, transform, style, size } = props;
  const voronoiPath = getVoronoiPath(props);
  const sharedProps = { className, role, shapeRendering, style, transform, ...events };

  if (size) {
    const circle = React.cloneElement(props.circleComponent, {
      ...sharedProps,
      key: `${props.id}-circle-clip`,
      clipPath: `url(#${props.clipId})`,
      cx: props.x,
      cy: props.y,
      r: size
    });

    const voronoiClipPath = React.cloneElement(
      props.clipPathComponent,
      { key: `${props.id}-voronoi-clip`, clipId: props.clipId },
      React.cloneElement(props.pathComponent, { d: voronoiPath, className })
    );

    return React.cloneElement(props.groupComponent, {}, [voronoiClipPath, circle]);
  }

  return React.cloneElement(props.pathComponent, { ...sharedProps, d: voronoiPath });
};

Voronoi.propTypes = {
  ...CommonProps.primitiveProps,
  circleComponent: PropTypes.element,
  clipId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  clipPathComponent: PropTypes.element,
  datum: PropTypes.object,
  groupComponent: PropTypes.element,
  pathComponent: PropTypes.element,
  polygon: PropTypes.array,
  size: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

Voronoi.defaultProps = {
  pathComponent: <Path />,
  circleComponent: <Circle />,
  clipPathComponent: <ClipPath />,
  groupComponent: <g />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Voronoi;
