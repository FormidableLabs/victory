import * as d3Shape from "d3-shape";
import * as d3Scale from "d3-scale";
import { voronoi as d3Voronoi } from "d3-voronoi";
import { assign, without, min, max, property } from "lodash";

const RECTANGULAR_SEQUENCE = ["M", "A", "L", "A", "L", "A", "L", "A", "z"];
const CIRCULAR_SEQUENCE = ["M", "m", "a", "a"];
const FLYOUT_SEQUENCE = ["M", "L", "L", "L", "A", "L", "A", "L", "A", "L", "A", "z"];

const parseSvgPathCommands = (commandStr) => {
  const matches = commandStr.match(
    /[MmLlHhVvCcSsQqTtAaZz]+[^MmLlHhVvCcSsQqTtAaZz]*/g
  );

  return matches.map((match) => {
    const name = match.charAt(0);
    const args = match.substring(1).split(",").map((arg) => {
      return parseFloat(arg, 10);
    });

    return {
      raw: match,
      name,
      args
    };
  });
};

const getPathCommandsFromWrapper = (wrapper) => {
  const commandStr = wrapper.find("path").prop("d");
  return parseSvgPathCommands(commandStr);
};

const exhibitsShapeSequence = (wrapper, shapeSequence) => {
  const commands = getPathCommandsFromWrapper(wrapper);
  return commands.every((command, index) => {
    return command.name === shapeSequence[index];
  });
};

const calculateD3Path = (props, pathType, index) => { // eslint-disable-line max-statements
  const { width, height, padding, scale, interpolation, data, domain } = props;
  const scaleType = scale ?
    `scale${scale[0].toUpperCase() + scale.slice(1)}` : "scaleLinear";
  const curveType = interpolation &&
    `curve${interpolation[0].toUpperCase() + interpolation.slice(1)}`;

  const dataDomain = data.reduce((prev, datum) => {
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
  }, { x: [0, 0], y: [0, 0] });

  const range = {
    x: [padding, width - padding],
    y: [height - padding, padding]
  };

  const scaleX = d3Scale[scaleType]()
    .domain(domain && domain.x || dataDomain.x)
    .range(range.x);
  const scaleY = d3Scale[scaleType]()
    .domain(domain && domain.y || dataDomain.y)
    .range(range.y);

  switch (pathType) {
  case "line": {
    return d3Shape.line()
      .curve(d3Shape[curveType])
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y))(data);
  }
  case "area": {
    const modifiedData = props.data.map((datum) => {
      return { x: datum.x, y: datum.y, y1: datum.y, y0: datum.y0 };
    });
    return d3Shape.area()
      .curve(d3Shape[curveType])
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

const expectations = {
  /**
   * Assert the wrapper renders a rectangular shape.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * `path` node.
   * @returns {undefined}
   */
  expectIsRectangular(wrapper) {
    const isBar = exhibitsShapeSequence(wrapper, RECTANGULAR_SEQUENCE);
    expect(isBar).to.equal(true);
  },

  /**
   * Assert the wrapper renders a circular shape.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {undefined}
   */
  expectIsCircular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, CIRCULAR_SEQUENCE)).to.equal(true);
  },

  /**
   * Assert the wrapper renders a line svg element.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * node.
   * @returns {undefined}
   */
  expectIsALine(wrapper) {
    expect(wrapper.find("line").is("line")).to.equal(true);
  },

  /**
   * Assert the wrapper renders the correct path.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * `path` node.
   * @param {Object} props - Props passed to the component.
   * @param {Number} props.width - The width of the svg.
   * @param {Number} props.height - The height of the svg.
   * @param {Number} props.padding - The padding of the svg.
   * @param {String} props.scale - The type of scale.
   * @param {String} props.interpolation - The type of curve.
   * @param {Array} props.data - The raw data for the chart.
   * @param {String} pathType - The type of path d3 should generate (e.g.
   * @param {Numner} index - Optional: the index of the data element in the data array
   * @returns {undefined}
   */
  expectCorrectD3Path(wrapper, props, pathType, index) { // eslint-disable-line max-params
    const path = wrapper.find("path").prop("d");
    expect(path).to.not.equal(undefined);
    expect(path).to.equal(calculateD3Path(props, pathType, index));
  },
  /**
   * Assert the wrapper renders a flyout shape.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {undefined}
   */
  expectIsFlyout(wrapper) {
    const commands = getPathCommandsFromWrapper(wrapper);
    expect(exhibitsShapeSequence(wrapper, FLYOUT_SEQUENCE, commands)).to.equal(true);
  }
};

const helpers = {
  /**
   * Retrieve the raw svg height of a bar.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * `path` node.
   * @returns {Number} The height of the bar in svg units.
   */
  getBarHeight(wrapper) {
    expectations.expectIsRectangular(wrapper);
    const commands = getPathCommandsFromWrapper(wrapper);
    return Math.abs(commands[0].args[1] - commands[2].args[1]);
  },

  /**
   * Assert the wrapper renders a 4-sided shape and return dimensions.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {Object}                 Dimensions of the shape
   */
  getBarShape(wrapper) {
    const commands = getPathCommandsFromWrapper(wrapper);

    const points = commands.filter((command) => { return command.name !== "z"; });
    const verticalPoints = points.map(property("args.1"));
    const horizontalPoints = points.map(property("args.0"));
    const height = max(verticalPoints) - min(verticalPoints);
    const width = max(horizontalPoints) - min(horizontalPoints);

    return {
      height,
      width
    };
  },
  /**
   * Retrieve the raw svg coordinates for the center of a point.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * `path` node.
   * @returns {Array} The x and y coordinates, respectively.
   */
  getSvgPointCoordinates(wrapper) {
    const commands = getPathCommandsFromWrapper(wrapper);
    return commands[0].args;
  },

  /**
   * Convert the raw svg coordinates to scaled Cartesian coordinates.
   *
   * @param {Array} coords - The x and y coordinates, respectively.
   * @param {Object} svgDimensions - The width, height, and padding of the svg.
   * @param {Number} svgDimensions.width - The width of the svg.
   * @param {Number} svgDimensions.height - The height of the svg.
   * @param {Number} svgDimensions.padding - The space between the edge of the
   *   svg and the chart area.
   * @param {Object} domain - The x and y domains.
   * @param {Array} domain.x - The lower and upper x bounds, respectively.
   * @param {Array} domain.y - The lower and upper y bounds, respectively.
   * @returns {Array} The Cartesian x and y coordinates, respectively.
   */
  convertSvgCoordinatesToCartesian(coords, svgDimensions, domain) {
    const { width, height, padding } = svgDimensions;

    const cartesianX = coords[0] - padding;
    const cartesianY = height - coords[1] - padding;

    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const scaledX = cartesianX / chartWidth * (domain.x[1] - domain.x[0]);
    const scaledY = cartesianY / chartHeight * (domain.y[1] - domain.y[0]);

    const shiftedX = scaledX + domain.x[0];
    const shiftedY = scaledY + domain.y[0];

    return [shiftedX, shiftedY];
  },

  /**
   * Determine if the axis is an horizontal axis.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * `line` node.
   * @param {Object} svgDimensions - The dimensions of the axis.
   * @param {Number} svgDimensions.width - The width of the line.
   * @param {Number} svgDimenions.padding - The padding around the line.
   * @returns {Boolean} Whether the wrapper renders an independent axis.
  */
  isHorizontalAxis(wrapper, svgDimensions) {
    const { width, padding } = svgDimensions;
    const { x1, x2, y1, y2 } = wrapper.find("line").props();

    const isHorizontalLine = (x1 !== x2) && (y1 === y2);
    const isCorrectWidth = (width - padding * 2) === (x2 - x1);

    return isHorizontalLine && isCorrectWidth;
  },

  /**
   * Determine if the axis is a vertical axis.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * `line` node.
   * @param {Object} svgDimensions - The dimensions of the axis.
   * @param {Number} svgDimensions.height - The height of the line.
   * @param {Number} svgDimenions.padding - The padding around the line.
   * @returns {Boolean} Whether the wrapper renders a dependent axis.
  */
  isVerticalAxis(wrapper, svgDimensions) {
    const { height, padding } = svgDimensions;
    const { x1, x2, y1, y2 } = wrapper.find("line").props();

    const isVerticalLine = (x1 === x2) && (y1 !== y2);
    const isCorrectHeight = (height - padding * 2) === (y2 - y1);

    return isVerticalLine && isCorrectHeight;
  }
};

export default assign({}, expectations, helpers);
