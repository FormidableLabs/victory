import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import { voronoi as d3Voronoi } from "d3-voronoi";
import { without } from "lodash";

export const calculateD3Path = (props, pathType, index) => {
  // eslint-disable-line max-statements
  const { width, height, padding, scale, interpolation, data, domain } = props;
  const scaleType = scale
    ? `scale${scale[0].toUpperCase() + scale.slice(1)}`
    : "scaleLinear";
  const curveType =
    typeof interpolation === "string"
      ? `curve${interpolation[0].toUpperCase() + interpolation.slice(1)}`
      : undefined;
  const curveFunction =
    typeof interpolation === "function" ? interpolation : d3Shape[curveType];

  const dataDomain = data.reduce(
    (prev, datum) => {
      if (datum.x < prev.x[0]) {
        prev.x[0] = datum.x;
      } else if (datum.x > prev.x[1]) {
        prev.x[1] = datum.x;
      }

      if (datum.y < prev.y[0]) {
        prev.y[0] = datum.y;
      } else if (datum.y > prev.y[1]) {
        prev.y[1] = datum.y;
      }

      return prev;
    },
    { x: [0, 0], y: [0, 0] }
  );

  const range = {
    x: [padding, width - padding],
    y: [height - padding, padding]
  };

  const scaleX = d3Scale[scaleType]()
    .domain((domain && domain.x) || dataDomain.x)
    .range(range.x);
  const scaleY = d3Scale[scaleType]()
    .domain((domain && domain.y) || dataDomain.y)
    .range(range.y);

  switch (pathType) {
    case "line": {
      return d3Shape
        .line()
        .curve(curveFunction)
        .x((d) => scaleX(d.x))
        .y((d) => scaleY(d.y))(data);
    }
    case "area": {
      const modifiedData = props.data.map((datum) => {
        return { x: datum.x, y: datum.y, y1: datum.y, y0: datum.y0 };
      });
      return d3Shape
        .area()
        .curve(curveFunction)
        .x((d) => scaleX(d.x))
        .y1((d) => scaleY(d.y1))
        .y0((d) => scaleY(d.y0))(modifiedData);
    }
    case "voronoi": {
      const minRange = [Math.min(...range.x), Math.min(...range.y)];
      const maxRange = [Math.max(...range.x), Math.max(...range.y)];
      const voronoi = d3Voronoi()
        .x((d) => scaleX(d.x))
        .y((d) => scaleY(d.y))
        .extent([minRange, maxRange]);
      const polygons = voronoi.polygons(data);
      const polygon = without(polygons[index], "data");
      return `M ${polygon.join("L")} Z`;
    }
  }

  return undefined;
};
