import { sortBy, defaults, last } from "lodash";
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
    const {scale, dataset} = calculatedValues;
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

    const text = Helpers.evaluateProp(label, dataset);
    if (text !== undefined || props.events || props.sharedEvents) {
      baseProps.all.labels = this.getLabelProps(dataProps, text, calculatedValues, style);
    }

    return baseProps;
  },

  getLabelProps(dataProps, text, calculatedValues, style) { // eslint-disable-line max-params
    const { dataSegments, dataset, scale } = calculatedValues;
    const { style: dataStyle } = dataProps;
    const lastData = last(last(dataSegments));
    const baseLabelStyle = Helpers.evaluateStyle(style.labels, dataset) || {};
    const labelStyle = this.getLabelStyle(baseLabelStyle, dataStyle);

    return {
      x: lastData ? scale.x(lastData.x1 || lastData.x) + (labelStyle.padding || 0) : 0,
      y: lastData ? scale.y(lastData.y1 || lastData.y) : 0,
      style: labelStyle,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "middle",
      angle: labelStyle.angle,
      scale,
      text
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

    const dataSegments = this.getDataSegments(dataset);
    const scale = this.getScale(props);

    return { dataset, dataSegments, scale };
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

  getDataSegments(dataset, sortKey = "x") {
    const orderedData = sortBy(dataset, sortKey);
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
