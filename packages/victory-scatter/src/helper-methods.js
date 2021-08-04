import { assign, values, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "victory-core";

export const getSymbol = (data, props) => {
  if (props.bubbleProperty) {
    return "circle";
  }
  return data.symbol || props.symbol;
};

export const getBubbleSize = (datum, props) => {
  const { data, z, maxBubbleSize, minBubbleSize } = props;
  const zData = data.map((point) => point[z]);
  const zMin = Math.min(...zData);
  const zMax = Math.max(...zData);
  const getMaxRadius = () => {
    const minPadding = Math.min(...values(Helpers.getPadding(props)));
    return Math.max(minPadding, 5); // eslint-disable-line no-magic-numbers
  };
  const maxRadius = maxBubbleSize || getMaxRadius();
  const minRadius = minBubbleSize || maxRadius * 0.1; // eslint-disable-line no-magic-numbers
  if (zMax === zMin) {
    return Math.max(minRadius, 1);
  }
  const maxArea = Math.PI * Math.pow(maxRadius, 2);
  const minArea = Math.PI * Math.pow(minRadius, 2);
  const pointArea = ((datum[z] - zMin) / (zMax - zMin)) * maxArea;
  const area = Math.max(pointArea, minArea);
  const radius = Math.sqrt(area / Math.PI);
  return Math.max(radius, 1);
};

export const getSize = (datum, props) => {
  const { size, z } = props;
  if (datum.size) {
    return typeof datum.size === "function"
      ? datum.size
      : Math.max(datum.size, 1);
  } else if (typeof props.size === "function") {
    return size;
  } else if (datum[z]) {
    return getBubbleSize(datum, props);
  } else {
    return Math.max(size || 0, 1);
  }
};

const getCalculatedValues = (props) => {
  const defaultStyles = Helpers.getDefaultStyles(props, "scatter");
  const style = Helpers.getStyles(props.style, defaultStyles);
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const domain = {
    x: Domain.getDomain(props, "x"),
    y: Domain.getDomain(props, "y")
  };
  const scale = {
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(props.horizontal ? range.x : range.y)
  };
  const origin = props.polar
    ? props.origin || Helpers.getPolarOrigin(props)
    : undefined;
  const z = props.bubbleProperty || "z";

  let data = Data.getData(props);
  data = Data.formatDataFromDomain(data, domain);

  return { domain, data, scale, style, origin, z };
};

export const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "scatter");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    data,
    domain,
    events,
    height,
    origin,
    padding,
    polar,
    scale,
    name,
    sharedEvents,
    standalone,
    style,
    theme,
    width,
    labels,
    horizontal,
    disableInlineStyles
  } = props;
  const initialChildProps = {
    parent: {
      style: style.parent,
      scale,
      domain,
      data,
      height,
      width,
      standalone,
      theme,
      origin,
      polar,
      padding,
      name,
      horizontal
    }
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;
    const { x, y } = Helpers.scalePoint(props, datum);
    const dataProps = {
      x,
      y,
      datum,
      data,
      index,
      scale,
      polar,
      origin,
      horizontal,
      size: getSize(datum, props),
      symbol: getSymbol(datum, props),
      style: disableInlineStyles ? {} : style.data,
      disableInlineStyles
    };

    childProps[eventKey] = { data: dataProps };
    const text = LabelHelpers.getText(props, datum, index);
    if (
      (text !== undefined && text !== null) ||
      (labels && (events || sharedEvents))
    ) {
      childProps[eventKey].labels = LabelHelpers.getProps(props, index);
    }

    return childProps;
  }, initialChildProps);
};
