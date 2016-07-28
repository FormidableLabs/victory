import { pick, omit, defaults } from "lodash";
import { Helpers, Events } from "victory-core";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";

export default {
  getBaseProps(props, fallbackProps) { // eslint-disable-line max-statements
    const modifiedProps = props.theme && props.theme.candlestick ?
    Helpers.modifyProps(props, fallbackProps, props.theme.candlestick.props) :
    Helpers.modifyProps(props, fallbackProps);
    const calculatedValues = this.getCalculatedValues(modifiedProps, fallbackProps);
    const { data, style, scale } = calculatedValues;
    const { groupComponent, width, height, padding } = modifiedProps;
    const parentProps = {scale, width, height, data, style: style.parent};
    return data.reduce((memo, datum, index) => {
      const eventKey = datum.eventKey;
      const x = scale.x(datum.x);
      const y1 = scale.y(datum.y[2]);
      const y2 = scale.y(datum.y[3]);
      const candleHeight = Math.abs(scale.y(datum.y[0]) - scale.y(datum.y[1]));
      const y = scale.y(Math.max(datum.y[0], datum.y[1]));
      const dataStyle = Object.assign(this.getDataStyles(datum, style.data, modifiedProps));
      const dataProps = {
        x, y, y1, y2, candleHeight, scale, data, datum, groupComponent,
        index, style: dataStyle, padding, width
      };

      const text = this.getLabelText(modifiedProps, datum, index);
      const labelStyle = this.getLabelStyle(style.labels, dataProps);
      const labelProps = {
        style: labelStyle,
        x: x - labelStyle.padding,
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
    }, {parent: parentProps});
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
    let data;

    if (props.data && props.data.length > 0) {
      data = props.data;
    } else {
      data = this.generateData(props);
    }

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

  generateData(props) {
    // create an array of values evenly spaced across the x domain that include domain min/max
    const domain = props.domain ? (props.domain.x || props.domain) :
      Scale.getBaseScale(props, "x").domain();
    const samples = 8;
    const max = Math.max(...domain);
    const values = Array(...Array(samples)).map((val, index) => {
      const v = (max / samples) * index + Math.min(...domain);
      return { x: v, open: v, close: v + 2, high: v + 3, low: v - 1};
    });
    return values;
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
      const min = Math.min(...allData);
      const max = Math.max(...allData);
      if (min === max) {
        const adjustedMax = max === 0 ? 1 : max + max;
        return [0, adjustedMax];
      }
      domain = [min, max];
    }
    return Domain.padDomain(domain, props, axis);
  },

  isTransparent(attr) {
    return attr === "none" || attr === "transparent";
  },

  getDataStyles(datum, style, props) {
    const stylesFromData = omit(datum, [
      "x", "y", "size", "name", "label", "open", "close", "high", "low"
    ]);
    const fillCheck = datum.fill || style.fill;
    const strokeCheck = datum.stroke || style.stroke;
    const candleColor = datum.open > datum.close ?
            props.candleColors.negative : props.candleColors.positive;
    const transparentCheck = this.isTransparent(datum.stroke) ||
    this.isTransparent(style.stroke);
    const strokeColor = fillCheck || transparentCheck ? fillCheck || candleColor
    : strokeCheck;
    const baseDataStyle = defaults({}, stylesFromData,
      {stroke: strokeColor || candleColor, fill: fillCheck || candleColor},
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
