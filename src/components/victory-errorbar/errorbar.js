/* eslint-disable max-statements */
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
      PropTypes.array,
      PropTypes.bool
    ]),
    errorY: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.bool
    ]),
    borderWidth: PropTypes.number,
    groupComponent: PropTypes.element
  };

  renderErrorBar(error) {
    const {
      x,
      y,
      borderWidth,
      groupComponent
    } = this.props;

    return React.cloneElement(groupComponent, {},
      error.errorRight ?
        <line
          ref="borderRight"
          {...this.props.events}
          style={this.props.style}
          x1={error.errorRight}
          x2={error.errorRight}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        : null
      ,
      error.errorLeft ?
        <line
          ref="borderLeft"
          {...this.props.events}
          style={this.props.style}
          x1={error.errorLeft}
          x2={error.errorLeft}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        : null
      ,
      error.errorBottom ?
        <line
          ref="borderBottom"
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={error.errorBottom}
          y2={error.errorBottom}
        />
        : null
      ,
      error.errorTop ?
        <line
          ref="borderTop"
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={error.errorTop}
          y2={error.errorTop}
        />
        : null
      ,
      error.errorTop ?
        <line
          ref="crossTop"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={error.errorTop}
          shapeRendering="optimizeSpeed"
        />
        : null
      ,
      error.errorBottom ?
        <line
          ref="crossBottom"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={error.errorBottom}
          shapeRendering="optimizeSpeed"
        />
        : null
      ,
      error.errorLeft ?
        <line
          ref="crossLeft"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={error.errorLeft}
          y1={y}
          y2={y}
          shapeRendering="optimizeSpeed"
        /> : null
      ,
      error.errorRight ?
        <line
          ref="crossRight"
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={error.errorRight}
          y1={y}
          y2={y}
          shapeRendering="optimizeSpeed"
        /> : null
    );
  }

  render() {
    const {
      errorX,
      errorY,
      scale
    } = this.props;

    let rangeX;
    let rangeY;
    let positiveErrorX;
    let negativeErrorX;
    let positiveErrorY;
    let negativeErrorY;
    let errorTop;
    let errorBottom;
    let errorRight;
    let errorLeft;

    if (errorX) {
      rangeX = scale.x.range();
      positiveErrorX = errorX[0];
      negativeErrorX = errorX[1];
      errorRight = positiveErrorX >= rangeX[1] ? rangeX[1] : positiveErrorX;
      errorLeft = negativeErrorX <= rangeX[0] ? rangeX[0] : negativeErrorX;
    }

    if (errorY) {
      rangeY = scale.y.range();
      positiveErrorY = errorY[1];
      negativeErrorY = errorY[0];
      errorTop = positiveErrorY >= rangeY[0] ? rangeY[0] : positiveErrorY;
      errorBottom = negativeErrorY <= rangeY[1] ? rangeY[1] : negativeErrorY;
    }

    return React.cloneElement(
      this.props.groupComponent,
      {},
      this.renderErrorBar({errorTop, errorBottom, errorRight, errorLeft})
    );
  }
}
