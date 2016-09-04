import { sortBy, defaults, last, without } from "lodash";
import { voronoi as d3Voronoi } from "d3-voronoi";
import { Helpers, Log } from "victory-core";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";

export default {

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "line");
    const defaultStyles = props.theme && props.theme.line && props.theme.line.style ?
      props.theme.line.style : {};
    const calculatedValues = this.getCalculatedValues(props);
    const {scale, dataset, polygons} = calculatedValues;
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const {interpolation, label, width, height} = props;
    const dataStyle = Helpers.evaluateStyle(style.data, dataset);
    const dataProps = {
      scale,
      interpolation: Helpers.evaluateProp(interpolation, dataset),
      style: dataStyle
    };
    const parentProps = { style: style.parent, scale, data: dataset, width, height };
    const baseProps = {
      parent: parentProps,
      all: {
        data: dataProps
      }
    };

    for (let index = 0, len = dataset.length; index < len; index++) {
      const datum = dataset[index];
      const polygon = without(polygons[index], "data");
      const eventKey = datum.eventKey || index;
      const x = scale.x(datum.x1 || datum.x);
      const y = scale.y(datum.y1 || datum.y);
      const voronoiProps = {
        x, y, datum, index, scale, polygon,
        size: props.size,
        style: {fill: "none", stroke: "none"}
      };

      baseProps[eventKey] = { data: voronoiProps };
      const text = this.getLabelText(props, datum, index);
      if (text || props.events || props.sharedEvents) {
        baseProps[eventKey].labels = this.getLabelProps(voronoiProps, text, style);
      }
    }
    return baseProps;
  },

  getLabelProps(dataProps, text, style) {
    const { x, y, index, scale, datum } = dataProps;
    const labelStyle = this.getLabelStyle(style.labels, dataProps) || {};
    return {
      style: labelStyle,
      x,
      y: y - (labelStyle.padding || 0),
      text,
      index,
      scale,
      datum,
      textAnchor: labelStyle.textAnchor,
      verticalAnchor: labelStyle.verticalAnchor || "end",
      angle: labelStyle.angle
    };
  },

  getScale(props, fallbackProps) {
    if (fallbackProps) {
      props = Helpers.modifyProps(props, fallbackProps);
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

    return scale;
  },

  getCalculatedValues(props) {
    let dataset = Data.getData(props);

    if (Data.getData(props).length < 2) {
      Log.warn("VictoryLine needs at least two data points to render properly.");
      dataset = [];
    }
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const dataSegments = this.getDataSegments(dataset);
    const scale = this.getScale(props);
    const voronoi = this.getVoronoi(range, scale);
    const polygons = voronoi.polygons(dataset);
    return { dataset, dataSegments, scale, polygons };
  },

  getVoronoi(range, scale) {
    const minRange = [Math.min(...range.x), Math.min(...range.y)];
    const maxRange = [Math.max(...range.x), Math.max(...range.y)];
    return d3Voronoi()
      .x((d) => scale.x(d.x1 || d.x))
      .y((d) => scale.y(d.y1 || d.y))
      .extent([minRange, maxRange]);
  },

  getLabelText(props, datum, index) {
    return datum.label || (Array.isArray(props.labels) ?
      props.labels[index] : Helpers.evaluateProp(props.labels, datum));
  },

  getLabelStyle(labelStyle, dataStyle) {
    // match labels styles to data style by default (fill, opacity, others?)
    const opacity = dataStyle.opacity;
    // match label color to data color if it is not given.
    // use fill instead of stroke for text
    const fill = dataStyle.stroke;
    const padding = labelStyle.padding || 0;
    return defaults({}, labelStyle, {opacity, fill, padding});
  },

  getDataSegments(dataset) {
    const orderedData = sortBy(dataset, "x");
    const segments = [];
    let segmentStartIndex = 0;
    let segmentIndex = 0;
    for (let index = 0, len = orderedData.length; index < len; index++) {
      const datum = orderedData[index];
      if (datum.y === null || typeof datum.y === "undefined") {
        segments[segmentIndex] = orderedData.slice(segmentStartIndex, index);
        segmentIndex++;
        segmentStartIndex = index + 1;
      }
    }
    segments[segmentIndex] = orderedData.slice(segmentStartIndex, orderedData.length);
    return segments.filter((segment) => {
      return Array.isArray(segment) && segment.length > 0;
    });
  }
};
