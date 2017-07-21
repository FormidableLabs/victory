import { defaults, assign, maxBy, sumBy } from "lodash";
import Helpers from "../victory-util/helpers";
import Style from "../victory-util/style";
import TextSize from "../victory-util/textsize";


const calculateLegendHeight = (props, textSizes) => {
  const { gutter, itemsPerRow, padding, isHorizontal } = props;
  const itemCount = textSizes.length;
  const rowCount = itemsPerRow ? Math.ceil(itemCount / itemsPerRow) : 1;
  const contentHeight = isHorizontal
    ? maxBy(textSizes, "height").height * rowCount + gutter * (rowCount - 1)
    : (sumBy(textSizes, "height") + gutter * (itemCount - 1)) / rowCount;

  return padding.top + contentHeight + padding.bottom;
};

const calculateLegendWidth = (props, itemCount, maxTextWidth) => {
  const { gutter, itemsPerRow, symbolSpacer, padding, isHorizontal } = props;
  const rowCount = itemsPerRow ? Math.ceil(itemCount / itemsPerRow) : 1;
  const rowItemCount = itemsPerRow || itemCount;
  let contentWidth;

  if (isHorizontal) {
    const gutterWidth = gutter * rowItemCount;
    const symbolWidth = symbolSpacer * 3 * rowItemCount; // eslint-disable-line no-magic-numbers
    const textWidth = maxTextWidth * rowItemCount;
    contentWidth = symbolWidth + textWidth + gutterWidth;
  } else {
    contentWidth = (maxTextWidth + symbolSpacer * 2 + gutter) * rowCount;
  }

  return padding.left + contentWidth + padding.right;
};

const getColorScale = (props) => {
  const { colorScale } = props;
  return typeof colorScale === "string" ? Style.getColorScale(colorScale) : colorScale || [];
};

const getLabelStyles = (props) => {
  const { data, style } = props;
  return data.map((datum) => {
    const baseLabelStyles = defaults({}, datum.labels, style.labels);
    return Helpers.evaluateStyle(baseLabelStyles, datum);
  });
};

const getTextSizes = (props, labelStyles) => {
  return props.data.map((datum, i) => {
    return TextSize.approximateTextSize(datum.name, labelStyles[i]);
  });
};

const getCalculatedValues = (props) => {
  const { orientation, theme } = props;
  const defaultStyles = theme && theme.legend && theme.legend.style ? theme.legend.style : {};
  const style = Helpers.getStyles(props.style, defaultStyles);
  const colorScale = getColorScale(props);
  const isHorizontal = orientation === "horizontal";
  const padding = Helpers.getPadding(props);

  return assign({}, props, { style, isHorizontal, colorScale, padding });
};


const getSymbolSize = (datum, fontSize) => {
  // eslint-disable-next-line no-magic-numbers
  return datum.symbol && datum.symbol.size ? datum.symbol.size : fontSize / 2.5;
};

export default (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "legend");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    data, standalone, theme, padding, style, colorScale,
    itemsPerRow, gutter, isHorizontal, symbolSpacer
  } = props;
  const labelStyles = getLabelStyles(props);
  const textSizes = getTextSizes(props, labelStyles);
  const maxTextWidth = Math.max(...textSizes.map((text) => text.width));
  const height = props.height || calculateLegendHeight(props, textSizes);
  const width = props.width || calculateLegendWidth(props, textSizes.width, maxTextWidth);
  const initialChildProps = { parent: {
    width, height, data, standalone, theme, padding, style: style.parent
  } };

  return data.reduce((childProps, datum, i) => {
    const { fontSize } = labelStyles[i];
    const symbolShift = fontSize / 2;
    const symbolWidth = fontSize + symbolSpacer;
    const rowHeight = fontSize + gutter;
    const itemIndex = itemsPerRow ? i % itemsPerRow : i;
    const rowIndex = itemsPerRow ? Math.floor(i / itemsPerRow) : 0;
    const rowSpacer = itemsPerRow ? rowHeight * rowIndex : 0;
    const eventKey = datum.eventKey || i;
    const y = isHorizontal ?
      padding.top + symbolShift + rowSpacer : padding.top + symbolShift + rowHeight * itemIndex;
    const color = colorScale[i % colorScale.length];
    const dataStyle = defaults({}, datum.symbol, style.data, { fill: color });

    const dataProps = {
      index: i,
      data, datum,
      key: `legend-symbol-${i}`,
      symbol: dataStyle.type || "circle",
      size: getSymbolSize(datum, fontSize),
      style: dataStyle,
      y,
      x: isHorizontal ?
        padding.left + symbolShift + (fontSize + symbolSpacer + maxTextWidth + gutter) * itemIndex :
        padding.left + symbolShift + (rowHeight + maxTextWidth) * rowIndex
    };

    const labelProps = {
      datum, data,
      key: `legend-label-${i}`,
      text: datum.name,
      style: labelStyles[i],
      y,
      x: isHorizontal ?
        padding.left + symbolWidth * (itemIndex + 1) + (maxTextWidth + gutter) * itemIndex :
        padding.left + symbolWidth + (rowHeight + maxTextWidth) * rowIndex
    };

    childProps[eventKey] = { data: dataProps, labels: labelProps };

    return childProps;
  }, initialChildProps);
};

