import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "victory-core";

const getBarPosition = (props, datum) => {
  const getDefaultMin = (axis) => {
    // const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
    const currentAxis = axis;
    const defaultMin = Scale.getType(props.scale[currentAxis]) === "log"
      ? 1 / Number.MAX_SAFE_INTEGER
      : 0;
    return datum[`_${axis}`] instanceof Date ? new Date(defaultMin) : defaultMin;
  };
  const _y0 = datum._y0 !== undefined ? datum._y0 : getDefaultMin("y");
  const _x0 = datum._x0 !== undefined ? datum._x0 : getDefaultMin("x");
  return Helpers.scalePoint(props, assign({}, datum, { _y0, _x0 }));
};

const getCalculatedValues = (props) => {
  const { theme, polar } = props;
  const defaultStyles = theme && theme.bar && theme.bar.style ? theme.bar.style : {};
  const style = Helpers.getStyles(props.style, defaultStyles);
  const data = Data.getData(props);
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const domain = {
    x: Domain.getDomainWithZero(props, "x"),
    y: Domain.getDomainWithZero(props, "y")
  };
  const scale = {
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(props.horizontal ? range.x: range.y)
  };
  const origin = polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
  return { style, data, scale, domain, origin };
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "bar");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    alignment,
    barRatio,
    cornerRadius,
    data,
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
    getPath
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
      style: style.parent
    }
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;
    const { x, y, y0, x0 } = getBarPosition(props, datum);
    const dataProps = {
      alignment,
      barRatio,
      cornerRadius,
      data,
      datum,
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
      barWidth,
      getPath
    };

    childProps[eventKey] = {
      data: dataProps
    };

    const text = LabelHelpers.getText(props, datum, index);
    if ((text !== undefined && text !== null) || (labels && (events || sharedEvents))) {
      childProps[eventKey].labels = LabelHelpers.getProps(props, index);
    }
    return childProps;
  }, initialChildProps);
};

export { getBaseProps };
