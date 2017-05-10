/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import { assign, defaults } from "lodash";
import { Helpers, Log, Data, Domain, Scale } from "victory-core";

export default {

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "area");
    const calculatedValues = this.getCalculatedValues(props);
    const { scale, style, data, domain } = calculatedValues;
    const {
      standalone, interpolation, events, sharedEvents, width, height, groupComponent, theme
    } = props;

    const initialChildProps = {
      parent: { style: style.parent, width, height, scale, data, domain, standalone, theme },
      all: {
        data: { scale, data, interpolation, groupComponent, style: style.data }
      }
    };
    return data.reduce((childProps, datum, index) => {
      const text = this.getLabelText(props, datum, index);
      if (text !== undefined && text !== null || events || sharedEvents) {
        const eventKey = datum.eventKey || index;
        childProps[eventKey] = { labels: this.getLabelProps(text, index, calculatedValues) };
      }
      return childProps;
    }, initialChildProps);
  },

  getCalculatedValues(props) {
    const { theme } = props;
    const defaultStyles = theme && theme.area && theme.area.style ? theme.area.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles);
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };

    const data = this.getDataWithBaseline(props, scale);
    return { style, data, scale, domain };
  },

  getLabelProps(text, index, calculatedProps) {
    const { scale, data, style } = calculatedProps;
    const datum = data[index];
    const { x, y } = this.getLabelPosition(datum, scale);
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

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : props.labels);
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
    return defaults({}, labelStyle, { opacity, fill, padding });
  },


  getDataWithBaseline(props, scale) {
    let data = Data.getData(props);

    if (data.length < 2) {
      Log.warn("Area requires at least two data points.");
      data = [];
    }
    const defaultMin = Scale.getType(scale.y) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;
    const domainY = scale.y.domain();
    const minY = Math.min(...domainY) > 0 ? Math.min(...domainY) : defaultMin;

    return data.map((datum) => {
      const _y1 = datum._y1 !== undefined ? datum._y1 : datum._y;
      const _y0 = datum._y0 !== undefined ? datum._y0 : minY;
      return assign({}, datum, { _y0, _y1 });
    });
  }
};
