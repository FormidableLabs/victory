import { sortBy, defaults, last } from "lodash";
import { Helpers } from "victory-core";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";

export default {

  getBaseProps(props, defaultStyles, defaultWidthHeight) {
    defaultStyles = props.theme && props.theme.line ? props.theme.line : defaultStyles;
    props = Object.assign({}, props, this.getWidthHeight(props, defaultWidthHeight));
    const {scale, dataSegments, dataset} = this.getCalculatedValues(props);
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const {interpolation, label} = props;
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
      x: scale.x(lastData.x) + labelStyle.padding,
      y: scale.y(lastData.y),
      style: labelStyle,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "middle",
      angle: labelStyle.angle,
      scale,
      text
    };
    return {
      all: {
        data: dataProps,
        labels: labelProps
      }
    };
  },

  getCalculatedValues(props) {
    const dataset = Data.getData(props);
    const dataSegments = this.getDataSegments(dataset);
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
    orderedData.forEach((datum, index) => {
      if (datum.y === null || typeof datum.y === "undefined") {
        segments.push(orderedData.slice(segmentStartIndex, index));
        segmentStartIndex = index + 1;
      }
    });
    segments.push(orderedData.slice(segmentStartIndex, orderedData.length));
    return segments.filter((segment) => {
      return Array.isArray(segment) && segment.length > 0;
    });
  },

  getWidthHeight(props, defaultWidthHeight) {
    const width = props.theme && props.theme.props ?
    props.width || props.theme.props.width || defaultWidthHeight.width :
    props.width || defaultWidthHeight.width;
    const height = props.theme && props.theme.props ?
    props.height || props.theme.props.height || defaultWidthHeight.height :
    props.height || defaultWidthHeight.height;
    return { width, height };
  }
};
