import React, { PropTypes } from "react";


export default class Candle extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    x: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    y: PropTypes.number,
    events: PropTypes.object,
    candleHeight: PropTypes.number,
    scale: PropTypes.object,
    style: PropTypes.object,
    datum: PropTypes.object,
    width: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    data: PropTypes.array,
    role: PropTypes.string
  }

  renderWick() {
    const x = this.props.x;

    return (
        <line
          {...this.props.events}
          x1={x}
          x2={x}
          y1={this.props.y1}
          y2={this.props.y2}
          style={this.props.style}
        />
      );
  }

  renderCandle() {
    const {candleHeight, data: {length: dataLength}, events, role, style, width, x} = this.props;
    const padding = this.props.padding.left || this.props.padding;
    const candleWidth = this.props.style.width || 0.5 * (width - 2 * padding) / dataLength;
    const candleX = x - candleWidth / 2;

    return (
      <rect
        {...events}
        height={candleHeight}
        role={role}
        style={style}
        width={candleWidth}
        x={candleX}
        y={this.props.y}
      />
    );
  }

  render() {
    return (
      <g>
        {this.renderWick()}

        {this.renderCandle()}
      </g>
    );
  }
}
