import { assign, defaults, omit } from "lodash";
import { Helpers } from "victory-core";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";
import Events from "../../helpers/events";

export default {
  getScale(props) {
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    return {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
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
    return defaults({}, styleData, baseStyle);
  },

  getLabelStyle(style, datum) {
    const labelStyle = defaults({
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

  getlabelPadding(style, horizontal) {
    const defaultPadding = style.padding || 0;
    return {
      x: horizontal ? defaultPadding : 0,
      y: horizontal ? 0 : defaultPadding
    };
  },

  addEventKeys(props, data) {
    const eventKeyAccessor = Events.getEventKey(props.eventKey);
    return data.map((datum, index) => {
      const eventKey = datum.eventKey || eventKeyAccessor(datum) || index;
      return assign({eventKey}, datum);
    });
  },

  getBaseProps(props, defaultStyles) {
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const data = this.addEventKeys(props, Data.getData(props));
    const scale = this.getScale(props);
    const { horizontal } = props;
    return data.reduce((memo, datum, index) => {
      const eventKey = datum.eventKey;
      const position = this.getBarPosition(props, datum, scale);
      const barStyle = this.getBarStyle(datum, style.data);
      const dataProps = assign(
        {
          key: `bar-${index}`,
          style: Helpers.evaluateStyle(barStyle, datum),
          index,
          datum,
          scale,
          horizontal
        },
        position
      );

      const text = this.getLabel(props, dataProps.datum, index);
      const labelStyle = this.getLabelStyle(style.labels, dataProps.datum);
      const padding = this.getlabelPadding(labelStyle, horizontal);
      const anchors = this.getLabelAnchors(dataProps.datum, horizontal);
      const labelPosition = {
        x: horizontal ? position.y : position.x,
        y: horizontal ? position.x : position.y
      };
      const labelProps = {
        key: `bar-label-${index}`,
        style: labelStyle,
        x: labelPosition.x + padding.x,
        y: labelPosition.y - padding.y,
        y0: position.y0,
        text,
        index,
        scale,
        datum: dataProps.datum,
        textAnchor: labelStyle.textAnchor || anchors.text,
        verticalAnchor: labelStyle.verticalAnchor || anchors.vertical,
        angle: labelStyle.angle
      };
      memo[eventKey] = {
        data: dataProps,
        labels: labelProps
      };
      return memo;
    }, {});
  }
};
