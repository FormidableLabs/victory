import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, TextSize, Helpers } from "../victory-util/index";
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
    containerComponent: PropTypes.element,
    dataComponent: PropTypes.element,
    groupComponent: PropTypes.element,
    labelComponent: PropTypes.element,
    symbolSpacer: PropTypes.number,
    gutter: PropTypes.number,
    theme: PropTypes.object,
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
    theme: VictoryTheme.grayscale,
    standalone: true,
    style: {}
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

  getCalculatedProps() {
    const { role } = this.constructor;
    const { data, orientation, theme } = this.props;
    let { height, width } = this.props;

    const legendTheme = theme && theme[role] && theme[role].style ? theme[role].style : {};
    const isHorizontal = orientation === "horizontal";
    const padding = Helpers.getPadding(this.props);
    const symbolStyles = [];
    const labelStyles = [];
    let leftOffset = 0;

    const textSizes = data.map((datum, i) => {
      const styles = this.getStyles(datum, legendTheme, "labels");
      symbolStyles[i] = this.getStyles(datum, legendTheme, "symbol");
      labelStyles[i] = styles;

      const textSize = TextSize.approximateTextSize(datum.name, styles);
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

    return Object.assign({}, this.props, {
      isHorizontal, padding, textSizes, height, width, labelStyles, symbolStyles, theme: legendTheme
    });
  }

  getStyles(datum, theme, key) {
    return merge({}, theme[key], this.props.style[key], datum[key]);
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
