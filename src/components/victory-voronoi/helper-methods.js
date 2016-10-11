import { omit, defaults, without } from "lodash";
import { Helpers, Scale, Domain, Data } from "victory-core";
import { voronoi as d3Voronoi } from "d3-voronoi";

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "voronoi");
    const { data, style, scale, polygons } = this.getCalculatedValues(props);
    const childProps = { parent: {
      style: style.parent, scale, data, height: props.height, width: props.width
    }};
    for (let index = 0, len = data.length; index < len; index++) {
      const datum = data[index];
      const polygon = without(polygons[index], "data");
      const eventKey = datum.eventKey;
      const x = scale.x(datum.x1 || datum.x);
      const y = scale.y(datum.y1 || datum.y);
      const dataProps = {
        x, y, datum, data, index, scale, polygon,
        size: props.size,
        style: this.getDataStyles(datum, style.data)
      };

      childProps[eventKey] = { data: dataProps };
      const text = this.getLabelText(props, datum, index);
      if (text !== undefined && text !== null || props.events || props.sharedEvents) {
        childProps[eventKey].labels = this.getLabelProps(dataProps, text, style);
      }
    }
    return childProps;
  },

  getLabelProps(dataProps, text, calculatedStyle) {
    const { x, y, index, scale, datum, data } = dataProps;
    const labelStyle = this.getLabelStyle(calculatedStyle.labels, dataProps) || {};
    return {
      style: labelStyle,
      x,
      y: y - (labelStyle.padding || 0),
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

  getCalculatedValues(props) {
    const defaultStyles = props.theme && props.theme.voronoi && props.theme.voronoi.style ?
      props.theme.voronoi.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const data = Data.getData(props);
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
    const voronoi = this.getVoronoi(range, scale);
    const polygons = voronoi.polygons(data);
    return {data, scale, style, polygons};
  },

  getVoronoi(range, scale) {
    const minRange = [Math.min(...range.x), Math.min(...range.y)];
    const maxRange = [Math.max(...range.x), Math.max(...range.y)];
    return d3Voronoi()
      .x((d) => scale.x(d.x1 || d.x))
      .y((d) => scale.y(d.y1 || d.y))
      .extent([minRange, maxRange]);
  },

  getDataStyles(datum, style) {
    const stylesFromData = omit(datum, [
      "x", "y", "name", "label"
    ]);
    const baseDataStyle = defaults({}, stylesFromData, style);
    return Helpers.evaluateStyle(baseDataStyle, datum);
  },

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum));
  },

  getLabelStyle(style, datum) {
    const labelStyle = defaults({}, {
      angle: datum.angle,
      textAnchor: datum.textAnchor,
      verticalAnchor: datum.verticalAnchor
    }, style);
    return Helpers.evaluateStyle(labelStyle, datum);
  }
};
