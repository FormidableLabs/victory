import { values, pick, omit, defaults } from "lodash";
import { Helpers, Data, Domain, Scale } from "victory-core";

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "scatter");
    const calculatedValues = this.getCalculatedValues(props);
    const { height, width, standalone, theme } = props;
    const { data, style, scale, domain } = calculatedValues;
    const initialChildProps = { parent: {
      style: style.parent, scale, domain, data, height, width, standalone, theme
    } };

    return data.reduce((childProps, datum, index) => {
      const eventKey = datum.eventKey;
      const { x, y } = Helpers.scalePoint(props, scale, datum);
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

      return childProps;
    }, initialChildProps);
  },

  getLabelProps(dataProps, text, calculatedStyle) {
    const { x, y, index, scale, datum, data } = dataProps;
    const labelStyle = this.getLabelStyle(calculatedStyle.labels, dataProps) || {};
    const sign = (datum._y1 || datum._y) < 0 ? -1 : 1;
    return {
      style: labelStyle,
      x,
      y: y - sign * (labelStyle.padding || 0),
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
    return { domain, data, scale, style, z };
  },

  getDataStyles(datum, style) {
    const stylesFromData = omit(datum, [
      "_x", "_y", "z", "size", "symbol", "name", "label", "eventKey"
    ]);
    return defaults({}, stylesFromData, style);
  },

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : props.labels);
  },

  getLabelStyle(labelStyle, dataProps) {
    const { size, style } = dataProps;
    const matchedStyle = pick(style, ["opacity", "fill"]);
    const padding = labelStyle.padding || size * 0.25; // eslint-disable-line no-magic-numbers
    return defaults({}, labelStyle, matchedStyle, { padding });
  },

  getSymbol(data, props) {
    if (props.bubbleProperty) {
      return "circle";
    }
    return data.symbol || props.symbol;
  },

  getBubbleSize(datum, props, calculatedValues) {
    const { data, z } = calculatedValues;
    const getMaxRadius = () => {
      const minPadding = Math.min(...values(Helpers.getPadding(props)));
      return Math.max(minPadding, 5); // eslint-disable-line no-magic-numbers
    };
    const zData = data.map((point) => point[z]);
    const zMin = Math.min(...zData);
    const zMax = Math.max(...zData);
    const maxRadius = props.maxBubbleSize || getMaxRadius();
    const maxArea = Math.PI * Math.pow(maxRadius, 2); // eslint-disable-line no-magic-numbers
    const area = ((datum[z] - zMin) / (zMax - zMin)) * maxArea;
    const radius = Math.sqrt(area / Math.PI);
    return Math.max(radius, 1);
  },

  getSize(data, props, calculatedValues) {
    if (data.size) {
      return typeof data.size === "function" ? data.size : Math.max(data.size, 1);
    } else if (typeof props.size === "function") {
      return props.size;
    } else if (data[calculatedValues.z]) {
      return this.getBubbleSize(data, props, calculatedValues);
    } else {
      return Math.max(props.size, 1);
    }
  }
};
