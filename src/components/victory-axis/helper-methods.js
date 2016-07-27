import { includes, defaults, isFunction, range, without } from "lodash";
import Scale from "../../helpers/scale";
import Axis from "../../helpers/axis";
import Domain from "../../helpers/domain";
import { Helpers } from "victory-core";

const orientationSign = {
  top: -1,
  left: -1,
  right: 1,
  bottom: 1
};

export default {
  // exposed for use by VictoryChart
  getDomain(props, axis) {
    const inherentAxis = this.getAxis(props);
    if (axis && axis !== inherentAxis) {
      return undefined;
    }
    let domain;
    if (Array.isArray(props.domain)) {
      domain = props.domain;
    } else if (props.domain && props.domain[inherentAxis]) {
      domain = props.domain[inherentAxis];
    } else if (props.tickValues) {
      domain = Domain.getDomainFromTickValues(props);
    }
    const paddedDomain = Domain.padDomain(domain, props, inherentAxis);
    console.log("DOMAIN", Domain.cleanDomain(paddedDomain, props, inherentAxis), axis);
    console.log("SCALE", props.scale, axis);
    return domain ? Domain.cleanDomain(paddedDomain, props, inherentAxis) : undefined;
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
    console.log("PROPS", props);
    const scale = Scale.getBaseScale(props, axis);
    console.log("GET SCALE", scale);
    const domain = this.getDomain(props) || scale.domain();
    scale.range(Helpers.getRange(props, axis));
    scale.domain(domain);
    return scale;
  },

  getStyles(props, styleObject) {
    const style = props.style || {};
    const parentStyleProps = { height: "auto", width: "100%" };
    return {
      parent: defaults(parentStyleProps, style.parent, styleObject.parent),
      axis: defaults({}, style.axis, styleObject.axis),
      axisLabel: defaults({}, style.axisLabel, styleObject.axisLabel),
      grid: defaults({}, style.grid, styleObject.grid),
      ticks: defaults({}, style.ticks, styleObject.ticks),
      tickLabels: defaults({}, style.tickLabels, styleObject.tickLabels)
    };
  },

  getBaseProps(props, fallbackProps) {
    const modifiedProps = Helpers.modifyProps(props, fallbackProps);
    const calculatedValues = this.getCalculatedValues(modifiedProps, fallbackProps);
    const {
      style, padding, orientation, isVertical, scale, ticks, tickFormat,
      stringTicks, anchors
    } = calculatedValues;

    const { width, height } = modifiedProps;
    const offset = this.getOffset(modifiedProps, calculatedValues);

    const globalTransform = this.getTransform(modifiedProps, calculatedValues, offset);

    const gridOffset = this.getGridOffset(modifiedProps, calculatedValues, offset);
    const gridEdge = this.getGridEdge(modifiedProps, calculatedValues);

    const axisProps = {
      style: style.axis,
      x1: isVertical ? globalTransform.x : padding.left + globalTransform.x,
      x2: isVertical ? globalTransform.x : modifiedProps.width - padding.right + globalTransform.x,
      y1: isVertical ? padding.top + globalTransform.y : globalTransform.y,
      y2: isVertical ? modifiedProps.height - padding.bottom + globalTransform.y : globalTransform.y
    };

    const parentProps = {style: style.parent, ticks, scale, width, height};
    const axisLabelProps = this.getAxisLabelProps(modifiedProps, calculatedValues, globalTransform);

    return ticks.reduce((memo, data, index) => {
      const tick = stringTicks ? modifiedProps.tickValues[data - 1] : data;
      const tickStyle = Helpers.evaluateStyle(style.ticks, tick, index);
      const scaledTick = scale(data);
      const tickPosition = this.getTickPosition(tickStyle, orientation, isVertical);
      const tickTransform = {
        x: isVertical ? globalTransform.x : scaledTick + globalTransform.x,
        y: isVertical ? scaledTick + globalTransform.y : globalTransform.y
      };

      const gridTransform = {
        x: isVertical ? -gridOffset.x + globalTransform.x : scaledTick + globalTransform.x,
        y: isVertical ? scaledTick + globalTransform.y : gridOffset.y + globalTransform.y
      };

      const tickProps = {
        x1: tickTransform.x,
        y1: tickTransform.y,
        x2: tickTransform.x + tickPosition.x2,
        y2: tickTransform.y + tickPosition.y2,
        style: tickStyle,
        tick
      };
      const text = tickFormat(tick, index);
      const labelStyle = Helpers.evaluateStyle(style.tickLabels, tick, index);
      const tickLabelProps = {
        style: labelStyle,
        x: tickTransform.x + tickPosition.x,
        y: tickTransform.y + tickPosition.y,
        verticalAnchor: labelStyle.verticalAnchor || anchors.verticalAnchor,
        textAnchor: labelStyle.textAnchor || anchors.textAnchor,
        angle: labelStyle.angle,
        text,
        tick
      };

      const gridProps = {
        x1: gridTransform.x,
        y1: gridTransform.y,
        x2: gridEdge.x + gridTransform.x,
        y2: gridEdge.y + gridTransform.y,
        style: Helpers.evaluateStyle(style.grid, tick, index),
        tick
      };

      memo[index] = {
        axis: axisProps,
        axisLabel: axisLabelProps,
        ticks: tickProps,
        tickLabels: tickLabelProps,
        grid: gridProps
      };

      return memo;
    }, {parent: parentProps});
  },

  getCalculatedValues(props, fallbackProps) {
    const defaultStyles = props.theme && props.theme.axis ? props.theme.axis : fallbackProps.style;
    const style = this.getStyles(props, defaultStyles);
    const padding = Helpers.getPadding(props);
    const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
    const isVertical = Axis.isVertical(props);
    const labelPadding = this.getLabelPadding(props, style);
    const stringTicks = Axis.stringTicks(props);
    const scale = this.getScale(props);
    const ticks = this.getTicks(props, scale);
    const tickFormat = this.getTickFormat(props, scale, ticks);
    const anchors = this.getAnchors(orientation, isVertical);

    return {
      style, padding, orientation, isVertical, labelPadding, stringTicks,
      anchors, scale, ticks, tickFormat
    };
  },

  getAxisLabelProps(props, calculatedValues, globalTransform) {
    const {style, orientation, padding, labelPadding, isVertical} = calculatedValues;
    const sign = orientationSign[orientation];
    const hPadding = padding.left + padding.right;
    const vPadding = padding.top + padding.bottom;
    const verticalAnchor = sign < 0 ? "end" : "start";
    const labelStyle = style.axisLabel;
    const angle = isVertical ? -90 : 0;
    const x = isVertical ? globalTransform.x + (sign * labelPadding) :
      ((props.width - hPadding) / 2) + padding.left + globalTransform.x;
    const y = isVertical ?
      ((props.height - vPadding) / 2) + padding.bottom + globalTransform.y :
      (sign * labelPadding) + globalTransform.y;
    return {
      x,
      y,
      verticalAnchor: labelStyle.verticalAnchor || verticalAnchor,
      textAnchor: labelStyle.textAnchor || "middle",
      angle: labelStyle.angle || angle,
      style: labelStyle,
      text: props.label
    };
  },

  getTicks(props, scale) {
    if (props.tickValues) {
      if (Axis.stringTicks(props)) {
        return range(1, props.tickValues.length + 1);
      }
      return props.tickValues;
    } else if (scale.ticks && isFunction(scale.ticks)) {
      const ticks = scale.ticks(props.tickCount);
      if (props.crossAxis) {
        return includes(ticks, 0) ? without(ticks, 0) : ticks;
      }
      return ticks;
    }
    return scale.domain();
  },

  getAnchors(orientation, isVertical) {
    const anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
    const anchor = anchorOrientation[orientation];
    return {
      textAnchor: isVertical ? anchor : "middle",
      verticalAnchor: isVertical ? "middle" : anchor
    };
  },

  getTickFormat(props, scale) {
    if (props.tickFormat && isFunction(props.tickFormat)) {
      return props.tickFormat;
    } else if (props.tickFormat && Array.isArray(props.tickFormat)) {
      return (x, index) => props.tickFormat[index];
    } else if (Axis.stringTicks(props)) {
      return (x, index) => props.tickValues[index];
    } else if (scale.tickFormat && isFunction(scale.tickFormat)) {
      return scale.tickFormat();
    } else {
      return (x) => x;
    }
  },

  getLabelPadding(props, style) {
    const labelStyle = style.axisLabel;
    if (typeof labelStyle.padding !== "undefined" && labelStyle.padding !== null) {
      return labelStyle.padding;
    }
    const isVertical = Axis.isVertical(props);
    // TODO: magic numbers
    return props.label ? (labelStyle.fontSize * (isVertical ? 2.3 : 1.6)) : 0;
  },

  getOffset(props, calculatedValues) {
    const {
      style, padding, isVertical, orientation, labelPadding, stringTicks, ticks
    } = calculatedValues;
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    const fontSize = style.axisLabel.fontSize;
    const offsetX = (props.offsetX !== null) && (props.offsetX !== undefined)
      ? props.offsetX : xPadding;
    const offsetY = (props.offsetY !== null) && (props.offsetY !== undefined)
      ? props.offsetY : yPadding;
    const tickSizes = ticks.map((data) => {
      const tick = stringTicks ? props.tickValues[data - 1] : data;
      const tickStyle = Helpers.evaluateStyle(style.ticks, tick);
      return tickStyle.size;
    });
    const totalPadding = fontSize + (2 * Math.max(...tickSizes)) + labelPadding;
    const minimumPadding = 1.2 * fontSize; // TODO: magic numbers
    const x = isVertical ? totalPadding : minimumPadding;
    const y = isVertical ? minimumPadding : totalPadding;
    return {
      x: (offsetX !== null) && (offsetX !== undefined) ? offsetX : x,
      y: (offsetY !== null) && (offsetY !== undefined) ? offsetY : y
    };
  },

  getTransform(props, calculatedValues, offset) {
    const {orientation} = calculatedValues;
    return {
      top: {x: 0, y: offset.y},
      bottom: {x: 0, y: props.height - offset.y},
      left: {x: offset.x, y: 0},
      right: {x: props.width - offset.x, y: 0}
    }[orientation];
  },

  getTickPosition(style, orientation, isVertical) {
    const tickSpacing = style.size + style.padding;
    const sign = orientationSign[orientation];
    return {
      x: isVertical ? sign * tickSpacing : 0,
      x2: isVertical ? sign * style.size : 0,
      y: isVertical ? 0 : sign * tickSpacing,
      y2: isVertical ? 0 : sign * style.size
    };
  },

  getGridEdge(props, calculatedValues) {
    const {orientation, padding, isVertical} = calculatedValues;
    const sign = -orientationSign[orientation];
    const x = isVertical ?
      sign * (props.width - (padding.left + padding.right)) : 0;
    const y = isVertical ?
      0 : sign * (props.height - (padding.top + padding.bottom));
    return {x, y};
  },

  getGridOffset(props, calculatedValues, offset) {
    const {padding, orientation } = calculatedValues;
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    return {
      x: props.crossAxis ? offset.x - xPadding : 0,
      y: props.crossAxis ? offset.y - yPadding : 0
    };
  }
};
