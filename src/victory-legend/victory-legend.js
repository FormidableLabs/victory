import React, { PropTypes } from "react";
import { merge, assign, isEmpty, defaults } from "lodash";
import VictoryLabel from "../victory-label/victory-label";
import VictoryContainer from "../victory-container/victory-container";
import Point from "../victory-primitives/point";
import Textsize from "../victory-util/textsize";

const fallbackProps = {
  style: {
    symbol: {
      fill: "black",
      type: "circle"
    },
    labels: {
      fontSize: 14,
      fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
      color: "#252525",
      backgroundColor: "#d9d9d9",
      stroke: "transparent"
    }
  }
};

const defaultLegendStyle = {
  height: 200,
  width: 300,
  padding: 20
};

const defaultLegendData = [{
  name: "Series 1"
}, {
  name: "Series 2"
}];

export default class VictoryLegend extends React.Component {
  static displayName = "VictoryLegend";
  static role = "legend";

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
    style: PropTypes.shape({
      symbol: PropTypes.object,
      labels: PropTypes.object
    })
  };

  static defaultProps = {
    x: 0,
    y: 0,
    height: 100,
    width: 150,
    orientation: "vertical",
    columnItemSpacing: 10,
    rowItemSpacing: 8,
    dataComponent: <Point/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    standalone: true,
    style: {}
  };

  getLabelStyles(props) {
    return merge({}, fallbackProps.style.labels, props.label);
  }

  getLegendStyle(props) {
    return {
      style: defaults({}, defaultLegendStyle, props.style)
    };
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

  getSymbolProps(series) {
    return assign({}, fallbackProps.style.symbol, this.props.style.symbol, series.symbol);
  }

  render() {
    let yPadding = 0;
    let xPadding = 0;
    const props = this.props;
    const itemXPosition = [];
    const dataComponents = [];
    const labelComponents = [];
    const { dataComponent, labelComponent } = props;
    const data = isEmpty(props.data) ? defaultLegendData : props.data;

    data.forEach((series, i) => {
      const font = this.getLabelStyles(series);
      const symbolSize = font.fontSize;
      const hPadding = symbolSize * 0.87;
      const yPos = props.y + i * yPadding;
      const labelSymbolPadding = symbolSize * 1.5 + props.columnItemSpacing;

      if (props.orientation === "horizontal") {
        itemXPosition[i] = xPadding;
        xPadding += labelSymbolPadding + Textsize.approximateTextSize(series.name, font).width;
      } else {
        yPadding = symbolSize + props.rowItemSpacing;
      }

      const xLabelPos = (props.orientation !== "horizontal" ?
        props.x : itemXPosition[i]) + hPadding;
      const xSymbolPos = props.orientation !== "horizontal" ?
        props.x : itemXPosition[i];

      const symbolProps = assign({
        key: `symbol-${i}`
      }, {
        x: xSymbolPos,
        y: yPos,
        size: series.symbol ? series.symbol.size || symbolSize / 2.5 : symbolSize / 2.5,
        symbol: this.getSymbolProps(series).type
      }, this.getSymbolProps(series));

      const labelProps = assign({
        key: `label-${i}`
      }, {
        x: xLabelPos,
        y: yPos,
        style: font,
        text: series.name
      }, assign({}, fallbackProps.style.labels, props.style.labels, series.label));

      dataComponents[i] = React.cloneElement(
        dataComponent, assign({}, symbolProps)
      );
      labelComponents[i] = React.cloneElement(
        labelComponent, assign({}, labelProps)
      );
    });

    const group = this.renderGroup([...dataComponents, ...labelComponents]);
    return props.standalone ? this.renderContainer(props, group) : group;
  }
}
