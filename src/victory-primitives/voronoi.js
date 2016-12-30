import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";

export default class Voronoi extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    datum: PropTypes.object,
    data: PropTypes.array,
    events: PropTypes.object,
    index: PropTypes.number,
    polygon: PropTypes.array,
    scale: PropTypes.object,
    size: PropTypes.number,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    shapeRendering: PropTypes.string,
    role: PropTypes.string
  };

  getVoronoiPath(props) {
    return `M ${props.polygon.join("L")} Z`;
  }

  getCirclePath(props) {
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
      circle: this.props.size && this.getCirclePath(this.props),
      voronoi: this.getVoronoiPath(this.props)
    };
    const { style, events, datum, active } = this.props;
    const evaluatedStyle = Helpers.evaluateStyle(style, datum, active);
    return this.renderPoint(paths, evaluatedStyle, events);
  }
}
