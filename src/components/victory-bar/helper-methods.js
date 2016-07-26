import { assign, defaults, omit } from "lodash";
import { Helpers, Events } from "victory-core";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";

export default {

  getScale(props) {
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

  getBarPosition(props, datum, scale) {
    const yOffset = datum.yOffset || 0;
    const xOffset = datum.xOffset || 0;
    const y0 = yOffset;
    const y = datum.y + yOffset;
    const x = datum.x + xOffset;
    const formatValue = (value, axis) => {
      return datum[axis] instanceof Date ? new Date(value) : value;
    };
    return {
      x: scale.x(formatValue(x, "x")),
      y0: scale.y(formatValue(y0, "y")),
      y: scale.y(formatValue(y, "y"))
    };
  },

  getBarStyle(datum, baseStyle) {
    const styleData = omit(datum, [
      "xName", "yName", "x", "y", "label"
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
    const propsLabel = Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum);
    return datum.label || propsLabel;
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
    const sign = {
      x: datum.x < 0 ? -1 : 1,
      y: datum.y < 0 ? 1 : -1
    };
    return {
      x: horizontal ? sign.x * defaultPadding : 0,
      y: horizontal ? 0 : sign.y * defaultPadding
    };
  },

  getCalculatedValues(props, fallbackProps) {
    const defaultStyles = props.theme && props.theme.scatter ? props.theme.scatter
    : fallbackProps.style;
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const data = Events.addEventKeys(props, Data.getData(props));
    const scale = this.getScale(props);
    return { style, data, scale };
  },

  getBaseProps(props, fallbackProps) {
    const modifiedProps = Helpers.modifyProps(props, fallbackProps);
    const {style, data, scale } = this.getCalculatedValues(modifiedProps, fallbackProps);
    const { horizontal, width, height, padding } = modifiedProps;
    const childProps = {parent: { scale, width, height, data, style: style.parent }};
    for (let index = 0, len = data.length; index < len; index++) {
      const datum = data[index];
      const eventKey = datum.eventKey || index;
      const position = this.getBarPosition(modifiedProps, datum, scale);
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

      const labelStyle = this.getLabelStyle(style.labels, datum);
      const labelPadding = this.getlabelPadding(labelStyle, datum, horizontal);
      const anchors = this.getLabelAnchors(datum, horizontal);
      const labelProps = {
        style: labelStyle,
        x: horizontal ? position.y + labelPadding.x : position.x + labelPadding.x,
        y: horizontal ? position.x + labelPadding.y: position.y + labelPadding.y,
        y0: position.y0,
        text: this.getLabel(modifiedProps, datum, index),
        index,
        scale,
        datum: dataProps.datum,
        textAnchor: labelStyle.textAnchor || anchors.text,
        verticalAnchor: labelStyle.verticalAnchor || anchors.vertical,
        angle: labelStyle.angle
      };

      childProps[eventKey] = {
        data: dataProps,
        labels: labelProps
      };
    }
    return childProps;
  }
};
