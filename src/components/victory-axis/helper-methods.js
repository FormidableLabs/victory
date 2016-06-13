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
    if (Array.isArray(props.domain)) {
      return props.domain;
    } else if (props.domain && props.domain[inherentAxis]) {
      return props.domain[inherentAxis];
    } else if (props.tickValues) {
      return Domain.getDomainFromTickValues(props);
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
    scale.range(Helpers.getRange(props, axis));
    scale.domain(domain);
    return scale;
  },

  getStyleObject(props, defaultStyles) {
    let styleObject;
    if (props.theme && props.theme.axis) {
      styleObject = props.theme.axis;
    } else {
      styleObject = defaultStyles;
    }
    return styleObject;
  },

  getStyles(props, defaultStyles) {
    const style = props.style || {};
    const parentStyleProps = { height: "auto", width: "100%" };
    return {
      parent: defaults(parentStyleProps, style.parent, defaultStyles.parent),
      axis: defaults({}, style.axis, defaultStyles.axis),
      axisLabel: defaults({}, style.axisLabel, defaultStyles.axisLabel),
      grid: defaults({}, style.grid, defaultStyles.grid),
      ticks: defaults({}, style.ticks, defaultStyles.ticks),
      tickLabels: defaults({}, style.tickLabels, defaultStyles.tickLabels)
    };
  },

  getBaseProps(props, defaultStyles) {
    const calculatedValues = this.getCalculatedValues(props, defaultStyles);
    const {
      style, padding, orientation, isVertical, scale, ticks, tickFormat,
      stringTicks, anchors
    } = calculatedValues;

    const gridOffset = this.getGridOffset(props, calculatedValues);
    const gridEdge = this.getGridEdge(props, calculatedValues);

    const axisProps = {
      style: style.axis,
      x1: isVertical ? null : padding.left,
      x2: isVertical ? null : props.width - padding.right,
      y1: isVertical ? padding.top : null,
      y2: isVertical ? props.height - padding.bottom : null
    };

    const axisLabelProps = this.getAxisLabelProps(props, calculatedValues);

    return ticks.reduce((memo, data, index) => {
      const tick = stringTicks ? props.tickValues[data - 1] : data;
      const tickStyle = Helpers.evaluateStyle(style.ticks, tick);
      const scaledTick = scale(data);
      const tickPosition = this.getTickPosition(tickStyle, orientation, isVertical);
      const tickTransform = {
        x: isVertical ? 0 : scaledTick,
        y: isVertical ? scaledTick : 0
      };

      const gridTransform = {
        x: isVertical ? -gridOffset.x : scaledTick,
        y: isVertical ? scaledTick : gridOffset.y
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
      const labelStyle = Helpers.evaluateStyle(style.tickLabels, tick);
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
        style: Helpers.evaluateStyle(style.grid, tick),
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
    }, {});
  },

  getCalculatedValues(props, defaultStyles) {
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

  getAxisLabelProps(props, calculatedValues) {
    const {style, orientation, padding, labelPadding, isVertical} = calculatedValues;
    const sign = orientationSign[orientation];
    const hPadding = padding.left + padding.right;
    const vPadding = padding.top + padding.bottom;
    const x = isVertical ?
      -((props.height - vPadding) / 2) - padding.top :
      ((props.width - hPadding) / 2) + padding.left;
    const verticalAnchor = sign < 0 ? "end" : "start";
    const labelStyle = style.axisLabel;
    return {
      x,
      y: sign * labelPadding,
      verticalAnchor: labelStyle.verticalAnchor || verticalAnchor,
      textAnchor: labelStyle.textAnchor || "middle",
      angle: labelStyle.angle,
      style: labelStyle,
      transform: isVertical ? "rotate(-90)" : "",
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

  getTickFormat(props, scale, ticks) {
    if (props.tickFormat && isFunction(props.tickFormat)) {
      return props.tickFormat;
    } else if (props.tickFormat && Array.isArray(props.tickFormat)) {
      return (x, index) => props.tickFormat[index];
    } else if (Axis.stringTicks(props)) {
      return (x, index) => props.tickValues[index];
    } else if (scale.tickFormat && isFunction(scale.tickFormat)) {
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
    const isVertical = Axis.isVertical(props);
    // TODO: magic numbers
    return props.label ? (labelStyle.fontSize * (isVertical ? 2.3 : 1.6)) : 0;
  },

  getOffset(props, calculatedValues) {
    const { style, padding, isVertical, orientation, labelPadding} = calculatedValues;
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    const fontSize = style.axisLabel.fontSize;
    const offsetX = (props.offsetX !== null) && (props.offsetX !== undefined)
      ? props.offsetX : xPadding;
    const offsetY = (props.offsetY !== null) && (props.offsetY !== undefined)
      ? props.offsetY : yPadding;
    // TODO: style.ticks.size need to be evaluated first!!
    const totalPadding = fontSize + (2 * style.ticks.size) + labelPadding;
    const minimumPadding = 1.2 * fontSize; // TODO: magic numbers
    const x = isVertical ? totalPadding : minimumPadding;
    const y = isVertical ? minimumPadding : totalPadding;
    return {
      x: (offsetX !== null) && (offsetX !== undefined) ? offsetX : x,
      y: (offsetY !== null) && (offsetY !== undefined) ? offsetY : y
    };
  },

  getTransform(props, calculatedValues) {
    const {orientation} = calculatedValues;
    const offset = this.getOffset(props, calculatedValues);
    const translate = {
      top: [0, offset.y],
      bottom: [0, props.height - offset.y],
      left: [offset.x, 0],
      right: [props.width - offset.x, 0]
    }[orientation];
    return `translate(${translate[0]}, ${translate[1]})`;
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

  getGridOffset(props, calculatedValues) {
    const {padding, orientation } = calculatedValues;
    const offset = this.getOffset(props, calculatedValues);
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    return {
      x: props.crossAxis ? offset.x - xPadding : 0,
      y: props.crossAxis ? offset.y - yPadding : 0
    };
  }
};
