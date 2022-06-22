import { assign, isNil } from "lodash";
import {
  Helpers,
  LabelHelpers,
  Data,
  Domain,
  Scale,
  Collection,
} from "victory-core";

export const getDataWithBaseline = (props, scale) => {
  let data = Data.getData(props);
  if (data.length < 2) {
    data = [];
  }
  const getDefaultMin = (axis) => {
    const defaultZero =
      Scale.getType(scale[axis]) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;
    const domain = scale[axis].domain();
    const minY = Collection.getMinValue(domain);
    const maxY = Collection.getMaxValue(domain);
    let defaultMin: typeof minY = defaultZero;
    if (minY < 0 && maxY <= 0) {
      defaultMin = maxY;
    } else if (minY >= 0 && maxY > 0) {
      defaultMin = minY;
    }
    return Collection.containsDates(domain) ? new Date(defaultMin) : defaultMin;
  };

  return data.map((datum) => {
    const _y1 = datum._y1 !== undefined ? datum._y1 : datum._y;
    const _y0 = datum._y0 !== undefined ? datum._y0 : getDefaultMin("y");
    const _x1 = datum._x1 !== undefined ? datum._x1 : datum._x;
    const _x0 = datum._x0 !== undefined ? datum._x0 : getDefaultMin("x");
    return assign({}, datum, { _y0, _y1, _x0, _x1 });
  });
};

const getCalculatedValues = (props) => {
  const { polar } = props;
  const defaultStyles = Helpers.getDefaultStyles(props, "area");
  const style = Helpers.getStyles(props.style, defaultStyles);
  const range = {
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
  const data = getDataWithBaseline(props, scale);
  return { style, data, scale, domain, origin };
};

export const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "area");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    data,
    domain,
    events,
    groupComponent,
    height,
    horizontal,
    interpolation,
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
    disableInlineStyles,
  } = props;
  const initialChildProps = {
    parent: {
      style: style.parent,
      width,
      height,
      scale,
      data,
      domain,
      standalone,
      theme,
      polar,
      origin,
      padding,
      name,
      horizontal,
    },
    all: {
      data: {
        horizontal,
        polar,
        origin,
        scale,
        data,
        interpolation,
        groupComponent,
        style: disableInlineStyles ? {} : style.data,
        disableInlineStyles,
      },
    },
  };
  return data.reduce((childProps, datum, index) => {
    const text = LabelHelpers.getText(props, datum, index);
    if (
      (text !== undefined && text !== null) ||
      (labels && (events || sharedEvents))
    ) {
      const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;
      childProps[eventKey] = { labels: LabelHelpers.getProps(props, index) };
    }
    return childProps;
  }, initialChildProps);
};
