import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale, Collection } from "../../victory-core/src";
import * as d3Array from "d3-array";

const getBarPosition = (props, datum) => {
  console.log(datum);
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
  const _y0 = datum._y0 !== undefined ? datum._y0 : getDefaultMin("y");
  const _x0 = datum._x0 !== undefined ? datum._x0 : getDefaultMin("x");

  return Helpers.scalePoint(props, assign({}, datum, { _y0, _x0 }));
};

const getData = (props) => {
  const { bins, data } = props;
  const xAccesssor = Helpers.createAccessor(props.x || "x");
  const bin1 = d3Array.bin().value(xAccesssor);

  if (bins) {
    bin1.thresholds(bins);
  }

  const binnedData = bin1(data);

  const formattedData = binnedData.map((bin) => ({
    x: bin.x0,
    end: bin.x1,
    y: bin.length
  }));

  return Data.getData({ ...props, data: formattedData });
};

const getDomain = (props, axis) => {
  const data = getData(props);

  return Domain.getDomainWithZero({ ...props, data }, axis);
};

const getCalculatedValues = (props) => {
  const { theme } = props;
  const defaultStyles =
    theme && theme.histogram && theme.histogram.style ? theme.histogram.style : {};
  const style = Helpers.getStyles(props.style, defaultStyles);

  const data = Data.getData(props);

  const range = props.range || {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };

  const domain = props.domain || {
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

  return { style, data, scale, domain };
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "histogram");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));

  const {
    alignment,
    cornerRadius,
    domain,
    events,
    height,
    horizontal,
    padding,
    scale,
    sharedEvents,
    standalone,
    style,
    theme,
    width,
    labels,
    name,
    barOffset,
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
      padding,
      style: style.parent
    }
  };

  const data = getData(props);

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;

    const { x, y, y0, x0 } = getBarPosition(props, datum);

    const dataProps = {
      alignment,
      cornerRadius,
      data,
      datum,
      horizontal,
      index,
      scale,
      style: style.data,
      width,
      height,
      x,
      y,
      y0,
      x0,
      barOffset,
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

export { getData, getDomain, getBaseProps };
