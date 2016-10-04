import { assign, last } from "lodash";
import { Helpers, Log, Data, Domain, Scale } from "victory-core";

export default {

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "area");
    const {scale, style, data} = this.getCalculatedValues(props, fallbackProps);
    const {interpolation, label, width, height, groupComponent} = props;

    const dataProps = {
      groupComponent,
      key: "area",
      data,
      scale,
      interpolation: Helpers.evaluateProp(interpolation, data),
      style: Helpers.evaluateStyle(style.data, data)
    };

    const baseProps = {
      parent: { style: style.parent, width, height, scale, data },
      all: {
        data: dataProps
      }
    };

    const text = Helpers.evaluateProp(label, data);
    if (text !== undefined && text !== null || props.events || props.sharedEvents) {
      baseProps.all.labels = this.getLabelProps(dataProps, text, style);
    }

    return baseProps;
  },

  getLabelProps(dataProps, text, calculatedStyle) {
    const { data, scale } = dataProps;
    const lastData = last(data);
    const labelStyle = Helpers.evaluateStyle(calculatedStyle.labels, data) || {};
    const labelPadding = labelStyle.padding || 0;

    return {
      key: "area-label",
      x: lastData ? scale.x(lastData.x) + labelPadding : 0,
      y: lastData ? scale.y(lastData.y1) : 0,
      y0: lastData ? scale.y(lastData.y0) : 0,
      style: labelStyle,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "middle",
      angle: labelStyle.angle,
      data,
      scale,
      text
    };
  },

  getScale(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "area");
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    return {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
  },

  getCalculatedValues(props) {
    const { theme } = props;
    const defaultStyles = theme && theme.area && theme.area.style ? theme.area.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const scale = this.getScale(props);

    const data = this.getDataWithBaseline(props, scale);
    return { style, data, scale };
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
      const y1 = datum.y1 || datum.y;
      const y0 = datum.y0 || minY;
      return assign({}, datum, {y0, y1});
    });
  }
};
