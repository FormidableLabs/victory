import values from "lodash/values";
import { Helpers } from "victory-core";

export default {
  getSymbol(data, props) {
    if (props.bubbleProperty) {
      return "circle";
    }
    const symbol = data.symbol || props.symbol;
    return Helpers.evaluateProp(symbol, data);
  },

  getBubbleSize(datum, props, calculatedProps) {
    const {data, z} = calculatedProps;
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

  getSize(data, props, calculatedProps) {
    let size;
    if (data.size) {
      size = typeof data.size === "function" ? data.size : Math.max(data.size, 1);
    } else if (typeof props.size === "function") {
      size = props.size;
    } else if (data[calculatedProps.z]) {
      size = this.getBubbleSize(data, props, calculatedProps);
    } else {
      size = Math.max(props.size, 1);
    }
    return Helpers.evaluateProp(size, data);
  }
};
