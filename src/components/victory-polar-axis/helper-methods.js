import { assign, uniqBy, defaults, defaultsDeep, isFunction } from "lodash";
import Axis from "../../helpers/axis";
import { Helpers, LabelHelpers, Scale, Domain, Collection } from "victory-core";

export default {
  getCalculatedValues(props) {
    const defaultStyles = this.getStyleObject(props);
    const style = this.getStyles(props, defaultStyles);
    const padding = Helpers.getPadding(props);
    const axis = this.getAxis(props);
    const axisType = this.getAxisType(props);
    const stringTicks = Helpers.stringTicks(props) ? props.tickValues : undefined;
    const domain = this.getDomain(props, axis);
    const range = this.getRange(props, axis);
    const scale = this.getScale(props);
    const initialTicks = Axis.getTicks(props, scale);
    const ticks = axisType === "angular" ? this.filterTicks(initialTicks, scale) : initialTicks;
    const tickFormat = Axis.getTickFormat(props, scale);
    const radius = this.getRadius(props);
    return {
      axis, style, padding, stringTicks, axisType, scale, ticks, tickFormat, domain, range, radius
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
      domain = this.getDomainFromTickValues(props, axis);
    }
    const paddedDomain = Domain.padDomain(domain, props, inherentAxis);
    return domain ? Domain.cleanDomain(paddedDomain, props, inherentAxis) : undefined;
  },

  getDomainFromTickValues(props, axis) {
    const { tickValues, startAngle = 0, endAngle = 360 } = props;
    if (Helpers.stringTicks(props)) {
      return [1, tickValues.length];
    } else {
      const ticks = tickValues.map((value) => +value);
      const domain = [Collection.getMinValue(ticks), Collection.getMaxValue(ticks)];
      return axis === "x" && Math.abs(startAngle - endAngle) === 360 ?
        Domain.getSymmetricDomain(domain, ticks) : domain;
    }
  },

  getRadius(props) {
    const { left, right, top, bottom } = Helpers.getPadding(props);
    const { width, height } = props;
    return Math.min(width - left - right, height - top - bottom) / 2;
  },

  getRange(props, axis) {
    // Return the range from props if one is given.
    if (props.range && props.range[axis]) {
      return props.range[axis];
    } else if (props.range && Array.isArray(props.range)) {
      return props.range;
    }
    const axisType = this.getAxisType(props);
    if (axisType === "angular") {
      const startAngle = Helpers.degreesToRadians(props.startAngle);
      const endAngle = Helpers.degreesToRadians(props.endAngle);
      return [startAngle, endAngle];
    }
    const radius = this.getRadius(props);
    return [props.innerRadius || 0, radius];
  },

  // exposed for use by VictoryChart
  getAxis(props, flipped) {
    const typicalAxis = props.dependentAxis ? "y" : "x";
    const invertedAxis = typicalAxis === "x" ? "y" : "x";
    return flipped ? invertedAxis : typicalAxis;
  },

  getAxisType(props) {
    const typicalType = props.dependentAxis ? "radial" : "angular";
    const invertedType = typicalType === "angular" ? "radial" : "angular";
    return props.horizontal ? invertedType : typicalType;
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
      axisLabel: defaults({}, style.axisLabel, styleObject.axisLabel),
      grid: defaults({}, style.grid, styleObject.grid),
      ticks: defaults({}, style.ticks, styleObject.ticks),
      tickLabels: defaults({}, style.tickLabels, styleObject.tickLabels)
    };
  },

  getAxisAngle(props) {
    const { axisAngle, startAngle, axisValue, dependentAxis, scale } = props;
    const otherAxis = this.getAxis(props) === "y" ? "x" : "y";
    if (axisValue === undefined || !dependentAxis || scale[otherAxis] === undefined) {
      return axisAngle || startAngle;
    }
    return Helpers.radiansToDegrees(scale.x(axisValue));
  },

  getTickProps(props, calculatedValues, tick, index) { //eslint-disable-line max-params
    const { axisType, radius, scale, style, stringTicks } = calculatedValues;
    const originalTick = stringTicks ? stringTicks[index] : tick;
    const { tickStyle } = this.getEvaluatedStyles(style, originalTick, index);
    const tickPadding = tickStyle.padding || 0;
    const angularPadding = tickPadding; // TODO: do some geometry
    const axisAngle = axisType === "radial" ? this.getAxisAngle(props, scale) : undefined;
    return axisType === "angular" ?
      {
        index, datum: tick, style: tickStyle,
        x1: radius * Math.cos(scale(tick)),
        y1: -radius * Math.sin(scale(tick)),
        x2: (radius + tickPadding) * Math.cos(scale(tick)),
        y2: -(radius + tickPadding) * Math.sin(scale(tick))
      } : {
        style, index, datum: tick,
        x1: (scale(tick) / 2) * Math.cos(axisAngle - angularPadding),
        x2: (scale(tick) / 2) * Math.cos(axisAngle + angularPadding),
        y1: -(scale(tick) / 2) * Math.sin(axisAngle - angularPadding),
        y2: -(scale(tick) / 2) * Math.sin(axisAngle + angularPadding)
      };
  },

  getTickLabelProps(props, calculatedValues, tick, index) { //eslint-disable-line max-params
    const { axisType, radius, tickFormat, style, scale, ticks, stringTicks } = calculatedValues;
    const originalTick = stringTicks ? stringTicks[index] : tick;
    const { labelStyle } = this.getEvaluatedStyles(style, originalTick, index);
    const { tickLabelComponent } = props;
    const labelPlacement = tickLabelComponent.props && tickLabelComponent.props.labelPlacement ?
      tickLabelComponent.props.labelPlacement : props.labelPlacement;
    const tickPadding = labelStyle.padding || 0;
    const angularPadding = 0; // TODO: do some geometry
    const axisAngle = axisType === "radial" ? this.getAxisAngle(props, scale) : undefined;
    const labelAngle = axisType === "angular" ?
      Helpers.radiansToDegrees(scale(tick)) : axisAngle + angularPadding;
    const textAngle = labelStyle.angle ||
      LabelHelpers.getPolarAngle(assign({}, props, { labelPlacement }), labelAngle);
    const labelRadius = axisType === "angular" ? radius + tickPadding : scale(tick);
    const textAnchor = labelStyle.textAnchor ||
      LabelHelpers.getPolarTextAnchor(assign({}, props, { labelPlacement }), labelAngle);
    return {
      index, datum: tick, style: labelStyle,
      angle: textAngle,
      textAnchor,
      text: tickFormat(tick, index, ticks),
      x: labelRadius * Math.cos(Helpers.degreesToRadians(labelAngle)),
      y: -labelRadius * Math.sin(Helpers.degreesToRadians(labelAngle))
    };
  },

  getGridProps(props, calculatedValues, tick, index) { //eslint-disable-line max-params
    const { axisType, radius, style, scale, stringTicks } = calculatedValues;
    const { startAngle, endAngle, innerRadius = 0 } = props;
    const originalTick = stringTicks ? stringTicks[index] : tick;
    const { gridStyle } = this.getEvaluatedStyles(style, originalTick, index);
    const angle = scale(tick);
    return axisType === "angular" ?
      {
        index, datum: tick, style: gridStyle,
        x1: this.getPosition(radius, angle, "x"),
        y1: this.getPosition(radius, angle, "y"),
        x2: this.getPosition(innerRadius, angle, "x"),
        y2: this.getPosition(innerRadius, angle, "y")
      } : {
        style: gridStyle, index, datum: tick,
        cx: 0, cy: 0, r: scale(tick), startAngle, endAngle
      };
  },

  getAxisLabelProps(props, calculatedValues) {
    const { axisType, radius, style, scale } = calculatedValues;
    const { axisLabelComponent } = props;
    if (axisType !== "radial") {
      return {};
    }
    const labelPlacement = axisLabelComponent.props && axisLabelComponent.props.labelPlacement ?
      axisLabelComponent.props.labelPlacement : props.labelPlacement;
    const labelStyle = style && style.axisLabel || {};
    const axisAngle = axisType === "radial" ? this.getAxisAngle(props, scale) : undefined;
    const textAngle = labelStyle.angle ||
      LabelHelpers.getPolarAngle(assign({}, props, { labelPlacement }), axisAngle);
    const labelRadius = radius + (labelStyle.padding || 0);
    const textAnchor = labelStyle.textAnchor ||
      LabelHelpers.getTextPolarAnchor(assign({}, props, { labelPlacement }), axisAngle);
    const verticalAnchor = labelStyle.verticalAnchor ||
      LabelHelpers.getPolarVerticalAnchor(assign({}, props, { labelPlacement }), axisAngle);
    return {
      style: labelStyle,
      angle: textAngle,
      textAnchor,
      verticalAnchor,
      text: props.label,
      x: this.getPosition(labelRadius, Helpers.degreesToRadians(axisAngle), "x"),
      y: this.getPosition(labelRadius, Helpers.degreesToRadians(axisAngle), "y")
    };
  },

  getPosition(r, angle, axis) {
    return axis === "x" ? r * Math.cos(angle) : -r * Math.sin(angle);
  },

  getAxisProps(modifiedProps, calculatedValues) {
    const { style, axisType, radius, scale } = calculatedValues;
    const { startAngle, endAngle, innerRadius = 0 } = modifiedProps;
    const axisAngle = axisType === "radial" ?
      Helpers.degreesToRadians(this.getAxisAngle(modifiedProps, scale)) : undefined;
    return axisType === "radial" ?
      {
        style: style.axis,
        x1: this.getPosition(innerRadius, axisAngle, "x"),
        x2: this.getPosition(radius, axisAngle, "x"),
        y1: this.getPosition(innerRadius, axisAngle, "y"),
        y2: this.getPosition(radius, axisAngle, "y")
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
    const axisLabelProps = this.getAxisLabelProps(props, calculatedValues);
    const initialChildProps = { parent:
      { style: style.parent, ticks, scale, width, height, domain, standalone, theme }
    };

    return ticks.reduce((childProps, tick, index) => {
      childProps[index] = {
        axis: axisProps,
        axisLabel: axisLabelProps,
        ticks: this.getTickProps(props, calculatedValues, tick, index),
        tickLabels: this.getTickLabelProps(props, calculatedValues, tick, index),
        grid: this.getGridProps(props, calculatedValues, tick, index)
      };

      return childProps;
    }, initialChildProps);
  },

  filterTicks(ticks, scale) {
    const compareTicks = (t) => scale(t) % (2 * Math.PI);
    return uniqBy(ticks, compareTicks);
  }
};
