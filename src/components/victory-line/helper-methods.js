import { sortBy, defaults, last } from "lodash";
import { Helpers, Log } from "victory-core";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";

export default {

  getBaseProps(props, fallbackProps) {
    const defaultStyles = props.theme && props.theme.line ? props.theme.line : fallbackProps.style;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps);
    const {scale, dataSegments, dataset} = this.getCalculatedValues(modifiedProps);
    const style = Helpers.getStyles(modifiedProps.style, defaultStyles, "auto", "100%");
    const {interpolation, label, width, height} = modifiedProps;
    const dataStyle = Helpers.evaluateStyle(style.data, dataset);
    const dataProps = {
      scale,
      interpolation: Helpers.evaluateProp(interpolation, dataset),
      style: dataStyle
    };

    const text = Helpers.evaluateProp(label, dataset);
    const lastData = last(last(dataSegments));
    const baseLabelStyle = Helpers.evaluateStyle(style.labels, dataset);
    const labelStyle = this.getLabelStyle(baseLabelStyle, dataStyle);

    const labelProps = {
      x: lastData ? scale.x(lastData.x) + labelStyle.padding : 0,
      y: lastData ? scale.y(lastData.y) : 0,
      style: labelStyle,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "middle",
      angle: labelStyle.angle,
      scale,
      text
    };

    const parentProps = { style: style.parent, scale, data: dataset, width, height};
    return {
      parent: parentProps,
      all: {
        data: dataProps,
        labels: labelProps
      }
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
