import { assign, defaults, omit } from "lodash";
import { Helpers, Data, Domain, Scale } from "victory-core";

export default {

  getScale(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "bar");
    const { horizontal } = props;
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    const xScale = Scale.getBaseScale(props, "x").domain(domain.x).range(range.x);
    const yScale = Scale.getBaseScale(props, "y").domain(domain.y).range(range.y);
    return {
      x: horizontal ? yScale : xScale,
      y: horizontal ? xScale : yScale
    };
  },

  getBarWidth(props) {
    const {style, width, data} = props;
    const padding = props.padding.left || props.padding;
    const defaultWidth = data.length === 0 ? 8 : (width - 2 * padding) / data.length;
    return style && style.width ? style.width : defaultWidth;
  },

  getBarPosition(props, datum, scale) {
    const defaultMin = Scale.getType(scale.y) === "log" ?
      1 / Number.MAX_SAFE_INTEGER : 0;

    const y0 = datum.y0 || defaultMin;
    const formatValue = (value, axis) => {
      return datum[axis] instanceof Date ? new Date(value) : value;
    };
    return {
      x: scale.x(formatValue(datum.x1 || datum.x, "x")),
      y0: scale.y(formatValue(y0, "y")),
      y: scale.y(formatValue(datum.y1 || datum.y, "y"))
    };
  },

  getBarStyle(datum, baseStyle) {
    const styleData = omit(datum, [
      "xName", "yName", "x", "y", "label", "errorX", "errorY", "eventKey"
    ]);
    return Helpers.evaluateStyle(defaults({}, styleData, baseStyle), datum);
  },

  getLabelStyle(style, datum) {
    const labelStyle = defaults({}, {
      angle: datum.angle,
      textAnchor: datum.textAnchor,
      verticalAnchor: datum.verticalAnchor
    }, style);
    return Helpers.evaluateStyle(labelStyle, datum);
  },

  getLabel(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum));
  },

  getLabelAnchors(datum, horizontal) {
    const sign = datum.y >= 0 ? 1 : -1;
    if (!horizontal) {
      return {
        vertical: sign >= 0 ? "end" : "start",
        text: "middle"
      };
    } else {
      return {
        vertical: "middle",
        text: sign >= 0 ? "start" : "end"
      };
    }
  },

  getlabelPadding(style, datum, horizontal) {
    const defaultPadding = style.padding || 0;
    const sign = datum.y < 0 ? -1 : 1;
    return {
      x: horizontal ? sign * defaultPadding : 0,
      y: horizontal ? 0 : sign * defaultPadding
    };
  },

  getCalculatedValues(props) {
    const { theme } = props;
    const defaultStyles = theme && theme.bar && theme.bar.style ? theme.bar.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const data = Data.getData(props);
    const scale = this.getScale(props);
    return { style, data, scale };
  },

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "bar");
    const {style, data, scale } = this.getCalculatedValues(props);
    const { horizontal, width, height, padding } = props;
    const childProps = {parent: { scale, width, height, data, style: style.parent }};
    for (let index = 0, len = data.length; index < len; index++) {
      const datum = data[index];
      const eventKey = datum.eventKey || index;
      const position = this.getBarPosition(props, datum, scale);
      const dataProps = assign(
        {
          style: this.getBarStyle(datum, style.data),
          index,
          datum,
          scale,
          horizontal,
          padding,
          width,
          data
        },
        position
      );

      childProps[eventKey] = {
        data: dataProps
      };
      const text = this.getLabel(props, datum, index);
      if (text !== undefined && text !== null || props.events || props.sharedEvents) {
        childProps[eventKey].labels = this.getLabelProps(dataProps, text, style);
      }
    }
    return childProps;
  },

  getLabelProps(dataProps, text, calculatedStyle) {
    const { datum, data, horizontal, x, y, y0, index, scale } = dataProps;
    const labelStyle = this.getLabelStyle(calculatedStyle.labels, datum);
    const labelPadding = this.getlabelPadding(labelStyle, datum, horizontal);
    const anchors = this.getLabelAnchors(datum, horizontal);
    return {
      style: labelStyle,
      x: horizontal ? y + labelPadding.x : x + labelPadding.x,
      y: horizontal ? x + labelPadding.y : y - labelPadding.y,
      y0,
      text,
      index,
      scale,
      datum,
      data,
      horizontal,
      textAnchor: labelStyle.textAnchor || anchors.text,
      verticalAnchor: labelStyle.verticalAnchor || anchors.vertical,
      angle: labelStyle.angle
    };
  }
};
