import $ from "cheerio";
import d3Shape from "d3-shape";
import d3Scale from "d3-scale";

const RECTANGULAR_SEQUENCE = ["M", "L", "L", "L", "L"];
const CIRCULAR_SEQUENCE = ["M", "m", "a", "a"];

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
  const commandStr = $(wrapper.html()).attr("d");
  return parseSvgPathCommands(commandStr);
};

const exhibitsShapeSequence = (wrapper, shapeSequence) => {
  const commands = getPathCommandsFromWrapper(wrapper);
  return commands.every((command, index) => {
    return command.name === shapeSequence[index];
  });
};

const getD3Path = (svgDimensions, d3Attributes) => {
  const {width, height, padding} = svgDimensions;
  const {scaleType, curveType, data} = d3Attributes;
  const scale = `scale${scaleType[0].toUpperCase() + scaleType.slice(1)}`;
  const curve = `curve${curveType[0].toUpperCase() + curveType.slice(1)}`;

  const domain = data.reduce((prev, datum) => {
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
  }, {x: [0, 0], y: [0, 0]});

  const scaleX = d3Scale[scale]()
    .domain(domain.x)
    .range([padding, width - padding]);
  const scaleY = d3Scale[scale]()
    .domain(domain.y)
    .range([height - padding, padding]);

  return d3Shape.line()
    .curve(d3Shape[curve])
    .x((d) => scaleX(d.x))
    .y((d) => scaleY(d.y))(data);
};

const expectations = {
  /**
   * Assert the wrapper renders a rectangular shape.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {undefined}
   */
  expectIsRectangular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, RECTANGULAR_SEQUENCE)).to.equal(true);
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
   * Assert the wrapper renders the correct path.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper that wraps a single
   * `path` node.
   * @param {Object} svgDimensions - Dimensions of the svg.
   * @param {Number} svgDimensions.width - The width of the svg.
   * @param {Number} svgDimensions.height - The height of the svg.
   * @param {Number} svgDimensions.padding - The padding of the svg.
   * @param {Object} d3Attributes - Data passed into d3 to get the path.
   * @param {String} d3.attributes.scaleType - The type of scale.
   * @param {String} d3.attributes.curveType - The type of curve.
   * @param {Array} d3.attributes.data - The raw data for the chart.
   * @returns {undefined}
   */
  expectCorrectD3Path(wrapper, svgDimensions, d3Attributes) {
    expect(
      $(wrapper.html()).attr("d")
    ).to.equal(
      getD3Path(svgDimensions, d3Attributes)
    );
  }
};

const helpers = {
  /**
   * Retrieve the raw svg height of a bar.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {Number} The height of the bar in svg units.
   */
  getBarHeight(wrapper) {
    expectations.expectIsRectangular(wrapper);
    const commands = getPathCommandsFromWrapper(wrapper);
    return Math.abs(commands[0].args[1] - commands[1].args[1]);
  },

  /**
   * Retrieve the raw svg coordinates for the center of a point.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
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
  }
};

export default Object.assign({}, expectations, helpers);
