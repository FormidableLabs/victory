/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import { defaults, omit } from "lodash";
import { Helpers, Data, Domain, Scale } from "victory-core";

export default {

  getBarPosition(props, datum, scale) {
    const getDefaultMin = (axis) => {
      const defaultMin = Scale.getType(scale[axis]) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;
      return datum[`_${axis}`] instanceof Date ? new Date(defaultMin) : defaultMin;
    };
    const { x, y } = Helpers.getPoint(datum);
    const y0 = datum._y0 !== undefined ? datum._y0 : getDefaultMin("y");
    const x0 = datum._x0 !== undefined ? datum._x0 : getDefaultMin("x");
    return Helpers.scalePoint({ x, y, y0, x0 }, scale, props.polar);
  },

  getBarStyle(datum, baseStyle) {
    const styleData = omit(datum, [
      "xName", "yName", "x", "y", "label", "errorX", "errorY", "eventKey"
    ]);
    return defaults({}, styleData, baseStyle);
  },

  getLabelStyle(style, datum) {
    return defaults({}, {
      angle: datum.angle,
      textAnchor: datum.textAnchor,
      verticalAnchor: datum.verticalAnchor
    }, style);
  },

  getLabelText(props, datum, index) {
    if (datum.label !== undefined) {
      return datum.label;
    }
    return Array.isArray(props.labels) ? props.labels[index] : props.labels;
  },

  getLabelAnchors(datum, horizontal) {
    const sign = datum._y >= 0 ? 1 : -1;
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
    const sign = datum._y < 0 ? -1 : 1;
    return {
      x: horizontal ? sign * defaultPadding : 0,
      y: horizontal ? 0 : sign * defaultPadding
    };
  },

  getCalculatedValues(props) {
    const { theme, horizontal } = props;
    const defaultStyles = theme && theme.bar && theme.bar.style ? theme.bar.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles);
    const data = Data.getData(props);
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
    const scale = {
      x: horizontal ? yScale : xScale,
      y: horizontal ? xScale : yScale
    };
    return { style, data, scale, domain };
  },

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "bar");
    const { style, data, scale, domain } = this.getCalculatedValues(props);
    const { horizontal, width, height, padding, standalone, theme, polar, origin } = props;
    const initialChildProps = { parent: {
      domain, scale, width, height, data, standalone,
      theme, polar, origin, padding, style: style.parent
    } };

    return data.reduce((childProps, datum, index) => {
      const eventKey = datum.eventKey || index;
      const { x, y, y0, x0 } = this.getBarPosition(props, datum, scale);
      const barStyle = this.getBarStyle(datum, style.data);
      const dataProps = {
        data, datum, horizontal, index, padding, polar, origin,
        scale, style: barStyle, width, height, x, y, y0, x0
      };

      childProps[eventKey] = {
        data: dataProps
      };

      const text = this.getLabelText(props, datum, index);
      if (text !== undefined && text !== null || props.events || props.sharedEvents) {
        childProps[eventKey].labels = this.getLabelProps(dataProps, text, style);
      }
      return childProps;
    }, initialChildProps);
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
