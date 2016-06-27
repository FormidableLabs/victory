import { pick, omit, defaults } from "lodash";
import { Helpers, Events } from "victory-core";
import Scale from "../../helpers/scale";

export default {
  getBaseProps(props, fallbackProps) { // eslint-disable-line max-statements
    const modifiedProps = props.theme && props.theme.candlestick ?
    Helpers.modifyProps(props, fallbackProps, props.theme.candlestick.props) :
    Helpers.modifyProps(props, fallbackProps);
    const calculatedValues = this.getCalculatedValues(modifiedProps, fallbackProps);
    const { data, style, scale } = calculatedValues;
    return data.reduce((memo, datum, index) => {
      const eventKey = datum.eventKey;
      const x = scale.x(datum.x);
      const y1 = scale.y(datum.y[2]);
      const y2 = scale.y(datum.y[3]);
      const candleHeight = Math.abs(scale.y(datum.y[0]) - scale.y(datum.y[1]));
      const y = scale.y(Math.max(datum.y[0], datum.y[1]));
      const dataStyle = Object.assign(this.getDataStyles(datum, style.data, modifiedProps));
      const dataProps = {
        x, y, y1, y2, candleHeight, scale, data, datum,
        index, style: dataStyle, padding: modifiedProps.padding, width: modifiedProps.width
      };

      const text = this.getLabelText(modifiedProps, datum, index);
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

  getCalculatedValues(props, fallbackProps) {
    const style = Helpers.getStyles(props.style, fallbackProps.style, "auto", "100%");
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
    const data = props.data;
    const accessor = {
      x: Helpers.createAccessor(props.x),
      open: Helpers.createAccessor(props.open),
      close: Helpers.createAccessor(props.close),
      high: Helpers.createAccessor(props.high),
      low: Helpers.createAccessor(props.low)
    };
    return data.map((datum) => {
      const x = accessor.x(datum);
      const open = accessor.open(datum);
      const close = accessor.close(datum);
      const high = accessor.high(datum);
      const low = accessor.low(datum);
      const y = [open, close, high, low];
      return Object.assign(
        {},
        datum,
        {x, y}
        );
    });
  },

  getDomain(props, axis) {
    if (props.domain && props.domain[axis]) {
      return props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      return props.domain;
    } else {
      const dataset = this.getData(props);
      const allData = dataset.reduce((memo, datum) => {
        return Array.isArray(datum[axis]) ?
         memo.concat(...datum[axis]) : memo.concat(datum[axis]);
      },
      []);
      const min = Math.min(...allData);
      const max = Math.max(...allData);
      if (min === max) {
        const adjustedMax = max === 0 ? 1 : max;
        return [0, adjustedMax];
      }
      return [min, max];
    }
  },

  getDataStyles(datum, style, props) {
    const stylesFromData = omit(datum, [
      "x", "y", "size", "name", "label", "open", "close", "high", "low"
    ]);
    const candleColor = datum.open > datum.close ?
            props.candleColors.negative : props.candleColors.positive;
    const baseDataStyle = defaults({}, stylesFromData, {stroke: candleColor, fill: candleColor},
      style);
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
  }
};
