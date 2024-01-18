/* eslint-disable no-use-before-define */
import { VictoryLabelProps } from "../victory-label/victory-label";
import * as Helpers from "./helpers";
import { defaults } from "lodash";

// Private Functions

function getVerticalAnchor(props, datum: VictoryLabelProps["datum"] = {}) {
  const sign = datum._y >= 0 ? 1 : -1;
  const labelStyle = (props.style && props.style.labels) || {};
  if (datum.verticalAnchor || labelStyle.verticalAnchor) {
    return datum.verticalAnchor || labelStyle.verticalAnchor;
  } else if (!props.horizontal) {
    return sign >= 0 ? "end" : "start";
  }
  return "middle";
}

function getTextAnchor(props, datum: VictoryLabelProps["datum"] = {}) {
  const { style, horizontal } = props;
  const sign = datum._y >= 0 ? 1 : -1;
  const labelStyle = (style && style.labels) || {};
  if (datum.verticalAnchor || labelStyle.verticalAnchor) {
    return datum.verticalAnchor || labelStyle.verticalAnchor;
  } else if (!horizontal) {
    return "middle";
  }
  return sign >= 0 ? "start" : "end";
}

function getAngle(props, datum: VictoryLabelProps["datum"] = {}) {
  const labelStyle = (props.style && props.style.labels) || {};
  return datum.angle === undefined ? labelStyle.angle : datum.angle;
}

function getPadding(props, datum: VictoryLabelProps["datum"] = {}) {
  const { horizontal, style } = props;
  const labelStyle = style.labels || {};
  const defaultPadding = Helpers.evaluateProp(labelStyle.padding, props) || 0;
  const sign = datum._y < 0 ? -1 : 1;
  return {
    x: horizontal ? sign * defaultPadding : 0,
    y: horizontal ? 0 : -1 * sign * defaultPadding,
  };
}

function getOffset(props, datum) {
  if (props.polar) {
    return {};
  }
  const padding = getPadding(props, datum);

  return {
    dx: padding.x,
    dy: padding.y,
  };
}

function getPosition(props, datum) {
  const { polar } = props;
  const { x, y } = Helpers.scalePoint(props, datum);
  if (!polar) {
    return { x, y };
  }
  const polarPadding = getPolarPadding(props, datum);
  return {
    x: x + polarPadding.x,
    y: y + polarPadding.y,
  };
}

function getPolarPadding(props, datum) {
  const { style } = props;
  const degrees = getDegrees(props, datum);
  const labelStyle = style.labels || {};
  const padding = Helpers.evaluateProp(labelStyle.padding, props) || 0;
  const angle = Helpers.degreesToRadians(degrees);
  return {
    x: padding * Math.cos(angle),
    y: -padding * Math.sin(angle),
  };
}

function getLabelPlacement(props) {
  const { labelComponent, labelPlacement, polar } = props;
  const defaultLabelPlacement = polar ? "perpendicular" : "vertical";
  return labelPlacement
    ? labelPlacement
    : (labelComponent.props && labelComponent.props.labelPlacement) ||
        defaultLabelPlacement;
}

function getPolarOrientation(degrees) {
  // eslint-disable-next-line no-magic-numbers
  if (degrees < 45 || degrees > 315) {
    return "right";
    // eslint-disable-next-line no-magic-numbers
  } else if (degrees >= 45 && degrees <= 135) {
    return "top";
    // eslint-disable-next-line no-magic-numbers
  } else if (degrees > 135 && degrees < 225) {
    return "left";
  }
  return "bottom";
}

// Exported Functions

export function getText(props, datum: VictoryLabelProps["datum"] = {}, index) {
  if (datum.label !== undefined) {
    return datum.label;
  }
  return Array.isArray(props.labels) ? props.labels[index] : props.labels;
}

export function getPolarTextAnchor(props, degrees) {
  const labelPlacement = getLabelPlacement(props);
  if (
    labelPlacement === "perpendicular" ||
    (labelPlacement === "vertical" && (degrees === 90 || degrees === 270))
  ) {
    return "middle";
  }
  return degrees <= 90 || degrees > 270 ? "start" : "end";
}

export function getPolarVerticalAnchor(props, degrees) {
  const labelPlacement = getLabelPlacement(props);
  const orientation = getPolarOrientation(degrees);
  if (
    labelPlacement === "parallel" ||
    orientation === "left" ||
    orientation === "right"
  ) {
    return "middle";
  }
  return orientation === "top" ? "end" : "start";
}

export function getPolarAngle(props, baseAngle?) {
  const { labelPlacement, datum } = props;
  if (!labelPlacement || labelPlacement === "vertical") {
    return 0;
  }
  const degrees =
    baseAngle !== undefined ? baseAngle % 360 : getDegrees(props, datum);
  const sign = (degrees > 90 && degrees < 180) || degrees > 270 ? 1 : -1;
  let angle = 0;
  if (degrees === 0 || degrees === 180) {
    angle = 90;
  } else if (degrees > 0 && degrees < 180) {
    angle = 90 - degrees;
  } else if (degrees > 180 && degrees < 360) {
    angle = 270 - degrees;
  }
  const labelRotation = labelPlacement === "perpendicular" ? 0 : 90;
  return angle + sign * labelRotation;
}

export function getDegrees(props, datum) {
  const { x } = Helpers.getPoint(datum);
  return Helpers.radiansToDegrees(props.scale.x(x)) % 360;
}

export function getProps(props, index) {
  const {
    scale,
    data,
    style,
    horizontal,
    polar,
    width,
    height,
    theme,
    labelComponent,
    disableInlineStyles,
  } = props;
  const datum = data[index];
  const degrees = getDegrees(props, datum);
  const textAnchor = polar
    ? getPolarTextAnchor(props, degrees)
    : getTextAnchor(props, datum);
  const verticalAnchor = polar
    ? getPolarVerticalAnchor(props, degrees)
    : getVerticalAnchor(props, datum);
  const angle = getAngle(props, datum);
  const text = getText(props, datum, index);
  const labelPlacement = getLabelPlacement(props);
  const { x, y } = getPosition(props, datum);
  const { dx, dy } = getOffset(props, datum);
  const labelProps = {
    angle,
    data,
    datum,
    disableInlineStyles,
    horizontal,
    index,
    polar,
    scale,
    labelPlacement,
    text,
    textAnchor,
    verticalAnchor,
    x,
    y,
    dx,
    dy,
    width,
    height,
    style: style.labels,
  };
  if (!Helpers.isTooltip(labelComponent)) {
    return labelProps;
  }
  const tooltipTheme = (theme && theme.tooltip) || {};
  return defaults({}, labelProps, Helpers.omit(tooltipTheme, ["style"]));
}
