import $ from "cheerio";

const RECTANGULAR_SEQUENCE = ["M", "L", "L", "L", "L"];
const CIRCULAR_SEQUENCE = ["M", "m", "a", "a"];

const expectations = {
  /**
   * Assert the wrapper renders a rectangular shape.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {Boolean} Whether the expectation is met.
   */
  expectIsRectangular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, RECTANGULAR_SEQUENCE)).to.be.true;
  },

  /**
   * Assert the wrapper renders a circular shape.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {Boolean} Whether the expectation is met.
   */
  expectIsCircular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, CIRCULAR_SEQUENCE)).to.be.true;
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
   * @param {Array} svgSize - The width and height of the svg, respectively.
   * @param {Number} svgPadding - The space between the edge of the svg and the
   *   chart area.
   * @param {Object} domain - The x and y domains.
   * @param {Array} domain.x - The lower and upper x bounds, respectively.
   * @param {Array} domain.y - The lower and upper y bounds, respectively.
   * @returns {Array} The Cartesian x and y coordinates, respectively.
   */
  convertSvgCoordinatesToCartesian(coords, svgSize, svgPadding, domain) {
    const cartesianX = coords[0] - svgPadding;
    const cartesianY = svgSize[1] - coords[1] - svgPadding;

    const chartSize = svgSize.map(dimension => dimension - svgPadding * 2);
    const scaledX = cartesianX / chartSize[0] * (domain.x[1] - domain.x[0]);
    const scaledY = cartesianY / chartSize[1] * (domain.y[1] - domain.y[0]);

    const shiftedX = scaledX + domain.x[0];
    const shiftedY = scaledY + domain.y[0];

    return [shiftedX, shiftedY];
  }
};

const SvgTestHelper = Object.assign({}, expectations, helpers);

function exhibitsShapeSequence(wrapper, shapeSequence) {
  const commands = getPathCommandsFromWrapper(wrapper);
  return commands.every((command, index) => {
    return command.name === shapeSequence[index];
  });
}

function getPathCommandsFromWrapper(wrapper) {
  const commandStr = $(wrapper.html()).attr("d");
  return parseSvgPathCommands(commandStr);
}

function parseSvgPathCommands(commandStr) {
  const matches = commandStr.match(
    /[MmLlHhVvCcSsQqTtAaZz]+[^MmLlHhVvCcSsQqTtAaZz]*/g
  );

  return matches.map(match => {
    const name = match.charAt(0);
    const args = match.substring(1).split(",").map(arg => parseFloat(arg, 10));

    return {
      raw: match,
      name,
      args
    }
  });
}

export default SvgTestHelper;
