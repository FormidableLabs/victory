import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "../../victory-core/src";
import { getBarPosition } from "../../victory-bar/src/helper-methods";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";

const getData = (props) => {
  const { bins, data } = props;
  const xAccessor = Helpers.createAccessor(props.x || "x");
  const bin = d3Array.bin().value(xAccessor);

  const scale = d3Scale
    .scaleLinear()
    .domain(d3Array.extent(data, xAccessor))
    .nice();

  bin.domain(scale.domain());

  if (bins) {
    bin.thresholds(bins);
  }

  const binnedData = bin(data).filter(({ x0, x1 }) => x0 !== x1);
  const formattedData = binnedData.map((bin) => ({
    x: bin.x0,
    end: bin.x1,
    y: bin.length
  }));

  return Data.getData({ ...props, data: formattedData });
};

const getDomain = (props, axis) => {
  const data = getData(props);

  if (!data.length) {
    return [0, 0];
  }

  if (axis === "x") {
    const firstBin = data[0];
    const lastBin = data[data.length - 1];

    return [firstBin.x, lastBin.end];
  }

  return Domain.getDomainWithZero({ ...props, data }, "y");
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
    x: getDomain(props, "x"),
    y: getDomain(props, "y")
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
  const data = getData(props);

  const {
    barSpacing,
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

  const getDistance = (datum) => {
    const current = scale.x(datum.x);
    const next = scale.x(datum.end);

    return Math.abs(next - current);
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;

    const { x, y, y0, x0 } = getBarPosition(props, datum);

    const barWidth = (() => {
      if (barSpacing) {
        return getDistance(datum) - barSpacing;
      }

      return getDistance(datum);
    })();

    const barOffset = (() => {
      if (barSpacing) {
        const distance = barSpacing / 2;
        return [distance, 0];
      }

      return [0, 0];
    })();

    const dataProps = {
      alignment: "start",
      barWidth,
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
