import { assign } from "lodash";
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
    x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
    y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
  };
  const origin = props.polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
  const defaultStyles = props.theme && props.theme.line && props.theme.line.style ?
    props.theme.line.style : {};
  const style = Helpers.getStyles(props.style, defaultStyles);

  return { domain, data, scale, style, origin };
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "line");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    data, domain, events, groupComponent, height, interpolation, origin, padding, polar,
    scale, sharedEvents, standalone, style, theme, width, labels
  } = props;
  const initialChildProps = {
    parent: {
      style: style.parent, scale, data, height, width, domain, standalone, polar, origin, padding
    },
    all: { data:
      { polar, origin, scale, data, interpolation, groupComponent, theme, style: style.data }
    }
  };
  return data.reduce((childProps, datum, index) => {
    const text = LabelHelpers.getText(props, datum, index);
    if (text !== undefined && text !== null || (labels && (events || sharedEvents))) {
      const eventKey = datum.eventKey || index;
      childProps[eventKey] = { labels: LabelHelpers.getProps(props, index) };
    }
    return childProps;
  }, initialChildProps);
};

export { getBaseProps };
