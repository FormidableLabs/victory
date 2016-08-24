import React, { PropTypes } from "react";

export default class VictorySymbol extends React.Component {
  static displayName = "VictorySymbol";

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    type: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string

  };

  static defaultProps = {
    x: 0,
    y: 0,
    size: 14,
    type: "rect",
    color: "black"
  };

  render() {
    if (this.props.type === "circle") {
      return (
        <circle
          fill={this.props.color}
          r={this.props.size / 2}
          cx={this.props.x + this.props.size / 2}
          cy={this.props.y}
        />
      );
    }

    return (
      <rect
        fill={this.props.color}
        x={this.props.x}
        y={this.props.y - this.props.size / 2}
        width={this.props.size}
        height={this.props.size}
      />
    );
  }
}
