import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, TextSize, Helpers } from "../victory-util/index";
import { merge, isEmpty, defaults, sumBy, maxBy } from "lodash";
import VictoryLabel from "../victory-label/victory-label";
import VictoryContainer from "../victory-container/victory-container";
import Point from "../victory-primitives/point";

const defaultStyles = {
  symbol: {
    fill: "black",
    type: "circle"
  },
  label: {
    fontSize: 14,
    fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
    color: "#252525",
    backgroundColor: "#d9d9d9",
    stroke: "transparent"
  }
};
const defaultLegendData = [
  { name: "Series 1" },
  { name: "Series 2" }
];

export default class VictoryLegend extends React.Component {
  static displayName = "VictoryLegend";
  static role = "legend";

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    height: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.object,
        symbol: PropTypes.object
      })
    ),
    dataComponent: PropTypes.element,
    labelComponent: PropTypes.element,
    symbolSpacer: PropTypes.number,
    gutter: PropTypes.number,
    groupComponent: PropTypes.element,
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      symbol: PropTypes.object,
      label: PropTypes.object
    })
  };

  static defaultProps = {
    x: 0,
    y: 0,
    padding: 0,
    symbolSpacer: 8,
    gutter: 10,
    orientation: "vertical",
    dataComponent: <Point/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    standalone: true,
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = this.getLegendState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getLegendState(nextProps));
  }

  calculateLegendHeight(props, textSizes, padding) {
    const { orientation, data, gutter, height } = props;

    if (!height) {
      const contentHeight = orientation === "horizontal"
        ? maxBy(textSizes, "height").height
        : sumBy(textSizes, "height") + gutter * (data.length - 1);
      return padding.top + contentHeight + padding.bottom;
    }

    return height;
  }

  calculateLegendWidth(props, textSizes, padding) {
    const { gutter, orientation, data, symbolSpacer, width } = props;

    if (!width) {
      const contentWidth = orientation === "horizontal"
        ? sumBy(textSizes, "width") + (gutter + symbolSpacer * 3) * (data.length - 1)
        : maxBy(textSizes, "width").width + symbolSpacer * 2;
      return padding.left + contentWidth + padding.right;
    }

    return width;
  }

  getComponentStyles(datum, key) {
    return merge({}, defaultStyles[key], this.props.style[key], datum[key]);
  }

  getLegendState(props) {
    const symbolStyles = [];
    const labelStyles = [];

    const textSizes = props.data.map((datum, i) => {
      const styles = this.getComponentStyles(datum, "label");
      symbolStyles[i] = this.getComponentStyles(datum, "symbol");
      labelStyles[i] = styles;
      return TextSize.approximateTextSize(datum.name, styles);
    });

    const padding = Helpers.getPadding(props);
    const height = this.calculateLegendHeight(props, textSizes, padding);
    const width = this.calculateLegendWidth(props, textSizes, padding);

    return { padding, textSizes, height, width, labelStyles, symbolStyles };
  }

  getSymbolSize(datum, fontSize) {
    return datum.symbol && datum.symbol.size ? datum.symbol.size : fontSize / 2.5;
  }

  getSymbolProps(datum, isHorizontal, i) {
    const { gutter, symbolSpacer } = this.props;
    const { padding, textSizes, labelStyles, symbolStyles } = this.state;
    const style = symbolStyles[i];
    const { fontSize } = labelStyles[i];
    const symbolShift = fontSize / 2;
    const leftOffset = sumBy(textSizes.slice(0, i), "width");

    const symbolCoords = isHorizontal ? {
      x: padding.left + leftOffset + symbolShift + (fontSize + symbolSpacer + gutter) * i,
      y: padding.top + symbolShift
    } : {
      x: padding.left + symbolShift,
      y: padding.top + symbolShift + (fontSize + gutter) * i
    };

    return {
      key: `symbol-${i}`,
      style,
      size: this.getSymbolSize(datum, fontSize),
      symbol: style.type,
      ...symbolCoords
    };
  }

  getLabelProps(datum, isHorizontal, i) {
    const { gutter, symbolSpacer } = this.props;
    const { labelStyles, textSizes, padding } = this.state;
    const style = labelStyles[i];
    const { fontSize } = style;
    const symbolShift = fontSize / 2;
    const leftOffset = sumBy(textSizes.slice(0, i), "width");

    const labelCoords = isHorizontal ? {
      x: padding.left + leftOffset + (fontSize + symbolSpacer) * (i + 1) + gutter * i,
      y: padding.top + symbolShift
    } : {
      x: padding.left + fontSize + symbolSpacer,
      y: padding.top + symbolShift + (fontSize + gutter) * i
    };

    return {
      key: `label-${i}`,
      style,
      text: datum.name,
      ...labelCoords
    };
  }

  renderLegendItems(data) {
    const { dataComponent, labelComponent, orientation } = this.props;
    const isHorizontal = orientation === "horizontal";
    const length = data.length;
    const dataComponents = [];
    const labelComponents = [];

    for (let i = 0; i < length; i++) {
      const datum = data[i];
      dataComponents[i] = React.cloneElement(
        dataComponent,
        this.getSymbolProps(datum, isHorizontal, i)
      );
      labelComponents[i] = React.cloneElement(
        labelComponent,
        this.getLabelProps(datum, isHorizontal, i)
      );
    }

    return [...dataComponents, ...labelComponents];
  }

  renderGroup(props, children) {
    const { height, width } = this.state;
    const { groupComponent, x, y } = props;
    const groupProps = { role: "presentation" };

    if (!props.standalone) {
      Object.assign(groupProps, { height, width, x, y });
    }

    return React.cloneElement(
      groupComponent,
      groupProps,
      children
    );
  }

  renderContainer(props, children) {
    const { containerComponent, x, y, style } = props;
    const { height, width } = this.state;

    return React.cloneElement(
      containerComponent,
      { x, y, height, width, style: defaults({}, style) },
      children
    );
  }

  render() {
    const { data, standalone } = this.props;
    const legendData = isEmpty(data) ? defaultLegendData : data;
    const group = this.renderGroup(this.props, this.renderLegendItems(legendData));

    return standalone ? this.renderContainer(this.props, group) : group;
  }
}
