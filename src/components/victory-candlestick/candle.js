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
    data: PropTypes.array
  }

  renderWick(props) {
    const {x, y1, y2, style, events} = props;
    return (
        <line
          {...events}
          x1={x}
          x2={x}
          y1={y1}
          y2={y2}
          style={style}
        />
      );
  }

  renderCandle(props) {
    const {x, y, width, data, style, events, candleHeight} = props;
    const padding = props.padding.left || props.padding;
    const candleWidth = 0.5 * (width - 2 * padding) / data.length;
    const candleX = x - candleWidth / 2;

    return (
      <rect
        {...events}
        x={candleX}
        y={y}
        style={style}
        width={candleWidth}
        height={candleHeight}
      />
    );
  }

  render() {
    return (
      <g>
        {this.renderWick(this.props)}
        {this.renderCandle(this.props)}
      </g>
    );
  }
}
