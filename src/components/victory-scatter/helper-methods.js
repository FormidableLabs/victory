import { values, pick, omit, defaults } from "lodash";
import { Helpers, Events } from "victory-core";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import Size from "../../helpers/size";

export default {
  getBaseProps(props, defaultStyles, defaultWidthHeight) {
    defaultStyles = props.theme && props.theme.scatter ? props.theme.scatter : defaultStyles;
    props = Object.assign({}, props, Size.getWidthHeight(props, defaultWidthHeight));
    const calculatedValues = this.getCalculatedValues(props, defaultStyles);
    const { data, style, scale } = calculatedValues;
    const { height, width } = props;
    const parentProps = {style: style.parent, scale, data, height, width};
    return data.reduce((memo, datum, index) => {
      const eventKey = datum.eventKey;
      const x = scale.x(datum.x);
      const y = scale.y(datum.y);
      const size = this.getSize(datum, props, calculatedValues);
      const symbol = this.getSymbol(datum, props);
      const dataStyle = this.getDataStyles(datum, style.data);
      const dataProps = {
        x, y, size, scale, datum, symbol, index, style: dataStyle
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
    }, {parent: parentProps});
  },

  getCalculatedValues(props, defaultStyles) {
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const data = Events.addEventKeys(props, Data.getData(props));
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
      "x", "y", "z", "size", "symbol", "name", "label"
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
    const zData = data.map((point) => point.z);
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
