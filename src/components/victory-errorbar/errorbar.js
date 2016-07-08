import React, { PropTypes } from "react";

export default class ErrorBar extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const {
      x,
      y,
      errorX,
      errorY,
      scale,
      borderWidth
    } = this.props;

    const rangeX = scale.x.range();
    const rangeY = scale.y.range();
    const positiveErrorX = errorX[0];
    const negativeErrorX = errorX[1];
    const positiveErrorY = errorY[1];
    const negativeErrorY = errorY[0];
    const errorTop = positiveErrorY >= rangeY[0] ? rangeY[0] : positiveErrorY;
    const errorBottom = negativeErrorY <= rangeY[1] ? rangeY[1] : negativeErrorY;
    const errorRight = positiveErrorX >= rangeX[1] ? rangeX[1] : positiveErrorX;
    const errorLeft = negativeErrorX <= rangeX[0] ? rangeX[0] : negativeErrorX;

    return (
      <g>
        <line
          ref="borderRight"
          {...this.props.events}
          style={this.props.style}
          x1={errorRight}
          x2={errorRight}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        <line
          ref="borderLeft"
          {...this.props.events}
          style={this.props.style}
          x1={errorLeft}
          x2={errorLeft}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        <line
          ref="borderBottom"
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={errorBottom}
          y2={errorBottom}
        />
        <line
          ref="borderTop"
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={errorTop}
          y2={errorTop}
        />
        <line
          ref="crossTop"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={errorTop}
          shapeRendering="optimizeSpeed"
        />
        <line
          ref="crossBottom"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={errorBottom}
          shapeRendering="optimizeSpeed"
        />
        <line
          ref="crossLeft"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={errorLeft}
          y1={y}
          y2={y}
          shapeRendering="optimizeSpeed"
        />
        <line
          ref="crossRight"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={errorRight}
          y1={y}
          y2={y}
          shapeRendering="optimizeSpeed"
        />
      </g>
    );
  }
}
