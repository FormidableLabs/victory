import { values, pick, omit, defaults } from "lodash";
import { Helpers, Data, Domain, Scale } from "victory-core";

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "scatter");
    const calculatedValues = this.getCalculatedValues(props);
    const { data, style, scale } = calculatedValues;
    const childProps = { parent: {
      style: style.parent, scale, data, height: props.height, width: props.width
    }};
    for (let index = 0, len = data.length; index < len; index++) {
      const datum = data[index];
      const eventKey = datum.eventKey;
      const x = scale.x(datum.x1 || datum.x);
      const y = scale.y(datum.y1 || datum.y);
      const dataProps = {
        x, y, datum, data, index, scale,
        size: this.getSize(datum, props, calculatedValues),
        symbol: this.getSymbol(datum, props),
        style: this.getDataStyles(datum, style.data)
      };

      childProps[eventKey] = { data: dataProps };
      const text = this.getLabelText(props, datum, index);
      if (text !== undefined && text !== null || props.events || props.sharedEvents) {
        childProps[eventKey].labels = this.getLabelProps(dataProps, text, style);
      }
    }
    return childProps;
  },

  getLabelProps(dataProps, text, calculatedStyle) {
    const { x, y, index, scale, datum, data } = dataProps;
    const labelStyle = this.getLabelStyle(calculatedStyle.labels, dataProps) || {};
    return {
      style: labelStyle,
      x,
      y: y - (labelStyle.padding || 0),
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
    const defaultStyles = props.theme && props.theme.scatter && props.theme.scatter.style ?
      props.theme.scatter.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const data = Data.getData(props);
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomain(props, "x"),
      y: Domain.getDomain(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    const z = props.bubbleProperty || "z";
    return {data, scale, style, z};
  },

  getDataStyles(datum, style) {
    const stylesFromData = omit(datum, [
      "x", "y", "z", "size", "symbol", "name", "label", "eventKey"
    ]);
    const baseDataStyle = defaults({}, stylesFromData, style);
    return Helpers.evaluateStyle(baseDataStyle, datum);
  },

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum));
  },

  getLabelStyle(labelStyle, dataProps) {
    const { datum, size, style } = dataProps;
    const matchedStyle = pick(style, ["opacity", "fill"]);
    const padding = labelStyle.padding || size * 0.25;
    const baseLabelStyle = defaults({}, labelStyle, matchedStyle, {padding});
    return Helpers.evaluateStyle(baseLabelStyle, datum);
  },

  getSymbol(data, props) {
    if (props.bubbleProperty) {
      return "circle";
    }
    const symbol = data.symbol || props.symbol;
    return Helpers.evaluateProp(symbol, data);
  },

  getBubbleSize(datum, props, calculatedValues) {
    const {data, z} = calculatedValues;
    const getMaxRadius = () => {
      const minPadding = Math.min(...values(Helpers.getPadding(props)));
      return Math.max(minPadding, 5);
    };
    const zData = data.map((point) => point[z]);
    const zMin = Math.min(...zData);
    const zMax = Math.max(...zData);
    const maxRadius = props.maxBubbleSize || getMaxRadius();
    const maxArea = Math.PI * Math.pow(maxRadius, 2);
    const area = ((datum[z] - zMin) / (zMax - zMin)) * maxArea;
    const radius = Math.sqrt(area / Math.PI);
    return Math.max(radius, 1);
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
