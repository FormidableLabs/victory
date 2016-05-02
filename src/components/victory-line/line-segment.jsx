import React, { PropTypes } from "react";
import d3Shape from "d3-shape";

export default class LineSegment extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    events: PropTypes.object,
    interpolation: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object
  };

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  render() {
    const { events, style, interpolation, scale, data } = this.props;
    const xScale = scale.x;
    const yScale = scale.y;
    const lineFunction = d3Shape.line()
      .curve(d3Shape[this.toNewName(interpolation)])
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));
    const path = lineFunction(data);
    return (
      <path style={style} d={path} {...events}/>
    );
  }
}
