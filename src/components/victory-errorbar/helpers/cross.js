import React, { PropTypes } from "react";

export default class Borders extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    index: PropTypes.number,
    datum: PropTypes.object,
    events: PropTypes.object,
    scale: PropTypes.object,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    errorTop: PropTypes.number,
    errorBottom: PropTypes.number,
    errorRight: PropTypes.number,
    errorLeft: PropTypes.number
  };

  render() {
    const {
      x,
      y,
      errorTop,
      errorBottom,
      errorRight,
      errorLeft
    } = this.props;

    return (
      <g>
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={errorTop}
          shapeRendering="optimizeSpeed"
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={x}
          y1={y}
          y2={errorBottom}
          shapeRendering="optimizeSpeed"
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x}
          x2={errorLeft}
          y1={y}
          y2={y}
          shapeRendering="optimizeSpeed"
        />
        <line
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
