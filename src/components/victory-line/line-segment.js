import React, { PropTypes } from "react";
import * as d3Shape from "d3-shape";

export default class LineSegment extends React.Component {
  static propTypes = {
    clipId: PropTypes.number,
    data: PropTypes.array,
    events: PropTypes.object,
    index: PropTypes.number,
    interpolation: PropTypes.string,
    role: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object
  };

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  renderLine(path, style, events) {
    const { role, clipId } = this.props;
    return (
      <path
        style={style}
        d={path}
        role={role}
        {...events}
        clipPath={`url(#${clipId})`}
        vectorEffect="non-scaling-stroke"
      />
    );
  }

  render() {
    const { data, events, interpolation, scale, style } = this.props;
    const xScale = scale.x;
    const yScale = scale.y;
    const lineFunction = d3Shape.line()
      .curve(d3Shape[this.toNewName(interpolation)])
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));
    return this.renderLine(lineFunction(data), style, events);
  }
}
