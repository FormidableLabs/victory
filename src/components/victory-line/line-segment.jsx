import React, { PropTypes } from "react";
import d3Shape from "d3-shape";
import { Helpers } from "victory-core";

export default class LineSegment extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
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
    const { props } = this;
    const style = Helpers.evaluateStyle(props.style, props.data);
    const interpolation = Helpers.evaluateProp(props.interpolation, props.data);
    const xScale = props.scale.x;
    const yScale = props.scale.y;
    const lineFunction = d3Shape.line()
      .curve(d3Shape[this.toNewName(interpolation)])
      .x((data) => xScale(data.x))
      .y((data) => yScale(data.y));
    const path = lineFunction(props.data);
    const events = Helpers.getPartialEvents(props.events, props.index, props);
    return (
      <path style={style} d={path} {...events}/>
    );
  }
}
