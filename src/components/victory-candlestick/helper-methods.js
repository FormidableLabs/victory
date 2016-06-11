import { pick, omit, defaults, flatten } from "lodash";
import { Helpers, Events } from "victory-core";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";
// import Data from "../../helpers/data";

export default {
  getBaseProps(props, defaultStyles) { // eslint-disable-line max-statements
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
      const dataStyle = Object.assign(this.getDataStyles(datum, style.data),
        {stroke: candleColor, fill: candleColor});
      const dataProps = {
        x, y, y1, y2, candleColor, candleHeight, size, scale, data, datum,
        index, style: dataStyle, padding: props.padding, width: props.width
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
    const data = Events.addEventKeys(props, this.getData(props));
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: this.getDomain(props, "x"),
      y: this.getDomain(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    return {data, scale, style};
  },

  getData(props) {
    return props.data.map((datum) => {
      const x = datum.x;
      const y = [datum.open, datum.close, datum.high, datum.low];
      return Object.assign(
        {},
        datum,
        {x, y}
        );
    });
  },

  getDomain(props, axis) {
    const dataset = this.getData(props);
    const allData = flatten(dataset).map((datum) => {
      return datum[axis];
    });
    const flattened = flatten(allData);
    const min = Math.min(...flattened);
    const max = Math.max(...flattened);
    // TODO: is this the correct behavior, or should we just error. How do we
    // handle charts with just one data point?
    if (min === max) {
      const adjustedMax = max === 0 ? 1 : max;
      return [0, adjustedMax];
    }
    return [min, max];
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

  getSize(data, props) {
    let size;
    if (data.size) {
      size = typeof data.size === "function" ? data.size : Math.max(data.size, 1);
    } else if (typeof props.size === "function") {
      size = props.size;
    } else {
      size = Math.max(props.size, 1);
    }
    return Helpers.evaluateProp(size, data);
  }
};
