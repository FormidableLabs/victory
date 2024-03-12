import { defaults, groupBy, range } from "lodash";
import { Helpers, Style, TextSize } from "victory-core";
import { VictoryLegendProps } from "./victory-legend";

const getColorScale = (props) => {
  const { colorScale } = props;
  return typeof colorScale === "string"
    ? Style.getColorScale(colorScale)
    : colorScale || [];
};

const getLabelStyles = (props) => {
  const { data, style } = props;
  return data.map((datum, index) => {
    const baseLabelStyles = defaults({}, datum.labels, style.labels);
    return Helpers.evaluateStyle(baseLabelStyles, { datum, index, data });
  });
};

const getStyles = (props, styleObject: VictoryLegendProps["style"] = {}) => {
  const style = props.style || {};
  const parentStyleProps = { height: "100%", width: "100%" };
  return {
    parent: defaults(style.parent, styleObject.parent, parentStyleProps),
    data: defaults({}, style.data, styleObject.data),
    labels: defaults({}, style.labels, styleObject.labels),
    border: defaults({}, style.border, styleObject.border),
    title: defaults({}, style.title, styleObject.title),
  };
};

const getCalculatedValues = (props) => {
  const { orientation, theme } = props;
  const defaultStyles =
    theme && theme.legend && theme.legend.style ? theme.legend.style : {};
  const style = getStyles(props, defaultStyles);
  const colorScale = getColorScale(props);
  const isHorizontal = orientation === "horizontal";
  const borderPadding = Helpers.getPadding({ padding: props.borderPadding });
  return Object.assign({}, props, {
    style,
    isHorizontal,
    colorScale,
    borderPadding,
  });
};

const getColumn = (props, index) => {
  const { itemsPerRow, isHorizontal } = props;
  if (!itemsPerRow) {
    return isHorizontal ? index : 0;
  }
  return isHorizontal ? index % itemsPerRow : Math.floor(index / itemsPerRow);
};

const getRow = (props, index) => {
  const { itemsPerRow, isHorizontal } = props;
  if (!itemsPerRow) {
    return isHorizontal ? 0 : index;
  }
  return isHorizontal ? Math.floor(index / itemsPerRow) : index % itemsPerRow;
};

const groupData = (props) => {
  const { data } = props;
  const style = (props.style && props.style.data) || {};
  const labelStyles = getLabelStyles(props);
  return data.map((datum, index) => {
    const symbol = datum.symbol || {};
    const { fontSize } = labelStyles[index];
    // eslint-disable-next-line no-magic-numbers
    const size = symbol.size || style.size || fontSize / 2.5;
    const symbolSpacer = props.symbolSpacer || Math.max(size, fontSize);
    return {
      ...datum,
      size,
      symbolSpacer,
      fontSize,
      textSize: TextSize.approximateTextSize(datum.name, labelStyles[index]),
      column: getColumn(props, index),
      row: getRow(props, index),
    };
  });
};

const getColumnWidths = (props, data) => {
  const gutter = props.gutter || {};
  const gutterWidth =
    typeof gutter === "object"
      ? (gutter.left || 0) + (gutter.right || 0)
      : gutter || 0;
  const dataByColumn = groupBy(data, "column");
  const columns = Object.keys(dataByColumn);
  return columns.reduce<number[]>((memo, curr, index) => {
    const lengths = dataByColumn[curr].map((d) => {
      return d.textSize.width + d.size + d.symbolSpacer + gutterWidth;
    });
    memo[index] = Math.max(...lengths);
    return memo;
  }, []);
};

const getRowHeights = (props, data) => {
  const gutter = props.rowGutter || {};
  const gutterHeight =
    typeof gutter === "object"
      ? (gutter.top || 0) + (gutter.bottom || 0)
      : gutter || 0;
  const dataByRow = groupBy(data, "row");
  return Object.keys(dataByRow).reduce<number[]>((memo, curr, index) => {
    const rows = dataByRow[curr];
    const lengths = rows.map((d) => {
      return d.textSize.height + d.symbolSpacer + gutterHeight;
    });
    memo[index] = Math.max(...lengths);
    return memo;
  }, []);
};

const getTitleDimensions = (props) => {
  const style = (props.style && props.style.title) || {};
  const textSize = TextSize.approximateTextSize(props.title, style);
  const padding = style.padding || 0;
  return {
    height: textSize.height + 2 * padding || 0,
    width: textSize.width + 2 * padding || 0,
  };
};

const getOffset = (datum, rowHeights, columnWidths) => {
  const { column, row } = datum;
  return {
    x: range(column).reduce((memo, curr) => memo + columnWidths[curr], 0),
    y: range(row).reduce((memo, curr) => memo + rowHeights[curr], 0),
  };
};

const getAnchors = (titleOrientation, centerTitle) => {
  const standardAnchors = {
    textAnchor: titleOrientation === "right" ? "end" : "start",
    verticalAnchor: titleOrientation === "bottom" ? "end" : "start",
  };
  if (centerTitle) {
    const horizontal =
      titleOrientation === "top" || titleOrientation === "bottom";
    return {
      textAnchor: horizontal ? "middle" : standardAnchors.textAnchor,
      verticalAnchor: horizontal ? standardAnchors.verticalAnchor : "middle",
    };
  }
  return standardAnchors;
};

const getTitleStyle = (props) => {
  const { titleOrientation, centerTitle, titleComponent } = props;
  const baseStyle = (props.style && props.style.title) || {};
  const componentStyle =
    (titleComponent.props && titleComponent.props.style) || {};
  const anchors = getAnchors(titleOrientation, centerTitle);
  return Array.isArray(componentStyle)
    ? componentStyle.map((obj) => defaults({}, obj, baseStyle, anchors))
    : defaults({}, componentStyle, baseStyle, anchors);
};

// eslint-disable-next-line complexity
const getTitleProps = (props, borderProps) => {
  const { title, titleOrientation, centerTitle, borderPadding } = props;
  const { height, width } = borderProps;
  const style = getTitleStyle(props);
  const padding = Array.isArray(style) ? style[0].padding : style.padding;
  const horizontal =
    titleOrientation === "top" || titleOrientation === "bottom";
  const xOrientation = titleOrientation === "bottom" ? "bottom" : "top";
  const yOrientation = titleOrientation === "right" ? "right" : "left";
  const standardPadding = {
    x: centerTitle ? width / 2 : borderPadding[xOrientation] + (padding || 0),
    y: centerTitle ? height / 2 : borderPadding[yOrientation] + (padding || 0),
  };
  const getPadding = () => {
    return borderPadding[titleOrientation] + (padding || 0);
  };
  const xOffset = horizontal ? standardPadding.x : getPadding();
  const yOffset = horizontal ? getPadding() : standardPadding.y;

  return {
    x:
      titleOrientation === "right"
        ? props.x + width - xOffset
        : props.x + xOffset,
    y:
      titleOrientation === "bottom"
        ? props.y + height - yOffset
        : props.y + yOffset,
    style,
    text: title,
  };
};

const getBorderProps = (props, contentHeight, contentWidth) => {
  const { x, y, borderPadding, style } = props;
  const height =
    (contentHeight || 0) + borderPadding.top + borderPadding.bottom;
  const width = (contentWidth || 0) + borderPadding.left + borderPadding.right;
  return {
    x,
    y,
    height,
    width,
    style: Object.assign({ fill: "none" }, style.border),
  };
};

export const getDimensions = (initialProps, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(
    initialProps,
    fallbackProps,
    "legend",
  );
  const props = Object.assign(
    {},
    modifiedProps,
    getCalculatedValues(modifiedProps),
  );
  const { title, titleOrientation } = props;
  const groupedData = groupData(props);
  const columnWidths = getColumnWidths(props, groupedData);
  const rowHeights = getRowHeights(props, groupedData);
  const titleDimensions = title
    ? getTitleDimensions(props)
    : { height: 0, width: 0 };

  return {
    height:
      titleOrientation === "left" || titleOrientation === "right"
        ? Math.max(sum(rowHeights), titleDimensions.height)
        : sum(rowHeights) + titleDimensions.height,
    width:
      titleOrientation === "left" || titleOrientation === "right"
        ? sum(columnWidths) + titleDimensions.width
        : Math.max(sum(columnWidths), titleDimensions.width),
  };
};

export const getBaseProps = (initialProps, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(
    initialProps,
    fallbackProps,
    "legend",
  );
  const props = Object.assign(
    {},
    modifiedProps,
    getCalculatedValues(modifiedProps),
  );
  const {
    data,
    standalone,
    theme,
    padding,
    style,
    colorScale,
    gutter,
    rowGutter,
    borderPadding,
    title,
    titleOrientation,
    name,
    x = 0,
    y = 0,
  } = props;
  const groupedData = groupData(props);
  const columnWidths = getColumnWidths(props, groupedData);
  const rowHeights = getRowHeights(props, groupedData);
  const labelStyles = getLabelStyles(props);
  const titleDimensions = title
    ? getTitleDimensions(props)
    : { height: 0, width: 0 };
  const titleOffset = {
    x: titleOrientation === "left" ? titleDimensions.width : 0,
    y: titleOrientation === "top" ? titleDimensions.height : 0,
  };
  const gutterOffset = {
    x: gutter && typeof gutter === "object" ? gutter.left || 0 : 0,
    y: rowGutter && typeof rowGutter === "object" ? rowGutter.top || 0 : 0,
  };
  const { height, width } = getDimensions(props, fallbackProps);
  const borderProps = getBorderProps(props, height, width);
  const titleProps = getTitleProps(props, borderProps);
  const initialChildProps = {
    parent: {
      data,
      standalone,
      theme,
      padding,
      name,
      height: props.height,
      width: props.width,
      style: style.parent,
    },
    all: { border: borderProps, title: titleProps },
  };
  return groupedData.reduce((childProps, datum, i) => {
    const color = colorScale[i % colorScale.length];
    const dataStyle = defaults({}, datum.symbol, style.data, { fill: color });
    const eventKey = !Helpers.isNil(datum.eventKey) ? datum.eventKey : i;
    const offset = getOffset(datum, rowHeights, columnWidths);
    const originY = y + borderPadding.top + datum.symbolSpacer;
    const originX = x + borderPadding.left + datum.symbolSpacer;
    const dataProps = {
      index: i,
      data,
      datum,
      symbol: dataStyle.type || dataStyle.symbol || "circle",
      size: datum.size,
      style: dataStyle,
      y: originY + offset.y + titleOffset.y + gutterOffset.y,
      x: originX + offset.x + titleOffset.x + gutterOffset.x,
    };

    const labelProps = {
      datum,
      data,
      text: datum.name,
      style: labelStyles[i],
      y: dataProps.y,
      x: dataProps.x + datum.symbolSpacer + datum.size / 2,
    };
    childProps[eventKey] = { data: dataProps, labels: labelProps };

    return childProps;
  }, initialChildProps);
};

/**
 * Computes the sum of the values in `array`.
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 */
function sum(array: number[]) {
  if (array && array.length) {
    let value = 0;
    for (let i = 0; i < array.length; i++) {
      value += array[i];
    }
    return value;
  }
  return 0;
}
