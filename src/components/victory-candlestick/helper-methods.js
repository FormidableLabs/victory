import { assign, pick, omit, defaults } from "lodash";
import { Helpers, Log, Scale, Domain, Data } from "victory-core";

export default {
  getBaseProps(props, fallbackProps) { // eslint-disable-line max-statements
    props = Helpers.modifyProps(props, fallbackProps, "candlestick");
    const calculatedValues = this.getCalculatedValues(props);
    const { data, style, scale } = calculatedValues;
    const { groupComponent, width, height, padding } = props;
    const childProps = {parent: {scale, width, height, data, style: style.parent}};
    for (let index = 0, len = data.length; index < len; index++) {
      const datum = data[index];
      const eventKey = datum.eventKey || index;
      const x = scale.x(datum.x1 || datum.x);
      const y1 = scale.y(datum.high);
      const y2 = scale.y(datum.low);
      const candleHeight = Math.abs(scale.y(datum.open) - scale.y(datum.close));
      const y = scale.y(Math.max(datum.open, datum.close));
      const dataStyle = this.getDataStyles(datum, style.data, props);
      const dataProps = {
        x, y, y1, y2, candleHeight, scale, data, datum, groupComponent,
        index, style: dataStyle, padding, width
      };

      childProps[eventKey] = {
        data: dataProps
      };
      const text = this.getLabelText(props, datum, index);
      if (text !== undefined && text !== null || props.events || props.sharedEvents) {
        childProps[eventKey].labels = this.getLabelProps(dataProps, text, style);
      }
    }
    return childProps;
  },

  getLabelProps(dataProps, text, calculatedStyle) {
    const {x, y1, index, scale, datum, data } = dataProps;
    const labelStyle = this.getLabelStyle(calculatedStyle.labels, dataProps) || {};
    return {
      style: labelStyle,
      y: y1 - (labelStyle.padding || 0),
      x,
      text,
      index,
      scale,
      datum,
      data,
      textAnchor: labelStyle.textAnchor,
      verticalAnchor: labelStyle.verticalAnchor || "end",
      angle: labelStyle.angle
    };
  },

  getCalculatedValues(props) {
    const { theme } = props;
    const defaultStyle = theme && theme.candlestick && theme.candlestick.style ?
      theme.candlestick.style : {};
    const style = Helpers.getStyles(props.style, defaultStyle, "auto", "100%");
    const data = Data.addEventKeys(props, this.getData(props));
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
    if (!props.data || props.data.length < 1) {
      Log.warn("This is an empty dataset.");
      return [];
    }
    const stringMap = {
      x: Data.createStringMap(props, "x")
    };

    const accessor = {
      x: Helpers.createAccessor(props.x !== undefined ? props.x : "x"),
      open: Helpers.createAccessor(props.open !== undefined ? props.open : "open"),
      close: Helpers.createAccessor(props.close !== undefined ? props.close : "close"),
      high: Helpers.createAccessor(props.high !== undefined ? props.high : "high"),
      low: Helpers.createAccessor(props.low !== undefined ? props.low : "low")
    };
    return props.data.map((datum, index) => {
      const evaluatedX = accessor.x(datum);
      const x = evaluatedX !== undefined ? evaluatedX : index;
      const open = accessor.open(datum);
      const close = accessor.close(datum);
      const high = accessor.high(datum);
      const low = accessor.low(datum);
      const y = [open, close, high, low];
      return assign(
        {},
        datum,
        {x, y, open, close, high, low},
        typeof x === "string" ? { x: stringMap.x[x], xName: x } : {}

        );
    });
  },

  getDomain(props, axis) {
    let domain;
    if (props.domain && props.domain[axis]) {
      domain = props.domain[axis];
    } else if (props.domain && Array.isArray(props.domain)) {
      domain = props.domain;
    } else {
      const dataset = this.getData(props);
      const allData = dataset.reduce((memo, datum) => {
        return Array.isArray(datum[axis]) ?
         memo.concat(...datum[axis]) : memo.concat(datum[axis]);
      },
      []);

      if (allData.length < 1) {
        return Scale.getBaseScale(props, axis).domain();
      }

      const min = Math.min(...allData);
      const max = Math.max(...allData);
      if (min === max) {
        const adjustedMax = max === 0 ? 1 : max + max;
        return [0, adjustedMax];
      }
      domain = [min, max];
    }
    return Domain.cleanDomain(Domain.padDomain(domain, props, axis), props);
  },

  isTransparent(attr) {
    return attr === "none" || attr === "transparent";
  },

  getDataStyles(datum, style, props) {
    style = style || {};
    const stylesFromData = omit(datum, [
      "x", "y", "size", "name", "label", "open", "close", "high", "low"
    ]);
    const candleColor = datum.open > datum.close ?
      props.candleColors.negative : props.candleColors.positive;
    const fill = datum.fill || style.fill || candleColor;
    const strokeColor = datum.stroke || style.stroke;
    const stroke = this.isTransparent(strokeColor) ? fill : strokeColor || "black";
    const baseDataStyle = defaults({}, stylesFromData, {stroke, fill}, style);
    return Helpers.evaluateStyle(baseDataStyle, datum);
  },

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum));
  },

  getLabelStyle(labelStyle, dataProps) {
    labelStyle = labelStyle || {};
    const { datum, size, style } = dataProps;
    const matchedStyle = pick(style, ["opacity", "fill"]);
    const padding = labelStyle.padding || size * 0.25;
    const baseLabelStyle = defaults({}, labelStyle, matchedStyle, {padding});
    return Helpers.evaluateStyle(baseLabelStyle, datum);
  }
};
