import { includes, defaults, isFunction, range, without, assign } from "lodash";
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
    const scale = Scale.getBaseScale(props, axis);
    const domain = this.getDomain(props) || scale.domain();
    scale.range(Helpers.getRange(props, axis));
    scale.domain(domain);
    return scale;
  },

  getStyles(props, styleObject) {
    const style = props.style || {};
    styleObject = styleObject || {};
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

  getTickProps(layout, style, tick) {
    const { position, transform } = layout;
    return {
      x1: transform.x,
      y1: transform.y,
      x2: transform.x + position.x2,
      y2: transform.y + position.y2,
      style,
      tick
    };
  },

  getTickLabelProps(layout, style, tick, text) { // eslint-disable-line max-params
    const { position, transform } = layout;
    return {
      style,
      x: transform.x + position.x,
      y: transform.y + position.y,
      verticalAnchor: style.verticalAnchor,
      textAnchor: style.textAnchor,
      angle: style.angle,
      text,
      tick
    };
  },

  getGridProps(layout, style, tick) {
    const {edge, transform} = layout;
    return {
      x1: transform.x,
      y1: transform.y,
      x2: edge.x + transform.x,
      y2: edge.y + transform.y,
      style,
      tick
    };
  },

  getAxisProps(modifiedProps, calculatedValues, globalTransform) {
    const { style, padding, isVertical } = calculatedValues;
    const { width, height } = modifiedProps;
    return {
      style: style.axis,
      x1: isVertical ? globalTransform.x : padding.left + globalTransform.x,
      x2: isVertical ? globalTransform.x : width - padding.right + globalTransform.x,
      y1: isVertical ? padding.top + globalTransform.y : globalTransform.y,
      y2: isVertical ? height - padding.bottom + globalTransform.y : globalTransform.y
    };
  },

  getLayoutProps(modifiedProps, calculatedValues) {
    const offset = this.getOffset(modifiedProps, calculatedValues);
    return {
      globalTransform: this.getTransform(modifiedProps, calculatedValues, offset),
      gridOffset: this.getGridOffset(modifiedProps, calculatedValues, offset),
      gridEdge: this.getGridEdge(modifiedProps, calculatedValues)
    };
  },

  getEvaluatedStyles(style, tick, index) {
    return {
      tickStyle: Helpers.evaluateStyle(style.ticks, tick, index),
      labelStyle: Helpers.evaluateStyle(style.tickLabels, tick, index),
      gridStyle: Helpers.evaluateStyle(style.grid, tick, index)
    };
  },

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "axis");
    const calculatedValues = this.getCalculatedValues(props);
    const {
      style, orientation, isVertical, scale, ticks, tickFormat,
      stringTicks, anchors
    } = calculatedValues;

    const {
      globalTransform, gridOffset, gridEdge
    } = this.getLayoutProps(props, calculatedValues);

    const axisProps = this.getAxisProps(props, calculatedValues, globalTransform);
    const axisLabelProps = this.getAxisLabelProps(props, calculatedValues, globalTransform);

    const childProps = { parent: {
      style: style.parent, ticks, scale, width: props.width, height: props.height
    }};
    for (let index = 0, len = ticks.length; index < len; index++) {
      const tick = stringTicks ? props.tickValues[(ticks[index]) - 1] : ticks[index];

      const styles = this.getEvaluatedStyles(style, tick, index);
      const tickLayout = {
        position: this.getTickPosition(styles.tickStyle, orientation, isVertical),
        transform: this.getTickTransform(scale(ticks[index]), globalTransform, isVertical)
      };

      const gridLayout = {
        edge: gridEdge,
        transform: {
          x: isVertical ?
            -gridOffset.x + globalTransform.x : scale(ticks[index]) + globalTransform.x,
          y: isVertical ?
            scale(ticks[index]) + globalTransform.y : gridOffset.y + globalTransform.y
        }
      };

      childProps[index] = {
        axis: axisProps,
        axisLabel: axisLabelProps,
        ticks: this.getTickProps(tickLayout, styles.tickStyle, tick),
        tickLabels: this.getTickLabelProps(
          tickLayout, assign({}, anchors, styles.labelStyle), tick, tickFormat(tick, index)
        ),
        grid: this.getGridProps(gridLayout, styles.gridStyle, tick)
      };
    }
    return childProps;
  },

  getCalculatedValues(props) {
    const { theme } = props;
    const defaultStyles = theme && theme.axis && theme.axis.style ? theme.axis.style : {};
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
    const labelStyle = style.axisLabel || {};
    if (typeof labelStyle.padding !== "undefined" && labelStyle.padding !== null) {
      return labelStyle.padding;
    }
    const isVertical = Axis.isVertical(props);
    // TODO: magic numbers
    const fontSize = labelStyle.fontSize || 14;
    return props.label ? (fontSize * (isVertical ? 2.3 : 1.6)) : 0;
  },

  getOffset(props, calculatedValues) {
    const {
      style, padding, isVertical, orientation, labelPadding, stringTicks, ticks
    } = calculatedValues;
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    const fontSize = style.axisLabel.fontSize || 14;
    const offsetX = (props.offsetX !== null) && (props.offsetX !== undefined)
      ? props.offsetX : xPadding;
    const offsetY = (props.offsetY !== null) && (props.offsetY !== undefined)
      ? props.offsetY : yPadding;
    const tickSizes = ticks.map((data) => {
      const tick = stringTicks ? props.tickValues[data - 1] : data;
      const tickStyle = Helpers.evaluateStyle(style.ticks, tick);
      return tickStyle.size || 0;
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
    const size = style.size || 0;
    const padding = style.padding || 0;
    const tickSpacing = size + padding;
    const sign = orientationSign[orientation];
    return {
      x: isVertical ? sign * tickSpacing : 0,
      x2: isVertical ? sign * size : 0,
      y: isVertical ? 0 : sign * tickSpacing,
      y2: isVertical ? 0 : sign * size
    };
  },

  getTickTransform(tick, globalTransform, isVertical) {
    return {
      x: isVertical ? globalTransform.x : tick + globalTransform.x,
      y: isVertical ? tick + globalTransform.y : globalTransform.y
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
