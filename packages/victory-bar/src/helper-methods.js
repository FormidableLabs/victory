import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale, Collection } from "victory-core";

const getBarPosition = (props, datum) => {
  const getDefaultMin = (axis) => {
    const defaultZero =
      Scale.getType(props.scale[axis]) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;
    let defaultMin = defaultZero;
    const minY = Collection.getMinValue(props.domain[axis]);
    const maxY = Collection.getMaxValue(props.domain[axis]);

    if (minY < 0 && maxY <= 0) {
      defaultMin = maxY;
    } else if (minY >= 0 && maxY > 0) {
      defaultMin = minY;
    }

    return datum[`_${axis}`] instanceof Date ? new Date(defaultMin) : defaultMin;
  };

  const defaultMinY = getDefaultMin("y");
  const defaultMinX = getDefaultMin("x");

  let _y0 = datum._y0 !== undefined ? datum._y0 : defaultMinY;
  let _x0 = datum._x0 !== undefined ? datum._x0 : defaultMinX;

  // if minY or minX (minDomain) is greater than the x/y position in the data,
  // set x/y to the minX/minY, so it doesn't go outside the bounds of the chart
  if (defaultMinY > datum._y) datum._y = defaultMinY;
  if (defaultMinY > _y0) _y0 = defaultMinY;
  if (defaultMinY > datum._y1) datum._y1 = defaultMinY;

  if (defaultMinX > datum._x) datum._x = Scale.getType(props.scale.x) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;
  if (defaultMinX > _x0) _x0 = Scale.getType(props.scale.x) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;

  return Helpers.scalePoint(props, assign({}, datum, { _y0, _x0 }));
};

const getCalculatedValues = (props) => {
  const { polar } = props;
  const defaultStyles = Helpers.getDefaultStyles(props, "bar");
  const style = Helpers.getStyles(props.style, defaultStyles);
  const data = Data.getData(props); // Data.getData needs to be called to format the data (we may be able to do this in a wrapper component)
  const range = props.range || {
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
      .range(props.horizontal ? range.x : range.y)
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
      barWidth,
      cornerRadius,
      data,
      datum,
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
      x0
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

export { getBaseProps, getBarPosition };
