import { pick, omit, defaults } from "lodash";
import { Helpers, Events } from "victory-core";
import Scale from "../../helpers/scale";
// import Domain from "../../helpers/domain";
import Data from "../../helpers/data";

export default {
  getBaseProps(props, defaultStyles) {
    const calculatedValues = this.getCalculatedValues(props, defaultStyles);
    const { data, style, scale } = calculatedValues;
    return data.reduce((memo, datum, index) => {
      const eventKey = datum.eventKey;
      const x = scale.x(datum.x);
      const y1 = scale.y(datum.high);
      const y2 = scale.y(datum.low);
      const candleColor = datum.open > datum.close ?
            props.candleColors.negative : props.candleColors.positive;
      const candleHeight = Math.abs(scale.y(datum.open) - scale.y(datum.close));
      const y = scale.y(Math.max(datum.open, datum.close));
      const size = this.getSize(datum, props, calculatedValues);
      const dataStyle = this.getDataStyles(datum, style.data);
      const dataProps = {
        x, y, y1, y2, candleColor, candleHeight, size, scale, data, datum,
        index, style: dataStyle
      };

      const text = this.getLabelText(props, datum, index);
      const labelStyle = this.getLabelStyle(style.labels, dataProps);
      const labelProps = {
        style: labelStyle,
        x,
        y: y - labelStyle.padding,
        text,
        index,
        scale,
        datum: dataProps.datum,
        textAnchor: labelStyle.textAnchor,
        verticalAnchor: labelStyle.verticalAnchor || "end",
        angle: labelStyle.angle
      };
      memo[eventKey] = {
        data: dataProps,
        labels: labelProps
      };
      return memo;
    }, {});
  },

  getCalculatedValues(props, defaultStyles) {
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const data = Events.addEventKeys(props, Data.getData(props));
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    // const domain = {
    //   x: Domain.getDomain(props, "x"),
    //   y: Domain.getDomain(props, "y")
    // };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain([50, 400]).range(range.x),
      y: Scale.getBaseScale(props, "y").domain([0, 100]).range(range.y)
    };
    return {data, scale, style};
  },

  getDataStyles(datum, style) {
    const stylesFromData = omit(datum, [
      "x", "y", "size", "name", "label", "open", "close", "high", "low"
    ]);
    const baseDataStyle = defaults({}, stylesFromData, style);
    return Helpers.evaluateStyle(baseDataStyle, datum);
  },

  getLabelText(props, datum, index) {
    const propsLabel = Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum);
    return datum.label || propsLabel;
  },

  getLabelStyle(labelStyle, dataProps) {
    const { datum, size, style } = dataProps;
    const matchedStyle = pick(style, ["opacity", "fill"]);
    const padding = labelStyle.padding || size * 0.25;
    const baseLabelStyle = defaults({}, labelStyle, matchedStyle, {padding});
    return Helpers.evaluateStyle(baseLabelStyle, datum);
  },

  getSize(data, props, calculatedValues) {
    let size;
    if (data.size) {
      size = typeof data.size === "function" ? data.size : Math.max(data.size, 1);
    } else if (typeof props.size === "function") {
      size = props.size;
    } else if (data[calculatedValues.z]) {
      size = this.getBubbleSize(data, props, calculatedValues);
    } else {
      size = Math.max(props.size, 1);
    }
    return Helpers.evaluateProp(size, data);
  }
};
