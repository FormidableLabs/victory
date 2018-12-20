/*eslint no-magic-numbers: ["error", { "ignore": [2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { isObject, uniqueId } from "lodash";
import { Helpers, CommonProps, ClipPath, Path, Circle } from "victory-core";

export default class Voronoi extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    pathComponent: <Path />,
    circleComponent: <Circle />,
    clipPathComponent: <ClipPath />,
    groupComponent: <g />
  };

  constructor(props) {
    super(props);
    this.clipId =
      !isObject(props) || props.clipId === undefined ? uniqueId("voronoi-clip-") : props.clipId;
  }

  getVoronoiPath(props) {
    const { polygon } = props;
    return Array.isArray(polygon) && polygon.length ? `M ${props.polygon.join("L")} Z` : "";
  }

  render() {
    const {
      datum,
      active,
      role,
      shapeRendering,
      className,
      events,
      x,
      y,
      transform,
      pathComponent,
      clipPathComponent,
      groupComponent,
      circleComponent,
      id
    } = this.props;
    const voronoiPath = this.getVoronoiPath(this.props);
    const style = Helpers.evaluateStyle(this.props.style, datum, active);
    const size = Helpers.evaluateProp(this.props.size, datum, active);

    if (size) {
      const circle = React.cloneElement(circleComponent, {
        key: `${id}-circle-clip`,
        style,
        className,
        role,
        shapeRendering,
        events,
        clipPath: `url(#${this.clipId})`,
        cx: x,
        cy: y,
        r: size
      });
      const voronoiClipPath = React.cloneElement(
        clipPathComponent,
        { key: `${id}-voronoi-clip`, clipId: this.clipId },
        React.cloneElement(pathComponent, { d: voronoiPath, className })
      );
      return React.cloneElement(groupComponent, {}, [voronoiClipPath, circle]);
    }
    return React.cloneElement(pathComponent, {
      style,
      className,
      d: voronoiPath,
      role,
      shapeRendering,
      events,
      transform
    });
  }
}
