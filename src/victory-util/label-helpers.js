import Helpers from "./helpers";

export default {
  getText(props, datum, index) {
    if (datum.label !== undefined) {
      return datum.label;
    }
    return Array.isArray(props.labels) ? props.labels[index] : props.labels;
  },

  getVerticalAnchor(props, calculatedProps, datum) {
    const { style } = calculatedProps;
    const sign = datum._y >= 0 ? 1 : -1;
    const labelStyle = style && style.labels || {};
    if (datum.getVerticalAnchor || labelStyle.verticalAnchor) {
      return datum.getVerticalAnchor || labelStyle.verticalAnchor;
    } else if (!props.horizontal) {
      return sign >= 0 ? "end" : "start";
    } else {
      return "middle";
    }
  },

  getTextAnchor(props, calculatedProps, datum) {
    const { style } = calculatedProps;
    const sign = datum._y >= 0 ? 1 : -1;
    const labelStyle = style && style.labels || {};
    if (datum.getVerticalAnchor || labelStyle.verticalAnchor) {
      return datum.getVerticalAnchor || labelStyle.verticalAnchor;
    } else if (!props.horizontal) {
      return "middle";
    } else {
      return sign >= 0 ? "start" : "end";
    }
  },

  getAngle(props, calculatedProps, datum) {
    const { style } = calculatedProps;
    const labelStyle = style && style.labels || {};
    return datum.angle || labelStyle.angle;
  },

  getPadding(props, calculatedProps, datum) {
    const { horizontal } = props;
    const { style } = calculatedProps;
    const labelStyle = style.labels || {};
    const defaultPadding = labelStyle.padding || 0;
    const sign = datum._y < 0 ? -1 : 1;
    return {
      x: horizontal ? sign * defaultPadding : 0,
      y: horizontal ? 0 : sign * defaultPadding
    };
  },

  getPosition(props, calculatedProps, datum) {
    const { scale } = calculatedProps;
    const { horizontal } = props;
    const { x, y } = Helpers.scalePoint(Helpers.getPoint(datum), scale, props.polar);
    const padding = this.getPadding(props, calculatedProps, datum);
    return {
      x: horizontal ? y + padding.x : x + padding.x,
      y: horizontal ? x + padding.y : y - padding.y
    };
  },

  getProps(props, calculatedProps, index) {
    const { scale, data, style } = calculatedProps;
    const { horizontal } = props;
    const datum = data[index];
    const textAnchor = this.getTextAnchor(props, calculatedProps, datum);
    const verticalAnchor = this.getVerticalAnchor(props, calculatedProps, datum);
    const angle = this.getAngle(props, calculatedProps, datum);
    const text = this.getText(props, datum, index);
    const { x, y } = this.getPosition(props, calculatedProps, datum);
    return {
      style: style.labels,
      x, y,
      text,
      index,
      scale,
      datum,
      data,
      textAnchor,
      verticalAnchor,
      angle,
      horizontal
    };
  }
};
