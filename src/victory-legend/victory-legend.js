/*global document:false */

import React, { PropTypes } from "react";
import { merge } from "lodash";
import VictoryLabel from "../victory-label/victory-label";
import VictorySymbol from "../victory-legend/victory-symbol";

const defaultFontStyle = {
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  color: "#252525",
  backgroundColor: "#d9d9d9",
  stroke: "transparent"
};

export default class VictoryLegend extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    orientation: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        symbol: PropTypes.string,
        name: PropTypes.string
      })
    ),
    font: PropTypes.shape({
      fontSize: PropTypes.number,
      fontFamily: PropTypes.string
    }),
    columnItemSpacing: PropTypes.number,
    rowItemSpacing: PropTypes.number
  };

  static defaultProps = {
    x: 0,
    y: 0,
    height: 200,
    width: 300,
    data: [],
    orientation: "vertical",
    columnItemSpacing: 10,
    rowItemSpacing: 8
  };

  getFontStyles(props) {
    return merge({}, defaultFontStyle, props.font);
  }

  getLabelBbox(text, font) {
    const body = document.body;
    const container = document.createElement("svg");
    const label = document.createElement("text");

    label.innerText = text;
    label.setAttribute("style",
      `fill: ${font.color};
      font-size: ${font.fontSize}px;
      font-family: ${font.fontFamily};
      background-color: ${font.backgroundColor};
      stroke: ${font.stroke};
      top: -10000px;
      position: absolute;`
    );
    body.appendChild(container);
    container.appendChild(label);

    const bBox = label.getBoundingClientRect();
    body.removeChild(container);

    return bBox;
  }

  render() {
    const props = this.props;
    const font = this.getFontStyles(props);
    const { data } = props;
    let yPadding = 0;
    const symbolSize = font.fontSize;
    const itemXPosition = [];
    const labelSymbolPadding = symbolSize * 1.5 + props.columnItemSpacing;

    if (props.orientation === "horizontal") {
      let xPadding = 0;
      data.forEach((item) => {
        itemXPosition.push(xPadding);
        xPadding += labelSymbolPadding + this.getLabelBbox(item.name, font).width;
      });
    } else {
      yPadding = symbolSize + props.rowItemSpacing;
    }

    const items = data.map((seria, index) => {
      const hPadding = 1.5 * symbolSize;
      const yPos = index * yPadding;
      const xLabelPos = (props.orientation !== "horizontal" ? 0 : itemXPosition[index]) + hPadding;
      const xSymbolPos = props.orientation !== "horizontal" ? props.x : itemXPosition[index];

      return (
        <g key={index}>
          <VictorySymbol
            x={xSymbolPos}
            y={yPos}
            type={seria.symbol}
            size={symbolSize}
            color={seria.color}
          />
          <VictoryLabel
            x={xLabelPos}
            y={yPos}
            style={font}
          >
            {seria.name}
          </VictoryLabel>
        </g>
      );
    });

    return (
      <g transform={`translate(${props.x}, ${props.y})`}>
        {items}
      </g>
    );
  }
}
