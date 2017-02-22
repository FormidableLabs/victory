import { defaults, last } from "lodash";
import { Helpers, Log, Data, Domain, Scale } from "victory-core";

export default {

  getBaseProps(props, fallbackProps) {
    props = Helpers.modifyProps(props, fallbackProps, "line");
    const defaultStyles = props.theme && props.theme.line && props.theme.line.style ?
      props.theme.line.style : {};
    const calculatedValues = this.getCalculatedValues(props);
    const { scale, dataset, dataSegments, domain } = calculatedValues;
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const {interpolation, label, width, height, events, sharedEvents, standalone} = props;
    const initialChildProps = { parent: {
      style: style.parent, scale, data: dataset, height, width, domain, standalone
    }};

    return dataSegments.reduce((childProps, dataSegment, index) => {
      const dataProps = {
        scale,
        interpolation,
        style: style.data,
        data: dataSegment
      };
      const text = index === dataSegments.length - 1 ? label : undefined;
      const addLabels = (text !== undefined && text !== null) || events || sharedEvents;
      const labelProps = addLabels ?
        this.getLabelProps(dataProps, text, calculatedValues, style) : undefined;

      childProps[index] = { data: dataProps, labels: labelProps };

      return childProps;
    }, initialChildProps);
  },

  getLabelProps(dataProps, text, calculatedValues, style) { // eslint-disable-line max-params
    const { dataSegments, dataset, scale } = calculatedValues;
    const { style: dataStyle } = dataProps;
    const lastData = last(last(dataSegments));
    const labelStyle = this.getLabelStyle(style.labels, dataStyle);

    return {
      x: lastData ? scale.x(lastData._x1 || lastData._x) + (labelStyle.padding || 0) : 0,
      y: lastData ? scale.y(lastData._y1 || lastData._y) : 0,
      style: labelStyle,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "middle",
      angle: labelStyle.angle,
      data: dataset,
      scale,
      text
    };
  },

  getCalculatedValues(props) {
    let dataset = Data.getData(props);

    if (dataset.length < 2) {
      Log.warn("VictoryLine needs at least two data points to render properly.");
      dataset = [];
    }

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

    return { domain, dataset, dataSegments, scale };
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
    const segments = [];
    let segmentStartIndex = 0;
    let segmentIndex = 0;
    for (let index = 0, len = dataset.length; index < len; index++) {
      const datum = dataset[index];
      if (datum._y === null || typeof datum._y === "undefined") {
        segments[segmentIndex] = dataset.slice(segmentStartIndex, index);
        segmentIndex++;
        segmentStartIndex = index + 1;
      }
    }
    segments[segmentIndex] = dataset.slice(segmentStartIndex, dataset.length);
    return segments.filter((segment) => {
      return Array.isArray(segment) && segment.length > 0;
    });
  }
};
