import React, { PropTypes } from "react";
import Radium from "radium";
import d3Shape from "d3-shape";
import { Chart } from "victory-util";

@Radium
export default class LineSegment extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    interpolation: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object
  };

  render() {
    const style = Chart.evaluateStyle(this.props.style, this.props.data);
    const interpolation = Chart.evaluateProp(this.props.interpolation, this.props.data);
    const xScale = this.props.scale.x;
    const yScale = this.props.scale.y;
    const lineFunction = d3Shape.line()
        .curve(d3Shape[interpolation])
      .x((data) => xScale(data.x))
      .y((data) => yScale(data.y));
    const path = lineFunction(this.props.data);
    return (
      <path style={style} d={path}/>
    );
  }
}
