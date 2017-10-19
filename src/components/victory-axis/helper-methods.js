import { defaults, defaultsDeep, isFunction } from "lodash";
import Axis from "../../helpers/axis";
import { Helpers, Scale, Domain } from "victory-core";

const orientationSign = {
  top: -1,
  left: -1,
  right: 1,
  bottom: 1
};

export default {
  evaluateProp(prop, data, index) {
    return isFunction(prop) ? prop(data, index) : prop;
  },

  evaluateStyle(style, data, index) {
    if (!style || !Object.keys(style).some((value) => isFunction(style[value]))) {
      return style;
    }
    return Object.keys(style).reduce((prev, curr) => {
      prev[curr] = this.evaluateProp(style[curr], data, index);
      return prev;
    }, {});
  },

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
    } else if (Array.isArray(props.tickValues) && props.tickValues.length > 1) {
      domain = Domain.getDomainFromTickValues(props, axis);
    }
    const paddedDomain = Domain.padDomain(domain, props, inherentAxis);
    return domain ? Domain.cleanDomain(paddedDomain, props, inherentAxis) : undefined;
  },

  // exposed for use by VictoryChart
  getAxis(props, flipped) {
    if (props.orientation) {
      const vertical = { top: "x", bottom: "x", left: "y", right: "y" };
      return vertical[props.orientation];
    }
    const axisType = props.dependentAxis ? "dependent" : "independent";
    const flippedAxis = { dependent: "x", independent: "y" };
    const normalAxis = { independent: "x", dependent: "y" };
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

  getStyleObject(props) {
    const { theme, dependentAxis } = props;
    const generalAxisStyle = theme && theme.axis && theme.axis.style;
    const axisType = dependentAxis ? "dependentAxis" : "independentAxis";
    const specificAxisStyle = theme && theme[axisType] && theme[axisType].style;

    return generalAxisStyle && specificAxisStyle
      ? defaultsDeep({},
          specificAxisStyle,
          generalAxisStyle
        )
      : specificAxisStyle || generalAxisStyle;
  },

  getStyles(props, styleObject) {
    const style = props.style || {};
    styleObject = styleObject || {};
    const parentStyleProps = { height: "100%", width: "100%" };
    return {
      parent: defaults(style.parent, styleObject.parent, parentStyleProps),
      axis: defaults({}, style.axis, styleObject.axis),
      axisLabel: defaults({}, style.axisLabel, styleObject.axisLabel),
      grid: defaults({}, style.grid, styleObject.grid),
      ticks: defaults({}, style.ticks, styleObject.ticks),
      tickLabels: defaults({}, style.tickLabels, styleObject.tickLabels)
    };
  },

  getTickProps(layout, style, datum) {
    const { position, transform } = layout;
    return {
      x1: transform.x,
      y1: transform.y,
      x2: transform.x + position.x2,
      y2: transform.y + position.y2,
      style,
      datum
    };
  },

  getTickLabelProps(layout, style, anchors, datum, text) { // eslint-disable-line max-params
    const { position, transform } = layout;
    return {
      style,
      x: transform.x + position.x,
      y: transform.y + position.y,
      verticalAnchor: anchors.verticalAnchor,
      textAnchor: anchors.textAnchor,
      angle: style.angle,
      text,
      datum
    };
  },

  getGridProps(layout, style, datum) {
    const { edge, transform } = layout;
    return {
      x1: transform.x,
      y1: transform.y,
      x2: edge.x + transform.x,
      y2: edge.y + transform.y,
      style,
      datum
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
      tickStyle: this.evaluateStyle(style.ticks, tick, index),
      labelStyle: this.evaluateStyle(style.tickLabels, tick, index),
      gridStyle: this.evaluateStyle(style.grid, tick, index)
    };
  },

  getRole(props) {
    if (props.dependentAxis) {
      return props.theme && props.theme.dependentAxis
        ? "dependentAxis"
        : "axis";
    }

    return props.theme && props.theme.independentAxis
      ? "independentAxis"
      : "axis";
  },

  getShallowMergedThemeProps(props, role) {
    const axisTheme = props.theme.axis || {};
    return defaults({}, props.theme[role], axisTheme);
  },

  modifyProps(props, fallbackProps, role) {
    if (role !== "axis") {
      props.theme[role] = this.getShallowMergedThemeProps(props, role);
    }
    return Helpers.modifyProps(props, fallbackProps, role);
  },

  getBaseProps(props, fallbackProps) {
    const role = this.getRole(props);
    props = this.modifyProps(props, fallbackProps, role);
    const calculatedValues = this.getCalculatedValues(props);
    const {
      style, orientation, isVertical, scale, ticks, tickFormat, anchors, domain, stringTicks
    } = calculatedValues;
    const { width, height, standalone, theme, polar, padding } = props;
    const {
      globalTransform, gridOffset, gridEdge
    } = this.getLayoutProps(props, calculatedValues);

    const axisProps = this.getAxisProps(props, calculatedValues, globalTransform);
    const axisLabelProps = this.getAxisLabelProps(props, calculatedValues, globalTransform);
    const initialChildProps = { parent: {
      style: style.parent, ticks, scale, width, height, domain, standalone, theme, polar, padding
    } };

    return ticks.reduce((childProps, tick, index) => {
      const originalTick = stringTicks ? stringTicks[index] : tick;
      const styles = this.getEvaluatedStyles(style, originalTick, index);
      const tickLayout = {
        position: this.getTickPosition(styles, orientation, isVertical),
        transform: this.getTickTransform(scale(tick), globalTransform, isVertical)
      };

      const gridLayout = {
        edge: gridEdge,
        transform: {
          x: isVertical ?
            -gridOffset.x + globalTransform.x : scale(tick) + globalTransform.x,
          y: isVertical ?
            scale(tick) + globalTransform.y : gridOffset.y + globalTransform.y
        }
      };
      childProps[index] = {
        axis: axisProps,
        axisLabel: axisLabelProps,
        ticks: this.getTickProps(tickLayout, styles.tickStyle, tick),
        tickLabels: this.getTickLabelProps(
          tickLayout, styles.labelStyle, anchors, tick, tickFormat(tick, index, ticks)
        ),
        grid: this.getGridProps(gridLayout, styles.gridStyle, tick)
      };

      return childProps;
    }, initialChildProps);
  },

  getCalculatedValues(props) {
    const defaultStyles = this.getStyleObject(props);
    const style = this.getStyles(props, defaultStyles);
    const padding = Helpers.getPadding(props);
    const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
    const isVertical = Helpers.isVertical(props);
    const labelPadding = this.getLabelPadding(props, style);
    const stringTicks = Helpers.stringTicks(props) ? props.tickValues : undefined;
    const scale = this.getScale(props);
    const domain = this.getDomain(props);
    const ticks = Axis.getTicks(props, scale, props.crossAxis);
    const tickFormat = Axis.getTickFormat(props, scale);
    const anchors = this.getAnchors(orientation, isVertical);

    return {
      style, padding, orientation, isVertical, labelPadding, stringTicks,
      anchors, scale, ticks, tickFormat, domain
    };
  },

  getAxisLabelProps(props, calculatedValues, globalTransform) {
    const { style, orientation, padding, labelPadding, isVertical } = calculatedValues;
    const sign = orientationSign[orientation];
    const hPadding = padding.left + padding.right;
    const vPadding = padding.top + padding.bottom;
    const verticalAnchor = sign < 0 ? "end" : "start";
    const labelStyle = style.axisLabel;
    const angle = isVertical ? -90 : 0; // eslint-disable-line no-magic-numbers
    const x = isVertical ? globalTransform.x + (sign * labelPadding) :
      ((props.width - hPadding) / 2) + padding.left + globalTransform.x;
    const y = isVertical ?
      ((props.height - vPadding) / 2) + padding.top + globalTransform.y :
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

  getAnchors(orientation, isVertical) {
    const anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
    const anchor = anchorOrientation[orientation];
    return {
      textAnchor: isVertical ? anchor : "middle",
      verticalAnchor: isVertical ? "middle" : anchor
    };
  },

  getLabelPadding(props, style) {
    const labelStyle = style.axisLabel || {};
    if (typeof labelStyle.padding !== "undefined" && labelStyle.padding !== null) {
      return labelStyle.padding;
    }
    const isVertical = Helpers.isVertical(props);
    // TODO: magic numbers
    /*eslint-disable no-magic-numbers*/
    const fontSize = labelStyle.fontSize || 14;
    return props.label ? (fontSize * (isVertical ? 2.3 : 1.6)) : 0;
    /*eslint-enable no-magic-numbers*/
  },

  getOffset(props, calculatedValues) {
    const {
      style, padding, isVertical, orientation, labelPadding, stringTicks, ticks
    } = calculatedValues;
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    const fontSize = style.axisLabel.fontSize || 14; // eslint-disable-line no-magic-numbers
    const offsetX = (props.offsetX !== null) && (props.offsetX !== undefined)
      ? props.offsetX : xPadding;
    const offsetY = (props.offsetY !== null) && (props.offsetY !== undefined)
      ? props.offsetY : yPadding;
    const tickSizes = ticks.map((data) => {
      const tick = stringTicks ? props.tickValues[data - 1] : data;
      const tickStyle = this.evaluateStyle(style.ticks, tick);
      return tickStyle.size || 0;
    });
    const totalPadding = fontSize + (2 * Math.max(...tickSizes)) + labelPadding;
    const minimumPadding = 1.2 * fontSize; // eslint-disable-line no-magic-numbers
    const x = isVertical ? totalPadding : minimumPadding;
    const y = isVertical ? minimumPadding : totalPadding;
    return {
      x: (offsetX !== null) && (offsetX !== undefined) ? offsetX : x,
      y: (offsetY !== null) && (offsetY !== undefined) ? offsetY : y
    };
  },

  getTransform(props, calculatedValues, offset) {
    const { orientation } = calculatedValues;
    return {
      top: { x: 0, y: offset.y },
      bottom: { x: 0, y: props.height - offset.y },
      left: { x: offset.x, y: 0 },
      right: { x: props.width - offset.x, y: 0 }
    }[orientation];
  },

  getTickPosition(style, orientation, isVertical) {
    const { tickStyle, labelStyle } = style;
    const size = tickStyle.size || 0;
    const tickPadding = tickStyle.padding || 0;
    const labelPadding = labelStyle.padding || 0;
    const tickSpacing = size + tickPadding + labelPadding;
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
    const { orientation, padding, isVertical } = calculatedValues;
    const sign = -orientationSign[orientation];
    const x = isVertical ?
      sign * (props.width - (padding.left + padding.right)) : 0;
    const y = isVertical ?
      0 : sign * (props.height - (padding.top + padding.bottom));
    return { x, y };
  },

  getGridOffset(props, calculatedValues, offset) {
    const { padding, orientation } = calculatedValues;
    const xPadding = orientation === "right" ? padding.right : padding.left;
    const yPadding = orientation === "top" ? padding.top : padding.bottom;
    return {
      x: props.crossAxis ? offset.x - xPadding : 0,
      y: props.crossAxis ? offset.y - yPadding : 0
    };
  }
};
