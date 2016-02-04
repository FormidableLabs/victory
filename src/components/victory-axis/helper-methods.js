import without from "lodash/array/without";
import includes from "lodash/collection/includes";
import range from "lodash/utility/range";
import { Chart, Collection, Scale } from "victory-util";

module.exports = {
  // exposed for use by VictoryChart
  getDomain(props, axis) {
    if (axis && axis !== this.getAxis(props)) {
      return undefined;
    }
    if (props.domain) {
      return props.domain;
    } else if (props.tickValues) {
      return this.getDomainFromTickValues(props);
    }
    return undefined;
  },

  // exposed for use by VictoryChart
  getAxis(props, flipped) {
    if (props.orientation) {
      const vertical = {top: "x", bottom: "x", left: "y", right: "y"};
      return vertical[props.orientation];
    }
    const axisType = props.dependentAxis ? "dependent" : "independent";
    const flippedAxis = { dependent: "x", independent: "y"};
    const normalAxis = { independent: "x", dependent: "y"};
    return flipped ? flippedAxis[axisType] : normalAxis[axisType];
  },

  // exposed for use by VictoryChart
  getScale(props) {
    const axis = this.getAxis(props);
    const scale = Scale.getBaseScale(props, axis);
    const domain = this.getDomain(props) || scale.domain();
    scale.range(Chart.getRange(props, axis));
    scale.domain(domain);
    return scale;
  },

  getDomainFromTickValues(props) {
    let domain;
    if (this.stringTicks(props)) {
      domain = [1, props.tickValues.length];
    } else {
      // coerce ticks to numbers
      const ticks = props.tickValues.map((value) => +value);
      domain = [Math.min(...ticks), Math.max(...ticks)];
    }
    if (this.isVertical(props)) {
      domain.reverse();
    }
    return domain;
  },

  getOrientation(props) {
    return props.orientation || (props.dependentAxis ? "left" : "bottom");
  },

  isVertical(props) {
    const orientation = this.getOrientation(props);
    const vertical = {top: false, bottom: false, left: true, right: true};
    return vertical[orientation];
  },

  stringTicks(props) {
    return props.tickValues !== undefined && Collection.containsStrings(props.tickValues);
  },

  getTicks(props, scale) {
    if (props.tickValues) {
      if (this.stringTicks(props)) {
        return range(1, props.tickValues.length + 1);
      }
      return props.tickValues;
    } else if (scale.ticks && typeof scale.ticks === "function") {
      const ticks = scale.ticks(props.tickCount);
      if (props.crossAxis) {
        return includes(ticks, 0) ? without(ticks, 0) : ticks;
      }
      return ticks;
    }
    return scale.domain();
  },

  getTickFormat(props, tickProps) {
    const {scale, ticks} = tickProps;
    if (props.tickFormat && typeof props.tickFormat === "function") {
      return props.tickFormat;
    } else if (props.tickFormat && Array.isArray(props.tickFormat)) {
      return (x, index) => props.tickFormat[index];
    } else if (this.stringTicks(props)) {
      return (x, index) => props.tickValues[index];
    } else if (scale.tickFormat && typeof scale.tickFormat === "function") {
      return scale.tickFormat(ticks.length);
    } else {
      return (x) => x;
    }
  },

  getLabelPadding(props, style) {
    const labelStyle = style.axisLabel;
    if (typeof labelStyle.padding !== "undefined" && labelStyle.padding !== null) {
      return labelStyle.padding;
    }
    const isVertical = this.isVertical(props);
    // TODO: magic numbers
    return props.label ? (labelStyle.fontSize * (isVertical ? 2.3 : 1.6)) : 0;
  },

  getOffset(props, style) {
    const padding = Chart.getPadding(props);
    const isVertical = this.isVertical(props);
    const orientation = this.getOrientation(props);
    const labelPadding = this.getLabelPadding(props, style);
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    const fontSize = style.axisLabel.fontSize;
    const offsetX = props.offsetX || xPadding;
    const offsetY = props.offsetY || yPadding;
    const totalPadding = fontSize + (2 * style.ticks.size) + labelPadding;
    const minimumPadding = 1.2 * fontSize; // TODO: magic numbers
    const x = isVertical ? totalPadding : minimumPadding;
    const y = isVertical ? minimumPadding : totalPadding;
    return {
      x: offsetX || x,
      y: offsetY || y
    };
  },

  getTransform(props, layoutProps) {
    const {offset, orientation} = layoutProps;
    const translate = {
      top: [0, offset.y],
      bottom: [0, props.height - offset.y],
      left: [offset.x, 0],
      right: [props.width - offset.x, 0]
    }[orientation];
    return `translate(${translate[0]}, ${translate[1]})`;
  }
};
