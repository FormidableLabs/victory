import { includes, defaults, defaultsDeep, isFunction, range, without } from "lodash";
import { Helpers, Scale, Domain } from "victory-core";

export default {
  getCalculatedValues(props) {
    const defaultStyles = this.getStyleObject(props);
    const style = this.getStyles(props, defaultStyles);
    const padding = Helpers.getPadding(props);
    const axisType = props.dependentAxis ? "radial" : "angular";
    const axis = props.dependentAxis ? "y" : "x";
    const stringTicks = Helpers.stringTicks(props);
    const scale = this.getScale(props);
    const domain = this.getDomain(props);
    const range = Helpers.getRange(props, axis);
    const ticks = this.getTicks(props, scale);
    const tickFormat = this.getTickFormat(props, scale, ticks);
    const radius = Math.min(
      props.width - padding.left - padding.right,
      props.height - padding.top - padding.bottom
    ) / 2;
    const origin = this.getOrigin(props)
    return {
      style, padding, stringTicks, axisType, origin,
      scale, ticks, tickFormat, domain, range, radius
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
    } else {
      // TODO: support clockwise / counterclockwise
      // TODO: smart calculation for radial domain
      domain = axis === "y" ? [0, props.radius] : [0, 360]
    }
    return domain;
  },

  // exposed for use by VictoryChart
  getAxis(props) {
    return props.dependentAxis ? "y" : "x";
  },

  // exposed for use by VictoryChart (necessary?)
  getScale(props) {
    const axis = this.getAxis(props);
    const scale = Scale.getBaseScale(props, axis);
    const domain = this.getDomain(props) || scale.domain();
    const range = Helpers.getRange(props, axis);
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

  getOrigin(props) {
    const { width, height } = props;
    const padding = Helpers.getPadding(props);
    const radius = Math.min(
      props.width - padding.left - padding.right,
      props.height - padding.top - padding.bottom
    ) / 2;
    const offsetWidth = width / 2 + padding.left - padding.right;
    const offsetHeight = height / 2 + padding.top - padding.bottom;
    return {
      x: offsetWidth + radius > width ? radius + padding.left - padding.right : offsetWidth,
      y: offsetHeight + radius > height ? radius + padding.top - padding.bottom : offsetHeight
    };
  },

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  },

  getTickProps(props, calculatedValues, tick, index) {
    const { axisType, origin, radius, scale, style } = calculatedValues;
    const { tickStyle } = this.getEvaluatedStyles(style, tick, index);
    const tickPadding = tickStyle.padding || 0;
    const angularPadding = tickPadding; // TODO: do some geometry
    const axisAngle = props.axisAngle || 90;
    return axisType === "angular" ?
      {
        index, datum: tick, style: tickStyle,
        x1: origin.x + radius * Math.sin(this.degreesToRadians(tick)),
        y1: origin.y + radius * Math.cos(this.degreesToRadians(tick)),
        x2: origin.x + (radius + tickPadding) *  Math.sin(this.degreesToRadians(tick)),
        y2: origin.y + (radius + tickPadding) *  Math.cos(this.degreesToRadians(tick))
      } : {
        style, index, datum: tick,
        x1: origin.x + (scale(tick) / 2) * Math.sin(axisAngle - angularPadding),
        x2: origin.x + (scale(tick) / 2) * Math.sin(axisAngle + angularPadding),
        y1: origin.y + (scale(tick) / 2) * Math.cos(axisAngle - angularPadding),
        y2: origin.y + (scale(tick) / 2) * Math.cos(axisAngle + angularPadding)
      };
  },

  getTickLabelProps(props, calculatedValues, tick, index) {
    const { axisType, origin, radius, tickFormat, style, scale } = calculatedValues;
    const { labelStyle } = this.getEvaluatedStyles(style, tick, index);
    const tickPadding = labelStyle.padding || 0;
    const angularPadding = 0; // TODO: do some geometry
    const axisAngle = props.axisAngle || 90;
    const labelAngle = axisType === "angular" ? tick : axisAngle + angularPadding;
    const labelRadius = axisType === "angular" ? radius + tickPadding : scale(tick) / 2;
    return {
      index, datum: tick, style: labelStyle,
      angle: labelStyle.angle || this.getTextAngle(labelAngle),
      textAnchor: labelStyle.textAnchor || this.getTextAnchor(labelAngle, axisType),
      text: tickFormat(tick, index),
      x: origin.x + (labelRadius) * Math.sin(this.degreesToRadians(labelAngle)),
      y: origin.y + (labelRadius) * Math.cos(this.degreesToRadians(labelAngle))
    };
  },

  getTextAngle(angle) {
    if (angle % 90 === 0) {
      return 0;
    } else if (angle > 0 && angle < 90 || angle > 270) {
      return angle
    } else {
      return angle - 180;
    }
  },

  getTextAnchor(angle, axisType) {
    if (angle % 180 === 0 || axisType === "radial") {
      return "middle";
    } else if (angle < 180) {
      return "start";
    } else {
      return "end";
    }
  },

  getGridProps(props, calculatedValues, tick, index) {
    const { axisType, origin, radius, style, scale } = calculatedValues;
    const { gridStyle } = this.getEvaluatedStyles(style, tick, index);
    const axisAngle = props.axisAngle || 90;
    return axisType === "angular" ?
      {
        index, datum: tick, style: gridStyle,
        x1: origin.x + radius * Math.sin(this.degreesToRadians(tick)),
        y1: origin.y + radius * Math.cos(this.degreesToRadians(tick)),
        x2: origin.x,
        y2: origin.y
      } : {
        style: gridStyle, index, datum: tick,
        cx: origin.x, cy: origin.y, r: scale(tick) / 2
      };
  },

  getAxisProps(modifiedProps, calculatedValues) {
    const { style, axisType, origin, radius } = calculatedValues;
    const axisAngle = modifiedProps.axisAngle || 90;
    return axisType === "radial" ?
      {
        style: style.axis,
        x1: origin.x,
        x2: origin.x + radius * Math.sin(this.degreesToRadians(axisAngle)),
        y1: origin.y,
        y2: origin.y + radius * Math.cos(this.degreesToRadians(axisAngle))
      } : {
        style: style.axis,
        cx: origin.x, cy: origin.y, r: radius
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
      style, scale, ticks, tickFormat, stringTicks, domain, origin, axisType
    } = calculatedValues;
    const { width, height, standalone, theme, tickValues } = props;

    const axisProps = this.getAxisProps(props, calculatedValues);
    const initialChildProps = { parent: {
      style: style.parent, ticks, scale, width, height, domain, standalone, theme
    }};

    return ticks.reduce((childProps, indexedTick, index) => {
      const tick = stringTicks ? tickValues[indexedTick - 1] : indexedTick;

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
    const { tickValues, tickCount, crossAxis } = props;
    if (props.tickValues) {
      if (Helpers.stringTicks(props)) {
        return range(1, props.tickValues.length + 1);
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
