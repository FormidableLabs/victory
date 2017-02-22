import { assign, omit, defaults, without } from "lodash";
import { Helpers, Data, Domain, Scale } from "victory-core";
import { voronoi as d3Voronoi } from "d3-voronoi";

export default {
  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "voronoi");
    const { data, style, scale, polygons, domain } = this.getCalculatedValues(props);
    const { width, height, standalone, theme, events, sharedEvents } = props;
    const initialChildProps = { parent: {
      style: style.parent, scale, domain, data, standalone, height, width, theme
    }};

    return data.reduce((childProps, datum, index) => {
      const polygon = without(polygons[index], "data");
      const eventKey = datum.eventKey;
      const x = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
      const y = scale.y(datum._y1 !== undefined ? datum._y1 : datum._y);
      const dataProps = {
        x, y, datum, data, index, scale, polygon,
        size: props.size,
        style: this.getDataStyles(datum, style.data)
      };

      childProps[eventKey] = { data: dataProps };
      const text = this.getLabelText(props, datum, index);
      if (text !== undefined && text !== null || events || sharedEvents) {
        childProps[eventKey].labels = assign(
          {},
          this.getFlyoutProps(dataProps, text, style),
        );
      }

      return childProps;
    }, initialChildProps);
  },

  getFlyoutProps(dataProps, text, style) {
    const { x, y, index, scale, datum, data } = dataProps;
    return {
      x, y, text, index, scale, datum, data,
      flyoutStyle: style.flyout,
      style: style.labels
    };
  },

  getStyles(style, styleObject) {
    style = style || {};
    styleObject = styleObject || {};
    const parentStyleProps = { height: "auto", width: "100%" };
    return {
      parent: defaults(parentStyleProps, style.parent, styleObject.parent),
      data: defaults({}, style.data, styleObject.data),
      labels: defaults({}, style.labels, styleObject.labels),
      flyout: defaults({}, style.flyout, styleObject.flyout)
    };
  },

  getCalculatedValues(props) {
    const defaultStyles = props.theme && props.theme.voronoi && props.theme.voronoi.style ?
      props.theme.voronoi.style : {};
    const style = this.getStyles(props.style, defaultStyles, "auto", "100%");
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
    const polygons = props.polygons || this.getPolygons(range, scale, data);
    return {domain, data, scale, style, polygons};
  },

  getPolygons(range, scale, data) {
    const minRange = [Math.min(...range.x), Math.min(...range.y)];
    const maxRange = [Math.max(...range.x), Math.max(...range.y)];
    const voronoi = d3Voronoi()
      .x((d) => scale.x(d._x1 !== undefined ? d._x1 : d._x))
      .y((d) => scale.y(d._y1 !== undefined ? d._y1 : d._y))
      .extent([minRange, maxRange]);
    return voronoi.polygons(data);
  },

  getDataStyles(datum, style) {
    const stylesFromData = omit(datum, [
      "_x", "_y", "name", "label"
    ]);
    return defaults({}, stylesFromData, style);
  },

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : props.labels);
  }
};
