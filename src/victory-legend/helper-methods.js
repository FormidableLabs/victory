import { defaults, assign, maxBy, sumBy, groupBy, keys, sum, range } from "lodash";
import Helpers from "../victory-util/helpers";
import Style from "../victory-util/style";
import TextSize from "../victory-util/textsize";


const calculateLegendHeight = (props, textSizes) => {
  if (props.standalone) {
    return props.height;
  }
  const { gutter, itemsPerRow, isHorizontal, borderPadding } = props;
  const { top = 0, bottom = 0 } = borderPadding;
  const itemCount = textSizes.length;
  const rowCount = itemsPerRow ? Math.ceil(itemCount / itemsPerRow) : 1;
  const contentHeight = isHorizontal
    ? maxBy(textSizes, "height").height * rowCount + gutter * (rowCount - 1)
    : (sumBy(textSizes, "height") + gutter * (itemCount - 2)) / rowCount;

  return top + contentHeight + bottom;
};

const calculateLegendWidth = (props, itemCount, maxTextWidth) => {
  if (props.standalone) {
    return props.width;
  }
  const { gutter, itemsPerRow, symbolSpacer, isHorizontal, borderPadding } = props;
  const { left = 0, right = 0 } = borderPadding;
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

  return left + contentWidth + right;
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

const getStyles = (props, styleObject) => {
  const style = props.style || {};
  styleObject = styleObject || {};
  const parentStyleProps = { height: "100%", width: "100%" };
  return {
    parent: defaults(style.parent, styleObject.parent, parentStyleProps),
    data: defaults({}, style.data, styleObject.data),
    labels: defaults({}, style.labels, styleObject.labels),
    border: defaults({}, style.border, styleObject.border)
  };
};

const getCalculatedValues = (props) => {
  const { orientation, theme } = props;
  const defaultStyles = theme && theme.legend && theme.legend.style ? theme.legend.style : {};
  const style = getStyles(props, defaultStyles);
  const colorScale = getColorScale(props);
  const isHorizontal = orientation === "horizontal";
  const borderPadding = Helpers.formatPadding(props.borderPadding);
  return assign({}, props, { style, isHorizontal, colorScale, borderPadding });
};

const getColumn = (props, index) => {
  const { itemsPerRow, isHorizontal } = props;
  if (!itemsPerRow) {
    return isHorizontal ? index : 1;
  }
  return isHorizontal ? index % itemsPerRow : Math.floor(index / itemsPerRow);
};

const getRow = (props, index) => {
  const { itemsPerRow, isHorizontal } = props;
  if (!itemsPerRow) {
    return isHorizontal ? 1 : index;
  }
  return isHorizontal ? Math.floor(index / itemsPerRow) : index % itemsPerRow;
};

const getSymbolSize = (datum, fontSize) => {
  // eslint-disable-next-line no-magic-numbers
  return datum.symbol && datum.symbol.size ? datum.symbol.size : fontSize / 2.5;
};

const groupData = (props) => {
  const { data } = props;
  const labelStyles = getLabelStyles(props);
  return data.map((datum, index) => {
    const { fontSize } = labelStyles[index];
    return {
      ...datum,
      size: getSymbolSize(datum, fontSize),
      textSize: TextSize.approximateTextSize(datum.name, labelStyles[index]),
      column: getColumn(props, index),
      row: getRow(props, index)
    };
  });
};

const getColumnWidths = (props, data) => {
  const { symbolSpacer = 0 } = props;
  const dataByColumn = groupBy(data, "column");
  const columns = keys(dataByColumn);
  return columns.reduce((memo, curr, index) => {
    const gutter = index === columns.length - 1 ? 0 : props.gutter;
    const lengths = dataByColumn[curr].map((d) => {
      return d.textSize.width + d.size + symbolSpacer + gutter;
    });
    memo[index] = Math.max(...lengths);
    return memo;
  }, []);
};

const getRowHeights = (props, data) => {
  const dataByColumn = groupBy(data, "row");
  return keys(dataByColumn).reduce((memo, curr, index) => {
    const datum = dataByColumn[curr];
    const lengths = datum.map((d) => d.textSize.height + d.size);
    memo[index] = Math.max(...lengths);
    return memo;
  }, []);
};


export default (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "legend");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    data, standalone, theme, padding, style, colorScale, width, height,
   symbolSpacer = 0, borderPadding, x = 0, y = 0
  } = props;
  const groupedData = groupData(props);
  const columnWidths = getColumnWidths(props, groupedData);
  const rowHeights = getRowHeights(props, groupedData);
  const labelStyles = getLabelStyles(props);
  const initialChildProps = {
    parent: { height, width, data, standalone, theme, padding, style: style.parent }
  };
  const borderProps = {
    x, y, style: style.border,
    height: sum(rowHeights),
    width: sum(columnWidths)
  };

  const getOffset = (datum) => {
    const { column, row } = datum;
    return {
      x: range(column).reduce((memo, curr) => (memo += columnWidths[curr]), 0),
      y: range(row).reduce((memo, curr) => (memo += rowHeights[curr]), 0)
    };
  };

  return groupedData.reduce((childProps, datum, i) => {
    const color = colorScale[i % colorScale.length];
    const dataStyle = defaults({}, datum.symbol, style.data, { fill: color });
    const eventKey = datum.eventKey || i;
    const offset = getOffset(datum);
    const originY = y + borderPadding.top + (datum.size / 2) + symbolSpacer;
    const originX = x + borderPadding.left + (datum.size / 2) + symbolSpacer;
    const dataProps = {
      index: i,
      data, datum,
      key: `legend-symbol-${i}`,
      symbol: dataStyle.type || "circle",
      size: datum.size,
      style: dataStyle,
      y: originY + offset.y,
      x: originX + offset.x
    };

    const labelProps = {
      datum, data,
      key: `legend-label-${i}`,
      text: datum.name,
      style: labelStyles[i],
      y: originY + offset.y,
      x: originX + offset.x + symbolSpacer + (datum.size / 2)
    };
    childProps[eventKey] = { data: dataProps, labels: labelProps, border: borderProps };

    return childProps;
  }, initialChildProps);
};

