import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "victory-core";

const getCalculatedValues = (props) => {
  let data = Data.getData(props);

  if (data.length < 2) {
    data = [];
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
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(props.horizontal ? range.x : range.y)
  };
  const origin = props.polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
  const defaultStyles =
    props.theme && props.theme.line && props.theme.line.style ? props.theme.line.style : {};
  const style = Helpers.getStyles(props.style, defaultStyles);

  return { domain, data, scale, style, origin };
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "line");
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
    name
  } = props;
  const initialChildProps = {
    parent: {
      style: style.parent,
      scale,
      data,
      height,
      width,
      name,
      domain,
      standalone,
      polar,
      origin,
      padding,
      horizontal
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
        theme,
        style: style.data
      }
    }
  };
  return data.reduce((childProps, datum, index) => {
    const text = LabelHelpers.getText(props, datum, index);
    if ((text !== undefined && text !== null) || (labels && (events || sharedEvents))) {
      const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;
      childProps[eventKey] = { labels: LabelHelpers.getProps(props, index) };
    }
    return childProps;
  }, initialChildProps);
};

export { getBaseProps };
