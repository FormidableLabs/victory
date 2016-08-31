/*global document:false */

import React, { PropTypes } from "react";
import { merge, assign, isEmpty } from "lodash";
import VictoryLabel from "../victory-label/victory-label";
import VictoryContainer from "../victory-container/victory-container";
import Point from "../point/point"; // it should be replaced

const defaultFontStyle = {
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  color: "#252525",
  backgroundColor: "#d9d9d9",
  stroke: "transparent"
};

const defaultLegendStyle = {
  height: 200,
  width: 300,
  padding: 20
};

const defaultLegendData = [{
  name: "Series 1",
  symbol: {
    type: "circle",
    style: {
      fill: "red"
    }
  }
}, {
  name: "Series 2",
  symbol: {
    type: "diamond",
    style: {
      fill: "blue"
    }
  }
}];

export default class VictoryLegend extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    orientation: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.object,
        symbol: PropTypes.object
      })
    ),
    columnItemSpacing: PropTypes.number,
    rowItemSpacing: PropTypes.number,
    groupComponent: PropTypes.element,
    standalone: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    x: 0,
    y: 0,
    height: 100,
    width: 150,
    orientation: "vertical",
    columnItemSpacing: 10,
    rowItemSpacing: 8,
    symbolComponent: <Point/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    standalone: true
  };

  getFontStyles(props) {
    return merge({}, defaultFontStyle, props.label);
  }

  getLegendStyle(props) {
    return {
      style: merge({}, defaultLegendStyle, props.style)
    };
  }

  // it should be changed to approximateTextSize
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

  renderContainer(props, group) {
    return React.cloneElement(
      props.containerComponent,
      this.getLegendStyle(props),
      group
    );
  }

  renderGroup(children) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation" },
      children
    );
  }

  render() {
    let yPadding = 0;
    let xPadding = 0;
    const props = this.props;
    const itemXPosition = [];
    const symbolComponents = [];
    const labelComponents = [];
    const { symbolComponent, labelComponent } = props;
    const data = isEmpty(props.data) ? defaultLegendData : props.data;

    data.forEach((series, index) => {
      const font = this.getFontStyles(series);
      const symbolSize = font.fontSize;
      const hPadding = symbolSize * 0.87;
      const yPos = props.y + index * yPadding;
      const labelSymbolPadding = symbolSize * 1.5 + props.columnItemSpacing;

      if (props.orientation === "horizontal") {
        itemXPosition.push(xPadding);
        xPadding += labelSymbolPadding + this.getLabelBbox(series.name, font).width;
      } else {
        yPadding = symbolSize + props.rowItemSpacing;
      }

      const xLabelPos = (props.orientation !== "horizontal" ?
        props.x : itemXPosition[index]) + hPadding;
      const xSymbolPos = props.orientation !== "horizontal" ?
        props.x : itemXPosition[index];

      const symbolProps = assign({
        key: `symbol-${index}`
      }, {
        x: xSymbolPos,
        y: yPos,
        size: series.symbol.size || symbolSize / 2.5,
        symbol: series.symbol.type
      }, series.symbol);

      const labelProps = assign({
        key: `label-${index}`
      }, {
        x: xLabelPos,
        y: yPos,
        style: font,
        text: series.name
      }, series.label);

      symbolComponents[index] = React.cloneElement(
        symbolComponent, assign({}, symbolProps)
      );
      labelComponents[index] = React.cloneElement(
        labelComponent, assign({}, labelProps)
      );
    });

    const group = this.renderGroup([...symbolComponents, ...labelComponents]);
    return props.standalone ? this.renderContainer(props, group) : group;
  }
}
