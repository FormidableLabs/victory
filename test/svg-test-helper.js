import $ from "cheerio";

const RECTANGULAR_SEQUENCE = ["M", "L", "L", "L", "L"];
const CIRCULAR_SEQUENCE = ["M", "m", "a", "a"];

const expectations = {
  expectIsRectangular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, RECTANGULAR_SEQUENCE)).to.be.true;
  },

  expectIsCircular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, CIRCULAR_SEQUENCE)).to.be.true;
  }
};

const helpers = {
  getBarHeight(wrapper) {
    expectations.expectIsRectangular(wrapper);
    const commands = getPathCommandsFromWrapper(wrapper);
    return Math.abs(commands[0].args[1] - commands[1].args[1]);
  },

  getPointCoordinates(wrapper) {
    const commands = getPathCommandsFromWrapper(wrapper);
    return commands[0].args;
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
