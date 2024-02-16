// victory-vendor note: This module is still CommonJS, so not part of victory-vendor.
import { voronoi as d3Voronoi } from "d3-voronoi";
import { Helpers, LabelHelpers, Scale, Domain, Data } from "victory-core";

// Re-export for tests
export { d3Voronoi as _internalD3Voronoi };

const getVoronoi = (props, range, scale) => {
  const minRange = [Math.min(...range.x), Math.min(...range.y)];
  const maxRange = [Math.max(...range.x), Math.max(...range.y)];
  const angleAccessor = (d) => {
    const x = scale.x(d._x1 !== undefined ? d._x1 : d._x);
    return -1 * x + Math.PI / 2;
  };
  const xAccessor = (d) => {
    return props.horizontal
      ? scale.y(d._y1 !== undefined ? d._y1 : d._y)
      : scale.x(d._x1 !== undefined ? d._x1 : d._x);
  };
  const yAccessor = (d) => {
    return props.horizontal
      ? scale.x(d._x1 !== undefined ? d._x1 : d._x)
      : scale.y(d._y1 !== undefined ? d._y1 : d._y);
  };
  return d3Voronoi()
    .x((d) => (props.polar ? angleAccessor(d) : xAccessor(d)))
    .y((d) => yAccessor(d))
    .extent([minRange, maxRange]);
};

const getCalculatedValues = (props) => {
  const defaultStyles =
    props.theme && props.theme.voronoi && props.theme.voronoi.style
      ? props.theme.voronoi.style
      : {};
  const style = Helpers.getStyles(props.style, defaultStyles);
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y"),
  };
  const domain = {
    x: Domain.getDomain(props, "x"),
    y: Domain.getDomain(props, "y"),
  };
  const scale = {
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(props.horizontal ? range.x : range.y),
  };

  let data = Data.getData(props);
  data = Data.formatDataFromDomain(data, domain);
  // Manually remove data with null _x or _y values.
  // Otherwise, we hit null error in: d3-voronoi/src/Cell.js
  data = data.filter((datum) => {
    if (datum._x === null) {
      return false;
    }
    if (datum._y === null) {
      return false;
    }

    return true;
  });

  const voronoi = getVoronoi(props, range, scale);
  const polygons = voronoi.polygons(data);
  const origin = props.polar
    ? props.origin || Helpers.getPolarOrigin(props)
    : undefined;
  return { domain, data, scale, style, polygons, origin };
};

export const getBaseProps = (initialProps, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(
    initialProps,
    fallbackProps,
    "scatter",
  );
  const props = Object.assign(
    {},
    modifiedProps,
    getCalculatedValues(modifiedProps),
  );
  const {
    data,
    domain,
    events,
    height,
    origin,
    padding,
    polar,
    polygons,
    scale,
    sharedEvents,
    standalone,
    style,
    theme,
    width,
    labels,
    name,
  } = props;
  const initialChildProps = {
    parent: {
      style: style.parent,
      scale,
      domain,
      data,
      standalone,
      height,
      width,
      theme,
      origin,
      polar,
      padding,
      name,
    },
  };

  return data.reduce((childProps, datum, index) => {
    const polygon = polygons[index]?.filter((value) => value !== "data");
    const eventKey = !Helpers.isNil(datum.eventKey) ? datum.eventKey : index;
    const { x, y } = Helpers.scalePoint(props, datum);
    const dataProps = {
      x,
      y,
      datum,
      data,
      index,
      scale,
      polygon,
      origin,
      size: props.size,
      style: style.data,
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
