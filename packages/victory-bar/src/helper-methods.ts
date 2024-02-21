import {
  Collection,
  Data,
  Domain,
  Helpers,
  LabelHelpers,
  Scale,
} from "victory-core";

export const getBarPosition = (props, datum) => {
  const getDefaultMin = (axis) => {
    const defaultZero =
      Scale.getType(props.scale[axis]) === "log"
        ? 1 / Number.MAX_SAFE_INTEGER
        : 0;
    let defaultMin = defaultZero;
    const minY = Collection.getMinValue(props.domain[axis]) as number;
    const maxY = Collection.getMaxValue(props.domain[axis]) as number;

    if (minY < 0 && maxY <= 0) {
      defaultMin = maxY;
    } else if (minY >= 0 && maxY > 0) {
      defaultMin = minY;
    }

    return datum[`_${axis}`] instanceof Date
      ? new Date(defaultMin)
      : defaultMin;
  };
  const _y0 = datum._y0 !== undefined ? datum._y0 : getDefaultMin("y");
  const _x0 = datum._x0 !== undefined ? datum._x0 : getDefaultMin("x");
  return Helpers.scalePoint(props, Object.assign({}, datum, { _y0, _x0 }));
};

const getCalculatedValues = (props) => {
  const { polar } = props;
  const defaultStyles = Helpers.getDefaultStyles(props, "bar");
  const style = !props.disableInlineStyles
    ? Helpers.getStyles(props.style, defaultStyles)
    : {};
  const range = props.range || {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y"),
  };
  const domain = {
    x: Domain.getDomainWithZero(props, "x"),
    y: Domain.getDomainWithZero(props, "y"),
  };
  const scale = {
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(props.horizontal ? range.x : range.y),
  };
  const origin = polar
    ? props.origin || Helpers.getPolarOrigin(props)
    : undefined;

  let data = Data.getData(props);
  data = Data.formatDataFromDomain(data, domain, 0);

  return { style, data, scale, domain, origin };
};

export const getBaseProps = (initialProps, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(initialProps, fallbackProps, "bar");
  const props = Object.assign(
    {},
    modifiedProps,
    getCalculatedValues(modifiedProps),
  );
  const {
    alignment,
    barRatio,
    cornerRadius,
    data,
    disableInlineStyles,
    domain,
    events,
    height,
    horizontal,
    origin,
    padding,
    polar,
    scale,
    sharedEvents,
    standalone,
    style,
    theme,
    width,
    labels,
    name,
    barWidth,
    getPath,
  } = props;
  const initialChildProps = {
    parent: {
      horizontal,
      domain,
      scale,
      width,
      height,
      data,
      standalone,
      name,
      theme,
      polar,
      origin,
      padding,
      style: style.parent,
    },
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !Helpers.isNil(datum.eventKey) ? datum.eventKey : index;
    const { x, y, y0, x0 } = getBarPosition(props, datum);

    const dataProps = {
      alignment,
      barRatio,
      barWidth,
      cornerRadius,
      data,
      datum,
      disableInlineStyles,
      getPath,
      horizontal,
      index,
      polar,
      origin,
      scale,
      style: style.data,
      width,
      height,
      x,
      y,
      y0,
      x0,
    };

    childProps[eventKey] = {
      data: dataProps,
    };

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
