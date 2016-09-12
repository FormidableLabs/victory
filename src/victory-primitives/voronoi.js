import React, { PropTypes } from "react";

export default class Voronoi extends React.Component {
  static propTypes = {
    datum: PropTypes.object,
    events: PropTypes.object,
    index: PropTypes.number,
    polygon: PropTypes.array,
    scale: PropTypes.object,
    size: PropTypes.number,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  getVoronoiPath(props) {
    return `M ${props.polygon.join("L")} Z`;
  }

  getCirclePath(props) {
    const {x, y, size} = props;
    return `M ${x}, ${y} m ${-size}, 0
      a ${size}, ${size} 0 1,0 ${size * 2},0
      a ${size}, ${size} 0 1,0 ${-size * 2},0`;
  }

  renderPoint(paths, style, events) {
    const clipId = `clipPath-${Math.random()}`;
    return paths.circle ?
      (
        <g>
          <defs>
            <clipPath id={clipId}>
              <path d={paths.voronoi}/>
            </clipPath>
          </defs>
          <path d={paths.circle} clipPath={`url(#${clipId})`} style={style} {...events}/>
        </g>
      ) :
      <path d={paths.voronoi} style={style} {...events}/>;
  }

  render() {
    const paths = {
      circle: this.props.size && this.getCirclePath(this.props),
      voronoi: this.getVoronoiPath(this.props)
    };
    const { style, events } = this.props;
    return this.renderPoint(paths, style, events);
  }
}
