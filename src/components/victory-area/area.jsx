import React, { PropTypes } from "react";
import Radium from "radium";
import d3Shape from "d3-shape";
import last from "lodash/array/last";
import first from "lodash/array/first";

import { PropTypes as CustomPropTypes, Helpers } from "victory-util";

@Radium
export default class Area extends React.Component {
  static propTypes = {
    data: PropTypes.array,
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
    const style = Helpers.evaluateStyle(this.props.style, this.props.data);
    const interpolation = Helpers.evaluateProp(this.props.interpolation, this.props.data);
    const xScale = this.props.scale.x;
    const yScale = this.props.scale.y;

    const areaFunction = d3Shape.area()
      .x((data) => xScale(data.x))
      .y1((data) => yScale(data.y))
      .y0((data) => yScale(data.y0));
    const path = areaFunction(this.props.data);
    return (
      <path style={style} d={path}/>
    );
  }
}
