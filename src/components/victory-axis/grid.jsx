import React, { PropTypes } from "react";
import { Helpers } from "victory-core";

export default class GridLine extends React.Component {
  static role = "grid";

  static propTypes = {
    tick: PropTypes.any,
    x2: PropTypes.number,
    y2: PropTypes.number,
    xTransform: PropTypes.number,
    yTransform: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object
  };

  render() {
    return (
      <g transform={`translate(${this.props.xTransform}, ${this.props.yTransform})`}>
        <line
          {...this.props.events}
          x2={this.props.x2}
          y2={this.props.y2}
          style={Helpers.evaluateStyle(this.props.style, this.props.tick)}
        />
      </g>
    );
  }
}
