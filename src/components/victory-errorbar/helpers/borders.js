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
    errorLeft: PropTypes.number,
    borderWidth: PropTypes.number
  };

  render() {
    const {
      x,
      y,
      errorTop,
      errorBottom,
      errorRight,
      errorLeft,
      borderWidth
    } = this.props;

    return (
      <g>
        <line
          {...this.props.events}
          style={this.props.style}
          x1={errorRight}
          x2={errorRight}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={errorLeft}
          x2={errorLeft}
          y1={y - borderWidth}
          y2={y + borderWidth}
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={errorBottom}
          y2={errorBottom}
        />
        <line
          {...this.props.events}
          style={this.props.style}
          x1={x - borderWidth}
          x2={x + borderWidth}
          y1={errorTop}
          y2={errorTop}
        />
      </g>
    );
  }
}
