import Helpers from "./helpers";

export default {
  getText(props, datum, index) {
    if (datum.label !== undefined) {
      return datum.label;
    }
    return Array.isArray(props.labels) ? props.labels[index] : props.labels;
  },

  getVerticalAnchor(props, datum) {
    const sign = datum._y >= 0 ? 1 : -1;
    const labelStyle = props.style && props.style.labels || {};
    if (datum.getVerticalAnchor || labelStyle.verticalAnchor) {
      return datum.getVerticalAnchor || labelStyle.verticalAnchor;
    } else if (!props.horizontal) {
      return sign >= 0 ? "end" : "start";
    } else {
      return "middle";
    }
  },

  getTextAnchor(props, datum) {
    const { style, horizontal } = props;
    const sign = datum._y >= 0 ? 1 : -1;
    const labelStyle = style && style.labels || {};
    if (datum.getVerticalAnchor || labelStyle.verticalAnchor) {
      return datum.getVerticalAnchor || labelStyle.verticalAnchor;
    } else if (!horizontal) {
      return "middle";
    } else {
      return sign >= 0 ? "start" : "end";
    }
  },

  getAngle(props, datum) {
    const labelStyle = props.style && props.style.labels || {};
    return datum.angle || labelStyle.angle;
  },

  getPadding(props, datum) {
    const { horizontal, style } = props;
    const labelStyle = style.labels || {};
    const defaultPadding = labelStyle.padding || 0;
    const sign = datum._y < 0 ? -1 : 1;
    return {
      x: horizontal ? sign * defaultPadding : 0,
      y: horizontal ? 0 : sign * defaultPadding
    };
  },

  getPosition(props, datum) {
    const { horizontal, polar } = props;
    const { x, y } = Helpers.scalePoint(props, datum);
    const padding = this.getPadding(props, datum);
    if (!polar) {
      return {
        x: horizontal ? y + padding.x : x + padding.x,
        y: horizontal ? x + padding.y : y - padding.y
      };
    } else {
      const degrees = this.getDegrees(props, datum);
      const polarPadding = this.getPolarPadding(props, degrees);
      return {
        x: x + polarPadding.x,
        y: y + polarPadding.y
      };
    }
  },

  getPolarPadding(props, degrees) {
    const labelStyle = props.style.labels || {};
    const padding = labelStyle.padding || 0;
    const angle = Helpers.degreesToRadians(degrees);
    return {
      x: padding * Math.cos(angle), y: -padding * Math.sin(angle)
    };
  },

  getLabelPlacement(props) {
    const { labelComponent, labelPlacement, polar } = props;
    const defaultLabelPlacement = polar ? "perpendicular" : "vertical";
    return labelPlacement ?
      labelPlacement :
      labelComponent.props && labelComponent.props.labelPlacement || defaultLabelPlacement;
  },

  getPolarOrientation(degrees) {
    if (degrees < 45 || degrees > 315) { // eslint-disable-line no-magic-numbers
      return "right";
    } else if (degrees >= 45 && degrees <= 135) { // eslint-disable-line no-magic-numbers
      return "top";
    } else if (degrees > 135 && degrees < 225) { // eslint-disable-line no-magic-numbers
      return "left";
    } else {
      return "bottom";
    }
  },

  getPolarTextAnchor(props, degrees) {
    const labelPlacement = this.getLabelPlacement(props);
    if (labelPlacement === "perpendicular" || degrees === 90 || degrees === 270) {
      return "middle";
    }
    return degrees < 90 || degrees > 270 ? "start" : "end";
  },

  getPolarVerticalAnchor(props, degrees) {
    const labelPlacement = this.getLabelPlacement(props);
    const orientation = this.getPolarOrientation(degrees);
    if (labelPlacement === "parallel" || orientation === "left" || orientation === "right") {
      return "middle";
    }
    return orientation === "top" ? "end" : "start";
  },

  getDegrees(props, datum) {
    const { x } = Helpers.getPoint(datum);
    return Helpers.radiansToDegrees(props.scale.x(x));
  },

  getProps(props, index) {
    const { scale, data, style, horizontal, polar } = props;
    const datum = data[index];
    const degrees = this.getDegrees(props, datum);
    const textAnchor = polar ?
      this.getPolarTextAnchor(props, degrees) : this.getTextAnchor(props, datum);
    const verticalAnchor = polar ?
       this.getPolarVerticalAnchor(props, degrees) : this.getVerticalAnchor(props, datum);
    const angle = this.getAngle(props, datum);
    const text = this.getText(props, datum, index);
    const labelPlacement = this.getLabelPlacement(props);
    const { x, y } = this.getPosition(props, datum);
    return {
      angle, data, datum, horizontal, index, polar, scale, labelPlacement,
      text, textAnchor, verticalAnchor, x, y, style: style.labels
    };
  }
};
