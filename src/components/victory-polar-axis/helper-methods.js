/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2, 90, 180, 270, 360] }]*/
import {
  includes, defaults, defaultsDeep, isFunction, range as lodashRange, without
} from "lodash";
import { Helpers, Scale, Domain } from "victory-core";

export default {
  getCalculatedValues(props) {
    const defaultStyles = this.getStyleObject(props);
    const style = this.getStyles(props, defaultStyles);
    const padding = Helpers.getPadding(props);
    const axisType = props.dependentAxis ? "radial" : "angular";
    const axis = props.dependentAxis ? "y" : "x";
    const stringTicks = Helpers.stringTicks(props);
    const domain = this.getDomain(props, axis);
    const range = this.getRange(props, axis);
    const scale = this.getScale(props);
    const ticks = this.getTicks(props, scale);
    const tickFormat = this.getTickFormat(props, scale, ticks);
    const radius = Math.min(
      props.width - padding.left - padding.right,
      props.height - padding.top - padding.bottom
    ) / 2;
    return {
      style, padding, stringTicks, axisType, scale, ticks, tickFormat, domain, range, radius
    };
  },

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
      domain = Domain.getDomainFromTickValues(props);
    } else {
      return axis === "x" ? [0, 360] : [0, 1];
    }
    const paddedDomain = Domain.padDomain(domain, props, inherentAxis);
    return domain ? Domain.cleanDomain(paddedDomain, props, inherentAxis) : undefined;
  },


  getDefaultRadius(props) {
    const { left, right, top, bottom } = Helpers.getPadding(props);
    const { width, height } = props;
    return Math.min(width - left - right, height - top - bottom) / 2;
  },

  getRange(props, axis) {
    if (axis === "x") {
      const startAngle = this.degreesToRadians(props.startAngle);
      const endAngle = this.degreesToRadians(props.endAngle);
      return [startAngle, endAngle];
    }
    const radius = props.radius || this.getDefaultRadius(props);
    const innerRadius = props.innerRadius || 0;
    return [innerRadius, radius];
  },

  // exposed for use by VictoryChart
  getAxis(props) {
    return props.dependentAxis ? "y" : "x";
  },

  // exposed for use by VictoryChart (necessary?)
  getScale(props) {
    const axis = this.getAxis(props);
    const scale = Scale.getBaseScale(props, axis);
    const domain = this.getDomain(props, axis) || scale.domain();
    const range = this.getRange(props, axis);
    scale.range(range);
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
    const parentStyleProps = { height: "auto", width: "100%" };
    return {
      parent: defaults(parentStyleProps, style.parent, styleObject.parent),
      axis: defaults({}, style.axis, styleObject.axis),
      grid: defaults({}, style.grid, styleObject.grid),
      ticks: defaults({}, style.ticks, styleObject.ticks),
      tickLabels: defaults({}, style.tickLabels, styleObject.tickLabels)
    };
  },


  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  },

  radiansToDegrees(radians) {
    return radians / (Math.PI / 180);
  },

  getTickProps(props, calculatedValues, tick, index) { //eslint-disable-line max-params
    const { axisType, radius, scale, style } = calculatedValues;
    const { tickStyle } = this.getEvaluatedStyles(style, tick, index);
    const tickPadding = tickStyle.padding || 0;
    const angularPadding = tickPadding; // TODO: do some geometry
    const axisAngle = props.axisAngle || props.startAngle;
    return axisType === "angular" ?
      {
        index, datum: tick, style: tickStyle,
        x1: radius * Math.sin(scale(tick)),
        y1: radius * Math.cos(scale(tick)),
        x2: (radius + tickPadding) * Math.sin(scale(tick)),
        y2: (radius + tickPadding) * Math.cos(scale(tick))
      } : {
        style, index, datum: tick,
        x1: (scale(tick) / 2) * Math.sin(axisAngle - angularPadding),
        x2: (scale(tick) / 2) * Math.sin(axisAngle + angularPadding),
        y1: (scale(tick) / 2) * Math.cos(axisAngle - angularPadding),
        y2: (scale(tick) / 2) * Math.cos(axisAngle + angularPadding)
      };
  },

  getTickLabelProps(props, calculatedValues, tick, index) { //eslint-disable-line max-params
    const { axisType, radius, tickFormat, style, scale } = calculatedValues;
    const { labelStyle } = this.getEvaluatedStyles(style, tick, index);
    const tickPadding = labelStyle.padding || 0;
    const angularPadding = 0; // TODO: do some geometry
    const axisAngle = props.axisAngle || props.startAngle;
    const labelAngle = axisType === "angular" ?
      scale(tick) : this.degreesToRadians(axisAngle + angularPadding);
    const textAngle = labelStyle.angle || this.getTextAngle(props, labelAngle);
    const labelRadius = axisType === "angular" ? radius + tickPadding : scale(tick);
    return {
      index, datum: tick, style: labelStyle,
      angle: textAngle,
      textAnchor: labelStyle.textAnchor || this.getTextAnchor(labelAngle, props.labelPlacement),
      text: tickFormat(tick, index),
      x: labelRadius * Math.sin(labelAngle),
      y: labelRadius * Math.cos(labelAngle)
    };
  },

  getTextAngle(props, baseAngle) {
    if (props.labelPlacement === "vertical") {
      return 0;
    }
    const degrees = this.radiansToDegrees(baseAngle);
    const sign = (degrees > 90 && degrees < 180 || degrees > 270) ? 1 : -1;
    let angle;
    if (degrees === 0 || degrees === 180) {
      angle = 90;
    } else if (degrees > 0 && degrees < 180) {
      angle = 90 - degrees;
    } else if (degrees > 180 && degrees < 360) {
      angle = 270 - degrees;
    }
    const labelRotation = props.labelPlacement === "perpendicular" ? 90 : 0;
    return angle + sign * labelRotation;
  },

  getTextAnchor(baseAngle, labelPlacement) {
    if (labelPlacement === "perpendicular") {
      return "middle";
    }
    const angle = this.radiansToDegrees(baseAngle);
    return angle < 180 ? "start" : "end";
  },

  getGridProps(props, calculatedValues, tick, index) { //eslint-disable-line max-params
    const { axisType, radius, style, scale } = calculatedValues;
    const { startAngle, endAngle } = props;
    const { gridStyle } = this.getEvaluatedStyles(style, tick, index);
    return axisType === "angular" ?
      {
        index, datum: tick, style: gridStyle,
        x1: radius * Math.sin(scale(tick)),
        y1: radius * Math.cos(scale(tick)),
        x2: 0, y2: 0
      } : {
        style: gridStyle, index, datum: tick,
        cx: 0, cy: 0, r: scale(tick), startAngle, endAngle
      };
  },

  getAxisProps(modifiedProps, calculatedValues) {
    const { style, axisType, radius } = calculatedValues;
    const { startAngle, endAngle } = modifiedProps;
    const axisAngle = modifiedProps.axisAngle || startAngle;
    return axisType === "radial" ?
      {
        style: style.axis,
        x1: 0,
        x2: radius * Math.sin(this.degreesToRadians(axisAngle)),
        y1: 0,
        y2: radius * Math.cos(this.degreesToRadians(axisAngle))
      } : {
        style: style.axis,
        cx: 0, cy: 0, r: radius, startAngle, endAngle
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
    const { style, scale, ticks, domain } = calculatedValues;
    const { width, height, standalone, theme } = props;

    const axisProps = this.getAxisProps(props, calculatedValues);
    const initialChildProps = { parent:
      { style: style.parent, ticks, scale, width, height, domain, standalone, theme }
    };

    return ticks.reduce((childProps, tick, index) => {
      childProps[index] = {
        axis: axisProps,
        ticks: this.getTickProps(props, calculatedValues, tick, index),
        tickLabels: this.getTickLabelProps(props, calculatedValues, tick, index),
        grid: this.getGridProps(props, calculatedValues, tick, index)
      };

      return childProps;
    }, initialChildProps);
  },

  getTicks(props, scale) {
    const { tickValues, tickCount } = props;
    if (tickValues && Array.isArray(tickValues)) {
      if (Helpers.stringTicks(props)) {
        return lodashRange(1, props.tickValues.length + 1);
      }
      return tickValues.length ? tickValues : scale.domain();
    } else if (scale.ticks && isFunction(scale.ticks)) {
      const scaleTicks = scale.ticks(tickCount);
      const ticks = Array.isArray(scaleTicks) && scaleTicks.length ? scaleTicks : scale.domain();
      const filteredTicks = includes(ticks, 0) ? without(ticks, 0) : ticks;
      return filteredTicks.length ? filteredTicks : ticks;
    }
    return scale.domain();
  },

  getTickFormat(props, scale) {
    if (props.tickFormat && isFunction(props.tickFormat)) {
      return props.tickFormat;
    } else if (props.tickFormat && Array.isArray(props.tickFormat)) {
      return (x, index) => props.tickFormat[index];
    } else if (Helpers.stringTicks(props)) {
      return (x, index) => props.tickValues[index];
    } else if (scale.tickFormat && isFunction(scale.tickFormat)) {
      return scale.tickFormat();
    } else {
      return (x) => x;
    }
  }
};
