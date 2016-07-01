import React, { PropTypes } from "react";
import { isArray } from "lodash";

export default class ErrorBar extends React.Component {
  constructor(props) {
    super(props);

    this.renderBorder = this.renderBorder.bind(this);
  }

  static propTypes = {
    index: React.PropTypes.number,
    datum: PropTypes.object,
    events: PropTypes.object,
    scale: PropTypes.object,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    errorX: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    errorY: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    borderWidth: PropTypes.number
  };

  renderBorder() {
    const {
      x,
      y,
      errorX,
      errorY,
      borderWidth
    } = this.props;

    return (
      <g>
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x + (isArray(errorX) ? errorX[1] : errorX)}
          x2={x + (isArray(errorX) ? errorX[1] : errorX)}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x - (isArray(errorX) ? errorX[1] : errorX)}
          x2={x - (isArray(errorX) ? errorX[1] : errorX)}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={y - (isArray(errorY) ? errorY[1] : errorY)}
          y2={y - (isArray(errorY) ? errorY[1] : errorY)}
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={y + (isArray(errorY) ? errorY[1] : errorY)}
          y2={y + (isArray(errorY) ? errorY[1] : errorY)}
        />
      </g>
    );
  }

  render() {
    const {
      x,
      y,
      errorX,
      errorY
    } = this.props;

    return (
      <g>
        {this.renderBorder()}
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={y + (isArray(errorY) ? errorY[0] : errorY)}
          shapeRendering="optimizeSpeed"
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={y - (isArray(errorY) ? errorY[1] : errorY)}
          shapeRendering="optimizeSpeed"
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x - (isArray(errorX) ? errorX[0] : errorX)}
          y1={y}
          y2={y}
          shapeRendering="optimizeSpeed"
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x + (isArray(errorX) ? errorX[1] : errorX)}
          y1={y}
          y2={y}
          shapeRendering="optimizeSpeed"
        />
      </g>
    );
  }
}
