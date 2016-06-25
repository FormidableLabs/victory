import React, { PropTypes } from "react";
import { assign } from "lodash";
import d3Shape from "d3-shape";

export default class Area extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    interpolation: PropTypes.string,
    scale: PropTypes.object,
    style: PropTypes.object,
    events: PropTypes.object,
    groupComponent: PropTypes.element
  };

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  getAreaPath(props) {
    const xScale = props.scale.x;
    const yScale = props.scale.y;
    const areaFunction = d3Shape.area()
      .curve(d3Shape[this.toNewName(props.interpolation)])
      .x((data) => xScale(data.x))
      .y1((data) => yScale(data.y1))
      .y0((data) => yScale(data.y0));
    return areaFunction(props.data);
  }

  getLinePath(props) {
    const xScale = props.scale.x;
    const yScale = props.scale.y;
    const lineFunction = d3Shape.line()
      .curve(d3Shape[this.toNewName(props.interpolation)])
      .x((data) => xScale(data.x))
      .y((data) => yScale(data.y1));
    return lineFunction(props.data);
  }

  renderArea(path, style, events) {
    const areaStroke = style.stroke ? "none" : style.fill;
    const areaStyle = assign({}, style, {stroke: areaStroke});
    return <path key="area" style={areaStyle} d={path} {...events}/>;
  }

  renderLine(path, style, events) {
    if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
      return undefined;
    }
    const lineStyle = assign({}, style, {fill: "none"});
    return (
      <path key="area-stroke" style={lineStyle} d={path} {...events}/>
    );
  }

  render() {
    const { style, events, groupComponent } = this.props;
    const area = this.renderArea(this.getAreaPath(this.props), style, events);
    const line = this.renderLine(this.getLinePath(this.props), style, events);
    return React.cloneElement(groupComponent, {}, [area, line]);
  }
}
