import { assign, defaults, isFunction, omit } from "lodash";
import d3Shape from "d3-shape";

import { Helpers, Events, Style } from "victory-core";

export default {
  checkForValidText(text) {
    if (text === undefined || text === null) {
      return text;
    } else {
      return `${text}`;
    }
  },

  getSliceStyle(datum, index, calculatedValues) {
    const { style, colors } = calculatedValues;
    const fill = this.getColor(style, colors, index);
    const dataStyles = omit(datum, ["x", "y", "label"]);
    const sliceStyle = defaults({}, {fill}, style.data, dataStyles);
    return Helpers.evaluateStyle(sliceStyle, datum);
  },

  getBaseProps(props, fallbackProps) {
    const calculatedValues = this.getCalculatedValues(props, fallbackProps);
    const { slices, style, pathFunction, labelPosition } = calculatedValues;
    const { width, height } = props;
    const childProps = { parent: {slices, pathFunction, width, height, style: style.parent} };
    for (let index = 0, len = slices.length; index < len; index++) {
      const slice = slices[index];
      const datum = slice.data;
      const eventKey = datum.eventKey || index;
      const dataProps = {
        index,
        slice,
        pathFunction,
        style: this.getSliceStyle(datum, index, calculatedValues),
        datum
      };

      const text = this.getLabelText(props, datum, index);
      const position = labelPosition.centroid(slice);
      const labelStyle = Helpers.evaluateStyle(
        assign({padding: 0}, style.labels),
        dataProps.datum
      );

      const labelProps = {
        style: labelStyle,
        x: position[0],
        y: position[1],
        slice,
        text: this.checkForValidText(text),
        index,
        datum: dataProps.datum,
        textAnchor: labelStyle.textAnchor || "start",
        verticalAnchor: labelStyle.verticalAnchor || "middle",
        angle: labelStyle.angle
      };
      childProps[eventKey] = {
        data: dataProps,
        labels: labelProps
      };
    }
    return childProps;
  },

  getCalculatedValues(props, fallbackProps) {
    const theme = props.theme && props.theme.pie;
    const styleObject = theme ? props.theme.pie.style
    : fallbackProps.style;
    const style = Helpers.getStyles(props.style, styleObject, "auto", "100%");
    const getColorScale = () => {
      return theme ? theme.props.colorScale : fallbackProps.colorScale;
    };
    const colorScale = props.colorScale || getColorScale();
    const colors = Array.isArray(colorScale) ?
    colorScale : Style.getColorScale(colorScale);
    const padding = Helpers.getPadding(props);
    const radius = this.getRadius(props, padding);
    const data = Events.addEventKeys(props, Helpers.getData(props));
    const labelPosition = this.getLabelPosition(props, style, radius);
    const layoutFunction = this.getSliceFunction(props);
    const slices = layoutFunction(data);
    const pathFunction = d3Shape.arc()
      .cornerRadius(props.cornerRadius)
      .outerRadius(radius)
      .innerRadius(props.innerRadius);
    return {style, colors, padding, radius, data, slices, labelPosition, pathFunction};
  },

  getColor(style, colors, index) {
    if (style && style.data && style.data.fill) {
      return style.data.fill;
    }
    return colors[index % colors.length];
  },

  getRadius(props, padding) {
    return Math.min(
      props.width - padding.left - padding.right,
      props.height - padding.top - padding.bottom
    ) / 2;
  },

  getLabelPosition(props, style, radius) {
    // TODO: better label positioning
    const innerRadius = props.innerRadius ?
    props.innerRadius + style.labels.padding :
      style.labels.padding;
    return d3Shape.arc()
      .outerRadius(radius)
      .innerRadius(innerRadius);
  },

  getLabelText(props, datum, index) {
    if (datum.label) {
      return datum.label;
    } else if (Array.isArray(props.labels)) {
      return props.labels[index];
    }
    return isFunction(props.labels) ? props.labels(datum) : datum.xName || datum.x;
  },

  getSliceFunction(props) {
    const degreesToRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    return d3Shape.pie()
      .sort(null)
      .startAngle(degreesToRadians(props.startAngle))
      .endAngle(degreesToRadians(props.endAngle))
      .padAngle(degreesToRadians(props.padAngle))
      .value((datum) => { return datum.y; });
  }
};
