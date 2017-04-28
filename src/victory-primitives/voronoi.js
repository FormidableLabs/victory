/*eslint no-magic-numbers: ["error", { "ignore": [2] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { isEqual } from "lodash";

export default class Voronoi extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    data: PropTypes.array,
    datum: PropTypes.object,
    events: PropTypes.object,
    index: PropTypes.number,
    polygon: PropTypes.array,
    role: PropTypes.string,
    scale: PropTypes.object,
    shapeRendering: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  componentWillMount() {
    const { style, circle, voronoi } = this.calculateAttributes(this.props);
    this.style = style;
    this.circle = circle;
    this.voronoi = voronoi;
  }

  shouldComponentUpdate(nextProps) {
    const { style, circle, voronoi } = this.calculateAttributes(nextProps);
    if (circle !== this.circle || voronoi !== this.voronoi || !isEqual(style, this.style)) {
      this.style = style;
      this.circle = circle;
      this.voronoi = voronoi;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { style, datum, active } = props;
    return {
      style: Helpers.evaluateStyle(style, datum, active),
      circle: this.getCirclePath(props),
      voronoi: this.getVoronoiPath(props)
    };
  }

  getVoronoiPath(props) {
    const { polygon } = props;
    return Array.isArray(polygon) && polygon.length ?
      `M ${props.polygon.join("L")} Z` : "";
  }

  getCirclePath(props) {
    if (!props.size) {
      return null;
    }
    const { x, y, datum, active } = props;
    const size = Helpers.evaluateProp(props.size, datum, active);
    return `M ${x}, ${y} m ${-size}, 0
      a ${size}, ${size} 0 1,0 ${size * 2},0
      a ${size}, ${size} 0 1,0 ${-size * 2},0`;
  }

  // Overridden in victory-core-native
  renderPoint(paths, style, events) {
    const clipId = paths.circle && `clipPath-${Math.random()}`;
    const clipPath = paths.circle ? `url(#${clipId})` : undefined;
    const { role, shapeRendering, className } = this.props;
    const voronoiPath = (
      <path
        d={paths.circle || paths.voronoi}
        className={className}
        clipPath={clipPath}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
    return paths.circle ?
      (
        <g>
          <defs>
            <clipPath id={clipId}>
              <path d={paths.voronoi} className={className}/>
            </clipPath>
          </defs>
          {voronoiPath}
        </g>
      ) :
      voronoiPath;
  }

  render() {
    const paths = {
      circle: this.circle,
      voronoi: this.voronoi
    };
    return this.renderPoint(paths, this.style, this.props.events);
  }
}
