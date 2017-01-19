import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Style, TextSize, Helpers } from "../victory-util/index";
import { merge, isEmpty, defaults, sumBy, maxBy } from "lodash";
import VictoryLabel from "../victory-label/victory-label";
import VictoryContainer from "../victory-container/victory-container";
import VictoryTheme from "../victory-theme/victory-theme";
import Point from "../victory-primitives/point";

const defaultLegendData = [
  { name: "Series 1" },
  { name: "Series 2" }
];

export default class VictoryLegend extends React.Component {
  static displayName = "VictoryLegend";

  static role = "legend";

  static propTypes = {
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    containerComponent: PropTypes.element,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.object,
        symbol: PropTypes.object
      })
    ),
    dataComponent: PropTypes.element,
    groupComponent: PropTypes.element,
    gutter: PropTypes.number,
    height: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    labelComponent: PropTypes.element,
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      symbol: PropTypes.object,
      label: PropTypes.object
    }),
    symbolSpacer: PropTypes.number,
    theme: PropTypes.object,
    width: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  static defaultProps = {
    containerComponent: <VictoryContainer/>,
    dataComponent: <Point/>,
    groupComponent: <g/>,
    gutter: 10,
    labelComponent: <VictoryLabel/>,
    orientation: "vertical",
    standalone: true,
    style: {},
    symbolSpacer: 8,
    theme: VictoryTheme.grayscale,
    x: 0,
    y: 0
  };

  calculateLegendHeight(textSizes, padding, isHorizontal) {
    const { data, gutter } = this.props;
    const contentHeight = isHorizontal
      ? maxBy(textSizes, "height").height
      : sumBy(textSizes, "height") + gutter * (data.length - 1);

    return padding.top + contentHeight + padding.bottom;
  }

  calculateLegendWidth(textSizes, padding, isHorizontal) {
    const { data, gutter, symbolSpacer } = this.props;
    const contentWidth = isHorizontal
      ? sumBy(textSizes, "width") + (gutter + symbolSpacer * 3) * (data.length - 1)
      : maxBy(textSizes, "width").width + symbolSpacer * 2;

    return padding.left + contentWidth + padding.right;
  }

  getColorScale(theme) {
    const { colorScale } = this.props;
    let colorScaleOptions = colorScale || theme.colorScale;

    if (typeof colorScaleOptions === "string") {
      colorScaleOptions = Style.getColorScale(colorScaleOptions);
    }

    return !isEmpty(theme) ? colorScaleOptions || theme.colorScale : colorScaleOptions || [];
  }

  getCalculatedProps() { // eslint-disable-line max-statements
    const { role } = this.constructor;
    const { data, orientation, theme } = this.props;
    let { height, width } = this.props;

    const legendTheme = theme && theme[role] ? theme[role] : {};
    const colorScale = this.getColorScale(legendTheme);
    const isHorizontal = orientation === "horizontal";
    const padding = Helpers.getPadding(this.props);
    const symbolStyles = [];
    const labelStyles = [];
    let leftOffset = 0;

    const textSizes = data.map((datum, i) => {
      const labelStyle = this.getStyles(datum, legendTheme, "labels");
      symbolStyles[i] = this.getStyles(datum, legendTheme, "symbol", colorScale[i]);
      labelStyles[i] = labelStyle;

      const textSize = TextSize.approximateTextSize(datum.name, labelStyle);
      textSize.leftOffset = leftOffset;
      leftOffset += textSize.width;

      return textSize;
    });

    if (!height) {
      height = this.calculateLegendHeight(textSizes, padding, isHorizontal);
    }
    if (!width) {
      width = this.calculateLegendWidth(textSizes, padding, isHorizontal);
    }

    return Object.assign({},
      this.props,
      { isHorizontal, padding, textSizes, height, width, labelStyles, symbolStyles }
    );
  }

  getStyles(datum, theme, key, color) { // eslint-disable-line max-params
    const colorScale = color ? { fill: color } : {};
    return merge({}, theme.style[key], colorScale, this.props.style[key], datum[key]);
  }

  getSymbolSize(datum, fontSize) {
    return datum.symbol && datum.symbol.size ? datum.symbol.size : fontSize / 2.5;
  }

  getSymbolProps(datum, props, i) {
    const {
      gutter, labelStyles, isHorizontal, padding, symbolSpacer, symbolStyles, textSizes
    } = props;
    const { leftOffset } = textSizes[i];
    const { fontSize } = labelStyles[i];
    const symbolShift = fontSize / 2;
    const style = symbolStyles[i];

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

  getLabelProps(datum, props, i) {
    const { gutter, isHorizontal, symbolSpacer, labelStyles, textSizes, padding } = props;
    const style = labelStyles[i];
    const { fontSize } = style;
    const symbolShift = fontSize / 2;

    const labelCoords = isHorizontal ? {
      x: padding.left + textSizes[i].leftOffset + (fontSize + symbolSpacer) * (i + 1) + gutter * i,
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

  renderLegendItems(props) {
    const { data, dataComponent, labelComponent } = props;
    const legendData = isEmpty(data) ? defaultLegendData : data;
    const length = legendData.length;
    const dataComponents = [];
    const labelComponents = [];

    for (let i = 0; i < length; i++) {
      const datum = legendData[i];

      dataComponents[i] = React.cloneElement(
        dataComponent,
        this.getSymbolProps(datum, props, i)
      );
      labelComponents[i] = React.cloneElement(
        labelComponent,
        this.getLabelProps(datum, props, i)
      );
    }

    return [...dataComponents, ...labelComponents];
  }

  renderGroup(props, children) {
    const { groupComponent, height, width, standalone, x, y } = props;
    const groupProps = { role: "presentation" };

    if (!standalone) {
      Object.assign(groupProps, { height, width, x, y });
    }

    return React.cloneElement(groupComponent, groupProps, children);
  }

  renderContainer(props, children) {
    const { containerComponent, height, width, x, y, style } = props;

    return React.cloneElement(
      containerComponent,
      { x, y, height, width, style: defaults({}, style) },
      children
    );
  }

  render() {
    const props = this.getCalculatedProps();
    const group = this.renderGroup(props, this.renderLegendItems(props));
    return props.standalone ? this.renderContainer(props, group) : group;
  }
}
