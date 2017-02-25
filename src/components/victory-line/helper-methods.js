import { sortBy, defaults } from "lodash";
import { Helpers, Log, Data, Domain, Scale } from "victory-core";

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "line");
    const calculatedValues = this.getCalculatedValues(props);
    const { scale, data, domain, style } = calculatedValues;
    const {
      interpolation, width, height, events, sharedEvents, standalone, groupComponent, theme
    } = props;
    const initialChildProps = {
      parent: { style: style.parent, scale, data, height, width, domain, standalone },
      all: { data: { scale, data, interpolation, groupComponent, theme, style: style.data } }
    };
    return data.reduce((childProps, datum, index) => {
      const text = this.getLabelText(props, datum, index);
      if (text !== undefined && text !== null || events || sharedEvents) {
        const eventKey = datum.eventKey || index;
        childProps[eventKey] = {labels: this.getLabelProps(text, index, calculatedValues)};
      }
      return childProps;
    }, initialChildProps);
  },

  getCalculatedValues(props) {
    const sortKey = props.sortKey || "x";
    let data = sortBy(Data.getData(props), sortKey);

    if (data.length < 2) {
      Log.warn("VictoryLine needs at least two data points to render properly.");
      data = [];
    }

    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomain(props, "x"),
      y: Domain.getDomain(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };

    const defaultStyles = props.theme && props.theme.line && props.theme.line.style ?
      props.theme.line.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");

    return { domain, data, scale, style };
  },

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : props.labels);
  },

  getLabelProps(text, index, calculatedProps) {
    const { scale, data, style } = calculatedProps;
    const datum = data[index];
    const {x, y} = this.getLabelPosition(datum, scale);
    const labelStyle = this.getLabelStyle(style) || {};
    const sign = (datum._y1 || datum._y) < 0 ? -1 : 1;
    return {
      style: labelStyle,
      x,
      y: y - sign * (labelStyle.padding || 0),
      text,
      index,
      scale,
      datum,
      data,
      textAnchor: labelStyle.textAnchor,
      verticalAnchor: labelStyle.verticalAnchor || "end",
      angle: labelStyle.angle
    };
  },

  getLabelPosition(datum, scale) {
    return {
      x: scale.x(datum._x1 !== undefined ? datum._x1 : datum._x),
      y: scale.y(datum._y1 !== undefined ? datum._y1 : datum._y)
    };
  },

  getLabelStyle(style) {
    const dataStyle = style.data || {};
    const labelStyle = style.labels || {};
    // match labels styles to data style by default (fill, opacity, others?)
    const opacity = dataStyle.opacity;
    // match label color to data color if it is not given.
    // use fill instead of stroke for text
    const fill = dataStyle.stroke;
    const padding = labelStyle.padding || 0;
    return defaults({}, labelStyle, {opacity, fill, padding});
  }
};
