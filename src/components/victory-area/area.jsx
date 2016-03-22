import React, { PropTypes } from "react";
import d3Shape from "d3-shape";
import assign from "lodash/assign";
import { Helpers } from "victory-core";

export default class Area extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    interpolation: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object,
    events: PropTypes.object
  };

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  renderArea(style, interpolation, events) {
    const xScale = this.props.scale.x;
    const yScale = this.props.scale.y;
    const areaStroke = style.stroke ? "none" : style.fill;
    const areaStyle = assign({}, style, {stroke: areaStroke});
    const areaFunction = d3Shape.area()
      .curve(d3Shape[this.toNewName(interpolation)])
      .x((data) => xScale(data.x))
      .y1((data) => yScale(data.y0 + data.y))
      .y0((data) => yScale(data.y0));
    const path = areaFunction(this.props.data);

    return <path style={areaStyle} d={path} {...events}/>;
  }

  renderLine(style, interpolation, events) {
    if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
      return undefined;
    }
    const lineStyle = assign({}, style, {fill: "none"});
    const xScale = this.props.scale.x;
    const yScale = this.props.scale.y;
    const lineFunction = d3Shape.line()
      .curve(d3Shape[this.toNewName(interpolation)])
      .x((data) => xScale(data.x))
      .y((data) => yScale(data.y0 + data.y));
    const path = lineFunction(this.props.data);
    return (
      <path style={lineStyle} d={path} {...events}/>
    );
  }

  render() {
    const { props } = this;
    const style = Helpers.evaluateStyle(props.style, props.data);
    const interpolation = Helpers.evaluateProp(props.interpolation, props.data);
    const events = Helpers.getPartialEvents(props.events, 0, props);
    return (
      <g>
        {this.renderArea(style, interpolation, events)}
        {this.renderLine(style, interpolation, events)}
      </g>
    );
  }
}
